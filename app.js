/* =========================================================
   APATHY GUIDED SELF-ASSESSMENT — V5 RELEASE CANDIDATE
   2026-09-10
   Hidden participant entry: ?flow=guided
   Safe dry-run entry:       ?flow=guided&dry=1

   IMPORTANT:
   - Existing home / Stage 2 / staff Screening stay unchanged.
   - Guided flow keeps its own local draft on this device.
   - Guided flow never asks identity twice.
   - Guided UI is continuous, but backend events stay split:
       1) screening_core          identity + HADS
       2) screening_core          remaining self-screening, no MoCA
       3) stage_2_questionnaires  Stage 2
   - Each checkpoint uses a field whitelist. It does NOT submit all ST.answers.
   ========================================================= */

const GUIDED_FLOW_BUILD='GUIDED-SELF-2026-09-10-V4-RC-CANTONESE-MOBILE';

const _apathyStartBase=start;
const _apathyPlayerBase=player;
const _apathyPlayerPagesBase=playerPages;
const _apathyRenderPageBase=renderPage;
const _apathyPageCompleteBase=pageComplete;
const _apathyManualNextBase=manualNext;
const _apathyRenderScaleBase=renderScale;
const _apathyAutoNextBase=autoNext;

function isGuidedFlow_(){
  return ST.flow==='guided'||/^guided_test/.test(String(ST.flow||''));
}

function guidedParam_(name){
  return new URLSearchParams(window.location.search).get(name);
}

function guidedDryRun_(){
  return /^guided_test/.test(String(ST.flow||''))||guidedParam_('dry')==='1';
}

function guidedUnique_(items){
  return Array.from(new Set((items||[]).filter(Boolean)));
}

function guidedInjectStyles_(){
  if(document.getElementById('apathy-guided-v4-style'))return;

  const old=document.getElementById('apathy-guided-v2-style');
  if(old)old.remove();

  const s=document.createElement('style');
  s.id='apathy-guided-v4-style';
  s.textContent=`
    body.guided-mode{font-size:18px}
    body.guided-mode .app{max-width:900px}
    body.guided-mode .toolbar{padding-top:10px;padding-bottom:10px}
    body.guided-mode .toolbar h1{font-size:1.25rem}
    body.guided-mode .question{padding:16px 14px;margin-top:8px;min-height:0}
    body.guided-mode .flow-head{padding:9px 14px 5px}
    body.guided-mode .flow-head h2{margin:0 0 6px}
    body.guided-mode .nav{position:sticky;bottom:0;background:rgba(255,255,255,.98);
      padding:9px 10px;border-top:1px solid #d9dee8;z-index:20}
    body.guided-mode button{min-height:48px;font-size:1rem}
    body.guided-mode button.selected,
    body.guided-mode .choice.selected,
    body.guided-mode .scale-buttons button.selected,
    body.guided-mode .direct button.selected{
      background:#145a96!important;border-color:#145a96!important;color:#fff!important;
      box-shadow:0 0 0 2px rgba(20,90,150,.16)
    }
    body.guided-mode button.selected::before,
    body.guided-mode .choice.selected::before{
      content:'✓ ';font-weight:900
    }
    body.guided-mode .guided-binary-row{border:1px solid #d7dee8;border-radius:12px;
      padding:11px;margin:9px 0;background:#fff}
    body.guided-mode .guided-binary-row strong{display:block;font-size:1.05rem;margin-bottom:4px}
    body.guided-mode .guided-example{font-size:.9rem;line-height:1.4;color:#526070;margin:4px 0}
    body.guided-mode .guided-keyword{display:inline-block;font-weight:800;padding:4px 9px;
      border-radius:999px;background:#eef4ff;margin:2px 4px 6px 0}
    body.guided-mode .guided-context{border-left:5px solid #5b78a8;padding:10px 12px;
      margin:5px 0 12px;background:#f7f9fc;border-radius:8px;line-height:1.55}
    body.guided-mode .guided-help{padding:3px 0 5px;margin:4px 0}
    body.guided-mode .guided-help>strong{font-size:.88rem;color:#58697d}
    body.guided-mode .guided-voice-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:5px}
    body.guided-mode .guided-voice-actions button{min-height:40px;padding:7px 10px;font-size:.86rem}
    body.guided-mode .guided-voice-status{font-size:.8rem;margin-top:3px;color:#667}
    body.guided-mode .guided-mini-hint{font-size:.88rem;color:#596677;margin:5px 0}
    body.guided-mode .guided-scale-hint{font-size:.88rem;color:#596677;margin:0 0 7px}
    body.guided-mode .guided-rs-wrap{overflow:auto;max-width:100%;
      border:1px solid #d7dee8;border-radius:12px;-webkit-overflow-scrolling:touch}
    body.guided-mode .guided-rs-table{display:grid;grid-template-columns:minmax(185px,1.45fr)
      repeat(7,minmax(105px,1fr));min-width:965px;background:#fff}
    body.guided-mode .guided-rs-cell{padding:8px;border-right:1px solid #e3e7ee;
      border-bottom:1px solid #e3e7ee;min-height:64px}
    body.guided-mode .guided-rs-head{position:sticky;top:0;z-index:6;background:#f1f5fb;
      font-weight:800}
    body.guided-mode .guided-rs-stem{position:sticky;left:0;z-index:5;background:#f8fafc}
    body.guided-mode .guided-rs-head.guided-rs-stem{z-index:8}
    body.guided-mode .guided-rs-domain small,
    body.guided-mode .guided-rs-stem small{display:block;font-weight:400;line-height:1.3;margin-top:3px}
    body.guided-mode .guided-rs-input{width:62px;height:50px;text-align:center;font-size:1.25rem;
      font-weight:800}
    body.guided-mode .guided-rs-input.selected{
      background:#145a96!important;color:#fff!important;border:2px solid #145a96!important
    }
    body.guided-mode .guided-score-legend{position:sticky;top:0;z-index:15;
      background:#fff8dc;border:2px solid #d9b84c;border-radius:10px;padding:9px 10px;
      margin:6px 0 9px;font-weight:700;line-height:1.4}
    body.guided-mode .guided-scenario{position:sticky;top:0;z-index:10;background:#eef4ff;
      border:2px solid #8ca8d0;border-radius:12px;padding:11px;margin-bottom:10px}
    body.guided-mode .guided-scenario strong{display:block;margin-bottom:4px}
    body.guided-mode .guided-success{font-size:1.12rem;line-height:1.6;padding:16px}
    body.guided-mode .guided-mri-summary{border:2px solid #8ca8d0;border-radius:12px;
      padding:12px;background:#f8fbff}
    @media(max-width:600px){
      body.guided-mode{font-size:18px}
      body.guided-mode .app{padding-left:0;padding-right:0}
      body.guided-mode .question{border-radius:0;border-left:0;border-right:0}
      body.guided-mode .toolbar{padding-left:10px;padding-right:10px}
      body.guided-mode .tool-actions{gap:4px}
      body.guided-mode .tool-actions button{font-size:.84rem;min-height:40px}
      body.guided-mode .options,
      body.guided-mode .scale-buttons,
      body.guided-mode .direct{gap:7px}
    }
  `;
  document.head.appendChild(s);
}

function guidedScrollTop_(){
  requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'auto'}));
}


/* Prevent rapid key presses from skipping pages.
   Guided mode also has to coexist with the legacy global key handler. */
function guidedTransitionPending_(){
  return Boolean(ST._guidedTransitionPending);
}

function guidedScheduleForward_(delay=150){
  if(guidedTransitionPending_())return false;
  ST._guidedTransitionPending=true;
  setTimeout(()=>{
    ST._guidedTransitionPending=false;
    guidedGoForward_();
  },delay);
  return true;
}

function guidedConsumeKey_(e){
  e.preventDefault();
  e.stopImmediatePropagation();
}

function guidedLatestStep_(){
  const n=Number(val('_guided_latest_step'));
  return Number.isFinite(n)&&n>=0?n:0;
}

function guidedRememberReached_(step){
  const n=Math.max(guidedLatestStep_(),Number(step)||0);
  ST.answers._guided_latest_step=n;
  saveDraft();
}

function guidedGoForward_(){
  if(guidedTransitionPending_())return false;

  const pages=guidedPages_();
  const pg=pages[ST.step];

  if(pg&&!guidedOwnNavigation_(pg)&&!pageComplete(pg)){
    ST.error='這一題還沒有完成。請完成目前內容。';
    saveDraft();
    player();
    return false;
  }

  if(ST.step<pages.length-1){
    ST.step++;
    guidedRememberReached_(ST.step);
    ST.error='';
    saveDraft();
    guidedScrollTop_();
    return player();
  }

  return false;
}

function guidedGoBack_(){
  const min=guidedMinStep_(guidedPages_());
  if(ST.step>min){
    ST.step--;
    ST.error='';
    saveDraft();
    guidedScrollTop_();
    player();
  }
}

function guidedGoLatest_(){
  const pages=guidedPages_();
  ST.step=Math.min(guidedLatestStep_(),pages.length-1);
  ST.error='';
  saveDraft();
  guidedScrollTop_();
  player();
}

function guidedIdentityKeys_(){
  return [
    'p_id','s_id',
    'participant_name',
    'dob_d','dob_m','dob_y','date_of_birth','age_years',
    'gender',
    'contact_phone',
    'pd_status_self_report','pd_hc_status','pd_duration_years_self_report',
    'education_level','education_years'
  ];
}

function guidedHadsKeys_(){
  return guidedUnique_(
    guidedIdentityKeys_()
      .concat(B.hads.items.map(x=>x.name))
      .concat([
        'hads_anxiety_total','hads_depression_total','hads_complete',
        'hads_anxiety_review','hads_depression_review','hads_mood_review'
      ])
  );
}

function guidedScreeningKeys_(){
  const keys=guidedIdentityKeys_().slice();

  quipKeys().forEach(k=>keys.push(k));
  (B.quip.additionalItems||[]).forEach(x=>{
    if(x.name)keys.push(x.name);
    if(x.detailField)keys.push(x.detailField);
  });
  keys.push('quip_complete');

  (B.quiprs.matrixCells||[]).forEach(x=>keys.push(x.name));
  keys.push(
    'quiprs_section_confirmed',
    'quiprs_a_total','quiprs_b_total','quiprs_c_total','quiprs_d_total',
    'quiprs_e1_total','quiprs_e2_total','quiprs_f_total',
    'quiprs_e_total','quiprs_ad_total','quiprs_af_total',
    'quiprs_complete','quiprs_cutoff_domains','quiprs_icd_exclusion_flag'
  );

  (B.sas.items||[]).forEach(x=>keys.push(x.name));
  keys.push('sas_total','sas_complete','sas_apathy_flag');

  if(B.rbdsq&&B.rbdsq.sourceField)keys.push(B.rbdsq.sourceField);
  (B.rbdsq.items||[]).forEach(x=>{
    keys.push(x.name);
    if(x.detailField)keys.push(x.detailField);
  });
  (B.rbdsq.diseaseItems||[]).forEach(x=>{
    keys.push(x.name);
    if(x.detailField)keys.push(x.detailField);
  });
  keys.push(
    'rbdsq_section_confirmed','rbq10_none_confirmed',
    'rbdsq_total','rbdsq_complete','rbdsq_cutoff_value','rbdsq_positive_flag'
  );

  (C.mriSafety||[]).forEach(x=>keys.push(x[0]));
  keys.push('mri_safety_none_confirmed','mri_safety_detail');

  return guidedUnique_(keys);
}

function guidedStage2Keys_(){
  const keys=guidedIdentityKeys_().slice();

  (B.gas.items||[]).forEach(x=>keys.push(x.name));
  keys.push(
    'gas_cognitive_social_total','gas_emotion_reaction_total',
    'gas_autonomy_total','gas_total','gas_complete','gas_apathy_flag'
  );

  (B.ami18.items||[]).forEach(x=>keys.push(x.name));
  keys.push(
    'ami_social_mean','ami_emotional_mean',
    'ami_behavioural_mean','ami_overall_mean','ami_complete'
  );

  (B.cdars.items||[]).forEach(x=>keys.push(x.name));
  (B.cdars.domains||[]).forEach(d=>{
    keys.push(d.example1Field||`cdars_${d.key}_example_1`);
    keys.push(d.example2Field||`cdars_${d.key}_example_2`);
    keys.push(`cdars_${d.key}_total`);
  });
  keys.push('cdars_overall_total','cdars_complete');

  (B.rgpts.items||[]).forEach(x=>keys.push(x.name));
  keys.push(
    'rgpts_reference_total','rgpts_persecutory_total',
    'rgpts_total','rgpts_complete','rgpts_review'
  );

  (B.pdi21.items||[]).forEach(x=>{
    keys.push(x.yesField);
    Object.values(x.dimensions||{}).forEach(d=>keys.push(d.name));
  });
  keys.push(
    'pdi_yes_count','pdi_distress_total','pdi_preoccupation_total',
    'pdi_conviction_total','pdi_total_severity','pdi_total',
    'pdi_complete','pdi_page1_confirmed','pdi_page2_confirmed'
  );

  for(let i=1;i<=15;i++){
    const n=String(i).padStart(2,'0');
    ['frequency','conviction','distress'].forEach(k=>keys.push(`ior${n}_${k}`));
  }
  ['frequency','conviction','distress'].forEach(k=>{
    keys.push(`ior_${k}_total`);
    keys.push(`ior_${k}_ge3_count`);
  });
  keys.push('ior_overall_total','ior_complete');

  return guidedUnique_(keys);
}

function guidedSubmissionId_(phase){
  const key=`_guided_${phase}_submission_id`;
  let id=val(key);
  if(!id){
    id=uuid();
    ST.answers[key]=id;
    saveDraft();
  }
  return String(id);
}

function guidedPayloadSubset_(phase,event,allowedKeys){
  calculateAllDerived();

  /* Keep the user's one continuous UI, but preserve the existing backend
     event boundary exactly:
       screening_core          -> screening_raw
       stage_2_questionnaires  -> stage2_raw
     Receiver routing is still authoritative by event_type. */
  const form=event==='stage_2_questionnaires'?'stage2':'screening';
  const source=payload(form,event,'submitted');
  const out={};

  [
    'schema_version','frontend_release','receiver_contract_expected',
    'form_type','event_type','workflow_stage','record_status',
    'p_id','s_id','visit_number','participant_id','submitted_at',
    'contact_phone_normalized'
  ].forEach(k=>{
    if(Object.prototype.hasOwnProperty.call(source,k))out[k]=source[k];
  });

  (allowedKeys||[]).forEach(k=>{
    if(
      Object.prototype.hasOwnProperty.call(source,k) &&
      source[k]!==undefined
    ){
      out[k]=source[k];
    }
  });

  /* Do not let shared frontend state change the Raw destination. */
  out.event_type=event;
  out.form_type=form;
  out.workflow_stage=event==='stage_2_questionnaires'?'stage_2':'stage_1';

  out.submission_id=guidedSubmissionId_(phase);
  out.workflow_part=`guided_${phase}`;
  out.data_source='participant_remote';

  const phone=String(out.contact_phone_normalized||out.contact_phone||'')
    .replace(/\D/g,'')
    .replace(/^852(?=\d{8}$)/,'');
  out.participant_id=
    out.p_id||
    out.s_id||
    (phone.length===8?`PHONE-${phone}`:`TEMP-${out.submission_id}`);

  return out;
}

async function guidedPostPhase_(phase,event,keys){
  const snapshot=guidedPayloadSubset_(phase,event,keys);

  if(guidedDryRun_()){
    console.info('GUIDED_DRY_RUN',phase,snapshot);
    await new Promise(resolve=>setTimeout(resolve,220));
    return{
      ok:true,
      dry_run:true,
      sheet:event==='stage_2_questionnaires'?'stage2_raw':'screening_raw'
    };
  }

  return receiverPostDirectFinal_(snapshot);
}


/* Guided backup contains actual participant-entered fields + local progress.
   It does NOT call calculateAllDerived(), so untouched later questionnaires
   do not appear as misleading complete=0/default output fields. */
function guidedBackupAnswerKeys_(){
  const keys=guidedIdentityKeys_().slice();

  (B.hads.items||[]).forEach(x=>keys.push(x.name));

  quipKeys().forEach(k=>keys.push(k));
  (B.quip.additionalItems||[]).forEach(x=>{
    if(x.name)keys.push(x.name);
    if(x.detailField)keys.push(x.detailField);
  });

  (B.quiprs.matrixCells||[]).forEach(x=>keys.push(x.name));
  (B.sas.items||[]).forEach(x=>keys.push(x.name));

  if(B.rbdsq&&B.rbdsq.sourceField)keys.push(B.rbdsq.sourceField);
  (B.rbdsq.items||[]).forEach(x=>{
    keys.push(x.name);
    if(x.detailField)keys.push(x.detailField);
  });
  (B.rbdsq.diseaseItems||[]).forEach(x=>{
    keys.push(x.name);
    if(x.detailField)keys.push(x.detailField);
  });

  (C.mriSafety||[]).forEach(x=>keys.push(x[0]));
  keys.push('mri_safety_detail');

  (B.gas.items||[]).forEach(x=>keys.push(x.name));
  (B.ami18.items||[]).forEach(x=>keys.push(x.name));

  (B.cdars.items||[]).forEach(x=>keys.push(x.name));
  (B.cdars.domains||[]).forEach(d=>{
    keys.push(d.example1Field||`cdars_${d.key}_example_1`);
    keys.push(d.example2Field||`cdars_${d.key}_example_2`);
  });

  (B.rgpts.items||[]).forEach(x=>keys.push(x.name));

  (B.pdi21.items||[]).forEach(x=>{
    keys.push(x.yesField);
    Object.values(x.dimensions||{}).forEach(d=>keys.push(d.name));
  });

  for(let i=1;i<=15;i++){
    const n=String(i).padStart(2,'0');
    ['frequency','conviction','distress'].forEach(k=>keys.push(`ior${n}_${k}`));
  }

  return guidedUnique_(keys);
}

function guidedDownloadBackup_(){
  const answers={};

  guidedBackupAnswerKeys_().forEach(k=>{
    const v=ST.answers[k];
    if(v!==undefined&&v!==null&&v!=='')answers[k]=v;
  });

  const localState={
    workflow:ST.flow,
    downloaded_at:new Date().toISOString(),
    guided_build:GUIDED_FLOW_BUILD,
    question_bank_version:B.version||'',
    step:ST.step,
    latest_step:guidedLatestStep_(),
    submission:ST.submission,
    checkpoints:{
      hads_submitted:Number(val('_guided_hads_submitted'))===1,
      hads_passed:Number(val('_guided_hads_passed'))===1,
      hads_blocked:Number(val('_guided_hads_blocked'))===1,
      screening_submitted:Number(val('_guided_screening_submitted'))===1,
      stage2_submitted:Number(val('_guided_stage2_submitted'))===1
    },
    answers
  };

  const blob=new Blob(
    [JSON.stringify(localState,null,2)],
    {type:'application/json;charset=utf-8'}
  );
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`apathy_guided_backup_${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}


/* ---------- Staff-reviewed HADS resume, same participant link ---------- */

function guidedReceiverJsonp_(params,timeoutMs=12000){
  return new Promise((resolve,reject)=>{
    const cb='__apathyGuidedResume_'+Date.now()+'_'+Math.random().toString(36).slice(2);
    const script=document.createElement('script');
    let finished=false;

    const cleanup=()=>{
      if(finished)return;
      finished=true;
      try{delete window[cb];}catch(_){window[cb]=undefined;}
      if(script.parentNode)script.parentNode.removeChild(script);
    };

    const timer=setTimeout(()=>{
      cleanup();
      reject(new Error('RESUME_STATUS_TIMEOUT'));
    },timeoutMs);

    window[cb]=data=>{
      clearTimeout(timer);
      cleanup();
      resolve(data||{});
    };

    const query=new URLSearchParams(
      Object.assign({},params,{callback:cb})
    );
    script.src=C.receiverUrl+'?'+query.toString();
    script.async=true;
    script.onerror=()=>{
      clearTimeout(timer);
      cleanup();
      reject(new Error('RESUME_STATUS_NETWORK_ERROR'));
    };
    document.head.appendChild(script);
  });
}

function guidedHadsSubmissionId_(){
  return String(val('_guided_hads_submission_id')||'').trim();
}

function guidedApplyStaffResume_(serverResult){
  /* This is a workflow permission only.
     Keep the submitted HADS evidence and scores unchanged. */
  ST.answers._guided_hads_blocked=0;
  ST.answers._guided_hads_passed=1;
  ST.answers._guided_hads_staff_override=1;
  ST.answers._guided_hads_staff_override_at=
    String(serverResult&&serverResult.allowed_at||new Date().toISOString());

  const pages=guidedPages_();
  const gate=pages.findIndex(x=>x.kind==='guidedHadsGate');
  ST.step=Math.max(0,gate+1);
  guidedRememberReached_(ST.step);
  ST.error='';
  saveDraft();
  guidedScrollTop_();
  player();
}

async function guidedCheckResume_(status,button,automatic){
  if(guidedDryRun_()){
    if(status)status.textContent='測試模式不查詢工作人員解鎖狀態。';
    return;
  }

  const submissionId=guidedHadsSubmissionId_();
  if(!submissionId){
    if(status)status.textContent='未找到本機的情緒問卷提交記錄，請聯絡研究人員。';
    return;
  }

  if(button)button.disabled=true;
  if(status)status.textContent=automatic?'正在檢查研究人員是否已確認……':'正在檢查……';

  try{
    const result=await guidedReceiverJsonp_({
      action:'guided_resume_status',
      submission_id:submissionId
    });

    if(result&&result.ok&&result.allowed){
      if(status)status.textContent='研究人員已確認，可以繼續填寫。';
      return guidedApplyStaffResume_(result);
    }

    if(status){
      status.textContent='研究人員目前仍在確認。請等待通知後再按「檢查是否可以繼續」。';
    }
  }catch(err){
    if(status){
      status.textContent='暫時未能連線檢查。已填寫的資料仍保存在這部裝置。';
    }
  }finally{
    if(button)button.disabled=false;
  }
}

/* ---------- Plain-language / voice guidance ---------- */

function guidedVoiceState_(){
  if(!ST._guidedVoiceSession)ST._guidedVoiceSession={};
  return ST._guidedVoiceSession;
}

function guidedStopVoice_(){
  if('speechSynthesis' in window)window.speechSynthesis.cancel();
}


function guidedCantoneseVoice_(){
  if(!('speechSynthesis' in window))return null;

  const voices=window.speechSynthesis.getVoices()||[];

  return voices.find(v=>/^zh[-_]HK$/i.test(String(v.lang||'')))||
    voices.find(v=>/^yue/i.test(String(v.lang||'')))||
    voices.find(v=>/cantonese|hong\s*kong|hiugaai|tracy/i.test(String(v.name||'')))||
    null;
}

function guidedSpeak_(text,status){
  if(!('speechSynthesis' in window)){
    if(status)status.textContent='此裝置未提供語音功能。';
    return;
  }

  guidedStopVoice_();

  const speakNow=()=>{
    const voice=guidedCantoneseVoice_();

    if(!voice){
      if(status)status.textContent='此裝置未找到廣東話語音，可直接按畫面提示作答。';
      return;
    }

    const u=new SpeechSynthesisUtterance(String(text||''));
    u.voice=voice;
    u.lang=voice.lang||'zh-HK';
    u.rate=0.88;

    if(status)status.textContent='正在播放廣東話提示……';
    u.onend=()=>{if(status)status.textContent='語音提示播放完成。';};
    u.onerror=()=>{if(status)status.textContent='語音播放失敗，可按「再聽一次」。';};
    window.speechSynthesis.speak(u);
  };

  const voices=window.speechSynthesis.getVoices()||[];

  if(voices.length){
    speakNow();
    return;
  }

  let done=false;
  const later=()=>{
    if(done)return;
    done=true;
    window.speechSynthesis.removeEventListener?.('voiceschanged',later);
    speakNow();
  };

  window.speechSynthesis.addEventListener?.('voiceschanged',later,{once:true});
  setTimeout(later,500);
}

function guidedVoiceBox_(id,title,text,a,autoPlay=true){
  const box=el('div','guided-help');
  box.append(el('strong','',title||'語音提示'));

  const status=el('div','guided-voice-status','');
  const actions=el('div','guided-voice-actions');

  actions.append(
    btn('▶ 再聽一次',()=>guidedSpeak_(text,status),'secondary'),
    btn('■ 停止語音',()=>{
      guidedStopVoice_();
      status.textContent='語音已停止。';
    },'secondary')
  );

  box.append(actions,status);
  a.append(box);

  if(autoPlay){
    const state=guidedVoiceState_();
    if(!state[id]){
      state[id]=1;
      setTimeout(()=>guidedSpeak_(text,status),180);
    }
  }
}

const GUIDED_QUIP_STEM_HELP={
  1:{word:'覺得困擾',text:'第一題看這件事有沒有帶來困擾或生活上的不便。'},
  2:{word:'不停想',text:'第二題看這個想法會不會反覆出現、很難從腦中停下來，或因此感到內疚。'},
  3:{word:'不做會焦躁',text:'第三題看衝動有多強，以及不能做時會不會焦躁、煩躁或難受。'},
  4:{word:'越做越多',text:'第四題看這個行為會不會越來越多，或開始後很難減少和停止。'},
  5:{word:'違規也要做',text:'第五題看會不會為了繼續這個行為，隱瞞、借錢、囤積，甚至做出違反規則的事情。'}
};

function guidedQuipExtraHelp_(item){
  const code=String(item.code||'').toUpperCase();

  const map={
    F1:['服用超過處方','例如醫生處方每天二百毫克，你自己決定服用二百五十毫克。'],
    F2:['自行增加劑量','例如為了身體或心情的效果，自己把帕金遜病藥物加多。'],
    F3:['很難減少','例如想把藥減回原來劑量時很難做到，減少後又很想加回去。'],
    F4:['設法取得更多','例如囤藥、尋找其他藥物來源，讓自己可以繼續多服。'],
    E1:['一個任務做很久','例如長時間沉浸在修理、園藝、寫作或收集等一項有目的的活動。'],
    E2:['重複同一動作','例如反覆整理、檢查、分類、清潔或排列物品。'],
    E3:['長時間漫遊','例如沒有明確目的地長時間走路或駕駛。']
  };

  const hit=map[code]||['重點','請按題目內容回答。'];
  return{word:hit[0],text:hit[1]};
}

function guidedRsStemHelp_(index){
  const map={
    1:'想法：腦中有多常想到。',
    2:'衝動：有多常很想去做，或不能做時很難受。',
    3:'控制：有多常停不下來、減不下來。',
    4:'設法繼續：有多常為了繼續而隱瞞、借錢、囤積或找方法。'
  };
  return map[index]||'';
}

/* ---------- Page composition ---------- */

function guidedRbSelfValue_(){
  const opts=(B.rbdsq&&B.rbdsq.sourceOptions)||[];
  const self=opts.find(o=>/本人|自己|participant|self/i.test(String(o.label||'')));
  return self?self.value:(opts[0]?opts[0].value:1);
}

function guidedMakeQuipPages_(p){
  B.quip.sharedStems.forEach(st=>{
    p.push({
      section:'行為與衝動',
      kind:'guidedQuipStem',
      label:`第 ${st.index} 題：${st.shortLabel}`,
      stem:st
    });
  });

  const f=(B.quip.additionalItems||[]).filter(x=>String(x.code||'').startsWith('F'));
  const e=(B.quip.additionalItems||[]).filter(x=>String(x.code||'').startsWith('E'));

  f.forEach(item=>p.push({
    section:'藥物使用',
    kind:'guidedQuipBinary',
    label:item.backfillLabel||item.fullLabel,
    item
  }));

  e.forEach(item=>p.push({
    section:'重複行為',
    kind:'guidedQuipBinary',
    label:item.backfillLabel||item.fullLabel,
    item
  }));
}

function guidedMakeRbPages_(p){
  (B.rbdsq.items||[]).forEach((item,index)=>{
    p.push({
      section:'睡眠情況',
      kind:'guidedRbBinary',
      label:`睡眠 ${index+1}/${B.rbdsq.items.length}`,
      item,
      disease:false
    });
  });

  (B.rbdsq.diseaseItems||[]).forEach((item,index)=>{
    p.push({
      section:'健康情況',
      kind:'guidedRbBinary',
      label:`健康情況 ${index+1}/${B.rbdsq.diseaseItems.length}`,
      item,
      disease:true
    });
  });
}

function guidedMakeMriPages_(p){
  (C.mriSafety||[]).forEach((x,index)=>{
    p.push({
      section:'MRI安全資料',
      kind:'guidedMriSafetyBinary',
      label:`MRI安全 ${index+1}/${C.mriSafety.length}`,
      key:x[0],
      text:x[1]
    });
  });

  p.push({
    section:'MRI安全資料',
    kind:'guidedMriSummary',
    label:'MRI資料核對'
  });
}

function guidedFriendlyStage2Pages_(){
  const pages=[];
  const original=stage2Pages().filter(
    (pg,index)=>index>=2&&pg.kind!=='stage2Summary'
  );

  original.forEach(pg=>{
    if(pg.section==='IOR'&&pg.kind==='iorScenario'){
      const scenarioText=pg.scenarioText;

      [
        ['frequency','出現頻率','這件事出現得多不多。不是問你相信不相信。'],
        ['conviction','相信程度','如果這件事發生，你有多相信這個想法是真的。不是問出現次數。'],
        ['distress','不安程度','這個情境令你有多不安或難受。不是問你有多相信。']
      ].forEach(d=>{
        pages.push({
          section:'社交情境',
          kind:'guidedIorDimension',
          label:`情境 ${pg.scenario}｜${d[1]}`,
          scenario:pg.scenario,
          scenarioText,
          dimension:d[0],
          dimensionLabel:d[1],
          explanation:d[2]
        });
      });

      return;
    }

    if(pg.section==='PDI-21'&&pg.kind==='pdiItem'){
      pages.push(Object.assign({},pg,{
        section:'日常想法',
        kind:'guidedPdiItem'
      }));
      return;
    }

    const names={
      'GAS':'日常動機與感受',
      'AMI-18':'活動與興趣',
      'C-DARS':'日常活動體驗',
      'R-GPTS':'想法與感受'
    };

    pages.push(Object.assign({},pg,{
      section:names[pg.section]||pg.section
    }));
  });

  return pages;
}

function guidedPages_(){
  const p=[];

  p.push(inputPage('基本資料','姓名','participant_name','請輸入姓名'));
  p.push({section:'基本資料',kind:'dob',label:'出生日期'});
  p.push(choicePage('基本資料','性別','gender',[['M','男'],['F','女']]));
  p.push(choicePage(
    '基本資料',
    '您是否已被醫生診斷為帕金遜病？',
    'pd_status_self_report',
    [[1,'是'],[0,'否']]
  ));

  if(Number(val('pd_status_self_report'))===1){
    p.push({
      section:'基本資料',
      kind:'guidedPdYears',
      label:'大約患帕金遜病多少年？'
    });
  }

  p.push(inputPage('基本資料','聯絡電話','contact_phone','例：9123 4567'));
  p.push({
    section:'基本資料',
    kind:'guidedEducation',
    label:'教育程度及實際受教育年數'
  });

  addScalePages(p,'情緒問卷',B.hads.items);

  p.push({
    section:'情緒問卷',
    kind:'guidedHadsGate',
    label:'正在保存情緒問卷'
  });

  guidedMakeQuipPages_(p);

  p.push({
    section:'行為頻率',
    kind:'guidedQuipRsMatrix',
    label:'過去4星期的行為頻率'
  });

  addScalePages(
    p,
    '日常動機',
    B.sas.items.map((x,n)=>({
      name:x.name,
      fullLabel:x.fullLabel,
      options:x.responseOptions.map((o,j)=>({
        label:o.label,
        value:B.sas.scoring.displayOrderByItem[n+1][j]
      }))
    }))
  );

  guidedMakeRbPages_(p);
  guidedMakeMriPages_(p);

  p.push({
    section:'第一部分完成',
    kind:'guidedScreeningCheckpoint',
    label:'正在保存第一部分'
  });

  guidedFriendlyStage2Pages_().forEach(pg=>p.push(pg));

  p.push({
    section:'完成',
    kind:'guidedFinal',
    label:'正在提交'
  });

  return p;
}

/* ---------- Renderers ---------- */

function guidedRenderVoiceInfo_(pg,a){
  guidedVoiceBox_(pg.voiceId,pg.title,pg.body,a,true);
}



function guidedRenderInput_(pg,a){
  const i=el('input','text');
  i.placeholder=pg.placeholder||'';
  i.value=val(pg.key)??'';
  if(pg.key==='contact_phone')i.inputMode='tel';

  i.oninput=()=>set(pg.key,i.value);

  i.onkeydown=e=>{
    if(e.key==='Enter'&&String(i.value||'').trim()){
      e.preventDefault();
      e.stopPropagation();
      guidedScheduleForward_(100);
    }
  };

  a.append(i);
}

function guidedRenderChoice_(pg,a){
  const g=el('div','direct');

  a.append(
    el('p','guided-scale-hint',`電腦可按 1–${pg.options.length}。`)
  );

  pg.options.forEach(o=>{
    g.append(btn(
      o[1],
      ()=>{
        set(pg.key,o[0]);

        if(pg.key==='pd_status_self_report'){
          set('pd_hc_status',Number(o[0])===1?'PD':'HC');

          if(Number(o[0])===0){
            set('pd_duration_years_self_report',null);
          }
        }

        ST.error='';
        guidedScheduleForward_(150);
      },
      'choice'+(sameValue(val(pg.key),o[0])?' selected':'')
    ));
  });

  a.append(g);
}

function guidedRenderPdYears_(a){
  const f=el('div','field');
  f.append(
    el('label','','大約年數'),
    el('p','guided-mini-hint','例如：5 年、8.5 年。大約即可。')
  );
  const i=el('input','text');
  i.type='number';
  i.inputMode='decimal';
  i.min='0';
  i.max='80';
  i.step='0.5';
  i.placeholder='例如 5';
  i.value=val('pd_duration_years_self_report')??'';
  i.oninput=()=>{
    const n=i.value===''?null:Number(i.value);
    set('pd_duration_years_self_report',n);
  };
  i.onkeydown=e=>{
    if(guidedEnterKey_(e)&&i.value!==''){
      e.preventDefault();
      e.stopPropagation();
      guidedScheduleForward_(100);
    }
  };
  f.append(i);
  a.append(f);
}


function guidedEducationMeta_(code){
  const map={
    none:{label:'沒有正規教育（約0年）',min:0},
    p1_3:{label:'小學三年或以下（約1–3年）',min:1},
    p4_6:{label:'小學四至六年（約4–6年）',min:4},
    j1_3:{label:'初中（約7–9年）',min:7},
    s4_6:{label:'高中／預科（約10–12年）',min:10},
    postsec:{label:'專上非學位（約13年起）',min:13},
    bachelor:{label:'學士（約16年）',min:16},
    postgrad:{label:'研究生教育（約17年起）',min:17},
    other:{label:'其他／不清楚',min:null}
  };

  return map[String(code)]||{label:String(code||''),min:null};
}

function guidedRenderEducation_(a){
  const g=el('div','direct');

  a.append(
    el(
      'p',
      'guided-scale-hint',
      '請先選最高教育程度。括號是常見受教育年數範圍；下方可改成實際年數。電腦可按 1–9。'
    )
  );

  C.education.forEach(o=>{
    const meta=guidedEducationMeta_(o[0]);

    g.append(btn(
      meta.label,
      ()=>{
        const changed=val('education_level')!==o[0];
        set('education_level',o[0]);

        if(changed){
          set('education_years',meta.min);
        }

        player();
      },
      'choice'+(val('education_level')===o[0]?' selected':'')
    ));
  });

  a.append(g);

  if(present('education_level')){
    const f=el('div','field');
    f.append(el('label','','實際接受全日制教育多少年？'));

    const i=el('input','text');
    i.type='number';
    i.inputMode='numeric';
    i.min='0';
    i.max='40';
    i.placeholder='請填實際年數';
    i.value=val('education_years')??'';

    i.oninput=()=>set(
      'education_years',
      i.value===''?null:Number(i.value)
    );

    i.onkeydown=e=>{
      if(guidedEnterKey_(e)&&i.value!==''){
        e.preventDefault();
        e.stopPropagation();
        guidedScheduleForward_(100);
      }
    };

    f.append(i);
    a.append(f);
  }
}

function guidedBinaryButtons_(key,onAnswer){
  const yesSelected=Number(val(key))===1;
  const noSelected=Number(val(key))===0;
  const g=el('div','direct');

  g.append(
    btn(
      '是',
      ()=>onAnswer(1),
      'choice'+(yesSelected?' selected':'')
    ),
    btn(
      '否',
      ()=>onAnswer(0),
      'choice'+(noSelected?' selected':'')
    )
  );

  return g;
}

function guidedQuipStemKeys_(stemIndex){
  return B.quip.domains.map(d=>`quip_${d.key}${stemIndex}_yes`);
}


function guidedQuipQuestion_(stemIndex,domainLabel){
  const d=String(domainLabel||'這項行為');

  const q={
    1:`您自己、家人或醫生是否覺得您在「${d}」方面的行為已帶來困擾或生活上的不便？`,
    2:`您是否會反覆想到「${d}」，很難把相關想法停下來，或因相關想法和行為感到內疚？`,
    3:`您是否對「${d}」有很強的衝動或渴望，不能進行時會感到焦躁、煩躁或難受？`,
    4:`您是否覺得「${d}」越做越多，或開始後很難減少和停止？`,
    5:`您是否會為了繼續「${d}」而想辦法，例如隱瞞、借錢、囤積，或做出違反規則的事情？`
  };

  return q[stemIndex]||d;
}

function guidedQuipContextText_(){
  if(Number(val('pd_status_self_report'))===1){
    return '帕金遜病和部分多巴胺能藥物可伴隨衝動控制或重複行為改變。部分患者原本能控制賭博、購物、飲食或其他行為，後來變得更難控制。請回想帕金遜病發作以來，曾持續至少四星期的情況。';
  }

  return '這部分了解衝動控制和重複行為。請回想曾持續至少四星期的情況，逐項選「是」或「否」。';
}

function guidedQuipVoiceText_(){
  if(Number(val('pd_status_self_report'))===1){
    return '接下來問衝動控制和重複行為。有些帕金遜病患者在使用多巴胺能藥物後，會發現以前能控制的行為變得難控制。比如以前很少賭博，後來開始沉迷賭博；以前購物和飲食很有節制，後來購物或暴飲暴食越來越多。請回想帕金遜病發作以來，曾持續至少四星期的情況。每一項都選是或否。';
  }

  return '接下來問衝動控制和重複行為。請回想曾持續至少四星期的情況。每一項都選是或否。';
}

function guidedRenderQuipStem_(pg,a){
  const help=GUIDED_QUIP_STEM_HELP[pg.stem.index];

  if(pg.stem.index===1){
    a.append(el('div','guided-context',guidedQuipContextText_()));
    guidedVoiceBox_(
      'quip-context',
      '🔊 廣東話語音提示',
      guidedQuipVoiceText_(),
      a,
      true
    );
  }

  a.append(
    el('span','guided-keyword','這題重點：'+help.word),
    el('p','guided-scale-hint','每一項都選「是」或「否」。電腦可按 1＝是，2＝否。')
  );

  const keys=guidedQuipStemKeys_(pg.stem.index);

  B.quip.domains.forEach(d=>{
    const key=`quip_${d.key}${pg.stem.index}_yes`;
    const row=el('div','guided-binary-row');

    row.append(
      el('strong','',guidedQuipQuestion_(pg.stem.index,d.fullLabel))
    );

    if(d.description){
      row.append(el('div','guided-example','例如：'+String(d.description).replace(/[。.]$/,'')));
    }

    row.append(guidedBinaryButtons_(key,value=>{
      set(key,value);
      ST.error='';

      if(keys.every(present)){
        guidedScheduleForward_(180);
      }else{
        player();
      }
    }));

    a.append(row);
  });

  guidedVoiceBox_(
    `quip-stem-${pg.stem.index}`,
    '🔊 這一題的語音提示',
    help.text,
    a,
    true
  );
}

function guidedRenderQuipBinary_(pg,a){
  const item=pg.item;
  const help=guidedQuipExtraHelp_(item);

  a.append(
    el('span','guided-keyword','重點：'+help.word),
    el('p','',item.fullLabel||''),
    el('p','guided-scale-hint','電腦可按 1＝是，2＝否。')
  );

  guidedVoiceBox_(
    `quip-extra-${item.code||item.name}`,
    '🔊 廣東話語音提示',
    help.text,
    a,
    true
  );

  const choose=value=>{
    set(item.name,value);
    ST.error='';

    if(value===0){
      if(item.detailField)set(item.detailField,null);
      return guidedScheduleForward_(180);
    }

    if(!item.detailField){
      return guidedScheduleForward_(180);
    }

    player();
  };

  a.append(guidedBinaryButtons_(item.name,choose));

  if(item.detailField&&val(item.name)===1){
    const f=el('div','field');
    f.append(el('label','',item.detailPrompt||'請簡單描述'));

    const t=el('textarea');
    t.placeholder='簡單寫幾個字即可';
    t.value=val(item.detailField)||'';
    t.oninput=()=>set(item.detailField,t.value);

    t.onkeydown=e=>{
      if(guidedEnterKey_(e)&&!e.shiftKey&&String(t.value||'').trim()){
        e.preventDefault();
        e.stopPropagation();
        guidedScheduleForward_(100);
      }
    };

    f.append(t);
    a.append(f);
  }
}

function guidedRsSetAllZero_(){
  B.quiprs.matrixCells.forEach(x=>ST.answers[x.name]=0);
  ST.answers.quiprs_section_confirmed='none';
  saveDraft();
  player();
}

function guidedRsCommitCell_(input,cell,value){
  ST.answers[cell.name]=value;
  const complete=B.quiprs.matrixCells.every(x=>present(x.name));
  ST.answers.quiprs_section_confirmed=complete?'answered':'grid_pending';
  saveDraft();
  input.value=String(value);
  input.classList.add('selected');

  const all=qa('.guided-rs-input');
  const next=all[all.indexOf(input)+1];
  if(next){
    requestAnimationFrame(()=>next.focus({preventScroll:true}));
  }
}

function guidedRenderQuipRs_(a){
  const legend=el(
    'div',
    'guided-score-legend',
    '怎樣給分：0＝從不　1＝極少　2＝有時　3＝經常　4＝非常頻繁'
  );
  a.append(legend);

  const voiceText='請看過去四星期。零是從不，一是極少，二是有時，三是經常，四是非常頻繁。第一行問想到的頻率；第二行問衝動和難受；第三行問控制困難；第四行問為了繼續而採取行動。藥物使用的例子：醫生處方每天二百毫克，你自己決定服用二百五十毫克。';
  guidedVoiceBox_(
    'quiprs-grid-help',
    '🔊 廣東話填表提示',
    voiceText,
    a,
    true
  );

  const wrap=el('div','guided-rs-wrap');
  const grid=el('div','guided-rs-table');

  const corner=el(
    'div',
    'guided-rs-cell guided-rs-head guided-rs-stem',
    '問題重點'
  );
  corner.append(el('small','','向右滑可以看其他行為'));
  grid.append(corner);

  B.quiprs.domains.forEach(d=>{
    const h=el('div','guided-rs-cell guided-rs-head guided-rs-domain');
    h.append(el('strong','',d.fullLabel));

    let desc=d.description||'';
    if(String(d.key).toLowerCase()==='f'){
      desc='例如醫生處方200 mg，自己決定服用250 mg。';
    }

    if(desc)h.append(el('small','',desc));
    grid.append(h);
  });

  B.quiprs.sharedStems.forEach(st=>{
    const stem=el('div','guided-rs-cell guided-rs-stem');

    stem.append(
      el('strong','',`${st.index}. ${st.shortLabel}`),
      el('small','',guidedRsStemHelp_(st.index)),
      el('small','',st.fullText)
    );
    grid.append(stem);

    B.quiprs.domains.forEach(d=>{
      const cell=B.quiprs.matrixCells.find(
        x=>x.stemIndex===st.index&&x.domain===d.key.toUpperCase()
      );

      const box=el('div','guided-rs-cell');
      const i=el('input','guided-rs-input');
      i.inputMode='numeric';
      i.pattern='[0-4]';
      i.maxLength=1;
      i.placeholder='0–4';
      i.dataset.key=cell.name;
      i.value=val(cell.name)??'';

      if(i.value!=='')i.classList.add('selected');

      i.onkeydown=e=>{
        const n=guidedNumericKey_(e);

        if(n!==null&&n>=0&&n<=4){
          e.preventDefault();
          e.stopPropagation();
          guidedRsCommitCell_(i,cell,n);
          return;
        }

        if(guidedEnterKey_(e)){
          e.preventDefault();
          e.stopPropagation();

          const all=qa('.guided-rs-input');
          const next=all[all.indexOf(i)+1];
          if(next)next.focus({preventScroll:true});
          return;
        }

        if(![
          'Tab','Shift','Backspace','Delete',
          'ArrowLeft','ArrowRight','ArrowUp','ArrowDown'
        ].includes(e.key)){
          e.preventDefault();
        }
      };

      i.oninput=()=>{
        const raw=String(i.value||'').replace(/[^0-4]/g,'').slice(-1);

        if(raw===''){
          ST.answers[cell.name]=null;
          ST.answers.quiprs_section_confirmed='grid_pending';
          i.value='';
          i.classList.remove('selected');
          saveDraft();
          return;
        }

        guidedRsCommitCell_(i,cell,Number(raw));
      };

      box.append(i);
      grid.append(box);
    });
  });

  wrap.append(grid);
  a.append(wrap);

  const count=B.quiprs.matrixCells.filter(x=>present(x.name)).length;

  a.append(
    el('div','result',`已填寫 ${count}/28。空白表示還未回答；0表示從不。`)
  );

  a.append(
    btn(
      '28格全部都是「從不」',
      guidedRsSetAllZero_,
      'secondary'
    )
  );

  if(count===28&&val('quiprs_section_confirmed')!=='answered'){
    ST.answers.quiprs_section_confirmed='answered';
    saveDraft();
  }
}

function guidedRenderRbBinary_(pg,a){
  const item=pg.item;

  if(B.rbdsq&&B.rbdsq.sourceField&&!present(B.rbdsq.sourceField)){
    ST.answers[B.rbdsq.sourceField]=guidedRbSelfValue_();
    saveDraft();
  }

  if(!pg.disease&&item===(B.rbdsq.items||[])[0]){
    a.append(
      el(
        'div',
        'guided-context',
        '請想過去一個月。至少出現3次才選「是」；偶爾1–2次選「否」。'
      )
    );

    guidedVoiceBox_(
      'rb-inline-help',
      '🔊 廣東話填寫提示',
      '接下來問過去一個月的睡眠情況。至少出現三次才選是。偶爾一兩次選否。每一題都選是或否。',
      a,
      true
    );
  }

  if(pg.disease&&item===(B.rbdsq.diseaseItems||[])[0]){
    a.append(
      el('div','guided-context','接下來是健康情況。每一項都選「是」或「否」。')
    );
  }

  a.append(
    el('p','',item.fullLabel||item.question||item.label||''),
    el('p','guided-scale-hint','電腦可按 1＝是，2＝否。')
  );

  const choose=value=>{
    set(item.name,value);
    ST.error='';

    if(value===0){
      if(item.detailField)set(item.detailField,null);
      guidedScheduleForward_(180);
      return;
    }

    if(!item.detailField){
      guidedScheduleForward_(180);
      return;
    }

    player();
  };

  a.append(guidedBinaryButtons_(item.name,choose));

  if(item.detailField&&val(item.name)===1){
    const f=el('div','field');
    f.append(el('label','','請簡單說明'));

    const t=el('textarea');
    t.placeholder='簡單寫幾個字即可';
    t.value=val(item.detailField)||'';
    t.oninput=()=>set(item.detailField,t.value);

    t.onkeydown=e=>{
      if(guidedEnterKey_(e)&&!e.shiftKey&&String(t.value||'').trim()){
        e.preventDefault();
        e.stopPropagation();
        guidedScheduleForward_(100);
      }
    };

    f.append(t);
    a.append(f);
  }
}

function guidedMriMessage_(text){
  const x=String(text||'');
  if(/心臟|起搏|pacemaker/i.test(x)){
    return '如果這一項是「是」，本研究會先暫停掃描安排，由研究人員核對心臟裝置的型號和安全資料。';
  }
  if(/刺激|stimulator|神經/i.test(x)){
    return '如果這一項是「是」，本研究會先暫停掃描安排，由研究人員核對神經刺激裝置的種類和安全資料。';
  }
  if(/假牙|牙|denture/i.test(x)){
    return '如果這一項是「是」，研究人員會再核對假牙數量、材料和固定方式。本研究會特別核對是否有10顆或以上。';
  }
  return '如果選「是」，研究人員會再向你核對具體資料，再判斷是否適合 MRI。';
}

function guidedUpdateMriNoneFlag_(){
  const keys=(C.mriSafety||[]).map(x=>x[0]);
  if(!keys.every(present)){
    ST.answers.mri_safety_none_confirmed=0;
    return;
  }
  ST.answers.mri_safety_none_confirmed=
    keys.some(k=>Number(val(k))===1)?0:1;
}


function guidedMriYesItems_(){
  return (C.mriSafety||[])
    .filter(x=>Number(val(x[0]))===1)
    .map(x=>x[1]);
}

function guidedRenderMriSummary_(a){
  const yes=guidedMriYesItems_();
  const box=el('div','guided-mri-summary');

  if(yes.length){
    box.append(
      el('strong','','你回答「是」的項目：'),
      el('p','',yes.join('、')),
      el(
        'p',
        '',
        '工作人員會再核對具體資料，再安排 MRI。心臟起搏器／植入式心臟除顫器和神經刺激器會按本研究流程先暫停掃描安排；牙科裝置如涉及假牙，工作人員會特別核對是否達到本研究的10顆門檻。'
      )
    );
  }else{
    box.append(
      el('p','','MRI安全資料已全部回答。')
    );
  }

  a.append(
    box,
    btn(
      '我已核對，繼續',
      ()=>{
        set('_guided_mri_summary_confirmed',1);
        guidedScheduleForward_(100);
      },
      'primary'+(Number(val('_guided_mri_summary_confirmed'))===1?' selected':'')
    )
  );
}

function guidedRenderMriSafety_(pg,a){
  if(pg.key===C.mriSafety[0][0]){
    a.append(
      el(
        'div',
        'guided-context',
        '請逐項選「是」或「否」。有回答「是」的項目，工作人員會在最後再跟你核對具體資料。'
      )
    );

    guidedVoiceBox_(
      'mri-inline-help',
      '🔊 廣東話填寫提示',
      '接下來是 MRI 安全資料。每一項都選是或否。有回答是的項目，工作人員會在最後再跟你核對具體資料。',
      a,
      true
    );
  }

  a.append(
    el('p','',pg.text),
    el('p','guided-scale-hint','電腦可按 1＝是，2＝否。')
  );

  const choose=value=>{
    set(pg.key,value);
    guidedUpdateMriNoneFlag_();
    ST.error='';
    guidedScheduleForward_(180);
  };

  a.append(guidedBinaryButtons_(pg.key,choose));
}



function guidedCdarsExamplePlaceholders_(domainKey){
  const map={
    pastimes:['例如：看電視','例如：行公園'],
    food_drink:['例如：咖啡','例如：雲吞麵'],
    social:['例如：和家人飲茶','例如：和朋友聊天'],
    sensory:['例如：聽音樂','例如：曬太陽']
  };
  return map[String(domainKey||'')]||['例子一','例子二'];
}

function guidedRenderCdarsExamples_(pg,a){
  if(String(pg.domain&&pg.domain.key||'')==='pastimes'){
    a.append(
      el(
        'div',
        'guided-context',
        '先填兩個你平時真的會做的活動。後面的題目會用這兩個例子來問你的興趣、投入和想做的程度。'
      )
    );

    guidedVoiceBox_(
      'cdars-inline-help',
      '🔊 廣東話填寫提示',
      '先想兩個你平時真的會做的活動。可以很普通，例如看電視、行公園。後面的題目會一直用你填的兩個例子來回答。',
      a,
      true
    );
  }

  const intro=pg.domain&&pg.domain.examplePrompt
    ? pg.domain.examplePrompt
    : `請填寫兩項${pg.domain&&pg.domain.title?pg.domain.title:'活動'}例子`;

  a.append(el('p','instruction',intro));

  const examples=guidedCdarsExamplePlaceholders_(pg.domain&&pg.domain.key);
  const fields=[
    [pg.example1Key,'例子一'],
    [pg.example2Key,'例子二']
  ];
  const inputs=[];

  fields.forEach(([key,label],index)=>{
    const f=el('div','field');
    f.append(el('label','',label));

    const i=el('input','text');
    i.value=val(key)||'';
    i.placeholder=examples[index];
    i.oninput=()=>set(key,i.value);

    i.onkeydown=e=>{
      if(guidedEnterKey_(e)){
        e.preventDefault();
        e.stopPropagation();

        if(index===0){
          inputs[1]&&inputs[1].focus();
        }else if(
          String(val(pg.example1Key)||'').trim() &&
          String(val(pg.example2Key)||'').trim()
        ){
          guidedScheduleForward_(100);
        }
      }
    };

    inputs.push(i);
    f.append(i);
    a.append(f);
  });
}

function guidedRenderIorDimension_(pg,a){
  const n=String(pg.scenario).padStart(2,'0');
  const key=`ior${n}_${pg.dimension}`;

  if(Number(pg.scenario)===1&&pg.dimension==='frequency'){
    guidedVoiceBox_(
      'ior-inline-help',
      '🔊 廣東話填寫提示',
      '每個社交情境會問三次。第一題問出現頻率，第二題問相信程度，第三題問不安程度。每一頁上方都會再顯示同一個情境。',
      a,
      true
    );
  }

  const scenario=el('div','guided-scenario');
  scenario.append(
    el('strong','',`情境 ${pg.scenario}`),
    el('div','',pg.scenarioText)
  );

  a.append(
    scenario,
    el('span','guided-keyword','現在只問：'+pg.dimensionLabel),
    el('p','guided-mini-hint',pg.explanation)
  );

  const labels={
    frequency:['1 從不','2 很少','3 有時','4 經常','5 非常頻繁'],
    conviction:['1 完全不相信','2 有點相信','3 半信半疑','4 相當相信','5 完全相信'],
    distress:['1 完全沒有不安','2 輕微不安','3 中等不安','4 相當不安','5 非常不安']
  }[pg.dimension];

  const g=el('div','scale-buttons');

  labels.forEach((label,index)=>{
    const value=index+1;

    g.append(btn(
      label,
      ()=>{
        set(key,value);
        ST.error='';
        guidedScheduleForward_(180);
      },
      val(key)===value?'selected':''
    ));
  });

  a.append(
    el('p','guided-scale-hint','電腦可直接按 1–5。'),
    g
  );
}

function guidedRenderPdiItem_(pg,a){
  const x=pg.pdi;

  if(pg.item===1){
    a.append(
      el(
        'div',
        'guided-context',
        '每題先選「是」或「否」。選「是」後，下面三個程度都要完成。'
      )
    );

    guidedVoiceBox_(
      'pdi-inline-help',
      '🔊 廣東話填寫提示',
      '每一題先選是或否。選否就去下一題。選是之後，再回答困擾程度、反覆想到的程度和相信程度。三個都完成才會到下一題。',
      a,
      true
    );
  }

  a.append(
    el('p','instruction',`${pg.item}/21`),
    el('h3','',x.fullLabel),
    el('p','guided-scale-hint','電腦可按 1＝是，2＝否。')
  );

  const chooseYesNo=value=>{
    setPdiAnswer(x,value);
    ST.error='';

    if(value===0){
      guidedScheduleForward_(180);
      return;
    }

    player();
  };

  a.append(guidedBinaryButtons_(x.yesField,chooseYesNo));

  if(Number(val(x.yesField))!==1)return;

  const dims=[
    ['distress','困擾程度',['1 沒有困擾','2 輕微','3 中等','4 相當','5 十分困擾']],
    ['preoccupation','反覆想到',['1 幾乎沒有','2 偶爾','3 有時','4 經常','5 一直在想']],
    ['conviction','相信程度',['1 一點也不真實','2 有點不真實','3 半信半疑','4 相當真實','5 非常真實']]
  ];

  dims.forEach(([kind,title,labels])=>{
    const key=x.dimensions[kind].name;
    const block=el('div','guided-binary-row');
    block.append(el('strong','',title));

    const g=el('div','scale-buttons');

    labels.forEach((label,index)=>{
      const value=index+1;

      g.append(btn(
        label,
        ()=>{
          set(key,value);
          ST.error='';

          const done=dims.every(d=>present(x.dimensions[d[0]].name));
          if(done)guidedScheduleForward_(180);
          else player();
        },
        val(key)===value?'selected':''
      ));
    });

    block.append(g);
    a.append(block);
  });

  const missing=dims.filter(d=>!present(x.dimensions[d[0]].name)).length;

  if(missing){
    a.append(
      el('div','result warn',`還有 ${missing} 個程度未回答。`)
    );
  }
}

function guidedRenderScale_(pg,a){
  const opts=pg.options||[];

  const firstHads=(B.hads.items||[])[0];
  const firstSas=(B.sas.items||[])[0];
  const firstGas=(B.gas.items||[])[0];

  if(firstHads&&pg.key===firstHads.name){
    a.append(
      el('div','guided-context','請想過去一星期的感受，選最接近你情況的答案。')
    );
    guidedVoiceBox_(
      'hads-inline-help',
      '🔊 廣東話填寫提示',
      '接下來問過去一星期的感受。每題選最接近你情況的一個答案。按下答案後會自動到下一題。',
      a,
      true
    );
  }

  if(firstSas&&pg.key===firstSas.name){
    a.append(
      el('div','guided-context','接下來請按你最近平時的興趣和動力作答。')
    );
    guidedVoiceBox_(
      'sas-inline-help',
      '🔊 廣東話填寫提示',
      '接下來問最近平時做事的興趣和動力。每題選最接近你情況的一個答案。',
      a,
      true
    );
  }

  if(firstGas&&pg.key===firstGas.name){
    a.append(
      el('div','guided-context','第二部分開始。請按最近平時的日常情況作答。')
    );
    guidedVoiceBox_(
      'stage2-inline-help',
      '🔊 廣東話填寫提示',
      '第二部分開始。接下來問最近平時的日常情況。每題選最接近你的一個答案。',
      a,
      true
    );
  }

  const g=el('div',opts.length===5?'scale-buttons':'options');

  a.append(
    el('p','guided-scale-hint',`電腦可按 1–${opts.length}。選完會自動到下一題。`)
  );

  opts.forEach((o,n)=>{
    const keyText=String(n+1);

    const b=btn(
      '',
      ()=>{
        set(pg.key,o.value);
        ST.error='';
        guidedScheduleForward_(180);
      },
      (opts.length===5?'':'choice')+
        (sameValue(val(pg.key),o.value)?' selected':'')
    );

    b.dataset.answerKey=pg.key;
    b.dataset.answerPosition=String(n+1);

    b.append(
      el('strong','',keyText),
      document.createTextNode(' '+String(o.label).replace(/^\d+\s*/,''))
    );

    g.append(b);
  });

  a.append(g);
}

/* ---------- Checkpoints ---------- */

function guidedPrepareScreeningDefaults_(){
  if(B.rbdsq&&B.rbdsq.sourceField){
    ST.answers[B.rbdsq.sourceField]=guidedRbSelfValue_();
  }

  const rbItems=(B.rbdsq.items||[]).concat(B.rbdsq.diseaseItems||[]);
  if(rbItems.every(x=>present(x.name))){
    ST.answers.rbdsq_section_confirmed=1;
    ST.answers.rbq10_none_confirmed=
      (B.rbdsq.diseaseItems||[]).some(x=>Number(val(x.name))===1)?0:1;
  }

  guidedUpdateMriNoneFlag_();

  if(quipKeys().every(present)){
    ST.answers.quip_complete=1;
  }

  if(
    (B.quip.additionalItems||[]).every(x=>present(x.name)) &&
    quipKeys().every(present)
  ){
    ST.answers.quip_complete=1;
  }

  saveDraft();
}

function guidedRenderStopped_(){
  guidedStopVoice_();
  const m=appShell();
  const t=el('header','toolbar');
  t.append(el('h1','','研究問卷'));
  m.append(t);

  const s=el('section','summary guided-success');
  const status=el('div','hint','');
  let checkButton=null;

  s.append(
    el('h2','','這部分已收到'),
    el(
      'div',
      'result warn',
      '根據本研究的篩選規則，研究人員需要先跟您確認一些資料。請暫時不要填寫後面的問卷。'
    ),
    el(
      'p',
      '',
      '請等待研究人員通知。研究人員確認您可以繼續後，仍然使用同一個問卷連結；之前的姓名、資料和情緒問卷不需要重填。'
    )
  );

  if(guidedDryRun_()){
    s.append(
      el('p','hint','測試模式：這次沒有把資料送到後端，也不查詢解鎖狀態。')
    );
  }else{
    checkButton=btn(
      '檢查是否可以繼續',
      ()=>guidedCheckResume_(status,checkButton,false),
      'primary'
    );
    s.append(checkButton,status);

    if(!ST._guidedResumeAutoChecked){
      ST._guidedResumeAutoChecked=true;
      setTimeout(()=>guidedCheckResume_(status,checkButton,true),250);
    }
  }

  m.append(s);
}

async function guidedAutoSubmitHads_(status){
  if(ST._guidedHadsSubmitting)return;
  calculateAllDerived();

  if(Number(val('hads_complete'))!==1){
    status.className='error';
    status.textContent='情緒問卷尚未完整。請返回完成所有題目。';
    return;
  }

  ST._guidedHadsSubmitting=true;
  status.className='result';
  status.textContent=guidedDryRun_()?'測試保存中……':'正在安全保存這部分答案……';

  try{
    await guidedPostPhase_('hads','screening_core',guidedHadsKeys_());
    ST.answers._guided_hads_submitted=1;

    if(Number(val('hads_mood_review'))===1){
      ST.answers._guided_hads_blocked=1;
      ST.answers._guided_hads_passed=0;
      saveDraft();
      return guidedRenderStopped_();
    }

    ST.answers._guided_hads_passed=1;
    ST.answers._guided_hads_blocked=0;
    saveDraft();
    ST._guidedHadsSubmitting=false;
    guidedScheduleForward_(350);
  }catch(err){
    ST._guidedHadsSubmitting=false;
    status.className='error';
    status.textContent=
      '暫時未能保存資料。答案仍保存在這部裝置。請保持此頁開啟，稍後再試。 '+
      (err&&err.message?err.message:'');
    status.parentElement.append(
      btn('重新嘗試保存',()=>guidedAutoSubmitHads_(status),'primary')
    );
  }
}


function guidedFirstMissingHadsStep_(){
  const pages=guidedPages_();

  for(const item of (B.hads.items||[])){
    if(!present(item.name)){
      return pages.findIndex(
        pg=>pg.kind==='scale'&&pg.key===item.name
      );
    }
  }

  return -1;
}

function guidedRenderHadsGate_(a){
  if(Number(val('_guided_hads_blocked'))===1){
    return guidedRenderStopped_();
  }

  const missingStep=guidedFirstMissingHadsStep_();

  if(missingStep>=0){
    const pages=guidedPages_();
    const missing=pages[missingStep];

    a.append(
      el(
        'div',
        'error',
        `剛才有一題未收到答案：${missing&&missing.label?missing.label:'情緒問卷其中一題'}。不完整的 HADS 不會被提交。`
      ),
      btn(
        '返回未完成題目',
        ()=>{
          ST.step=missingStep;
          ST.error='請補答這一題。完成後會按原順序繼續。';
          saveDraft();
          guidedScrollTop_();
          player();
        },
        'primary'
      ),
      btn(
        '返回上一題',
        ()=>{
          ST.step=Math.max(guidedMinStep_(pages),ST.step-1);
          ST.error='';
          saveDraft();
          guidedScrollTop_();
          player();
        },
        'secondary'
      )
    );
    return;
  }

  if(Number(val('_guided_hads_passed'))===1){
    a.append(
      el('div','result good','情緒問卷已安全保存。正在進入下一部分……')
    );
    return guidedScheduleForward_(250);
  }

  const status=el('div','result','正在檢查並保存情緒問卷……');
  const back=btn(
    '返回上一題檢查',
    ()=>{
      ST.step=Math.max(0,ST.step-1);
      ST.error='';
      saveDraft();
      guidedScrollTop_();
      player();
    },
    'secondary'
  );

  a.append(status,back);
  setTimeout(()=>guidedAutoSubmitHads_(status),80);
}

async function guidedAutoSubmitScreening_(status){
  if(ST._guidedScreeningSubmitting)return;
  guidedPrepareScreeningDefaults_();
  ST._guidedScreeningSubmitting=true;

  status.className='result';
  status.textContent=guidedDryRun_()?'測試保存中……':'正在安全保存第一部分……';

  try{
    await guidedPostPhase_(
      'screening_self',
      'screening_core',
      guidedScreeningKeys_()
    );
    ST.answers._guided_screening_submitted=1;
    saveDraft();
    ST._guidedScreeningSubmitting=false;
    guidedScheduleForward_(350);
  }catch(err){
    ST._guidedScreeningSubmitting=false;
    status.className='error';
    status.textContent=
      '暫時未能保存第一部分。答案仍保存在這部裝置。 '+
      (err&&err.message?err.message:'');
    status.parentElement.append(
      btn('重新嘗試保存',()=>guidedAutoSubmitScreening_(status),'primary')
    );
  }
}

function guidedRenderScreeningCheckpoint_(a){
  if(Number(val('_guided_screening_submitted'))===1){
    a.append(el('div','result good','第一部分已安全保存。正在進入下一部分……'));
    return guidedScheduleForward_(250);
  }

  const status=el('div','result','第一部分完成。正在安全保存……');
  a.append(status);
  setTimeout(()=>guidedAutoSubmitScreening_(status),80);
}

async function guidedAutoSubmitStage2_(status){
  if(ST._guidedStage2Submitting)return;
  ST._guidedStage2Submitting=true;

  status.className='result';
  status.textContent=guidedDryRun_()?'測試提交中……':'正在提交最後一部分……';

  try{
    await guidedPostPhase_(
      'stage2',
      'stage_2_questionnaires',
      guidedStage2Keys_()
    );
    ST.answers._guided_stage2_submitted=1;
    saveDraft();
    ST._guidedStage2Submitting=false;
    player();
  }catch(err){
    ST._guidedStage2Submitting=false;
    status.className='error';
    status.textContent=
      '暫時未能提交。答案仍保存在這部裝置。 '+
      (err&&err.message?err.message:'');
    status.parentElement.append(
      btn('重新嘗試提交',()=>guidedAutoSubmitStage2_(status),'primary')
    );
  }
}

function guidedRenderFinal_(a){
  guidedStopVoice_();

  if(Number(val('_guided_stage2_submitted'))===1){
    a.append(
      el('div','result good guided-success','已收到提交。謝謝您。'),
      el('p','guided-success','請等待工作人員通知您下一步。')
    );
    if(guidedDryRun_()){
      a.append(el('p','hint','測試模式：這次沒有把資料送到後端。'));
    }
    return;
  }

  const status=el('div','result','所有需要您自行填寫的題目已完成。正在提交……');
  a.append(status);
  setTimeout(()=>guidedAutoSubmitStage2_(status),80);
}

/* ---------- Completion / navigation ---------- */

function guidedQuipStemComplete_(pg){
  return guidedQuipStemKeys_(pg.stem.index).every(present);
}

function guidedQuipBinaryComplete_(pg){
  if(!present(pg.item.name))return false;
  if(Number(val(pg.item.name))===1&&pg.item.detailField){
    return Boolean(String(val(pg.item.detailField)||'').trim());
  }
  return true;
}

function guidedRbComplete_(pg){
  if(!present(pg.item.name))return false;
  if(Number(val(pg.item.name))===1&&pg.item.detailField){
    return Boolean(String(val(pg.item.detailField)||'').trim());
  }
  return true;
}

function guidedPdiComplete_(pg){
  const x=pg.pdi;
  if(Number(val(x.yesField))===0)return true;
  if(Number(val(x.yesField))!==1)return false;
  return ['distress','preoccupation','conviction']
    .every(k=>present(x.dimensions[k].name));
}

function guidedIorComplete_(pg){
  const n=String(pg.scenario).padStart(2,'0');
  return present(`ior${n}_${pg.dimension}`);
}

function guidedMinStep_(pages){
  const hadsGate=pages.findIndex(x=>x.kind==='guidedHadsGate');
  const screeningGate=pages.findIndex(x=>x.kind==='guidedScreeningCheckpoint');

  if(Number(val('_guided_screening_submitted'))===1){
    return Math.min(pages.length-1,screeningGate+1);
  }

  if(Number(val('_guided_hads_submitted'))===1){
    return Math.min(pages.length-1,hadsGate+1);
  }

  return 0;
}

function guidedOwnNavigation_(pg){
  return [
    'guidedHadsGate',
    'guidedScreeningCheckpoint',
    'guidedMriSummary',
    'guidedFinal'
  ].includes(pg.kind);
}

function guidedPlayer_(){
  guidedInjectStyles_();
  document.body.classList.add('guided-mode');

  if(Number(val('_guided_hads_blocked'))===1){
    return guidedRenderStopped_();
  }

  const pages=guidedPages_();
  if(!pages.length)return;

  const hadsGate=pages.findIndex(x=>x.kind==='guidedHadsGate');
  const screeningGate=pages.findIndex(x=>x.kind==='guidedScreeningCheckpoint');
  const finalIndex=pages.findIndex(x=>x.kind==='guidedFinal');

  if(
    Number(val('_guided_hads_passed'))!==1 &&
    ST.step>hadsGate
  ){
    ST.step=hadsGate;
  }

  if(
    Number(val('_guided_hads_passed'))===1 &&
    Number(val('_guided_screening_submitted'))!==1 &&
    ST.step>screeningGate
  ){
    ST.step=screeningGate;
  }

  if(Number(val('_guided_stage2_submitted'))===1){
    ST.step=finalIndex;
  }

  const minStep=guidedMinStep_(pages);
  if(ST.step<minStep)ST.step=minStep;
  if(ST.step<0)ST.step=0;
  if(ST.step>=pages.length)ST.step=pages.length-1;

  guidedRememberReached_(ST.step);

  const pg=pages[ST.step];
  const m=appShell();

  const t=el('header','toolbar');
  t.append(el('h1','','研究問卷'));
  const actions=el('div','tool-actions');
  actions.append(btn('下載備份',guidedDownloadBackup_,'linkbtn'));
  t.append(actions);
  m.append(t);

  const h=el('div','flow-head');
  h.append(el('h2','',pg.section));
  const pct=Math.round((ST.step/Math.max(1,pages.length-1))*100);
  h.append(el('div','progress',`整體進度：約 ${pct}%`));
  m.append(h);

  if(guidedDryRun_()){
    m.append(el('div','result warn','測試模式：不會把資料送到後端。'));
  }

  const qbox=el('section','question');
  if(pg.context)qbox.append(el('div','context',pg.context));
  qbox.append(el('h3','',pg.label));
  renderPage(pg,qbox);
  if(ST.error)qbox.append(el('div','error',ST.error));
  m.append(qbox);

  if(!guidedOwnNavigation_(pg)){
    const nav=el('div','nav');

    if(ST.step>minStep){
      nav.append(btn('返回上一題',guidedGoBack_,'secondary'));
    }

    if(ST.step<guidedLatestStep_()){
      nav.append(btn('回到最新進度',guidedGoLatest_,'secondary'));
    }

    if(!['scale','guidedQuipStem','guidedQuipBinary','guidedRbBinary',
          'guidedMriSafetyBinary','guidedIorDimension','guidedPdiItem'].includes(pg.kind)){
      nav.append(btn(
        '下一題',
        ()=>manualNext(pg,pages),
        'next'
      ));
    }

    m.append(nav);
  }

  setTimeout(()=>{
    const first=qbox.querySelector('input:not([disabled]),textarea:not([disabled])');
    if(first)first.focus({preventScroll:true});
  },30);
}


function guidedNumericKey_(e){
  const code=String(e&&e.code||'');
  const key=String(e&&e.key||'');

  const m=code.match(/^Numpad([0-9])$/);
  if(m)return Number(m[1]);

  if(/^[0-9]$/.test(key))return Number(key);
  return null;
}

function guidedEnterKey_(e){
  return String(e&&e.key||'')==='Enter'||String(e&&e.code||'')==='NumpadEnter';
}

/* ---------- Guided keyboard ---------- */

function guidedFirstUnansweredBinaryKey_(pg){
  if(pg.kind==='guidedQuipStem'){
    return guidedQuipStemKeys_(pg.stem.index).find(k=>!present(k))||null;
  }
  if(pg.kind==='guidedQuipBinary')return !present(pg.item.name)?pg.item.name:null;
  if(pg.kind==='guidedRbBinary')return !present(pg.item.name)?pg.item.name:null;
  if(pg.kind==='guidedMriSafetyBinary')return !present(pg.key)?pg.key:null;
  return null;
}

function guidedKeyboardBinary_(pg,n){
  if(![1,2].includes(n))return false;
  const value=n===1?1:0;

  if(pg.kind==='guidedQuipStem'){
    const key=guidedFirstUnansweredBinaryKey_(pg);
    if(!key)return false;
    set(key,value);
    const done=guidedQuipStemKeys_(pg.stem.index).every(present);
    done?guidedScheduleForward_(150):player();
    return true;
  }

  if(pg.kind==='guidedQuipBinary'){
    const item=pg.item;
    set(item.name,value);
    if(value===0&&item.detailField)set(item.detailField,null);
    if(value===0||!item.detailField)guidedScheduleForward_(150);
    else player();
    return true;
  }

  if(pg.kind==='guidedRbBinary'){
    const item=pg.item;
    set(item.name,value);
    if(value===0&&item.detailField)set(item.detailField,null);
    if(value===0||!item.detailField)guidedScheduleForward_(150);
    else player();
    return true;
  }

  if(pg.kind==='guidedMriSafetyBinary'){
    set(pg.key,value);
    guidedUpdateMriNoneFlag_();
    guidedScheduleForward_(150);
    return true;
  }

  if(pg.kind==='guidedPdiItem'){
    const x=pg.pdi;
    if(!present(x.yesField)){
      setPdiAnswer(x,value);
      if(value===0)guidedScheduleForward_(150);
      else player();
      return true;
    }
  }

  return false;
}

function guidedHandleKeydown_(e){
  if(!isGuidedFlow_())return;
  if(e.altKey||e.ctrlKey||e.metaKey||e.isComposing)return;

  const active=document.activeElement;

  if(active&&(
    ['INPUT','TEXTAREA','SELECT'].includes(active.tagName)||
    active.isContentEditable
  )){
    return;
  }

  const pg=guidedPages_()[ST.step];
  if(!pg)return;

  const n=guidedNumericKey_(e);
  const isEnter=guidedEnterKey_(e);

  if(guidedTransitionPending_()){
    if(isEnter||n!==null){
      guidedConsumeKey_(e);
    }
    return;
  }

  if(isEnter){
    if(pageComplete(pg)&&!guidedOwnNavigation_(pg)){
      guidedConsumeKey_(e);
      guidedGoForward_();
    }
    return;
  }

  if(n===null)return;

  if(guidedKeyboardBinary_(pg,n)){
    guidedConsumeKey_(e);
    return;
  }

  if(
    pg.kind==='guidedPdiItem'&&
    Number(val(pg.pdi.yesField))===1&&
    n>=1&&n<=5
  ){
    const missing=['distress','preoccupation','conviction']
      .find(k=>!present(pg.pdi.dimensions[k].name));

    if(missing){
      guidedConsumeKey_(e);
      set(pg.pdi.dimensions[missing].name,n);

      const done=['distress','preoccupation','conviction']
        .every(k=>present(pg.pdi.dimensions[k].name));

      if(done)guidedScheduleForward_(150);
      else player();
      return;
    }
  }

  if(pg.kind==='guidedIorDimension'&&n>=1&&n<=5){
    guidedConsumeKey_(e);
    const id=String(pg.scenario).padStart(2,'0');
    set(`ior${id}_${pg.dimension}`,n);
    guidedScheduleForward_(150);
    return;
  }

  if(pg.kind==='scale'||pg.kind==='cdarsScale'){
    const opts=pg.options||[];

    if(n>=1&&n<=opts.length){
      guidedConsumeKey_(e);
      set(pg.key,opts[n-1].value);
      ST.error='';
      guidedScheduleForward_(150);
      return;
    }
  }

  if(
    pg.kind==='guidedEducation'&&
    n>=1&&n<=C.education.length
  ){
    guidedConsumeKey_(e);
    const o=C.education[n-1];
    const meta=guidedEducationMeta_(o[0]);
    const changed=val('education_level')!==o[0];

    set('education_level',o[0]);

    if(changed){
      set('education_years',meta.min);
    }

    player();
    return;
  }

  if(
    pg.kind==='choice'&&
    Array.isArray(pg.options)&&
    n>=1&&n<=pg.options.length
  ){
    guidedConsumeKey_(e);
    const o=pg.options[n-1];

    set(pg.key,o[0]);

    if(pg.key==='pd_status_self_report'){
      set('pd_hc_status',Number(o[0])===1?'PD':'HC');

      if(Number(o[0])===0){
        set('pd_duration_years_self_report',null);
      }
    }

    guidedScheduleForward_(150);
    return;
  }
}

/* ---------- Bind guided mode into current app ---------- */

playerPages=function(){
  if(isGuidedFlow_())return guidedPages_();
  return _apathyPlayerPagesBase();
};

renderPage=function(pg,a){
  if(isGuidedFlow_()){
    if(pg.kind==='input')return guidedRenderInput_(pg,a);
    if(pg.kind==='choice')return guidedRenderChoice_(pg,a);
    if(pg.kind==='guidedVoiceInfo')return guidedRenderVoiceInfo_(pg,a);
    if(pg.kind==='guidedPdYears')return guidedRenderPdYears_(a);
    if(pg.kind==='guidedEducation')return guidedRenderEducation_(a);
    if(pg.kind==='guidedQuipStem')return guidedRenderQuipStem_(pg,a);
    if(pg.kind==='guidedQuipBinary')return guidedRenderQuipBinary_(pg,a);
    if(pg.kind==='guidedQuipRsMatrix')return guidedRenderQuipRs_(a);
    if(pg.kind==='guidedRbBinary')return guidedRenderRbBinary_(pg,a);
    if(pg.kind==='guidedMriSafetyBinary')return guidedRenderMriSafety_(pg,a);
    if(pg.kind==='guidedMriSummary')return guidedRenderMriSummary_(a);
    if(pg.kind==='guidedIorDimension')return guidedRenderIorDimension_(pg,a);
    if(pg.kind==='guidedPdiItem')return guidedRenderPdiItem_(pg,a);
    if(pg.kind==='cdarsExamples')return guidedRenderCdarsExamples_(pg,a);
    if(pg.kind==='guidedHadsGate')return guidedRenderHadsGate_(a);
    if(pg.kind==='guidedScreeningCheckpoint')return guidedRenderScreeningCheckpoint_(a);
    if(pg.kind==='guidedFinal')return guidedRenderFinal_(a);
    if(pg.kind==='scale'||pg.kind==='cdarsScale'){
      if(pg.kind==='cdarsScale'){
        const x=Object.assign({},pg,{label:cdarsStem(pg)});
        a.append(el('p','context',x.label));
        return guidedRenderScale_(x,a);
      }
      return guidedRenderScale_(pg,a);
    }
  }
  return _apathyRenderPageBase(pg,a);
};

pageComplete=function(pg){
  if(isGuidedFlow_()){
    if(pg.kind==='guidedVoiceInfo')return true;
    if(pg.kind==='guidedPdYears'){
      return present('pd_duration_years_self_report');
    }
    if(pg.kind==='guidedEducation'){
      return present('education_level')&&present('education_years');
    }
    if(pg.kind==='guidedQuipStem')return guidedQuipStemComplete_(pg);
    if(pg.kind==='guidedQuipBinary')return guidedQuipBinaryComplete_(pg);
    if(pg.kind==='guidedQuipRsMatrix'){
      return B.quiprs.matrixCells.every(x=>present(x.name)) &&
        ['answered','none'].includes(String(val('quiprs_section_confirmed')||''));
    }
    if(pg.kind==='guidedRbBinary')return guidedRbComplete_(pg);
    if(pg.kind==='guidedMriSafetyBinary')return present(pg.key);
    if(pg.kind==='guidedMriSummary')return Number(val('_guided_mri_summary_confirmed'))===1;
    if(pg.kind==='guidedIorDimension')return guidedIorComplete_(pg);
    if(pg.kind==='guidedPdiItem')return guidedPdiComplete_(pg);
    if(pg.kind==='guidedHadsGate'){
      return Number(val('_guided_hads_submitted'))===1;
    }
    if(pg.kind==='guidedScreeningCheckpoint'){
      return Number(val('_guided_screening_submitted'))===1;
    }
    if(pg.kind==='guidedFinal'){
      return Number(val('_guided_stage2_submitted'))===1;
    }
  }
  return _apathyPageCompleteBase(pg);
};

renderScale=function(pg,a){
  if(isGuidedFlow_())return guidedRenderScale_(pg,a);
  return _apathyRenderScaleBase(pg,a);
};

autoNext=function(){
  if(isGuidedFlow_())return guidedGoForward_();
  return _apathyAutoNextBase();
};

manualNext=function(pg,pages){
  if(!isGuidedFlow_())return _apathyManualNextBase(pg,pages);

  if(!pageComplete(pg)){
    ST.error='這題還沒有完成。請先回答目前這一題。';
    return player();
  }

  return guidedGoForward_();
};

player=function(){
  if(isGuidedFlow_())return guidedPlayer_();
  document.body.classList.remove('guided-mode');
  guidedStopVoice_();
  return _apathyPlayerBase();
};

start=function(flow){
  if(flow!=='guided'&&!/^guided_test/.test(String(flow||'')))return _apathyStartBase(flow);

  ST.flow=flow;
  loadDraft(flow);
  ST.error='';

  if(Number(val('_guided_hads_blocked'))===1){
    return guidedRenderStopped_();
  }

  if(Number(val('_guided_stage2_submitted'))===1){
    const pages=guidedPages_();
    ST.step=pages.findIndex(x=>x.kind==='guidedFinal');
  }else{
    ST.step=Math.min(
      guidedLatestStep_(),
      Math.max(0,guidedPages_().length-1)
    );
  }

  saveDraft();
  return player();
};

document.addEventListener('keydown',guidedHandleKeydown_,true);

/* Special invited URL only. Existing homepage and old flows are untouched. */
if(guidedParam_('flow')==='guided'){
  start(guidedParam_('dry')==='1'?'guided_test_v4':'guided');
}
