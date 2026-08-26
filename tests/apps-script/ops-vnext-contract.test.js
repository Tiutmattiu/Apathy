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

assert.match(outputSource, /diagnosis_summary:diagnosisSummary/);
assert.match(diagnosisSource, /traceLeafMatches_\(x,spec\.eventPatterns\)/);
assert.doesNotMatch(diagnosisSource, /traceLeafMatches_\(x,spec\)/);
assert.match(outputSource, /BOSS_MUST_HAVE_90_COLUMNS/);
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
assert.match(traceSource, /apathyDiagnosisClassify_/);
assert.doesNotMatch([diagnosisSource, outputSource, helperSource, traceSource].join('\n'), /P\d{3,}|S\d{3,}/);

console.log('PASS: Operations vNext shared diagnosis, Boss/Trace wiring, Admin preview and no-Raw-write contracts.');
