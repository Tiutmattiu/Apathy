# Apathy Frontend v10.0.8 Medication/MRI Rescue Test

Status: manual test candidate only. Do not deploy as production.

## Included files

- index.html
- style.css
- question-bank.js
- config.js
- app.js

## Locked behavior

- Clinical and Backfill remain separate workflows.
- Medication is available only inside Clinical and historical Backfill.
- MRI records visit-day ON/OFF only and does not parse medication or calculate LEDD.
- Medication begins with zero rows.
- Parsing displays only detected drugs.
- Each click on Add Medication adds one blank drug only.
- LEDD totals are Levodopa, DA, and Total only.
- No AI reference label and no Other LEDD total.
- Clinical can save unresolved medication/LEDD.
- Backfill does not collect historical ON/OFF.

## Manual smoke-test order

1. Open Home and verify five staff workflows remain available.
2. Enter Clinical and verify the page renders without a JavaScript error.
3. Enter medication text and parse it.
4. Confirm only detected drugs are shown.
5. Click Add Medication once and confirm only one row is added.
6. Change strength, units per time, and times per day, then verify totals recalculate.
7. Verify a drug and confirm the selected button uses dark blue, white text, and a check mark.
8. Confirm unresolved medication does not block saving Clinical.
9. Open Backfill and confirm medication is historical only, without historical ON/OFF.
10. Open MRI and confirm there is no medication parser or LEDD calculator.
11. Test GAS numeric entry, PDI, IOR, QUIP-RS, and UPDRS keyboard behavior.
12. Reload a draft and verify selected states, medication rows, and final LEDD persist.

## Not yet certified

- Production Receiver acceptance of new medication fields
- Assessment Master and Domain recalculation
- Full browser matrix and mobile acceptance
