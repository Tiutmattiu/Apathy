'use strict';

/**
 * Reference-only Apps Script adapter for Boss scan-mode presentation.
 *
 * It intentionally separates:
 *   facts collection -> pure diagnosis -> bulk presentation.
 *
 * The production adapter must obtain facts from the current authoritative
 * Trace/Output/Result/Participant sources. This file does not define those
 * source mappings and must not be installed blindly.
 */

var APATHY_BOSS_SCAN_REFERENCE_VERSION = 'BOSS-SCAN-REF-2026-08-27-R1';

/**
 * Build a row x column diagnosis matrix without mutating Boss.
 *
 * factResolver signature:
 *   function(rowIndexZeroBased, columnIndexZeroBased, fieldName, rowValues) -> facts
 *
 * Only blank data cells are diagnosed. Identity/control columns may be skipped by
 * returning null from factResolver.
 */
function apathyBuildBossDiagnosisMatrixReference_(headers, rows, factResolver) {
  if (!Array.isArray(headers) || !Array.isArray(rows)) throw new Error('BOSS_SCAN_BAD_MATRIX');
  if (typeof factResolver !== 'function') throw new Error('BOSS_SCAN_FACT_RESOLVER_REQUIRED');

  var diagnoses = [];
  for (var r = 0; r < rows.length; r++) {
    var rowOut = [];
    for (var c = 0; c < headers.length; c++) {
      var value = rows[r][c];
      if (apathyBossScanPresentReference_(value)) {
        rowOut.push(null);
        continue;
      }
      var facts = factResolver(r, c, String(headers[c] || ''), rows[r]);
      if (!facts) {
        rowOut.push(null);
        continue;
      }
      facts.field = facts.field || String(headers[c] || '');
      facts.current_value = value;
      rowOut.push(apathyDiagnoseBossField(facts));
    }
    diagnoses.push(rowOut);
  }
  return diagnoses;
}

/**
 * Apply backgrounds and cell notes in two bulk writes. Values are never changed.
 * Existing Boss values remain untouched, including valid numeric zeroes.
 */
function apathyApplyBossScanPresentationReference_(bossSheet, headers, rows, diagnoses) {
  if (!bossSheet) throw new Error('BOSS_SCAN_SHEET_REQUIRED');
  if (!rows.length || !headers.length) return apathyBossScanEmptySummaryReference_();
  if (!Array.isArray(diagnoses) || diagnoses.length !== rows.length) throw new Error('BOSS_SCAN_DIAGNOSIS_ROW_MISMATCH');

  var backgrounds = [];
  var notes = [];
  var flat = [];

  for (var r = 0; r < rows.length; r++) {
    var bgRow = [];
    var noteRow = [];
    if (!Array.isArray(diagnoses[r]) || diagnoses[r].length !== headers.length) {
      throw new Error('BOSS_SCAN_DIAGNOSIS_COLUMN_MISMATCH:' + (r + 2));
    }
    for (var c = 0; c < headers.length; c++) {
      var d = diagnoses[r][c];
      if (!d) {
        bgRow.push(null);
        noteRow.push(null);
        continue;
      }
      flat.push(d);
      bgRow.push(d.style && d.style.background ? d.style.background : null);
      noteRow.push(d.note || null);
    }
    backgrounds.push(bgRow);
    notes.push(noteRow);
  }

  var range = bossSheet.getRange(2, 1, rows.length, headers.length);

  // setBackgrounds requires a concrete color for each cell. Production wiring
  // should seed unclassified cells from the current Boss presentation baseline.
  // For the reference adapter, null means white baseline.
  var normalizedBackgrounds = backgrounds.map(function(row) {
    return row.map(function(value) { return value || '#FFFFFF'; });
  });
  var normalizedNotes = notes.map(function(row) {
    return row.map(function(value) { return value || ''; });
  });

  range.setBackgrounds(normalizedBackgrounds);
  range.setNotes(normalizedNotes);

  var summary = apathySummarizeBossDiagnoses(flat);
  summary.version = APATHY_BOSS_SCAN_REFERENCE_VERSION;
  summary.styled_blank_cells = flat.filter(function(d) {
    return d && d.style && d.style.tone && d.style.tone !== 'none';
  }).length;
  return summary;
}

function apathyBossScanEmptySummaryReference_() {
  var summary = apathySummarizeBossDiagnoses([]);
  summary.version = APATHY_BOSS_SCAN_REFERENCE_VERSION;
  summary.styled_blank_cells = 0;
  return summary;
}

function apathyBossScanPresentReference_(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value === 'boolean') return true;
  return String(value).trim() !== '';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    APATHY_BOSS_SCAN_REFERENCE_VERSION: APATHY_BOSS_SCAN_REFERENCE_VERSION,
    apathyBuildBossDiagnosisMatrixReference_: apathyBuildBossDiagnosisMatrixReference_
  };
}
