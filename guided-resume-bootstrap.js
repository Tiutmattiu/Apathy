// APATHY guided HADS same-link resume bootstrap.
// Keeps the existing guided questionnaire code unchanged.
// It only repairs local workflow state after the Receiver confirms staff approval.
(function(){
'use strict';

const params=new URLSearchParams(window.location.search);
if(params.get('flow')!=='guided'||params.get('dry')==='1')return;

const CONFIG=window.FORM_CONFIG||{};
const BANK=window.APATHY_QUESTION_BANK||{};
const RECEIVER_URL=String(CONFIG.receiverUrl||'').trim();
const DRAFT_KEY='apathy-fe-clean-v2-guided';
const REPAIR_MARKER='_guided_hads_resume_repaired_v1';
if(!RECEIVER_URL)return;

function readDraft(){
  try{return JSON.parse(localStorage.getItem(DRAFT_KEY)||'null');}
  catch(_){return null;}
}

function writeDraft(draft){
  localStorage.setItem(DRAFT_KEY,JSON.stringify(draft));
}

function jsonp(params,timeoutMs){
  return new Promise(function(resolve,reject){
    const cb='__apathyGuidedResume_'+Date.now()+'_'+Math.random().toString(36).slice(2);
    const script=document.createElement('script');
    let done=false;

    function cleanup(){
      if(done)return;
      done=true;
      try{delete window[cb];}catch(_){window[cb]=undefined;}
      if(script.parentNode)script.parentNode.removeChild(script);
    }

    const timer=setTimeout(function(){
      cleanup();
      reject(new Error('RESUME_STATUS_TIMEOUT'));
    },timeoutMs||12000);

    window[cb]=function(data){
      clearTimeout(timer);
      cleanup();
      resolve(data||{});
    };

    const q=new URLSearchParams(Object.assign({},params,{callback:cb}));
    script.src=RECEIVER_URL+'?'+q.toString();
    script.async=true;
    script.onerror=function(){
      clearTimeout(timer);
      cleanup();
      reject(new Error('RESUME_STATUS_NETWORK_ERROR'));
    };
    document.head.appendChild(script);
  });
}

function firstPostHadsStep(answers){
  // Guided identity pages: name, DOB, gender, PD yes/no, phone, education,
  // plus PD duration only when PD=yes. Then 14 HADS items and one HADS gate.
  const identityPages=6+(Number(answers.pd_status_self_report)===1?1:0);
  const hadsCount=Array.isArray(BANK.hads&&BANK.hads.items)?BANK.hads.items.length:14;
  return identityPages+hadsCount+1;
}

function repairAfterApproval(draft,allowedAt){
  if(!draft||!draft.answers)return false;
  const answers=draft.answers;

  // A participant stopped at the HADS gate cannot legitimately have current
  // post-HADS answers. If such values exist, they are stale local state from
  // an earlier guided run on this device. Keep only identity + HADS evidence.
  const keep=new Set([
    'p_id','s_id','participant_name',
    'dob_d','dob_m','dob_y','date_of_birth','age_years',
    'gender','contact_phone',
    'pd_status_self_report','pd_hc_status','pd_duration_years_self_report',
    'education_level','education_years'
  ]);

  Object.keys(answers).forEach(function(key){
    if(keep.has(key))return;
    if(/^hads/i.test(key))return;
    if(/^_guided_hads_/i.test(key))return;
    delete answers[key];
  });

  answers._guided_hads_blocked=0;
  answers._guided_hads_passed=1;
  answers._guided_hads_staff_override=1;
  answers._guided_hads_staff_override_at=String(allowedAt||answers._guided_hads_staff_override_at||new Date().toISOString());
  answers[REPAIR_MARKER]=1;

  const nextStep=firstPostHadsStep(answers);
  answers._guided_latest_step=nextStep;
  draft.step=nextStep;
  draft.answers=answers;
  writeDraft(draft);
  return true;
}

function repairAlreadyApprovedIfNeeded(){
  const draft=readDraft();
  if(!draft||!draft.answers)return false;
  const a=draft.answers;
  if(Number(a._guided_hads_staff_override)!==1)return false;
  if(Number(a[REPAIR_MARKER])===1)return false;
  return repairAfterApproval(draft,a._guided_hads_staff_override_at);
}

let checking=false;
async function checkResume(){
  if(checking)return;
  const draft=readDraft();
  if(!draft||!draft.answers)return;

  const answers=draft.answers;
  if(Number(answers._guided_hads_blocked)!==1)return;

  const submissionId=String(answers._guided_hads_submission_id||'').trim();
  if(!submissionId)return;

  checking=true;
  try{
    const result=await jsonp({
      action:'guided_resume_status',
      submission_id:submissionId
    },12000);

    if(!(result&&result.ok&&result.allowed))return;

    if(repairAfterApproval(draft,result.allowed_at)){
      window.location.reload();
    }
  }catch(_){
    // Keep the participant safely blocked when the approval check is unavailable.
  }finally{
    checking=false;
  }
}

// One-time recovery for a browser that was approved by the previous bootstrap
// but then jumped to a stale final page because old guided completion flags were
// still in localStorage.
if(repairAlreadyApprovedIfNeeded()){
  window.location.reload();
  return;
}

checkResume();
window.setInterval(checkResume,30000);
})();
