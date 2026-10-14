const fs=require('fs'),vm=require('vm'),test=require('node:test'),assert=require('node:assert/strict');
const source=fs.readFileSync('app.js','utf8');
function context(){const inputs=[];const c=vm.createContext({el:()=>{const x={type:'text',raw:'',set value(v){this.raw=this.type==='number'&&v!==''&&!Number.isFinite(Number(v))?'':String(v)},get value(){return this.raw}};inputs.push(x);return x},renderByFlow:()=>{},inputs});
for(const name of ['medHVNumericText_','medHVInput_']){const match=source.match(new RegExp('function '+name+'\\([^]*?(?=\\nfunction |\\n\\nfunction )'));if(match)vm.runInContext(match[0],c);}return c;}
test('medication numeric inputs preserve and normalize fullwidth decimals instead of showing blank',()=>{const c=context();const x=c.medHVInput_('１．８７５','單位劑量 mg',()=>{});assert.equal(x.value,'1.875');});
test('legacy parsed mg strengths display numerically and update the saved value',()=>{const c=context();let saved;const x=c.medHVInput_('1.875 mg','單位劑量 mg',v=>saved=v);assert.equal(x.value,'1.875');assert.equal(saved,'1.875');});
test('typing half-tablet quantity persists as decimal and invalid text is retained for correction',()=>{const c=context();let saved;const x=c.medHVInput_('','每次數量',v=>saved=v);x.value='0.5';x.oninput();assert.equal(saved,'0.5');x.value='1..875';x.oninput();assert.equal(x.value,'1..875');});
test('only ordinary nonnegative decimal doses can enter LEDD calculations',()=>{
 const c=vm.createContext({});const match=source.match(/function medHVNum_\([^]*?(?=\nfunction |\n\nfunction )/);vm.runInContext(match[0],c);
 assert.equal(c.medHVNum_('1.875'),1.875);assert.equal(c.medHVNum_('0.5'),0.5);
 for(const bad of ['0x10','-1','1..875','1e3','Infinity'])assert.equal(c.medHVNum_(bad),null,bad);
});
