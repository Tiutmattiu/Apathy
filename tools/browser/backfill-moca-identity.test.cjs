const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');

test('Backfill loads verified identity, saves MoCA alone and clears the local record',async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({acceptDownloads:true}),writes=[];
  await page.addInitScript(()=>localStorage.setItem('apathy-fe-clean-v2-backfill',JSON.stringify({
   answers:{p_id:'P999',s_id:'S999',participant_name:'Fixture Person',pd_hc_status:'PD'},step:0,meds:[],submission:'cgt-fixture-0001'
  })));
  await page.route('**/*',async route=>{
   const url=new URL(route.request().url());
   if(url.hostname!=='apathy.test'){
    if(url.searchParams.get('action')==='staff_backfill_identity'){
     const query=JSON.parse(url.searchParams.get('data'));
     assert.equal(query.sid,'S999');
     return route.fulfill({contentType:'application/javascript',body:url.searchParams.get('callback')+'('+JSON.stringify({ok:true,person:{p_id:'P999',date_of_birth:'',education_years:11}})+')'});
    }
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
  await page.getByRole('button',{name:'核對並帶入基本資料'}).click();
  await page.getByRole('button',{name:'核對並帶入基本資料'}).waitFor();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('apathy-fe-clean-v2-backfill')).answers.education_years===11);
  await page.locator('[data-field="hy_stage"][data-value="2.5"]').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('apathy-fe-clean-v2-backfill')).answers.hy_stage===2.5);
  await page.locator('[data-field="moca_1_raw_total"] input[type=number]').fill('24');
  await page.getByRole('button',{name:'只保存 MoCA',exact:true}).click();
  await page.getByRole('heading',{name:'提交成功',exact:true}).waitFor({timeout:6000});
  assert.equal(writes[0].workflow_part,'backfill_moca_supplement');
  assert.equal(writes[0].moca_1_raw_total,24);
  assert.equal(writes[0].hy_stage,undefined);
  assert.equal(writes[0].date_of_birth,undefined);
  await page.getByRole('button',{name:'清除本機資料並補錄下一位'}).click();
  await page.getByRole('button',{name:'確定清除此入口'}).click();
  await page.getByRole('heading',{name:'歷史資料補錄',exact:true}).waitFor();
  assert.equal(await page.locator('[data-field="moca_1_raw_total"] input[type=number]').inputValue(),'');
 }finally{await browser.close();}
});
