const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'../..');
const key='apathy-fe-clean-v2-guided';
const hads=Object.fromEntries(Array.from({length:14},(_,i)=>[`hads${String(i+1).padStart(2,'0')}_score`,0]));
async function open(step,answers={},receiver){
 if(answers._guided_hads_passed===1)answers={...answers,_guided_policy_checked:{hads:{version:'HC-20261118-v1'}}};
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:390,height:844}}),posts=[];
 await page.addInitScript(({key,step,answers})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify({step,answers:{...answers,_guided_latest_step:step},submission:'guided-fixture'}));},{key,step,answers});
 await page.route('**/*',async route=>{
  const request=route.request(),u=new URL(request.url());
  if(u.hostname!=='apathy.test'){
   if(u.searchParams.get('action')==='guided_screening_review_status')return route.fulfill({contentType:'text/javascript',body:u.searchParams.get('callback')+'('+JSON.stringify({ok:true,found:true,allowed:true,requires_approval:false,policy_version:'HC-20261118-v1'})+')'});
   if(request.method()==='POST')posts.push(JSON.parse(request.postData()));
   if(receiver)return receiver(route,posts);
   return route.abort();
  }
  const file=u.pathname==='/'?'index.html':u.pathname.slice(1);
  await route.fulfill({body:await fs.readFile(path.join(root,file)),contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html'});
 });
 await page.goto('http://apathy.test/?flow=guided',{waitUntil:'domcontentloaded'});
 return {page,posts,close:()=>browser.close(),draft:()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key)};
}
async function at(page,step){await page.waitForFunction(({key,step})=>JSON.parse(localStorage.getItem(key)).step===step,{key,step},{timeout:2500});}
function receipt(route,posts){const p=posts.at(-1);return route.fulfill({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({ok:true,submission_id:p.submission_id,sheet:'screening_raw',row:999})});}
test('every HADS item and answer position, including zero, advances and persists unchanged',async()=>{
 const app=await open(6);
 try{
  const items=await app.page.evaluate(()=>window.APATHY_QUESTION_BANK.hads.items);
  for(let item=0;item<items.length;item++)for(let position=1;position<=items[item].options.length;position++){
   const step=6+item;
   await app.page.evaluate(({key,step})=>{const d=JSON.parse(localStorage.getItem(key));d.step=step;d.answers={_guided_latest_step:step};localStorage.setItem(key,JSON.stringify(d));},{key,step});
   await app.page.reload();
   await app.page.locator(`[data-answer-position="${position}"]`).evaluate(b=>b.click());
   assert.equal(await app.page.locator(`[data-answer-position="${position}"]`).getAttribute('aria-pressed'),'true','choice must be visible immediately');
   await at(app.page,step+1);assert.equal((await app.draft()).answers[items[item].name],items[item].options[position-1].value);
  }
 }finally{await app.close();}
});
test('rapid answer then Back cancels that page transition; same answer can be retried',async()=>{
 const app=await open(7,{hads01_score:0});
 try{
  await app.page.locator('[data-answer-position="4"]').evaluate(b=>b.click());
  await app.page.getByRole('button',{name:'返回上一題',exact:true}).evaluate(b=>b.click());
  await app.page.waitForTimeout(350);
  assert.equal((await app.draft()).step,6,'old answer timer must not move the page after Back');
  await app.page.locator('[data-answer-position="4"]').click();await at(app.page,7);
  assert.equal((await app.draft()).answers.hads01_score,0);
 }finally{await app.close();}
});
test('unanswered binary options are visibly unselected; explicit zero persists and all rows are required',async()=>{
 const app=await open(21,{...hads,_guided_hads_submitted:1,_guided_hads_passed:1});
 try{
  assert.equal(await app.page.locator('.guided-binary-row [aria-pressed="true"]').count(),0);
  const rows=app.page.locator('.guided-binary-row'),count=await rows.count();assert.ok(count>1);
  for(let i=0;i<count;i++)await app.page.locator('.guided-binary-row').nth(i).getByRole('button',{name:'否',exact:true}).click();
  await at(app.page,22);
  const answers=(await app.draft()).answers;assert.equal(Object.keys(answers).filter(k=>/^quip_.*1_yes$/.test(k)&&answers[k]===0).length,count);
 }finally{await app.close();}
});
test('durable HADS receipt advances exactly once without changing inputs',async()=>{
 const app=await open(20,hads,(route,posts)=>route.request().method()==='POST'?receipt(route,posts):route.abort());
 try{await at(app.page,21);await app.page.waitForTimeout(650);assert.equal((await app.draft()).step,21);assert.equal(app.posts.length,1);for(const [k,v]of Object.entries(hads))assert.equal((await app.draft()).answers[k],v);}finally{await app.close();}
});
test('lost POST response recovers only from an exact durable status receipt',async()=>{
 const app=await open(20,hads,(route,posts)=>{
  if(route.request().method()==='POST')return route.abort('failed');
  const u=new URL(route.request().url());
  if(u.searchParams.get('action')==='status')return route.fulfill({contentType:'text/javascript',body:`${u.searchParams.get('callback')}(${JSON.stringify({ok:true,received:true,submission_id:posts[0].submission_id,result:{sheet:'screening_raw',row:999}})})`});
  return route.abort();
 });
 try{await at(app.page,21);assert.equal(app.posts.length,1);assert.equal((await app.draft()).answers._guided_hads_passed,1);}finally{await app.close();}
});
test('POST rejection keeps answers and retry uses the same submission ID',async()=>{
 let reject=true;
 const app=await open(20,hads,(route,posts)=>{
  if(route.request().method()!=='POST')return route.abort();
  if(reject)return route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({ok:false,message:'fixture unavailable'})});
  return receipt(route,posts);
 });
 try{
  await app.page.getByRole('button',{name:'重新核對並繼續',exact:true}).waitFor();
  assert.equal((await app.draft()).step,20);assert.equal((await app.draft()).answers._guided_hads_submitted,undefined);
  reject=false;await app.page.getByRole('button',{name:'重新核對並繼續',exact:true}).click();await at(app.page,21);
  assert.equal(app.posts.length,2);assert.equal(app.posts[0].submission_id,app.posts[1].submission_id);
  for(const [k,v]of Object.entries(hads))assert.equal((await app.draft()).answers[k],v);
 }finally{await app.close();}
});
test('a lost POST and receipt for a different submission cannot advance',async()=>{
 const app=await open(20,hads,route=>{
  if(route.request().method()==='POST')return route.abort('failed');
  const u=new URL(route.request().url());
  if(u.searchParams.get('action')==='status')return route.fulfill({contentType:'text/javascript',body:`${u.searchParams.get('callback')}(${JSON.stringify({ok:true,received:true,submission_id:'some-other-submission',result:{sheet:'screening_raw',row:999}})})`});
  return route.abort();
 });
 try{await app.page.waitForTimeout(700);assert.equal((await app.draft()).step,20);assert.equal((await app.draft()).answers._guided_hads_submitted,undefined);}finally{await app.close();}
});
test('in-flight HADS save prevents editing the submitted snapshot and advances exactly once',async()=>{
 let release;
 const pending=new Promise(resolve=>release=resolve);
 const app=await open(20,hads,async(route,posts)=>{
  if(route.request().method()==='POST'){await pending;return receipt(route,posts);}
  return route.abort();
 });
 try{
  await app.page.waitForFunction(()=>document.querySelector('.question .result')?.textContent.includes('正在安全保存'));
  assert.equal(await app.page.getByRole('button',{name:'返回上一題檢查',exact:true}).isDisabled(),true);
  await app.page.getByRole('button',{name:'返回上一題檢查',exact:true}).evaluate(b=>b.click());
  assert.equal((await app.draft()).step,20,'answers being submitted must not become editable');release();await at(app.page,21);
  await app.page.waitForTimeout(500);assert.equal((await app.draft()).step,21);assert.equal(app.posts.length,1);
 }finally{release();await app.close();}
});
test('approval bootstrap preserves newer participant answers and progress',async()=>{
 let release,requested;
 const pending=new Promise(resolve=>release=resolve),started=new Promise(resolve=>requested=resolve);
 const app=await open(20,{...hads,_guided_hads_blocked:1,_guided_hads_submitted:1,_guided_hads_submission_id:'guided-fixture-hads'},async route=>{
  const u=new URL(route.request().url());
  if(u.searchParams.get('action')==='guided_resume_status'){
   requested();await pending;return route.fulfill({contentType:'text/javascript',body:`${u.searchParams.get('callback')}(${JSON.stringify({ok:true,allowed:true,submission_id:'guided-fixture-hads'})})`});
  }
  return route.abort();
 });
 try{
  await started;
  await app.page.evaluate(key=>{const d=JSON.parse(localStorage.getItem(key));d.step=24;d.answers._guided_latest_step=24;d.answers.quip_a1_yes=0;d.answers.quip_b1_yes=1;localStorage.setItem(key,JSON.stringify(d));},key);
  const reloaded=app.page.waitForEvent('framenavigated');release();await reloaded;await app.page.waitForLoadState('domcontentloaded');
  const d=await app.draft();assert.equal(d.answers.quip_a1_yes,0);assert.equal(d.answers.quip_b1_yes,1);assert.ok(d.answers._guided_latest_step>=24);assert.ok(d.step>=24);
 }finally{release();await app.close();}
});
test('approval bootstrap ignores a stale response after submission identity changes',async()=>{
 let release,requested;
 const pending=new Promise(resolve=>release=resolve),started=new Promise(resolve=>requested=resolve);
 const app=await open(20,{...hads,_guided_hads_blocked:1,_guided_hads_submission_id:'guided-old-submission'},async route=>{
  const u=new URL(route.request().url());
  if(u.searchParams.get('action')==='guided_resume_status'){
   requested();await pending;return route.fulfill({contentType:'text/javascript',body:`${u.searchParams.get('callback')}(${JSON.stringify({ok:true,allowed:true,submission_id:'guided-old-submission'})})`});
  }
  return route.abort();
 });
 try{
  await started;await app.page.evaluate(key=>{const d=JSON.parse(localStorage.getItem(key));d.answers._guided_hads_submission_id='guided-new-submission';d.answers.participant_name='New fixture';localStorage.setItem(key,JSON.stringify(d));},key);
  release();await app.page.waitForTimeout(300);const d=await app.draft();assert.equal(d.answers._guided_hads_submission_id,'guided-new-submission');assert.equal(d.answers.participant_name,'New fixture');assert.equal(d.answers._guided_hads_resume_repaired_v2,undefined);
 }finally{release();await app.close();}
});
test('an ok response without this exact durable receipt cannot advance',async()=>{
 const app=await open(20,hads,route=>route.request().method()==='POST'?route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,submission_id:'another-fixture',sheet:'screening_raw',row:999})}):route.abort());
 try{await app.page.waitForTimeout(700);assert.equal((await app.draft()).step,20);assert.equal((await app.draft()).answers._guided_hads_submitted,undefined);}finally{await app.close();}
});
test('mobile DOB accepts a day correction after year entry and restores on reload without Enter',async()=>{
 const app=await open(1,{participant_name:'Fixture'});
 try{
  const {page}=app;
  await page.getByLabel('日 DD').fill('３１');
  await page.getByLabel('月 MM').fill('04');
  await page.getByLabel('年 YYYY').fill('1960');
  assert.equal((await app.draft()).answers.date_of_birth,undefined);
  await page.getByLabel('日 DD').fill('30');
  assert.equal((await app.draft()).answers.date_of_birth,'1960-04-30');
  await page.reload();
  await page.getByRole('button',{name:'下一題',exact:true}).click();
  await at(page,2);
  await page.getByRole('button',{name:'返回上一題',exact:true}).click();
  await at(page,1);
  assert.equal(await page.getByLabel('日 DD').inputValue(),'30');
 }finally{await app.close();}
});
