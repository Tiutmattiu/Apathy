const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),test=require('node:test');
const ctx=vm.createContext({window:{},URL,URLSearchParams});
vm.runInContext(fs.readFileSync('question-bank.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('questionnaire-links.js','utf8'),ctx);
const q=ctx.window.APATHY_QUESTIONNAIRE_LINKS,b=ctx.window.APATHY_QUESTION_BANK;
const valid={participant_name:'TEST PARTICIPANT',contact_phone:'+852 9123 4567',age_years:'60',gender:'F'};
test('selection is canonical, deduplicated and rejects unknown or empty sets',()=>{
 assert.deepEqual(Array.from(q.selection('ior,gas,gas')),['gas','ior']);
 assert.throws(()=>q.selection('gas,unknown'));assert.throws(()=>q.selection(''));
});
test('links contain only the selection and an invitation key',()=>{
 const u=new URL(q.link('https://example.test/Apathy/?old=1#other',['gas','ami'],'invite-test-123'));
 assert.equal(u.searchParams.get('flow'),'questionnaires');assert.equal(u.searchParams.get('scales'),'gas,ami');assert.equal(u.searchParams.has('old'),false);assert.equal(u.hash,'');
});
test('drafts for different selections and invitations do not share identity or completion flags',()=>{
 assert.notEqual(q.draftKey(['gas'],'invite-test-123'),q.draftKey(['ami'],'invite-test-123'));
 assert.notEqual(q.draftKey(['gas'],'invite-test-123'),q.draftKey(['gas'],'invite-test-456'));
});
test('identity requires a name, HK phone, integral age and sex',()=>{
 assert.equal(q.identity(valid).contact_phone_normalized,'91234567');
 for(const bad of [{participant_name:''},{contact_phone:'9123456'},{age_years:'60.5'},{gender:''}])assert.throws(()=>q.identity({...valid,...bad}));
});
test('single questionnaire pages contain identity and only the selected questions',()=>{
 const pages=q.pages(['gas'],b);
 assert.equal(pages.filter(p=>p.section==='身份確認').length,4);
 assert.equal(pages.filter(p=>p.questionnaire==='gas').length,16);
 assert.equal(pages.some(p=>/^(ami|hads|sas)/.test(p.key||'')),false);
});
test('all eleven questionnaires reuse their formal bank fields and include explicit binary answers',()=>{
 const pages=q.pages(q.catalog.map(x=>x.id),b);
 assert.equal(pages.filter(p=>p.questionnaire==='quip').filter(p=>p.key&&/_yes$/.test(p.key)).length,27);
 assert.equal(pages.filter(p=>p.questionnaire==='quiprs').length,28);
 assert.equal(pages.filter(p=>p.questionnaire==='pdi').length,21);
});
test('supplement payload excludes unselected defaults and preserves legitimate scored zeros',()=>{
 const p=q.payload(['gas'],{...valid,gas01_score:0,gas_complete:1,ami_complete:0,sas_total:0,medication_applicability:'not_applicable'},'submission-test-123','2026-01-01T00:00:00Z');
 assert.equal(p.event_type,'questionnaire_supplement');assert.equal(p.form_type,'backfill');assert.equal(p.data_source,'participant_remote');assert.equal(p.gas01_score,0);
 assert.equal('ami_complete' in p,false);assert.equal('sas_total' in p,false);assert.equal('medication_applicability' in p,false);
});
test('QUIP selection does not admit unrelated QUIP-RS state',()=>{
 const p=q.payload(['quip'],{...valid,quip_a1_yes:0,quiprs_complete:0},'submission-test-123','2026-01-01T00:00:00Z');assert.equal(p.quip_a1_yes,0);assert.equal('quiprs_complete' in p,false);
});

test('SAS displayed options store numeric item-specific scores, including reversed items',()=>{
 const pages=q.pages(['sas'],b).filter(p=>p.questionnaire==='sas');
 pages.forEach((page,index)=>assert.deepEqual(Array.from(page.options,x=>x.value),Array.from(b.sas.scoring.displayOrderByItem[index+1])));
 assert.equal(pages.every(page=>page.options.every(o=>Number.isInteger(o.value)&&o.value>=0&&o.value<=3)),true);
});
