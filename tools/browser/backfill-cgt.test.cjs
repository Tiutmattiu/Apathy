const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');

test('staff backfill sends CGT zero, millisecond time and signed risk adjustment',async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({acceptDownloads:true}),writes=[];
  await page.addInitScript(()=>localStorage.setItem('apathy-fe-clean-v2-backfill',JSON.stringify({
   answers:{p_id:'P999',s_id:'S999',participant_name:'Fixture Person',pd_hc_status:'PD'},step:0,meds:[],submission:'cgt-fixture-0001'
  })));
  await page.route('**/*',async route=>{
   const url=new URL(route.request().url());
   if(url.hostname!=='apathy.test'){
    if(route.request().method()!=='POST')return route.abort();
    const body=JSON.parse(route.request().postData());
    writes.push(body);
    return route.fulfill({json:{ok:true,submission_id:body.submission_id,sheet:'backfill_raw',row:900},headers:{'Access-Control-Allow-Origin':'*'}});
   }
   const file=url.pathname==='/'?'index.html':url.pathname.slice(1);
   return route.fulfill({body:await fs.readFile(path.resolve(__dirname,'../..',file)),contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html'});
  });
  await page.goto('http://apathy.test/?flow=backfill');
  await page.locator('input[type=password]').fill('080');
  await page.getByRole('button',{name:'進入',exact:true}).click();
  await page.getByRole('button',{name:'CGT',exact:true}).click();
  await page.getByLabel('最佳選擇比例（0–1）').fill('1.2');
  await page.getByRole('button',{name:'保存歷史資料補錄'}).click();
  assert.equal(writes.length,0);
  await page.getByLabel('最佳選擇比例（0–1）').fill('0');
  await page.getByLabel('平均考慮時間（毫秒）').fill('3143.5');
  await page.getByLabel('風險調整（可為負數）').fill('-0.25');
  await page.getByRole('button',{name:'保存歷史資料補錄'}).click();
  await page.getByRole('heading',{name:'提交成功',exact:true}).waitFor({timeout:6000});
  assert.equal(writes[0].event_type,'historical_paper_reentry');
  assert.equal(writes[0].cgt_prop_best_choices,0);
  assert.equal(writes[0].cgt_mean_deliberation_rt,3143.5);
  assert.equal(writes[0].cgt_risk_adjust,-.25);
 }finally{await browser.close();}
});
