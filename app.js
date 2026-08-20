// @ts-nocheck
'use strict';
(function(){
const B=window.APATHY_QUESTION_BANK,C=window.FORM_CONFIG,ROOT=document.getElementById('app');

const FRONTEND_RELEASE='FE-CLEAN-2026-08-20-R8.9-SINGLE-POST-RECEIPT-COMPLETE';

if(!B||!C) throw new Error('Question Bank或Config未載入。');

const ST={flow:'home',step:0,answers:{},error:'',submission:uuid(),sectionOpen:false,meds:[],submitting:false,staffUnlocked:false};

const q=(s,p=document)=>p.querySelector(s), qa=(s,p=document)=>Array.from(p.querySelectorAll(s));

const el=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x};

const btn=(text,fn,cls='')=>{const x=el('button',cls,text);x.type='button';x.onclick=fn;return x};

const val=k=>ST.answers[k]===undefined?null:ST.answers[k];

function set(k,v){ST.answers[k]=v;saveDraft()}

function uuid(){return crypto.randomUUID?crypto.randomUUID():'sub-'+Date.now()+'-'+Math.random().toString(36).slice(2)}

function saveDraft(){localStorage.setItem('apathy-fe-clean-v2-'+ST.flow,JSON.stringify({answers:ST.answers,step:ST.step,meds:ST.meds,submission:ST.submission}))}

function loadDraft(flow){try{const current='apathy-fe-clean-v2-'+flow,legacy=['apathy-fe-clean-v1-'+flow,'apathy-v7-'+flow],raw=localStorage.getItem(current)||legacy.map(k=>localStorage.getItem(k)).find(Boolean)||'null',d=JSON.parse(raw);if(d){ST.answers=d.answers||{};ST.step=d.step||0;ST.meds=d.meds||[];ST.submission=d.submission||uuid();localStorage.setItem(current,JSON.stringify({answers:ST.answers,step:ST.step,meds:ST.meds,submission:ST.submission}))}else resetFlow()}catch(e){resetFlow()}}

function resetFlow(){ST.answers={};ST.step=0;ST.meds=[];ST.submission=uuid()}

function nowHK(){return new Date().toLocaleString('zh-HK',{hour12:false})}

function appShell(){ROOT.innerHTML='';ROOT.append(el('div','topline'));const m=el('main','app');ROOT.append(m);return m}

function toolbar(title,homeButton=true){const b=el('header','toolbar');b.append(el('h1','',title));const a=el('div','tool-actions');a.append(btn('下載本地JSON',downloadCurrent,'linkbtn'));if(ST.flow!=='home')a.append(btn('清除此裝置資料',confirmClear,'linkbtn'));if(homeButton)a.append(btn('返回首頁',home,'linkbtn'));b.append(a);return b}

function home(){ST.flow='home';const m=appShell();const t=toolbar('Apathy研究評估',false);const sw=el('div','staff-wrap'),pop=el('div','staff-pop hidden');const sb=btn('工作人員模式 ▾',()=>pop.classList.toggle('hidden'),'linkbtn');C.staffFlows.forEach(x=>pop.append(btn(x[1],()=>staffGate(x[0],x[1]))));sw.append(sb,pop);t.lastChild.append(sw);m.append(t);const h=el('section','home');h.append(el('h2','','研究問卷'),el('p','','請按下方按鈕開始或繼續填寫。正式問卷每次只顯示一個回答單位，完成答案後自動前進。'),btn('開始／繼續填寫',()=>start('stage2'),'primary'));m.append(h)}

function start(flow){ST.flow=flow;loadDraft(flow);ST.error='';if(flow==='stage2'||flow==='screening')return player();if(flow==='backfill')return backfill();if(flow==='mri_visit')return identityGate('MRI到訪記錄');if(flow==='clinical')return identityGate('PD臨床資料')}

function staffGate(flow,title){if(ST.staffUnlocked)return start(flow);const m=appShell();m.append(toolbar('工作人員登入'));const s=el('section','staff-password');s.append(el('h2','',title),el('p','hint','請輸入工作人員密碼。'));const i=el('input','text');i.type='password';i.inputMode='numeric';i.placeholder='工作人員密碼';const e=el('div','error');const go=()=>{if(i.value===String(C.staffPassword||'080')){ST.staffUnlocked=true;start(flow)}else e.textContent='密碼不正確。'};i.onkeydown=x=>{if(x.key==='Enter')go()};s.append(i,e,btn('進入',go,'primary'));m.append(s);setTimeout(()=>i.focus(),20)}

function normalizeId(v){return String(v||'').trim().toUpperCase().replace(/\s+/g,'')}

function sameValue(a,b){return a!==null&&a!==undefined&&b!==null&&b!==undefined&&String(a)===String(b)}

function numericIdValue(v){return String(v||'').toUpperCase().replace(/[^0-9]/g,'')}

function canonicalParticipantId(digits){const prefix=val('participant_series')==='Y'?'Y':'P';return digits?prefix+digits:''}

function canonicalScanId(digits){return digits?'S'+digits:''}

function fieldText(label,key,placeholder='',type='text'){const f=el('div','field');f.append(el('label','',label));const i=el('input','text');i.type=type;i.placeholder=placeholder;i.value=val(key)??'';i.oninput=()=>set(key,i.value);i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();const all=qa('input,textarea,button',document);const n=all[all.indexOf(i)+1];if(n)n.focus()}};f.append(i);return f}

function identityStrip(){return el('div','identity-strip',`目前Participant：${val('p_id')||'未分配'}${val('participant_name')?'｜'+val('participant_name'):''}${val('pd_hc_status')?'｜'+val('pd_hc_status'):''}${val('s_id')?'｜'+val('s_id'):''}　 本機記錄時間：${nowHK()}`)}

function playerPages(){return ST.flow==='stage2'?stage2Pages():screeningPages()}

function scaleQuestionLabel_(item,section,index){
  const candidates=[
    item&&item.fullLabel,item&&item.combinedFormalLabel,item&&item.question,
    item&&item.questionText,item&&item.question_text,item&&item.prompt,
    item&&item.stem,item&&item.fullText,item&&item.full_text,
    item&&item.text,item&&item.title,item&&item.label,
    item&&item.backfillLabel,item&&item.backfill_label
  ];
  const label=candidates.find(function(value){return value!==null&&value!==undefined&&String(value).trim()!==''&&String(value).trim().toLowerCase()!=='undefined';});
  if(label)return String(label).trim();
  const code=String(item&&item.name||item&&item.responseName||'').trim();
  console.error('QUESTION_LABEL_MISSING',section,index+1,code,item);
  return String(section||'問卷')+' 第'+String(index+1)+'題';
}
function addScalePages(arr,section,items){items.forEach((x,n)=>arr.push({section,kind:'scale',label:scaleQuestionLabel_(x,section,n),key:x.name||x.responseName,options:x.options||x.responseOptions,item:n+1,total:items.length,instruction:x.instructions||''}))}

function choicePage(section,label,key,options){return{section,kind:'choice',label,key,options}}

function inputPage(section,label,key,placeholder){return{section,kind:'input',label,key,placeholder}}

function jumpSection(i,pages){ST.step=i;ST.error='';ST.sectionOpen=false;saveDraft();player()}

function renderInput(pg,a){const i=el('input','text');i.placeholder=pg.placeholder||'';i.value=val(pg.key)??'';i.oninput=()=>set(pg.key,i.value);i.onkeydown=e=>{if(e.key==='Enter'&&i.value.trim())autoNext()};a.append(i)}

function finishDOB(a){const d=+val('dob_d'),m=+val('dob_m'),y=+val('dob_y'),dt=new Date(y,m-1,d);if(dt.getFullYear()!==y||dt.getMonth()!==m-1||dt.getDate()!==d||dt>new Date()){ST.error='出生日期無效，請核對。';return player()}set('date_of_birth',`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`);autoNext()}

function renderPositiveOne(pg,a){
  const g=el('div','direct'),b=btn(pg.button,()=>{set(pg.key,sameValue(val(pg.key),1)?0:1);if(!sameValue(val(pg.key),1)&&pg.conditional)set(pg.conditional.key,null);player()},sameValue(val(pg.key),1)?'selected':'');g.append(b);a.append(g);
  if(sameValue(val(pg.key),1)&&pg.conditional){const f=el('div','field conditional');f.append(el('label','',pg.conditional.label));const i=el('input','text');i.type='number';i.value=val(pg.conditional.key)??'';i.oninput=()=>set(pg.conditional.key,i.value===''?null:Number(i.value));i.onkeydown=e=>{if(e.key==='Enter'&&i.value!==''){e.preventDefault();autoNext()}};f.append(i,document.createTextNode(' '+pg.conditional.unit));a.append(f)}
}

function renderMoca(a){
  const i=el('input','text');i.type='number';i.min=0;i.max=30;i.placeholder='0–30';i.value=val('moca_1_raw_total')??'';
  const result=el('div');
  const update=()=>{const raw=i.value===''?null:Number(i.value);set('moca_1_raw_total',raw);result.innerHTML='';const age=calcAge(),edu=Number(val('education_years'));if(raw===null||age===null||!Number.isFinite(edu)){result.append(el('div','result','輸入總分並完成出生日期與教育資料後，系統會顯示第16百分位結果。'));return}const adj=edu<=12?1:0,adjusted=Math.min(30,raw+adj),cut=mocaCutoff(age,edu);Object.assign(ST.answers,{moca_1_adjustment:adj,moca_1_adjusted_total:adjusted,moca_1_age_years:age,moca_1_education_years:edu,moca_1_16th_cutoff:cut,moca_1_norm_result_code:cut===null?null:(raw>cut?1:0)});saveDraft();const r=el('div','result '+(cut!==null&&raw<=cut?'bad':'good'));r.innerHTML=`原始總分：${raw}/30<br>教育調整：+${adj}<br>調整後總分：${adjusted}/30<br>第16百分位Cutoff：${cut===null?'65歲以下，需覆核':cut}<br>結果：${cut===null?'待覆核':raw>cut?'高於第16百分位':'低於或等於第16百分位'}${cut===null?'':`<br>相對Cutoff：${raw-cut>=0?'+':''}${raw-cut}分`}`;result.append(r)};
  i.oninput=()=>{let n=i.value===''?null:Number(i.value);if(n!==null&&(n<0||n>30)){i.setCustomValidity('MoCA原始總分必須為0至30');return}i.setCustomValidity('');update()};i.onkeydown=e=>{if(e.key==='Enter'&&i.value!==''){e.preventDefault();update();autoNext()}};a.append(i,result);update()
}

function renderQuipShared(pg,a){const g=el('div','toggle-grid');B.quip.domains.forEach(d=>{const key=`quip_${d.key}${pg.stem.index}_yes`,label=d.fullLabel;g.append(toggleButton(label,key,()=>player()))});a.append(g,el('p','hint','未選項目代表「否」。可選零項、一項或多項。'))}

function renderQuipExtra(pg,a){const g=el('div','toggle-grid');pg.items.forEach(i=>{const wrap=el('div');wrap.append(toggleButton(i.backfillLabel.replace(/^\w+\s*/,''),i.name,()=>player()));if(i.detailField&&val(i.name)===1){const t=el('textarea','conditional');t.placeholder=i.code==='E1'?'請具體描述活動／任務':'請具體描述重複行為';t.value=val(i.detailField)||'';t.oninput=()=>set(i.detailField,t.value);wrap.append(t)}g.append(wrap)});a.append(g,el('p','hint','未選項目代表「否」。完成整組後按下一題。'))}

function toggleButton(label,key,rerender){return btn(label,()=>{set(key,val(key)===1?0:1);rerender&&rerender()},'toggle'+(val(key)===1?' selected':''))}

function renderRBMain(a){
  const f=el('div','field');f.append(el('div','label','資料由誰提供？'));
  const source=el('div','direct');
  B.rbdsq.sourceOptions.forEach(o=>source.append(btn(o.label,()=>{
    set(B.rbdsq.sourceField,sameValue(val(B.rbdsq.sourceField),o.value)?null:o.value);
    set('rbdsq_section_confirmed',0);player();
  },'choice'+(sameValue(val(B.rbdsq.sourceField),o.value)?' selected':''))));
  f.append(source);a.append(f);
  const g=el('div','toggle-grid');
  B.rbdsq.items.forEach(i=>g.append(btn(i.fullLabel,()=>{
    set(i.name,val(i.name)===1?null:1);
    set('rbdsq_section_confirmed',0);player();
  },'toggle'+(val(i.name)===1?' selected':''))));
  a.append(g,el('p','hint','選中的項目代表「是」。核對完成後，請按下方確認；未選項目才會正式記為「否」。'));
  a.append(btn('本頁已核對，未選項目均為否',()=>{
    B.rbdsq.items.forEach(i=>{if(!present(i.name))set(i.name,0)});
    set('rbdsq_section_confirmed',1);player();
  },'choice'+(val('rbdsq_section_confirmed')===1?' selected':'')));
}

function renderScaleIntro(pg,a){
  a.append(el('div','plain-block'),el('p','instruction',pg.introText||''));
  const note=el('div','result good');
  note.append(el('strong','',pg.introTitle||pg.section),el('p','',pg.introText||''));
  a.innerHTML='';a.append(note);
}
function renderScreenResult(a){
  calculateAllDerived();
  const s=screenScores(),lines=[];
  lines.push(s.moca);
  lines.push(`HADS A：${s.hadsComplete?s.hadsA+'/21':'未完成'}｜門檻 >6｜${s.hadsComplete?(s.hadsA>6?'需要情緒覆核':'不需情緒覆核'):'暫不判定'}`);
  lines.push(`HADS D：${s.hadsComplete?s.hadsD+'/21':'未完成'}｜門檻 >9｜${s.hadsComplete?(s.hadsD>9?'需要情緒覆核':'不需情緒覆核'):'暫不判定'}`);
  lines.push(`SAS：${s.sasComplete?s.sas+'/42｜門檻 ≥14｜'+(s.sas>=14?'達門檻':'未達門檻'):'未完成｜暫不計分'}`);
  lines.push(`QUIP-RS：${s.quiprs}`);
  lines.push(`RBDSQ：${s.rb}`);
  lines.push(`MRI安全：${s.mri}`);
  lines.push(`臨時流程提示：${s.reasons.length?s.reasons.join('；'):'目前沒有額外覆核提示。'}`);
  lines.push('以上只供工作人員即場核對；正式結果、Group及Decision以後端Result Core為準。');
  a.append(resultBox('首次篩查臨時結果',lines,s.blockers.length?'warn':'good'));
  a.append(el('h3','','工作人員最終決定'),el('p','hint','請根據完整篩查資料作出本次流程決定。前端提示不會自動代替工作人員決定。'));
  const g=el('div','direct');
  C.finalDecisions.forEach(x=>g.append(btn(x[1],()=>{set('final_screening_decision',x[0]);player()},'choice'+(sameValue(val('final_screening_decision'),x[0])?' selected':''))));
  a.append(g);
  renderMRIAdminFields(a);
  if(['OTHER_EXCLUDE','PENDING'].includes(val('final_screening_decision'))){const t=el('textarea');t.placeholder='請說明最終決定原因';t.value=val('final_screening_reason')||'';t.oninput=()=>set('final_screening_reason',t.value);a.append(t)}
}
function labelledScale(title,key,labels,parent,onDone){const w=el('div','plain-block');w.append(el('strong','',title));const g=el('div','scale-buttons');labels.forEach((lab,n)=>{const value=n+1,b=btn('',()=>{set(key,value);if(onDone)onDone()},val(key)===value?'selected':'');b.append(el('strong','',String(value)),document.createTextNode(lab));g.append(b)});w.append(g);parent.append(w)}

function renderPDIYes(pg,a){a.append(el('p','instruction','未選代表「沒有」；如有此情況，直接點選下方題幹。'));const g=el('div','direct');g.append(btn('有此情況',()=>{set(pg.pdi.yesField,val(pg.pdi.yesField)===1?0:1);if(val(pg.pdi.yesField)===1)autoNext();else player()},val(pg.pdi.yesField)===1?'selected':''));a.append(g)}

function renderPDIDim(pg,a){if(val(pg.pdi.yesField)===0){a.append(el('div','result','此題已選「沒有」，三個程度分數自動記為0。'));return}const d=pg.pdi.dimensions[pg.dim];renderScale({options:d.options,key:d.name,item:1,total:1},a)}

function skipRemainingPDI(pdi){const pages=playerPages(),i=pages.findIndex((x,n)=>n>ST.step&&x.kind==='pdiYes');ST.step=i>=0?i:ST.step+1;ST.error='';saveDraft();player()}

function applyDefaultAnswers(pg){if(pg.kind==='pdiPage')B.pdi21.items.slice(pg.from,pg.to).forEach(x=>{if(val(x.yesField)===null){set(x.yesField,0);Object.values(x.dimensions).forEach(d=>set(d.name,0))}});if(pg.kind==='quipShared')B.quip.domains.forEach(d=>{const k=`quip_${d.key}${pg.stem.index}_yes`;if(val(k)===null)set(k,0)});if(pg.kind==='quipExtra')pg.items.forEach(i=>{if(val(i.name)===null)set(i.name,0)});if(pg.kind==='rbMain')B.rbdsq.items.forEach(i=>{if(val(i.name)===null)set(i.name,0)});if(pg.kind==='rbQ10')B.rbdsq.diseaseItems.forEach(i=>{if(val(i.name)===null)set(i.name,0)});if(pg.kind==='mriSafety')C.mriSafety.forEach(x=>{if(val(x[0])===null)set(x[0],0)});if(pg.kind==='positiveOne'&&val(pg.key)===null)set(pg.key,0);if(pg.kind==='pdiYes'&&val(pg.pdi.yesField)===null)set(pg.pdi.yesField,0)}

function autoNext(){const pages=playerPages();if(ST.step<pages.length-1){ST.step++;ST.error='';saveDraft();setTimeout(player,180)}}

function complete(arr){return arr.every(k=>val(k)!==null)}

function sum(arr){return arr.reduce((s,k)=>s+(Number(val(k))||0),0)}

function screenScores(){
  const raw=val('moca_1_raw_total'),cut=val('moca_1_16th_cutoff');
  const hAKeys=[1,3,5,7,9,11,13].map(n=>`hads${String(n).padStart(2,'0')}_score`),hDKeys=[2,4,6,8,10,12,14].map(n=>`hads${String(n).padStart(2,'0')}_score`);
  const hadsComplete=complete(hAKeys.concat(hDKeys)),hA=hadsComplete?sum(hAKeys):null,hD=hadsComplete?sum(hDKeys):null;
  const sasKeys=Array.from({length:14},(_,i)=>`sas${String(i+1).padStart(2,'0')}_score`),sasComplete=complete(sasKeys),sas=sasComplete?sum(sasKeys):null;
  const qr=scoreQuipRS(),rb=scoreRB(),rbComplete=Number(val('rbdsq_complete'))===1,mriSel=C.mriSafety.filter(x=>val(x[0])===1),mriNone=val('mri_safety_none_confirmed')===1;
  const reasons=[],blockers=[];
  const identity=val('pd_hc_status'),selfPd=val('pd_status_self_report');
  if(identity==='HC'&&Number(selfPd)===1){reasons.push('身份待核實');blockers.push('IDENTITY_CONFLICT')}
  if(hadsComplete&&(hA>6||hD>9)){reasons.push(`情緒覆核：HADS A=${hA}、D=${hD}`);blockers.push('EMOTION_EXCLUDE')}
  if(cut!==null&&raw!==null&&raw<=cut){reasons.push('認知覆核：MoCA低於或等於第16百分位');blockers.push('COGNITIVE_EXCLUDE')}
  if(mriSel.length){reasons.push('MRI安全待核實：'+mriSel.map(x=>x[1]).join('、'));blockers.push('MRI_SAFETY_EXCLUDE')}
  if(identity==='HC'&&qr.hit.length)reasons.push('QUIP-RS達PD適用Cutoff（HC只作覆核）：'+qr.hit.join('、'));
  let suggestion='待決定',code='PENDING';
  if(blockers.includes('EMOTION_EXCLUDE')){suggestion='情緒覆核候選';code='EMOTION_EXCLUDE'}
  else if(blockers.includes('COGNITIVE_EXCLUDE')){suggestion='認知覆核候選';code='COGNITIVE_EXCLUDE'}
  else if(blockers.includes('MRI_SAFETY_EXCLUDE')){suggestion='MRI安全覆核候選';code='MRI_SAFETY_EXCLUDE'}
  else if(blockers.includes('IDENTITY_CONFLICT')){suggestion='身份待核實';code='PENDING'}
  else if(identity==='HC'){suggestion='健康對照（HC）';code='HC'}
  else if(qr.complete&&qr.hit.length){suggestion='ICD排除';code='ICD_EXCLUDE';reasons.push('QUIP-RS達到Cutoff：'+qr.hit.join('、'))}
  else if(sasComplete&&sas>=14){suggestion='冷漠組（Apathy）';code='Apathy'}
  else if(sasComplete){suggestion='非冷漠PD組（Pure PD）';code='Pure_PD'}
  return{
    moca:raw===null?'MoCA：未完成':`MoCA：${raw}/30｜${cut===null?'需覆核':raw>cut?'高於第16百分位':'低於或等於第16百分位'}`,
    hadsA:hA,hadsD:hD,hadsComplete,sas,sasComplete,
    quiprs:qr.complete?(qr.hit.length?'達Cutoff：'+qr.hit.join('、'):'完整｜未達排除Cutoff'):'未完成｜暫不計分',
    rb:rbComplete?`${rb.total}/13｜${rb.note}`:'未完成｜暫不計分',
    mri:mriSel.length?`待核實：${mriSel.map(x=>x[1]).join('、')}`:mriNone?'已確認以上項目全部沒有':'尚未完成確認',
    suggestion,code,reasons,blockers
  }
}
function scoreQuipRS(){const domains=['a','b','c','d','e1','e2','f'],tot={};domains.forEach(d=>tot[d]=sum([1,2,3,4].map(n=>`quiprs_${d}_${n}_score`)));const completeAll=domains.every(d=>complete([1,2,3,4].map(n=>`quiprs_${d}_${n}_score`))),E=tot.e1+tot.e2,AD=tot.a+tot.b+tot.c+tot.d,hit=[];if(completeAll){if(tot.a>=6)hit.push('賭博');if(tot.b>=8)hit.push(B.quip.domains.find(d=>d.key==='b')?.fullLabel||QUIP_DOMAIN_B_FULL_LABEL);if(tot.c>=8)hit.push('購物');if(tot.d>=7)hit.push('進食');if(E>=7)hit.push('任務／重複活動');if(AD>=10)hit.push('AD')}return{complete:completeAll,hit,tot,E,AD,AF:AD+E+tot.f}}

function scoreRB(){const keys=B.rbdsq.items.map(x=>x.name),base=sum(keys),q10=B.rbdsq.diseaseItems.some(x=>val(x.name)===1)?1:0,total=base+q10,id=val('pd_hc_status'),cut=id==='PD'?6:id==='HC'?5:null;return{total,note:cut===null?'Cutoff待身份':`${total>=cut?'達到':'未達'}Cutoff ${cut}`}}

function stage2Scores(){return{gas:sum(B.gas.items.map(x=>x.name)),ami:(sum(B.ami18.items.map(x=>x.name))/18).toFixed(2),cdars:sum(B.cdars.items.map(x=>x.name)),rgpts:sum(B.rgpts.items.map(x=>x.name)),pdi:B.pdi21.items.filter(x=>val(x.yesField)===1).length,ior:sum(B.ior.items.map(x=>x.name))}}

function addBFDate(parent,label,key){const w=el('div','field');w.append(el('label','',label));const row=el('div','date-row');[['d','DD',2],['m','MM',2],['y','YYYY',4]].forEach((x,n)=>{const i=el('input','digits');i.inputMode='numeric';i.maxLength=x[2];i.placeholder=x[1];const old=String(val(key)||'').split('-');i.value=n===0?(old[2]||''):n===1?(old[1]||''):(old[0]||'');i.oninput=()=>{i.value=i.value.replace(/\D/g,'').slice(0,x[2]);if(i.value.length===x[2]&&n<2)qa('input',row)[n+1].focus();const ar=qa('input',row);if(ar.every(z=>z.value.length===+z.maxLength)){const d=+ar[0].value,m=+ar[1].value,y=+ar[2].value,dt=new Date(y,m-1,d);if(dt.getFullYear()===y&&dt.getMonth()===m-1&&dt.getDate()===d)set(key,`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`)}};row.append(i)});w.append(row);parent.append(w)}

function addBFCheckbox(parent,label,key){parent.append(toggleButton(label,key,()=>backfill()))}

function addBFNumber(parent,label,key,min,max,unit=''){const r=el('div','bf-row');r.append(el('span','',label));const i=el('input');i.inputMode='numeric';i.placeholder=unit||`${min}–${max}`;i.value=val(key)??'';i.onkeydown=e=>{if(max<=5&&/^\d$/.test(e.key)){e.preventDefault();const n=Number(e.key);if(n<min||n>max)return;set(key,n);i.value=String(n);focusNextInput(i)}};i.oninput=()=>{let raw=i.value.replace(/[^0-9.]/g,'');if(max<=5)raw=raw.slice(-1);i.value=raw;const n=raw===''?null:Number(raw);if(n===null||(Number.isFinite(n)&&n>=min&&n<=max)){set(key,n);if(raw!==''&&max>5){} }else{i.value='';set(key,null)}};i.onkeydown=((orig)=>e=>{if(e.key==='Enter'&&i.value!==''){e.preventDefault();focusNextInput(i);return}orig(e)})(i.onkeydown);r.append(i);parent.append(r)}

function focusNextInput(i){const all=qa('input,textarea',i.closest('.bf-section')||document);const ix=all.indexOf(i);all[ix+1]?.focus()}

function renderCdarsBF(s){B.cdars.domains.forEach(d=>{const block=el('div','plain-block');block.append(el('h3','',d.title),el('p','hint',d.examplePrompt+' '+d.examplePlaceholder));block.append(fieldText('本人例子',d.examplesField,'請輸入紙本所載例子'));addBFScale(block,B.cdars.items.filter(x=>x.domain===d.key),0,4);const ks=B.cdars.items.filter(x=>x.domain===d.key).map(x=>x.name),ok=ks.every(k=>val(k)!==null);block.append(el('div','result',`${d.title}：${ok?sum(ks):'部分完成／暫不計分'}`));s.append(block)})}

function renderRBBF(s){
  const source=el('div','field'),choices=el('div','direct');source.append(el('div','label','資料提供者'));
  B.rbdsq.sourceOptions.forEach(o=>choices.append(btn(o.label,()=>{set(B.rbdsq.sourceField,sameValue(val(B.rbdsq.sourceField),o.value)?null:o.value);backfill()},'choice'+(sameValue(val(B.rbdsq.sourceField),o.value)?' selected':''))));
  source.append(choices,el('p','hint','再次點選已選項可取消。未選資料提供者時，整份空白不會當作全部回答「無」。'));s.append(source);
  const g=el('div','toggle-grid');B.rbdsq.items.forEach(x=>g.append(toggleButton(x.fullLabel,x.name,()=>backfill())));s.append(g,el('h3','','第10題疾病／情況'));
  const q10=el('div','toggle-grid');B.rbdsq.diseaseItems.forEach(x=>q10.append(toggleButton(x.fullLabel,x.name,()=>backfill())));s.append(q10);
  const done=present(B.rbdsq.sourceField),answered=B.rbdsq.items.concat(B.rbdsq.diseaseItems).some(x=>present(x.name));
  s.append(el('div','result',done?`RBDSQ總分：${scoreRB().total}/13`:answered?'RBDSQ部分填寫／資料提供者待確認；暫不產生正式總分。':'RBDSQ未作答；保持missing，不視為0分。'))
}

function renderMRIBF(s){s.append(el('p','hint','未選項目代表沒有／否；只點選存在的項目。'));const g=el('div','toggle-grid');C.mriSafety.forEach(x=>g.append(toggleButton(x[1],x[0],()=>backfill())));s.append(g);if(C.mriSafety.some(x=>val(x[0])===1)){const t=el('textarea');t.placeholder='MRI安全補充資料／待核實內容';t.value=val('mri_safety_detail')||'';t.oninput=()=>set('mri_safety_detail',t.value);s.append(t)}}

function renderSequenceBF(s){s.append(el('p','hint','預設完成；只點選沒有完成的序列。'));const g=el('div','chips');B.sequences.items.forEach(x=>g.append(btn(x.label,()=>{set(x.field,val(x.field)===0?1:0);backfill()},'toggle danger'+(val(x.field)===0?' selected':''))));s.append(g);if(B.sequences.items.some(x=>val(x.field)===0)){const t=el('textarea');t.placeholder='未完成原因／整體備註';t.value=val('mri_sequence_general_remark')||'';t.oninput=()=>set('mri_sequence_general_remark',t.value);s.append(t)}}

function renderClinicalBF(s){addBFNumber(s,'核實PD病程','pd_duration_verified_years',0,80,'年');const items=B.clinical.updrs3.items||[];addBFScale(s,items,0,4);addBFNumber(s,'UPDRS 1.5','updrs_item_1_5',0,4);addBFNumber(s,'Hoehn & Yahr','hy_stage',0,5)}

function renderMedicationRows(s){const meds=ST.meds||[];if(!meds.length){s.append(el('div','result','尚未加入藥物。每次按「＋新增一款藥物」只會增加一款。'));return}meds.forEach((m,i)=>{const c=el('div','plain-block'),r=medHVCalcRow_(m);c.append(el('h3','',`藥物 ${i+1}`));const sel=el('select');sel.append(new Option('搜尋／選擇藥物',''));MED_HV1.forEach(d=>sel.append(new Option(`${d.label}｜${d.cls}`,d.id)));sel.value=m.drugId||'';sel.onchange=()=>{m.drugId=sel.value;const d=medHVDrug_(m.drugId);m.name=d?.label||m.name||'';medHVSave_();renderByFlow()};c.append(sel);if(m.drugId==='other_pd'||m.drugId==='other_non_pd')c.append(medHVInput_(m.name,'輸入藥物名稱',v=>{m.name=v;medHVSave_()},'text'));const d=medHVDrug_(m.drugId);if(d)c.append(el('div','hint',`藥物種類：${d.cls}｜係數來源：${d.source}`));const preset=medHVFormulationSelect_(m);if(preset)c.append(preset,el('div','hint','複方規格會自動抽取Levodopa成分計算。例：Sinemet 25/100取100 mg；若藥單寫100/25，仍選25/100。'));const grid=el('div','form-grid');grid.append(medHVInput_(m.strength,preset?'Levodopa成分 mg':'單位劑量 mg',v=>{m.strength=v;m.formulation='__custom__';medHVSave_()}),medHVInput_(m.units,'每次數量',v=>{m.units=v;medHVSave_()}),medHVInput_(m.times,'每日次數',v=>{m.times=v;medHVSave_()}));c.append(grid);if(d?.kind==='matched')c.append(medHVInput_(m.matchedLevodopa,'共同服用的每日Levodopa LEDD (mg)',v=>{m.matchedLevodopa=v;medHVSave_()}));const lines=r.status==='calculated'?[`每日劑量：${r.daily} mg`,`轉換係數：${r.factor}`,`計算：${r.formula}`,`此藥LEDD：${r.ledd} mg`]:[r.reason];c.append(resultBox(r.status==='calculated'?'計算詳情':r.status==='not_applicable'?'不計LEDD':'需要核驗',lines,r.status==='calculated'||r.status==='not_applicable'?'good':'warn'));c.append(btn('刪除這款藥物',()=>{ST.meds.splice(i,1);medHVSave_();renderByFlow()},'secondary'));s.append(c)});}

function renderMRIAdmin(){const m=appShell();m.append(toolbar('MRI Admin／工作進度'),identityStrip());const s=el('section','summary');s.append(el('h2','section-title','通過篩查後的流程控制'));s.append(el('div','result',`P_ID：${val('p_id')}<br>篩查決定：${val('final_screening_decision')||'由首次篩查資料載入'}<br>Stage 2：${val('stage2_released')===1?'已開放':'尚未開放'}<br>S_ID：${val('s_id')||'尚未分配'}`));const actions=el('div','direct');actions.append(btn('開放第二階段問卷',()=>{set('stage2_released',1);renderMRIAdmin()},val('stage2_released')===1?'selected':''),btn('複製Participant連結',()=>navigator.clipboard?.writeText(location.origin+location.pathname+'?stage2='+val('p_id'))),btn('確認MRI安排並分配S_ID',()=>{if(!val('s_id'))set('s_id','S'+String(Math.floor(Math.random()*900)+100));renderMRIAdmin()},val('s_id')?'selected':''),btn('進入MRI到訪',()=>{ST.flow='mri_visit';renderMRIVisit()}),btn('進入PD臨床資料',()=>{ST.flow='clinical';renderClinical()}));s.append(actions);const sb=el('div','submitbar');sb.append(btn('提交MRI Admin更新',()=>submitPayload('mri','mri_admin','submitted'),'primary'));s.append(sb);m.append(s)}

function addStaffNumber(s,label,key,unit){
  const f=el('div','field');f.append(el('label','',unit?`${label}（${unit}）`:label));const i=el('input','text');i.type='number';i.inputMode='decimal';i.enterKeyHint='next';i.min='0';i.value=val(key)??'';
  i.oninput=()=>set(key,i.value===''?null:Number(i.value));
  i.onkeydown=e=>{if(e.key==='Enter'&&i.value!==''){e.preventDefault();const all=qa('input:not([disabled]),textarea:not([disabled]),button',i.closest('main')||document),n=all[all.indexOf(i)+1];if(n)n.focus()}};
  f.append(i);s.append(f)
}

function renderByFlow(){if(ST.flow==='mri_visit')renderMRIVisit();else if(ST.flow==='clinical')renderClinical();else if(ST.flow==='mri_admin')renderMRIAdmin();else backfill()}

function incompleteSequences(){return B.sequences.items.some(x=>val(x.field)===0)}

function renderAnchorChoices(s,key,opts){const g=el('div','options');opts.forEach(o=>g.append(btn(`${o.value}　${o.label}`,()=>{set(key,o.value);renderClinical()},'choice'+(val(key)===o.value?' selected':''))));s.append(g)}

function updrsTotal(){const ks=(B.clinical.updrs3.items||[]).map(x=>x.name),present=ks.filter(k=>val(k)!==null);return{count:present.length,total:present.reduce((a,k)=>a+Number(val(k)),0)}}

function showInlineError(s,msg){qa('.error[data-validation="1"]',s).forEach(x=>x.remove());const e=el('div','error',msg);e.dataset.validation='1';s.prepend(e);e.scrollIntoView({behavior:'smooth',block:'center'})}

function workflowKeys(flow){const map={stage2:['gas','ami','cdars','rgpts','pdi','ior'],screening:['participant','hkid','date_of_birth','gender','contact','recruitment','education','pd_status','moca','hads','sas','quip','rbdsq','mri_safety','final_screening'],mri_visit:['p_id','s_id','visit','mri','med_on_off','last_pd_med','mid','cgt','digit_span','payment','receipt'],clinical:['p_id','pd_duration','updrs','hy','medication','ledd']};const patterns=map[flow]||null;return Object.keys(ST.answers).filter(k=>!patterns||patterns.some(p=>k.includes(p)))}

function canonicalHeaders(){const set=new Set(['schema_version','submission_id','form_type','event_type','record_status','p_id','s_id','visit_number','submitted_at','data_source']);const walk=o=>{if(!o||typeof o!=='object')return;if(Array.isArray(o)){o.forEach(walk);return}Object.entries(o).forEach(([k,v])=>{if(['name','responseName','yesField','detailField','field','examplesField'].includes(k)&&typeof v==='string')set.add(v);walk(v)})};walk(B);Object.keys(ST.answers).forEach(k=>set.add(k));for(let i=1;i<=6;i++){const n=String(i).padStart(2,'0');['name','strength','times_per_day','units_per_time'].forEach(x=>set.add(`medication_${n}_${x}`))}set.add('payload_json');return Array.from(set)}

function downloadObj(o,name){const blob=new Blob([JSON.stringify(o,null,2)],{type:'application/json'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=`${name}_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;a.click();URL.revokeObjectURL(u)}

const APP_BUILD='FE-CLEAN-2026-08-20-R8.9-SINGLE-POST-RECEIPT-COMPLETE';

const RECEIVER_FORM_BY_EVENT=Object.freeze({
  screening_core:'screening',stage_2_questionnaires:'screening',clinical_supplement:'screening',
  historical_paper_reentry:'screening',field_correction:'screening',
  first_school_assessment:'mri',mri_scan:'mri'
});

function present(k){return val(k)!==null&&val(k)!==''}

function completeKeys(keys){return keys.every(present)}

function sumOrNull(keys){return completeKeys(keys)?keys.reduce((n,k)=>n+Number(val(k)),0):null}

function setDerived(k,v){ST.answers[k]=v}

function safeSave(){saveDraft()}

function directSet(k,v,rerender){set(k,v);if(rerender)rerender()}

function calculateAllDerived(){
  const hadsA=[1,3,5,7,9,11,13].map(n=>`hads${String(n).padStart(2,'0')}_score`);
  const hadsD=[2,4,6,8,10,12,14].map(n=>`hads${String(n).padStart(2,'0')}_score`);
  const A=sumOrNull(hadsA),D=sumOrNull(hadsD);
  setDerived('hads_anxiety_total',A);setDerived('hads_depression_total',D);
  setDerived('hads_complete',A!==null&&D!==null?1:0);
  setDerived('hads_anxiety_review',A===null?null:(A>6?1:0));
  setDerived('hads_depression_review',D===null?null:(D>9?1:0));
  setDerived('hads_mood_review',A===null||D===null?null:(A>6||D>9?1:0));

  const sasKeys=Array.from({length:14},(_,i)=>`sas${String(i+1).padStart(2,'0')}_score`);
  const sas=sumOrNull(sasKeys);setDerived('sas_total',sas);setDerived('sas_complete',sas===null?0:1);
  setDerived('sas_apathy_flag',sas===null?null:(sas>=14?1:0));

  const gasKeys=B.gas.items.map(x=>x.name),gas=sumOrNull(gasKeys);
  setDerived('gas_cognitive_social_total',sumOrNull(gasKeys.slice(0,8)));
  setDerived('gas_emotion_reaction_total',sumOrNull(gasKeys.slice(8,12)));
  setDerived('gas_autonomy_total',sumOrNull(gasKeys.slice(12,16)));
  setDerived('gas_total',gas);setDerived('gas_complete',gas===null?0:1);
  setDerived('gas_apathy_flag',gas===null||val('pd_hc_status')!=='PD'?null:(gas>=16?1:0));

  const amiDomains={social:[],emotional:[],behavioural:[]};
  B.ami18.items.forEach(x=>amiDomains[x.domain].push(x.name));
  Object.keys(amiDomains).forEach(d=>setDerived(`ami_${d}_mean`,(()=>{const x=sumOrNull(amiDomains[d]);return x===null?null:x/6})()));
  const amiAll=B.ami18.items.map(x=>x.name),amiTotal=sumOrNull(amiAll);
  setDerived('ami_overall_mean',amiTotal===null?null:amiTotal/18);setDerived('ami_complete',amiTotal===null?0:1);

  (B.cdars.domains||[]).forEach(d=>{const ks=B.cdars.items.filter(x=>x.domain===d.key).map(x=>x.name);setDerived(`cdars_${d.key}_total`,sumOrNull(ks))});
  const cdKeys=B.cdars.items.map(x=>x.name);setDerived('cdars_overall_total',sumOrNull(cdKeys));setDerived('cdars_complete',completeKeys(cdKeys)?1:0);

  const ref=B.rgpts.items.slice(0,8).map(x=>x.name),per=B.rgpts.items.slice(8).map(x=>x.name),all=B.rgpts.items.map(x=>x.name);
  setDerived('rgpts_reference_total',sumOrNull(ref));setDerived('rgpts_persecutory_total',sumOrNull(per));setDerived('rgpts_total',sumOrNull(all));
  setDerived('rgpts_complete',completeKeys(all)?1:0);setDerived('rgpts_review',completeKeys(per)?(sum(per)>=18?1:0):null);

  const pdi=B.pdi21.items,yesKeys=pdi.map(x=>x.yesField);
  const pdiReady=yesKeys.every(k=>present(k));
  const dks=pdi.map(x=>x.dimensions.distress.name),pks=pdi.map(x=>x.dimensions.preoccupation.name),cks=pdi.map(x=>x.dimensions.conviction.name);
  const pdiComplete=pdiReady&&pdi.every(x=>Number(val(x.yesField))===0||[x.dimensions.distress.name,x.dimensions.preoccupation.name,x.dimensions.conviction.name].every(present));
  const yesCount=pdiReady?yesKeys.reduce((n,k)=>n+Number(val(k)),0):null;
  const dt=pdiComplete?dks.reduce((n,k)=>n+Number(val(k)||0),0):null,pt=pdiComplete?pks.reduce((n,k)=>n+Number(val(k)||0),0):null,ct=pdiComplete?cks.reduce((n,k)=>n+Number(val(k)||0),0):null;
  setDerived('pdi_yes_count',yesCount);setDerived('pdi_distress_total',dt);setDerived('pdi_preoccupation_total',pt);setDerived('pdi_conviction_total',ct);
  setDerived('pdi_total_severity',pdiComplete?dt+pt+ct:null);setDerived('pdi_total',pdiComplete?yesCount+dt+pt+ct:null);setDerived('pdi_complete',pdiComplete?1:0);

  const iq={frequency:[],conviction:[],distress:[]};for(let i=1;i<=15;i++)Object.keys(iq).forEach(k=>iq[k].push(`ior${String(i).padStart(2,'0')}_${k}`));
  Object.keys(iq).forEach(k=>{setDerived(`ior_${k}_total`,sumOrNull(iq[k]));setDerived(`ior_${k}_ge3_count`,completeKeys(iq[k])?iq[k].filter(x=>Number(val(x))>=3).length:null)});
  const iorComplete=Object.values(iq).every(completeKeys);setDerived('ior_overall_total',iorComplete?Object.values(iq).flat().reduce((n,k)=>n+Number(val(k)),0):null);setDerived('ior_complete',iorComplete?1:0);

  const qr=scoreQuipRS();['a','b','c','d','e1','e2','f'].forEach(k=>setDerived(`quiprs_${k}_total`,qr.complete?qr.tot[k]:null));
  setDerived('quiprs_e_total',qr.complete?qr.E:null);setDerived('quiprs_ad_total',qr.complete?qr.AD:null);setDerived('quiprs_af_total',qr.complete?qr.AF:null);
  setDerived('quiprs_complete',qr.complete?1:0);setDerived('quiprs_cutoff_domains',qr.complete?qr.hit.join('|'):null);
  setDerived('quiprs_icd_exclusion_flag',qr.complete&&val('pd_hc_status')==='PD'?(qr.hit.length?1:0):null);

  const rbKeys=B.rbdsq.items.map(x=>x.name),rbDisease=B.rbdsq.diseaseItems.map(x=>x.name),rbComplete=present(B.rbdsq.sourceField)&&completeKeys(rbKeys.concat(rbDisease));
  const rbTotal=rbComplete?rbKeys.reduce((n,k)=>n+Number(val(k)),0)+(rbDisease.some(k=>Number(val(k))===1)?1:0):null;
  const rbCut=val('pd_hc_status')==='PD'?6:val('pd_hc_status')==='HC'?5:null;
  setDerived('rbdsq_total',rbTotal);setDerived('rbdsq_complete',rbComplete?1:0);setDerived('rbdsq_cutoff_value',rbCut);setDerived('rbdsq_positive_flag',rbTotal===null||rbCut===null?null:(rbTotal>=rbCut?1:0));

  const up=updrsTotal();setDerived('updrs3_complete',up.count===33?1:0);setDerived('updrs3_total',up.count===33?up.total:null);
  safeSave();return{A,D,sas,gas,qr,rbTotal,rbCut,up};
}

function resultBox(title,lines,state=''){
  const r=el('div','result '+state);r.append(el('h4','',title));lines.forEach(x=>r.append(el('div','',x)));return r
}

function neutralComplete(title){return resultBox(`${title}已完成`,['答案已保存。請繼續下一部分。'],'good')}

function keyboardValueForScale(pg,key){
  if(!pg||pg.kind!=='scale')return null;const opts=pg.options||[];
  if(opts.length===5&&/^[0-4]$/.test(key))return opts.find(o=>Number(o.value)===Number(key))||opts[Number(key)]||null;
  if(opts.length===4&&/^[1-4]$/.test(key))return opts[Number(key)-1]||null;return null
}

function completeQuipGroup(pg){
  const group=B.quip.groups[pg.group];if(pg.group===0)B.quip.matrixCells.forEach(x=>{if(val(x.name)===null)set(x.name,0)});else group.items.forEach(x=>{if(val(x.name)===null)set(x.name,0)});
}

function renderQuipRsMatrix(a){
  const status=String(val('quiprs_section_confirmed')||'');
  a.append(el('p','instruction','請逐格填寫0至4，或明確選擇「以上情況全部沒有」。只有完成確認後，導航欄才會顯示完成。'));
  a.append(el('div','scale-legend','0＝從不　1＝極少　2＝有時　3＝經常　4＝非常頻繁'));
  const writeAllNone=()=>{const next=Object.assign({},ST.answers);B.quiprs.matrixCells.forEach(x=>next[x.name]=0);next.quiprs_section_confirmed='none';ST.answers=next;ST.error='';saveDraft();player()};
  const actions=el('div','direct');actions.append(
    btn('尚未回答',()=>{const next=Object.assign({},ST.answers);B.quiprs.matrixCells.forEach(x=>next[x.name]=null);next.quiprs_section_confirmed='unanswered';ST.answers=next;ST.error='';saveDraft();player()},'choice'+(status==='unanswered'?' selected':'')),
    btn('以上情況全部沒有',writeAllNone,'choice'+(status==='none'?' selected':''))
  );a.append(actions);
  const defs=el('div','quip-definitions');B.quiprs.domains.forEach(d=>{const x=el('div','definition');x.append(el('strong','',d.fullLabel));if(d.description)x.append(document.createTextNode('：'+d.description));defs.append(x)});a.append(defs);
  const grid=el('div','quiprs-grid');grid.append(el('div','head','完整共享題幹'));B.quiprs.domains.forEach(d=>grid.append(el('div','head',d.fullLabel)));
  const paint=i=>{const answered=i.value!=='';i.classList.toggle('selected',answered);i.style.backgroundColor=answered?'#d9ebfb':'';i.style.borderColor=answered?'#145a96':'';i.style.color=answered?'#0b2740':'';i.style.boxShadow=answered?'inset 0 0 0 2px #145a96':''};
  B.quiprs.sharedStems.forEach(st=>{grid.append(el('div','q',`${st.index}. ${st.fullText}`));B.quiprs.domains.forEach(d=>{const cell=B.quiprs.matrixCells.find(x=>x.stemIndex===st.index&&x.domain===d.key.toUpperCase()),i=el('input','quiprs-input');i.inputMode='numeric';i.maxLength=1;i.pattern='[0-4]';i.dataset.key=cell.name;i.value=val(cell.name)??'';paint(i);
    const commit=v=>{ST.answers[cell.name]=v;ST.answers.quiprs_section_confirmed='grid_pending';saveDraft();i.value=String(v);paint(i)};
    i.onkeydown=e=>{if(/^[0-4]$/.test(e.key)){e.preventDefault();commit(Number(e.key));requestAnimationFrame(()=>{const all=qa('.quiprs-input');all[all.indexOf(i)+1]?.focus()})}else if(!['Tab','Shift','Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))e.preventDefault()};
    i.onpaste=e=>{e.preventDefault();const x=(e.clipboardData||window.clipboardData).getData('text').trim();if(/^[0-4]$/.test(x))commit(Number(x))};
    i.oninput=()=>{if(/^[0-4]$/.test(i.value))commit(Number(i.value));else{ST.answers[cell.name]=null;ST.answers.quiprs_section_confirmed='grid_pending';saveDraft();i.value='';paint(i)}};grid.append(i)
  })});a.append(grid);
  const currentCount=()=>B.quiprs.matrixCells.filter(x=>present(x.name)).length;
  a.append(el('div','result',`已明確填寫：${currentCount()}／28`));
  a.append(btn('確認28格已逐格完成',()=>{
    const inputs=qa('.quiprs-input',grid);inputs.forEach(i=>{const key=i.dataset.key,v=String(i.value||'').trim();ST.answers[key]=/^[0-4]$/.test(v)?Number(v):null});
    const count=currentCount();if(count!==28){ST.error=`尚有${28-count}格未完成。`;saveDraft();return player()}
    ST.answers.quiprs_section_confirmed='answered';ST.error='';saveDraft();player();
  },'choice'+(status==='answered'?' selected':'')));
}

function renderScaleCompletion(pg,a){
  calculateAllDerived();if(ST.flow==='stage2'){a.append(neutralComplete(pg.scale));return}
  if(pg.scale==='HADS')a.append(resultBox('HADS結果',[`完整性：${val('hads_complete')?'14／14':'未完整'}`,`A：${val('hads_anxiety_total')??'—'}／21；門檻 >6；Review：${val('hads_anxiety_review')===null?'待完成':val('hads_anxiety_review')?'是':'否'}`,`D：${val('hads_depression_total')??'—'}／21；門檻 >9；Review：${val('hads_depression_review')===null?'待完成':val('hads_depression_review')?'是':'否'}`],val('hads_mood_review')?'bad':'good'));
  if(pg.scale==='SAS')a.append(resultBox('SAS結果',[`總分：${val('sas_total')??'—'}／42`,`Cutoff：≥14`,`Apathy指標：${val('sas_apathy_flag')===null?'待完成':val('sas_apathy_flag')?'達標':'未達標'}`],val('sas_apathy_flag')?'bad':'good'));
  if(pg.scale==='QUIP'){const t={};['a','b','c','d','e','f'].forEach(d=>{const n=d==='e'?3:d==='f'?4:5;t[d]=Array.from({length:n},(_,i)=>Number(val(`quip_${d}${i+1}_yes`))||0).reduce((x,y)=>x+y,0)});a.append(resultBox('QUIP結果',[`A ${t.a}｜B ${t.b}｜C ${t.c}｜D ${t.d}｜E ${t.e}｜F ${t.f}`,`總Yes數：${Object.values(t).reduce((x,y)=>x+y,0)}`,`Positive Domain數：${Object.values(t).filter(x=>x>0).length}`,`作用：Review only；不直接ICD排除或分組。`]))}
  if(pg.scale==='QUIP-RS'){const z=scoreQuipRS();a.append(resultBox('QUIP-RS結果',[`A ${z.tot.a}｜B ${z.tot.b}｜C ${z.tot.c}｜D ${z.tot.d}`,`E1 ${z.tot.e1}｜E2 ${z.tot.e2}｜E ${z.E}｜F ${z.tot.f}`,`AD ${z.AD}｜AF ${z.AF}`,`Cutoff：A≥6；B≥8；C≥8；D≥7；E≥7；AD≥10；F沒有排除Cutoff`,`達標Domain：${z.hit.join('、')||'沒有'}`,`ICD排除：${val('pd_hc_status')==='PD'?(z.hit.length?'是':'否'):'不適用（HC只作覆核）'}`],z.hit.length?'bad':'good'))}
  if(pg.scale==='RBDSQ')a.append(resultBox('RBDSQ結果',[`總分：${val('rbdsq_total')??'—'}／13`,`適用Cutoff：${val('rbdsq_cutoff_value')??'待確認PD／HC身份'}`,`Sleep Review：${val('rbdsq_positive_flag')===null?'待完成':val('rbdsq_positive_flag')?'需要':'不需要'}`],val('rbdsq_positive_flag')?'bad':'good'))
}

function renderStage2Summary(a){a.append(resultBox('問卷已完成',['所有題目已完成。請按「檢查並提交」送出問卷。'],'good'))}

function splitExamples(v){return String(v||'').split(/[，,、；;\n]+/).map(x=>x.trim()).filter(Boolean)}

function validExamples(v){return splitExamples(v).length>0}

function renderScale(pg,a){
  const opts=pg.options||[],g=el('div',opts.length===5?'scale-buttons':'options');
  opts.forEach((o,n)=>{
    const keyText=opts.length===5?String(o.value):String(n+1);
    const b=btn('',()=>{
      set(pg.key,o.value);ST.error='';
      b.classList.add('selected');
      b.style.backgroundColor='#145a96';b.style.borderColor='#145a96';b.style.color='#ffffff';
      if(ST.flow==='screening')setTimeout(autoNext,220);else player();
    },(opts.length===5?'':'choice')+(sameValue(val(pg.key),o.value)?' selected':''));
    b.dataset.answerKey=pg.key;b.dataset.answerValue=String(o.value);b.dataset.answerPosition=String(n+1);
    b.append(el('strong','',keyText),document.createTextNode(' '+String(o.label).replace(/^\d+\s*/,'')));g.append(b);
  });a.append(g);
}

function renderQuipRsBF(s){
  s.append(el('p','hint','0＝從不　1＝極少　2＝有時　3＝經常　4＝非常頻繁。輸入合法單個數字後立即保存並移到下一格。'));
  const grid=el('div','quiprs-grid backfill-quiprs');grid.append(el('div','head','完整共享題幹'));B.quiprs.domains.forEach(d=>grid.append(el('div','head',d.fullLabel)));
  B.quiprs.sharedStems.forEach(st=>{grid.append(el('div','q',st.fullText));B.quiprs.domains.forEach(d=>{const cell=B.quiprs.matrixCells.find(x=>x.stemIndex===st.index&&x.domain===d.key.toUpperCase()),i=el('input','quiprs-input');i.inputMode='numeric';i.maxLength=1;i.value=val(cell.name)??'';i.onkeydown=e=>{if(/^[0-4]$/.test(e.key)){e.preventDefault();set(cell.name,Number(e.key));i.value=e.key;requestAnimationFrame(()=>qa('.backfill-quiprs .quiprs-input')[qa('.backfill-quiprs .quiprs-input').indexOf(i)+1]?.focus())}else if(!['Tab','Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault()};grid.append(i)})});s.append(grid);calculateAllDerived();const z=scoreQuipRS();s.append(resultBox('QUIP-RS即時計算',[`完成：${B.quiprs.matrixCells.filter(x=>present(x.name)).length}／28`,`A ${z.complete?z.tot.a:'—'}｜B ${z.complete?z.tot.b:'—'}｜C ${z.complete?z.tot.c:'—'}｜D ${z.complete?z.tot.d:'—'}`,`E1 ${z.complete?z.tot.e1:'—'}｜E2 ${z.complete?z.tot.e2:'—'}｜E ${z.complete?z.E:'—'}｜F ${z.complete?z.tot.f:'—'}`,`AD ${z.complete?z.AD:'—'}｜AF ${z.complete?z.AF:'—'}｜Cutoff ${z.complete?(z.hit.join('、')||'沒有'):'待完成'}`]))
}

function renderMRIAdminFields(a){
  const w=el('div','plain-block');
  w.append(el('h3','','MRI行政安排'),el('p','hint','此區供安排與聯絡使用，可全部留空，不影響首次篩查提交。'));
  const months=el('div','chips');for(let m=1;m<=12;m++)months.append(toggleButton(`${m}月`,`mri_avail_month_${m}`,()=>player()));
  w.append(el('h4','','方便到校月份'),months);
  [['星期一','mon'],['星期二','tue'],['星期三','wed'],['星期四','thu'],['星期五','fri']].forEach(x=>{const r=el('div','form-grid'),g=el('div','chips');r.append(el('strong','',x[0]));g.append(toggleButton('上午',`mri_avail_${x[1]}_am`,()=>player()),toggleButton('下午',`mri_avail_${x[1]}_pm`,()=>player()));r.append(g);w.append(r)});
  const g=el('div','toggle-grid');
  [['需要入口接應','mri_need_pickup'],['有陪同人士','mri_has_companion'],['需要借用輪椅','mri_need_wheelchair'],['自備輪椅','mri_own_wheelchair'],['需要無障礙路線','mri_need_accessible_route'],['可使用電子收款','electronic_payment_available']].forEach(x=>g.append(toggleButton(x[0],x[1],()=>player())));
  w.append(g);
  if(val('mri_has_companion')===1){
    const f=el('div','field');f.append(el('label','','陪同人數'));
    const i=el('input','text');i.type='number';i.inputMode='numeric';i.min='0';i.step='1';i.placeholder='例：1';i.value=val('mri_companion_count')??'';
    i.oninput=()=>{if(i.value===''){set('mri_companion_count',null);return}const n=Number(i.value);const safe=Number.isFinite(n)?Math.max(0,Math.floor(n)):0;i.value=String(safe);set('mri_companion_count',safe)};
    f.append(i);w.append(f);
  }else if(present('mri_companion_count'))setDerived('mri_companion_count',0);
  w.append(fieldText('MRI行政備註','mri_admin_remark','可留空'));a.append(w);
}

function addCalendarMonths(date,count){const d=new Date(date+'T00:00:00');if(!Number.isFinite(d.getTime()))return null;const day=d.getDate(),target=new Date(d.getFullYear(),d.getMonth()+count+1,0);target.setDate(Math.min(day,target.getDate()));return target}

function mocaValidity(localDate){const last=val('latest_valid_moca_date');if(!last)return{known:false,needs:true};const expiry=addCalendarMonths(last,2),today=new Date((localDate||new Date().toISOString().slice(0,10))+'T00:00:00');return{known:true,last,expiry:expiry?.toISOString().slice(0,10),needs:!expiry||today>expiry}}

function downloadCurrent(){
  const event=ST.flow==='backfill'?'historical_paper_reentry':ST.flow==='clinical'?'clinical_supplement':ST.flow==='mri_visit'?'mri_scan':ST.flow==='stage2'?'stage_2_questionnaires':'screening_core',p=payload('',event,'draft'),headers=Object.keys(p),data={};headers.forEach(k=>data[k]=p[k]===undefined?null:p[k]);downloadObj({metadata:{workflow:ST.flow,downloaded_at:new Date().toISOString(),question_bank_version:B.version,app_build:APP_BUILD,header_count:headers.length},headers,data},`${ST.flow||'apathy'}_${val('p_id')||'draft'}`)
}

function currentFlowDraftKeys_(flow){
  return ['apathy-fe-clean-v2-'+flow,'apathy-fe-clean-v1-'+flow,'apathy-v7-'+flow];
}
function confirmClear(){
  const flow=ST.flow;
  const label={screening:'首次篩查',stage2:'第二階段問卷',mri_visit:'MRI到訪',clinical:'PD臨床資料',backfill:'歷史資料補錄'}[flow]||flow;
  const m=el('div','modal'),b=el('div','modal-box');
  b.append(el('h2','','只清除此入口的本機資料？'),el('p','',
    '此操作只會清除「'+label+'」入口在此瀏覽器的草稿、目前位置及暫存Submission ID；不會清除其他入口，也不會影響後端已提交資料或已下載JSON。'));
  const a=el('div','submitbar');
  a.append(btn('取消',()=>m.remove(),'linkbtn'),btn('確定清除此入口',()=>{
    currentFlowDraftKeys_(flow).forEach(k=>localStorage.removeItem(k));
    resetFlow();ST.submission=uuid();m.remove();home();
  },'primary'));
  b.append(a);m.append(b);document.body.append(m)
}

function addBFChoices(parent,label,key,options){
  const w=el('div','field');w.append(el('div','label',label));const g=el('div','direct');
  options.forEach(o=>{const b=btn(o[1],e=>{e?.stopPropagation?.();set(key,o[0]);requestAnimationFrame(backfill)},'choice'+(sameValue(val(key),o[0])?' selected':''));b.dataset.field=key;b.dataset.value=String(o[0]);g.append(b)});
  w.append(g);parent.append(w)
}

function addStaffChoices(s,label,key,opts){
  const f=el('div','field');f.append(el('div','label',label));const g=el('div','direct');
  opts.forEach(o=>{const b=btn(o[1],e=>{e?.stopPropagation?.();set(key,o[0]);b.classList.add('selected');requestAnimationFrame(()=>{renderByFlow();if(ST.flow==='clinical')setTimeout(()=>window.scrollBy({top:260,behavior:'smooth'}),30)})},'choice'+(sameValue(val(key),o[0])?' selected':''));b.dataset.field=key;b.dataset.value=String(o[0]);g.append(b)});
  f.append(g);s.append(f)
}

function addStaffCheckbox(s,label,key){
  const b=btn(label,e=>{e?.stopPropagation?.();set(key,val(key)===1?0:1);requestAnimationFrame(()=>{renderByFlow();if(ST.flow==='clinical')setTimeout(()=>window.scrollBy({top:260,behavior:'smooth'}),30)})},'toggle'+(val(key)===1?' selected':''));s.append(b)
}

function renderSecondMocaResult(s){
  if(!present('moca_2_raw_total'))return;
  const raw=Number(val('moca_2_raw_total')),age=calcAge(),eduRaw=val('education_years'),edu=eduRaw===null||eduRaw===''?null:Number(eduRaw);
  if(age===null||edu===null||!Number.isFinite(edu)){
    ['moca_2_adjustment','moca_2_adjusted_total','moca_2_16th_cutoff','moca_2_norm_result_code'].forEach(k=>setDerived(k,null));
    s.append(resultBox('第二次MoCA結果',[`Raw：${raw}／30`,'教育調整及常模：無法計算','原因：未能從後端或本機草稿取得DOB／實際教育年數。不得使用預設值。'],'warn'));return
  }
  const adj=edu<=12?1:0,adjusted=Math.min(30,raw+adj),cut=mocaCutoff(age,edu),first=present('moca_1_raw_total')?Number(val('moca_1_raw_total')):null;
  setDerived('moca_2_adjustment',adj);setDerived('moca_2_adjusted_total',adjusted);setDerived('moca_2_16th_cutoff',cut);setDerived('moca_2_norm_result_code',cut===null?null:(raw>cut?1:0));setDerived('moca_latest_context','MRI前重做');
  setDerived('moca_change_remark',first===null?'MRI前重做MoCA；首次分數未載入。':`MRI前重做MoCA，Raw由${first}分變為${raw}分，變化${raw-first>=0?'+':''}${raw-first}分；最新有效結果採用MRI前重做結果。`);
  s.append(resultBox('第二次MoCA結果',[`Raw：${raw}／30`,`教育年數：${edu}年｜教育調整：+${adj}`,`Adjusted：${adjusted}／30`,`第16百分位Cutoff：${cut??'無法判定'}`,`與Cutoff差異：${cut===null?'—':(raw-cut>=0?'+':'')+(raw-cut)}`,val('moca_change_remark')],cut!==null&&raw<=cut?'bad':'good'))
}

function scrollClinicalToActive(){
  const requestedKey=ST.updrsActiveKey;
  if(!requestedKey)return;
  const requestId=(ST.clinicalScrollRequest||0)+1;
  ST.clinicalScrollRequest=requestId;
  window.setTimeout(function(){
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        if(ST.flow!=='clinical'||ST.clinicalScrollRequest!==requestId)return;
        const target=qa('[data-updrs-key]').find(function(node){return node.dataset.updrsKey===requestedKey});
        if(!target)return;
        const toolbar=q('.toolbar');
        const offset=(toolbar?toolbar.getBoundingClientRect().height:0)+16;
        const top=Math.max(0,window.scrollY+target.getBoundingClientRect().top-offset);
        window.scrollTo({top:top,behavior:'smooth'});
      });
    });
  },60);
}
function renderUPDRSItems(s,withCue){
  const items=B.clinical.updrs3.items||[],firstIncomplete=items.find(x=>!present(x.name));if(!ST.updrsActiveKey)ST.updrsActiveKey=firstIncomplete?.name||items[0]?.name;
  items.forEach(x=>{const w=el('div','clinical-anchor');w.dataset.updrsKey=x.name;if(ST.updrsActiveKey===x.name)w.classList.add('active');w.append(el('strong','',x.fullLabel||x.name));if(withCue&&x.instruction)w.append(el('p','hint',x.instruction));const g=el('div',withCue?'options':'direct');
    (x.options||[0,1,2,3,4].map(v=>({value:v,label:String(v)}))).forEach(o=>{const b=btn(`${o.value}　${o.label}`,()=>{ST.updrsActiveKey=x.name;set(x.name,o.value);const ix=items.findIndex(y=>y.name===x.name);ST.updrsActiveKey=items[ix+1]?.name||x.name;renderClinical();scrollClinicalToActive()},'choice'+(sameValue(val(x.name),o.value)?' selected':''));g.append(b)});w.append(g);s.append(w)
  });
}

const MED_CATALOG_V11=Object.freeze([
  {id:'levodopa_ir',label:'Levodopa IR',aliases:['levodopa','l-dopa'],factor:1,cat:'levodopa',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'sinemet',label:'Sinemet / Carbidopa-Levodopa',aliases:['sinemet','carbidopa levodopa','carbidopa/levodopa'],factor:1,cat:'levodopa',component:'second',source:'LEDD v11 supplied calculator'},
  {id:'sinemet_cr',label:'Sinemet CR / Levodopa CR',aliases:['sinemet cr','sinemet controlled release','levodopa cr'],factor:0.75,cat:'levodopa',component:'second',source:'LEDD v11 supplied calculator'},
  {id:'madopar',label:'Madopar / Co-beneldopa',aliases:['madopar','medopar','co-beneldopa'],factor:1,cat:'levodopa',component:'first',source:'LEDD v11 supplied calculator'},
  {id:'stalevo',label:'Stalevo / Levodopa + Entacapone',aliases:['stalevo','levodopa entacapone'],factor:1.33,cat:'levodopa',component:'first',source:'LEDD v11 supplied calculator'},
  {id:'duodopa',label:'Duodopa',aliases:['duodopa'],factor:1.11,cat:'levodopa',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'rytary',label:'Rytary',aliases:['rytary'],factor:0.6,cat:'levodopa',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'pramipexole',label:'Pramipexole / Mirapex',aliases:['pramipexole','mirapex'],factor:100,cat:'da',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'ropinirole',label:'Ropinirole / Requip',aliases:['ropinirole','ropinrole','requip'],factor:20,cat:'da',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'rotigotine',label:'Rotigotine / Neupro',aliases:['rotigotine','neupro'],factor:30,cat:'da',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'apomorphine',label:'Apomorphine',aliases:['apomorphine'],factor:10,cat:'da',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'bromocriptine',label:'Bromocriptine',aliases:['bromocriptine'],factor:10,cat:'da',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'cabergoline',label:'Cabergoline',aliases:['cabergoline'],factor:80,cat:'da',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'rasagiline',label:'Rasagiline / Azilect',aliases:['rasagiline','rasagline','azilect'],factor:100,cat:'other',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'selegiline',label:'Selegiline oral',aliases:['selegiline'],factor:10,cat:'other',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'amantadine',label:'Amantadine',aliases:['amantadine'],factor:1,cat:'other',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'entacapone_only',label:'Entacapone（獨立）',aliases:['entacapone'],factor:null,cat:'unresolved',component:'single',source:'LEDD v11 supplied calculator'},
  {id:'tolcapone_only',label:'Tolcapone（獨立）',aliases:['tolcapone'],factor:null,cat:'unresolved',component:'single',source:'LEDD v11 supplied calculator'}
]);

function medRound(n){return Number.isFinite(Number(n))?Number(Number(n).toFixed(2)):null}

function medById(id){return MED_CATALOG_V11.find(x=>x.id===id)||null}

function medTextLines(raw){return String(raw||'').replace(/\\n/g,'\n').replace(/[；;]/g,'\n').split(/\n+/).map(x=>x.trim()).filter(Boolean)}

function medFind(line){const x=String(line||'').toLowerCase().replace(/[-_]+/g,' ');const matches=[];MED_CATALOG_V11.forEach(d=>d.aliases.forEach(a=>{if(x.includes(a))matches.push({drug:d,length:a.length})}));matches.sort((a,b)=>b.length-a.length);return matches[0]?.drug||null}

function medFrequency(line,w){const x=String(line||'').toLowerCase();let m=x.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*(?:times?|次)?\s*(?:\/|per\s*)?(?:day|daily|日|天)?/);if(m){w.push(`頻次範圍採上限 ${m[2]}/day，須由工作人員核對`);return +m[2]}m=x.match(/(\d+(?:\.\d+)?)\s*(?:times?|次)\s*(?:\/|per\s*)?(?:day|daily|日|天)/);if(m)return +m[1];if(/\b(?:bd|bid|twice daily)\b/.test(x))return 2;if(/\b(?:tds|tid|three times daily)\b/.test(x))return 3;if(/\b(?:qds|qid|four times daily)\b/.test(x))return 4;if(/\b(?:od|once daily|daily)\b/.test(x))return 1;return null}

function medUnits(line){const x=String(line||'').toLowerCase();let m=x.match(/(\d+(?:\.\d+)?)\s*(?:tab(?:let)?s?|pill?s?|粒|片)(?:\s*\/\s*次)?/);if(m)return +m[1];m=x.match(/(?:half|半)\s*(?:tab(?:let)?|pill|片|粒)?/);return m?0.5:null}

function medDose(line,drug,w){const slash=String(line||'').match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+(?:\.\d+)?))?/);if(slash){const a=[+slash[1],+slash[2],slash[3]?+slash[3]:null];return drug.component==='second'?a[1]:a[0]}const mg=String(line||'').match(/(\d+(?:\.\d+)?)\s*mg/i);if(!mg)return null;const n=+mg[1];if(drug.id==='madopar'&&n===125){w.push('Madopar 125 mg按levodopa 100 mg換算');return 100}if(drug.id==='madopar'&&n===250){w.push('Madopar 250 mg按levodopa 200 mg換算');return 200}return n}

function emptyLeddTotals(){return{levodopa:0,da:0,other:0}}

function finalizeLeddResult(rows,tot,warnings){const unresolved=rows.filter(x=>x.status==='unresolved').length,review=rows.filter(x=>x.status==='review_required').length,ok=rows.filter(x=>x.status==='ok').length,complete=ok>0&&unresolved===0&&review===0;return{rows,levodopa:complete?medRound(tot.levodopa):null,da:complete?medRound(tot.da):null,other:complete?medRound(tot.other):null,total:complete?medRound(tot.levodopa+tot.da+tot.other):null,warnings,unresolved,review_required:review,complete,status:rows.length===0?'empty':complete?'complete':unresolved?'unresolved':'review_required'}}

function parseMedicationRawV11(raw){const rows=[],warnings=[],tot=emptyLeddTotals();medTextLines(raw).forEach((line,i)=>{const lw=[],drug=medFind(line);if(!drug){rows.push({line:i+1,original_text:line,status:'unresolved',reason:'未識別藥物'});warnings.push(`第${i+1}行未識別藥物`);return}if(/\b(?:prn|as needed|upon need)\b/i.test(line)&&medFrequency(line,[])===null){rows.push({line:i+1,original_text:line,canonical_id:drug.id,canonical_name:drug.label,matched_alias:drug.aliases.find(a=>line.toLowerCase().includes(a))||'',mapping_source:drug.source,status:'review_required',reason:'PRN且沒有固定每日頻次，未納入正式LEDD'});warnings.push(`第${i+1}行為PRN且沒有固定頻次`);return}if(drug.factor===null){rows.push({line:i+1,original_text:line,canonical_id:drug.id,canonical_name:drug.label,mapping_source:drug.source,status:'unresolved',reason:'獨立COMT inhibitor需要配套levodopa'});warnings.push(`第${i+1}行${drug.label}無法獨立換算`);return}const dose=medDose(line,drug,lw),times=medFrequency(line,lw),units=medUnits(line);if(dose===null||times===null||units===null){const reason=dose===null?'缺少可識別mg規格':times===null?'缺少固定每日頻次':'缺少每次片／單位數';rows.push({line:i+1,original_text:line,canonical_id:drug.id,canonical_name:drug.label,mapping_source:drug.source,status:'unresolved',dose_mg:dose,times_per_day:times,units_per_time:units,reason,warnings:lw});warnings.push(`第${i+1}行：${reason}`);return}const daily=medRound(dose*times*units),ledd=medRound(daily*drug.factor);tot[drug.cat]+=ledd;rows.push({line:i+1,original_text:line,canonical_id:drug.id,canonical_name:drug.label,matched_alias:drug.aliases.find(a=>line.toLowerCase().includes(a))||'',mapping_source:drug.source,category:drug.cat,dose_mg:dose,times_per_day:times,units_per_time:units,daily_dose_mg:daily,conversion_factor:drug.factor,conversion_formula:`${dose} x ${times} x ${units} x ${drug.factor}`,item_ledd:ledd,status:lw.length?'review_required':'ok',warnings:lw});lw.forEach(x=>warnings.push(`第${i+1}行：${x}`))});return finalizeLeddResult(rows,tot,warnings)}

function calculateManualLeddV11(){const rows=[],warnings=[],tot=emptyLeddTotals();ST.meds.forEach((m,index)=>{if(!m.name&&!m.drugId&&!m.strength&&!m.times&&!m.units)return;const drug=medById(m.drugId)||medFind(m.name),dose=drug?medDose(m.strength,drug,warnings):null,times=Number(m.times),units=Number(m.units);if(!drug||drug.factor===null||dose===null||!Number.isFinite(times)||times<=0||!Number.isFinite(units)||units<=0){rows.push({index:index+1,original_name:m.name||'',canonical_id:drug?.id||null,canonical_name:drug?.label||null,strength:m.strength||'',times_per_day:Number.isFinite(times)?times:null,units_per_time:Number.isFinite(units)?units:null,status:'unresolved',reason:!drug?'未從內建清單選擇藥物':dose===null?'規格無法解析':'頻次或每次數量未完整'});return}const daily=medRound(dose*times*units),ledd=medRound(daily*drug.factor);tot[drug.cat]+=ledd;rows.push({index:index+1,original_name:m.name||drug.label,canonical_id:drug.id,canonical_name:drug.label,aliases:drug.aliases,mapping_source:drug.source,strength:m.strength,dose_mg:dose,times_per_day:times,units_per_time:units,daily_dose_mg:daily,conversion_factor:drug.factor,conversion_formula:`${dose} x ${times} x ${units} x ${drug.factor}`,category:drug.cat,item_ledd:ledd,status:'ok'})});return finalizeLeddResult(rows,tot,warnings)}

function syncLeddDerivedV11(machine,manual){[['machine',machine],['manual',manual]].forEach(([p,x])=>{setDerived(`ledd_${p}_levodopa`,x.complete?x.levodopa:null);setDerived(`ledd_${p}_da`,x.complete?x.da:null);setDerived(`ledd_${p}_other`,x.complete?x.other:null);setDerived(`ledd_${p}_total`,x.complete?x.total:null);setDerived(`ledd_${p}_status`,x.status)});['levodopa','da','other','total'].forEach(k=>setDerived(`ledd_difference_${k}`,machine.complete&&manual.complete?medRound(manual[k]-machine[k]):null));const diff=machine.complete&&manual.complete?medRound(manual.total-machine.total):null;setDerived('ledd_match_flag',diff===null?null:(Math.abs(diff)<0.01?1:0));setDerived('medication_machine_parse_json',JSON.stringify(machine));setDerived('medication_manual_review_json',JSON.stringify(manual));setDerived('medication_machine_warnings',machine.warnings.join(' | '));setDerived('ledd_final_status',machine.complete&&manual.complete?(Math.abs(diff)<0.01?'matched':'review_required'):manual.complete?'manual_available':machine.complete?'machine_available':'unresolved');setDerived('ledd_final_source',machine.complete&&manual.complete&&Math.abs(diff)<0.01?'staff_reconciled':manual.complete?'manual':machine.complete?'machine':'unresolved');setDerived('ledd_final_levodopa',manual.complete?manual.levodopa:machine.complete?machine.levodopa:null);setDerived('ledd_final_da',manual.complete?manual.da:machine.complete?machine.da:null);setDerived('ledd_final_other',manual.complete?manual.other:machine.complete?machine.other:null);setDerived('ledd_final_total',manual.complete?manual.total:machine.complete?machine.total:null);setDerived('total_ledd_mg',manual.complete?manual.total:machine.complete?machine.total:null);setDerived('levodopa_ledd_mg',manual.complete?manual.levodopa:machine.complete?machine.levodopa:null);setDerived('da_ledd_mg',manual.complete?manual.da:machine.complete?machine.da:null)}

function addParsedMedicationToReview(row){if(!row||!row.canonical_id)return;const drug=medById(row.canonical_id);ST.meds.push({drugId:row.canonical_id,name:drug?.label||row.canonical_name||'',strength:row.dose_mg===null||row.dose_mg===undefined?'':String(row.dose_mg)+' mg',times:row.times_per_day===null||row.times_per_day===undefined?'':String(row.times_per_day),units:row.units_per_time===null||row.units_per_time===undefined?'':String(row.units_per_time)});saveDraft()}

function renderMachineParseRows(parent,machine){if(!machine.rows.length)return;const list=el('div','plain-block');machine.rows.forEach(row=>{const item=el('div','med-parse-row');item.append(el('strong','',`第${row.line}行：${row.original_text}`),el('div','hint',`${row.canonical_name||'未識別'}｜${row.status}${row.reason?'｜'+row.reason:''}`));if(row.canonical_id&&row.status!=='unresolved')item.append(btn('加入人工核對清單',()=>{addParsedMedicationToReview(row);renderByFlow()},'linkbtn'));list.append(item)});parent.append(list)}

function renderBackfillScaleResult(parent,items){
  calculateAllDerived();const first=items[0]?.name||items[0]?.responseName||'';
  if(first.startsWith('hads'))parent.append(resultBox('HADS即時計算',[`A：${val('hads_anxiety_total')??'—'}／21；Review >6：${val('hads_anxiety_review')===null?'待完整':val('hads_anxiety_review')?'是':'否'}`,`D：${val('hads_depression_total')??'—'}／21；Review >9：${val('hads_depression_review')===null?'待完整':val('hads_depression_review')?'是':'否'}`]));
  if(first.startsWith('sas'))parent.append(resultBox('SAS即時計算',[`Total：${val('sas_total')??'—'}／42`,`Cutoff ≥14：${val('sas_apathy_flag')===null?'待完整':val('sas_apathy_flag')?'達標':'未達標'}`]));
  if(first.startsWith('gas'))parent.append(resultBox('GAS即時計算',[`Cognitive／Social：${val('gas_cognitive_social_total')??'—'}`,`Emotion／Reaction：${val('gas_emotion_reaction_total')??'—'}`,`Autonomy：${val('gas_autonomy_total')??'—'}`,`Total：${val('gas_total')??'—'}；PD Cutoff ≥16：${val('pd_hc_status')==='HC'?'不適用於HC':val('gas_apathy_flag')===null?'待完整':val('gas_apathy_flag')?'達標':'未達標'}`]));
  if(first.startsWith('ami'))parent.append(resultBox('AMI即時計算',[`Social：${val('ami_social_mean')??'—'}`,`Emotional：${val('ami_emotional_mean')??'—'}`,`Behavioural：${val('ami_behavioural_mean')??'—'}`,`Overall：${val('ami_overall_mean')??'—'}`]));
  if(first.startsWith('rgpts'))parent.append(resultBox('R-GPTS即時計算',[`Reference：${val('rgpts_reference_total')??'—'}／32`,`Persecutory：${val('rgpts_persecutory_total')??'—'}／40；Review ≥18：${val('rgpts_review')===null?'待完整':val('rgpts_review')?'是':'否'}`,`Total：${val('rgpts_total')??'—'}／72`]));
}

function calcAgeFromDobFinal(){const s=val('date_of_birth');if(!s)return null;const b=new Date(s+'T00:00:00'),n=new Date();let y=n.getFullYear()-b.getFullYear();if(n.getMonth()<b.getMonth()||(n.getMonth()===b.getMonth()&&n.getDate()<b.getDate()))y--;return Number.isFinite(y)&&y>=0&&y<=120?y:null}

const calcAgeOriginalFinal=calcAge;

function calcAge(){const byDob=calcAgeFromDobFinal();if(byDob!==null)return byDob;const n=Number(val('age_years'));return Number.isFinite(n)&&n>=0&&n<=120?n:null}

function renderChoice(pg,a){const g=el('div','direct');pg.options.forEach(o=>{const b=btn(o[1],()=>{set(pg.key,o[0]);if(pg.key==='education_level'&&o[2]!==null&&!present('education_years'))set('education_years',o[2]);if(pg.key==='pd_status_self_report')set('pd_hc_status',Number(o[0])===1?'PD':'HC');if(ST.flow==='stage2')player();else{b.classList.add('selected');setTimeout(autoNext,120)}},'choice'+(sameValue(val(pg.key),o[0])?' selected':''));g.append(b)});a.append(g);if(pg.key==='education_level'&&present(pg.key))a.append(fieldText('實際受教育年數','education_years','請輸入實際年數','number'))}

function firstPendingPdiInput(current){const all=qa('.bf-pdi input:not([disabled])');const ix=all.indexOf(current);return all.slice(ix+1).find(i=>i.value==='')||null}

function matrixKeydown(e,input,allowed,inputs,index,cols){
  if(new RegExp(`^[${allowed}]$`).test(e.key)){e.preventDefault();if(input.dataset.busy==='1')return;input.dataset.busy='1';input.value=e.key;input.dispatchEvent(new Event('matrixvalue'));requestAnimationFrame(()=>{input.dataset.busy='0';const next=inputs[index+1];if(next)next.focus();else input.focus()});return}
  if(e.key==='Enter'){e.preventDefault();input.focus();return}
  const move={ArrowLeft:index-1,ArrowRight:index+1,ArrowUp:index-cols,ArrowDown:index+cols};if(Object.prototype.hasOwnProperty.call(move,e.key)){e.preventDefault();const target=move[e.key];if(target>=0&&target<inputs.length)inputs[target].focus();return}if(!['Tab','Shift','Backspace','Delete','Home','End'].includes(e.key))e.preventDefault()
}

function backfillScoreLegendFinal(item,min,max){
  const options=item?.responseOptions||item?.options||[];if(!options.length)return `${min}–${max}`;
  const name=item.name||item.responseName||'';const sasNo=Number((name.match(/^sas(\d{2})_score$/)||[])[1]);const sasMap=sasNo&&B.sas?.scoring?.displayOrderByItem?.[sasNo];
  return options.map((o,i)=>{const score=o.value!==undefined?o.value:Array.isArray(sasMap)?sasMap[i]:min+i;return `${score}=${String(o.label||o.fullLabel||'').replace(/^\d+\s*/,'').trim()}`}).join('｜')
}

const BF_SCORE_HINTS={hads:['3210','0123','3210','0123','3210','3210','0123','3210','0123','3210','3210','0123','3210','0123'],sas:['3210','3210','3210','3210','3210','3210','3210','3210','0123','0123','0123','0123','0123','0123'],gas:'3210',ami:'01234',cdars:'01234',rgpts:'01234'};

function bfScaleType(items){const k=String(items?.[0]?.name||items?.[0]?.responseName||'');return ['hads','sas','gas','ami','cdars','rgpts','updrs'].find(x=>k.startsWith(x))||''}

function bfHint(type,index){const h=BF_SCORE_HINTS[type];return Array.isArray(h)?h[index]:(h||'')}

function quipKeys(){const a=[];['a','b','c','d'].forEach(d=>{for(let i=1;i<=5;i++)a.push(`quip_${d}${i}_yes`)});for(let i=1;i<=3;i++)a.push(`quip_e${i}_yes`);for(let i=1;i<=4;i++)a.push(`quip_f${i}_yes`);return a}

function setQuipStatus(x){set('quip_entry_status',x);if(x==='complete'){quipKeys().forEach(k=>{if(val(k)===null)set(k,0)});set('quip_complete',1)}else{quipKeys().forEach(k=>set(k,null));set('quip_e1_detail',null);set('quip_e2_detail',null);set('quip_complete',0)}backfill()}

function renderQuipBF(s){const status=val('quip_entry_status');s.append(el('p','hint','QUIP只有「本表格完成」或「本表格沒有資料」，沒有部分缺失。'));if(status!=='no_data'){B.quip.sharedStems.forEach(st=>{const w=el('div','compact-check');w.append(el('strong','',st.shortLabel+'：'));B.quip.domains.forEach(d=>w.append(toggleButton(d.fullLabel,`quip_${d.key}${st.index}_yes`,()=>backfill())));s.append(w)});['F','E'].forEach(prefix=>{const b=el('div','plain-block');b.append(el('strong','',prefix==='F'?'柏金遜症藥物使用':'其他重複或過度行為'));B.quip.additionalItems.filter(x=>x.code.startsWith(prefix)).forEach(x=>{b.append(toggleButton(x.backfillLabel.replace(/^[EF]\d\s*/,''),x.name,()=>backfill()));if(x.detailField&&val(x.name)===1){const t=el('textarea','conditional');t.placeholder='具體描述';t.value=val(x.detailField)||'';t.oninput=()=>set(x.detailField,t.value);b.append(t)}});s.append(b)})}const g=el('div','direct');g.append(btn('本表格完成',()=>setQuipStatus('complete'),'choice'+(status==='complete'?' selected':'')),btn('本表格沒有資料',()=>setQuipStatus('no_data'),'choice'+(status==='no_data'?' selected':'')));s.append(el('h3','','QUIP紙本狀態'),g)}

function noJumpInput(key,placeholder,disabled){const i=el('input');i.inputMode='numeric';i.maxLength=1;i.placeholder=placeholder;i.disabled=disabled;i.value=val(key)??'';i.onkeydown=e=>{if(!['Tab','Shift','Backspace','Delete','ArrowLeft','ArrowRight','Home','End'].includes(e.key)&&!/^[1-5]$/.test(e.key))e.preventDefault()};i.oninput=()=>{const v=i.value.replace(/[^1-5]/g,'').slice(-1);i.value=v;set(key,v===''?null:Number(v))};i.onpaste=e=>e.preventDefault();return i}

function staffLedd(){const lev=present('ledd_staff_review_levodopa')?Number(val('ledd_staff_review_levodopa')):null,da=present('ledd_staff_review_da')?Number(val('ledd_staff_review_da')):null,other=present('ledd_staff_review_other')?Number(val('ledd_staff_review_other')):0,total=present('ledd_staff_review_total')?Number(val('ledd_staff_review_total')):null;return{levodopa:lev,da,other,total,complete:[lev,da,total].every(Number.isFinite),status:[lev,da,total].every(Number.isFinite)?'complete':'empty'}}

function addDirectLedd(parent,label,key){const f=el('div','field'),i=el('input','text');f.append(el('label','',label));i.type='number';i.min='0';i.step='0.01';i.value=val(key)??'';i.oninput=()=>set(key,i.value===''?null:Number(i.value));f.append(i);parent.append(f)}

function renderLeddPanel(s){const m=calculateManualLeddHV_();setDerived('medication_coefficient_version','hospital-v1.0');setDerived('ledd_system_levodopa',m.levodopa);setDerived('ledd_system_da',m.da);setDerived('ledd_system_other',m.other);setDerived('ledd_system_total',m.complete?m.total:null);setDerived('medication_manual_review_json',JSON.stringify(m));s.append(resultBox('系統計算LEDD',[`Levodopa：${m.levodopa} mg`,`DA：${m.da} mg`,`Other：${m.other} mg`,`Total：${m.total} mg`,m.pending?`仍有 ${m.pending} 款需要核驗；正式System Total保持不可用。`:'所有已加入藥物均已處理。'],m.complete?'good':'warn'));const h=el('div','plain-block');h.append(el('h3','','醫院提供結果（如有）'),el('p','hint','醫院沒有提供時可留空。系統計算不會覆蓋醫院值。'));addDirectLedd(h,'Levodopa LEDD','ledd_hospital_levodopa');addDirectLedd(h,'DA LEDD','ledd_hospital_da');addDirectLedd(h,'Other LEDD（如有）','ledd_hospital_other');addDirectLedd(h,'Total LEDD','ledd_hospital_total');s.append(h);const hosp={levodopa:medHVNum_(val('ledd_hospital_levodopa')),da:medHVNum_(val('ledd_hospital_da')),other:medHVNum_(val('ledd_hospital_other')),total:medHVNum_(val('ledd_hospital_total'))};const hasHosp=hosp.total!==null;const src=hasHosp?'hospital_supplied':m.complete?'system_calculated':'pending';setDerived('ledd_final_source',src);setDerived('ledd_final_levodopa',hasHosp?hosp.levodopa:m.complete?m.levodopa:null);setDerived('ledd_final_da',hasHosp?hosp.da:m.complete?m.da:null);setDerived('ledd_final_other',hasHosp?hosp.other:m.complete?m.other:null);setDerived('ledd_final_total',hasHosp?hosp.total:m.complete?m.total:null);setDerived('levodopa_ledd_mg',val('ledd_final_levodopa'));setDerived('da_ledd_mg',val('ledd_final_da'));setDerived('total_ledd_mg',val('ledd_final_total'));s.append(resultBox('提交前核驗',[`Final來源：${src}`,`Hospital：${hasHosp?hosp.total:'—'} mg`,`System：${m.complete?m.total:'—'} mg`,`Final：${val('ledd_final_total')??'—'} mg`],hasHosp||m.complete?'good':'warn'));}

function screeningPages(){const p=[];p.push(choicePage('身分及基本資料','Participant類型','participant_series',C.participantTypes));p.push(inputPage('身分及基本資料','姓名','participant_name','例：CHAN TAI MAN 陳大文'));p.push({section:'身分及基本資料',kind:'dob',label:'出生日期'});p.push(choicePage('身分及基本資料','性別','gender',[['M','M'],['F','F']]));p.push({section:'身分及基本資料',kind:'pdIdentity',label:'已確認研究身份'});p.push(inputPage('身分及基本資料','聯絡電話','contact_phone','例：9123 4567'));p.push(choicePage('身分及基本資料','招募來源','recruitment_source_code',C.recruitment));p.push({section:'身分及基本資料',kind:'educationVerified',label:'教育程度及實際受教育年數'});p.push({section:'MoCA',kind:'moca',label:'MoCA原始總分'});p.push({section:'HADS',kind:'scaleIntro',label:'HADS作答說明',introTitle:'HADS情緒問卷',introText:'請回想過去一星期的感受。每題只選擇一個最符合實際情況的答案；沒有正確或錯誤答案。'});addScalePages(p,'HADS',B.hads.items);p.push({section:'HADS',kind:'scaleResult',scale:'HADS',label:'HADS結果'});p.push({section:'QUIP',kind:'quipGroup',group:0,label:'QUIP第1／3組：相關行為'});p.push({section:'QUIP',kind:'quipGroup',group:1,label:'QUIP第2／3組：柏金遜症藥物使用'});p.push({section:'QUIP',kind:'quipGroup',group:2,label:'QUIP第3／3組：其他重複或過度行為'});p.push({section:'QUIP',kind:'scaleResult',scale:'QUIP',label:'QUIP結果'});p.push({section:'QUIP-RS',kind:'quipRsMatrix',label:'QUIP-RS'});p.push({section:'QUIP-RS',kind:'scaleResult',scale:'QUIP-RS',label:'QUIP-RS結果'});addScalePages(p,'SAS',B.sas.items.map((x,n)=>({name:x.name,fullLabel:x.fullLabel,options:x.responseOptions.map((o,j)=>({label:o.label,value:B.sas.scoring.displayOrderByItem[n+1][j]}))})));p.push({section:'SAS',kind:'scaleResult',scale:'SAS',label:'SAS結果'});p.push({section:'RBDSQ',kind:'rbMain',label:'RBDSQ主問卷'});p.push({section:'RBDSQ',kind:'rbQ10',label:B.rbdsq.diseaseQuestion});p.push({section:'RBDSQ',kind:'scaleResult',scale:'RBDSQ',label:'RBDSQ結果'});p.push({section:'MRI安全',kind:'mriSafety',label:'MRI安全'});p.push({section:'篩查結果',kind:'screenResult',label:'首次篩查結果及最終決定'});return p}

function renderDOB(a){const row=el('div','date-row'),names=[['dob_d','DD',2],['dob_m','MM',2],['dob_y','YYYY',4]],ageBox=el('div');function commit(go){const d=+val('dob_d'),m=+val('dob_m'),y=+val('dob_y'),dt=new Date(y,m-1,d);if(!d||!m||!y||dt.getFullYear()!==y||dt.getMonth()!==m-1||dt.getDate()!==d||dt>new Date())return false;set('date_of_birth',`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`);const age=calcAge();set('age_years',age);ageBox.className='result good';ageBox.textContent=`年齡：${age}歲（自動計算）`;if(go)autoNext();return true}names.forEach((x,n)=>{const i=el('input','digits');i.inputMode='numeric';i.maxLength=x[2];i.placeholder=x[1];i.value=val(x[0])||'';i.oninput=()=>{i.value=i.value.replace(/\D/g,'').slice(0,x[2]);set(x[0],i.value);if(i.value.length===x[2]&&n<2)qa('input',row)[n+1].focus();if(n===2&&i.value.length===4)commit(false)};i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();commit(true)}else if(e.key==='Backspace'&&!i.value&&n>0)qa('input',row)[n-1].focus()};row.append(i)});a.append(row,ageBox);if(calcAge()!==null){ageBox.className='result good';ageBox.textContent=`年齡：${calcAge()}歲（自動計算）`}}

function renderPdIdentity(a){const g=el('div','direct');[['PD','PD'],['HC','HC']].forEach(x=>g.append(btn(x[1],()=>{set('pd_hc_status',x[0]);set('pd_status_self_report',x[0]==='PD'?1:0);if(x[0]==='HC')set('pd_duration_years_self_report',null);player()},'choice'+(val('pd_hc_status')===x[0]?' selected':''))));a.append(g);if(val('pd_hc_status')==='PD'){const f=el('div','field');f.append(el('label','','自述患PD多少年？'));const i=el('input','text');i.type='number';i.min='0';i.step='0.1';i.value=val('pd_duration_years_self_report')??'';i.oninput=()=>set('pd_duration_years_self_report',i.value===''?null:Number(i.value));i.onkeydown=e=>{if(e.key==='Enter'&&i.value!==''){e.preventDefault();autoNext()}};f.append(i);a.append(f)}}

function renderEducationVerified(a){const g=el('div','direct');C.education.forEach(o=>g.append(btn(o[1],()=>{const changed=val('education_level')!==o[0];set('education_level',o[0]);if(changed&&!present('education_years')&&o[2]!==null)set('education_years',o[2]);player()},'choice'+(val('education_level')===o[0]?' selected':''))));a.append(g);if(present('education_level')){const f=el('div','field');f.append(el('label','','實際受教育年數'));const i=el('input','text');i.type='number';i.min='0';i.max='40';i.value=val('education_years')??'';i.placeholder='請核實並輸入實際年數';i.oninput=()=>set('education_years',i.value===''?null:Number(i.value));i.onkeydown=e=>{if(e.key==='Enter'&&i.value!==''){e.preventDefault();autoNext()}};f.append(i,el('p','hint','教育程度只提供建議值；人工核實年數不會被靜默覆蓋。'));a.append(f)}}

function renderStage2Pd(a){const g=el('div','direct');[[1,'有PD'],[0,'沒有PD']].forEach(x=>g.append(btn(x[1],()=>{set('pd_status_self_report',x[0]);set('pd_hc_status',x[0]===1?'PD':'HC');if(x[0]===0)set('pd_duration_years_self_report',null);player()},'choice'+(sameValue(val('pd_status_self_report'),x[0])?' selected':''))));a.append(g);if(Number(val('pd_status_self_report'))===1){const f=el('div','field');f.append(el('label','','自述患PD多少年？'));const i=el('input','text');i.type='number';i.min='0';i.step='0.1';i.value=val('pd_duration_years_self_report')??'';i.inputMode='decimal';i.enterKeyHint='done';i.oninput=()=>set('pd_duration_years_self_report',i.value===''?null:Number(i.value));i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();manualNext(playerPages()[ST.step],playerPages())}};f.append(i);a.append(f)}}

;

function pdiConfirmKey(pg){return `pdi_page${pg.page}_confirmed`}

function renderIORScenario(pg,a){
  const n=String(pg.scenario).padStart(2,'0');
  a.append(el('p','context',pg.scenarioText));
  [
    ['frequency','出現頻率',['從不','很少','有時','經常','非常頻繁']],
    ['conviction','相信程度',['完全不相信','有點相信','半信半疑','相當相信','完全相信']],
    ['distress','不安程度',['完全沒有不安','輕微不安','中等不安','相當不安','非常不安']]
  ].forEach(z=>{
    const block=el('div','ior-block'),g=el('div','scale-buttons');
    block.append(el('h4','',z[1]));
    z[2].forEach((lab,i)=>{
      const v=i+1,key=`ior${n}_${z[0]}`;
      g.append(btn(`${v} ${lab}`,()=>{set(key,v);ST.error='';player()},val(key)===v?'selected':''));
    });
    block.append(g);a.append(block);
  });
}

function player(){
  calculateAllDerived();const pages=playerPages();if(!pages.length)return home();if(ST.step<0)ST.step=0;if(ST.step>=pages.length)ST.step=pages.length-1;
  const pg=pages[ST.step],m=appShell();m.append(toolbar(ST.flow==='stage2'?'第二階段問卷':'首次篩查'));
  const h=el('div','flow-head');h.append(el('h2','',pg.section));
  const sectionPages=pages.filter(x=>x.section===pg.section),localIndex=sectionPages.indexOf(pg)+1,isAnswer=x=>!['stage2Summary','scaleResult'].includes(x.kind),answerPages=pages.filter(isAnswer);
  h.append(el('div','progress',`目前：第${localIndex}／${sectionPages.length}個畫面　｜　已回答：${answerPages.filter(pageComplete).length}／${answerPages.length}`));
  const sections=[...new Set(pages.map(x=>x.section))],sm=el('div','section-menu');
  sections.forEach(section=>{const first=pages.findIndex(x=>x.section===section),required=pages.filter(x=>x.section===section&&isAnswer(x)),completed=required.filter(pageComplete).length,done=required.length>0&&completed===required.length,partial=completed>0&&!done,label=`${done?'✓ ':''}${section}`;
    if(ST.flow==='stage2')sm.append(btn(label,()=>{},(section===pg.section?'current ':'')+(done?'done':partial?'partial':'')+' disabled'));
    else sm.append(btn(label,()=>jumpSection(first,pages),(section===pg.section?'current ':'')+(done?'done':partial?'partial':'')));
  });
  h.append(sm);m.append(h);if(ST.flow==='screening')m.append(identityStrip());
  const qbox=el('section','question');if(pg.context)qbox.append(el('div','context',pg.context));qbox.append(el('h3','',pg.label));renderPage(pg,qbox);if(ST.error)qbox.append(el('div','error',ST.error));m.append(qbox);
  const nav=el('div','nav');nav.append(btn('返回上一個',()=>{if(ST.step>0){ST.step--;ST.error='';saveDraft();player()}},'secondary'));
  const needsExplicit=['cdarsExamples','positiveOne','moca','quipGroup','quipRsMatrix','pdiItem','mriSafety','rbMain','rbQ10','screenResult','stage2Summary','scaleResult','iorScenario','scaleIntro'];
  if(ST.flow==='stage2'||needsExplicit.includes(pg.kind)){const nextLabel=ST.step===pages.length-1?'檢查並提交':pg.kind==='quipGroup'?(pg.group===2?'完成QUIP':'下一組'):'下一題';nav.append(btn(nextLabel,()=>manualNext(pg,pages),'next'))}
  m.append(nav);setTimeout(()=>{const first=qbox.querySelector('input:not([disabled]),textarea:not([disabled])');if(first)first.focus({preventScroll:true})},30);
}

function fieldIdDigits(label,key,prefix,placeholder,onDone){const f=el('div','field');f.append(el('label','',label));const row=el('div','id-input-row');row.append(el('span','id-prefix',prefix));const i=el('input','text');i.inputMode='numeric';i.placeholder=placeholder;i.value=numericIdValue(val(key));const save=()=>{const digits=numericIdValue(i.value);i.value=digits;set(key,key==='s_id'?canonicalScanId(digits):canonicalParticipantId(digits));return digits};i.oninput=save;i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();const digits=save();if(digits&&onDone)return onDone();const all=qa('input,textarea',i.closest('main')||document),n=all[all.indexOf(i)+1];if(n)n.focus()}};row.append(i);f.append(row);return f}

function matrixInput105(key,placeholder,disabled,list){const i=el('input');i.inputMode='numeric';i.maxLength=1;i.placeholder=placeholder;i.disabled=disabled;i.value=val(key)??'';i.onkeydown=e=>{if(/^[1-5]$/.test(e.key)){e.preventDefault();i.value=e.key;set(key,Number(e.key));const n=list[list.indexOf(i)+1];if(n)n.focus();else i.blur()}else if(!['Tab','Shift','Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))e.preventDefault()};i.oninput=()=>{const v=i.value.replace(/[^1-5]/g,'').slice(-1);i.value=v;set(key,v===''?null:Number(v))};return i}

function renderPDIBF(s){s.append(el('p','hint','困擾、反覆想到、確信均為1–5；只在PDI內自動移到下一格，最後一格不會跳到IOR。'));const list=[];B.pdi21.items.forEach((x,n)=>{const r=el('div','bf-pdi');r.append(btn(`${String(n+1).padStart(2,'0')} ${x.fullLabel}`,()=>{const y=val(x.yesField)===1?0:1;set(x.yesField,y);Object.values(x.dimensions).forEach(d=>set(d.name,y?null:0));backfill()},'toggle'+(val(x.yesField)===1?' selected':'')));['distress','preoccupation','conviction'].forEach((k,j)=>{const i=matrixInput105(x.dimensions[k].name,j===0?'困擾1–5':j===1?'反覆1–5':'確信1–5',val(x.yesField)!==1,list);list.push(i);r.append(i)});s.append(r)});calculateAllDerived();s.append(resultBox('PDI即時計算',[`完成：${val('pdi_complete')?'21／21':'未完整'}`,`Yes數：${val('pdi_yes_count')??'—'}`,`PDI Total：${val('pdi_total')??'—'}`]))}

function renderIORBF(s){s.append(el('p','hint','三個維度均為1–5；只在IOR內自動移到下一格，最後一格停止。'));const list=[];B.ior.scenarios.forEach((sc,n)=>{const r=el('div','bf-pdi');r.append(el('span','',`${n+1}. ${sc}`));['frequency','conviction','distress'].forEach((k,j)=>{const i=matrixInput105(`ior${String(n+1).padStart(2,'0')}_${k}`,j===0?'頻率1–5':j===1?'相信1–5':'不安1–5',false,list);list.push(i);r.append(i)});s.append(r)});calculateAllDerived();s.append(resultBox('IOR即時計算',[`完成：${list.filter(i=>i.value!=='').length}／45`,`Overall：${val('ior_overall_total')??'—'}`]))}

function pdiPageItems106(pg){return B.pdi21.items.slice(pg.from,pg.to)}

function pdiPageReady106(pg){return pdiPageItems106(pg).filter(x=>val(x.yesField)===1).every(x=>['distress','preoccupation','conviction'].every(k=>present(x.dimensions[k].name)))}

function confirmPdiPage106(pg,mode){const items=pdiPageItems106(pg);if(mode==='none'){items.forEach(x=>{set(x.yesField,0);Object.values(x.dimensions).forEach(d=>set(d.name,0))})}else{if(!pdiPageReady106(pg)){ST.error='請先完成所有已選「有」題目的三個程度。';return player()}items.forEach(x=>{if(val(x.yesField)===null){set(x.yesField,0);Object.values(x.dimensions).forEach(d=>set(d.name,0))}})}set(pdiConfirmKey(pg),mode);player()}

function addBFNumber106(parent,label,key,min,max,unit,onChange){const r=el('div','bf-row');r.append(el('span','',label));const i=el('input');i.inputMode='numeric';i.placeholder=unit||`${min}–${max}`;i.value=val(key)??'';const commit=raw=>{const n=raw===''?null:Number(raw);if(n===null||(Number.isFinite(n)&&n>=min&&n<=max)){set(key,n);onChange&&onChange()}else{i.value='';set(key,null);onChange&&onChange()}};i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();focusNextInput(i);return}if(max<=5&&/^\d$/.test(e.key)){e.preventDefault();const n=Number(e.key);if(n<min||n>max)return;i.value=String(n);commit(i.value);focusNextInput(i)}};i.oninput=()=>{let raw=i.value.replace(/[^0-9.]/g,'');if(max<=5)raw=raw.slice(-1);i.value=raw;commit(raw)};r.append(i);parent.append(r);return i}

function addBFScale(parent,items,min,max){parent.append(el('p','hint',`直接輸入正式Raw分數${min}–${max}；0是有效答案，只有空白才是缺失。`));const keys=items.map(x=>x.name||x.responseName),host=el('div','bf-live-summary');const refresh=()=>{calculateAllDerived();host.innerHTML='';host.append(resultBox('即時完整性',[`完成：${keys.filter(present).length}／${keys.length}`,`缺失：${keys.filter(k=>!present(k)).join('、')||'沒有'}`]));renderBackfillScaleResult(host,items)};items.forEach((x,index)=>{const type=bfScaleType(items),hint=bfHint(type,index),label=(x.backfillLabel||x.fullLabel)+(hint?'　【'+hint+'】':'');addBFNumber106(parent,label,x.name||x.responseName,min,max,'',refresh)});parent.append(host);refresh()}

function wireBackfillIdentityEnter106(){const identity=q('#bf-identity');if(!identity)return;const all=qa('input',identity),pid=all.find(i=>i.closest('.field')?.textContent.includes('P_ID')),sid=all.find(i=>i.closest('.field')?.textContent.includes('S_ID')),name=all.find(i=>i.closest('.field')?.textContent.includes('姓名'));if(pid)pid.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();sid?.focus()}};if(sid)sid.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();name?.focus()}}}

function quipKeysV3(pg){
  if(pg.group===0)return B.quip.matrixCells.map(x=>x.name);
  return (B.quip.groups[pg.group]?.items||[]).map(x=>x.name);
}

function anySelectedV3(keys){return keys.some(k=>Number(val(k))===1)}

function setAllNoV3(keys){keys.forEach(k=>set(k,0))}

function renderQuipGroup(pg,a){
  const group=B.quip.groups[pg.group],confirmKey=`quip_group_${pg.group}_confirmed`;
  const changed=()=>{set(confirmKey,null);player()};
  a.append(el('p','instruction',B.quip.instructions));
  if(pg.group===0){
    const defs=el('div','quip-definitions');B.quip.domains.forEach(d=>{const x=el('div','definition');x.append(el('strong','',d.fullLabel));if(d.description)x.append(document.createTextNode('：'+d.description));defs.append(x)});a.append(defs);
    const table=el('div','quip-matrix');table.append(el('div','head','完整題目'));B.quip.domains.forEach(d=>table.append(el('div','head',d.fullLabel)));
    B.quip.sharedStems.forEach(st=>{table.append(el('div','quip-stem',`${st.index}. ${st.fullText}`));B.quip.domains.forEach(d=>table.append(toggleButton(d.fullLabel,`quip_${d.key}${st.index}_yes`,changed)))});a.append(table)
  }else{
    if(group.description)a.append(el('p','instruction',group.description));const list=el('div','quip-full-list');group.items.forEach(item=>{const w=el('div','quip-full-item');w.append(toggleButton(item.fullLabel,item.name,changed));if(item.detailField&&val(item.name)===1){const t=el('textarea','conditional');t.placeholder=item.detailPrompt||'請具體描述';t.value=val(item.detailField)||'';t.oninput=()=>set(item.detailField,t.value);w.append(t)}list.append(w)});a.append(list)
  }
  const noneSelected=val(confirmKey)==='none';
  a.append(btn('以上項目全部沒有',()=>{setAllNoV3(quipKeysV3(pg));set(confirmKey,'none');player()},'choice'+(noneSelected?' selected':'')));
  a.append(el('p','hint','如上方有任何符合項目，請直接選取後按「下一組」；如全部沒有，必須選擇「以上項目全部沒有」才可翻頁。'));
}

function renderMRISafety(a){a.append(el('p','instruction','請選擇參加者存在的情況。若全部沒有，必須按「以上項目全部沒有」。'));const keys=C.mriSafety.map(x=>x[0]),g=el('div','toggle-grid');C.mriSafety.forEach(x=>g.append(btn(x[1],()=>{set(x[0],val(x[0])===1?0:1);if(val(x[0])===1)set('mri_safety_none_confirmed',0);player()},'toggle'+(val(x[0])===1?' selected':''))));a.append(g);const selected=C.mriSafety.filter(x=>val(x[0])===1);if(selected.length){const r=el('div','result bad');r.append(el('strong','',`已選MRI安全／一般項目：${selected.map(x=>x[1]).join('、')}`));const t=el('textarea');t.placeholder='補充資料／待核實內容';t.value=val('mri_safety_detail')||'';t.oninput=()=>set('mri_safety_detail',t.value);r.append(t);a.append(r)}a.append(btn('以上項目全部沒有',()=>{keys.forEach(k=>set(k,0));set('mri_safety_none_confirmed',1);player()},'choice'+(val('mri_safety_none_confirmed')===1?' selected':'')))}

function renderRBQ10(a){
  const keys=B.rbdsq.diseaseItems.map(x=>x.name),g=el('div','toggle-grid');
  B.rbdsq.diseaseItems.forEach(i=>g.append(btn(i.fullLabel,()=>{set(i.name,val(i.name)===1?0:1);if(val(i.name)===1)set('rbq10_none_confirmed',0);player()},'toggle'+(val(i.name)===1?' selected':''))));
  a.append(g);
  const other=B.rbdsq.diseaseItems.find(i=>i.detailField&&val(i.name)===1);
  if(other){const t=el('textarea','conditional');t.placeholder='請說明其他神經系統疾病';t.value=val(other.detailField)||'';t.oninput=()=>set(other.detailField,t.value);a.append(t)}
  a.append(btn('以上項目全部沒有',()=>{keys.forEach(k=>set(k,0));set('rbq10_none_confirmed',1);player()},'choice'+(val('rbq10_none_confirmed')===1?' selected':'')))
}
function submitFormal(){
  const pages=playerPages();
  const requiredPages=pages.filter(pg=>!['stage2Summary','scaleResult'].includes(pg.kind));
  const missingPage=requiredPages.find(pg=>!pageComplete(pg));
  if(missingPage){
    ST.step=pages.indexOf(missingPage);
    ST.error='尚有必填內容未完成，已帶到第一個缺失位置。';
    return player();
  }
  const form='screening';
  const event=ST.flow==='stage2'?'stage_2_questionnaires':'screening_core';
  return submitPayload(form,event,'submitted');
}

const ADMIN_UI_BUILD='3.0-operational-workbench';

function clinicalNormalizedPhonePhase3_(){
  return String(val('contact_phone')||'').replace(/\D/g,'').replace(/^852(?=\d{8}$)/,'');
}

function clinicalIdentityAvailablePhase3_(){
  return Boolean(
    String(val('p_id')||'').trim()||
    String(val('s_id')||'').trim()||
    clinicalNormalizedPhonePhase3_().length>=8
  );
}

function clinicalPersistMedicationRowsPhase3_(){
  ST.meds.forEach((m,n)=>{
    const k=String(n+1).padStart(2,'0');
    const drug=medById(m.drugId)||medFind(m.name||'');
    set(`medication_${k}_name`,String(m.name||drug?.label||'').trim()||null);
    set(`medication_${k}_strength`,String(m.strength||'').trim()||null);
    set(`medication_${k}_times_per_day`,m.times===''||m.times===null||m.times===undefined?null:Number(m.times));
    set(`medication_${k}_units_per_time`,m.units===''||m.units===null||m.units===undefined?null:Number(m.units));
    set(`medication_${k}_canonical_id`,drug?.id||m.drugId||null);
    set(`medication_${k}_aliases`,drug?drug.aliases.join('|'):null);
    set(`medication_${k}_mapping_source`,drug?drug.source:null);set(`medication_${k}_formulation`,m.formulation||null);set(`medication_${k}_matched_levodopa_ledd`,m.matchedLevodopa===''||m.matchedLevodopa===undefined?null:Number(m.matchedLevodopa));
  });
}

function clinicalSyncUpdrsPhase3_(){
  const route=String(val('updrs3_route')||'');
  const total=updrsTotal();
  if(['hospital_items','research_assessed'].includes(route)&&total.count===33){
    setDerived('updrs3_calculated_total',total.total);
    setDerived('updrs3_total',total.total);
    setDerived('updrs3_total_type','calculated');
    setDerived('updrs3_complete',1);
    return;
  }
  if(route==='hospital_total_only'&&present('updrs3_reported_total')){
    setDerived('updrs3_calculated_total',null);
    setDerived('updrs3_total',Number(val('updrs3_reported_total')));
    setDerived('updrs3_total_type','reported');
    setDerived('updrs3_complete',1);
    return;
  }
  setDerived('updrs3_calculated_total',null);
  setDerived('updrs3_total',null);
  setDerived('updrs3_total_type',null);
  setDerived('updrs3_complete',0);
}

async function receiverGetPhase2_(action,params){
  const u=new URL(C.receiverUrl);u.searchParams.set('action',action);u.searchParams.set('token',adminTokenPhase2_());
  Object.entries(params||{}).forEach(([k,v])=>{if(v!==null&&v!==undefined&&String(v).trim()!=='')u.searchParams.set(k,String(v))});
  const r=await fetch(u.toString()),o=await r.json();if(!r.ok||o.ok===false)throw new Error(o.message||o.error_code||'後端查詢失敗');return o
}

function mriIdentityQueryPhase2_(){return String(val('mri_identity_query')||'').trim()}

function applyParticipantMatchPhase2_(x){
  set('p_id',x.p_id||null);set('s_id',x.s_id||null);set('participant_name',x.participant_name||null);
  set('gender',x.gender||null);set('pd_hc_status',x.pd_hc_status||null);
  if(x.contact_phone_last4)setDerived('contact_phone_last4',x.contact_phone_last4);
  setDerived('mri_identity_status',x.p_id?'matched_with_pid':x.s_id?'sid_only_pending_pid':'unresolved');safeSave()
}

function mriIdentityGatePhase2_(){
 ST.flow='mri_visit';const m=appShell();m.append(toolbar('MRI到訪記錄'));const s=el('section','identity'),error=el('div','error');
 s.append(el('h2','','建立本次MRI到訪記錄'),el('p','hint','正常操作請填S_ID及電話；P_ID可留空。必要時可只用有效電話建立記錄，最終歸屬由Registry及Participant Core處理。'));
 s.append(fieldIdDigits('S_ID（正常操作建议填写）','s_id','S','例：108'),fieldText('聯絡電話','contact_phone','例：9123 4567'),fieldIdDigits('P_ID（可選）','p_id',val('participant_series')==='Y'?'Y':'P','例：167'));
 const kind=el('div','field'),choices=el('div','direct');kind.append(el('label','','Participant類型'));[['PD','PD'],['HC','HC']].forEach(x=>choices.append(btn(x[1],()=>{set('pd_hc_status',x[0]);mriIdentityGatePhase2_()},'choice'+(String(val('pd_hc_status')||'').toUpperCase()===x[0]?' selected':''))));kind.append(choices);s.append(kind,error);
 s.append(btn('開始本次MRI記錄',()=>{const sd=numericIdValue(val('s_id')),phone=String(val('contact_phone')||'').replace(/\D/g,'').replace(/^852(?=\d{8}$)/,''),kind=String(val('pd_hc_status')||'').toUpperCase(),pd=numericIdValue(val('p_id'));if(phone.length!==8||!['PD','HC'].includes(kind)){error.textContent='請填寫有效8位電話及PD／HC。正常操作建议同时填写S_ID；必要时允许电话-only恢复。';return}set('s_id',sd?canonicalScanId(sd):null);set('contact_phone',phone);set('p_id',pd?canonicalParticipantId(pd):null);setDerived('mri_identity_status',pd?'pid_known':sd?'sid_phone_pending_pid':'phone_only_recovery');setDerived('mri_date',mriTodayPhase2_());safeSave();renderMRIVisit()},'primary'));m.append(s)
}

function mocaCutoff(age,edu){if(!Number.isFinite(Number(age))||Number(age)<=0)return null;age=Number(age);edu=Number(edu);if(age<65)return 24;if(!Number.isFinite(edu))return null;if(age<=69)return edu<=3?17:edu<=6?19:edu<=9?21:edu<=12?22:25;if(age<=79)return edu<=3?15:edu<=6?18:edu<=9?20:22;return edu<=6?13:17}

function mriSetApplicabilityPhase2_(){
  const id=String(val('pd_hc_status')||'').toUpperCase();
  if(id==='HC'){
    setDerived('medication_applicability','not_applicable');setDerived('on_off_status','not_applicable');setDerived('ledd_status','not_applicable');
    setDerived('med_on_off',null);setDerived('last_pd_med_minutes',null)
  }else if(id==='PD'){
    setDerived('medication_applicability','applicable');setDerived('on_off_status','applicable');
  }else{
    setDerived('medication_applicability','pending_identity');setDerived('on_off_status','pending_identity');setDerived('ledd_status','pending_identity');
    setDerived('med_on_off',null);setDerived('last_pd_med_minutes',null)
  }
}

function mriTodayPhase2_(){const d=new Date(),y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return String(val('mri_date')||`${y}-${m}-${day}`)}

function renderMRIVisit(){
  normalizeMriHistoricalFieldsBatchB_();mriSetApplicabilityPhase2_();
  const m=appShell();m.append(toolbar('MRI到訪記錄'),identityStrip());
  const s=el('section','summary'),id=String(val('pd_hc_status')||'').toUpperCase();
  s.append(el('h2','section-title','MRI到訪資料'),resultBox('身份狀態',[`P_ID：${val('p_id')||'尚未取得'}`,`S_ID：${val('s_id')||'尚未取得'}`,`姓名：${val('participant_name')||'未載入'}`,`Participant類型：${id||'待確認'}`,val('mri_identity_status')==='sid_only_pending_pid'?'已用S_ID建立MRI記錄，日後由Admin補P_ID。':'身份資料已載入。'],id?'good':'warn'));
  addStaffChoices(s,'Participant類型','pd_hc_status',[['PD','PD'],['HC','HC']]);
  addStaffChoices(s,'MRI到訪次數','visit_number',[[1,'第一次MRI'],[2,'第二次MRI']]);
  if(!present('mri_date'))setDerived('mri_date',mriTodayPhase2_());
  s.append(resultBox('MRI日期',[mriTodayPhase2_(),'MRI日期保留實際到訪日期；頁首本機記錄時間只表示目前開啟或修改時間。'],'good'));
  const ms=mriMocaStatePhase2_();
  s.append(resultBox('MRI前MoCA及兩個calendar months判定',ms.lines,ms.needs?'warn':'good'));
  if(ms.needs&&ms.status!=='current_event_only'){
    addStaffNumber(s,'MRI前／當日重做MoCA Raw','moca_2_raw_total','／30');
    if(present('moca_2_raw_total')){setDerived('moca_2_assessment_date',mriTodayPhase2_());renderSecondMocaResult(s)}
  }else if(ms.status==='current_event_only'){
    setDerived('moca_2_assessment_date',val('moca_2_assessment_date')||val('mri_date'));
  }
  addStaffChoices(s,'與首次MRI安全相比','mri_safety_changed_since_initial',[[0,'沒有變化'],[1,'有變化']]);
  if(val('mri_safety_changed_since_initial')===1){
    const g=el('div','toggle-grid');C.mriSafety.forEach(x=>g.append(toggleButton(x[1],'change_'+x[0],()=>renderMRIVisit())));s.append(g);
    const t=el('textarea');t.placeholder='請說明MRI安全變化內容';t.value=val('mri_safety_change_detail')||'';t.oninput=()=>set('mri_safety_change_detail',t.value);s.append(t)
  }
  if(id==='PD'){
    addStaffChoices(s,'MRI當日PD藥物狀態','med_on_off',[['ON','ON'],['OFF','OFF']]);addStaffNumber(s,'距上次服用PD藥物','last_pd_med_minutes','分鐘')
  }else if(id==='HC')s.append(resultBox('PD專用資料',['Participant為HC。歷史舊前端曾強迫填寫的Medication、LEDD、ON／OFF及最後服藥時間不視為HC有效資料。'],'good'));
  else s.append(resultBox('PD專用資料',['Participant類型尚未確定。PD專用欄位暫不顯示，MRI行政及掃描資料仍可保存。'],'warn'));
  s.append(el('h3','','Vitals'));const vitals=el('div','form-grid');addStaffNumber(vitals,'收縮壓','systolic_bp','mmHg');addStaffNumber(vitals,'舒張壓','diastolic_bp','mmHg');addStaffNumber(vitals,'心率','heart_rate_bpm','bpm');s.append(vitals);
  const tests=el('div','form-grid');const mid=el('div');mid.append(el('h3','','MID'));addStaffNumber(mid,'反應時間','mid_response_time_ms','毫秒');const cgt=el('div');cgt.append(el('h3','','CGT'));addStaffCheckbox(cgt,'CGT已完成','cgt_done');tests.append(mid,cgt);s.append(tests);
  s.append(el('h3','','Digit Span'));const digit=el('div','form-grid');addStaffNumber(digit,'Forward','digit_span_forward','');addStaffNumber(digit,'Backward','digit_span_backward','');s.append(digit);
  s.append(resultBox('Digit Span',[`Total：${present('digit_span_forward')&&present('digit_span_backward')?Number(val('digit_span_forward'))+Number(val('digit_span_backward')):'待完成'}`]));
  s.append(el('h3','','MRI Sequence'),el('p','hint','預設完成；只點選沒有完成的Sequence。紅色×代表未完成。'));
  const sg=el('div','chips');
  B.sequences.items.forEach(x=>{
    const incomplete=val(x.field)===0;
    const b=btn((incomplete?'× ':'')+x.label,()=>{set(x.field,incomplete?1:0);renderMRIVisit()},incomplete?'toggle danger':'toggle');if(incomplete){b.style.backgroundColor='#b42318';b.style.borderColor='#b42318';b.style.color='#ffffff';b.style.fontWeight='700'}sg.append(b);
  });
  s.append(sg);
  const incomplete=B.sequences.items.filter(x=>val(x.field)===0),rf=el('div','field'),rt=el('textarea');
  rf.append(el('label','','MRI Sequence備註'));rt.value=val('mri_sequence_general_remark')||'';rt.placeholder=incomplete.length?'請說明未完成Sequence及原因':'MRI Sequence備註（可留空）';rt.oninput=()=>set('mri_sequence_general_remark',rt.value);rf.append(rt);
  s.append(rf,resultBox('MRI Sequence',[`完成：${B.sequences.items.length-incomplete.length}／${B.sequences.items.length}`,incomplete.length?`未完成：${incomplete.map(x=>x.label).join('、')}`:'全部完成'],incomplete.length?'warn':'good'));
  const remarkField=el('div','field'),remark=el('textarea');remarkField.append(el('label','','MRI一般備註'));remark.value=val('mri_remark')||'';remark.placeholder='本次MRI一般備註（可留空）';remark.oninput=()=>{set('mri_remark',remark.value);setDerived('mri_visit_remark',remark.value||null)};remarkField.append(remark);s.append(remarkField);
  s.append(el('h3','','付款及Receipt'));addStaffCheckbox(s,'已付款','payment_status');addStaffCheckbox(s,'Receipt已處理','receipt_status');
  const sb=el('div','submitbar');sb.append(btn('正式提交MRI到訪',()=>validateMRIVisit(s),'primary'));s.append(sb);m.append(s);safeSave();
}

function validateMRIVisit(s){
  const missing=[];if(!val('p_id')&&!val('s_id')&&!/^\d{8}$/.test(String(val('contact_phone')||'').replace(/\D/g,'')))missing.push('P_ID、S_ID或8位電話');if(val('visit_number')===null)missing.push('MRI到訪次數');if(!mriTodayPhase2_())missing.push('MRI日期');if(val('mri_safety_changed_since_initial')===null)missing.push('MRI安全變化');if(val('mri_safety_changed_since_initial')===1&&!String(val('mri_safety_change_detail')||'').trim())missing.push('MRI安全變化內容');if(String(val('pd_hc_status')||'').toUpperCase()==='PD'&&val('med_on_off')===null)missing.push('ON／OFF');if(incompleteSequences()&&!String(val('mri_sequence_general_remark')||'').trim())missing.push('Sequence未完成原因');if(missing.length){showInlineError(s,'尚未完成：'+missing.join('、'));return}
  mriSetApplicabilityPhase2_();if(present('digit_span_forward')&&present('digit_span_backward'))setDerived('digit_span_total',Number(val('digit_span_forward'))+Number(val('digit_span_backward')));else setDerived('digit_span_total',null);
  setDerived('mri_identity_status',val('p_id')?'matched_with_pid':'sid_only_pending_pid');return submitPayload('mri','mri_scan','submitted')
}

function setBackfillApplicabilityBatch1_(){
  const id=String(val('pd_hc_status')||'').toUpperCase();
  const keys=['pd_duration_applicability','updrs_applicability','hy_applicability','medication_applicability','ledd_status','on_off_status'];
  if(id==='HC')keys.forEach(k=>setDerived(k,'not_applicable'));
  else if(id==='PD')keys.forEach(k=>setDerived(k,'applicable'));
  else keys.forEach(k=>setDerived(k,'pending_identity'));
  if(id!=='PD'){
    ['med_on_off','last_pd_med_minutes','last_pd_med_time','mri_med_on_off','mri_last_pd_med_minutes'].forEach(k=>setDerived(k,null));
  }
}

function backfill(){const m=el('main','backfill');ROOT.innerHTML='';ROOT.append(el('div','topline'),m);m.append(toolbar('歷史資料補錄'));m.append(identityStrip());const nav=el('nav','backfill-nav');const sections=[];function sec(id,title){const s=el('section','bf-section');s.id='bf-'+id;s.append(el('h2','',title));m.append(s);sections.push([id,title]);return s}
 const id=sec('identity','Participant身份及基本資料');id.append(fieldIdDigits('P_ID','p_id',val('participant_series')==='Y'?'Y':'P','例：140'),fieldIdDigits('S_ID（如紙本有）','s_id','S','例：082'),fieldText('姓名','participant_name',''));addBFDate(id,'出生日期','date_of_birth');addBFChoices(id,'性別','gender',[['M','M'],['F','F']]);addBFChoices(id,'PD／HC身份','pd_hc_status',C.identities);id.append(fieldText('聯絡電話','contact_phone',''),fieldText('評估時實際年齡','age_years','歲','number'),fieldText('實際教育年數','education_years','年','number'));
 const mo=sec('moca','MoCA');addBFNumber(mo,'MoCA原始總分','moca_1_raw_total',0,30);const age=calcAge(),edu=Number(val('education_years')),raw=val('moca_1_raw_total');if(age!==null&&Number.isFinite(edu)&&raw!==null){const cut=mocaCutoff(age,edu),adj=edu<=12?1:0;mo.append(el('div','result',`教育調整：+${adj}；調整後：${Math.min(30,+raw+adj)}/30；第16百分位Cutoff：${cut===null?'需覆核':cut}；結果：${cut===null?'待覆核':raw>cut?'高於':'低於或等於'}第16百分位`))}addBFCheckbox(mo,'紙本另有第二次MoCA','has_moca_2');if(val('has_moca_2')===1)addBFNumber(mo,'第二次MoCA原始總分','moca_2_raw_total',0,30);
 addBFScale(sec('hads','HADS'),B.hads.items,0,3);renderQuipBF(sec('quip','QUIP'));renderQuipRsBF(sec('quiprs','QUIP-RS'));addBFScale(sec('sas','SAS'),B.sas.items,0,3);
 renderRBBF(sec('rbdsq','RBDSQ'));renderMRIBF(sec('mris','MRI安全'));
 addBFScale(sec('gas','GAS'),B.gas.items,0,3);addBFScale(sec('ami','AMI-18'),B.ami18.items,0,4);const cd=sec('cdars','C-DARS');renderCdarsBF(cd);addBFScale(sec('rgpts','R-GPTS'),B.rgpts.items,0,4);renderPDIBF(sec('pdi','PDI-21'));renderIORBF(sec('ior','IOR'));
 const mv=sec('mri','MRI到訪資料');addBFDate(mv,'第一次MRI日期','mri_date');addBFCheckbox(mv,'紙本另有第二次MRI','has_mri_visit_2');if(val('has_mri_visit_2')===1)addBFDate(mv,'第二次MRI日期','mri_date_2');addBFChoices(mv,'MRI當日狀態','med_on_off',[['ON','ON'],['OFF','OFF']]);addBFNumber(mv,'距上次服用PD藥物','last_pd_med_minutes',0,9999,'分鐘');addBFNumber(mv,'MID反應時間','mid_res_time_ms',0,999999,'毫秒');addBFCheckbox(mv,'CGT已完成','cgt_done');addBFNumber(mv,'Digit Span Forward','digit_span_forward',0,99);addBFNumber(mv,'Digit Span Backward','digit_span_backward',0,99);mv.append(el('div','result',`Digit Span Total：${(Number(val('digit_span_forward'))||0)+(Number(val('digit_span_backward'))||0)}`));
 renderSequenceBF(sec('sequence','MRI Sequence'));renderClinicalBF(sec('clinical','UPDRS／HY'));renderMedicationBF(sec('meds','Medication／LEDD'));
 const pay=sec('payment','Payment／Receipt');addBFCheckbox(pay,'已付款','payment_status');addBFCheckbox(pay,'Receipt已處理','receipt_status');const rem=sec('remark','紙本補錄備註');const ta=el('textarea');ta.placeholder='缺頁、字跡不清、多個答案、未提供資料或其他資料品質問題';ta.value=val('historical_reentry_remark')||'';ta.oninput=()=>set('historical_reentry_remark',ta.value);rem.append(ta);
 sections.forEach(x=>nav.append(btn(x[1],()=>document.getElementById('bf-'+x[0]).scrollIntoView({behavior:'smooth'}))));m.insertBefore(nav,m.children[2]);const sb=el('div','submitbar');sb.append(btn('下載本地JSON',downloadCurrent,'linkbtn'),btn('保存歷史資料補錄',()=>submitPayload('backfill','historical_paper_reentry','partial'),'primary'));m.append(sb)}

function clinicalApplyParticipantMatchBatch1_(x){
  set('p_id',x.p_id||null);set('s_id',x.s_id||null);set('participant_name',x.participant_name||null);
  set('gender',x.gender||null);set('pd_hc_status',x.pd_hc_status||null);
  if(x.contact_phone_last4)setDerived('contact_phone_last4',x.contact_phone_last4);
  setDerived('clinical_identity_status',x.p_id?'matched_with_pid':x.s_id?'sid_only_pending_pid':'matched_without_ids');safeSave();renderClinical();
}

function clinicalIdentityGateBatch1_(){
  ST.flow='clinical';
  const m=appShell();m.append(toolbar('PD臨床資料'));
  const s=el('section','identity'),error=el('div','error');
  const hasDraft=Object.keys(ST.answers||{}).some(function(k){return !['contact_phone','p_id','s_id'].includes(k)&&present(k)})||(ST.meds||[]).length>0;
  s.append(el('h2','',hasDraft?'繼續未完成的Clinical記錄':'建立本次Clinical記錄'));
  s.append(el('p','hint',hasDraft?'已載入此入口保存在本機的Clinical草稿。重新輸入或核對身份不會清除已填內容。':'P_ID、S_ID或8位電話至少一項。資料会持续自动保存在此入口的本机草稿。'));
  if(hasDraft){
    s.append(resultBox('已恢复本机草稿',[
      '已填写字段：'+Object.keys(ST.answers||{}).filter(function(k){return present(k)}).length,
      '药物记录：'+(ST.meds||[]).length+'项',
      'Submission ID：'+String(ST.submission||'')
    ],'good'));
    s.append(btn('直接继续填写Clinical',()=>renderClinical(),'primary'));
  }
  s.append(fieldText('联络电话','contact_phone','例：9123 4567'));
  s.append(fieldIdDigits('P_ID（可稍后补）','p_id',val('participant_series')==='Y'?'Y':'P','例：167'));
  s.append(fieldIdDigits('S_ID（可稍后补）','s_id','S','例：108'),error);
  const open=()=>{
    const phone=clinicalNormalizedPhonePhase3_(),pd=numericIdValue(val('p_id')),sd=numericIdValue(val('s_id'));
    if(!pd&&!sd&&phone.length!==8){error.textContent='请填写P_ID、S_ID或有效8位联络电话其中一项。';return}
    if(phone.length===8)set('contact_phone',phone);
    if(pd)set('p_id',canonicalParticipantId(pd));
    if(sd)set('s_id',canonicalScanId(sd));
    if(!present('pd_hc_status'))set('pd_hc_status','PD');
    setDerived('clinical_identity_status',pd?'pid_known':sd?'sid_known':'phone_pending_pid');safeSave();renderClinical();
  };
  s.append(btn(hasDraft?'核对身份并继续':'开始本次Clinical记录',open,'primary'));m.append(s)
}

function identityGate(title){if(ST.flow==='mri_visit')return mriIdentityGatePhase2_();if(ST.flow==='clinical')return clinicalIdentityGateBatch1_();home()}

function calendarAddMonthsIsoBatchB_(iso,count){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso||''));
  if(!m)return null;
  const year=Number(m[1]),month=Number(m[2]),day=Number(m[3]);
  const first=new Date(year,month-1+Number(count||0),1);
  const lastDay=new Date(first.getFullYear(),first.getMonth()+1,0).getDate();
  return `${first.getFullYear()}-${String(first.getMonth()+1).padStart(2,'0')}-${String(Math.min(day,lastDay)).padStart(2,'0')}`;
}

function normalizeMriHistoricalFieldsBatchB_(){
  const copyIfMissing=(target,sources)=>{
    if(present(target))return;
    for(const source of sources){
      if(present(source)){setDerived(target,val(source));return}
    }
  };
  copyIfMissing('mid_response_time_ms',['mid_res_time_ms']);
  copyIfMissing('mid_res_time_ms',['mid_response_time_ms']);
  copyIfMissing('mri_remark',['mri_visit_remark']);
  copyIfMissing('mri_visit_remark',['mri_remark']);
  if(present('digit_span_forward')&&present('digit_span_backward'))setDerived('digit_span_total',Number(val('digit_span_forward'))+Number(val('digit_span_backward')));
  const id=String(val('pd_hc_status')||'').toUpperCase();
  if(id==='HC'){
    ['med_on_off','last_pd_med_minutes','last_pd_med_time','mri_med_on_off','mri_last_pd_med_minutes'].forEach(k=>setDerived(k,null));
    setDerived('medication_applicability','not_applicable');
    setDerived('on_off_status','not_applicable');
    setDerived('ledd_status','not_applicable');
  }
}

function latestMocaIsCurrentMriBatchB_(){
  const source=String(val('latest_valid_moca_source')||'').toLowerCase();
  const priorDate=String(val('latest_valid_moca_date')||'');
  const currentDate=String(val('mri_date')||'');
  const priorRaw=val('latest_valid_moca_raw_total');
  const currentRaw=val('moca_2_raw_total');
  const sameRaw=present('moca_2_raw_total')&&present('latest_valid_moca_raw_total')&&Number(priorRaw)===Number(currentRaw);
  return source.includes('mri')&&priorDate&&currentDate&&priorDate===currentDate&&sameRaw;
}

function mriMocaStatePhase2_(){
  if(latestMocaIsCurrentMriBatchB_()){
    return{status:'current_event_only',needs:true,lines:[
      '目前查到的MoCA屬於本次MRI事件，不能當作MRI前既有MoCA。',
      `本次MRI MoCA：${val('moca_2_raw_total')}／30｜日期：${val('mri_date')||'—'}`,
      '結果：未找到可用的MRI前MoCA；本次結果仍會保留為本次MRI MoCA。'
    ]};
  }
  const raw=val('latest_valid_moca_raw_total'),date=String(val('latest_valid_moca_date')||'');
  if(raw===null||raw==='')return{status:'missing',needs:true,lines:['沒有找到MRI前既有MoCA結果。','結果：需要重做或由Staff核實。']};
  if(!date)return{status:'date_unavailable',needs:true,lines:[`最近MRI前MoCA Raw：${raw}／30`,`Adjusted：${val('latest_valid_moca_adjusted_total')??'—'}`,'評估日期缺失，不能宣稱仍在有效期內。','結果：需要Staff核實或重做。']};
  const expiry=calendarAddMonthsIsoBatchB_(date,2),today=mriTodayPhase2_(),needs=!expiry||today>expiry;
  return{status:needs?'expired':'valid',needs,lines:[`最近MRI前MoCA Raw：${raw}／30`,`Adjusted：${val('latest_valid_moca_adjusted_total')??'—'}`,`日期：${date}｜來源：${val('latest_valid_moca_source')||'—'}`,`有效至：${expiry||'—'}`,`本次MRI：${today}`,needs?'結果：需要重做MoCA':'結果：MRI前既有MoCA仍有效']};
}

async function loadLatestMocaPhase2_(status){
  const params={p_id:val('p_id'),s_id:val('s_id')};
  if(!params.p_id&&!params.s_id)return;
  status.textContent='正在載入最近MoCA……';
  try{
    const o=await receiverGetPhase2_('latest_moca',params),m=o.latest_valid_moca||null;
    if(m){
      setDerived('latest_valid_moca_raw_total',m.raw_total??null);
      setDerived('latest_valid_moca_adjusted_total',m.adjusted_total??null);
      setDerived('latest_valid_moca_date',m.assessment_date||null);
      setDerived('latest_valid_moca_source',m.source_event||null);
      if(!(String(m.source_event||'').toLowerCase().includes('mri')&&String(m.assessment_date||'')===String(val('mri_date')||'')&&present('moca_2_raw_total')&&Number(m.raw_total)===Number(val('moca_2_raw_total')))){
        setDerived('moca_1_raw_total',m.raw_total??null);
        setDerived('moca_1_adjusted_total',m.adjusted_total??null);
        setDerived('moca_1_assessment_date',m.assessment_date||null);
      }
    }else{
      ['latest_valid_moca_raw_total','latest_valid_moca_adjusted_total','latest_valid_moca_date','latest_valid_moca_source'].forEach(k=>setDerived(k,null));
    }
    normalizeMriHistoricalFieldsBatchB_();safeSave();status.textContent=m?'已載入Participant及MoCA記錄。':'已載入Participant；未找到可用MoCA。';renderMRIVisit();
  }catch(e){status.className='result warn';status.textContent='Participant已載入，但MoCA查詢失敗：'+e.message;renderMRIVisit()}
}

function payload(form,event,status){
 calculateAllDerived();normalizeMriHistoricalFieldsBatchB_();clinicalPersistMedicationRowsPhase3_();
 const route={screening_core:'screening',stage_2_questionnaires:'stage2',first_school_assessment:'mri',mri_scan:'mri',clinical_supplement:'clinical',historical_paper_reentry:'backfill',field_correction:'screening'}[event]||form||'screening';
 const clean={schema_version:'apathy-event-payload-v1',frontend_release:FRONTEND_RELEASE,receiver_contract_expected:'APATHY-RECEIVER-C2-2026-08-19',submission_id:ST.submission,form_type:route,event_type:event,workflow_stage:event==='stage_2_questionnaires'?'stage_2':'stage_1',workflow_part:ST.flow,record_status:status,p_id:val('p_id'),s_id:val('s_id'),visit_number:val('visit_number'),participant_id:val('p_id')||val('s_id')||(String(val('contact_phone')||'').replace(/\D/g,'')?'PHONE-'+String(val('contact_phone')||'').replace(/\D/g,'').replace(/^852(?=\d{8}$)/,''):'TEMP-'+ST.submission),submitted_at:new Date().toISOString(),data_source:event==='historical_paper_reentry'?'historical_paper_reentry':event==='stage_2_questionnaires'?'participant_remote':event==='clinical_supplement'?'staff_assisted_clinical':'staff_assisted'};
 Object.keys(ST.answers).forEach(k=>{if(k!=='payload_json'&&k!=='hkid_prefix4')clean[k]=ST.answers[k]===undefined?null:ST.answers[k]});
 clean.contact_phone_normalized=String(clean.contact_phone||'').replace(/\D/g,'').replace(/^852(?=\d{8}$)/,'')||null;
 if(event==='mri_scan'||event==='first_school_assessment'){
  const mid=present('mid_response_time_ms')?Number(val('mid_response_time_ms')):present('mid_res_time_ms')?Number(val('mid_res_time_ms')):null;clean.mid_response_time_ms=mid;clean.mid_res_time_ms=mid;
  const cgt=present('cgt_complete')?Number(val('cgt_complete')):present('cgt_done')?Number(val('cgt_done')):null;clean.cgt_complete=cgt;clean.cgt_done=cgt;
  const remark=val('mri_remark')||val('mri_visit_remark')||null;clean.mri_remark=remark;clean.mri_visit_remark=remark;
  clean.identity_resolution_status=clean.p_id?'pid_known':clean.s_id?'sid_phone_pending_pid':clean.contact_phone_normalized?'phone_only_recovery':'unresolved';
 }
 if(B.pdi21&&B.pdi21.items){clean.pdi_page1_confirmed=B.pdi21.items.slice(0,10).every(x=>present(x.yesField))?1:0;clean.pdi_page2_confirmed=B.pdi21.items.slice(10).every(x=>present(x.yesField))?1:0;}
 return Object.assign({},clean,{payload_json:JSON.stringify(clean)})
}

const MED_HV1=Object.freeze([
{id:'levodopa_ir',label:'Levodopa IR／Sinemet IR',cls:'Levodopa',bucket:'levodopa',kind:'factor',factor:1,source:'hospital-v1.0'},
{id:'madopar',label:'Madopar／Modopar／Medopar',cls:'Levodopa',bucket:'levodopa',kind:'factor',factor:1,source:'hospital-v1.0'},
{id:'sinemet_cr',label:'Sinemet CR／Levodopa CR',cls:'Levodopa CR',bucket:'levodopa',kind:'factor',factor:.75,source:'hospital-v1.0'},
{id:'stalevo',label:'Stalevo／Levodopa + Entacapone',cls:'Levodopa + COMT inhibitor',bucket:'levodopa',kind:'factor',factor:1.33,source:'hospital-v1.0'},
{id:'duodopa',label:'Duodopa／Levodopa intestinal gel',cls:'Levodopa',bucket:'levodopa',kind:'factor',factor:1.11,source:'literature-fallback'},
{id:'rytary',label:'Rytary／Levodopa ER',cls:'Levodopa ER',bucket:'levodopa',kind:'factor',factor:.6,source:'literature-fallback'},
{id:'ropinirole',label:'Ropinirole／Requip／Requip XL',cls:'Dopamine agonist',bucket:'da',kind:'factor',factor:20,source:'hospital-v1.0'},
{id:'pramipexole',label:'Pramipexole／Mirapex／Minapex',cls:'Dopamine agonist',bucket:'da',kind:'factor',factor:100,source:'hospital-v1.0'},
{id:'rotigotine',label:'Rotigotine／Neupro patch',cls:'Dopamine agonist',bucket:'da',kind:'factor',factor:30,source:'hospital-v1.0'},
{id:'apomorphine',label:'Apomorphine',cls:'Dopamine agonist',bucket:'da',kind:'factor',factor:10,source:'literature-fallback'},
{id:'bromocriptine',label:'Bromocriptine',cls:'Dopamine agonist',bucket:'da',kind:'factor',factor:10,source:'literature-fallback'},
{id:'cabergoline',label:'Cabergoline',cls:'Dopamine agonist',bucket:'da',kind:'factor',factor:80,source:'literature-fallback'},
{id:'lisuride',label:'Lisuride',cls:'Dopamine agonist',bucket:'da',kind:'factor',factor:100,source:'literature-fallback'},
{id:'pergolide',label:'Pergolide',cls:'Dopamine agonist',bucket:'da',kind:'factor',factor:100,source:'literature-fallback'},
{id:'rasagiline',label:'Rasagiline／Azilect',cls:'MAO-B inhibitor',bucket:'other',kind:'factor',factor:100,source:'hospital-v1.0'},
{id:'selegiline_oral',label:'Selegiline oral',cls:'MAO-B inhibitor',bucket:'other',kind:'factor',factor:10,source:'hospital-v1.0'},
{id:'selegiline_sl',label:'Selegiline sublingual／Zelapar',cls:'MAO-B inhibitor',bucket:'other',kind:'factor',factor:80,source:'literature-fallback'},
{id:'safinamide',label:'Safinamide／Xadago',cls:'MAO-B inhibitor',bucket:'other',kind:'safinamide',source:'hospital-v1.0'},
{id:'amantadine',label:'Amantadine',cls:'Amantadine',bucket:'other',kind:'factor',factor:1,source:'hospital-v1.0'},
{id:'entacapone',label:'Entacapone／Comtan／Cuntas',cls:'COMT inhibitor',bucket:'other',kind:'matched',factor:.33,source:'literature-fallback'},
{id:'tolcapone',label:'Tolcapone／Tasmar',cls:'COMT inhibitor',bucket:'other',kind:'matched',factor:.5,source:'literature-fallback'},
{id:'opicapone',label:'Opicapone／Ongentys',cls:'COMT inhibitor',bucket:'other',kind:'matched',factor:.5,source:'literature-fallback'},
{id:'trihexyphenidyl',label:'Trihexyphenidyl／Artane／Benzhexol',cls:'Other Parkinson medicine',bucket:'none',kind:'na',source:'catalog'},
{id:'procyclidine',label:'Procyclidine',cls:'Other Parkinson medicine',bucket:'none',kind:'na',source:'catalog'},
{id:'istradefylline',label:'Istradefylline',cls:'Other Parkinson medicine',bucket:'none',kind:'na',source:'catalog'},
{id:'zonisamide',label:'Zonisamide',cls:'Other Parkinson medicine',bucket:'none',kind:'na',source:'catalog'},
{id:'pregabalin',label:'Pregabalin／Lyrica',cls:'Non-PD medicine',bucket:'none',kind:'na',source:'catalog'},
{id:'gabapentin',label:'Gabapentin／Neurontin',cls:'Non-PD medicine',bucket:'none',kind:'na',source:'catalog'},
{id:'senna',label:'Senna／Senokot',cls:'Non-PD medicine',bucket:'none',kind:'na',source:'catalog'},
{id:'clonazepam',label:'Clonazepam／Rivotril',cls:'Non-PD medicine',bucket:'none',kind:'na',source:'catalog'},
{id:'other_pd',label:'其他帕金森病相關藥物',cls:'Other Parkinson medicine',bucket:'none',kind:'review',source:'manual'},
{id:'other_non_pd',label:'其他非帕金森病藥物',cls:'Non-PD medicine',bucket:'none',kind:'na',source:'manual'}
]);

function medHVDrug_(id){return MED_HV1.find(x=>x.id===id)||null}

function medHVPresetOptions_(id){const x={
levodopa_ir:[['Sinemet 25/100 mg（Levodopa 100 mg）',100],['Sinemet 25/250 mg（Levodopa 250 mg）',250]],
madopar:[['Madopar 62.5 mg（Levodopa 50 mg）',50],['Madopar 125 mg（Levodopa 100 mg）',100],['Madopar 250 mg（Levodopa 200 mg）',200]],
sinemet_cr:[['Sinemet CR 25/100 mg（Levodopa 100 mg）',100],['Sinemet CR 50/200 mg（Levodopa 200 mg）',200]],
stalevo:[['Stalevo 50/12.5/200 mg（Levodopa 50 mg）',50],['Stalevo 75/18.75/200 mg（Levodopa 75 mg）',75],['Stalevo 100/25/200 mg（Levodopa 100 mg）',100],['Stalevo 125/31.25/200 mg（Levodopa 125 mg）',125],['Stalevo 150/37.5/200 mg（Levodopa 150 mg）',150],['Stalevo 175/43.75/200 mg（Levodopa 175 mg）',175],['Stalevo 200/50/200 mg（Levodopa 200 mg）',200]]};return x[id]||[]}

function medHVFormulationSelect_(m){const opts=medHVPresetOptions_(m.drugId);if(!opts.length)return null;const x=el('select');x.append(new Option('選擇完整製劑規格',''));opts.forEach(([label,ld])=>x.append(new Option(label,label)));x.append(new Option('其他規格／手動填Levodopa成分','__custom__'));x.value=m.formulation||'';x.onchange=()=>{m.formulation=x.value;if(x.value&&x.value!=='__custom__'){const hit=opts.find(o=>o[0]===x.value);if(hit)m.strength=String(hit[1])}else if(x.value==='__custom__')m.strength='';medHVSave_();renderByFlow()};return x}

function medHVNum_(x){if(x===null||x===undefined||String(x).trim()==='')return null;const n=Number(x);return Number.isFinite(n)?n:null}

function medHVCalcRow_(m){const d=medHVDrug_(m.drugId),strength=medHVNum_(m.strength),units=medHVNum_(m.units),times=medHVNum_(m.times);if(!d)return {status:'unresolved',reason:'尚未選擇藥物',ledd:null};if(d.kind==='na')return {status:'not_applicable',reason:d.cls+'：保留記錄，不計入LEDD',ledd:0,drug:d};if(d.kind==='review')return {status:'needs_review',reason:'已保留藥物，但目前沒有正式LEDD係數',ledd:null,drug:d};if(d.kind==='matched'){const matched=medHVNum_(m.matchedLevodopa);if(matched===null)return {status:'needs_review',reason:'COMT inhibitor需要填寫共同服用的每日Levodopa LEDD',ledd:null,drug:d};const led=medRound(matched*d.factor);return {status:'calculated',ledd:led,drug:d,daily:matched,formula:`${matched} × ${d.factor} = ${led} mg`,factor:d.factor};}if(strength===null||units===null||times===null)return {status:'unresolved',reason:'請完整填寫單位劑量、每次數量及每日次數',ledd:null,drug:d};const daily=medRound(strength*units*times);let led,factor;if(d.kind==='safinamide'){if(daily===50)led=100;else if(daily===100)led=125;else return {status:'needs_review',reason:'Hospital-V1.0只確認Safinamide 50 mg→100、100 mg→125',ledd:null,drug:d,daily};factor='fixed';}else{factor=d.factor;led=medRound(daily*d.factor);}return {status:'calculated',ledd:led,drug:d,daily,factor,formula:d.kind==='safinamide'?`${daily} mg/day → fixed ${led} mg`:`${strength} × ${units} × ${times} × ${d.factor} = ${led} mg`};}

function calculateManualLeddHV_(){const totals={levodopa:0,da:0,other:0,total:0},rows=(ST.meds||[]).map(m=>{const r=medHVCalcRow_(m);if(r.status==='calculated'&&r.drug.bucket!=='none')totals[r.drug.bucket]+=r.ledd;return Object.assign({},m,r)});Object.keys(totals).forEach(k=>totals[k]=medRound(totals[k]));totals.total=medRound(totals.levodopa+totals.da+totals.other);const pending=rows.filter(r=>!['calculated','not_applicable'].includes(r.status)).length;return Object.assign(totals,{rows,pending,complete:rows.length>0&&pending===0,status:rows.length?(pending?'needs_review':'complete'):'empty'});}

function medHVSave_(){saveDraft()}

function medHVInput_(value,placeholder,onchange,type='number'){const x=el('input');x.type=type;x.value=value??'';x.placeholder=placeholder;if(type==='number'){x.step='any';x.inputMode='decimal'}x.oninput=()=>onchange(x.value);x.onchange=()=>renderByFlow();return x}

function renderMedicationBF(s){s.append(btn('＋新增一款藥物',()=>{ST.meds.push({drugId:'',name:'',strength:'',units:'',times:'',matchedLevodopa:''});medHVSave_();backfill()},'primary'));renderMedicationRows(s);renderLeddPanel(s)}

function renderClinical(){const m=appShell();m.append(toolbar('PD臨床資料'),identityStrip());const s=el('section','summary');s.append(el('h2','section-title','PD臨床資料'));s.append(fieldText('聯絡電話','contact_phone','例：9123 4567'));addStaffNumber(s,'核實PD病程','pd_duration_verified_years','年');addStaffChoices(s,'UPDRS Part III資料路徑','updrs3_route',[['hospital_total_only','醫院只提供總分'],['hospital_items','醫院提供小分'],['research_assessed','研究團隊施測'],['pending_hospital','待醫院提供'],['not_applicable','不適用']]);
 if(val('updrs3_route')==='hospital_total_only')addStaffNumber(s,'UPDRS Part III總分','updrs3_reported_total','/132');if(['hospital_items','research_assessed'].includes(val('updrs3_route'))){s.append(el('h3','','UPDRS Part III 33項'));renderUPDRSItems(s,val('updrs3_route')==='research_assessed')}
 if(val('updrs3_route')==='research_assessed'){addStaffCheckbox(s,'正接受PD藥物治療','updrs3a_pd_treatment');if(val('updrs3a_pd_treatment')===1)addStaffChoices(s,'臨床狀態','updrs3b_clinical_state',[['ON','ON／來電'],['OFF','OFF／停電']]);addStaffCheckbox(s,'有服用Levodopa','updrs3c_levodopa');if(val('updrs3c_levodopa')===1)addStaffNumber(s,'距最後服用Levodopa','updrs3c1_last_levodopa_minutes','分鐘');addStaffCheckbox(s,'檢查期間出現異動症','updrs3_dyskinesia_present');if(val('updrs3_dyskinesia_present')===1)addStaffCheckbox(s,'異動症干擾動作功能檢查','updrs3_dyskinesia_interference')}
 addStaffChoices(s,'UPDRS 1.5資料路徑','updrs15_route',[['hospital_total_only','醫院提供'],['research_assessed','研究團隊施測'],['pending_hospital','待醫院提供'],['not_applicable','不適用']]);if(['hospital_total_only','research_assessed'].includes(val('updrs15_route'))){s.append(el('h3','','UPDRS 1.5 冷漠感'));renderAnchorChoices(s,'updrs_item_1_5',B.clinical.updrs15.text.options)}
 addStaffChoices(s,'Hoehn & Yahr資料路徑','hy_route',[['hospital_total_only','醫院提供'],['research_assessed','研究團隊評估'],['pending_hospital','待醫院提供'],['not_applicable','不適用']]);if(['hospital_total_only','research_assessed'].includes(val('hy_route'))){s.append(el('h3','','Hoehn & Yahr'));renderAnchorChoices(s,'hy_stage',B.clinical.hy.text.options)}
 s.append(el('h3','','Medication'),btn('＋新增藥物',()=>{ST.meds.push({drugId:'',name:'',strength:'',times:'',units:''});saveDraft();renderClinical()},'primary'));renderMedicationRows(s);renderLeddPanel(s);if(!ST.meds.length)s.append(el('div','result','尚未加入藥物；LEDD暫不可計算。'));
 const total=updrsTotal();s.append(el('div','result',`UPDRS完成：${total.count}/33${total.count===33?'；總分：'+total.total:'/132'}`));const sb=el('div','submitbar');sb.append(btn('正式提交Clinical資料',()=>validateClinical(s),'primary'));s.append(sb);m.append(s)}

home();

const SUBMISSION_TRANSPORT_BUILD='2026-08-20-single-post-iframe-receipt-v4';

function receiverPostIframeReceiptFinal_(submissionPayload,timeoutMs){
  return new Promise(function(resolve,reject){
    const nonce=uuid(),iframe=document.createElement('iframe'),form=document.createElement('form');
    const frameName='apathy_receipt_'+Date.now()+'_'+Math.random().toString(36).slice(2);
    let settled=false;
    iframe.name=frameName;iframe.style.display='none';iframe.setAttribute('aria-hidden','true');
    form.method='POST';form.action=C.receiverUrl;form.target=frameName;form.style.display='none';
    function hidden(name,value){const input=document.createElement('input');input.type='hidden';input.name=name;input.value=String(value);form.appendChild(input)}
    hidden('data',JSON.stringify(submissionPayload));hidden('receipt_mode','iframe');hidden('receipt_nonce',nonce);hidden('parent_origin',location.origin);
    function cleanup(){window.removeEventListener('message',onMessage);window.clearTimeout(timer);window.setTimeout(function(){form.remove();iframe.remove()},0)}
    function finishError(error){if(settled)return;settled=true;cleanup();reject(error)}
    function onMessage(event){
      const d=event&&event.data;
      if(!d||d.type!=='APATHY_SUBMISSION_RECEIPT'||d.receipt_nonce!==nonce)return;
      if(String(d.submission_id||'')!==String(submissionPayload.submission_id||''))return;
      if(!/^(https:\/\/script\.google\.com|https:\/\/script\.googleusercontent\.com)$/.test(String(event.origin||'')))return;
      settled=true;cleanup();resolve(d);
    }
    const timer=window.setTimeout(function(){finishError(Object.assign(new Error('Receiver single-POST receipt timed out'),{code:'SUBMISSION_UNCONFIRMED'}))},Math.max(1000,Number(timeoutMs)||10000));
    window.addEventListener('message',onMessage);document.body.append(iframe,form);
    try{form.submit()}catch(error){finishError(error)}
  })
}
function receiverStatusJsonpFinal_(submissionId,timeoutMs){
  return new Promise(function(resolve,reject){
    const callbackName='__apathy_status_'+Date.now()+'_'+Math.random().toString(36).slice(2),script=document.createElement('script'),url=new URL(C.receiverUrl);
    let settled=false,retired=false;
    function removeScript(){if(script.parentNode)script.parentNode.removeChild(script)}
    function retireCallback(){if(retired)return;retired=true;window[callbackName]=function(){};window.setTimeout(function(){try{delete window[callbackName]}catch(ignored){window[callbackName]=undefined}},30000)}
    const timer=window.setTimeout(function(){if(settled)return;settled=true;removeScript();retireCallback();reject(new Error('Receiver status verification timed out'))},Math.max(250,Number(timeoutMs)||1600));
    window[callbackName]=function(result){if(settled)return;settled=true;window.clearTimeout(timer);removeScript();retireCallback();resolve(result)};
    script.onerror=function(){if(settled)return;settled=true;window.clearTimeout(timer);removeScript();retireCallback();reject(new Error('Receiver status endpoint could not be loaded'))};
    url.searchParams.set('action','status');url.searchParams.set('submission_id',String(submissionId||''));url.searchParams.set('callback',callbackName);url.searchParams.set('_ts',String(Date.now()));script.src=url.toString();script.async=true;document.head.appendChild(script)
  })
}
async function receiverPostNoCorsFinal_(submissionPayload){await fetch(C.receiverUrl,{method:'POST',mode:'no-cors',cache:'no-store',redirect:'follow',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(submissionPayload)});return{transport_ok:true,submission_id:submissionPayload.submission_id}}
function receiverWaitFinal_(milliseconds){return new Promise(function(resolve){window.setTimeout(resolve,milliseconds)})}
async function confirmSubmissionFinal_(submissionId,startedAt){
  const start=Number(startedAt)||Date.now(),deadline=start+10000,waits=[250,500,850,1300,1800];let lastStatus=null,lastError=null;
  for(let attempt=0;attempt<waits.length;attempt++){
    let remaining=deadline-Date.now();if(remaining<=250)break;await receiverWaitFinal_(Math.min(waits[attempt],Math.max(0,remaining-200)));remaining=deadline-Date.now();if(remaining<=250)break;
    try{lastStatus=await receiverStatusJsonpFinal_(submissionId,Math.min(1600,Math.max(250,remaining-100)));if(lastStatus&&lastStatus.ok===true&&lastStatus.received===true)return{confirmed:true,status:lastStatus,attempt:attempt+1}}
    catch(error){lastError=error;console.warn('Receiver status verification failed',attempt+1,error)}
  }
  return{confirmed:false,status:lastStatus,error:lastError,confirmation_timed_out:true,elapsed_ms:Date.now()-start}
}

async function submitPayload(form,event,status){
  if(ST.submitting)return;

  const submissionStartedAt=Date.now();
  const p=payload(form,event,status);
  if(!p.submission_id){
    ST.submission=ST.submission||uuid();
    p.submission_id=ST.submission;
  }

  const submissionId=String(p.submission_id);
  ST.submission=submissionId;
  saveDraft();
  ST.submitting=true;

  const modal=el('div','modal');
  const box=el('div','modal-box submit-wait');
  const title=el('h2','','正在提交資料……');
  const msg=el('p','','請不要重新整理、關閉頁面或重複按提交。系統正在傳送並確認寫入；整個等待不會超過10秒。');
  const timer=el('div','status','已等待0秒');
  box.append(title,msg,timer);
  modal.append(box);
  document.body.append(modal);

  let seconds=0;
  const tick=window.setInterval(function(){
    seconds++;
    timer.textContent='已等待'+seconds+'秒'+(seconds>=8?'；即將完成10秒確認預算。':'');
  },1000);

  try{
    const receipt=await receiverPostIframeReceiptFinal_(p,10000);
    if(!receipt||receipt.ok!==true){
      const error=new Error(String(receipt&&receipt.message||'Receiver未确认写入。'));
      error.code=String(receipt&&receipt.error_code||'SUBMISSION_UNCONFIRMED');
      error.submission_id=submissionId;
      throw error;
    }
    window.clearInterval(tick);
    box.innerHTML='';
    box.append(
      el('h2','','提交成功'),
      el('p','',`Submission ID：${submissionId}`),
      el('p','hint',receipt.sheet?`Receiver已确认写入：${receipt.sheet} #${receipt.row}${receipt.duplicate?'（已存在，同ID未重复写入）':''}`:'Receiver已确认收到资料。'),
      btn('返回',function(){
        modal.remove();
        ST.submission=uuid();
        saveDraft();
        if(form==='screening'&&event==='screening_core'&&['HC','Apathy','Pure_PD'].includes(val('final_screening_decision')))player();
      },'primary')
    );
  }catch(error){
    window.clearInterval(tick);
    box.innerHTML='';

    if(error&&error.code==='SUBMISSION_UNCONFIRMED'){
      box.append(
        el('h2','','资料写入状态尚未确认'),
        el('p','','资料已经发送，但浏览器的Receiver状态确认逾时。资料可能已经写入，请保留原Submission ID；确认Raw后如需重试，必须使用同一ID。'),
        el('p','',`Submission ID：${submissionId}`),
        el('p','hint','本机草稿及原Submission ID均已保留。此提示不代表写入失败，也不算浏览器已确认提交成功。')
      );
    }else{
      box.append(
        el('h2','','提交未完成'),
        el('p','',`资料仍保存在此装置。${String(error&&error.message?error.message:error)}`),
        el('p','hint',`Submission ID：${submissionId}`)
      );
    }

    const actions=el('div','submitbar');
    actions.append(
      btn('下载本地JSON',downloadCurrent,'linkbtn'),
      btn('返回修改',function(){modal.remove()},'primary')
    );
    box.append(actions);
  }finally{
    ST.submitting=false;
  }
}

function stage2Pages(){
  const p=[];
  p.push(inputPage('身份確認','姓名','participant_name','請輸入姓名'));
  p.push(inputPage('身份確認','聯絡電話','contact_phone','例：9123 4567'));
  addScalePages(p,'GAS',B.gas.items);addScalePages(p,'AMI-18',B.ami18.items);
  B.cdars.domains.forEach(d=>{
    const e1=d.example1Field||`cdars_${d.key}_example_1`,e2=d.example2Field||`cdars_${d.key}_example_2`;
    p.push({section:'C-DARS',kind:'cdarsExamples',label:d.examplePrompt||`請填寫兩項${d.title||d.key}例子`,domain:d,example1Key:e1,example2Key:e2});
    const items=B.cdars.items.filter(x=>x.domain===d.key);
    items.forEach((x,n)=>p.push({section:'C-DARS',kind:'cdarsScale',label:x.fullLabel||x.combinedFormalLabel,key:x.name,options:x.options||x.responseOptions,item:n+1,total:items.length,domain:d,example1Key:e1,example2Key:e2,instruction:x.instructions||''}));
  });
  addScalePages(p,'R-GPTS',B.rgpts.items);
  B.pdi21.items.forEach((item,index)=>p.push({section:'PDI-21',kind:'pdiItem',label:`PDI ${index+1}/21`,pdi:item,item:index+1,total:21}));
  B.ior.scenarios.forEach((x,n)=>p.push({section:'IOR',kind:'iorScenario',label:`情境 ${n+1}：${x}`,scenario:n+1,scenarioText:x}));
  p.push({section:'完成',kind:'stage2Summary',label:'第二階段問卷完成檢查'});return p;
}

function renderPage(pg,a){
  if(pg.kind==='choice')return renderChoice(pg,a);if(pg.kind==='input')return renderInput(pg,a);if(pg.kind==='dob')return renderDOB(a);
  if(pg.kind==='pdIdentity')return renderPdIdentity(a);if(pg.kind==='educationVerified')return renderEducationVerified(a);if(pg.kind==='stage2Pd')return renderStage2Pd(a);
  if(pg.kind==='positiveOne')return renderPositiveOne(pg,a);if(pg.kind==='scaleIntro')return renderScaleIntro(pg,a);if(pg.kind==='scale')return renderScale(pg,a);if(pg.kind==='moca')return renderMoca(a);
  if(pg.kind==='quipShared')return renderQuipShared(pg,a);if(pg.kind==='quipExtra')return renderQuipExtra(pg,a);if(pg.kind==='quipGroup')return renderQuipGroup(pg,a);if(pg.kind==='quipRsMatrix')return renderQuipRsMatrix(a);
  if(pg.kind==='rbMain')return renderRBMain(a);if(pg.kind==='rbQ10')return renderRBQ10(a);if(pg.kind==='mriSafety')return renderMRISafety(a);if(pg.kind==='screenResult')return renderScreenResult(a);if(pg.kind==='scaleResult')return renderScaleCompletion(pg,a);
  if(pg.kind==='cdarsExamples')return renderCdarsExamples(pg,a);if(pg.kind==='cdarsScale')return renderCdarsScale(pg,a);if(pg.kind==='pdiItem')return renderPdiItem(pg,a);if(pg.kind==='iorScenario')return renderIORScenario(pg,a);if(pg.kind==='stage2Summary')return renderStage2Summary(a);
}

function renderExamples(pg,a){return renderCdarsExamples({domain:{title:pg.label},example1Key:pg.key+'_1',example2Key:pg.key+'_2'},a)}

function renderCdarsExamples(pg,a){
  a.append(el('p','instruction',(pg.domain.examplePrompt||`請填寫兩項${pg.domain.title||'活動'}例子`)+'。請在下面兩個空格各填一項。'));
  [[pg.example1Key,'例子一'],[pg.example2Key,'例子二']].forEach(([key,label])=>{const f=el('div','field');f.append(el('label','',label));const i=el('input','text');i.value=val(key)||'';i.placeholder=`請填寫${label}`;i.oninput=()=>set(key,i.value);f.append(i);a.append(f)});
}

function cdarsStem(pg){const a=String(val(pg.example1Key)||'').trim(),b=String(val(pg.example2Key)||'').trim(),base=pg.label||'';return `對於「${a}」和「${b}」，${base.replace(/^對於[^，]*，?/,'').replace(/這些活動/g,'這兩項活動')}`}

function renderCdarsScale(pg,a){const x=Object.assign({},pg,{label:cdarsStem(pg)});a.append(el('p','context',x.label));renderScale(x,a)}

function setPdiAnswer(item,answer){set(item.yesField,answer);if(answer===0)Object.values(item.dimensions).forEach(d=>set(d.name,null))}

function renderPDIPage(pg,a){return renderPdiItem({pdi:pg.pdi||B.pdi21.items[pg.item-1],item:pg.item,total:21},a)}

function renderPdiItem(pg,a){
 const x=pg.pdi;
 a.append(el('p','instruction',`${pg.item}/21。請明確選擇「是」或「否」。未選擇不能進入下一題。`),el('h3','',x.fullLabel));
 const yn=el('div','direct'),choose=answer=>{setPdiAnswer(x,answer);ST.error='';player()};
 yn.append(btn('是',()=>choose(1),'choice'+(val(x.yesField)===1?' selected':'')),btn('否',()=>choose(0),'choice'+(val(x.yesField)===0?' selected':'')));a.append(yn);
 if(val(x.yesField)!==1)return;
 const dims=[['distress','這件事是否對您造成困擾？',['1 沒有困擾','2 輕微困擾','3 中等困擾','4 相當困擾','5 十分困擾']],['preoccupation','您是否時常想起這件事？',['1 幾乎沒有','2 偶爾想到','3 有時想到','4 經常想到','5 一直在想']],['conviction','您相信這件事是真的嗎？',['1 一點也不真實','2 有點不真實','3 半信半疑','4 相當真實','5 非常真實']]];
 dims.forEach(([kind,title,labels])=>{const block=el('div','plain-block'),g=el('div','scale-buttons'),key=x.dimensions[kind].name;block.append(el('strong','',title));labels.forEach((label,index)=>{const value=index+1;g.append(btn(label,()=>{set(key,value);ST.error='';player()},val(key)===value?'selected':''))});block.append(g);a.append(block)});
}

function pageComplete(pg){
  if(pg.kind==='pdiItem'){const x=pg.pdi;if(val(x.yesField)===0)return true;if(val(x.yesField)!==1)return false;return ['distress','preoccupation','conviction'].every(k=>present(x.dimensions[k].name))}
  if(pg.kind==='cdarsExamples')return Boolean(String(val(pg.example1Key)||'').trim()&&String(val(pg.example2Key)||'').trim());
  if(pg.kind==='cdarsScale')return present(pg.key);
  if(pg.kind==='iorScenario'){const n=String(pg.scenario).padStart(2,'0');return ['frequency','conviction','distress'].every(k=>present(`ior${n}_${k}`))}
  if(pg.kind==='quipRsMatrix'){const status=val('quiprs_section_confirmed');return (status==='none'||status==='answered')&&B.quiprs.matrixCells.length===28&&B.quiprs.matrixCells.every(x=>present(x.name)&&Number(val(x.name))>=0&&Number(val(x.name))<=4)}
  if(pg.kind==='quipGroup')return anySelectedV3(quipKeysV3(pg))||val(`quip_group_${pg.group}_confirmed`)==='none';
  if(pg.kind==='mriSafety')return anySelectedV3(C.mriSafety.map(x=>x[0]))||val('mri_safety_none_confirmed')===1;
  if(pg.kind==='rbQ10')return anySelectedV3(B.rbdsq.diseaseItems.map(x=>x.name))||val('rbq10_none_confirmed')===1;
  if(pg.kind==='rbMain')return present(B.rbdsq.sourceField)&&val('rbdsq_section_confirmed')===1&&B.rbdsq.items.every(x=>present(x.name));
  if(pg.kind==='screenResult')return present('final_screening_decision');
  if(pg.kind==='dob')return present('date_of_birth');if(pg.kind==='moca')return present('moca_1_raw_total');
  if(['stage2Summary','scaleResult','scaleIntro'].includes(pg.kind))return true;
  return pg.key?present(pg.key):true;
}

function manualNext(pg,pages){
  if(!pageComplete(pg)){ST.error='此題尚未完成，請先完成目前内容。';return player()}
  if(pg.kind==='quipGroup'){completeQuipGroup(pg);if(val(`quip_group_${pg.group}_confirmed`)!=='none')set(`quip_group_${pg.group}_confirmed`,'selected')}
  if(ST.step<pages.length-1){ST.step++;ST.error='';saveDraft();return player()}return submitFormal();
}

function validateClinical(s){
  if(!clinicalIdentityAvailablePhase3_()){showInlineError(s,'P_ID、S_ID及聯絡電話至少需要其中一項，才可提交Clinical資料。');return}
  if(!present('pd_duration_verified_years')){showInlineError(s,'請填寫核實PD病程。');return}
  const route=String(val('updrs3_route')||'');
  if(!route){showInlineError(s,'請選擇UPDRS Part III資料路徑。');return}
  if(route==='hospital_total_only'&&!present('updrs3_reported_total')&&!present('updrs3_total')){showInlineError(s,'請填寫UPDRS總分。');return}
  if(['hospital_items','research_assessed'].includes(route)&&updrsTotal().count<33){showInlineError(s,'UPDRS小題尚未完成，請完成全部33項，避免漏題。');return}
  clinicalSyncUpdrsPhase3_();clinicalPersistMedicationRowsPhase3_();
  const t=updrsTotal();if(t.count===33){set('updrs3_calculated_total',t.total);set('updrs3_total',t.total)}
  saveDraft();return submitPayload('clinical','clinical_supplement','submitted');
}

function handleGlobalKeydown(e){
  if(e.altKey||e.ctrlKey||e.metaKey||e.isComposing)return;
  const active=document.activeElement;if(active&&(['INPUT','TEXTAREA','SELECT'].includes(active.tagName)||active.isContentEditable))return;
  if(ST.flow==='clinical'&&/^[0-4]$/.test(e.key)){
    const route=val('updrs3_route');if(!['hospital_items','research_assessed'].includes(route))return;
    const items=B.clinical.updrs3.items||[],key=ST.updrsActiveKey||items.find(x=>!present(x.name))?.name;if(!key)return;
    e.preventDefault();set(key,Number(e.key));const ix=items.findIndex(x=>x.name===key);ST.updrsActiveKey=items[ix+1]?.name||key;renderClinical();return scrollClinicalToActive();
  }
  if(!['stage2','screening'].includes(ST.flow))return;
  const pg=playerPages()[ST.step];
  if(ST.flow==='stage2'&&e.key==='Enter'){e.preventDefault();return manualNext(pg,playerPages())}
  if(!/^\d$/.test(e.key))return;const n=Number(e.key);
  if(pg.kind==='scale'||pg.kind==='cdarsScale'){
    const opts=pg.options||[];let hit=null,position=null;
    if(opts.length===4&&n>=1&&n<=4){hit=opts[n-1];position=n}else{hit=opts.find(o=>Number(o.value)===n)||null;position=hit?opts.indexOf(hit)+1:null}
    if(hit){e.preventDefault();set(pg.key,hit.value);ST.error='';const selector=`[data-answer-key="${pg.key}"][data-answer-position="${position}"]`,button=q(selector);if(button){button.classList.add('selected');button.style.backgroundColor='#145a96';button.style.borderColor='#145a96';button.style.color='#ffffff'}return ST.flow==='screening'?setTimeout(autoNext,220):player()}
  }
  if(ST.flow==='stage2'&&pg.kind==='iorScenario'&&n>=1&&n<=5){const id=String(pg.scenario).padStart(2,'0'),missing=['frequency','conviction','distress'].find(k=>!present(`ior${id}_${k}`))||'distress';e.preventDefault();set(`ior${id}_${missing}`,n);ST.error='';return player()}
  if(ST.flow==='stage2'&&pg.kind==='pdiItem'&&val(pg.pdi.yesField)===1&&n>=1&&n<=5){const missing=['distress','preoccupation','conviction'].find(k=>!present(pg.pdi.dimensions[k].name));if(missing){e.preventDefault();set(pg.pdi.dimensions[missing].name,n);ST.error='';player()}}
}

document.addEventListener('keydown',handleGlobalKeydown);
})();
