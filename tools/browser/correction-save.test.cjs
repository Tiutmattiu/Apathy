// Run with Playwright installed: node --test tools/browser/correction-save.test.cjs
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'../..');

test('correction validation and save results remain visible beside the save button',async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  let writes=0,request;
  await page.route('**/*',async route=>{
   const u=new URL(route.request().url());
   if(u.hostname!=='apathy.test'){
    if(route.request().method()==='POST'){
     writes++;request=route.request().postDataJSON();
     return route.fulfill({body:''});
    }
    if(u.searchParams.get('action')==='staff_result')return route.fulfill({contentType:'text/javascript',body:`${u.searchParams.get('callback')}(${JSON.stringify({ok:true,submission_id:'test-correction',saved_at:new Date().toISOString()})})`});
    return route.abort();
   }
   const name=u.pathname==='/'?'index.html':u.pathname.slice(1);
   const types={'.js':'text/javascript','.css':'text/css','.html':'text/html'};
   await route.fulfill({body:await fs.readFile(path.join(root,name)),contentType:types[path.extname(name)]});
  });
  await page.goto('http://apathy.test/?flow=backfill');
  await page.locator('input[type=password]').fill('080');
  await page.getByRole('button',{name:'進入',exact:true}).click();
  await page.locator('input[type=file]').setInputFiles({name:'fixture.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({submission_id:'local-test',event_type:'mri_scan',participant_name:'Local fixture'}))});
  await page.locator('[data-field="participant_name"] input').fill('Edited local fixture');
  await page.getByRole('button',{name:'保存更正並更新Sheet',exact:true}).click();
  const status=page.locator('#correction-save-status');
  assert.match(await status.textContent(),/請填入已核對的參加者PID/);
  const visible=await status.evaluate(node=>{const r=node.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;});
  assert.equal(visible,true,'validation feedback must be in the viewport after saving');
  assert.equal(writes,0,'validation must not send any request');
  await page.locator('.correction-summary label').filter({hasText:'參加者PID'}).locator('input').fill('P123');
  const reason=page.locator('.correction-summary label').filter({hasText:'修改原因'}).locator('input');
  await reason.fill('');
  const save=page.getByRole('button',{name:'保存更正並更新Sheet',exact:true});
  await save.click();
  assert.match(await status.textContent(),/請填寫修改原因/);
  assert.equal(await status.evaluate(n=>{const r=n.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;}),true);
  assert.equal(writes,0);
  await reason.fill('Local regression fixture');
  await save.click();
  await page.waitForFunction(()=>document.querySelector('#correction-save-status').textContent.includes('更正已收件（'));
  assert.equal(writes,1);
  assert.equal(request.data.pid,'P123');
  assert.equal(request.data.target_submission_id,'local-test');
  assert.equal(await save.isEnabled(),true);
  assert.equal(await status.evaluate(n=>{const r=n.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;}),true);
  await save.click();
  assert.match(await status.textContent(),/沒有新的修改/);
  assert.equal(writes,1,'unchanged corrections must not be resubmitted');
  await page.getByRole('button',{name:'查看同步進度',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('#correction-save-status').textContent.includes('暫時無法連接後台'));
  assert.equal(await status.evaluate(n=>{const r=n.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;}),true);
 }finally{await browser.close();}
});
