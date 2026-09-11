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
const REPAIR_MARKER='_guided_hads_resume_repaired_v2';
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

  // A participant who was stopped at the HADS gate cannot have legitimate
  // post-HADS answers yet. Keep identity + HADS only and discard stale local
  // state from an earlier test/session on the same device.
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

let checking=false;
async function checkResume(){
  if(checking)return;

  const draft=readDraft();
  if(!draft||!draft.answers)return;

  const answers=draft.answers;
  const submissionId=String(answers._guided_hads_submission_id||'').trim();
  if(!submissionId)return;

  // Once V2 repair has run and the participant is no longer blocked,
  // do not touch later legitimate progress or completion.
  if(
    Number(answers[REPAIR_MARKER])===1 &&
    Number(answers._guided_hads_blocked)!==1
  ){
    return;
  }

  checking=true;
  try{
    const result=await jsonp({
      action:'guided_resume_status',
      submission_id:submissionId
    },12000);

    if(!(result&&result.ok&&result.allowed))return;

    // Always do one server-confirmed V2 repair after approval. This also
    // recovers browsers that were approved by an older bootstrap but still
    // contain stale final/completion flags from an earlier test run.
    if(repairAfterApproval(draft,result.allowed_at)){
      window.location.reload();
    }
  }catch(_){
    // Keep the participant safely blocked / unchanged when the approval
    // check is unavailable.
  }finally{
    checking=false;
  }
}

checkResume();
window.setInterval(checkResume,30000);
})();
