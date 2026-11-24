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

  // Approval changes workflow permission only. Answers and later progress may
  // have changed while the status request was in flight; never erase them.
  answers._guided_hads_blocked=0;
  answers._guided_hads_passed=1;
  answers._guided_hads_staff_override=1;
  answers._guided_hads_staff_override_at=String(allowedAt||answers._guided_hads_staff_override_at||new Date().toISOString());
  answers[REPAIR_MARKER]=1;

  const nextStep=Math.max(
    firstPostHadsStep(answers),
    Number(draft.step)||0,
    Number(answers._guided_latest_step)||0
  );
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

  // Only pre-policy drafts are owned by this compatibility script.
  // The form engine checks current checkpoints without reloading the tab.
  if(Number(answers._guided_hads_blocked)!==1||answers._guided_screening_review_blocked)return;

  checking=true;
  try{
    const result=await jsonp({
      action:'guided_resume_status',
      submission_id:submissionId
    },12000);

    if(!(result&&result.ok===true&&result.allowed===true&&result.submission_id===submissionId))return;

    const current=readDraft();
    if(!current||!current.answers||String(current.answers._guided_hads_submission_id||'').trim()!==submissionId)return;

    // Apply the exact approval to the latest draft, not the request snapshot.
    if(repairAfterApproval(current,result.allowed_at)){
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
