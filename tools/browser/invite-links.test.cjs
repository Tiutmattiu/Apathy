const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'../..');
async function setup(scales=['hads','gas'],options={}){
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});const page=await browser.newPage(),calls=[];page.setDefaultTimeout(4000);page.on('pageerror',error=>process.stderr.write(String(error)+'\n'));
 let revision=options.checkpoint?.revision||0,blocked=false,checkpoint=options.checkpoint;
 await page.route('**/*',async route=>{const u=new URL(route.request().url());if(u.hostname==='apathy.test'){const file=u.pathname==='/'?'index.html':u.pathname.slice(1);return route.fulfill({body:await fs.readFile(path.join(root,file)),contentType:file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html'});}
  if(route.request().method()!=='POST'){if(u.searchParams.get('action')==='health')return route.fulfill({contentType:'text/javascript',body:`${u.searchParams.get('callback')}(${JSON.stringify({ok:true,supported_events:['questionnaire_supplement','mri_sas_supplement']})})`});return route.abort();}const p=JSON.parse(route.request().postData());calls.push(p);let data;
  if(p.action==='invite_open')data={ok:true,masked_phone:'****4567',scales,verified:p.phone==='91234567',...(p.phone==='91234567'?{checkpoint,blocked,revision,completed:!!options.completed}:{} )};
  else if(p.action==='invite_checkpoint'){blocked=options.block?{scale:p.scale}:null;checkpoint={answers:p.answers,step:p.step,revision:++revision};data={ok:true,revision,blocked};if(options.conflict){options.conflict=false;return route.fulfill({status:409,contentType:'application/json',body:JSON.stringify({ok:false,error_code:'INVITE_REVISION_CONFLICT',message:'保存版本已更新，請重新讀取保存進度。'})});}}
  else if(p.action==='staff_invite_create')data={ok:true,token:'fixture-token'};
  else if(p.action==='staff_invite_allow')data={ok:true};
  else if(p.action==='staff_invite_status')data={ok:true,masked_phone:'****4567',revision:8,blocked:{scale:'hads',reasons:[{domain:'HADS A',score:7,rule:'<6'}]}};
  else data={ok:true,submission_id:p.submission_id,sheet:p.form_type==='mri'?'mri_raw':'backfill_raw',row:999};
  return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
 });
 await page.goto('http://apathy.test/?flow=questionnaires&invite=fixture-token',{waitUntil:'domcontentloaded'});
 return {page,calls,allow:()=>{blocked=null;},close:()=>browser.close()};
}
async function verify(app){await app.page.getByLabel('完整聯絡電話').fill('91234567');await app.page.getByRole('button',{name:'確認電話',exact:true}).click();}
test('token link reveals only masked phone before verification, ignores URL selection and local draft',async()=>{const app=await setup(['hads'],{checkpoint:{answers:{participant_name:'Secret fixture',contact_phone:'91234567'},step:4,revision:3}});try{
 await app.page.getByText('****4567',{exact:false}).waitFor();assert.equal(await app.page.getByText('Secret fixture',{exact:false}).count(),0);await app.page.getByLabel('完整聯絡電話').fill('11111111');await app.page.getByRole('button',{name:'確認電話',exact:true}).click();await app.page.getByLabel('完整聯絡電話').waitFor();assert.equal(await app.page.locator('.options').count(),0);
 await verify(app);await app.page.locator('.question h2').waitFor();assert.ok(app.calls.some(x=>x.action==='invite_open'&&x.phone==='91234567'));
 }finally{await app.close();}});
test('HADS boundary checkpoints once and blocked response prevents following scales',async()=>{const answers={participant_name:'Fixture',contact_phone:'91234567',age_years:60,gender:'F'};for(let n=1;n<=13;n++)answers['hads'+String(n).padStart(2,'0')+'_score']=0;const app=await setup(['gas','hads'],{checkpoint:{answers,step:16,revision:7},block:true});try{
 await verify(app);await app.page.locator('.options button').last().click();await app.page.getByRole('heading',{name:'等待研究人員批准'}).waitFor();const saved=app.calls.filter(x=>x.action==='invite_checkpoint');assert.equal(saved.length,1);assert.equal(saved[0].scale,'hads');assert.equal(saved[0].revision,7);assert.equal(saved[0].phone,'91234567');assert.equal(saved[0].token,'fixture-token');assert.equal(await app.page.getByText('GAS',{exact:true}).count(),0);
 }finally{await app.close();}});
function hadsCheckpoint(){const answers={participant_name:'Fixture',contact_phone:'91234567',age_years:60,gender:'F'};for(let n=1;n<=13;n++)answers['hads'+String(n).padStart(2,'0')+'_score']=0;return {answers,step:16,revision:7};}
test('approval resumes the verified server checkpoint without resubmitting HADS',async()=>{const app=await setup(['hads','gas'],{checkpoint:hadsCheckpoint(),block:true});try{await verify(app);await app.page.locator('.options button').last().click();await app.page.getByRole('heading',{name:'等待研究人員批准'}).waitFor();app.allow();await app.page.getByRole('button',{name:'檢查批准狀態'}).click();await app.page.getByText(/GAS　/).waitFor();assert.equal(app.calls.filter(p=>p.action==='invite_checkpoint').length,1);}finally{await app.close();}});
test('revision conflict keeps current answers until explicit server refresh',async()=>{const app=await setup(['hads','gas'],{checkpoint:hadsCheckpoint(),conflict:true});try{await verify(app);await app.page.locator('.options button').last().click();await app.page.getByText('保存版本已更新，請重新讀取保存進度。',{exact:true}).waitFor();assert.equal(await app.page.locator('.options .selected').textContent(),'絕少能夠');await app.page.getByRole('button',{name:'重新讀取保存進度'}).click();await app.page.getByText(/GAS　/).waitFor();await app.page.getByText(/未同步的填答未合併/).waitFor();}finally{await app.close();}});
test('completed server invitation reuses existing success UI',async()=>{const app=await setup(['gas'],{completed:true});try{await verify(app);await app.page.getByText('已收到您填寫的問卷，謝謝。',{exact:true}).waitFor();assert.equal(app.calls.filter(p=>!p.action).length,0);}finally{await app.close();}});
test('normal scales never checkpoint; both final split payloads bind the token',async()=>{const answers={participant_name:'Fixture',contact_phone:'91234567',age_years:60,gender:'F'};for(let n=1;n<=16;n++)answers['gas'+String(n).padStart(2,'0')+'_score']=0;for(let n=1;n<=14;n++)answers['mri_sas'+String(n).padStart(2,'0')+'_score']=0;const app=await setup(['gas','mri_sas'],{checkpoint:{answers,step:33,revision:0}});try{await verify(app);await app.page.getByRole('button',{name:'檢查並提交',exact:true}).click();await app.page.getByText('已收到您填寫的問卷，謝謝。',{exact:true}).waitFor();const finals=app.calls.filter(p=>p.event_type);assert.equal(finals.length,2);assert.ok(finals.every(p=>p.invite_token==='fixture-token'));assert.equal(app.calls.filter(p=>p.action==='invite_checkpoint').length,0);}finally{await app.close();}});
test('same-device normal-scale progress survives reload only after phone verification',async()=>{const app=await setup(['gas']);try{await verify(app);await app.page.locator('.question input').fill('Local fixture');await app.page.getByRole('button',{name:'下一題',exact:true}).click();await app.page.locator('.question input').fill('61');await app.page.reload();await app.page.getByLabel('完整聯絡電話').waitFor();assert.equal(await app.page.locator('.question').count(),0);await verify(app);assert.equal(await app.page.locator('.question input').inputValue(),'61');await app.page.getByRole('button',{name:'上一題',exact:true}).click();assert.equal(await app.page.locator('.question input').inputValue(),'Local fixture');}finally{await app.close();}});
test('staff creates token-only links and must preview revision before approval',async()=>{const app=await setup();try{await app.page.goto('http://apathy.test/?flow=questionnaire_links');await app.page.locator('input[type=password]').fill('080');await app.page.getByRole('button',{name:'進入',exact:true}).click();await app.page.getByLabel('收件聯絡電話').fill('91234567');await app.page.locator('input[type=checkbox][value=hads]').check();await app.page.getByLabel(/參加者組別/).selectOption('HC');await app.page.getByRole('button',{name:'產生連結',exact:true}).click();await app.page.waitForFunction(()=>document.querySelector('textarea').value.includes('invite='));const link=await app.page.locator('textarea').inputValue();assert.equal(new URL(link).searchParams.has('phone'),false);const creation=app.calls.find(p=>p.action==='staff_invite_create');assert.equal(creation.data.phone,'91234567');assert.equal(creation.data.cohort,'HC');assert.ok(creation.access);await app.page.getByLabel('參加者問卷連結',{exact:true}).fill(link);assert.equal(await app.page.getByRole('button',{name:'批准繼續',exact:true}).isDisabled(),true);await app.page.getByRole('button',{name:'查看待批資料'}).click();await app.page.getByText(/HADS A：7/).waitFor();await app.page.getByRole('button',{name:'批准繼續',exact:true}).click();await app.page.getByText(/已批准。請參加者/).waitFor();const allow=app.calls.find(p=>p.action==='staff_invite_allow');assert.deepEqual(allow.data,{token:'fixture-token',revision:8});}finally{await app.close();}});
for(const scale of ['sas','quiprs'])test(scale+' normal boundary saves only its completed gate and continues',async()=>{const bank={};require('node:vm').runInNewContext(require('node:fs').readFileSync(path.join(root,'question-bank.js'),'utf8'),{window:bank});const items=scale==='sas'?bank.APATHY_QUESTION_BANK.sas.items:bank.APATHY_QUESTION_BANK.quiprs.matrixCells;const answers={participant_name:'Fixture',contact_phone:'91234567',age_years:60,gender:'F'};for(const item of items.slice(0,-1))answers[item.name]=0;const app=await setup([scale],{checkpoint:{answers,step:3+items.length-1,revision:0}});try{await verify(app);if(scale==='quiprs')await app.page.getByRole('button',{name:'有',exact:true}).click();await app.page.locator('.options button').first().click();await app.page.getByRole('heading',{name:'檢查並提交',exact:true}).waitFor();assert.deepEqual(app.calls.filter(p=>p.action==='invite_checkpoint').map(p=>p.scale),[scale]);}finally{await app.close();}});
test('legacy anonymous questionnaire URL still opens its original identity flow',async()=>{const app=await setup();try{await app.page.goto('http://apathy.test/?flow=questionnaires&scales=gas&request=legacy-fixture');await app.page.getByRole('heading',{name:'姓名',exact:true}).waitFor();assert.equal(await app.page.getByLabel('完整聯絡電話').count(),0);}finally{await app.close();}});
test('legacy request parameter cannot open a bound invitation draft',async()=>{const app=await setup(['gas']);try{await verify(app);await app.page.locator('.question input').fill('Private bound fixture');await app.page.goto('http://apathy.test/?flow=questionnaires&scales=gas&request=fixture-token');await app.page.getByRole('heading',{name:'姓名',exact:true}).waitFor();assert.equal(await app.page.locator('.question input').inputValue(),'');}finally{await app.close();}});

test('HC resumes an existing QUIP medication page and completes applicable QUIP-RS items',async()=>{
 const bank={};require('node:vm').runInNewContext(require('node:fs').readFileSync(path.join(root,'question-bank.js'),'utf8'),{window:bank});
 const quip=bank.APATHY_QUESTION_BANK.quip,rs=bank.APATHY_QUESTION_BANK.quiprs;
 const answers={participant_name:'Fixture',contact_phone:'91234567',age_years:60,gender:'F'};
 for(const item of quip.matrixCells)answers[item.name]=0;
 for(const item of rs.matrixCells.filter(x=>x.domain!=='F'))answers[item.name]=0;
 const app=await setup(['quip','quiprs','gas'],{checkpoint:{answers,step:23,revision:1}});
 try{
  await verify(app);
  await app.page.getByRole('button',{name:'沒有',exact:true}).click();
  await app.page.getByText(/QUIP　/).waitFor();
  assert.doesNotMatch(await app.page.locator('.question h2').textContent(),/柏金遜症藥物/);
  for(let i=0;i<3;i++){
   const label=await app.page.locator('.question h2').textContent();
   await app.page.locator('.options button').first().click();
   await app.page.waitForFunction(previous=>document.querySelector('.question h2')?.textContent!==previous,label);
  }
  await app.page.getByText(/QUIP-RS　/).waitFor();
  for(let i=0;i<24;i++){
   assert.doesNotMatch(await app.page.locator('.question h2').textContent(),/柏金遜症藥物/);
   const label=await app.page.locator('.question h2').textContent();
   await app.page.locator('.options button').first().click();
   await app.page.waitForFunction(previous=>document.querySelector('.question h2')?.textContent!==previous,label);
  }
  await app.page.getByText(/GAS　/).waitFor();
  const gate=app.calls.find(p=>p.action==='invite_checkpoint');
  assert.equal(gate.scale,'quiprs');
  assert.equal(gate.answers.quiprs_f_1_score,0);
  assert.equal(gate.answers.quiprs_f_not_applicable,1);
  await app.page.reload();
  await verify(app);
  await app.page.getByText(/GAS　/).waitFor();
  assert.equal(gate.answers.quip_f1_yes,0);
 }finally{await app.close();}
});


test('new participant HC preset issues one link for screening and all Stage 2 questionnaires',async()=>{
 const app=await setup();
 try{
  await app.page.goto('http://apathy.test/?flow=questionnaire_links');
  await app.page.locator('input[type=password]').fill('080');
  await app.page.getByRole('button',{name:'進入',exact:true}).click();
  await app.page.getByRole('button',{name:'選取完整 HC 問卷',exact:true}).click();
  await app.page.getByLabel('收件聯絡電話').fill('92345678');
  await app.page.getByRole('button',{name:'產生連結',exact:true}).click();
  await app.page.waitForFunction(()=>document.querySelector('textarea').value.includes('invite='));
  const creation=app.calls.find(p=>p.action==='staff_invite_create');
  assert.deepEqual(creation.data,{phone:'92345678',cohort:'HC',scales:['hads','sas','quip','quiprs','rbdsq','gas','ami','cdars','rgpts','pdi','ior']});
 }finally{await app.close();}
});
