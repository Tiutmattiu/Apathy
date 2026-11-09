const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const source=fs.readFileSync(path.join(root,'app.js'),'utf8');
function setup(answers={}){
  const ctx=vm.createContext({window:{},answers});
  vm.runInContext(fs.readFileSync(path.join(root,'question-bank.js'),'utf8'),ctx);
  vm.runInContext(`const B=window.APATHY_QUESTION_BANK; const ST={answers,flow:'screening'};
    const val=k=>ST.answers[k]===undefined?null:ST.answers[k];
    function safeSave(){}; function isGuidedFlow_(){return false}`,ctx);
  for(const name of ['present','completeKeys','sumOrNull','setDerived','complete','sum','scoreQuipRS','updrsTotal','calculateAllDerived','pageComplete','anySelectedV3']){
    const start=source.indexOf('function '+name+'(');
    assert.notEqual(start,-1,name);
    const end=source.indexOf('\nfunction ',start+1);
    vm.runInContext(source.slice(start,end),ctx);
  }
  return ctx;
}
function rbAnswers(ctx){
  const b=ctx.window.APATHY_QUESTION_BANK.rbdsq;
  ctx.answers[b.sourceField]=b.sourceOptions[0].value;
  b.items.forEach((x,i)=>ctx.answers[x.name]=i<5?1:0);
  ctx.answers.rbdsq_section_confirmed=1;
  ctx.answers.pd_hc_status='HC';
  return b;
}
test('selected Q10 disease permits completion and produces a score without changing raw answers',()=>{
  const c=setup(),b=rbAnswers(c);
  c.answers[b.diseaseItems[0].name]=1;
  const raw=JSON.stringify(c.answers);
  assert.equal(c.pageComplete({kind:'rbQ10'}),true);
  c.calculateAllDerived();
  assert.equal(c.answers.rbdsq_total,6);
  assert.equal(c.answers.rbdsq_complete,1);
  assert.equal(c.answers.rbdsq_positive_flag,1);
  for(const [k,v] of Object.entries(JSON.parse(raw)))assert.equal(c.answers[k],v);
  assert.equal(c.answers[b.diseaseItems[1].name],undefined);
});
test('unanswered Q10 stays missing; explicit all-no gives zero Q10 points',()=>{
  const c=setup(),b=rbAnswers(c);
  c.calculateAllDerived();assert.equal(c.answers.rbdsq_total,null);
  b.diseaseItems.forEach(x=>c.answers[x.name]=0);
  c.answers.rbq10_none_confirmed=1;
  c.calculateAllDerived();assert.equal(c.answers.rbdsq_total,5);
  c.answers.pd_hc_status='PD';c.calculateAllDerived();assert.equal(c.answers.rbdsq_positive_flag,0);
});
test('missing main responses or source never produce a formal score',()=>{
  const c=setup(),b=rbAnswers(c);
  c.answers[b.diseaseItems[0].name]=1;
  delete c.answers[b.items[0].name];c.calculateAllDerived();assert.equal(c.answers.rbdsq_total,null);
  c.answers[b.items[0].name]=0;delete c.answers[b.sourceField];
  c.calculateAllDerived();assert.equal(c.answers.rbdsq_total,null);
});
test('current screening identity validation accepts HC with no PD duration',()=>{
  const c=setup({pd_hc_status:'HC',pd_status_self_report:0,pd_duration_years_self_report:null});
  assert.equal(c.pageComplete({kind:'pdIdentity'}),true);
  assert.equal(c.pageComplete({kind:'choice',key:'pd_status_self_report'}),true);
});
function loadFunction(c,name){
  const start=source.indexOf('function '+name+'('),end=source.indexOf('\nfunction ',start+1);
  const code=source.slice(start,end);
  vm.runInContext(name==='handleGlobalKeydown'?code.slice(0,code.indexOf('/* =====')):code,c);
}
test('HC identity page offers a Next button and Enter advances without PD duration',()=>{
  const c=setup({pd_hc_status:'HC',pd_status_self_report:0});
  vm.runInContext(`
    const nodes=[];
    function el(tag,cls,text){const n={tag,cls,text,children:[],append(...xs){this.children.push(...xs)},querySelector(){return null}};nodes.push(n);return n}
    function btn(text,fn,cls){return Object.assign(el('button',cls,text),{onclick:fn})}
    const document={activeElement:null};
    const pages=[{kind:'pdIdentity',section:'basic',label:'identity'},{kind:'input',key:'contact_phone',section:'basic'}];
    ST.step=0;function playerPages(){return pages}
    function appShell(){return el('main')}function toolbar(){}function identityStrip(){}
    function renderPage(){}function setTimeout(){}function saveDraft(){}
    function manualNext(pg){if(pageComplete(pg))ST.step++}
    function jumpSection(){}function home(){}
  `,c);
  loadFunction(c,'player');loadFunction(c,'handleGlobalKeydown');
  c.player();
  assert.equal(vm.runInContext("nodes.some(n=>n.tag==='button'&&n.cls==='next')",c),true);
  vm.runInContext("handleGlobalKeydown({key:'Enter',preventDefault(){}})",c);
  assert.equal(vm.runInContext('ST.step',c),1);
});
test('identity completion requires a selection and PD years only for PD',()=>{
  const c=setup();
  assert.equal(c.pageComplete({kind:'pdIdentity'}),false);
  c.answers.pd_hc_status='PD';assert.equal(c.pageComplete({kind:'pdIdentity'}),false);
  c.answers.pd_duration_years_self_report=0;assert.equal(c.pageComplete({kind:'pdIdentity'}),true);
  c.answers.pd_hc_status='HC';delete c.answers.pd_duration_years_self_report;
  assert.equal(c.pageComplete({kind:'pdIdentity'}),true);
});
