'use strict';

var core = require('./diagnosis-core');
var D = core.APATHY_FIELD_DIAGNOSIS;
var A = core.APATHY_FIELD_ACTION;

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(label + ': expected=' + expected + ', actual=' + actual);
  }
}

function assertTrue(actual, label) {
  if (actual !== true) throw new Error(label + ': expected true');
}

function runCase(name, input, expectedDiagnosis, expectedBreak, expectedAction) {
  var result = core.apathyDiagnoseBossField(input);
  assertEqual(result.primary_diagnosis, expectedDiagnosis, name + '.diagnosis');
  assertEqual(result.first_break, expectedBreak, name + '.first_break');
  assertEqual(result.action_class, expectedAction, name + '.action_class');
  return result;
}

var results = [];

results.push(runCase(
  'valid nonblank zero',
  {field:'A_HADS', current_value:0, applicable:true},
  D.RESOLVED,
  '',
  A.NONE
));

results.push(runCase(
  'non applicable blank',
  {field:'Total_LEDD', current_value:'', applicable:false, expected_blank:true},
  D.EXPECTED,
  '',
  A.NONE
));

results.push(runCase(
  'required source absent',
  {
    field:'Age', current_value:'', applicable:true, required:true,
    source:{exists:false, formal_exists:false, required:true}
  },
  D.NO_SOURCE,
  'FORMAL_SOURCE',
  A.STAFF
));

results.push(runCase(
  'identity unresolved with formal evidence',
  {
    field:'GAS', current_value:'', applicable:true, required:true,
    source:{exists:true, formal_exists:true},
    identity:{unresolved:true}
  },
  D.IDENTITY,
  'IDENTITY_ASSIGNMENT',
  A.RESOLVE
));

results.push(runCase(
  'authority gate',
  {
    field:'Total_LEDD', current_value:'', applicable:true,
    source:{exists:true, formal_exists:true},
    review:{authority_gated:true, first_break:'MEDICATION_FINAL_SOURCE'}
  },
  D.REVIEW_GATE,
  'MEDICATION_FINAL_SOURCE',
  A.NONE
));

results.push(runCase(
  'participant projection break',
  {
    field:'UPDRS3', current_value:'', applicable:true,
    source:{exists:true, formal_exists:true},
    participant:{has_required_evidence:false}
  },
  D.PIPELINE_BREAK,
  'PARTICIPANT',
  A.ESCALATE
));

results.push(runCase(
  'result projection break',
  {
    field:'MoCA_Raw', current_value:'', applicable:true,
    source:{exists:true, formal_exists:true},
    participant:{has_required_evidence:true},
    result:{expected:true, has_publishable_value:false}
  },
  D.PIPELINE_BREAK,
  'RESULT',
  A.ESCALATE
));

results.push(runCase(
  'boss publication break',
  {
    field:'SAS', current_value:'', applicable:true,
    source:{exists:true, formal_exists:true},
    participant:{has_required_evidence:true},
    result:{expected:true, has_publishable_value:true},
    publication:{upstream_publishable_value_exists:true}
  },
  D.PIPELINE_BREAK,
  'BOSS_PUBLICATION',
  A.ESCALATE
));

results.push(runCase(
  'unknown collection expectation',
  {
    field:'Optional_Field', current_value:'', applicable:true,
    source:{exists:false, formal_exists:false}
  },
  D.UNKNOWN,
  'UNCLASSIFIED_SOURCE_EXPECTATION',
  A.NONE
));

var summary = core.apathySummarizeBossDiagnoses(results);
assertEqual(summary.total, 9, 'summary.total');
assertEqual(summary.resolved_nonblank, 1, 'summary.resolved_nonblank');
assertEqual(summary.expected_or_not_applicable, 1, 'summary.expected');
assertEqual(summary.no_formal_source, 1, 'summary.no_source');
assertEqual(summary.review_or_authority_gated, 1, 'summary.review_gate');
assertEqual(summary.identity_unresolved, 1, 'summary.identity');
assertEqual(summary.pipeline_break, 3, 'summary.pipeline_break');
assertEqual(summary.unknown, 1, 'summary.unknown');
assertEqual(summary.actionable_staff_items, 2, 'summary.actionable_staff_items');
assertEqual(summary.technical_escalations, 3, 'summary.technical_escalations');

assertTrue(results[1].note.indexOf('EXPECTED_OR_NOT_APPLICABLE') >= 0, 'expected note diagnosis');
assertTrue(results[2].note.indexOf('Staff action: YES') >= 0, 'source gap note action');
assertTrue(results[5].note.indexOf('technical escalation') >= 0, 'pipeline note escalation');

console.log(JSON.stringify({ok:true, cases:results.length, summary:summary}, null, 2));
