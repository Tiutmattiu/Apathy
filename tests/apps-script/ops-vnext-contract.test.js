'use strict';
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const backend = path.resolve(root, process.argv[2] || 'backend');
const diagnosisSource = fs.readFileSync(path.join(backend, 'diagnosis.js'), 'utf8');
const outputSource = fs.readFileSync(path.join(backend, 'output.js'), 'utf8');
const helperSource = fs.readFileSync(path.join(backend, 'helper.js'), 'utf8');
const traceSource = fs.readFileSync(path.join(backend, 'trace.js'), 'utf8');
const context = {};
vm.createContext(context);
vm.runInContext(diagnosisSource, context);
vm.runInContext(traceSource, context);

function classify(overrides) {
  return context.apathyDiagnosisClassify_(Object.assign({field:'fixture', current_value:'', applicable:true, source_required:true}, overrides));
}

assert.strictEqual(classify({applicable:false}).primary_diagnosis, 'NON_APPLICABLE');
assert.strictEqual(classify({applicable:false}).action_class, 'TRACE_ONLY_NO_ACTION');
assert.strictEqual(classify({source_present:false}).primary_diagnosis, 'NO_FORMAL_SOURCE');
assert.strictEqual(classify({source_present:true}).primary_diagnosis, 'SOURCE_EXISTS_PARTICIPANT_BREAK');
assert.strictEqual(classify({source_present:true}).action_class, 'ESCALATE');
assert.strictEqual(classify({participant_present:true}).primary_diagnosis, 'PARTICIPANT_EXISTS_RESULT_GATE');
assert.strictEqual(classify({review_gated:true}).primary_diagnosis, 'REVIEW_OR_AUTHORITY_GATED');
assert.strictEqual(classify({result_present:true}).primary_diagnosis, 'RESULT_EXISTS_BOSS_PUBLICATION_BREAK');
assert.strictEqual(classify({identity_unresolved:true}).action_class, 'RESOLVABLE_IN_APP');
assert.strictEqual(classify({current_value:0}).primary_diagnosis, 'RESOLVED_WITH_FORMAL_EVIDENCE');
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(context.apathyDiagnosisAdminAction_('IDENTITY_REVIEW'))),
  {action_class:'RESOLVABLE_IN_APP', diagnosis_code:'IDENTITY_UNRESOLVED'}
);

function exactDiagnosis(field, options) {
  options = options || {};
  const spec = context.traceFieldSpec_(field);
  const resultRow = options.result || {};
  const medicationRow = options.medication || {};
  const decisionRow = options.decision || {};
  const participantFields = options.participantFields || [];
  const leaves = (options.leaves || []).filter(x => context.traceLeafMatches_(x, spec.eventPatterns));
  const reviews = (options.reviews || []).filter(x => context.traceReviewMatches_(x, spec));
  return context.traceDiagnose_('', field, options.bossValue === undefined ? '' : options.bossValue, spec,
    context.tracePickFields_(resultRow, spec.resultFields),
    context.tracePickFields_(medicationRow, spec.medicationFields),
    context.tracePickFields_(decisionRow, spec.decisionFields), participantFields, reviews, leaves, leaves,
    context.traceAuthorityFields_(resultRow, medicationRow, decisionRow, spec));
}

const formalLeaf = path => ({formal_research_input:1, value_present:1, disposition:'FORMAL', payload_path:path});
assert.strictEqual(exactDiagnosis('Total_LEDD', {medication:{final_da:10, final_source:'legacy_master_clinical_verified'}}).primary_diagnosis, 'REVIEW_OR_AUTHORITY_GATED');
assert.strictEqual(exactDiagnosis('Total_LEDD', {medication:{final_da:10}}).primary_diagnosis, 'NO_FORMAL_SOURCE');
assert.strictEqual(exactDiagnosis('Total_LEDD', {medication:{final_source:'pending', final_status:'pending'}}).primary_diagnosis, 'REVIEW_OR_AUTHORITY_GATED');
assert.strictEqual(exactDiagnosis('Total_LEDD', {medication:{final_total:0}, leaves:[formalLeaf('ledd_final_total')]}).primary_diagnosis, 'RESULT_EXISTS_BOSS_PUBLICATION_BREAK');
assert.strictEqual(exactDiagnosis('Age', {reviews:[{review_code:'MOCA_REVIEW_PENDING', detail:'generic moca review'}]}).primary_diagnosis, 'NO_FORMAL_SOURCE');
assert.strictEqual(exactDiagnosis('Age', {result:{moca_review_code:'age'}, reviews:[{review_code:'MOCA_REVIEW_PENDING',detail:'generic moca review'}]}).primary_diagnosis, 'NO_FORMAL_SOURCE');
assert.strictEqual(exactDiagnosis('Age', {result:{moca_age_years:66}, reviews:[{review_code:'MOCA_REVIEW_PENDING',detail:'generic moca review'}]}).primary_diagnosis, 'RESULT_EXISTS_BOSS_PUBLICATION_BREAK');
assert.strictEqual(exactDiagnosis('Age', {result:{moca_age_years:66}, leaves:[formalLeaf('moca_1_age_years')]}).primary_diagnosis, 'RESULT_EXISTS_BOSS_PUBLICATION_BREAK');
assert.strictEqual(exactDiagnosis('Age', {participantFields:[{field:'state_json.moca_age_years',value:66}], reviews:[{review_code:'MOCA_REVIEW_PENDING',detail:'generic moca review'}]}).primary_diagnosis, 'NO_FORMAL_SOURCE');
assert.strictEqual(exactDiagnosis('Age', {result:{moca_raw_total:25}, leaves:[formalLeaf('moca_1_raw_total')]}).primary_diagnosis, 'NO_FORMAL_SOURCE');
assert.strictEqual(exactDiagnosis('Age', {leaves:[formalLeaf('moca_1_age_years')]}).primary_diagnosis, 'SOURCE_EXISTS_PARTICIPANT_BREAK');
assert.strictEqual(exactDiagnosis('Age', {leaves:[Object.assign(formalLeaf('moca_1_age_years'), {value_present:0})]}).primary_diagnosis, 'NO_FORMAL_SOURCE');
['HY','Total_LEDD','UPDRS3','PD_Duration','Apathy_UPDRS'].forEach(field => {
  assert.strictEqual(exactDiagnosis(field, {participantFields:[{field:'PD_HC', value:'HC'}]}).primary_diagnosis, 'NON_APPLICABLE');
});
assert.strictEqual(exactDiagnosis('HY', {participantFields:[{field:'PD_HC', value:'PD'}]}).primary_diagnosis, 'UNKNOWN');
assert.strictEqual(exactDiagnosis('Age', {bossValue:0}).primary_diagnosis, 'RESOLVED_WITH_FORMAL_EVIDENCE');

assert.match(outputSource, /diagnosis_summary:diagnosisSummary/);
assert.match(diagnosisSource, /traceLeafMatches_\(x,spec\.eventPatterns\)/);
assert.doesNotMatch(diagnosisSource, /traceLeafMatches_\(x,spec\)/);
assert.match(diagnosisSource, /range\.setBackgrounds\(nextBackgrounds\)\.setNotes\(nextNotes\)/);
const scanWriter = diagnosisSource.match(/function apathyDiagnosisApplyBossScan_\([\s\S]*?\n\}/)[0];
assert.doesNotMatch(scanWriter, /scan\.cells\.forEach[\s\S]*?sh\.getRange/);
assert.match(scanWriter, /getRange\(2,1,rows\.length,headers\.length\)/);
assert.match(outputSource, /BOSS_MUST_HAVE_90_COLUMNS/);
assert.match(outputSource, /function apathyOutputRestoreBossHeaderStyle_/);
assert.match(outputSource, /setBackground\('#1F4E78'\)\.setFontColor\('#FFFFFF'\)\.setFontWeight\('bold'\)/);
assert.match(outputSource, /function previewApathyAdminManualArchives\(\)\{return apathyOutputPlanManualArchives_\(\);\}/);
const previewBody = outputSource.match(/function apathyOutputPlanManualArchives_\(\)\{([\s\S]*?)\n\}\nfunction applyApathyAdminManualArchives/)[1];
assert.doesNotMatch(previewBody, /setValue|setValues|appendRow|insertRow|deleteRow|clearContent/);
const applyBody = outputSource.match(/function applyApathyAdminManualArchives\(\)\{([\s\S]*?)\n\}/)[1];
assert.match(applyBody, /Record_Control|RECORD_CONTROL/);
assert.doesNotMatch(applyBody, /Raw|Contactlist|Registry|delete|clearContent/);
assert.match(helperSource, /if \(answer !== ui\.Button\.YES\) return;/);
assert.match(helperSource, /traceShowCurrentBossCell/);
assert.match(traceSource, /function traceShowParticipantSearch\(/);
assert.match(traceSource, /function traceOpenSource\(/);
assert.match(traceSource, /blank_fields:blanks,value_fields:values/);
assert.match(traceSource, /apathyDiagnosisClassify_/);
assert.doesNotMatch([diagnosisSource, outputSource, helperSource, traceSource].join('\n'), /P\d{3,}|S\d{3,}/);

console.log('PASS: Operations vNext shared diagnosis, Boss/Trace wiring, Admin preview and no-Raw-write contracts.');
