/* Pure local JSON codec. Shared by the editor and Node regression tests. */
(function(root){
 'use strict';
 const forbidden=new Set(['__proto__','prototype','constructor']);
 function safe(x){if(x&&typeof x==='object'){for(const k of Object.keys(x)){if(forbidden.has(k))throw Error('JSON包含不支援的欄位');safe(x[k]);}}return x;}
 function value(v){return v===undefined||v===null||v===''?null:v;}
 function equal(a,b){a=value(a);b=value(b);return a===b||a!==null&&b!==null&&typeof a!=='object'&&typeof b!=='object'&&String(a)===String(b);}
 function parse(input){let x=safe(typeof input==='string'?JSON.parse(input):input);if(!x||typeof x!=='object'||Array.isArray(x))throw Error('請選擇一份參加者提交JSON');if(x.correction&&x.original){if(!Array.isArray(x.correction.changes)||x.correction.changes.some(c=>!c||forbidden.has(c.field)||!/^\w+$/.test(c.field)||c.after!==null&&!['string','number','boolean'].includes(typeof c.after)))throw Error('修改清單格式不正確');x=x.original;}else if(x.data&&typeof x.data==='object')x=x.data;if(typeof x.payload_json==='string')x=JSON.parse(x.payload_json);safe(x);if(!x.submission_id||!['screening_core','stage_2_questionnaires','first_school_assessment','mri_scan','clinical_supplement','historical_paper_reentry','questionnaire_supplement'].includes(x.event_type))throw Error('找不到原Submission ID或支援的表單類型；不會當作新提交');return JSON.parse(JSON.stringify(x));}
 function changes(original,edited,keys){return [...new Set(keys)].filter(k=>!equal(original[k],edited[k])).map(field=>({field,before:value(original[field]),after:value(edited[field])}));}
 function resolvePerson(people,query){
  const normalized=v=>String(v??'').normalize('NFKC').trim().replace(/\s+/g,' ').toUpperCase();
  const phone=v=>{const text=String(v??'').normalize('NFKC').trim();if(!/^[+\d\s()-]+$/.test(text))return '';const digits=text.replace(/\D/g,'').replace(/^852(?=\d{8}$)/,'');return /^\d{8}$/.test(digits)?digits:'';};
  const key=normalized(query),number=phone(query);
  if(!key)throw Error('請提供電話、PID、SID 或姓名其中一項以配對參加者');
  const found=people.filter(p=>['pid','sid','name'].some(k=>normalized(p[k])===key)||number&&phone(p.phone)===number);
  if(!found.length)throw Error('找不到配對參加者，請核對完整電話、PID、SID 或姓名');
  if(found.length!==1)throw Error('配對到多位參加者，請改用另一項資料以確認唯一配對');
  if(!found[0].pid)throw Error('參加者尚未完成後台配對，請先在工作台確認配對');
  return found[0];
 }
 const api={parse,changes,equal,value,resolvePerson};if(typeof module==='object'&&module.exports)module.exports=api;else root.ApathyRecordCorrection=api;
})(typeof window==='object'?window:globalThis);
