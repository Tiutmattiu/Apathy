// @ts-nocheck
'use strict';
window.FORM_CONFIG = Object.freeze({
  version: '10.0-file-by-file',
  receiverVersionExpected: '3.1',
  receiverUrl: 'https://script.google.com/macros/s/AKfycbzK5d_w3IgytNY9XpImHsTr2o0Wyxl52wlymmcAPaFcdL8eE8Bln_pMCT9lUj79EaMG/exec',
  staffPassword: '080',

  // Current Receiver v3.1 has two physical append-only Raw sheets.
  // Clinical and historical paper re-entry are distinguished by event_type.
  rawTables: Object.freeze({
    screening: 'screening_raw',
    mri: 'mri_raw'
  }),
  receiverContract: Object.freeze({
    formTypes: Object.freeze(['screening', 'mri']),
    eventTypes: Object.freeze([
      'screening_core',
      'stage_2_questionnaires',
      'first_school_assessment',
      'mri_scan',
      'clinical_supplement',
      'historical_paper_reentry',
      'field_correction'
    ]),
    retryUsesSameSubmissionId: true,
    payloadJsonSingleSerialization: true,
    fixedCanonicalHeaderCount: null
  }),

  staffFlows: Object.freeze([
    ['screening', '首次篩查'],
    ['backfill', '歷史資料補錄'],
    ['mri_visit', 'MRI到訪記錄'],
    ['clinical', 'PD臨床資料'],
    ['research_admin', '研究進度管理']
  ]),
  participantTypes: Object.freeze([
    ['P', '正式Participant'],
    ['Y', 'Pilot']
  ]),
  identities: Object.freeze([
    ['PD', 'PD'],
    ['HC', 'HC']
  ]),
  recruitment: Object.freeze([
    ['qmh', '瑪麗醫院'],
    ['qeh', '伊利沙伯醫院'],
    ['twh', '東華醫院'],
    ['pda', '香港柏金遜症會'],
    ['poster', '校園海報'],
    ['referral', '朋友／家人介紹']
  ]),
  education: Object.freeze([
    ['none', '沒有正規教育', 0],
    ['p1_3', '小學三年或以下', 3],
    ['p4_6', '小學四至六年', 6],
    ['j1_3', '初中', 9],
    ['s4_6', '高中／預科', 12],
    ['postsec', '專上非學位', 14],
    ['bachelor', '學士', 16],
    ['postgrad', '研究生教育', 18],
    ['other', '其他／不清楚', null]
  ]),

  resultDisclosure: Object.freeze({
    screening: 'after_scale_completion',
    mriOnSite: 'after_scale_completion',
    stage2: 'neutral_completion_only',
    backfill: 'live_full_backend_results'
  }),
  interaction: Object.freeze({
    staffPrimary: 'keyboard_and_large_screen_touch',
    stage2Primary: 'mobile_touch',
    unselectedMeansNoWhereApplicable: true,
    autoAdvanceOnValidSingleDigit: true,
    preventAnswerCarryover: true
  }),

  mriSafety: Object.freeze([
    ['mri_general_surgery', '曾接受手術'],
    ['mri_general_chronic_condition', '有長期病患'],
    ['mri_general_prior_imaging', '曾接受MRI／CT等影像檢查'],
    ['mri_general_mobility_aid', '需要助行工具'],
    ['mri_general_lying_difficulty', '有躺臥困難'],
    ['mri_safety_eye_metal_injury', '眼睛曾被金屬物料傷害'],
    ['mri_safety_body_metal_injury', '身體曾被金屬物體傷害'],
    ['mri_safety_aneurysm_clip', '腦動脈瘤夾'],
    ['mri_safety_pacemaker_defibrillator', '心臟起搏器／植入式心臟除顫器'],
    ['mri_safety_neurostimulator', '神經刺激器'],
    ['mri_safety_electronic_implant', '電子設備／電子植入物'],
    ['mri_safety_shunt', '分流器'],
    ['mri_safety_stent_filter_coil', '支架／過濾器／線圈'],
    ['mri_safety_cochlear_implant', '人工耳蝸／中耳植入物'],
    ['mri_safety_hearing_aid', '助聽器'],
    ['mri_safety_eye_implant', '眼部植入物'],
    ['mri_safety_orthopedic_metal', '骨科金屬物'],
    ['mri_safety_prosthesis', '人工假體'],
    ['mri_safety_breast_tissue_expander', '乳房組織擴張器'],
    ['mri_safety_glucose_sensor_patch', '血糖感測器／藥貼'],
    ['mri_safety_iud_pessary', '宮內節育器／子宮托'],
    ['mri_safety_tattoo_permanent_makeup', '紋身／永久化妝'],
    ['mri_safety_dental_device', '牙科裝置'],
    ['mri_safety_jewellery_wig', '飾物／假髮'],
    ['mri_safety_coloured_contacts', '有色隱形眼鏡'],
    ['mri_safety_pregnancy_possible', '懷孕或可能懷孕'],
    ['mri_safety_claustrophobia', '幽閉恐懼症']
  ]),

  finalDecisions: Object.freeze([
    ['HC', '健康對照（HC）'],
    ['Apathy', '冷漠組（Apathy）'],
    ['Pure_PD', '非冷漠PD組（Pure PD）'],
    ['ICD_EXCLUDE', 'ICD排除'],
    ['COGNITIVE_EXCLUDE', '認知排除'],
    ['EMOTION_EXCLUDE', '情緒排除'],
    ['MRI_SAFETY_EXCLUDE', 'MRI安全排除'],
    ['OTHER_EXCLUDE', '其他排除'],
    ['PENDING', '待決定']
  ])
});
