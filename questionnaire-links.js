'use strict';
(function(){
 const catalog=Object.freeze([
  ['hads','HADS'],['sas','SAS'],['quip','QUIP'],['quiprs','QUIP-RS'],['rbdsq','RBDSQ'],
  ['gas','GAS'],['ami','AMI-18'],['cdars','C-DARS'],['rgpts','R-GPTS'],['pdi','PDI-21'],['ior','IOR']
 ].map(([id,label])=>Object.freeze({id,label})));
 function selection(input){
  const values=Array.isArray(input)?input:String(input||'').split(',');
  const chosen=new Set(values.map(s=>String(s).trim().toLowerCase()).filter(Boolean));
  if(!chosen.size||[...chosen].some(id=>!catalog.some(q=>q.id===id)))throw new Error('請選擇有效問卷。');
  return catalog.filter(q=>chosen.has(q.id)).map(q=>q.id);
 }
 function invitation(value){const id=String(value||'default');if(!/^[a-zA-Z0-9_-]{1,100}$/.test(id))throw new Error('問卷連結無效。');return id;}
 function link(base,chosen,id){const url=new URL(base);url.search='';url.hash='';url.searchParams.set('flow','questionnaires');url.searchParams.set('scales',selection(chosen).join(','));url.searchParams.set('request',invitation(id));return url.toString();}
 function draftKey(chosen,id){return 'questionnaires_'+selection(chosen).join('_')+'_'+invitation(id);}
 function identity(answers){
  const name=String(answers.participant_name||'').trim(),raw=String(answers.contact_phone||'').trim();
  const phone=raw.replace(/\D/g,'').replace(/^852(?=\d{8}$)/,'');
  const age=Number(answers.age_years),gender=String(answers.gender||'');
  if(!name)throw new Error('請填寫姓名。');
  if(!/^[+\d\s()-]+$/.test(raw)||!/^\d{8}$/.test(phone))throw new Error('請填寫八位香港聯絡電話。');
  if(String(answers.age_years??'').trim()===''||!Number.isInteger(age)||age<1||age>120)throw new Error('請填寫有效年齡（1–120歲）。');
  if(!['M','F'].includes(gender))throw new Error('請選擇性別。');
  return {participant_name:name,contact_phone:phone,contact_phone_normalized:phone,age_years:age,gender};
 }
 function pages(chosen,bank){
  const out=[
   {section:'身份確認',kind:'input',label:'姓名',key:'participant_name',inputType:'text'},
   {section:'身份確認',kind:'input',label:'聯絡電話',key:'contact_phone',inputType:'tel'},
   {section:'身份確認',kind:'input',label:'年齡',key:'age_years',inputType:'number'},
   {section:'身份確認',kind:'scale',label:'性別',key:'gender',options:[{value:'M',label:'男'},{value:'F',label:'女'}]}
  ];
  function add(id,item,label){out.push({questionnaire:id,section:catalog.find(q=>q.id===id).label,kind:'scale',key:item.name||item.responseName,label:label||item.fullLabel||item.combinedFormalLabel,options:item.options||item.responseOptions});}
  selection(chosen).forEach(id=>{
   if(['hads','sas','gas','ami','rgpts'].includes(id)){const key=id==='ami'?'ami18':id;bank[key].items.forEach((x,index)=>add(id,id==='sas'?{...x,options:x.responseOptions.map((option,j)=>({label:option.label,value:bank.sas.scoring.displayOrderByItem[index+1][j]}))}:x));return;}
   if(id==='quip'){
    bank.quip.matrixCells.forEach(x=>add(id,{name:x.name,options:[{value:0,label:'否'},{value:1,label:'是'}]},x.fullStem+'（'+(x.domain==='B'?'B':x.fullDomainLabel)+'）'));
    bank.quip.additionalItems.forEach(x=>{add(id,{name:x.name,options:[{value:0,label:'否'},{value:1,label:'是'}]},x.fullLabel);if(x.detailField)out.push({questionnaire:id,section:'QUIP',kind:'input',key:x.detailField,label:x.detailPrompt||'請具體描述',when:x.name});});return;
   }
   if(id==='quiprs'){bank.quiprs.matrixCells.forEach(x=>add(id,x,x.fullStem+'（'+(x.domain==='B'?'B':x.fullDomainLabel)+'）'));return;}
   if(id==='rbdsq'){
    add(id,{name:bank.rbdsq.sourceField,options:bank.rbdsq.sourceOptions},'資料由誰提供？');
    bank.rbdsq.items.concat(bank.rbdsq.diseaseItems).forEach(x=>{add(id,{name:x.name,options:x.options||[{value:0,label:'否'},{value:1,label:'是'}]},x.fullLabel);if(x.detailField)out.push({questionnaire:id,section:'RBDSQ',kind:'input',key:x.detailField,label:'請說明其他疾病／情況',when:x.name});});return;
   }
   if(id==='cdars'){
    bank.cdars.domains.forEach(d=>{[d.example1Field,d.example2Field].forEach((key,index)=>out.push({questionnaire:id,section:'C-DARS',kind:'input',key,label:d.examplePrompt+'（'+(index===0?'第一':'第二')+'個例子）'}));bank.cdars.items.filter(x=>x.domain===d.key).forEach(x=>{add(id,x);out[out.length-1].examples=[d.example1Field,d.example2Field];});});return;
   }
   if(id==='pdi'){bank.pdi21.items.forEach((pdi,index)=>out.push({questionnaire:id,section:'PDI-21',kind:'pdiItem',label:'PDI '+(index+1)+'/21',pdi,item:index+1,total:21}));return;}
   bank.ior.items.forEach(x=>add(id,x,x.combinedFormalLabel));
  });
  out.push({section:'完成',kind:'selectiveSummary',label:'檢查並提交'});return out;
 }
 function payload(chosen,answers,submissionId,submittedAt){
  const selected=selection(chosen),person=identity(answers);
  const output={schema_version:'apathy-event-payload-v1',frontend_release:'FE-SELECTIVE-QUESTIONNAIRES-2026-10-14',receiver_contract_expected:'APATHY-RECEIVER-C2-2026-08-19',submission_id:submissionId,event_type:'questionnaire_supplement',form_type:'backfill',workflow_stage:'questionnaire_supplement',workflow_part:'questionnaires:'+selected.join(','),record_status:'partial',data_source:'participant_remote',participant_id:'PHONE-'+person.contact_phone_normalized,submitted_at:submittedAt,selected_questionnaires:selected,...person};
  selected.forEach(id=>{
   const pattern=new RegExp('^'+id+'(?:\\d|_)');
   Object.keys(answers).filter(k=>pattern.test(k)||id==='rbdsq'&&k==='rbq10_none_confirmed').forEach(k=>{if(answers[k]!==undefined)output[k]=answers[k];});
  });return output;
 }
 window.APATHY_QUESTIONNAIRE_LINKS=Object.freeze({catalog,selection,link,draftKey,identity,pages,payload});
})();
