// @ts-nocheck
'use strict';
(function(){
const B=window.APATHY_QUESTION_BANK,C=window.FORM_CONFIG,ROOT=document.getElementById('app');
if(!B||!C) throw new Error('Question Bank或Config未載入。');
const ST={flow:'home',step:0,answers:{},error:'',submission:uuid(),sectionOpen:false,meds:[],submitting:false,staffUnlocked:false};
const q=(s,p=document)=>p.querySelector(s), qa=(s,p=document)=>Array.from(p.querySelectorAll(s));
const el=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x};
const btn=(text,fn,cls='')=>{const x=el('button',cls,text);x.type='button';x.onclick=fn;return x};
const val=k=>ST.answers[k]===undefined?null:ST.answers[k];
function set(k,v){ST.answers[k]=v;saveDraft()}
function uuid(){return crypto.randomUUID?crypto.randomUUID():'sub-'+Date.now()+'-'+Math.random().toString(36).slice(2)}
function saveDraft(){localStorage.setItem('apathy-v7-'+ST.flow,JSON.stringify({answers:ST.answers,step:ST.step,meds:ST.meds,submission:ST.submission}))}
function loadDraft(flow){try{const d=JSON.parse(localStorage.getItem('apathy-v7-'+flow)||'null');if(d){ST.answers=d.answers||{};ST.step=d.step||0;ST.meds=d.meds||[];ST.submission=d.submission||uuid()}else resetFlow()}catch(e){resetFlow()}}
function resetFlow(){ST.answers={};ST.step=0;ST.meds=[];ST.submission=uuid()}
function nowHK(){return new Date().toLocaleString('zh-HK',{hour12:false})}
function appShell(){ROOT.innerHTML='';ROOT.append(el('div','topline'));const m=el('main','app');ROOT.append(m);return m}
function toolbar(title,homeButton=true){const b=el('header','toolbar');b.append(el('h1','',title));const a=el('div','tool-actions');a.append(btn('下載本地JSON',downloadCurrent,'linkbtn'));if(ST.flow!=='home')a.append(btn('清除此裝置資料',confirmClear,'linkbtn'));if(homeButton)a.append(btn('返回首頁',home,'linkbtn'));b.append(a);return b}
function home(){ST.flow='home';const m=appShell();const t=toolbar('Apathy研究評估',false);const sw=el('div','staff-wrap'),pop=el('div','staff-pop hidden');const sb=btn('工作人員模式 ▾',()=>pop.classList.toggle('hidden'),'linkbtn');C.staffFlows.forEach(x=>pop.append(btn(x[1],()=>staffGate(x[0],x[1]))));sw.append(sb,pop);t.lastChild.append(sw);m.append(t);const h=el('section','home');h.append(el('h2','','研究問卷'),el('p','','請按下方按鈕開始或繼續填寫。正式問卷每次只顯示一個回答單位，完成答案後自動前進。'),btn('開始／繼續填寫',()=>start('stage2'),'primary'));m.append(h)}
function start(flow){ST.flow=flow;loadDraft(flow);ST.error='';if(flow==='stage2'||flow==='screening') return player();if(flow==='backfill')return backfill();if(flow==='research_admin')return renderResearchAdmin();if(flow==='mri_visit')return identityGate('MRI到訪記錄');if(flow==='clinical')return identityGate('PD臨床資料')}
function staffGate(flow,title){if(ST.staffUnlocked)return start(flow);const m=appShell();m.append(toolbar('工作人員登入'));const s=el('section','staff-password');s.append(el('h2','',title),el('p','hint','請輸入工作人員密碼。'));const i=el('input','text');i.type='password';i.inputMode='numeric';i.placeholder='工作人員密碼';const e=el('div','error');const go=()=>{if(i.value===String(C.staffPassword||'080')){ST.staffUnlocked=true;start(flow)}else e.textContent='密碼不正確。'};i.onkeydown=x=>{if(x.key==='Enter')go()};s.append(i,e,btn('進入',go,'primary'));m.append(s);setTimeout(()=>i.focus(),20)}
function renderResearchAdmin(){const m=appShell();m.append(toolbar('研究進度管理'));const s=el('section','summary');s.append(el('h2','section-title','後端Participant狀態'));s.append(el('p','hint','此頁預留讀取後端Admin_Status名單：可按P_ID、S_ID、姓名或HKID頭四字搜尋，查看已有資料、缺失、下一步及提交歷史。手動更改將以Correction Event追加，不直接覆蓋Raw。'));const f=fieldText('搜尋','admin_search','P_ID／S_ID／姓名／HKID頭四字');s.append(f,el('div','result','目前Receiver尚未提供Admin_Status查詢接口；部署前需同步更新Receiver。'));m.append(s)}
function normalizeId(v){return String(v||'').trim().toUpperCase().replace(/\s+/g,'')}
function validExamples(v){return String(v||'').trim().length>0}
function confirmClear(){const m=el('div','modal'),b=el('div','modal-box');b.append(el('h2','','清除此裝置資料？'),el('p','',`將清除目前Workflow「${ST.flow}」的本機草稿、答案及位置；不會影響後端已提交資料或已下載JSON。`));const a=el('div','submitbar');a.append(btn('取消',()=>m.remove(),'linkbtn'),btn('確定清除',()=>{localStorage.removeItem('apathy-v7-'+ST.flow);resetFlow();m.remove();ST.flow==='home'?home():start(ST.flow)},'primary'));b.append(a);m.append(b);document.body.append(m)}
function identityGate(title){const m=appShell();m.append(toolbar(title));const s=el('section','identity');s.append(el('h2','',title),el('p','hint','先輸入紙本或工作清單上的P_ID。確認身份後才顯示後續資料。'));const f=fieldText('P_ID','p_id','例：P140');s.append(f);if(ST.flow==='mri_visit')s.append(fieldText('S_ID（可選）','s_id','例：S082'));const e=el('div','error');s.append(e,btn('載入Participant',()=>{const id=normalizeId(val('p_id'));if(!/^[PY]\d{3,6}$/.test(id)){e.textContent='請輸入有效P_ID，例如P140。';return}set('p_id',id);if(ST.flow==='mri_visit')renderMRIVisit();else renderClinical()},'primary'));m.append(s);setTimeout(()=>q('input',s)?.focus(),30)}
function fieldText(label,key,placeholder='',type='text'){const f=el('div','field');f.append(el('label','',label));const i=el('input','text');i.type=type;i.placeholder=placeholder;i.value=val(key)??'';i.oninput=()=>set(key,i.value);i.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();const all=qa('input,textarea,button',document);const n=all[all.indexOf(i)+1];if(n)n.focus()}};f.append(i);return f}
function identityStrip(){return el('div','identity-strip',`目前Participant：${val('p_id')||'未分配'}${val('participant_name')?'｜'+val('participant_name'):''}${val('pd_hc_status')?'｜'+val('pd_hc_status'):''}${val('s_id')?'｜'+val('s_id'):''}　 本機記錄時間：${nowHK()}`)}
function playerPages(){return ST.flow==='stage2'?stage2Pages():screeningPages()}
function stage2Pages(){const pages=[];pages.push(inputPage('身份確認','姓名','participant_name','請輸入姓名'));pages.push({section:'身份確認',kind:'dob',label:'出生日期'});pages.push(choicePage('身份確認','性別','gender',[['M','M'],['F','F']]));pages.push(inputPage('身份確認','聯絡電話','contact_phone','例：9123 4567'));addScalePages(pages,'GAS',B.gas.items);addScalePages(pages,'AMI-18',B.ami18.items);B.cdars.domains.forEach(d=>{pages.push({section:'C-DARS',kind:'examples',label:d.examplePrompt,key:d.examplesField,placeholder:d.examplePlaceholder});addScalePages(pages,'C-DARS',B.cdars.items.filter(x=>x.domain===d.key))});addScalePages(pages,'R-GPTS',B.rgpts.items);pages.push({section:'PDI-21',kind:'pdiPage',label:'PDI第1頁',from:0,to:10,page:1});pages.push({section:'PDI-21',kind:'pdiPage',label:'PDI第2頁',from:10,to:21,page:2});B.ior.scenarios.forEach((scenario,n)=>pages.push({section:'IOR',kind:'iorScenario',label:`情境 ${n+1}：${scenario}`,scenario:n+1,scenarioText:scenario}));pages.push({section:'完成',kind:'stage2Summary',label:'第二階段問卷完成檢查'});return pages}
function screeningPages(){const p=[];
 p.push(choicePage('身分及基本資料','Participant類型','participant_series',C.participantTypes));
 p.push(inputPage('身分及基本資料','姓名','participant_name','例：CHAN TAI MAN 陳大文'));
 p.push(inputPage('身分及基本資料','香港身份證頭四個字','hkid_prefix4','例：A123'));
 p.push({section:'身分及基本資料',kind:'dob',label:'出生日期'});
 p.push(choicePage('身分及基本資料','性別','gender',[['M','M'],['F','F']]));
 p.push(choicePage('身分及基本資料','已確認研究身份','pd_hc_status',C.identities));
 p.push(inputPage('身分及基本資料','聯絡電話','contact_phone','例：9123 4567'));
 p.push(choicePage('身分及基本資料','招募來源','recruitment_source_code',C.recruitment));
 p.push(choicePage('身分及基本資料','教育程度','education_level',C.education.map(x=>[x[0],x[1],x[2]])));
 p.push({section:'身分及基本資料',kind:'positiveOne',label:'Participant自述PD狀態',key:'pd_status_self_report',button:'有PD',conditional:{key:'pd_duration_years_self_report',label:'自述PD病程',unit:'年'}});
 p.push({section:'MoCA',kind:'moca',label:'MoCA原始總分'});
 addScalePages(p,'HADS',B.hads.items);
 B.quip.sharedStems.forEach(st=>p.push({section:'QUIP',kind:'quipShared',label:st.fullText,stem:st}));
 p.push({section:'QUIP',kind:'quipExtra',label:'柏金遜症藥物使用',items:B.quip.additionalItems.filter(x=>x.code.startsWith('F'))});
 p.push({section:'QUIP',kind:'quipExtra',label:'其他重複或過度行為',items:B.quip.additionalItems.filter(x=>x.code.startsWith('E'))});
 B.quiprs.matrixCells.forEach((x,n)=>p.push({section:'QUIP-RS',kind:'scale',label:x.fullStem,context:x.fullDomainLabel,item:n+1,key:x.name,options:x.options,total:B.quiprs.matrixCells.length,subprogress:`共享問題${x.stemIndex}/4`}));
 addScalePages(p,'SAS',B.sas.items.map((x,n)=>({name:x.name,fullLabel:x.fullLabel,options:x.responseOptions.map((o,j)=>({label:o.label,value:B.sas.scoring.displayOrderByItem[n+1][j]}))})));
 p.push({section:'RBDSQ',kind:'rbMain',label:'RBDSQ主問卷'});p.push({section:'RBDSQ',kind:'rbQ10',label:B.rbdsq.diseaseQuestion});
 p.push({section:'MRI安全',kind:'mriSafety',label:'MRI安全'});
 p.push({section:'篩查結果',kind:'screenResult',label:'首次篩查結果及最終決定'});return p}
function addScalePages(arr,section,items){items.forEach((x,n)=>arr.push({section,kind:'scale',label:x.fullLabel||x.combinedFormalLabel,key:x.name||x.responseName,options:x.options||x.responseOptions,item:n+1,total:items.length,instruction:x.instructions||''}))}
function choicePage(section,label,key,options){return{section,kind:'choice',label,key,options}}
function inputPage(section,label,key,placeholder){return{section,kind:'input',label,key,placeholder}}
function player(){const pages=playerPages();if(ST.step>=pages.length)ST.step=pages.length-1;const pg=pages[ST.step],m=appShell();m.append(toolbar(ST.flow==='stage2'?'第二階段問卷':'首次篩查'));const h=el('div','flow-head'),line=el('div','flow-line');line.append(el('h2','',pg.section));const tb=btn(`目前部分：${pg.section} ▾`,()=>{ST.sectionOpen=!ST.sectionOpen;player()},'section-toggle');line.append(tb);h.append(line);
 const sectionPages=pages.filter(x=>x.section===pg.section),localIndex=sectionPages.indexOf(pg)+1;h.append(el('div','progress',`${pg.section} ${localIndex}/${sectionPages.length}　｜　全部 ${ST.step+1}/${pages.length}`));if(ST.sectionOpen){const sm=el('div','section-menu');[...new Set(pages.map(x=>x.section))].forEach(s=>{const first=pages.findIndex(x=>x.section===s),b=btn(s,()=>jumpSection(first,pages),s===pg.section?'current':'');sm.append(b)});h.append(sm)}m.append(h);if(ST.flow==='screening')m.append(identityStrip());const qbox=el('section','question');if(pg.context)qbox.append(el('div','context',pg.context));qbox.append(el('h3','',pg.label));renderPage(pg,qbox);if(ST.error)qbox.append(el('div','error',ST.error));m.append(qbox);const nav=el('div','nav');nav.append(btn('上一題',()=>{if(ST.step>0){ST.step--;ST.error='';saveDraft();player()}}));nav.append(btn(ST.step===pages.length-1?'檢查並提交':'下一題',()=>manualNext(pg,pages),'next'));m.append(nav);setTimeout(()=>{const first=qbox.querySelector('input:not([disabled]),textarea:not([disabled])');if(first)first.focus({preventScroll:true})},40)}
function jumpSection(i,pages){const blocker=pages.slice(0,i).findIndex(x=>!pageComplete(x));if(blocker>=0){ST.step=blocker;ST.error='請先完成目前及前面的必填內容。';return player()}ST.step=i;ST.error='';ST.sectionOpen=false;player()}
function renderPage(pg,a){if(pg.kind==='choice')renderChoice(pg,a);else if(pg.kind==='input')renderInput(pg,a);else if(pg.kind==='dob')renderDOB(a);else if(pg.kind==='positiveOne')renderPositiveOne(pg,a);else if(pg.kind==='scale')renderScale(pg,a);else if(pg.kind==='moca')renderMoca(a);else if(pg.kind==='quipShared')renderQuipShared(pg,a);else if(pg.kind==='quipExtra')renderQuipExtra(pg,a);else if(pg.kind==='rbMain')renderRBMain(a);else if(pg.kind==='rbQ10')renderRBQ10(a);else if(pg.kind==='mriSafety')renderMRISafety(a);else if(pg.kind==='screenResult')renderScreenResult(a);else if(pg.kind==='examples')renderExamples(pg,a);else if(pg.kind==='pdiYes')renderPDIYes(pg,a);else if(pg.kind==='pdiDim')renderPDIDim(pg,a);else if(pg.kind==='pdiPage')renderPDIPage(pg,a);else if(pg.kind==='iorScenario')renderIORScenario(pg,a);else if(pg.kind==='stage2Summary')renderStage2Summary(a)}
function renderChoice(pg,a){const g=el('div','direct');pg.options.forEach(o=>{const b=btn(o[1],()=>{set(pg.key,o[0]);if(pg.key==='education_level'&&o[2]!==null)set('education_years',o[2]);autoNext()},val(pg.key)===o[0]?'selected':'');g.append(b)});a.append(g);if(pg.key==='education_level'&&val(pg.key)==='other'){const f=fieldText('實際教育年數','education_years','請輸入年數','number');a.append(f)}}
function renderInput(pg,a){const i=el('input','text');i.placeholder=pg.placeholder||'';i.value=val(pg.key)??'';i.oninput=()=>set(pg.key,i.value);i.onkeydown=e=>{if(e.key==='Enter'&&i.value.trim())autoNext()};a.append(i)}
function renderDOB(a){const row=el('div','date-row'),names=[['dob_d','DD',2],['dob_m','MM',2],['dob_y','YYYY',4]];names.forEach((x,n)=>{const i=el('input','digits');i.inputMode='numeric';i.maxLength=x[2];i.placeholder=x[1];i.value=val(x[0])||'';i.oninput=()=>{i.value=i.value.replace(/\D/g,'').slice(0,x[2]);set(x[0],i.value);if(i.value.length===x[2]&&n<2)qa('input',row)[n+1].focus();if(n===2&&i.value.length===4)finishDOB(a)};i.onkeydown=e=>{if(e.key==='Backspace'&&!i.value&&n>0)qa('input',row)[n-1].focus()};row.append(i)});a.append(row);const age=calcAge();if(age!==null)a.append(el('div','result',`年齡：${age}歲（自動計算）`))}
function finishDOB(a){const d=+val('dob_d'),m=+val('dob_m'),y=+val('dob_y'),dt=new Date(y,m-1,d);if(dt.getFullYear()!==y||dt.getMonth()!==m-1||dt.getDate()!==d||dt>new Date()){ST.error='出生日期無效，請核對。';return player()}set('date_of_birth',`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`);autoNext()}
function calcAge(){const s=val('date_of_birth');if(!s)return null;const b=new Date(s+'T00:00:00'),n=new Date();let y=n.getFullYear()-b.getFullYear();if(n.getMonth()<b.getMonth()||(n.getMonth()===b.getMonth()&&n.getDate()<b.getDate()))y--;return y}
function renderPositiveOne(pg,a){const g=el('div','direct'),b=btn(pg.button,()=>{set(pg.key,val(pg.key)===1?0:1);if(val(pg.key)!==1&&pg.conditional)set(pg.conditional.key,null);player()},val(pg.key)===1?'selected':'');g.append(b);a.append(g);if(val(pg.key)===1&&pg.conditional){const f=el('div','field conditional');f.append(el('label','',pg.conditional.label));const i=el('input','text');i.type='number';i.value=val(pg.conditional.key)??'';i.oninput=()=>set(pg.conditional.key,i.value===''?null:Number(i.value));f.append(i,document.createTextNode(' '+pg.conditional.unit));a.append(f)}}
function renderScale(pg,a){if(pg.subprogress)a.append(el('p','hint',`${pg.subprogress}　｜　本量表第${pg.item}/${pg.total}題`));if(pg.options.length===5){const g=el('div','scale-buttons');pg.options.forEach((o,n)=>{const b=btn('',()=>{set(pg.key,o.value);autoNext()},val(pg.key)===o.value?'selected':'');b.append(el('strong','',String(o.value)),document.createTextNode(o.label));g.append(b)});a.append(g)}else{const g=el('div','options');pg.options.forEach((o,n)=>{const b=btn('',()=>{set(pg.key,o.value);autoNext()},'choice'+(val(pg.key)===o.value?' selected':''));b.append(el('span','key',String(n+1)),document.createTextNode(o.label));g.append(b)});a.append(g)}}
function mocaCutoff(age,edu){if(age<65)return null;if(age<=69)return edu<=3?17:edu<=6?19:edu<=9?21:edu<=12?22:25;if(age<=79)return edu<=3?15:edu<=6?18:edu<=9?20:22;return edu<=6?13:17}
function renderMoca(a){const i=el('input','text');i.type='number';i.min=0;i.max=30;i.placeholder='0–30';i.value=val('moca_1_raw_total')??'';i.oninput=()=>{set('moca_1_raw_total',i.value===''?null:Number(i.value));player()};a.append(i);const raw=val('moca_1_raw_total'),age=calcAge(),edu=Number(val('education_years'));if(raw===null||age===null||!Number.isFinite(edu)){a.append(el('div','result','輸入總分並完成出生日期與教育資料後，系統會顯示第16百分位結果。'));return}const adj=edu<=12?1:0,adjusted=Math.min(30,Number(raw)+adj),cut=mocaCutoff(age,edu);Object.assign(ST.answers,{moca_1_adjustment:adj,moca_1_adjusted_total:adjusted,moca_1_age_years:age,moca_1_education_years:edu,moca_1_16th_cutoff:cut,moca_1_norm_result_code:cut===null?null:(raw>cut?1:0)});const r=el('div','result '+(cut!==null&&raw<=cut?'bad':'good'));r.innerHTML=`原始總分：${raw}/30<br>教育調整：+${adj}<br>調整後總分：${adjusted}/30<br>第16百分位Cutoff：${cut===null?'65歲以下，需覆核':cut}<br>結果：${cut===null?'待覆核':raw>cut?'高於第16百分位':'低於或等於第16百分位'}${cut===null?'':`<br>相對Cutoff：${raw-cut>=0?'+':''}${raw-cut}分`}`;a.append(r)}
function renderQuipShared(pg,a){const g=el('div','toggle-grid');B.quip.domains.forEach(d=>{const key=`quip_${d.key}${pg.stem.index}_yes`,label=d.fullLabel==='B'?'B':d.fullLabel;g.append(toggleButton(label,key,()=>player()))});a.append(g,el('p','hint','未選項目代表「否」。可選零項、一項或多項。'))}
function renderQuipExtra(pg,a){const g=el('div','toggle-grid');pg.items.forEach(i=>{const wrap=el('div');wrap.append(toggleButton(i.backfillLabel.replace(/^\w+\s*/,''),i.name,()=>player()));if(i.detailField&&val(i.name)===1){const t=el('textarea','conditional');t.placeholder=i.code==='E1'?'請具體描述活動／任務':'請具體描述重複行為';t.value=val(i.detailField)||'';t.oninput=()=>set(i.detailField,t.value);wrap.append(t)}g.append(wrap)});a.append(g,el('p','hint','未選項目代表「否」。完成整組後按下一題。'))}
function toggleButton(label,key,rerender){return btn(label,()=>{set(key,val(key)===1?0:1);rerender&&rerender()},'toggle'+(val(key)===1?' selected':''))}
function renderRBMain(a){const f=el('div','field');f.append(el('div','label','資料由誰提供？'));const src=el('div','direct');B.rbdsq.sourceOptions.forEach(o=>src.append(btn(o.label,()=>{set(B.rbdsq.sourceField,o.value);player()},val(B.rbdsq.sourceField)===o.value?'selected':'')));f.append(src);a.append(f);const g=el('div','toggle-grid');B.rbdsq.items.forEach(i=>g.append(toggleButton(i.fullLabel,i.name,()=>player())));a.append(g,el('p','hint','未選項目代表「否」。'))}
function renderRBQ10(a){const g=el('div','toggle-grid');B.rbdsq.diseaseItems.forEach(i=>{const w=el('div');w.append(toggleButton(i.fullLabel,i.name,()=>player()));if(i.detailField&&val(i.name)===1){const t=el('textarea','conditional');t.placeholder='請說明其他神經系統疾病';t.value=val(i.detailField)||'';t.oninput=()=>set(i.detailField,t.value);w.append(t)}g.append(w)});a.append(g);const score=scoreRB();a.append(el('div','result',`RBDSQ總分：${score.total}/13　${score.note}`))}
function renderMRISafety(a){a.append(el('p','instruction','請選擇參加者存在的情況。未選項目代表「沒有／否」。'));const g=el('div','toggle-grid');C.mriSafety.forEach(x=>g.append(toggleButton(x[1],x[0],()=>player())));a.append(g);const selected=C.mriSafety.filter(x=>val(x[0])===1);if(selected.length){const r=el('div','result bad');r.append(el('strong','',`已選MRI安全／一般項目：${selected.map(x=>x[1]).join('、')}`));const t=el('textarea');t.placeholder='補充資料／待核實內容';t.value=val('mri_safety_detail')||'';t.oninput=()=>set('mri_safety_detail',t.value);r.append(t);a.append(r)}else a.append(el('div','result good','未申報MRI安全項目。'))}
function renderScreenResult(a){const s=screenScores(),r=el('div','summary');r.innerHTML=`<div class="result">身份：${val('pd_hc_status')||'未完成'}<br>${s.moca}<br>HADS：焦慮 ${s.hadsA}，抑鬱 ${s.hadsD}<br>SAS：${s.sas}<br>QUIP-RS：${s.quiprs}<br>RBDSQ：${s.rb}<br>MRI安全：${s.mri}</div><div class="result ${s.suggestion.includes('排除')?'bad':'good'}">系統建議：${s.suggestion}<br>${s.reasons.join('<br>')}</div>`;a.append(r);const g=el('div','direct');C.finalDecisions.forEach(x=>g.append(btn(x[1],()=>{set('final_screening_decision',x[0]);player()},val('final_screening_decision')===x[0]?'selected':'')));a.append(el('h3','','工作人員最終決定'),g);if(['HC','Apathy','Pure_PD'].includes(val('final_screening_decision')))renderMRIAdminFields(a);if(['OTHER_EXCLUDE','PENDING'].includes(val('final_screening_decision'))||val('final_screening_decision')&&val('final_screening_decision')!==s.code){const t=el('textarea');t.placeholder='請說明最終決定原因';t.value=val('final_screening_reason')||'';t.oninput=()=>set('final_screening_reason',t.value);a.append(t)}}
function renderMRIAdminFields(a){const w=el('div','plain-block');w.append(el('h3','','MRI行政安排'),el('p','hint','請記錄方便到校時間、接應及行動協助；通過篩查者才顯示。'));[['星期一','mon'],['星期二','tue'],['星期三','wed'],['星期四','thu'],['星期五','fri']].forEach(x=>{const r=el('div','form-grid');r.append(el('strong','',x[0]));const g=el('div','chips');g.append(toggleButton('上午','mri_avail_'+x[1]+'_am',()=>player()),toggleButton('下午','mri_avail_'+x[1]+'_pm',()=>player()));r.append(g);w.append(r)});const g=el('div','toggle-grid');[['需要入口接應','mri_need_pickup'],['有陪同人士','mri_has_companion'],['需要借用輪椅','mri_need_wheelchair'],['自備輪椅','mri_own_wheelchair'],['需要無障礙路線','mri_need_accessible_route']].forEach(x=>g.append(toggleButton(x[0],x[1],()=>player())));w.append(g);const st=el('div','direct');[['pending','待聯絡'],['coordinating','協調時段中'],['confirmed','已確認'],['reschedule','需要改期'],['hold','暫緩']].forEach(x=>st.append(btn(x[1],()=>{set('mri_admin_status',x[0]);player()},val('mri_admin_status')===x[0]?'selected':'')));w.append(el('h4','','MRI安排狀態'),st);w.append(toggleButton('開放第二階段問卷','stage2_released',()=>player()));a.append(w)}
function renderExamples(pg,a){a.append(el('p','instruction',(pg.placeholder||'例如：閱讀、園藝')+'。可以只寫一項，也可以寫多項，不限格式。'));const t=el('textarea');t.placeholder='請在此輸入一項或多項';t.value=val(pg.key)||'';t.oninput=()=>set(pg.key,t.value);t.onkeydown=e=>{if((e.key==='Enter'&&(e.ctrlKey||e.metaKey))&&validExamples(t.value))autoNext()};a.append(t)}
function labelledScale(title,key,labels,parent,onDone){const w=el('div','plain-block');w.append(el('strong','',title));const g=el('div','scale-buttons');labels.forEach((lab,n)=>{const value=n+1,b=btn('',()=>{set(key,value);if(onDone)onDone()},val(key)===value?'selected':'');b.append(el('strong','',String(value)),document.createTextNode(lab));g.append(b)});w.append(g);parent.append(w)}
function renderPDIPage(pg,a){a.append(el('p','instruction','未選題目代表「沒有」；如有此情況，請點選完整題幹。選中後在同一題下完成三個程度。'));B.pdi21.items.slice(pg.from,pg.to).forEach((x,idx)=>{const w=el('div','plain-block');w.append(toggleButton(`${String(pg.from+idx+1).padStart(2,'0')} ${x.fullLabel}`,x.yesField,()=>player()));if(val(x.yesField)===1){labelledScale('困擾程度',x.dimensions.distress.name,['沒有困擾','輕微困擾','中等困擾','相當困擾','非常困擾'],w);labelledScale('反覆想到',x.dimensions.preoccupation.name,['幾乎沒有想到','偶爾想到','有時想到','經常想到','一直在想'],w);labelledScale('確信程度',x.dimensions.conviction.name,['完全不相信','有點相信','半信半疑','相當相信','完全相信'],w)}a.append(w)});a.append(el('div','result',`PDI第${pg.page}/2頁；已選「有」：${B.pdi21.items.slice(pg.from,pg.to).filter(x=>val(x.yesField)===1).length}題`))}
function renderIORScenario(pg,a){a.append(el('p','context',pg.scenarioText));const n=String(pg.scenario).padStart(2,'0');labelledScale('這種想法多久出現一次？',`ior${n}_frequency`,['從不','很少','有時','經常','非常頻繁'],a);labelledScale('您有多相信這種想法？',`ior${n}_conviction`,['完全不相信','有點相信','半信半疑','相當相信','完全相信'],a);labelledScale('這種想法令您有多不安？',`ior${n}_distress`,['完全沒有不安','輕微不安','中等不安','相當不安','非常不安'],a,()=>{if(pageComplete(pg))autoNext()})}
function renderPDIYes(pg,a){a.append(el('p','instruction','未選代表「沒有」；如有此情況，直接點選下方題幹。'));const g=el('div','direct');g.append(btn('有此情況',()=>{set(pg.pdi.yesField,val(pg.pdi.yesField)===1?0:1);if(val(pg.pdi.yesField)===1)autoNext();else player()},val(pg.pdi.yesField)===1?'selected':''));a.append(g)}
function renderPDIDim(pg,a){if(val(pg.pdi.yesField)===0){a.append(el('div','result','此題已選「沒有」，三個程度分數自動記為0。'));return}const d=pg.pdi.dimensions[pg.dim];renderScale({options:d.options,key:d.name,item:1,total:1},a)}
function skipRemainingPDI(pdi){const pages=playerPages(),i=pages.findIndex((x,n)=>n>ST.step&&x.kind==='pdiYes');ST.step=i>=0?i:ST.step+1;ST.error='';saveDraft();player()}
function renderStage2Summary(a){const s=stage2Scores();a.innerHTML=`<div class="result">GAS總分：${s.gas}<br>AMI整體平均：${s.ami}<br>C-DARS總分：${s.cdars}<br>R-GPTS總分：${s.rgpts}<br>PDI Yes數：${s.pdi}<br>IOR總分：${s.ior}</div>`}
function pageComplete(pg){if(pg.kind==='pdiPage'){return B.pdi21.items.slice(pg.from,pg.to).every(x=>val(x.yesField)!==1||['distress','preoccupation','conviction'].every(k=>val(x.dimensions[k].name)!==null))}if(pg.kind==='iorScenario'){const n=String(pg.scenario).padStart(2,'0');return ['frequency','conviction','distress'].every(k=>val(`ior${n}_${k}`)!==null)}if(['quipShared','quipExtra','mriSafety','rbQ10'].includes(pg.kind))return true;if(pg.kind==='rbMain')return val(B.rbdsq.sourceField)!==null;if(pg.kind==='screenResult')return val('final_screening_decision')!==null&&(!['OTHER_EXCLUDE','PENDING'].includes(val('final_screening_decision'))||String(val('final_screening_reason')||'').trim());if(pg.kind==='pdiDim'&&val(pg.pdi.yesField)===0)return true;if(pg.kind==='pdiYes')return true;if(pg.kind==='education')return true;if(pg.kind==='dob')return !!val('date_of_birth');if(pg.kind==='positiveOne')return val(pg.key)!==null&&(!pg.conditional||val(pg.key)!==1||val(pg.conditional.key)!==null);if(pg.kind==='examples')return validExamples(val(pg.key));if(pg.kind==='moca')return val('moca_1_raw_total')!==null;return pg.key?val(pg.key)!==null&&val(pg.key)!=='':true}
function manualNext(pg,pages){applyDefaultAnswers(pg);if(pg.kind==='pdiYes'&&val(pg.pdi.yesField)!==1){Object.values(pg.pdi.dimensions).forEach(d=>set(d.name,0));return skipRemainingPDI(pg.pdi)}if(!pageComplete(pg)){ST.error='此題為必填，請先完成目前內容。';return player()}if(ST.step<pages.length-1){ST.step++;ST.error='';saveDraft();player()}else submitFormal()}
function applyDefaultAnswers(pg){if(pg.kind==='pdiPage')B.pdi21.items.slice(pg.from,pg.to).forEach(x=>{if(val(x.yesField)===null){set(x.yesField,0);Object.values(x.dimensions).forEach(d=>set(d.name,0))}});if(pg.kind==='quipShared')B.quip.domains.forEach(d=>{const k=`quip_${d.key}${pg.stem.index}_yes`;if(val(k)===null)set(k,0)});if(pg.kind==='quipExtra')pg.items.forEach(i=>{if(val(i.name)===null)set(i.name,0)});if(pg.kind==='rbMain')B.rbdsq.items.forEach(i=>{if(val(i.name)===null)set(i.name,0)});if(pg.kind==='rbQ10')B.rbdsq.diseaseItems.forEach(i=>{if(val(i.name)===null)set(i.name,0)});if(pg.kind==='mriSafety')C.mriSafety.forEach(x=>{if(val(x[0])===null)set(x[0],0)});if(pg.kind==='positiveOne'&&val(pg.key)===null)set(pg.key,0);if(pg.kind==='pdiYes'&&val(pg.pdi.yesField)===null)set(pg.pdi.yesField,0)}
function autoNext(){const pages=playerPages();if(ST.step<pages.length-1){ST.step++;ST.error='';saveDraft();setTimeout(player,180)}}
function submitFormal(){const pages=playerPages(),miss=pages.findIndex(x=>!pageComplete(x));if(miss>=0){ST.step=miss;ST.error='尚有必填內容未完成，已帶到第一個缺失位置。';return player()}const form=ST.flow==='stage2'?'screening':'screening',event=ST.flow==='stage2'?'stage_2_questionnaires':'screening_core';submitPayload(form,event,'submitted')}
function complete(arr){return arr.every(k=>val(k)!==null)}
function sum(arr){return arr.reduce((s,k)=>s+(Number(val(k))||0),0)}
function screenScores(){const raw=val('moca_1_raw_total'),cut=val('moca_1_16th_cutoff'),hA=sum([1,3,5,7,9,11,13].map(n=>`hads${String(n).padStart(2,'0')}_score`)),hD=sum([2,4,6,8,10,12,14].map(n=>`hads${String(n).padStart(2,'0')}_score`));const sas=sum(Array.from({length:14},(_,i)=>`sas${String(i+1).padStart(2,'0')}_score`));const qr=scoreQuipRS(),rb=scoreRB();const mriSel=C.mriSafety.filter(x=>val(x[0])===1);let suggestion='待決定',code='PENDING',reasons=[];if(val('pd_hc_status')==='HC'){suggestion='健康對照（HC）';code='HC'}else if(qr.hit.length){suggestion='ICD排除';code='ICD_EXCLUDE';reasons.push('QUIP-RS達到Cutoff：'+qr.hit.join('、'))}else if(cut!==null&&raw!==null&&raw<=cut){suggestion='認知排除候選';code='COGNITIVE_EXCLUDE';reasons.push('MoCA低於或等於第16百分位')}else if(hA>6||hD>9){suggestion='情緒排除／覆核候選';code='EMOTION_EXCLUDE';reasons.push('HADS達覆核標準')}else if(mriSel.length){suggestion='MRI安全排除／覆核候選';code='MRI_SAFETY_EXCLUDE';reasons.push('MRI安全有申報項目')}else if(sas>=14){suggestion='冷漠組（Apathy）';code='Apathy'}else if(complete(Array.from({length:14},(_,i)=>`sas${String(i+1).padStart(2,'0')}_score`))){suggestion='非冷漠PD組（Pure PD）';code='Pure_PD'}return{moca:raw===null?'MoCA未完成':`MoCA ${raw}/30；${cut===null?'需覆核':raw>cut?'高於第16百分位':'低於或等於第16百分位'}`,hadsA:hA,hadsD:hD,sas:`${sas}/42${sas>=14?'，達Cutoff':'，未達Cutoff'}`,quiprs:qr.complete?`${qr.hit.length?'達Cutoff：'+qr.hit.join('、'):'未達排除Cutoff'}`:'未完成',rb:`${rb.total}/13，${rb.note}`,mri:mriSel.length?`待核實：${mriSel.map(x=>x[1]).join('、')}`:'未申報風險',suggestion,code,reasons}}
function scoreQuipRS(){const domains=['a','b','c','d','e1','e2','f'],tot={};domains.forEach(d=>tot[d]=sum([1,2,3,4].map(n=>`quiprs_${d}_${n}_score`)));const completeAll=domains.every(d=>complete([1,2,3,4].map(n=>`quiprs_${d}_${n}_score`))),E=tot.e1+tot.e2,AD=tot.a+tot.b+tot.c+tot.d,hit=[];if(completeAll){if(tot.a>=6)hit.push('賭博');if(tot.b>=8)hit.push('B');if(tot.c>=8)hit.push('購物');if(tot.d>=7)hit.push('進食');if(E>=7)hit.push('任務／重複活動');if(AD>=10)hit.push('AD')}return{complete:completeAll,hit,tot,E,AD,AF:AD+E+tot.f}}
function scoreRB(){const keys=B.rbdsq.items.map(x=>x.name),base=sum(keys),q10=B.rbdsq.diseaseItems.some(x=>val(x.name)===1)?1:0,total=base+q10,id=val('pd_hc_status'),cut=id==='PD'?6:id==='HC'?5:null;return{total,note:cut===null?'Cutoff待身份':`${total>=cut?'達到':'未達'}Cutoff ${cut}`}}
function stage2Scores(){return{gas:sum(B.gas.items.map(x=>x.name)),ami:(sum(B.ami18.items.map(x=>x.name))/18).toFixed(2),cdars:sum(B.cdars.items.map(x=>x.name)),rgpts:sum(B.rgpts.items.map(x=>x.name)),pdi:B.pdi21.items.filter(x=>val(x.yesField)===1).length,ior:sum(B.ior.items.map(x=>x.name))}}
function backfill(){const m=el('main','backfill');ROOT.innerHTML='';ROOT.append(el('div','topline'),m);m.append(toolbar('歷史資料補錄'));m.append(identityStrip());const nav=el('nav','backfill-nav');const sections=[];function sec(id,title){const s=el('section','bf-section');s.id='bf-'+id;s.append(el('h2','',title));m.append(s);sections.push([id,title]);return s}
 const id=sec('identity','Participant身份及基本資料');id.append(fieldText('P_ID','p_id','例：P140'),fieldText('S_ID（如紙本有）','s_id','例：S082'),fieldText('姓名','participant_name',''),fieldText('香港身份證頭四個字','hkid_prefix4',''));addBFDate(id,'出生日期','date_of_birth');addBFChoices(id,'性別','gender',[['M','M'],['F','F']]);addBFChoices(id,'PD／HC身份','pd_hc_status',C.identities);id.append(fieldText('聯絡電話','contact_phone',''),fieldText('實際教育年數','education_years','年','number'));
 const mo=sec('moca','MoCA');addBFNumber(mo,'MoCA原始總分','moca_1_raw_total',0,30);const age=calcAge(),edu=Number(val('education_years')),raw=val('moca_1_raw_total');if(age!==null&&Number.isFinite(edu)&&raw!==null){const cut=mocaCutoff(age,edu),adj=edu<=12?1:0;mo.append(el('div','result',`教育調整：+${adj}；調整後：${Math.min(30,+raw+adj)}/30；第16百分位Cutoff：${cut===null?'需覆核':cut}；結果：${cut===null?'待覆核':raw>cut?'高於':'低於或等於'}第16百分位`))}addBFCheckbox(mo,'紙本另有第二次MoCA','has_moca_2');if(val('has_moca_2')===1)addBFNumber(mo,'第二次MoCA原始總分','moca_2_raw_total',0,30);
 addBFScale(sec('hads','HADS'),B.hads.items,0,3);renderQuipBF(sec('quip','QUIP'));renderQuipRsBF(sec('quiprs','QUIP-RS'));addBFScale(sec('sas','SAS'),B.sas.items,0,3);
 renderRBBF(sec('rbdsq','RBDSQ'));renderMRIBF(sec('mris','MRI安全'));
 addBFScale(sec('gas','GAS'),B.gas.items,0,3);addBFScale(sec('ami','AMI-18'),B.ami18.items,0,4);const cd=sec('cdars','C-DARS');renderCdarsBF(cd);addBFScale(sec('rgpts','R-GPTS'),B.rgpts.items,0,4);renderPDIBF(sec('pdi','PDI-21'));renderIORBF(sec('ior','IOR'));
 const mv=sec('mri','MRI到訪資料');addBFDate(mv,'MRI日期','mri_date');addBFNumber(mv,'Visit Number','visit_number',1,2);addBFChoices(mv,'MRI當日狀態','med_on_off',[['ON','ON'],['OFF','OFF']]);addBFNumber(mv,'距上次服用PD藥物','last_pd_med_minutes',0,9999,'分鐘');addBFNumber(mv,'MID反應時間','mid_res_time_ms',0,999999,'毫秒');addBFCheckbox(mv,'CGT已完成','cgt_done');addBFNumber(mv,'Digit Span Forward','digit_span_forward',0,99);addBFNumber(mv,'Digit Span Backward','digit_span_backward',0,99);mv.append(el('div','result',`Digit Span Total：${(Number(val('digit_span_forward'))||0)+(Number(val('digit_span_backward'))||0)}`));
 renderSequenceBF(sec('sequence','MRI Sequence'));renderClinicalBF(sec('clinical','UPDRS／HY'));renderMedicationBF(sec('meds','Medication／LEDD'));
 const pay=sec('payment','Payment／Receipt');addBFCheckbox(pay,'已付款','payment_status');addBFCheckbox(pay,'Receipt已處理','receipt_status');const rem=sec('remark','紙本補錄備註');const ta=el('textarea');ta.placeholder='缺頁、字跡不清、多個答案、未提供資料或其他資料品質問題';ta.value=val('historical_reentry_remark')||'';ta.oninput=()=>set('historical_reentry_remark',ta.value);rem.append(ta);
 sections.forEach(x=>nav.append(btn(x[1],()=>document.getElementById('bf-'+x[0]).scrollIntoView({behavior:'smooth'}))));m.insertBefore(nav,m.children[2]);const sb=el('div','submitbar');sb.append(btn('下載本地JSON',downloadCurrent,'linkbtn'),btn('保存歷史資料補錄',()=>submitPayload('backfill','historical_paper_reentry','partial'),'primary'));m.append(sb)}
function addBFDate(parent,label,key){const w=el('div','field');w.append(el('label','',label));const row=el('div','date-row');[['d','DD',2],['m','MM',2],['y','YYYY',4]].forEach((x,n)=>{const i=el('input','digits');i.inputMode='numeric';i.maxLength=x[2];i.placeholder=x[1];const old=String(val(key)||'').split('-');i.value=n===0?(old[2]||''):n===1?(old[1]||''):(old[0]||'');i.oninput=()=>{i.value=i.value.replace(/\D/g,'').slice(0,x[2]);if(i.value.length===x[2]&&n<2)qa('input',row)[n+1].focus();const ar=qa('input',row);if(ar.every(z=>z.value.length===+z.maxLength)){const d=+ar[0].value,m=+ar[1].value,y=+ar[2].value,dt=new Date(y,m-1,d);if(dt.getFullYear()===y&&dt.getMonth()===m-1&&dt.getDate()===d)set(key,`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`)}};row.append(i)});w.append(row);parent.append(w)}
function addBFChoices(parent,label,key,options){const w=el('div','field');w.append(el('div','label',label));const g=el('div','direct');options.forEach(o=>g.append(btn(o[1],()=>{set(key,o[0]);backfill()},val(key)===o[0]?'selected':'')));w.append(g);parent.append(w)}
function addBFCheckbox(parent,label,key){parent.append(toggleButton(label,key,()=>backfill()))}
function addBFNumber(parent,label,key,min,max,unit=''){const r=el('div','bf-row');r.append(el('span','',label));const i=el('input');i.inputMode='numeric';i.placeholder=unit||`${min}–${max}`;i.value=val(key)??'';i.onkeydown=e=>{if(max<=5&&/^\d$/.test(e.key)){e.preventDefault();const n=Number(e.key);if(n<min||n>max)return;set(key,n);i.value=String(n);focusNextInput(i)}};i.oninput=()=>{let raw=i.value.replace(/[^0-9.]/g,'');if(max<=5)raw=raw.slice(-1);i.value=raw;const n=raw===''?null:Number(raw);if(n===null||(Number.isFinite(n)&&n>=min&&n<=max)){set(key,n);if(raw!==''&&max>5){} }else{i.value='';set(key,null)}};i.onkeydown=((orig)=>e=>{if(e.key==='Enter'&&i.value!==''){e.preventDefault();focusNextInput(i);return}orig(e)})(i.onkeydown);r.append(i);parent.append(r)}
function focusNextInput(i){const all=qa('input,textarea',i.closest('.bf-section')||document);const ix=all.indexOf(i);all[ix+1]?.focus()}
function addBFScale(parent,items,min,max){const meanings=max===3?'0＝最低／否定端　1＝較低　2＝較高　3＝最高／肯定端':max===4?'0＝沒有／從不　1＝很少／輕微　2＝有時／中等　3＝經常／高度　4＝非常頻繁／極度':'1＝最低　2＝較低　3＝中等　4＝較高　5＝最高';const p=el('p','hint',`分數對照：${meanings}。輸入合法單一數字後自動移到下一格。`);parent.append(p);items.forEach(x=>addBFNumber(parent,x.backfillLabel||x.fullLabel,x.name||x.responseName,min,max))}
function renderQuipBF(s){B.quip.sharedStems.forEach(st=>{const w=el('div','compact-check');w.append(el('strong','',st.shortLabel+'：'));B.quip.domains.forEach(d=>w.append(toggleButton(d.fullLabel==='B'?'B':d.fullLabel,`quip_${d.key}${st.index}_yes`,()=>backfill())));s.append(w)});const fs=el('div','plain-block');fs.append(el('strong','','柏金遜症藥物使用'));B.quip.additionalItems.filter(x=>x.code.startsWith('F')).forEach(x=>fs.append(toggleButton(x.backfillLabel.replace(/^F\d\s*/,''),x.name,()=>backfill())));s.append(fs);const es=el('div','plain-block');es.append(el('strong','','其他重複或過度行為'));B.quip.additionalItems.filter(x=>x.code.startsWith('E')).forEach(x=>{es.append(toggleButton(x.backfillLabel.replace(/^E\d\s*/,''),x.name,()=>backfill()));if(x.detailField&&val(x.name)===1){const t=el('textarea','conditional');t.placeholder='具體描述';t.value=val(x.detailField)||'';t.oninput=()=>set(x.detailField,t.value);es.append(t)}});s.append(es)}
function renderQuipRsBF(s){s.append(el('p','hint','0＝從不　1＝極少　2＝有時　3＝經常　4＝非常頻繁'));B.quiprs.stems.forEach(st=>{const block=el('div','plain-block');block.append(el('strong','',st.fullText));B.quiprs.domains.forEach(d=>{const cell=B.quiprs.matrixCells.find(x=>x.stemIndex===st.index&&x.domain===d.key.toUpperCase());if(cell)addBFNumber(block,d.fullLabel==='B'?'B':d.fullLabel,cell.name,0,4)});s.append(block)})}
function renderCdarsBF(s){B.cdars.domains.forEach(d=>{const block=el('div','plain-block');block.append(el('h3','',d.title),el('p','hint',d.examplePrompt+' '+d.examplePlaceholder));block.append(fieldText('本人例子',d.examplesField,'請輸入紙本所載例子'));addBFScale(block,B.cdars.items.filter(x=>x.domain===d.key),0,4);const ks=B.cdars.items.filter(x=>x.domain===d.key).map(x=>x.name),ok=ks.every(k=>val(k)!==null);block.append(el('div','result',`${d.title}：${ok?sum(ks):'部分完成／暫不計分'}`));s.append(block)})}
function renderRBBF(s){addBFChoices(s,'資料提供者',B.rbdsq.sourceField,B.rbdsq.sourceOptions.map(o=>[o.value,o.label]));const g=el('div','toggle-grid');B.rbdsq.items.forEach(x=>g.append(toggleButton(x.fullLabel,x.name,()=>backfill())));s.append(g,el('h3','','第10題疾病／情況'));const q10=el('div','toggle-grid');B.rbdsq.diseaseItems.forEach(x=>q10.append(toggleButton(x.fullLabel,x.name,()=>backfill())));s.append(q10,el('div','result',`RBDSQ總分：${scoreRB().total}/13`))}
function renderMRIBF(s){s.append(el('p','hint','未選項目代表沒有／否；只點選存在的項目。'));const g=el('div','toggle-grid');C.mriSafety.forEach(x=>g.append(toggleButton(x[1],x[0],()=>backfill())));s.append(g);if(C.mriSafety.some(x=>val(x[0])===1)){const t=el('textarea');t.placeholder='MRI安全補充資料／待核實內容';t.value=val('mri_safety_detail')||'';t.oninput=()=>set('mri_safety_detail',t.value);s.append(t)}}
function renderPDIBF(s){B.pdi21.items.forEach((x,n)=>{const r=el('div','bf-pdi');r.append(toggleButton(`${String(n+1).padStart(2,'0')} ${x.fullLabel}`,x.yesField,()=>backfill()));['distress','preoccupation','conviction'].forEach(k=>{const i=el('input');i.inputMode='numeric';i.placeholder=k==='distress'?'困擾':k==='preoccupation'?'反覆':'確信';i.disabled=val(x.yesField)!==1;i.value=val(x.dimensions[k].name)??'';i.oninput=()=>set(x.dimensions[k].name,i.value===''?null:Number(i.value));r.append(i)});s.append(r)})}
function renderIORBF(s){B.ior.scenarios.forEach((sc,n)=>{const r=el('div','bf-pdi');r.append(el('span','',`${n+1}. ${sc}`));['frequency','conviction','distress'].forEach(k=>{const i=el('input');i.inputMode='numeric';i.placeholder=k==='frequency'?'頻率':k==='conviction'?'相信':'不安';i.value=val(`ior${String(n+1).padStart(2,'0')}_${k}`)??'';i.oninput=()=>set(`ior${String(n+1).padStart(2,'0')}_${k}`,i.value===''?null:Number(i.value));r.append(i)});s.append(r)})}
function renderSequenceBF(s){s.append(el('p','hint','預設完成；只點選沒有完成的序列。'));const g=el('div','chips');B.sequences.items.forEach(x=>g.append(btn(x.label,()=>{set(x.field,val(x.field)===0?1:0);backfill()},'toggle danger'+(val(x.field)===0?' selected':''))));s.append(g);if(B.sequences.items.some(x=>val(x.field)===0)){const t=el('textarea');t.placeholder='未完成原因／整體備註';t.value=val('mri_sequence_general_remark')||'';t.oninput=()=>set('mri_sequence_general_remark',t.value);s.append(t)}}
function renderClinicalBF(s){addBFNumber(s,'核實PD病程','pd_duration_verified_years',0,80,'年');const items=B.clinical.updrs3.items||[];addBFScale(s,items,0,4);addBFNumber(s,'UPDRS 1.5','updrs_item_1_5',0,4);addBFNumber(s,'Hoehn & Yahr','hy_stage',0,5)}
function renderMedicationBF(s){s.append(btn('＋新增藥物',()=>{ST.meds.push({name:'',strength:'',times:'',units:''});saveDraft();backfill()},'primary'));renderMedicationRows(s);if(ST.meds.length){addBFNumber(s,'Total LEDD','total_ledd_mg',0,99999,'mg');addBFNumber(s,'DA LEDD','da_ledd_mg',0,99999,'mg');addBFNumber(s,'Levodopa LEDD','levodopa_ledd_mg',0,99999,'mg')}}
function renderMedicationRows(s){ST.meds.forEach((m,n)=>{const r=el('div','med-row');[['name','藥物名稱'],['strength','規格／強度'],['times','每日次數'],['units','每次數量']].forEach(x=>{const i=el('input','text');i.placeholder=x[1];i.value=m[x[0]]||'';i.oninput=()=>{m[x[0]]=i.value;saveDraft()};r.append(i)});r.append(btn('刪除',()=>{ST.meds.splice(n,1);saveDraft();ST.flow==='backfill'?backfill():renderClinical()},'linkbtn'));s.append(r)})}
function renderMRIAdmin(){const m=appShell();m.append(toolbar('MRI Admin／工作進度'),identityStrip());const s=el('section','summary');s.append(el('h2','section-title','通過篩查後的流程控制'));s.append(el('div','result',`P_ID：${val('p_id')}<br>篩查決定：${val('final_screening_decision')||'由首次篩查資料載入'}<br>Stage 2：${val('stage2_released')===1?'已開放':'尚未開放'}<br>S_ID：${val('s_id')||'尚未分配'}`));const actions=el('div','direct');actions.append(btn('開放第二階段問卷',()=>{set('stage2_released',1);renderMRIAdmin()},val('stage2_released')===1?'selected':''),btn('複製Participant連結',()=>navigator.clipboard?.writeText(location.origin+location.pathname+'?stage2='+val('p_id'))),btn('確認MRI安排並分配S_ID',()=>{if(!val('s_id'))set('s_id','S'+String(Math.floor(Math.random()*900)+100));renderMRIAdmin()},val('s_id')?'selected':''),btn('進入MRI到訪',()=>{ST.flow='mri_visit';renderMRIVisit()}),btn('進入PD臨床資料',()=>{ST.flow='clinical';renderClinical()}));s.append(actions);const sb=el('div','submitbar');sb.append(btn('提交MRI Admin更新',()=>submitPayload('mri','mri_admin','submitted'),'primary'));s.append(sb);m.append(s)}
function renderMRIVisit(){const m=appShell();m.append(toolbar('MRI到訪記錄'),identityStrip());const s=el('section','summary');s.append(el('h2','section-title','MRI到訪資料'));
 addStaffChoices(s,'Visit number','visit_number',[[1,'第一次MRI'],[2,'第二次MRI']]);
 const latest=val('moca_1_raw_total'),need=val('moca_repeat_required')===1;if(need||latest===null){addBFNumber(s,'MRI前MoCA總分','moca_2_raw_total',0,30)}else s.append(el('div','result good','最新有效MoCA仍在有效期內。'));
 addStaffChoices(s,'與首次MRI安全相比','mri_safety_changed_since_initial',[[0,'沒有變化'],[1,'有變化']]);if(val('mri_safety_changed_since_initial')===1){const g=el('div','toggle-grid');C.mriSafety.forEach(x=>g.append(toggleButton(x[1],'change_'+x[0],()=>renderMRIVisit())));s.append(g);const t=el('textarea');t.placeholder='請說明MRI安全變化內容';t.value=val('mri_safety_change_detail')||'';t.oninput=()=>set('mri_safety_change_detail',t.value);s.append(t)}
 if(val('pd_hc_status')!=='HC'){addStaffChoices(s,'MRI當日PD藥物狀態','med_on_off',[['ON','ON'],['OFF','OFF']]);addStaffNumber(s,'距上次服用PD藥物','last_pd_med_minutes','分鐘')}
 s.append(el('h3','','MID'));addStaffNumber(s,'MID反應時間','mid_res_time_ms','毫秒');if(val('mid_res_time_ms')!==null)set('mid_complete',1);s.append(el('h3','','CGT'));addStaffCheckbox(s,'CGT已完成','cgt_done');
 s.append(el('h3','','Digit Span'));addStaffNumber(s,'Forward','digit_span_forward','');addStaffNumber(s,'Backward','digit_span_backward','');s.append(el('div','result',`Total：${(Number(val('digit_span_forward'))||0)+(Number(val('digit_span_backward'))||0)}`));
 s.append(el('h3','','MRI Sequence'),el('p','hint','預設完成；只點選沒有完成的Sequence。'));const sg=el('div','chips');B.sequences.items.forEach(x=>sg.append(btn(x.label,()=>{set(x.field,val(x.field)===0?1:0);renderMRIVisit()},'toggle danger'+(val(x.field)===0?' selected':''))));s.append(sg);const incomplete=B.sequences.items.filter(x=>val(x.field)===0);if(incomplete.length){const t=el('textarea');t.placeholder='請一次說明未完成序列及原因';t.value=val('mri_sequence_general_remark')||'';t.oninput=()=>set('mri_sequence_general_remark',t.value);s.append(t)}s.append(el('div','result',`Sequence完成：${14-incomplete.length}/14${incomplete.length?'；未完成：'+incomplete.map(x=>x.label).join('、'):''}`));
 s.append(el('h3','','付款及Receipt'));addStaffCheckbox(s,'已付款','payment_status');addStaffCheckbox(s,'Receipt已處理','receipt_status');const sb=el('div','submitbar');sb.append(btn('正式提交MRI到訪',()=>validateMRIVisit(s),'primary'));s.append(sb);m.append(s)}
function addStaffChoices(s,label,key,opts){const f=el('div','field');f.append(el('div','label',label));const g=el('div','direct');opts.forEach(o=>g.append(btn(o[1],()=>{set(key,o[0]);renderByFlow()},val(key)===o[0]?'selected':'')));f.append(g);s.append(f)}
function addStaffNumber(s,label,key,unit){const f=el('div','field');f.append(el('label','',label));const i=el('input','text');i.type='number';i.value=val(key)??'';i.oninput=()=>set(key,i.value===''?null:Number(i.value));f.append(i,document.createTextNode(unit?' '+unit:''));s.append(f)}
function addStaffCheckbox(s,label,key){s.append(toggleButton(label,key,()=>renderByFlow()))}
function renderByFlow(){if(ST.flow==='mri_visit')renderMRIVisit();else if(ST.flow==='clinical')renderClinical();else if(ST.flow==='mri_admin')renderMRIAdmin();else backfill()}
function validateMRIVisit(s){const missing=[];if(val('visit_number')===null)missing.push('Visit number');if(val('mri_safety_changed_since_initial')===null)missing.push('MRI安全變化');if(val('mri_safety_changed_since_initial')===1&&!String(val('mri_safety_change_detail')||'').trim())missing.push('MRI安全變化內容');if(val('pd_hc_status')!=='HC'&&val('med_on_off')===null)missing.push('ON／OFF');if(incompleteSequences()&&!String(val('mri_sequence_general_remark')||'').trim())missing.push('Sequence未完成原因');if(missing.length){showInlineError(s,'尚未完成：'+missing.join('、'));return}set('digit_span_total',(Number(val('digit_span_forward'))||0)+(Number(val('digit_span_backward'))||0));set('mri_date',new Date().toISOString().slice(0,10));submitPayload('mri','mri_scan','submitted')}
function incompleteSequences(){return B.sequences.items.some(x=>val(x.field)===0)}
function renderClinical(){const m=appShell();m.append(toolbar('PD臨床資料'),identityStrip());const s=el('section','summary');s.append(el('h2','section-title','PD臨床資料'));addStaffNumber(s,'核實PD病程','pd_duration_verified_years','年');addStaffChoices(s,'UPDRS Part III資料路徑','updrs3_route',[['hospital_total_only','醫院只提供總分'],['hospital_items','醫院提供小分'],['research_assessed','研究團隊施測'],['pending_hospital','待醫院提供'],['not_applicable','不適用']]);
 if(val('updrs3_route')==='hospital_total_only')addStaffNumber(s,'UPDRS Part III總分','updrs3_reported_total','/132');if(['hospital_items','research_assessed'].includes(val('updrs3_route'))){s.append(el('h3','','UPDRS Part III 33項'));renderUPDRSItems(s,val('updrs3_route')==='research_assessed')}
 if(val('updrs3_route')==='research_assessed'){addStaffCheckbox(s,'正接受PD藥物治療','updrs3a_pd_treatment');if(val('updrs3a_pd_treatment')===1)addStaffChoices(s,'臨床狀態','updrs3b_clinical_state',[['ON','ON／來電'],['OFF','OFF／停電']]);addStaffCheckbox(s,'有服用Levodopa','updrs3c_levodopa');if(val('updrs3c_levodopa')===1)addStaffNumber(s,'距最後服用Levodopa','updrs3c1_last_levodopa_minutes','分鐘');addStaffCheckbox(s,'檢查期間出現異動症','updrs3_dyskinesia_present');if(val('updrs3_dyskinesia_present')===1)addStaffCheckbox(s,'異動症干擾動作功能檢查','updrs3_dyskinesia_interference')}
 addStaffChoices(s,'UPDRS 1.5資料路徑','updrs15_route',[['hospital_total_only','醫院提供'],['research_assessed','研究團隊施測'],['pending_hospital','待醫院提供'],['not_applicable','不適用']]);if(['hospital_total_only','research_assessed'].includes(val('updrs15_route'))){s.append(el('h3','','UPDRS 1.5 冷漠感'));renderAnchorChoices(s,'updrs_item_1_5',B.clinical.updrs15.text.options)}
 addStaffChoices(s,'Hoehn & Yahr資料路徑','hy_route',[['hospital_total_only','醫院提供'],['research_assessed','研究團隊評估'],['pending_hospital','待醫院提供'],['not_applicable','不適用']]);if(['hospital_total_only','research_assessed'].includes(val('hy_route'))){s.append(el('h3','','Hoehn & Yahr'));renderAnchorChoices(s,'hy_stage',B.clinical.hy.text.options)}
 s.append(el('h3','','Medication'),btn('＋新增藥物',()=>{ST.meds.push({name:'',strength:'',times:'',units:''});saveDraft();renderClinical()},'primary'));renderMedicationRows(s);renderLeddPanel(s);if(!ST.meds.length)s.append(el('div','result','尚未加入藥物；LEDD暫不可計算。'));
 const total=updrsTotal();s.append(el('div','result',`UPDRS完成：${total.count}/33${total.count===33?'；總分：'+total.total:'/132'}`));const sb=el('div','submitbar');sb.append(btn('正式提交Clinical資料',()=>validateClinical(s),'primary'));s.append(sb);m.append(s)}
function renderUPDRSItems(s,withCue){(B.clinical.updrs3.items||[]).forEach(x=>{const w=el('div','clinical-anchor');w.append(el('strong','',x.fullLabel||x.name));if(withCue&&x.instruction)w.append(el('p','hint',x.instruction));const g=el('div',withCue?'options':'direct');(x.options||[0,1,2,3,4].map(v=>({value:v,label:String(v)}))).forEach(o=>g.append(btn((withCue?`${o.value}　${o.label}`:String(o.value)),()=>{set(x.name,o.value);renderClinical()},(withCue?'choice':'')+(val(x.name)===o.value?' selected':''))));w.append(g);s.append(w)})}
function renderAnchorChoices(s,key,opts){const g=el('div','options');opts.forEach(o=>g.append(btn(`${o.value}　${o.label}`,()=>{set(key,o.value);renderClinical()},'choice'+(val(key)===o.value?' selected':''))));s.append(g)}
function updrsTotal(){const ks=(B.clinical.updrs3.items||[]).map(x=>x.name),present=ks.filter(k=>val(k)!==null);return{count:present.length,total:present.reduce((a,k)=>a+Number(val(k)),0)}}
function validateClinical(s){const missing=[];if(!val('updrs3_route'))missing.push('UPDRS Part III路徑');if(val('updrs3_route')==='hospital_total_only'&&val('updrs3_reported_total')===null)missing.push('UPDRS總分');if(['hospital_items','research_assessed'].includes(val('updrs3_route'))&&updrsTotal().count<33)missing.push('UPDRS 33項');if(ST.meds.some(m=>!m.name||!m.strength||!m.times||!m.units))missing.push('藥物資料');if(missing.length){showInlineError(s,'尚未完成：'+missing.join('、'));return}const t=updrsTotal();if(t.count===33){set('updrs3_calculated_total',t.total);set('updrs3_total',t.total)}ST.meds.forEach((m,n)=>{const k=String(n+1).padStart(2,'0');set(`medication_${k}_name`,m.name);set(`medication_${k}_strength`,m.strength);set(`medication_${k}_times_per_day`,Number(m.times));set(`medication_${k}_units_per_time`,Number(m.units))});submitPayload('clinical','clinical_supplement','submitted')}
function showInlineError(s,msg){let e=el('div','error',msg);s.prepend(e);e.scrollIntoView({behavior:'smooth',block:'center'})}
function workflowKeys(flow){const map={stage2:['gas','ami','cdars','rgpts','pdi','ior'],screening:['participant','hkid','date_of_birth','gender','contact','recruitment','education','pd_status','moca','hads','sas','quip','rbdsq','mri_safety','final_screening'],mri_visit:['p_id','s_id','visit','mri','med_on_off','last_pd_med','mid','cgt','digit_span','payment','receipt'],clinical:['p_id','pd_duration','updrs','hy','medication','ledd']};const patterns=map[flow]||null;return Object.keys(ST.answers).filter(k=>!patterns||patterns.some(p=>k.includes(p)))}
function payload(form,event,status){const data={schema_version:'frontend-6.0',submission_id:ST.submission,form_type:form,event_type:event,record_status:status,p_id:val('p_id'),s_id:val('s_id'),visit_number:val('visit_number'),submitted_at:new Date().toISOString(),data_source:form==='backfill'?'historical_paper_reentry':'staff_or_participant_entry'};const keys=form==='backfill'?Object.keys(ST.answers):workflowKeys(ST.flow);keys.forEach(k=>data[k]=ST.answers[k]===undefined?null:ST.answers[k]);data.payload_json=JSON.stringify(data);return data}
function canonicalHeaders(){const set=new Set(['schema_version','submission_id','form_type','event_type','record_status','p_id','s_id','visit_number','submitted_at','data_source']);const walk=o=>{if(!o||typeof o!=='object')return;if(Array.isArray(o)){o.forEach(walk);return}Object.entries(o).forEach(([k,v])=>{if(['name','responseName','yesField','detailField','field','examplesField'].includes(k)&&typeof v==='string')set.add(v);walk(v)})};walk(B);Object.keys(ST.answers).forEach(k=>set.add(k));for(let i=1;i<=6;i++){const n=String(i).padStart(2,'0');['name','strength','times_per_day','units_per_time'].forEach(x=>set.add(`medication_${n}_${x}`))}set.add('payload_json');return Array.from(set)}
function downloadCurrent(){const form=ST.flow==='clinical'?'clinical':ST.flow==='mri_visit'?'mri':ST.flow==='backfill'?'backfill':'screening';const p=payload(form,ST.flow==='backfill'?'historical_paper_reentry':ST.flow,'draft');const headers=canonicalHeaders();const data={};headers.forEach(k=>data[k]=Object.prototype.hasOwnProperty.call(p,k)?p[k]:null);data.payload_json=JSON.stringify(data);downloadObj({metadata:{workflow:ST.flow,downloaded_at:new Date().toISOString(),question_bank_version:B.version,header_count:headers.length},headers,data},`${ST.flow||'apathy'}_${val('p_id')||'draft'}`)}
function downloadObj(o,name){const blob=new Blob([JSON.stringify(o,null,2)],{type:'application/json'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=`${name}_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;a.click();URL.revokeObjectURL(u)}
async function submitPayload(form,event,status){if(ST.submitting)return;const p=payload(form,event,status);ST.submitting=true;const modal=el('div','modal'),box=el('div','modal-box submit-wait'),title=el('h2','','正在提交資料……'),msg=el('p','','請不要重新整理、關閉頁面或返回上一頁。一般約需15秒，請等待伺服器確認。'),timer=el('div','status','已等待0秒');box.append(title,msg,timer);modal.append(box);document.body.append(modal);let sec=0;const tick=setInterval(()=>{sec++;timer.textContent=`已等待${sec}秒${sec>15?'；仍在等待伺服器回應，請不要重新整理。':''}`},1000);try{const res=await fetch(C.receiverUrl,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(p)});const text=await res.text();let out;try{out=JSON.parse(text)}catch(e){out={ok:res.ok,message:text}}if(!res.ok||out.ok===false)throw new Error(out.message||'後端未確認收到資料');clearInterval(tick);box.innerHTML='';box.append(el('h2','','提交成功'),el('p','',`Submission ID：${ST.submission}`),btn('返回',()=>{modal.remove();ST.submission=uuid();saveDraft();if(form==='screening'&&event==='screening_core'&&['HC','Apathy','Pure_PD'].includes(val('final_screening_decision')))player()},'primary'))}catch(e){clearInterval(tick);box.innerHTML='';box.append(el('h2','','提交未完成'),el('p','',`資料仍保存在此裝置。${e.message}`));const a=el('div','submitbar');a.append(btn('下載本地JSON',downloadCurrent,'linkbtn'),btn('返回修改',()=>modal.remove(),'primary'));box.append(a)}finally{ST.submitting=false}}

/* ===== Consolidated post-v9 implementation layer ===== */
const APP_BUILD='10.0-file-by-file';
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

  const rbKeys=B.rbdsq.items.map(x=>x.name),rbDisease=B.rbdsq.diseaseItems.map(x=>x.name),rbComplete=completeKeys(rbKeys.concat(rbDisease));
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

/* Fixed pages: no duplicate current-section dropdown; screening result appears only after scale completion. */
function screeningPages(){
  const p=[];
  p.push(choicePage('身分及基本資料','Participant類型','participant_series',C.participantTypes));
  p.push(inputPage('身分及基本資料','姓名','participant_name','例：CHAN TAI MAN 陳大文'));
  p.push(inputPage('身分及基本資料','香港身份證頭四個字','hkid_prefix4','例：A123'));
  p.push({section:'身分及基本資料',kind:'dob',label:'出生日期'});
  p.push(choicePage('身分及基本資料','性別','gender',[['M','M'],['F','F']]));
  p.push(choicePage('身分及基本資料','已確認研究身份','pd_hc_status',C.identities));
  p.push(inputPage('身分及基本資料','聯絡電話','contact_phone','例：9123 4567'));
  p.push(choicePage('身分及基本資料','招募來源','recruitment_source_code',C.recruitment));
  p.push(choicePage('身分及基本資料','教育程度','education_level',C.education.map(x=>[x[0],x[1],x[2]])));
  p.push({section:'身分及基本資料',kind:'positiveOne',label:'Participant自述PD狀態',key:'pd_status_self_report',button:'有PD',conditional:{key:'pd_duration_years_self_report',label:'自述PD病程',unit:'年'}});
  p.push({section:'MoCA',kind:'moca',label:'MoCA原始總分'});
  addScalePages(p,'HADS',B.hads.items);p.push({section:'HADS',kind:'scaleResult',scale:'HADS',label:'HADS結果'});
  p.push({section:'QUIP',kind:'quipGroup',group:0,label:'QUIP第1／3組：相關行為'});
  p.push({section:'QUIP',kind:'quipGroup',group:1,label:'QUIP第2／3組：柏金遜症藥物使用'});
  p.push({section:'QUIP',kind:'quipGroup',group:2,label:'QUIP第3／3組：其他重複或過度行為'});
  p.push({section:'QUIP',kind:'scaleResult',scale:'QUIP',label:'QUIP結果'});
  p.push({section:'QUIP-RS',kind:'quipRsMatrix',label:'QUIP-RS'});
  p.push({section:'QUIP-RS',kind:'scaleResult',scale:'QUIP-RS',label:'QUIP-RS結果'});
  addScalePages(p,'SAS',B.sas.items.map((x,n)=>({name:x.name,fullLabel:x.fullLabel,options:x.responseOptions.map((o,j)=>({label:o.label,value:B.sas.scoring.displayOrderByItem[n+1][j]}))})));
  p.push({section:'SAS',kind:'scaleResult',scale:'SAS',label:'SAS結果'});
  p.push({section:'RBDSQ',kind:'rbMain',label:'RBDSQ主問卷'});p.push({section:'RBDSQ',kind:'rbQ10',label:B.rbdsq.diseaseQuestion});p.push({section:'RBDSQ',kind:'scaleResult',scale:'RBDSQ',label:'RBDSQ結果'});
  p.push({section:'MRI安全',kind:'mriSafety',label:'MRI安全'});
  p.push({section:'篩查結果',kind:'screenResult',label:'首次篩查結果及最終決定'});return p
}

function renderPage(pg,a){
  if(pg.kind==='quipGroup')return renderQuipGroup(pg,a);
  if(pg.kind==='quipRsMatrix')return renderQuipRsMatrix(a);
  if(pg.kind==='scaleResult')return renderScaleCompletion(pg,a);
  if(pg.kind==='choice')renderChoice(pg,a);else if(pg.kind==='input')renderInput(pg,a);else if(pg.kind==='dob')renderDOB(a);else if(pg.kind==='positiveOne')renderPositiveOne(pg,a);else if(pg.kind==='scale')renderScale(pg,a);else if(pg.kind==='moca')renderMoca(a);else if(pg.kind==='rbMain')renderRBMain(a);else if(pg.kind==='rbQ10')renderRBQ10(a);else if(pg.kind==='mriSafety')renderMRISafety(a);else if(pg.kind==='screenResult')renderScreenResult(a);else if(pg.kind==='examples')renderExamples(pg,a);else if(pg.kind==='pdiPage')renderPDIPage(pg,a);else if(pg.kind==='iorScenario')renderIORScenario(pg,a);else if(pg.kind==='stage2Summary')renderStage2Summary(a)
}

function player(){
  calculateAllDerived();const pages=playerPages();if(ST.step>=pages.length)ST.step=pages.length-1;const pg=pages[ST.step],m=appShell();
  m.append(toolbar(ST.flow==='stage2'?'第二階段問卷':'首次篩查'));
  const h=el('div','flow-head');h.append(el('h2','',pg.section));
  const sectionPages=pages.filter(x=>x.section===pg.section),localIndex=sectionPages.indexOf(pg)+1;
  h.append(el('div','progress',`目前：第${localIndex}／${sectionPages.length}個畫面　｜　已回答：${pages.slice(0,ST.step).filter(pageComplete).length}／${pages.length}`));
  const sm=el('div','section-menu');[...new Set(pages.map(x=>x.section))].forEach(s=>{
    const first=pages.findIndex(x=>x.section===s),ps=pages.filter(x=>x.section===s),done=ps.every(pageComplete),partial=!done&&ps.some(pageComplete);
    sm.append(btn(`${done?'✓ ':''}${s}`,()=>jumpSection(first,pages),(s===pg.section?'current ':'')+(done?'done':partial?'partial':'')))
  });h.append(sm);m.append(h);if(ST.flow==='screening')m.append(identityStrip());
  const qbox=el('section','question');if(pg.context)qbox.append(el('div','context',pg.context));qbox.append(el('h3','',pg.label));renderPage(pg,qbox);if(ST.error)qbox.append(el('div','error',ST.error));m.append(qbox);
  const nav=el('div','nav');nav.append(btn('返回上一個',()=>{if(ST.step>0){ST.step--;ST.error='';saveDraft();player()}},'secondary'));
  const needsExplicit=['examples','quipGroup','quipRsMatrix','pdiPage','mriSafety','rbMain','rbQ10','screenResult','stage2Summary','scaleResult'];
  if(needsExplicit.includes(pg.kind)){
    const nextLabel=ST.step===pages.length-1?'檢查並提交':pg.kind==='examples'?'完成並繼續':pg.kind==='quipGroup'?(pg.group===2?'完成QUIP':'下一組'):'繼續';
    nav.append(btn(nextLabel,()=>manualNext(pg,pages),'next'));
  }
  m.append(nav);setTimeout(()=>{const first=qbox.querySelector('input:not([disabled]),textarea:not([disabled])');if(first)first.focus({preventScroll:true})},30)
}

function renderScale(pg,a){
  const opts=pg.options||[],g=el('div',opts.length===5?'scale-buttons':'options');
  opts.forEach((o,n)=>{const keyText=opts.length===5?String(o.value):String(n+1),b=btn('',()=>{set(pg.key,o.value);autoNext()},(opts.length===5?'':'choice')+(val(pg.key)===o.value?' selected':''));b.append(el('strong','',keyText),document.createTextNode(' '+String(o.label).replace(/^\d+\s*/,'')));g.append(b)});a.append(g)
}

function keyboardValueForScale(pg,key){
  if(!pg||pg.kind!=='scale')return null;const opts=pg.options||[];
  if(opts.length===5&&/^[0-4]$/.test(key))return opts.find(o=>Number(o.value)===Number(key))||opts[Number(key)]||null;
  if(opts.length===4&&/^[1-4]$/.test(key))return opts[Number(key)-1]||null;return null
}
document.addEventListener('keydown',e=>{
  if(!['stage2','screening'].includes(ST.flow)||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
  const pg=playerPages()[ST.step],o=keyboardValueForScale(pg,e.key);if(o){e.preventDefault();set(pg.key,o.value);autoNext()}
});

function renderQuipGroup(pg,a){
  const group=B.quip.groups[pg.group];a.append(el('p','instruction',B.quip.instructions));
  if(pg.group===0){
    const defs=el('div','quip-definitions');B.quip.domains.forEach(d=>{const x=el('div','definition');x.append(el('strong','',d.fullLabel));if(d.description)x.append(document.createTextNode('：'+d.description));defs.append(x)});a.append(defs);
    const table=el('div','quip-matrix');table.append(el('div','head','完整題目'));B.quip.domains.forEach(d=>table.append(el('div','head',d.fullLabel)));
    B.quip.sharedStems.forEach(st=>{table.append(el('div','quip-stem',`${st.index}. ${st.fullText}`));B.quip.domains.forEach(d=>table.append(toggleButton(d.fullLabel,`quip_${d.key}${st.index}_yes`,()=>player())))});a.append(table)
  }else{
    if(group.description)a.append(el('p','instruction',group.description));const list=el('div','quip-full-list');group.items.forEach(item=>{const w=el('div','quip-full-item');w.append(toggleButton(item.fullLabel,item.name,()=>player()));if(item.detailField&&val(item.name)===1){const t=el('textarea','conditional');t.placeholder=item.detailPrompt||'請具體描述';t.value=val(item.detailField)||'';t.oninput=()=>set(item.detailField,t.value);w.append(t)}list.append(w)});a.append(list)
  }
}
function completeQuipGroup(pg){
  const group=B.quip.groups[pg.group];if(pg.group===0)B.quip.matrixCells.forEach(x=>{if(val(x.name)===null)set(x.name,0)});else group.items.forEach(x=>{if(val(x.name)===null)set(x.name,0)});
}

function renderQuipRsMatrix(a){
  a.append(el('p','instruction','請在同一頁完成全部28格。每格只輸入一個0至4；輸入合法數字後會立即保存並自動移到下一格。'));
  const legend=el('div','scale-legend','0＝從不　1＝極少　2＝有時　3＝經常　4＝非常頻繁');a.append(legend);
  const defs=el('div','quip-definitions');B.quiprs.domains.forEach(d=>{const x=el('div','definition');x.append(el('strong','',d.fullLabel));if(d.description)x.append(document.createTextNode('：'+d.description));defs.append(x)});a.append(defs);
  const grid=el('div','quiprs-grid');grid.append(el('div','head','完整共享題幹'));B.quiprs.domains.forEach(d=>grid.append(el('div','head',d.fullLabel)));
  B.quiprs.sharedStems.forEach(st=>{grid.append(el('div','q',`${st.index}. ${st.fullText}`));B.quiprs.domains.forEach(d=>{const cell=B.quiprs.matrixCells.find(x=>x.stemIndex===st.index&&x.domain===d.key.toUpperCase()),i=el('input','quiprs-input');i.inputMode='numeric';i.maxLength=1;i.pattern='[0-4]';i.dataset.key=cell.name;i.value=val(cell.name)??'';i.onkeydown=e=>{if(/^[0-4]$/.test(e.key)){e.preventDefault();if(i.dataset.busy==='1')return;i.dataset.busy='1';set(cell.name,Number(e.key));i.value=e.key;requestAnimationFrame(()=>{i.dataset.busy='0';const all=qa('.quiprs-input');const next=all[all.indexOf(i)+1];if(next){next.value=val(next.dataset.key)??'';next.focus()}else i.blur()})}else if(!['Tab','Shift','Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault()};i.onpaste=e=>{e.preventDefault();const x=(e.clipboardData||window.clipboardData).getData('text').trim();if(/^[0-4]$/.test(x)){set(cell.name,Number(x));i.value=x;const all=qa('.quiprs-input');all[all.indexOf(i)+1]?.focus()}};i.oninput=()=>{if(!/^[0-4]$/.test(i.value)){i.value='';set(cell.name,null)}};grid.append(i)});});a.append(grid)
}

function renderScaleCompletion(pg,a){
  calculateAllDerived();if(ST.flow==='stage2'){a.append(neutralComplete(pg.scale));return}
  if(pg.scale==='HADS')a.append(resultBox('HADS結果',[`完整性：${val('hads_complete')?'14／14':'未完整'}`,`A：${val('hads_anxiety_total')??'—'}／21；門檻 >6；Review：${val('hads_anxiety_review')===null?'待完成':val('hads_anxiety_review')?'是':'否'}`,`D：${val('hads_depression_total')??'—'}／21；門檻 >9；Review：${val('hads_depression_review')===null?'待完成':val('hads_depression_review')?'是':'否'}`],val('hads_mood_review')?'bad':'good'));
  if(pg.scale==='SAS')a.append(resultBox('SAS結果',[`總分：${val('sas_total')??'—'}／42`,`Cutoff：≥14`,`Apathy指標：${val('sas_apathy_flag')===null?'待完成':val('sas_apathy_flag')?'達標':'未達標'}`],val('sas_apathy_flag')?'bad':'good'));
  if(pg.scale==='QUIP'){const t={};['a','b','c','d','e','f'].forEach(d=>{const n=d==='e'?3:d==='f'?4:5;t[d]=Array.from({length:n},(_,i)=>Number(val(`quip_${d}${i+1}_yes`))||0).reduce((x,y)=>x+y,0)});a.append(resultBox('QUIP結果',[`A ${t.a}｜B ${t.b}｜C ${t.c}｜D ${t.d}｜E ${t.e}｜F ${t.f}`,`總Yes數：${Object.values(t).reduce((x,y)=>x+y,0)}`,`Positive Domain數：${Object.values(t).filter(x=>x>0).length}`,`作用：Review only；不直接ICD排除或分組。`]))}
  if(pg.scale==='QUIP-RS'){const z=scoreQuipRS();a.append(resultBox('QUIP-RS結果',[`A ${z.tot.a}｜B ${z.tot.b}｜C ${z.tot.c}｜D ${z.tot.d}`,`E1 ${z.tot.e1}｜E2 ${z.tot.e2}｜E ${z.E}｜F ${z.tot.f}`,`AD ${z.AD}｜AF ${z.AF}`,`Cutoff：A≥6；B≥8；C≥8；D≥7；E≥7；AD≥10；F沒有排除Cutoff`,`達標Domain：${z.hit.join('、')||'沒有'}`,`ICD排除：${z.hit.length?'是':'否'}`],z.hit.length?'bad':'good'))}
  if(pg.scale==='RBDSQ')a.append(resultBox('RBDSQ結果',[`總分：${val('rbdsq_total')??'—'}／13`,`適用Cutoff：${val('rbdsq_cutoff_value')??'待確認PD／HC身份'}`,`Sleep Review：${val('rbdsq_positive_flag')===null?'待完成':val('rbdsq_positive_flag')?'需要':'不需要'}`],val('rbdsq_positive_flag')?'bad':'good'))
}

function pageComplete(pg){
  if(pg.kind==='scaleResult')return true;
  if(pg.kind==='quipGroup'){if(pg.group===2)return B.quip.groups[2].items.every(x=>val(x.name)!==1||!x.detailField||String(val(x.detailField)||'').trim());return true}
  if(pg.kind==='quipRsMatrix')return completeKeys(B.quiprs.matrixCells.map(x=>x.name));
  if(pg.kind==='pdiPage')return B.pdi21.items.slice(pg.from,pg.to).every(x=>val(x.yesField)!==1||['distress','preoccupation','conviction'].every(k=>present(x.dimensions[k].name)));
  if(pg.kind==='iorScenario'){const n=String(pg.scenario).padStart(2,'0');return ['frequency','conviction','distress'].every(k=>present(`ior${n}_${k}`))}
  if(['mriSafety','rbQ10'].includes(pg.kind))return true;if(pg.kind==='rbMain')return present(B.rbdsq.sourceField);
  if(pg.kind==='screenResult')return present('final_screening_decision')&&(!['OTHER_EXCLUDE','PENDING'].includes(val('final_screening_decision'))||String(val('final_screening_reason')||'').trim());
  if(pg.kind==='dob')return present('date_of_birth');if(pg.kind==='positiveOne')return present(pg.key)&&(!pg.conditional||val(pg.key)!==1||present(pg.conditional.key));if(pg.kind==='examples'){const domain=(B.cdars.domains||[]).find(d=>d.examplesField===pg.key),minimum=domain?.minimumExamples||1;return splitExamples(val(pg.key)).length>=minimum}if(pg.kind==='moca')return present('moca_1_raw_total');return pg.key?present(pg.key):true
}
function manualNext(pg,pages){
  if(pg.kind==='quipGroup')completeQuipGroup(pg);applyDefaultAnswers(pg);if(!pageComplete(pg)){if(pg.kind==='examples'){const domain=(B.cdars.domains||[]).find(d=>d.examplesField===pg.key),minimum=domain?.minimumExamples||1,current=splitExamples(val(pg.key)).length;ST.error=domain?.exampleValidationMessage||`目前已填${current}項，請至少填寫${minimum}項。`}else ST.error='尚未完成：請完成已選項目的詳細資料。';return player()}
  if(ST.step<pages.length-1){ST.step++;ST.error='';saveDraft();player()}else submitFormal()
}

/* Stage 2: neutral completion only, no scores. */
function renderStage2Summary(a){a.append(resultBox('問卷已完成',['所有答案已保存。多謝您的參與。'],'good'))}

/* C-DARS examples: at least two non-social pastimes; every rating screen shows entered examples. */
function splitExamples(v){return String(v||'').split(/[，,、；;\n]+/).map(x=>x.trim()).filter(Boolean)}
function validExamples(v){return splitExamples(v).length>0}
function renderExamples(pg,a){
  const domain=(B.cdars.domains||[]).find(d=>d.examplesField===pg.key),min=domain?.minimumExamples||1;
  a.append(el('p','instruction',domain?.examplePrompt||pg.label));if(domain?.examplePlaceholder)a.append(el('p','hint',domain.examplePlaceholder));
  const t=el('textarea');t.placeholder=domain?.examplePlaceholder||'請在此輸入';t.value=val(pg.key)||'';t.oninput=()=>set(pg.key,t.value);t.onkeydown=e=>{if((e.ctrlKey||e.metaKey||e.altKey)&&e.key==='Enter'){e.preventDefault();if(splitExamples(t.value).length>=min)autoNext();else{ST.error=domain?.exampleValidationMessage||`請至少輸入${min}項。`;player()}}};a.append(t,el('p','hint','可按「完成並繼續」；電腦亦可按 Ctrl／⌘／Alt + Enter。一般 Enter 只會換行。'))
}
const oldRenderScale=renderScale;
renderScale=function(pg,a){
  const item=B.cdars.items.find(x=>x.name===pg.key);if(item){const domain=B.cdars.domains.find(d=>d.key===item.domain),examples=val(domain.examplesField);if(examples)a.append(resultBox('您之前填寫的活動',[String(examples)]))}
  oldRenderScale(pg,a)
};

/* PDI and IOR stable controls: direct handlers survive rerender. */
function renderPDIPage(pg,a){
  a.append(el('p','instruction',B.pdi21.pageInstructions?.[`page${pg.page}`]||''));
  B.pdi21.items.slice(pg.from,pg.to).forEach((x,idx)=>{const w=el('div','pdi-row'),toggle=btn(`${String(pg.from+idx+1).padStart(2,'0')} ${x.fullLabel}`,()=>{set(x.yesField,val(x.yesField)===1?0:1);if(val(x.yesField)===0)Object.values(x.dimensions).forEach(d=>set(d.name,0));player()},'toggle'+(val(x.yesField)===1?' selected':''));w.append(toggle);if(val(x.yesField)===1){[['distress','困擾程度',['沒有困擾','輕微困擾','中等困擾','相當困擾','非常困擾']],['preoccupation','反覆想到',['幾乎沒有想到','偶爾想到','有時想到','經常想到','一直在想']],['conviction','確信程度',['完全不相信','有點相信','半信半疑','相當相信','完全相信']]].forEach(z=>{const row=el('div','pdi-scale');row.append(el('strong','',z[1]));const g=el('div','scale-buttons');z[2].forEach((lab,i)=>{const value=i+1;g.append(btn(`${value} ${lab}`,()=>{set(x.dimensions[z[0]].name,value);player()},val(x.dimensions[z[0]].name)===value?'selected':''))});row.append(g);w.append(row)})}a.append(w)})
}
function renderIORScenario(pg,a){
  const n=String(pg.scenario).padStart(2,'0');a.append(el('p','context',pg.scenarioText));
  [['frequency','出現頻率',['從不','很少','有時','經常','非常頻繁']],['conviction','相信程度',['完全不相信','有點相信','半信半疑','相當相信','完全相信']],['distress','不安程度',['完全沒有不安','輕微不安','中等不安','相當不安','非常不安']]].forEach((z,zi)=>{const block=el('div','ior-block');block.append(el('h4','',z[1]));const g=el('div','scale-buttons');z[2].forEach((lab,i)=>{const value=i+1,key=`ior${n}_${z[0]}`;g.append(btn(`${value} ${lab}`,()=>{set(key,value);if(zi===2&&i>=0&&['frequency','conviction','distress'].every(k=>present(`ior${n}_${k}`)))autoNext();else player()},val(key)===value?'selected':''))});block.append(g);a.append(block)})
}

/* Backfill fix: no QUIP-RS crash; compact continuous grid and full live derived output. */
function renderQuipRsBF(s){
  s.append(el('p','hint','0＝從不　1＝極少　2＝有時　3＝經常　4＝非常頻繁。輸入合法單個數字後立即保存並移到下一格。'));
  const grid=el('div','quiprs-grid backfill-quiprs');grid.append(el('div','head','完整共享題幹'));B.quiprs.domains.forEach(d=>grid.append(el('div','head',d.fullLabel)));
  B.quiprs.sharedStems.forEach(st=>{grid.append(el('div','q',st.fullText));B.quiprs.domains.forEach(d=>{const cell=B.quiprs.matrixCells.find(x=>x.stemIndex===st.index&&x.domain===d.key.toUpperCase()),i=el('input','quiprs-input');i.inputMode='numeric';i.maxLength=1;i.value=val(cell.name)??'';i.onkeydown=e=>{if(/^[0-4]$/.test(e.key)){e.preventDefault();set(cell.name,Number(e.key));i.value=e.key;requestAnimationFrame(()=>qa('.backfill-quiprs .quiprs-input')[qa('.backfill-quiprs .quiprs-input').indexOf(i)+1]?.focus())}else if(!['Tab','Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault()};grid.append(i)})});s.append(grid);calculateAllDerived();const z=scoreQuipRS();s.append(resultBox('QUIP-RS即時計算',[`完成：${B.quiprs.matrixCells.filter(x=>present(x.name)).length}／28`,`A ${z.complete?z.tot.a:'—'}｜B ${z.complete?z.tot.b:'—'}｜C ${z.complete?z.tot.c:'—'}｜D ${z.complete?z.tot.d:'—'}`,`E1 ${z.complete?z.tot.e1:'—'}｜E2 ${z.complete?z.tot.e2:'—'}｜E ${z.complete?z.E:'—'}｜F ${z.complete?z.tot.f:'—'}`,`AD ${z.complete?z.AD:'—'}｜AF ${z.complete?z.AF:'—'}｜Cutoff ${z.complete?(z.hit.join('、')||'沒有'):'待完成'}`]))
}
function addBFScale(parent,items,min,max){
  parent.append(el('p','hint',`直接輸入正式Raw分數${min}–${max}；合法單個數字後自動移到下一格。空白保留為null。`));items.forEach(x=>addBFNumber(parent,x.backfillLabel||x.fullLabel,x.name||x.responseName,min,max));
  const keys=items.map(x=>x.name||x.responseName);parent.append(resultBox('即時完整性',[`完成：${keys.filter(present).length}／${keys.length}`,`缺失：${keys.filter(k=>!present(k)).map((k,i)=>k).join('、')||'沒有'}`]))
}

/* Conditional MRI admin fields. */
function renderMRIAdminFields(a){
  const w=el('div','plain-block');w.append(el('h3','','MRI行政安排'),el('p','hint','通過招募後Stage 2自動開放。'));
  set('stage2_released',1);
  const months=el('div','chips');for(let m=1;m<=12;m++)months.append(toggleButton(`${m}月`,`mri_avail_month_${m}`,()=>player()));w.append(el('h4','','方便到校月份'),months);
  [['星期一','mon'],['星期二','tue'],['星期三','wed'],['星期四','thu'],['星期五','fri']].forEach(x=>{const r=el('div','form-grid');r.append(el('strong','',x[0]));const g=el('div','chips');g.append(toggleButton('上午',`mri_avail_${x[1]}_am`,()=>player()),toggleButton('下午',`mri_avail_${x[1]}_pm`,()=>player()));r.append(g);w.append(r)});
  const g=el('div','toggle-grid');[['需要入口接應','mri_need_pickup'],['有陪同人士','mri_has_companion'],['需要借用輪椅','mri_need_wheelchair'],['自備輪椅','mri_own_wheelchair'],['需要無障礙路線','mri_need_accessible_route'],['可使用電子收款','electronic_payment_available']].forEach(x=>g.append(toggleButton(x[0],x[1],()=>player())));w.append(g);
  if(val('mri_has_companion')===1){const f=fieldText('陪同人數','mri_companion_count','例：4','number');w.append(f);const c=Number(val('mri_companion_count'))||0,total=1+c;w.append(resultBox('到校及QR Code',[`Participant：1人`,`陪同人士：${c}人`,`到校總人數：${total}人`,`需要QR Code：${total}個`]));w.append(toggleButton(`${total}個QR Code已申請`,'mri_qr_applied',()=>player()))}else{setDerived('mri_companion_count',0);w.append(resultBox('到校及QR Code',['Participant：1人','陪同人士：0人','需要QR Code：1個']));w.append(toggleButton('1個QR Code已申請','mri_qr_applied',()=>player()))}
  if(val('electronic_payment_available')===1){const p=el('div','direct');[['payme','PayMe'],['alipayhk','AlipayHK'],['fps','轉數快（FPS）']].forEach(x=>p.append(btn(x[1],()=>{set('electronic_payment_method',x[0]);player()},val('electronic_payment_method')===x[0]?'selected':'')));w.append(el('h4','','電子收款方式'),p);if(present('electronic_payment_method'))w.append(fieldText('收款電話','electronic_payment_phone','例：9123 4567'))}
  a.append(w)
}

/* MRI visit: do not assume repeat MoCA; fetch hook plus calendar two-month comparison. */
function addCalendarMonths(date,count){const d=new Date(date+'T00:00:00');if(!Number.isFinite(d.getTime()))return null;const day=d.getDate(),target=new Date(d.getFullYear(),d.getMonth()+count+1,0);target.setDate(Math.min(day,target.getDate()));return target}
function mocaValidity(localDate){const last=val('latest_valid_moca_date');if(!last)return{known:false,needs:true};const expiry=addCalendarMonths(last,2),today=new Date((localDate||new Date().toISOString().slice(0,10))+'T00:00:00');return{known:true,last,expiry:expiry?.toISOString().slice(0,10),needs:!expiry||today>expiry}}
function renderMRIVisit(){
  const m=appShell();m.append(toolbar('MRI到訪記錄'),identityStrip());const s=el('section','summary');s.append(el('h2','section-title','MRI到訪資料'));
  addStaffChoices(s,'MRI到訪次數','visit_number',[[1,'第一次MRI'],[2,'第二次MRI']]);
  const check=mocaValidity();s.append(resultBox('現有MoCA',check.known?[`最新有效日期：${check.last}`,`兩個月有效期限：${check.expiry}`,check.needs?'結果：需要重做MoCA':'結果：現有MoCA仍有效']:['未能從後端取得最新有效MoCA日期。','結果：需要由工作人員核實或重做MoCA。'],check.needs?'warn':'good'));
  if(check.needs){addStaffNumber(s,'MRI前／第二次MoCA原始總分','moca_2_raw_total','／30');renderSecondMocaResult(s)}
  addStaffChoices(s,'與首次MRI安全相比','mri_safety_changed_since_initial',[[0,'沒有變化'],[1,'有變化']]);if(val('mri_safety_changed_since_initial')===1){const g=el('div','toggle-grid');C.mriSafety.forEach(x=>g.append(toggleButton(x[1],'change_'+x[0],()=>renderMRIVisit())));s.append(g);const t=el('textarea');t.placeholder='請說明MRI安全變化內容';t.value=val('mri_safety_change_detail')||'';t.oninput=()=>set('mri_safety_change_detail',t.value);s.append(t)}
  if(val('pd_hc_status')!=='HC'){addStaffChoices(s,'MRI當日PD藥物狀態','med_on_off',[['ON','ON'],['OFF','OFF']]);addStaffNumber(s,'距上次服用PD藥物','last_pd_med_minutes','分鐘')}
  s.append(el('h3','','MID'));addStaffNumber(s,'MID反應時間','mid_res_time_ms','毫秒');s.append(el('h3','','CGT'));addStaffCheckbox(s,'CGT已完成','cgt_done');s.append(el('h3','','Digit Span'));addStaffNumber(s,'Forward','digit_span_forward','');addStaffNumber(s,'Backward','digit_span_backward','');s.append(resultBox('Digit Span',[`Total：${present('digit_span_forward')&&present('digit_span_backward')?Number(val('digit_span_forward'))+Number(val('digit_span_backward')):'待完成'}`]));
  s.append(el('h3','','MRI Sequence'),el('p','hint','預設完成；只點選沒有完成的Sequence。'));const sg=el('div','chips');B.sequences.items.forEach(x=>sg.append(btn(x.label,()=>{set(x.field,val(x.field)===0?1:0);renderMRIVisit()},'toggle danger'+(val(x.field)===0?' selected':''))));s.append(sg);
  s.append(el('h3','','付款及Receipt'));addStaffCheckbox(s,'已付款','payment_status');addStaffCheckbox(s,'Receipt已處理','receipt_status');const sb=el('div','submitbar');sb.append(btn('正式提交MRI到訪',()=>validateMRIVisit(s),'primary'));s.append(sb);m.append(s)
}
function renderSecondMocaResult(s){
  if(!present('moca_2_raw_total'))return;const raw=Number(val('moca_2_raw_total')),age=calcAge(),edu=Number(val('education_years')),adj=Number.isFinite(edu)&&edu<=12?1:0,adjusted=Math.min(30,raw+adj),cut=Number.isFinite(age)&&Number.isFinite(edu)?mocaCutoff(age,edu):null,first=present('moca_1_raw_total')?Number(val('moca_1_raw_total')):null;
  setDerived('moca_2_adjustment',adj);setDerived('moca_2_adjusted_total',adjusted);setDerived('moca_2_16th_cutoff',cut);setDerived('moca_2_norm_result_code',cut===null?null:(raw>cut?1:0));setDerived('moca_latest_context','MRI前重做');setDerived('moca_change_remark',first===null?'MRI前重做MoCA；首次分數未載入。':`MRI前重做MoCA，Raw由${first}分變為${raw}分，變化${raw-first>=0?'+':''}${raw-first}分；最新有效結果採用MRI前重做結果。`);
  s.append(resultBox('第二次MoCA結果',[`Raw：${raw}／30`,`教育調整：+${adj}`,`Adjusted：${adjusted}／30`,`第16百分位Cutoff：${cut??'無法判定'}`,`與Cutoff差異：${cut===null?'—':(raw-cut>=0?'+':'')+(raw-cut)}`,val('moca_change_remark')],cut!==null&&raw<=cut?'bad':'good'))
}

/* Payload: clean once, Receiver-compatible event/form mapping, no recursive payload_json. */
function payload(form,event,status){
  calculateAllDerived();const receiverForm=RECEIVER_FORM_BY_EVENT[event]||((form==='mri')?'mri':'screening');
  const clean={schema_version:'frontend-10.0',submission_id:ST.submission,form_type:receiverForm,event_type:event,workflow_stage:event==='stage_2_questionnaires'?'stage_2':'stage_1',workflow_part:ST.flow,record_status:status,p_id:val('p_id'),s_id:val('s_id'),visit_number:val('visit_number'),participant_id:val('p_id'),submitted_at:new Date().toISOString(),data_source:event==='historical_paper_reentry'?'historical_paper_reentry':event==='stage_2_questionnaires'?'participant_remote':event==='clinical_supplement'?'hospital_record':'staff_assisted'};
  Object.keys(ST.answers).forEach(k=>{if(k!=='payload_json')clean[k]=ST.answers[k]===undefined?null:ST.answers[k]});
  ST.meds.forEach((m,n)=>{const k=String(n+1).padStart(2,'0');clean[`medication_${k}_name`]=m.name||null;clean[`medication_${k}_strength`]=m.strength||null;clean[`medication_${k}_times_per_day`]=m.times===''?null:Number(m.times);clean[`medication_${k}_units_per_time`]=m.units===''?null:Number(m.units)});
  return Object.assign({},clean,{payload_json:JSON.stringify(clean)})
}
function downloadCurrent(){
  const event=ST.flow==='backfill'?'historical_paper_reentry':ST.flow==='clinical'?'clinical_supplement':ST.flow==='mri_visit'?'mri_scan':ST.flow==='stage2'?'stage_2_questionnaires':'screening_core',p=payload('',event,'draft'),headers=Object.keys(p),data={};headers.forEach(k=>data[k]=p[k]===undefined?null:p[k]);downloadObj({metadata:{workflow:ST.flow,downloaded_at:new Date().toISOString(),question_bank_version:B.version,app_build:APP_BUILD,header_count:headers.length},headers,data},`${ST.flow||'apathy'}_${val('p_id')||'draft'}`)
}

/* Backfill submits through current Receiver form/event contract. */
const oldBackfill=backfill;
backfill=function(){try{calculateAllDerived();oldBackfill()}catch(e){console.error(e);const m=q('main.backfill')||appShell();const box=resultBox('補錄頁載入錯誤',[String(e.message||e),'其他Section不應因單一量表失敗而消失；請下載本地JSON。'],'bad');m.append(box)}};


/* ===== Final field-test fixes: preserve verified UI, repair fast-entry events ===== */
function confirmClear(){
  const m=el('div','modal'),b=el('div','modal-box');
  b.append(el('h2','','清除此裝置全部資料？'),el('p','',
    '此操作會清除此瀏覽器內所有入口、所有Participant的本機草稿、目前位置及暫存Submission ID；不會影響後端已提交資料或已下載JSON。'));
  const a=el('div','submitbar');
  a.append(btn('取消',()=>m.remove(),'linkbtn'),btn('確定全部清除',()=>{
    Object.keys(localStorage).forEach(k=>{if(/^apathy-(?:v\d+-)?/.test(k))localStorage.removeItem(k)});
    resetFlow();ST.submission=uuid();m.remove();home();
  },'primary'));
  b.append(a);m.append(b);document.body.append(m)
}
function matrixKeydown(e,input,allowed,inputs,index,cols){
  if(new RegExp(`^[${allowed}]$`).test(e.key)){
    e.preventDefault();if(input.dataset.busy==='1')return;
    input.dataset.busy='1';input.value=e.key;input.dispatchEvent(new Event('matrixvalue'));
    requestAnimationFrame(()=>{input.dataset.busy='0';inputs[index+1]?.focus()});return
  }
  const move={ArrowLeft:index-1,ArrowRight:index+1,ArrowUp:index-cols,ArrowDown:index+cols};
  if(Object.prototype.hasOwnProperty.call(move,e.key)){
    e.preventDefault();const target=move[e.key];if(target>=0&&target<inputs.length)inputs[target].focus();return
  }
  if(!['Tab','Shift','Backspace','Delete','Home','End'].includes(e.key))e.preventDefault()
}
function firstPendingPdiInput(current){
  const all=qa('.bf-pdi input:not([disabled])');const ix=all.indexOf(current);
  return all.slice(ix+1).find(i=>i.value==='')||all.find(i=>i.value==='')||null
}
function renderPDIBF(s){
  B.pdi21.items.forEach((x,n)=>{
    const r=el('div','bf-pdi');
    const toggle=btn(`${String(n+1).padStart(2,'0')} ${x.fullLabel}`,()=>{
      const next=val(x.yesField)===1?0:1;set(x.yesField,next);
      Object.values(x.dimensions).forEach(d=>set(d.name,next===1?null:0));backfill()
    },'toggle'+(val(x.yesField)===1?' selected':''));r.append(toggle);
    ['distress','preoccupation','conviction'].forEach(k=>{
      const key=x.dimensions[k].name,i=el('input');i.inputMode='numeric';i.maxLength=1;
      i.placeholder=k==='distress'?'困擾':k==='preoccupation'?'反覆':'確信';i.disabled=val(x.yesField)!==1;i.value=val(key)??'';
      i.addEventListener('matrixvalue',()=>{const v=Number(i.value);set(key,v);const next=firstPendingPdiInput(i);if(next)next.focus();else i.blur()});
      i.onkeydown=e=>matrixKeydown(e,i,'1-5',qa('.bf-pdi input:not([disabled])'),qa('.bf-pdi input:not([disabled])').indexOf(i),3);
      i.oninput=()=>{const v=i.value.replace(/[^1-5]/g,'').slice(-1);i.value=v;if(v==='')set(key,null)};
      i.onpaste=e=>{e.preventDefault();const v=(e.clipboardData||window.clipboardData).getData('text').trim();if(/^[1-5]$/.test(v)){i.value=v;i.dispatchEvent(new Event('matrixvalue'))}};
      r.append(i)
    });s.append(r)
  });
  calculateAllDerived();s.append(resultBox('PDI即時計算',[
    `完成：${val('pdi_complete')?'21／21':'未完整'}`,
    `Yes數：${val('pdi_yes_count')??'—'}`,
    `困擾：${val('pdi_distress_total')??'—'}｜反覆想到：${val('pdi_preoccupation_total')??'—'}｜確信：${val('pdi_conviction_total')??'—'}`,
    `Severity：${val('pdi_total_severity')??'—'}｜PDI Total：${val('pdi_total')??'—'}`
  ]))
}
function renderIORBF(s){
  const inputs=[];
  B.ior.scenarios.forEach((sc,n)=>{
    const r=el('div','bf-pdi');r.append(el('span','',`${n+1}. ${sc}`));
    ['frequency','conviction','distress'].forEach(k=>{
      const key=`ior${String(n+1).padStart(2,'0')}_${k}`,i=el('input');i.inputMode='numeric';i.maxLength=1;
      i.placeholder=k==='frequency'?'頻率':k==='conviction'?'相信':'不安';i.value=val(key)??'';i.dataset.key=key;inputs.push(i);r.append(i)
    });s.append(r)
  });
  inputs.forEach((i,index)=>{
    i.addEventListener('matrixvalue',()=>{set(i.dataset.key,Number(i.value));const next=inputs[index+1];if(next)next.focus();else i.blur()});
    i.onkeydown=e=>matrixKeydown(e,i,'1-5',inputs,index,3);
    i.oninput=()=>{const v=i.value.replace(/[^1-5]/g,'').slice(-1);i.value=v;if(v==='')set(i.dataset.key,null)};
    i.onpaste=e=>{e.preventDefault();const v=(e.clipboardData||window.clipboardData).getData('text').trim();if(/^[1-5]$/.test(v)){i.value=v;i.dispatchEvent(new Event('matrixvalue'))}}
  });
  calculateAllDerived();const done=inputs.filter(i=>i.value!=='').length;
  s.append(resultBox('IOR即時計算',[
    `完成：${done}／45`,
    `Frequency：${val('ior_frequency_total')??'—'}；≥3情境：${val('ior_frequency_ge3_count')??'—'}`,
    `Conviction：${val('ior_conviction_total')??'—'}；≥3情境：${val('ior_conviction_ge3_count')??'—'}`,
    `Distress：${val('ior_distress_total')??'—'}；≥3情境：${val('ior_distress_ge3_count')??'—'}`,
    `Overall：${val('ior_overall_total')??'—'}`
  ]))
}
function addBFChoices(parent,label,key,options){
  const w=el('div','field');w.append(el('div','label',label));const g=el('div','direct');
  options.forEach(o=>{const b=btn(o[1],e=>{e?.stopPropagation?.();set(key,o[0]);requestAnimationFrame(backfill)},val(key)===o[0]?'selected':'');b.dataset.field=key;b.dataset.value=String(o[0]);g.append(b)});
  w.append(g);parent.append(w)
}
function addStaffChoices(s,label,key,opts){
  const f=el('div','field');f.append(el('div','label',label));const g=el('div','direct');
  opts.forEach(o=>{const b=btn(o[1],e=>{e?.stopPropagation?.();set(key,o[0]);b.classList.add('selected');requestAnimationFrame(renderByFlow)},val(key)===o[0]?'selected':'');b.dataset.field=key;b.dataset.value=String(o[0]);g.append(b)});
  f.append(g);s.append(f)
}
function addStaffCheckbox(s,label,key){
  const b=btn(label,e=>{e?.stopPropagation?.();set(key,val(key)===1?0:1);requestAnimationFrame(renderByFlow)},'toggle'+(val(key)===1?' selected':''));s.append(b)
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
function renderUPDRSItems(s,withCue){
  const items=B.clinical.updrs3.items||[],firstIncomplete=items.find(x=>!present(x.name));
  if(!ST.updrsActiveKey)ST.updrsActiveKey=firstIncomplete?.name||items[0]?.name;
  items.forEach(x=>{
    const w=el('div','clinical-anchor');w.dataset.updrsKey=x.name;if(ST.updrsActiveKey===x.name)w.classList.add('active');
    w.append(el('strong','',x.fullLabel||x.name));if(withCue&&x.instruction)w.append(el('p','hint',x.instruction));const g=el('div',withCue?'options':'direct');
    (x.options||[0,1,2,3,4].map(v=>({value:v,label:String(v)}))).forEach(o=>{
      const b=btn(`${o.value}　${o.label}`,e=>{e?.stopPropagation?.();ST.updrsActiveKey=x.name;set(x.name,o.value);requestAnimationFrame(renderClinical)},'choice'+(val(x.name)===o.value?' selected':''));b.dataset.updrsKey=x.name;b.dataset.updrsValue=String(o.value);g.append(b)
    });w.append(g);w.onclick=()=>{ST.updrsActiveKey=x.name};s.append(w)
  })
}
document.addEventListener('keydown',e=>{
  if(ST.flow!=='clinical'||!/^\d$/.test(e.key)||Number(e.key)>4||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
  const route=val('updrs3_route');if(!['hospital_items','research_assessed'].includes(route))return;
  const items=B.clinical.updrs3.items||[],key=ST.updrsActiveKey||items.find(x=>!present(x.name))?.name;if(!key)return;
  e.preventDefault();set(key,Number(e.key));const ix=items.findIndex(x=>x.name===key);ST.updrsActiveKey=items[ix+1]?.name||key;renderClinical()
});
const LEDD_RULES=[
  [/stalevo|entacapone/i,1.33,'levodopa'],[/tolcapone/i,1.5,'levodopa'],[/sinemet\s*cr|levodopa\s*cr/i,0.75,'levodopa'],[/duodopa/i,1.11,'levodopa'],[/rytary/i,0.6,'levodopa'],[/madopar|sinemet|levodopa|carbidopa/i,1,'levodopa'],
  [/pramipexole|mirapex/i,100,'da'],[/ropinirole|requip/i,20,'da'],[/rotigotine|neupro/i,30,'da'],[/apomorphine/i,10,'da'],[/bromocriptine/i,10,'da'],[/cabergoline/i,80,'da'],[/lisuride/i,100,'da'],
  [/rasagiline|azilect/i,100,'other'],[/selegiline/i,10,'other'],[/amantadine/i,1,'other']
];
function medicationDoseMg(m,category){
  const nums=String(m.strength||'').match(/\d+(?:\.\d+)?/g)?.map(Number)||[];if(!nums.length)return null;
  const name=String(m.name||'');if(category==='levodopa'&&/sinemet|carbidopa/i.test(name)&&nums.length>1)return nums[1];
  if(category==='levodopa'&&/madopar|stalevo/i.test(name))return nums[0];return nums[0]
}
function calculateMachineLedd(){
  const rows=[],tot={levodopa:0,da:0,other:0},warnings=[];let unresolved=0;
  ST.meds.forEach((m,index)=>{
    if(!m.name&&!m.strength&&!m.times&&!m.units)return;
    const rule=LEDD_RULES.find(r=>r[0].test(String(m.name||''))),times=Number(m.times),units=Number(m.units);
    if(!rule||!Number.isFinite(times)||times<=0||!Number.isFinite(units)||units<=0){unresolved++;warnings.push(`第${index+1}種藥物資料未完整或未識別`);rows.push({index,status:'unresolved'});return}
    const dose=medicationDoseMg(m,rule[2]);if(dose===null){unresolved++;warnings.push(`第${index+1}種藥物缺少可識別規格`);rows.push({index,status:'unresolved'});return}
    const daily=dose*times*units,ledd=daily*rule[1];tot[rule[2]]+=ledd;rows.push({index,name:m.name,dose,times,units,daily,factor:rule[1],category:rule[2],ledd,status:'ok'})
  });
  const total=tot.levodopa+tot.da+tot.other;return{rows,tot,total,warnings,unresolved,complete:rows.length>0&&unresolved===0}
}
function renderLeddPanel(s){
  const c=calculateMachineLedd();setDerived('ledd_machine_levodopa',c.complete?c.tot.levodopa:null);setDerived('ledd_machine_da',c.complete?c.tot.da:null);setDerived('ledd_machine_other',c.complete?c.tot.other:null);setDerived('ledd_machine_total',c.complete?c.total:null);setDerived('ledd_machine_status',c.complete?'complete':c.rows.length?'partial':'empty');
  s.append(resultBox('機器LEDD計算',c.complete?[`Levodopa：${c.tot.levodopa.toFixed(1)} mg｜DA：${c.tot.da.toFixed(1)} mg｜其他：${c.tot.other.toFixed(1)} mg`,`Total：${c.total.toFixed(1)} mg`,`Warnings：${c.warnings.length?c.warnings.join('；'):'沒有'}`]:[`正式Total：暫不可計算`,`缺失／未識別：${c.warnings.join('；')||'尚未加入完整藥物'}`],c.complete?'good':'warn'));
  addBFNumber(s,'人工Levodopa LEDD','ledd_manual_levodopa',0,99999,'mg');addBFNumber(s,'人工DA LEDD','ledd_manual_da',0,99999,'mg');addBFNumber(s,'人工Total LEDD','ledd_manual_total',0,99999,'mg');
  const manual=val('ledd_manual_total'),diff=c.complete&&manual!==null?Number(manual)-c.total:null;setDerived('ledd_difference_total',diff);setDerived('ledd_match_flag',diff===null?null:(Math.abs(diff)<0.01?1:0));
  s.append(resultBox('LEDD核對',[`機器Total：${c.complete?c.total.toFixed(1):'—'} mg`,`人工Total：${manual??'—'} mg`,`差異：${diff===null?'—':diff.toFixed(1)+' mg'}`,`核對：${diff===null?'待人工輸入':Math.abs(diff)<0.01?'一致':'需要覆核'}`],diff!==null&&Math.abs(diff)>=0.01?'warn':diff===null?'':'good'))
}
function renderMedicationBF(s){
  s.append(btn('＋新增藥物',()=>{ST.meds.push({name:'',strength:'',times:'',units:''});saveDraft();backfill()},'primary'));renderMedicationRows(s);renderLeddPanel(s)
}
function renderBackfillScaleResult(parent,items){
  calculateAllDerived();const first=items[0]?.name||items[0]?.responseName||'';
  if(first.startsWith('hads'))parent.append(resultBox('HADS即時計算',[`A：${val('hads_anxiety_total')??'—'}／21；Review >6：${val('hads_anxiety_review')===null?'待完整':val('hads_anxiety_review')?'是':'否'}`,`D：${val('hads_depression_total')??'—'}／21；Review >9：${val('hads_depression_review')===null?'待完整':val('hads_depression_review')?'是':'否'}`]));
  if(first.startsWith('sas'))parent.append(resultBox('SAS即時計算',[`Total：${val('sas_total')??'—'}／42`,`Cutoff ≥14：${val('sas_apathy_flag')===null?'待完整':val('sas_apathy_flag')?'達標':'未達標'}`]));
  if(first.startsWith('gas'))parent.append(resultBox('GAS即時計算',[`Cognitive／Social：${val('gas_cognitive_social_total')??'—'}`,`Emotion／Reaction：${val('gas_emotion_reaction_total')??'—'}`,`Autonomy：${val('gas_autonomy_total')??'—'}`,`Total：${val('gas_total')??'—'}；PD Cutoff ≥16：${val('pd_hc_status')==='HC'?'不適用於HC':val('gas_apathy_flag')===null?'待完整':val('gas_apathy_flag')?'達標':'未達標'}`]));
  if(first.startsWith('ami'))parent.append(resultBox('AMI即時計算',[`Social：${val('ami_social_mean')??'—'}`,`Emotional：${val('ami_emotional_mean')??'—'}`,`Behavioural：${val('ami_behavioural_mean')??'—'}`,`Overall：${val('ami_overall_mean')??'—'}`]));
  if(first.startsWith('rgpts'))parent.append(resultBox('R-GPTS即時計算',[`Reference：${val('rgpts_reference_total')??'—'}／32`,`Persecutory：${val('rgpts_persecutory_total')??'—'}／40；Review ≥18：${val('rgpts_review')===null?'待完整':val('rgpts_review')?'是':'否'}`,`Total：${val('rgpts_total')??'—'}／72`]));
}
function addBFScale(parent,items,min,max){
  parent.append(el('p','hint',`直接輸入正式Raw分數${min}–${max}；合法單個數字後自動移到下一格。空白保留為null。`));items.forEach(x=>addBFNumber(parent,x.backfillLabel||x.fullLabel,x.name||x.responseName,min,max));
  const keys=items.map(x=>x.name||x.responseName);parent.append(resultBox('即時完整性',[`完成：${keys.filter(present).length}／${keys.length}`,`缺失：${keys.filter(k=>!present(k)).join('、')||'沒有'}`]));renderBackfillScaleResult(parent,items)
}


/* ===== Medication / LEDD v11: raw-text machine parse + controlled manual review ===== */
const MED_CATALOG_V11=Object.freeze([
  {id:'levodopa_ir',label:'Levodopa IR',aliases:['levodopa','l-dopa'],factor:1,cat:'levodopa',component:'single'},
  {id:'sinemet',label:'Sinemet / Carbidopa-Levodopa',aliases:['sinemet','carbidopa levodopa','carbidopa/levodopa'],factor:1,cat:'levodopa',component:'second'},
  {id:'sinemet_cr',label:'Sinemet CR / Levodopa CR',aliases:['sinemet cr','sinemet controlled release','levodopa cr'],factor:0.75,cat:'levodopa',component:'second'},
  {id:'madopar',label:'Madopar / Co-beneldopa',aliases:['madopar','medopar','co-beneldopa'],factor:1,cat:'levodopa',component:'first'},
  {id:'stalevo',label:'Stalevo / Levodopa + Entacapone',aliases:['stalevo','levodopa entacapone'],factor:1.33,cat:'levodopa',component:'first'},
  {id:'duodopa',label:'Duodopa',aliases:['duodopa'],factor:1.11,cat:'levodopa',component:'single'},
  {id:'rytary',label:'Rytary',aliases:['rytary'],factor:0.6,cat:'levodopa',component:'single'},
  {id:'pramipexole',label:'Pramipexole / Mirapex',aliases:['pramipexole','mirapex'],factor:100,cat:'da',component:'single'},
  {id:'ropinirole',label:'Ropinirole / Requip',aliases:['ropinirole','ropinrole','requip'],factor:20,cat:'da',component:'single'},
  {id:'rotigotine',label:'Rotigotine / Neupro',aliases:['rotigotine','neupro'],factor:30,cat:'da',component:'single'},
  {id:'apomorphine',label:'Apomorphine',aliases:['apomorphine'],factor:10,cat:'da',component:'single'},
  {id:'bromocriptine',label:'Bromocriptine',aliases:['bromocriptine'],factor:10,cat:'da',component:'single'},
  {id:'cabergoline',label:'Cabergoline',aliases:['cabergoline'],factor:80,cat:'da',component:'single'},
  {id:'rasagiline',label:'Rasagiline / Azilect',aliases:['rasagiline','rasagline','azilect'],factor:100,cat:'other',component:'single'},
  {id:'selegiline',label:'Selegiline oral',aliases:['selegiline'],factor:10,cat:'other',component:'single'},
  {id:'amantadine',label:'Amantadine',aliases:['amantadine'],factor:1,cat:'other',component:'single'},
  {id:'entacapone_only',label:'Entacapone（獨立）',aliases:['entacapone'],factor:null,cat:'unresolved',component:'single'},
  {id:'tolcapone_only',label:'Tolcapone（獨立）',aliases:['tolcapone'],factor:null,cat:'unresolved',component:'single'}
]);
function medRound(n){return Number.isFinite(Number(n))?Number(Number(n).toFixed(2)):null}
function medTextLines(raw){return String(raw||'').replace(/\\n/g,'\n').replace(/[；;]/g,'\n').split(/\n+/).map(x=>x.trim()).filter(Boolean)}
function medFind(line){const x=line.toLowerCase().replace(/[-_]+/g,' ');return MED_CATALOG_V11.find(d=>d.aliases.some(a=>x.includes(a)))}
function medNumbers(line){return (String(line).match(/\d+(?:\.\d+)?/g)||[]).map(Number)}
function medFrequency(line,w){const x=line.toLowerCase();let m=x.match(/(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*(?:times?|次)?\s*(?:\/|per\s*)?(?:day|daily|日|天)?/);if(m){w.push(`頻次範圍採上限 ${m[2]}/day`);return +m[2]}m=x.match(/(\d+(?:\.\d+)?)\s*(?:times?|次)\s*(?:\/|per\s*)?(?:day|daily|日|天)/);if(m)return +m[1];m=x.match(/(?:bd|bid|twice daily)/);if(m)return 2;m=x.match(/(?:tds|tid|three times daily)/);if(m)return 3;m=x.match(/(?:qds|qid|four times daily)/);if(m)return 4;m=x.match(/(?:od|once daily|daily)/);if(m)return 1;return null}
function medUnits(line){const x=line.toLowerCase();let m=x.match(/(\d+(?:\.\d+)?)\s*(?:tab(?:let)?s?|pill?s?|粒|片|粒\/次|片\/次)/);if(m)return +m[1];m=x.match(/(?:half|半)\s*(?:tab(?:let)?|pill|片|粒)?/);return m?0.5:1}
function medDose(line,drug,w){let slash=String(line).match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)(?:\s*\/\s*(\d+(?:\.\d+)?))?/);if(!slash&&['sinemet','sinemet_cr'].includes(drug.id)){w.push('未寫Sinemet strength；依指定預設50/200');slash=[null,'50','200']}
  if(slash){const a=[+slash[1],+slash[2],slash[3]?+slash[3]:null];return drug.component==='second'?a[1]:a[0]}
  const mg=String(line).match(/(\d+(?:\.\d+)?)\s*mg/i);if(!mg)return null;const n=+mg[1];if(drug.id==='madopar'&&n===125){w.push('Madopar 125mg按levodopa 100mg');return 100}if(drug.id==='madopar'&&n===250){w.push('Madopar 250mg按levodopa 200mg');return 200}return n
}
function parseMedicationRawV11(raw){const rows=[],warnings=[];let levodopa=0,da=0,other=0;medTextLines(raw).forEach((line,i)=>{const lw=[],drug=medFind(line);if(!drug){rows.push({line:i+1,raw:line,status:'unresolved',reason:'未識別藥物'});warnings.push(`第${i+1}行未識別藥物`);return}if(/\b(prn|as needed|upon need)\b/i.test(line)&&medFrequency(line,[])===null){rows.push({line:i+1,raw:line,drug:drug.label,status:'ignored',reason:'PRN且無固定頻次',ledd:0});return}if(drug.factor===null){rows.push({line:i+1,raw:line,drug:drug.label,status:'unresolved',reason:'獨立COMT inhibitor需要配套levodopa'});warnings.push(`第${i+1}行${drug.label}無法獨立換算`);return}const dose=medDose(line,drug,lw),times=medFrequency(line,lw),units=medUnits(line);if(dose===null||times===null){rows.push({line:i+1,raw:line,drug:drug.label,status:'unresolved',dose,times,units,reason:dose===null?'缺少可識別mg規格':'缺少固定每日頻次',warnings:lw});warnings.push(`第${i+1}行資料不足`);return}const daily=medRound(dose*times*units),ledd=medRound(daily*drug.factor);if(drug.cat==='levodopa')levodopa+=ledd;else if(drug.cat==='da')da+=ledd;else other+=ledd;rows.push({line:i+1,raw:line,drugId:drug.id,drug:drug.label,category:drug.cat,doseMg:dose,timesPerDay:times,unitsPerTime:units,dailyMg:daily,factor:drug.factor,ledd,status:'ok',warnings:lw});lw.forEach(x=>warnings.push(`第${i+1}行：${x}`))});return{rows,levodopa:medRound(levodopa)||0,da:medRound(da)||0,other:medRound(other)||0,total:medRound(levodopa+da+other)||0,warnings,unresolved:rows.filter(x=>x.status==='unresolved').length,complete:rows.length>0&&!rows.some(x=>x.status==='unresolved')}}
function calculateManualLeddV11(){let levodopa=0,da=0,other=0,unresolved=0;const rows=ST.meds.map((m,index)=>{const drug=MED_CATALOG_V11.find(x=>x.id===m.drugId),dose=Number(m.dose),times=Number(m.times),units=Number(m.units);if(!drug||drug.factor===null||![dose,times,units].every(Number.isFinite)||dose<=0||times<=0||units<=0){if(m.drugId||m.dose||m.times||m.units)unresolved++;return{index:index+1,status:'unresolved'}}const daily=medRound(dose*times*units),ledd=medRound(daily*drug.factor);if(drug.cat==='levodopa')levodopa+=ledd;else if(drug.cat==='da')da+=ledd;else other+=ledd;return{index:index+1,drugId:drug.id,drug:drug.label,doseMg:dose,timesPerDay:times,unitsPerTime:units,dailyMg:daily,factor:drug.factor,category:drug.cat,ledd,status:'ok'}});return{rows,levodopa:medRound(levodopa)||0,da:medRound(da)||0,other:medRound(other)||0,total:medRound(levodopa+da+other)||0,unresolved,complete:rows.some(x=>x.status==='ok')&&unresolved===0}}
function saveLeddV11(machine,manual){[['machine',machine],['manual',manual]].forEach(([p,x])=>{setDerived(`ledd_${p}_levodopa`,x.complete?x.levodopa:null);setDerived(`ledd_${p}_da`,x.complete?x.da:null);setDerived(`ledd_${p}_other`,x.complete?x.other:null);setDerived(`ledd_${p}_total`,x.complete?x.total:null);setDerived(`ledd_${p}_status`,x.complete?'complete':x.rows?.length?'partial':'empty')});['levodopa','da','total'].forEach(k=>setDerived(`ledd_difference_${k}`,machine.complete&&manual.complete?medRound(manual[k]-machine[k]):null));setDerived('ledd_match_flag',machine.complete&&manual.complete?(Math.abs(manual.total-machine.total)<0.01?1:0):null);setDerived('medication_machine_parse_json',JSON.stringify(machine));setDerived('medication_manual_review_json',JSON.stringify(manual))}
function medNumberInput(value,placeholder,onchange){const i=el('input','text');i.type='number';i.min='0';i.step='0.01';i.placeholder=placeholder;i.value=value??'';i.oninput=()=>onchange(i.value);return i}
function renderMedicationWorkspaceV11(s){
  s.append(el('p','hint','機器路徑：直接貼上手寫或醫院藥單原文，由系統模糊解析。人工核對路徑：只可從內建藥物清單選擇。兩套結果及三項LEDD差異會一併保存。'));
  const raw=el('textarea');raw.placeholder='直接貼上原始藥單；每種藥物一行最佳。例：Sinemet 25/100 mg 1 tab 3 times/day';raw.value=val('medication_raw_text')||'';raw.oninput=()=>{set('medication_raw_text',raw.value)};s.append(el('h3','','A. 原始藥單機器解析'),raw);
  const parseBtn=btn('解析／重新解析藥單',()=>{set('medication_raw_text',raw.value);ST.medMachine=parseMedicationRawV11(raw.value);saveDraft();renderByFlow()},'primary');s.append(parseBtn);
  const machine=ST.medMachine||parseMedicationRawV11(val('medication_raw_text')||'');ST.medMachine=machine;
  s.append(resultBox('機器LEDD（三項）',[`Levodopa LEDD：${machine.complete?machine.levodopa:'—'} mg`,`DA LEDD：${machine.complete?machine.da:'—'} mg`,`Total LEDD：${machine.complete?machine.total:'—'} mg`,`解析：${machine.rows.length}行；Unresolved：${machine.unresolved}`,`Warnings：${machine.warnings.join('；')||'沒有'}`],machine.complete?'good':'warn'));
  if(machine.rows.length){const pre=el('pre');pre.textContent=JSON.stringify(machine.rows,null,2);s.append(pre)}
  s.append(el('h3','','B. 人工核對（內建藥物清單）'));
  s.append(btn('＋新增人工核對藥物',()=>{ST.meds.push({drugId:'',dose:'',times:'',units:''});saveDraft();renderByFlow()},'primary'));
  ST.meds.forEach((m,n)=>{const r=el('div','med-row'),sel=el('select');sel.append(new Option('-- 選擇藥物／製劑 --',''));MED_CATALOG_V11.filter(x=>x.factor!==null).forEach(x=>sel.append(new Option(`${x.label} (×${x.factor})`,x.id)));sel.value=m.drugId||'';sel.onchange=()=>{m.drugId=sel.value;saveDraft()};r.append(sel,medNumberInput(m.dose,'有效成分mg／每單位',v=>{m.dose=v;saveDraft()}),medNumberInput(m.times,'每日次數',v=>{m.times=v;saveDraft()}),medNumberInput(m.units,'每次片／單位',v=>{m.units=v;saveDraft()}),btn('刪除',()=>{ST.meds.splice(n,1);saveDraft();renderByFlow()},'linkbtn'));s.append(r)});
  const manual=calculateManualLeddV11();saveLeddV11(machine,manual);safeSave();
  s.append(resultBox('人工LEDD（三項）',[`Levodopa LEDD：${manual.complete?manual.levodopa:'—'} mg`,`DA LEDD：${manual.complete?manual.da:'—'} mg`,`Total LEDD：${manual.complete?manual.total:'—'} mg`,`未完整／未識別：${manual.unresolved}`],manual.complete?'good':'warn'));
  const d=machine.complete&&manual.complete?{l:medRound(manual.levodopa-machine.levodopa),a:medRound(manual.da-machine.da),t:medRound(manual.total-machine.total)}:null;
  s.append(resultBox('雙路徑差異',[`Levodopa差異（人工−機器）：${d?d.l+' mg':'—'}`,`DA差異（人工−機器）：${d?d.a+' mg':'—'}`,`Total差異（人工−機器）：${d?d.t+' mg':'—'}`,`核對結果：${!d?'待兩套完整':Math.abs(d.t)<0.01?'一致':'需要覆核'}`],d&&Math.abs(d.t)>=0.01?'warn':d?'good':''))
}
renderMedicationRows=function(s){renderMedicationWorkspaceV11(s)};
renderLeddPanel=function(){};
renderMedicationBF=function(s){renderMedicationWorkspaceV11(s)};
validateClinical=function(s){
  const missing=[];if(!val('updrs3_route'))missing.push('UPDRS Part III路徑');
  if(val('updrs3_route')==='hospital_total_only'&&val('updrs3_reported_total')===null)missing.push('UPDRS總分');
  if(['hospital_items','research_assessed'].includes(val('updrs3_route'))&&updrsTotal().count<33)missing.push('UPDRS 33項');
  const machine=ST.medMachine||parseMedicationRawV11(val('medication_raw_text')||''),manual=calculateManualLeddV11();
  saveLeddV11(machine,manual);
  if(!machine.complete)missing.push('機器藥單解析仍有未解決項目');
  if(!manual.complete)missing.push('人工藥物核對未完整');
  if(missing.length){showInlineError(s,'尚未完成：'+missing.join('、'));return}
  const t=updrsTotal();if(t.count===33){set('updrs3_calculated_total',t.total);set('updrs3_total',t.total)}
  setDerived('total_ledd_mg',manual.total);setDerived('levodopa_ledd_mg',manual.levodopa);setDerived('da_ledd_mg',manual.da);
  setDerived('medication_raw_text',val('medication_raw_text')||'');safeSave();submitPayload('clinical','clinical_supplement','submitted')
};

home();
})();
