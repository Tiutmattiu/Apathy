'use strict';

/**
 * APATHY field-diagnosis reference core.
 *
 * Status: NON-PRODUCTION REFERENCE IMPLEMENTATION.
 * Purpose: define deterministic semantics shared by Boss scan mode, Trace and Admin.
 *
 * This file is intentionally data-agnostic. It does not read/write Google Sheets,
 * Raw, Registry, Record_Control, Participant, Result, Boss or Admin. Production
 * adapters must construct the input facts from current authoritative sources.
 */

var APATHY_FIELD_DIAGNOSIS_VERSION = 'FIELD-DIAGNOSIS-REF-2026-08-27-R1';

var APATHY_FIELD_DIAGNOSIS = Object.freeze({
  RESOLVED: 'RESOLVED_WITH_FORMAL_EVIDENCE',
  EXPECTED: 'EXPECTED_OR_NOT_APPLICABLE',
  NO_SOURCE: 'NO_FORMAL_SOURCE',
  REVIEW_GATE: 'REVIEW_OR_AUTHORITY_GATED',
  IDENTITY: 'IDENTITY_UNRESOLVED',
  PIPELINE_BREAK: 'PIPELINE_BREAK',
  UNKNOWN: 'UNKNOWN'
});

var APATHY_FIELD_ACTION = Object.freeze({
  NONE: 'TRACE_ONLY_NO_ACTION',
  STAFF: 'STAFF_DATA_ACTION',
  RESOLVE: 'RESOLVABLE_IN_APP',
  ESCALATE: 'ESCALATE'
});

var APATHY_FIELD_STYLE = Object.freeze({
  RESOLVED: Object.freeze({tone:'none', background:''}),
  EXPECTED: Object.freeze({tone:'neutral', background:'#E7E6E6'}),
  NO_SOURCE: Object.freeze({tone:'warning', background:'#FFF2CC'}),
  REVIEW_GATE: Object.freeze({tone:'review', background:'#FCE4D6'}),
  IDENTITY: Object.freeze({tone:'identity', background:'#E4DFEC'}),
  PIPELINE_BREAK: Object.freeze({tone:'error', background:'#F4CCCC'}),
  UNKNOWN: Object.freeze({tone:'none', background:''})
});

function apathyFieldPresent_(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'boolean') return true;
  return String(value).trim() !== '';
}

function apathyFieldBool_(value) {
  return value === true || value === 1 || String(value).toLowerCase() === 'true';
}

function apathyFieldFacts_(input) {
  input = input || {};
  return {
    field: String(input.field || ''),
    domain: String(input.domain || ''),
    currentValue: input.current_value,
    applicable: input.applicable,
    required: input.required,
    expectedBlank: input.expected_blank,
    source: input.source || {},
    identity: input.identity || {},
    participant: input.participant || {},
    result: input.result || {},
    review: input.review || {},
    publication: input.publication || {}
  };
}

/**
 * Deterministic diagnosis for one Boss field.
 *
 * Input facts should be explicit booleans where known. Unknown is represented by
 * null/undefined, not false. This keeps the resolver conservative: lack of proof
 * never becomes a pipeline defect automatically.
 */
function apathyDiagnoseBossField(input) {
  var f = apathyFieldFacts_(input);
  var valuePresent = apathyFieldPresent_(f.currentValue);

  if (valuePresent) {
    return apathyFieldDiagnosisResult_(f, {
      primary_diagnosis: APATHY_FIELD_DIAGNOSIS.RESOLVED,
      first_break: '',
      action_class: APATHY_FIELD_ACTION.NONE,
      staff_action_required: false,
      human_explanation: 'Boss already contains a publishable value.',
      suggested_action: 'No action.'
    });
  }

  if (f.applicable === false || f.expectedBlank === true) {
    return apathyFieldDiagnosisResult_(f, {
      primary_diagnosis: APATHY_FIELD_DIAGNOSIS.EXPECTED,
      first_break: '',
      action_class: APATHY_FIELD_ACTION.NONE,
      staff_action_required: false,
      human_explanation: 'This blank is expected or the field is not applicable for this participant/context.',
      suggested_action: 'No action.'
    });
  }

  var formalSourceExists = f.source.formal_exists;
  var sourceExists = f.source.exists;
  var sourceRequired = f.required === true || f.source.required === true;
  var identityUnresolved = f.identity.unresolved === true;

  if (identityUnresolved && (sourceExists === true || formalSourceExists === true)) {
    return apathyFieldDiagnosisResult_(f, {
      primary_diagnosis: APATHY_FIELD_DIAGNOSIS.IDENTITY,
      first_break: 'IDENTITY_ASSIGNMENT',
      action_class: APATHY_FIELD_ACTION.RESOLVE,
      staff_action_required: true,
      human_explanation: 'Formal evidence exists but is not deterministically assigned to a participant.',
      suggested_action: 'Resolve the submission identity through the supported control workflow; do not edit Raw.'
    });
  }

  if (formalSourceExists === false && sourceRequired) {
    return apathyFieldDiagnosisResult_(f, {
      primary_diagnosis: APATHY_FIELD_DIAGNOSIS.NO_SOURCE,
      first_break: 'FORMAL_SOURCE',
      action_class: APATHY_FIELD_ACTION.STAFF,
      staff_action_required: true,
      human_explanation: 'The field is applicable and required, but no formal source evidence was found.',
      suggested_action: 'Locate the original source/draft or collect the genuinely missing required evidence.'
    });
  }

  if (f.review.gated === true || f.review.authority_gated === true) {
    return apathyFieldDiagnosisResult_(f, {
      primary_diagnosis: APATHY_FIELD_DIAGNOSIS.REVIEW_GATE,
      first_break: String(f.review.first_break || 'REVIEW_OR_AUTHORITY'),
      action_class: APATHY_FIELD_ACTION.NONE,
      staff_action_required: false,
      human_explanation: String(f.review.explanation || 'Evidence exists, but review or authority rules currently block publication.'),
      suggested_action: String(f.review.suggested_action || 'Do not recollect data automatically; inspect the review/authority lineage.')
    });
  }

  if (formalSourceExists === true && f.participant.has_required_evidence === false) {
    return apathyFieldDiagnosisResult_(f, {
      primary_diagnosis: APATHY_FIELD_DIAGNOSIS.PIPELINE_BREAK,
      first_break: 'PARTICIPANT',
      action_class: APATHY_FIELD_ACTION.ESCALATE,
      staff_action_required: false,
      human_explanation: 'Formal source evidence exists, but the required Participant evidence/current-state projection is absent.',
      suggested_action: 'Escalate as a Participant projection defect; do not re-enter source data.'
    });
  }

  if (f.participant.has_required_evidence === true && f.result.expected === true && f.result.has_publishable_value === false) {
    return apathyFieldDiagnosisResult_(f, {
      primary_diagnosis: APATHY_FIELD_DIAGNOSIS.PIPELINE_BREAK,
      first_break: 'RESULT',
      action_class: APATHY_FIELD_ACTION.ESCALATE,
      staff_action_required: false,
      human_explanation: 'Participant evidence is present and a Result should be publishable, but the Result value is absent.',
      suggested_action: 'Escalate as a Result projection/calculation-path defect; preserve existing evidence.'
    });
  }

  if (f.publication.upstream_publishable_value_exists === true) {
    return apathyFieldDiagnosisResult_(f, {
      primary_diagnosis: APATHY_FIELD_DIAGNOSIS.PIPELINE_BREAK,
      first_break: 'BOSS_PUBLICATION',
      action_class: APATHY_FIELD_ACTION.ESCALATE,
      staff_action_required: false,
      human_explanation: 'A publishable upstream value exists, but Boss is blank.',
      suggested_action: 'Escalate as a Boss publication defect; do not change upstream evidence.'
    });
  }

  if (formalSourceExists === false && sourceRequired !== true) {
    return apathyFieldDiagnosisResult_(f, {
      primary_diagnosis: APATHY_FIELD_DIAGNOSIS.UNKNOWN,
      first_break: 'UNCLASSIFIED_SOURCE_EXPECTATION',
      action_class: APATHY_FIELD_ACTION.NONE,
      staff_action_required: false,
      human_explanation: 'No formal source was found, but current rules do not prove that this field is required here.',
      suggested_action: 'Inspect applicability/collection rules before creating a staff task.'
    });
  }

  return apathyFieldDiagnosisResult_(f, {
    primary_diagnosis: APATHY_FIELD_DIAGNOSIS.UNKNOWN,
    first_break: 'UNCLASSIFIED',
    action_class: APATHY_FIELD_ACTION.NONE,
    staff_action_required: false,
    human_explanation: 'Available evidence is insufficient for a safe automatic classification.',
    suggested_action: 'Open Trace for evidence; do not infer missingness from the blank alone.'
  });
}

function apathyFieldDiagnosisResult_(facts, result) {
  var style = apathyFieldDiagnosisStyle_(result.primary_diagnosis);
  return {
    version: APATHY_FIELD_DIAGNOSIS_VERSION,
    field: facts.field,
    domain: facts.domain,
    current_value: facts.currentValue,
    applicable: facts.applicable,
    expected_blank: facts.expectedBlank,
    source_status: apathyFieldStatusText_(facts.source),
    participant_status: apathyFieldStatusText_(facts.participant),
    result_status: apathyFieldStatusText_(facts.result),
    review_status: apathyFieldStatusText_(facts.review),
    first_break: result.first_break,
    primary_diagnosis: result.primary_diagnosis,
    action_class: result.action_class,
    staff_action_required: result.staff_action_required === true,
    human_explanation: result.human_explanation,
    suggested_action: result.suggested_action,
    style: style,
    note: apathyFieldDiagnosisNote_(result, style)
  };
}

function apathyFieldStatusText_(obj) {
  obj = obj || {};
  if (obj.status !== undefined && obj.status !== null && String(obj.status).trim() !== '') return String(obj.status);
  if (obj.exists === true || obj.formal_exists === true || obj.has_required_evidence === true || obj.has_publishable_value === true) return 'present';
  if (obj.exists === false || obj.formal_exists === false || obj.has_required_evidence === false || obj.has_publishable_value === false) return 'absent';
  if (obj.gated === true || obj.authority_gated === true) return 'gated';
  return 'unknown';
}

function apathyFieldDiagnosisStyle_(diagnosis) {
  if (diagnosis === APATHY_FIELD_DIAGNOSIS.EXPECTED) return APATHY_FIELD_STYLE.EXPECTED;
  if (diagnosis === APATHY_FIELD_DIAGNOSIS.NO_SOURCE) return APATHY_FIELD_STYLE.NO_SOURCE;
  if (diagnosis === APATHY_FIELD_DIAGNOSIS.REVIEW_GATE) return APATHY_FIELD_STYLE.REVIEW_GATE;
  if (diagnosis === APATHY_FIELD_DIAGNOSIS.IDENTITY) return APATHY_FIELD_STYLE.IDENTITY;
  if (diagnosis === APATHY_FIELD_DIAGNOSIS.PIPELINE_BREAK) return APATHY_FIELD_STYLE.PIPELINE_BREAK;
  if (diagnosis === APATHY_FIELD_DIAGNOSIS.RESOLVED) return APATHY_FIELD_STYLE.RESOLVED;
  return APATHY_FIELD_STYLE.UNKNOWN;
}

function apathyFieldDiagnosisNote_(result, style) {
  if (!style || style.tone === 'none') return '';
  return [
    String(result.primary_diagnosis || ''),
    'First break: ' + String(result.first_break || 'none'),
    'Staff action: ' + (result.staff_action_required ? 'YES' : (result.action_class === APATHY_FIELD_ACTION.ESCALATE ? 'NO — technical escalation' : 'NO')),
    String(result.human_explanation || ''),
    'Click this Boss cell to open Trace for evidence.'
  ].join('\n');
}

function apathySummarizeBossDiagnoses(diagnoses) {
  var summary = {
    total: 0,
    resolved_nonblank: 0,
    expected_or_not_applicable: 0,
    no_formal_source: 0,
    review_or_authority_gated: 0,
    identity_unresolved: 0,
    pipeline_break: 0,
    unknown: 0,
    actionable_staff_items: 0,
    technical_escalations: 0
  };
  (diagnoses || []).forEach(function(d) {
    if (!d) return;
    summary.total += 1;
    if (d.primary_diagnosis === APATHY_FIELD_DIAGNOSIS.RESOLVED) summary.resolved_nonblank += 1;
    else if (d.primary_diagnosis === APATHY_FIELD_DIAGNOSIS.EXPECTED) summary.expected_or_not_applicable += 1;
    else if (d.primary_diagnosis === APATHY_FIELD_DIAGNOSIS.NO_SOURCE) summary.no_formal_source += 1;
    else if (d.primary_diagnosis === APATHY_FIELD_DIAGNOSIS.REVIEW_GATE) summary.review_or_authority_gated += 1;
    else if (d.primary_diagnosis === APATHY_FIELD_DIAGNOSIS.IDENTITY) summary.identity_unresolved += 1;
    else if (d.primary_diagnosis === APATHY_FIELD_DIAGNOSIS.PIPELINE_BREAK) summary.pipeline_break += 1;
    else summary.unknown += 1;

    if (d.staff_action_required === true) summary.actionable_staff_items += 1;
    if (d.action_class === APATHY_FIELD_ACTION.ESCALATE) summary.technical_escalations += 1;
  });
  return summary;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    APATHY_FIELD_DIAGNOSIS_VERSION: APATHY_FIELD_DIAGNOSIS_VERSION,
    APATHY_FIELD_DIAGNOSIS: APATHY_FIELD_DIAGNOSIS,
    APATHY_FIELD_ACTION: APATHY_FIELD_ACTION,
    APATHY_FIELD_STYLE: APATHY_FIELD_STYLE,
    apathyDiagnoseBossField: apathyDiagnoseBossField,
    apathySummarizeBossDiagnoses: apathySummarizeBossDiagnoses
  };
}
