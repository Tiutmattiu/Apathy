/* Pure local JSON codec. Shared by the editor and Node regression tests. */
(function(root){
 'use strict';
 const forbidden=new Set(['__proto__','prototype','constructor']);
 function safe(x){if(x&&typeof x==='object'){for(const k of Object.keys(x)){if(forbidden.has(k))throw Error('JSON包含不支援的欄位');safe(x[k]);}}return x;}
 function value(v){return v===undefined||v===null||v===''?null:v;}
 function equal(a,b){a=value(a);b=value(b);return a===b||a!==null&&b!==null&&typeof a!=='object'&&typeof b!=='object'&&String(a)===String(b);}
 function parse(input){let x=safe(typeof input==='string'?JSON.parse(input):input);if(!x||typeof x!=='object'||Array.isArray(x))throw Error('請選擇一份參加者提交JSON');if(x.correction&&x.original){if(!Array.isArray(x.correction.changes)||x.correction.changes.some(c=>!c||forbidden.has(c.field)||!/^\w+$/.test(c.field)||c.after!==null&&!['string','number','boolean'].includes(typeof c.after)))throw Error('修改清單格式不正確');x=x.original;}else if(x.data&&typeof x.data==='object')x=x.data;if(typeof x.payload_json==='string')x=JSON.parse(x.payload_json);safe(x);if(!x.submission_id||!['screening_core','stage_2_questionnaires','first_school_assessment','mri_scan','clinical_supplement','historical_paper_reentry','questionnaire_supplement'].includes(x.event_type))throw Error('找不到原Submission ID或支援的表單類型；不會當作新提交');return JSON.parse(JSON.stringify(x));}
 function changes(original,edited,keys){return [...new Set(keys)].filter(k=>!equal(original[k],edited[k])).map(field=>({field,before:value(original[field]),after:value(edited[field])}));}
 const api={parse,changes,equal,value};if(typeof module==='object'&&module.exports)module.exports=api;else root.ApathyRecordCorrection=api;
})(typeof window==='object'?window:globalThis);
