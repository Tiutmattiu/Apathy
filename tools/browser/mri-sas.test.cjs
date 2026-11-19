const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = name => fs.readFileSync(path.resolve(__dirname, '../..', name), 'utf8');
const context = vm.createContext({ window: {}, URL });
vm.runInContext(source('question-bank.js'), context);
vm.runInContext(source('questionnaire-links.js'), context);
const bank = context.window.APATHY_QUESTION_BANK;
const links = context.window.APATHY_QUESTIONNAIRE_LINKS;

test('MRI-SAS reuses all 14 original items and score directions with separate keys', () => {
  const pages = links.pages(['sas', 'mri_sas'], bank);
  const screening = pages.filter(page => page.questionnaire === 'sas');
  const mri = pages.filter(page => page.questionnaire === 'mri_sas');
  assert.equal(mri.length, 14);
  assert.equal(screening.length, 14);
  for (let i = 0; i < mri.length; i++) {
    assert.equal(mri[i].key, 'mri_' + screening[i].key);
    assert.equal(mri[i].label, screening[i].label);
    assert.equal(JSON.stringify(mri[i].options), JSON.stringify(screening[i].options));
  }
});

test('mixed invitation carries independent records, and scan date is never guessed', () => {
  const answers = { participant_name: 'Fixture', contact_phone: '98765432', age_years: 62, gender: 'F', sas01_score: 2 };
  for (let i = 1; i <= 14; i++) answers['mri_sas' + String(i).padStart(2, '0') + '_score'] = i === 14 ? 3 : 0;
  const sent = '2026-11-19T06:12:00Z';
  const [screening, mri] = links.submissions(['sas', 'mri_sas'], answers, 'draft-fixture', sent, '2026-11-07');
  assert.equal(screening.event_type, 'questionnaire_supplement');
  assert.equal(screening.sas01_score, 2);
  assert.equal(screening.mri_sas01_score, undefined);
  assert.equal(mri.event_type, 'mri_sas_supplement');
  assert.notEqual(mri.submission_id, screening.submission_id);
  assert.equal(mri.sas01_score, undefined);
  assert.equal(mri.mri_sas01_score, 0);
  assert.equal(mri.mri_sas_total, 3);
  assert.equal(mri.mri_sas_date, '2026-11-07');
  assert.equal(links.submissions(['mri_sas'], answers, 'solo-fixture', sent)[0].mri_sas_date, undefined);
  assert.equal(new URL(links.link('https://apathy.test', ['mri_sas'], 'draft-fixture', '2026-11-07')).searchParams.get('scan_date'), '2026-11-07');
  assert.throws(() => links.scanDate('2026-02-31'), /MRI 日期/);
  assert.throws(() => links.submissions(['mri_sas'], { ...answers, mri_sas01_score: '' }, 'bad-fixture', sent), /14 題/);
});

test('standalone invitation automatically advances one item and sends MRI Raw payload', async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    const submissions = [];
    await page.route('**/*', async route => {
      const request = route.request(), url = new URL(request.url());
      if (url.hostname === 'apathy.test') {
        const name = url.pathname.slice(1) || 'index.html';
        if (!['.js', '.css', '.html'].includes(path.extname(name))) return route.abort();
        return route.fulfill({ body: source(name), contentType: name.endsWith('.js') ? 'text/javascript' : name.endsWith('.css') ? 'text/css' : 'text/html' });
      }
      if (request.method() === 'POST') {
        const body = JSON.parse(request.postData());
        submissions.push(body);
        return route.fulfill({ json: { ok: true, submission_id: body.submission_id, sheet: 'mri_raw', row: 451 }, headers: { 'Access-Control-Allow-Origin': '*' } });
      }
      if (url.searchParams.get('action') === 'health') {
        return route.fulfill({ body: url.searchParams.get('callback') + '({ok:true,supported_events:["mri_sas_supplement"]});', contentType: 'text/javascript' });
      }
      return route.abort();
    });
    await page.goto('http://apathy.test/?flow=questionnaires&scales=mri_sas&request=fixture&scan_date=2026-11-07');
    for (const value of ['MRI Fixture', '98765432', '61']) {
      await page.locator('section.question input').fill(value);
      await page.getByRole('button', { name: '下一題', exact: true }).click();
    }
    await page.getByRole('button', { name: '女', exact: true }).click();
    for (const item of bank.sas.items) {
      await page.getByRole('heading', { name: item.fullLabel, exact: true }).waitFor();
      await page.getByRole('button', { name: '完全不符合', exact: true }).click();
    }
    await page.getByRole('button', { name: '檢查並提交', exact: true }).click();
    await page.getByText('已收到您填寫的問卷，謝謝。').waitFor();
    assert.equal(submissions.length, 1);
    assert.equal(submissions[0].event_type, 'mri_sas_supplement');
    assert.equal(submissions[0].mri_sas_date, '2026-11-07');
    const firstAnchor = Object.values(bank.sas.scoring.displayOrderByItem).reduce((sum, scores) => sum + scores[0], 0);
    assert.equal(submissions[0].mri_sas_total, firstAnchor);
  } finally {
    await browser.close();
  }
});

test('staff MRI visit preserves actual scan date and submits the 14 item scores with the visit', async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ acceptDownloads: true });
    const submissions = [];
    await page.addInitScript(() => localStorage.setItem('apathy-fe-clean-v2-mri_visit', JSON.stringify({
      answers: { p_id: 'P999', s_id: 'S999', contact_phone: '98765432', pd_hc_status: 'HC',
        mri_date: '2026-11-07', visit_number: 1, mri_safety_changed_since_initial: 0 },
      step: 0, meds: [], submission: 'mri-visit-fixture'
    })));
    await page.route('**/*', async route => {
      const request = route.request(), url = new URL(request.url());
      if (url.hostname === 'apathy.test') {
        const name = url.pathname.slice(1) || 'index.html';
        if (!['.js', '.css', '.html'].includes(path.extname(name))) return route.abort();
        return route.fulfill({ body: source(name), contentType: name.endsWith('.js') ? 'text/javascript' : name.endsWith('.css') ? 'text/css' : 'text/html' });
      }
      if (request.method() !== 'POST') return route.abort();
      const body = JSON.parse(request.postData());
      submissions.push(body);
      return route.fulfill({ json: { ok: true, submission_id: body.submission_id, sheet: 'mri_raw', row: 451 }, headers: { 'Access-Control-Allow-Origin': '*' } });
    });
    await page.goto('http://apathy.test/?flow=mri_visit');
    await page.locator('input[type=password]').fill('080');
    await page.getByRole('button', { name: '進入', exact: true }).click();
    await page.getByRole('button', { name: '開始本次MRI記錄', exact: true }).click();
    const question = page.locator('section.question').filter({ has: page.getByRole('heading', { name: 'MRI-SAS', exact: true }) });
    for (const [index, item] of bank.sas.items.entries()) {
      await question.getByRole('heading', { name: item.fullLabel, exact: true }).waitFor();
      await question.getByRole('button', { name: '完全不符合', exact: true }).click();
      if (index === 0) {
        await page.getByRole('button', { name: '正式提交MRI到訪', exact: true }).click();
        assert.equal(submissions.length, 0);
        await page.getByText('請完成 MRI-SAS 的 14 題。', { exact: true }).waitFor();
      }
    }
    await page.getByRole('button', { name: '正式提交MRI到訪', exact: true }).click();
    await page.getByRole('heading', { name: '提交成功', exact: true }).waitFor();
    assert.equal(submissions.length, 1);
    assert.equal(submissions[0].event_type, 'mri_scan');
    assert.equal(submissions[0].mri_sas_date, '2026-11-07');
    assert.equal(submissions[0].mri_sas01_score, bank.sas.scoring.displayOrderByItem[1][0]);
    assert.equal(submissions[0].mri_sas14_score, bank.sas.scoring.displayOrderByItem[14][0]);
  } finally {
    await browser.close();
  }
});

test('Backfill asks for the scan date and keeps Screening SAS distinct', async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ acceptDownloads: true });
    const submissions = [];
    await page.addInitScript(() => {
      const answers = { p_id: 'P999', s_id: 'S999', participant_name: 'MRI Fixture', pd_hc_status: 'PD', sas01_score: 2 };
      for (let i = 1; i <= 14; i++) answers['mri_sas' + String(i).padStart(2, '0') + '_score'] = i === 14 ? 3 : 0;
      localStorage.setItem('apathy-fe-clean-v2-backfill', JSON.stringify({ answers, step: 0, meds: [], submission: 'mri-backfill-fixture' }));
    });
    await page.route('**/*', async route => {
      const request = route.request(), url = new URL(request.url());
      if (url.hostname === 'apathy.test') {
        const name = url.pathname.slice(1) || 'index.html';
        if (!['.js', '.css', '.html'].includes(path.extname(name))) return route.abort();
        return route.fulfill({ body: source(name), contentType: name.endsWith('.js') ? 'text/javascript' : name.endsWith('.css') ? 'text/css' : 'text/html' });
      }
      if (request.method() !== 'POST') return route.abort();
      const body = JSON.parse(request.postData());
      submissions.push(body);
      return route.fulfill({ json: { ok: true, submission_id: body.submission_id, sheet: 'backfill_raw', row: 451 }, headers: { 'Access-Control-Allow-Origin': '*' } });
    });
    await page.goto('http://apathy.test/?flow=backfill');
    await page.locator('input[type=password]').fill('080');
    await page.getByRole('button', { name: '進入', exact: true }).click();
    const save = page.getByRole('button', { name: '保存歷史資料補錄', exact: true });
    await save.click();
    await page.getByText('請填寫 MRI-SAS 的掃描日期。', { exact: true }).waitFor();
    assert.equal(submissions.length, 0);
    const section = page.locator('#bf-mri-sas');
    for (const [placeholder, value] of [['DD', '07'], ['MM', '11'], ['YYYY', '2026']]) {
      await section.getByPlaceholder(placeholder).fill(value);
    }
    await save.click();
    await page.getByRole('heading', { name: '提交成功', exact: true }).waitFor();
    assert.equal(submissions.length, 1);
    assert.equal(submissions[0].event_type, 'historical_paper_reentry');
    assert.equal(submissions[0].mri_sas_date, '2026-11-07');
    assert.equal(submissions[0].sas01_score, 2);
    assert.equal(submissions[0].mri_sas01_score, 0);
    assert.equal(submissions[0].mri_sas_total, 3);
  } finally {
    await browser.close();
  }
});
