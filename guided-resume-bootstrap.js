// APATHY guided HADS same-link resume bootstrap.
// Keeps the existing guided questionnaire code unchanged.
// It only flips local workflow permission after the Receiver confirms staff approval.
(function(){
'use strict';

const params=new URLSearchParams(window.location.search);
if(params.get('flow')!=='guided'||params.get('dry')==='1')return;

const CONFIG=window.FORM_CONFIG||{};
const RECEIVER_URL=String(CONFIG.receiverUrl||'').trim();
const DRAFT_KEY='apathy-fe-clean-v2-guided';
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

    // Workflow permission only. Never alter submitted HADS answers or scores.
    answers._guided_hads_blocked=0;
    answers._guided_hads_passed=1;
    answers._guided_hads_staff_override=1;
    answers._guided_hads_staff_override_at=String(result.allowed_at||new Date().toISOString());
    draft.answers=answers;
    writeDraft(draft);

    // Reload into the existing guided flow; it will continue after the HADS gate.
    window.location.reload();
  }catch(_){
    // Keep the participant safely blocked when the approval check is unavailable.
  }finally{
    checking=false;
  }
}

checkResume();
window.setInterval(checkResume,30000);
})();
