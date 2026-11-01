const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('app.js','utf8');
const fn=source.slice(source.indexOf('async function checkCorrectionSync('),source.indexOf("\nif(new URLSearchParams(window.location.search).get('flow')==='questionnaires')",source.indexOf('async function checkCorrectionSync(')));
function setup(read){const status={textContent:'Previous status',scrollIntoView(){},setAttribute(){},removeAttribute(){}};const button={disabled:false,textContent:'查看同步進度',isConnected:true};const ctx={ST:{correction:{receipt:null}},q:()=>status,correctionRead:read,RC:require('../record-correction.js')};vm.createContext(ctx);vm.runInContext(fn,ctx);return{ctx,status,button};}
test('sync query immediately shows loading and prevents duplicate requests while awaiting backend',async()=>{
 let resolve,requests=0;const pending=new Promise(r=>resolve=r);
 const {ctx,status,button}=setup(()=>{requests++;return pending;});
 const result=ctx.checkCorrectionSync({currentTarget:button});
 try{assert.match(status.textContent,/正在查詢/);assert.equal(button.disabled,true);await ctx.checkCorrectionSync({currentTarget:button});assert.equal(requests,1);}
 finally{resolve({ok:true,status:{status:'SUCCEEDED',stage:'COMPLETE',progress:{pending_count:0,last_success_at:'2026-11-01T07:34:17.590Z'}}});await result;}
 assert.equal(button.disabled,false);
 assert.match(status.textContent,/最近一次同步已完成/);
});
test('sync query reports connection failure and restores the retry button',async()=>{
 const {ctx,status,button}=setup(async()=>{throw Error('讀取超時');});
 await ctx.checkCorrectionSync({currentTarget:button});
 assert.match(status.textContent,/讀取超時/);assert.match(status.textContent,/重試/);assert.equal(button.disabled,false);
});

test('a completed global run without a receipt timestamp does not claim this correction is synced',async()=>{
 const {ctx,status}=setup(async()=>({ok:true,status:{status:'SUCCEEDED',stage:'COMPLETE',progress:{pending_count:0,last_success_at:'2026-11-01T07:34:17.590Z'}}}));
 ctx.ST.correction.receipt={submission_id:'fixture'};
 await ctx.checkCorrectionSync();
 assert.match(status.textContent,/最近一次同步已完成/);assert.match(status.textContent,/待處理.*0/);assert.doesNotMatch(status.textContent,/本次更正後的同步已完成/);
});
test('running sync shows the server step labels instead of internal codes',async()=>{
 const {ctx,status}=setup(async()=>({ok:true,status:{status:'RUNNING',stage:'RESULT',progress:{pending_count:2,steps:[{key:'EVENT',label:'整理原始記錄',status:'completed'},{key:'RESULT',label:'更新Boss',status:'running'}]}}}));
 await ctx.checkCorrectionSync();assert.match(status.textContent,/正在同步/);assert.match(status.textContent,/更新Boss/);assert.match(status.textContent,/待處理.*2/);
});
