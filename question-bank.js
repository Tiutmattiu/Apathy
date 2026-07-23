// @ts-nocheck
'use strict';

/*
 * Apathy Research Canonical Question Bank v1.3
 * Single-file build merged from Parts 1-5.
 * Load this file once; do not load the part files together with it.
 * Backend-first scoring, review and grouping rules remain authoritative.
 */

/*
 * Apathy Research Question Bank - Part 1
 * Sources supplied by the research team.
 *
 * Contents:
 * - HADS-14
 * - SAS-14
 * - QUIP
 * - QUIP-RS-28
 *
 * Design:
 * - fullLabel / fullText: formal assisted or participant-facing form
 * - backfillLabel: compact paper re-entry grid
 * - canonical Raw field names match the backend Masters
 * - participant/staff presentation may use a grid while retaining complete
 *   instructions, full stems and full response anchors
 *
 * Controlled terminology:
 * - Sensitive domain B is represented only as “B” in generated UI text.
 */

(function initialiseQuestionBankPart1(global) {
  function freezeList(values) {
    return Object.freeze(values.map(function (value) {
      return Object.freeze(value);
    }));
  }

  function option(value, label, code) {
    return {value: value, label: label, code: code || String(value)};
  }

  const YES_NO = freezeList([
    option(0, '否', 'N'),
    option(1, '是', 'Y')
  ]);

  const QUIPRS_OPTIONS = freezeList([
    option(0, '從不'),
    option(1, '極少'),
    option(2, '有時'),
    option(3, '經常'),
    option(4, '非常頻繁')
  ]);

  const SAS_RESPONSE_OPTIONS = freezeList([
    option('not_at_all', '完全不符合', 'A'),
    option('slightly', '稍微符合', 'B'),
    option('somewhat', '有些符合', 'C'),
    option('mostly', '大部分符合', 'D')
  ]);

  const hadsItems = freezeList([
    {
      item: 1,
      name: 'hads01_score',
      fullLabel: '我感到神經緊張：',
      backfillLabel: '01 緊張',
      domain: 'Anxiety',
      options: freezeList([
        option(3, '大部份時候感到', 'A'), option(2, '很多時候感到', 'B'),
        option(1, '有時候、間中感到', 'C'), option(0, '完全不感到', 'D')
      ])
    },
    {
      item: 2,
      name: 'hads02_score',
      fullLabel: '我依然享受我以前享受的事物：',
      backfillLabel: '02 享受事物',
      domain: 'Depression',
      options: freezeList([
        option(0, '肯定和以前一樣', 'A'), option(1, '有點不及以前', 'B'),
        option(2, '只及以前少許', 'C'), option(3, '和以前差得極遠', 'D')
      ])
    },
    {
      item: 3,
      name: 'hads03_score',
      fullLabel: '我有一種驚恐，好像有些可怕的事情會發生：',
      backfillLabel: '03 可怕事情',
      domain: 'Anxiety',
      options: freezeList([
        option(3, '很肯定有，而且相當厲害', 'A'), option(2, '有，但不太厲害', 'B'),
        option(1, '有少許，但不令我擔心', 'C'), option(0, '完全沒有', 'D')
      ])
    },
    {
      item: 4,
      name: 'hads04_score',
      fullLabel: '我能看到事物有趣的一面並且會心微笑：',
      backfillLabel: '04 有趣一面',
      domain: 'Depression',
      options: freezeList([
        option(0, '和以前一樣', 'A'), option(1, '有點不如以前', 'B'),
        option(2, '肯定不如以前', 'C'), option(3, '完全不能', 'D')
      ])
    },
    {
      item: 5,
      name: 'hads05_score',
      fullLabel: '煩惱的念頭在我腦海中浮現：',
      backfillLabel: '05 煩惱念頭',
      domain: 'Anxiety',
      options: freezeList([
        option(3, '絕大部份時候', 'A'), option(2, '很多時候', 'B'),
        option(1, '有時候，但不太常', 'C'), option(0, '只是間中', 'D')
      ])
    },
    {
      item: 6,
      name: 'hads06_score',
      fullLabel: '我感到高興：',
      backfillLabel: '06 高興',
      domain: 'Depression',
      options: freezeList([
        option(3, '完全不感到', 'A'), option(2, '不時常感到', 'B'),
        option(1, '有時候感到', 'C'), option(0, '大部份時候感到', 'D')
      ])
    },
    {
      item: 7,
      name: 'hads07_score',
      fullLabel: '我能安坐並感到鬆弛：',
      backfillLabel: '07 安坐鬆弛',
      domain: 'Anxiety',
      options: freezeList([
        option(0, '肯定能夠', 'A'), option(1, '通常能夠', 'B'),
        option(2, '不時常能夠', 'C'), option(3, '完全不能', 'D')
      ])
    },
    {
      item: 8,
      name: 'hads08_score',
      fullLabel: '我感到缺乏衝勁，整個人都慢下來：',
      backfillLabel: '08 缺乏衝勁',
      domain: 'Depression',
      options: freezeList([
        option(3, '差不多全部時候', 'A'), option(2, '非常多時候', 'B'),
        option(1, '有時候', 'C'), option(0, '完全沒有', 'D')
      ])
    },
    {
      item: 9,
      name: 'hads09_score',
      fullLabel: '我有一種忐忑不安的驚恐（十五、十六的感覺）：',
      backfillLabel: '09 忐忑驚恐',
      domain: 'Anxiety',
      options: freezeList([
        option(0, '完全沒有', 'A'), option(1, '間中有', 'B'),
        option(2, '相當多時候有', 'C'), option(3, '很常有', 'D')
      ])
    },
    {
      item: 10,
      name: 'hads10_score',
      fullLabel: '我對自己的儀容已失去興趣：',
      backfillLabel: '10 儀容興趣',
      domain: 'Depression',
      options: freezeList([
        option(3, '肯定失去', 'A'), option(2, '比我應該關心的少', 'B'),
        option(1, '可能比我以前關心的少', 'C'), option(0, '我像以前一樣關心', 'D')
      ])
    },
    {
      item: 11,
      name: 'hads11_score',
      fullLabel: '我感到不能安靜，像要不停地走動：',
      backfillLabel: '11 不能安靜',
      domain: 'Anxiety',
      options: freezeList([
        option(3, '很強烈', 'A'), option(2, '相當強烈', 'B'),
        option(1, '不太強烈', 'C'), option(0, '完全沒有', 'D')
      ])
    },
    {
      item: 12,
      name: 'hads12_score',
      fullLabel: '我對未來的事抱有熱切期望：',
      backfillLabel: '12 未來期望',
      domain: 'Depression',
      options: freezeList([
        option(0, '和以前一樣', 'A'), option(1, '較為不如以前', 'B'),
        option(2, '肯定不如以前', 'C'), option(3, '絕無僅有', 'D')
      ])
    },
    {
      item: 13,
      name: 'hads13_score',
      fullLabel: '我突然感到驚惶失措：',
      backfillLabel: '13 驚惶失措',
      domain: 'Anxiety',
      options: freezeList([
        option(3, '非常多時候', 'A'), option(2, '相當多時候', 'B'),
        option(1, '不太多時候', 'C'), option(0, '完全沒有', 'D')
      ])
    },
    {
      item: 14,
      name: 'hads14_score',
      fullLabel: '我能享受喜歡的書、電台或電視節目：',
      backfillLabel: '14 書／電台／電視',
      domain: 'Depression',
      options: freezeList([
        option(0, '經常能夠', 'A'), option(1, '有時候能夠', 'B'),
        option(2, '不常能夠', 'C'), option(3, '絕少能夠', 'D')
      ])
    }
  ]);

  const sasTexts = Object.freeze([
    '您對學習新事物感興趣嗎？',
    '有什麼會令您感興趣嗎？',
    '您是否擔心自己的情況？',
    '您是否投入很多努力去做事情？',
    '您是否總會找事情做？',
    '對於未來，您是否有制定計畫和目標？',
    '您充滿動力和幹勁嗎？',
    '您有精力進行日常活動嗎？',
    '您需要他人告知每日應該做什麼嗎？',
    '您對事物是否不感興趣？',
    '您是否對很多事情都漠不關心？',
    '您是否需要推動力才能開始做事情？',
    '您是否既不快樂也不悲傷，只是介於兩者之間？',
    '您認為自己是冷漠嗎？'
  ]);

  const sasShort = Object.freeze([
    '學習新事物', '會令我感興趣', '擔心自己的情況', '努力做事情',
    '找事情做', '未來計畫目標', '動力和幹勁', '日常活動精力',
    '需要他人告知', '對事物不感興趣', '漠不關心', '需要推動力',
    '不快樂也不悲傷', '認為自己冷漠'
  ]);

  const sasItems = freezeList(sasTexts.map(function (fullLabel, index) {
    return {
      item: index + 1,
      name: 'sas' + String(index + 1).padStart(2, '0') + '_score',
      responseName: 'sas' + String(index + 1).padStart(2, '0') + '_response',
      fullLabel: fullLabel,
      backfillLabel: String(index + 1).padStart(2, '0') + ' ' + sasShort[index],
      responseOptions: SAS_RESPONSE_OPTIONS,
      scoreMapStatus: 'requires_approved_scoring_key',
      scoreRange: '0-3'
    };
  }));

  const quipDomains = freezeList([
    {key: 'a', label: 'A', fullLabel: '賭博'},
    {key: 'b', label: 'B', fullLabel: 'B'},
    {key: 'c', label: 'C', fullLabel: '購物'},
    {key: 'd', label: 'D', fullLabel: '進食'}
  ]);

  const quipSharedStems = freezeList([
    {
      index: 1,
      shortLabel: '行為問題',
      fullText: '您自己或他人是否認為您存在以下相關的行為問題？'
    },
    {
      index: 2,
      shortLabel: '經常想到',
      fullText: '您是否經常想要進行以下行為，例如不能控制自己的想法，或者對自己的想法和相關行為產生罪惡感？'
    },
    {
      index: 3,
      shortLabel: '衝動／困擾',
      fullText: '您是否對以下行為有衝動或渴望，而您或別人認為這些行為是過度的或導致困擾，例如不能參與時變得不安或易衝動？'
    },
    {
      index: 4,
      shortLabel: '控制困難',
      fullText: '您是否對以下行為有控制困難，例如延長行為時間，或者不能減少或停止這些行為？'
    },
    {
      index: 5,
      shortLabel: '設法繼續',
      fullText: '您是否會設法讓自己繼續以下行為，例如隱瞞、說謊、向別人借錢、債務增加、處置資產、進行違法事情，或私藏／囤積物品？'
    }
  ]);

  const quipMatrixCells = [];
  quipSharedStems.forEach(function (stem) {
    quipDomains.forEach(function (domain) {
      quipMatrixCells.push(Object.freeze({
        name: 'quip_' + domain.key + stem.index + '_yes',
        stemIndex: stem.index,
        domain: domain.key.toUpperCase(),
        fullStem: stem.fullText,
        fullDomainLabel: domain.fullLabel,
        backfillLabel: 'Q' + stem.index + ' ' + stem.shortLabel + '｜' + domain.label,
        options: YES_NO
      }));
    });
  });

  const quipAdditionalItems = freezeList([
    {
      name: 'quip_e1_yes',
      code: 'E1',
      fullLabel: '您或者別人是否認為您花費了太多時間完成一件特定任務、個人嗜好或其他有組織的活動，例如寫作、繪畫、園藝或拆解物品？',
      backfillLabel: 'E1 愛好／任務',
      detailField: 'quip_e1_detail',
      options: YES_NO
    },
    {
      name: 'quip_e2_yes',
      code: 'E2',
      fullLabel: '您自己或他人是否認為您花費了太多時間重複某一簡單而固定的活動，例如處理、檢查、清潔、分類、整理或排列物品？',
      backfillLabel: 'E2 重複活動',
      detailField: 'quip_e2_detail',
      options: YES_NO
    },
    {
      name: 'quip_e3_yes',
      code: 'E3',
      fullLabel: '您是否漫無目的地行走或駕駛很長的距離？',
      backfillLabel: 'E3 漫無目的行走／駕駛',
      options: YES_NO
    },
    {
      name: 'quip_f1_yes',
      code: 'F1',
      fullLabel: '您或者別人（包括您的醫生）是否認為您服用了過多的抗柏金遜症藥物，或超過處方用量？',
      backfillLabel: 'F1 用藥過量',
      options: YES_NO
    },
    {
      name: 'quip_f2_yes',
      code: 'F2',
      fullLabel: '隨着時間進展，您是否增加了抗柏金遜症藥物，以達到期望的身體或精神效果？',
      backfillLabel: 'F2 自行增加藥物',
      options: YES_NO
    },
    {
      name: 'quip_f3_yes',
      code: 'F3',
      fullLabel: '您是否難以控制或減少抗柏金遜症藥物劑量，例如嘗試減藥時出現戒斷反應、情緒消沉、易激惹或焦慮？',
      backfillLabel: 'F3 難以減量',
      options: YES_NO
    },
    {
      name: 'quip_f4_yes',
      code: 'F4',
      fullLabel: '您是否會想辦法繼續服用更多抗柏金遜症藥物，例如私藏／囤積藥物或尋找更多藥物來源？',
      backfillLabel: 'F4 設法取得更多藥物',
      options: YES_NO
    }
  ]);

  const quipRsDomains = freezeList([
    {key: 'a', label: 'A', fullLabel: '賭博', description: '賭場、網上賭博、彩票、刮刮卡、投注或撲克機。'},
    {key: 'b', label: 'B', fullLabel: 'B', description: '受控類別B。'},
    {key: 'c', label: 'C', fullLabel: '購物', description: '購買過多相同的東西或不需要／不使用的東西。'},
    {key: 'd', label: 'D', fullLabel: '飲食', description: '比以往吃更多或不同種類的食物、進食更快、直到不舒服地飽，或不餓時進食。'},
    {key: 'e1', label: 'E1', fullLabel: '愛好', description: '特定任務、愛好或其他有組織的活動。'},
    {key: 'e2', label: 'E2', fullLabel: '重複簡單活動', description: '重複清潔、整理、處理、檢查、分類、排序、收集、囤積或安排物品。'},
    {key: 'f', label: 'F', fullLabel: '藥物使用', description: '持續過量服用柏金遜症藥物，或在沒有醫療建議下自行增加劑量。'}
  ]);

  const quipRsStems = freezeList([
    {
      index: 1,
      shortLabel: '想法頻率',
      fullText: '您有多經常想到以下行為，例如難以將這些想法從腦海中排除或感到內疚？'
    },
    {
      index: 2,
      shortLabel: '衝動／困擾',
      fullText: '您是否對以下行為有過度的衝動或欲望，並感到這些衝動過度或造成困擾，包括無法參與時變得焦躁不安或易怒？'
    },
    {
      index: 3,
      shortLabel: '控制困難',
      fullText: '您是否難以控制以下行為，例如不斷增加，或難以減少或停止這些行為？'
    },
    {
      index: 4,
      shortLabel: '設法繼續',
      fullText: '您會否做特定活動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？'
    }
  ]);

  const quipRsCells = [];
  quipRsStems.forEach(function (stem) {
    quipRsDomains.forEach(function (domain) {
      quipRsCells.push(Object.freeze({
        name: 'quiprs_' + domain.key + '_' + stem.index + '_score',
        stemIndex: stem.index,
        domain: domain.key.toUpperCase(),
        fullStem: stem.fullText,
        fullDomainLabel: domain.fullLabel,
        domainDescription: domain.description,
        backfillLabel: stem.index + ' ' + stem.shortLabel + '｜' + domain.label,
        options: QUIPRS_OPTIONS
      }));
    });
  });

  const questionBank = {
    version: 'part1-1.0',
    language: 'zh-Hant',
    displayPolicy: {
      formalGridAllowed: true,
      formalGridRequirement: '完整說明、完整題幹、完整選項錨點必須在同一畫面可讀；不得只顯示短標籤。',
      backfillGridAllowed: true,
      backfillMayUseShortLabels: true,
      sensitiveDomainDisplay: 'B'
    },

    hads: {
      code: 'HADS',
      title: '醫院焦慮和抑鬱量表',
      englishTitle: 'Hospital Anxiety and Depression Scale',
      instructions: [
        '醫生都認識到情緒在多種疾病中扮演重要角色。因此，如果醫生了解您的感受，便能更全面地幫助您。',
        '這份問卷的設計是為了幫助醫生了解您的感受。請閱讀下列每題，並選出最接近您過去一星期情緒狀況的答案。',
        '請不要花太多時間考慮答案；對問題的即時反應，往往比反覆思量更準確。'
      ],
      layout: {
        formal: 'full_item_rows',
        backfill: 'compact_score_matrix',
        columns: ['題目', 'A', 'B', 'C', 'D']
      },
      items: hadsItems
    },

    sas: {
      code: 'SAS',
      title: '冷漠測量表',
      englishTitle: 'Apathy Scale (AS)',
      instructions: [],
      responseOptions: SAS_RESPONSE_OPTIONS,
      scoreKeyStatus: 'pending_research_team_confirmation',
      warning: '正式前端不得直接把A/B/C/D當作0/1/2/3提交，除非研究團隊已確認14題逐題計分方向。',
      layout: {
        formal: 'full_item_rows_shared_anchors',
        backfill: 'compact_score_matrix',
        formalColumns: ['題目', '完全不符合', '稍微符合', '有些符合', '大部分符合'],
        backfillColumns: ['題目', '0', '1', '2', '3']
      },
      items: sasItems
    },

    quip: {
      code: 'QUIP',
      title: '柏金遜症患者衝動與強迫障礙問卷',
      englishTitle: "Questionnaire for Impulsive-Compulsive Disorders in Parkinson's Disease",
      instructions: ['請回答所有列出的行為。QUIP只作Review，不直接決定ICD排除。'],
      domains: quipDomains,
      sharedStems: quipSharedStems,
      matrixCells: Object.freeze(quipMatrixCells),
      additionalItems: quipAdditionalItems,
      layout: {
        formal: 'shared_stem_matrix_with_full_stem_panels',
        backfill: 'compact_yes_no_matrix',
        columns: ['共享題幹', 'A', 'B', 'C', 'D']
      }
    },

    quiprs: {
      code: 'QUIP-RS',
      title: 'QUIP-RS',
      referencePeriod: '過去4週',
      instructions: [
        '請先閱讀各行為的概念描述，然後根據過去4週內的自身情況回答。',
        '每個格子使用同一組頻率選項：從不、極少、有時、經常、非常頻繁。'
      ],
      domains: quipRsDomains,
      sharedStems: quipRsStems,
      responseOptions: QUIPRS_OPTIONS,
      matrixCells: Object.freeze(quipRsCells),
      layout: {
        formal: 'shared_stem_matrix_with_full_definitions',
        backfill: 'compact_0_4_matrix',
        rows: ['想法頻率', '衝動／困擾', '控制困難', '設法繼續'],
        columns: ['A', 'B', 'C', 'D', 'E1', 'E2', 'F']
      }
    }
  };

  global.APATHY_QUESTION_BANK = Object.freeze(Object.assign(
    {},
    global.APATHY_QUESTION_BANK || {},
    questionBank
  ));
}(window));

/*
 * Apathy Research Question Bank - Part 2
 * Backend-first canonical supplement.
 *
 * This file treats the current backend contract and scoring rules supplied by
 * the research team as authoritative. Older frontend workflow requirements,
 * dates and optional administrative parameters are not automatically carried
 * forward merely because they appeared in an old form.
 *
 * Adds:
 * - corrected SAS scoring directions
 * - GAS-16
 * - C-DARS-17
 * - MoCA repeat model and Hong Kong normative cutoffs
 * - medication repeatable-group field contract
 * - MRI safety visit headers and MRI sequence fields
 * - MID, CGT and Digit Span fields
 * - UPDRS-III, UPDRS 1.5 and HY field contracts
 * - canonical scoring and review metadata
 */

(function initialiseQuestionBankPart2(global) {
  const previous = global.APATHY_QUESTION_BANK || {};

  function freezeList(values) {
    return Object.freeze(values.map(function (value) {
      return Object.freeze(value);
    }));
  }

  function option(value, label, code) {
    return {value: value, label: label, code: code || String(value)};
  }

  function item(name, fullLabel, backfillLabel, extra) {
    return Object.freeze(Object.assign({
      name: name,
      fullLabel: fullLabel,
      backfillLabel: backfillLabel || fullLabel
    }, extra || {}));
  }

  const SCORE_0_4 = freezeList([
    option(0, '0'), option(1, '1'), option(2, '2'), option(3, '3'), option(4, '4')
  ]);

  const GAS_OPTIONS = freezeList([
    option(3, '非常不同意', 'A'),
    option(2, '不同意', 'B'),
    option(1, '同意', 'C'),
    option(0, '非常同意', 'D')
  ]);

  const CDARS_OPTIONS = freezeList([
    option(0, '一點都不', '1'),
    option(1, '輕度', '2'),
    option(2, '中度', '3'),
    option(3, '高度', '4'),
    option(4, '極度', '5')
  ]);

  const sasScoring = Object.freeze({
    displayOrderByItem: Object.freeze({
      1: [3, 2, 1, 0], 2: [3, 2, 1, 0], 3: [3, 2, 1, 0], 4: [3, 2, 1, 0],
      5: [3, 2, 1, 0], 6: [3, 2, 1, 0], 7: [3, 2, 1, 0], 8: [3, 2, 1, 0],
      9: [0, 1, 2, 3], 10: [0, 1, 2, 3], 11: [0, 1, 2, 3],
      12: [0, 1, 2, 3], 13: [0, 1, 2, 3], 14: [0, 1, 2, 3]
    }),
    totalFields: Object.freeze(Array.from({length: 14}, function (_, index) {
      return 'sas' + String(index + 1).padStart(2, '0') + '_score';
    })),
    outputFields: Object.freeze(['sas_total', 'sas_complete', 'sas_apathy_flag']),
    cutoff: Object.freeze({operator: '>=', value: 14}),
    applicability: 'PD grouping support when no QUIP-RS exclusion; HC is never assigned to PD Apathy.'
  });

  const gasTexts = Object.freeze([
    '我不排斥和剛認識的人一起共事。',
    '我會主動向家人提議，一起進行活動（用餐、運動、休閒娛樂）。',
    '我和親戚、朋友會定期聚會（聚餐、旅遊）。',
    '我會在休閒活動之中，選擇自己有興趣的參加。',
    '我會想為家人付出（替家人着想、為家庭做規劃）。',
    '我會去做我喜歡的事（興趣、愛好）。',
    '我會想去學習新事物。',
    '我會想辦法解決遇到的問題。',
    '突然的壞消息會讓我感到難過。',
    '如果我說了一些無情的話，我會感到很糟糕。',
    '聽到認識的人發生意外或是生病時，我會感到難過。',
    '如果我發現自己對別人不好時，會感到自責。',
    '為了完成某件事，我會去努力。',
    '我能有始有終、從頭到尾地做完一件事。',
    '我會馬上處理重要的事。',
    '外出參加活動前，我會預先為自己準備。'
  ]);

  const gasShort = Object.freeze([
    '與新認識的人共事', '主動提議家庭活動', '定期親友聚會', '選擇興趣活動',
    '為家人付出', '做喜歡的事', '學習新事物', '解決問題',
    '壞消息感到難過', '無情說話後難受', '熟人意外／生病', '對別人不好後自責',
    '努力完成事情', '有始有終', '馬上處理重要事情', '活動前預先準備'
  ]);

  const gasItems = freezeList(gasTexts.map(function (text, index) {
    const number = index + 1;
    const domain = number <= 8 ? 'cognitive_social' : (number <= 12 ? 'emotion_reaction' : 'autonomy');
    return item(
      'gas' + String(number).padStart(2, '0') + '_score',
      text,
      String(number).padStart(2, '0') + ' ' + gasShort[index],
      {item: number, domain: domain, options: GAS_OPTIONS, scoreRange: '0-3'}
    );
  }));

  const cdarsDomains = freezeList([
    {
      key: 'pastimes',
      title: '消閒娛樂／嗜好',
      examplesField: 'cdars_pastimes_examples',
      examplePrompt: '請寫下一項或多項您喜歡的消閒娛樂或嗜好。',
      examplePlaceholder: '例如：閱讀報紙或書籍、園藝／照料盆栽、收聽粵曲或音樂',
      items: [
        ['enjoy', '我會享受這些活動。', '享受活動'],
        ['time', '我會花時間參與這些活動。', '花時間參與'],
        ['want', '我希望做這些事。', '希望去做'],
        ['interest', '這些活動讓我提起興趣。', '提起興趣']
      ]
    },
    {
      key: 'food_drink',
      title: '食物／飲品',
      examplesField: 'cdars_food_drink_examples',
      examplePrompt: '請寫下一種或多種您喜歡的食物或飲品。',
      examplePlaceholder: '例如：點心、老火湯、中國茶',
      items: [
        ['effort', '我會儘力去購買／製作這些食物／飲品。', '購買／製作'],
        ['enjoy', '我會享受這些食物／飲品。', '享受食物／飲品'],
        ['want', '我希望得到這些食物／飲品。', '希望得到'],
        ['consume', '我會儘可能多吃／喝這些食物／飲品。', '儘可能多吃／喝']
      ]
    },
    {
      key: 'social',
      title: '社交活動',
      examplesField: 'cdars_social_examples',
      examplePrompt: '請寫下一項或多項您喜歡的社交活動。',
      examplePlaceholder: '例如：與家人飲茶、與朋友到公園散步、與親友聚餐',
      items: [
        ['happy', '花時間參與這些活動讓我感到快樂。', '參與時快樂'],
        ['interest', '我會有興趣參與群體活動。', '有興趣參與'],
        ['plan', '我會參與策劃這些活動。', '參與策劃'],
        ['active', '我會積極參與這些社交活動。', '積極參與']
      ]
    },
    {
      key: 'sensory',
      title: '感官體驗',
      examplesField: 'cdars_sensory_examples',
      examplePrompt: '請寫下一項或多項您喜歡的感官體驗。',
      examplePlaceholder: '例如：感受海風、浸熱水浴、聽喜歡的音樂或粵曲',
      items: [
        ['seek', '我會主動尋求這些體驗。', '主動尋求'],
        ['excited', '我想到這些體驗時感覺興奮。', '想到時興奮'],
        ['savour', '如果有機會體驗這些事，我會細味每一刻。', '細味每一刻'],
        ['want', '我希望擁有這些體驗。', '希望擁有'],
        ['effort_time', '我會儘力去花時間參與這些體驗。', '花時間參與']
      ]
    }
  ]);

  const cdarsItems = [];
  cdarsDomains.forEach(function (domain) {
    domain.items.forEach(function (definition, index) {
      cdarsItems.push(item(
        'cdars_' + domain.key + '_' + definition[0] + '_score',
        definition[1],
        domain.title + ' ' + String(index + 1) + '｜' + definition[2],
        {
          domain: domain.key,
          domainItem: index + 1,
          options: CDARS_OPTIONS,
          displayValueRange: '1-5',
          storedScoreRange: '0-4'
        }
      ));
    });
  });

  const medicationItemFields = Object.freeze([
    'name', 'strength', 'times_per_day', 'units_per_time'
  ]);
  const medicationFields = Object.freeze(Array.from({length: 6}, function (_, index) {
    const key = String(index + 1).padStart(2, '0');
    return Object.freeze({
      index: index + 1,
      fields: Object.freeze({
        name: 'medication_' + key + '_name',
        strength: 'medication_' + key + '_strength',
        timesPerDay: 'medication_' + key + '_times_per_day',
        unitsPerTime: 'medication_' + key + '_units_per_time'
      })
    });
  }));

  const mocaAttempts = freezeList([1, 2].map(function (attempt) {
    const prefix = 'moca_' + attempt + '_';
    return {
      attempt: attempt,
      fields: Object.freeze({
        rawTotal: prefix + 'raw_total',
        adjustment: prefix + 'adjustment',
        adjustedTotal: prefix + 'adjusted_total',
        ageYears: prefix + 'age_years',
        educationYears: prefix + 'education_years',
        percentile16Cutoff: prefix + '16th_cutoff',
        normResultCode: prefix + 'norm_result_code',
        assessmentDate: prefix + 'assessment_date',
        source: prefix + 'source',
        context: prefix + 'context'
      })
    };
  }));

  const moca16thCutoffs = Object.freeze([
    Object.freeze({ageMin: 65, ageMax: 69, educationMax: 3, cutoff: 17}),
    Object.freeze({ageMin: 65, ageMax: 69, educationMin: 4, educationMax: 6, cutoff: 19}),
    Object.freeze({ageMin: 65, ageMax: 69, educationMin: 7, educationMax: 9, cutoff: 21}),
    Object.freeze({ageMin: 65, ageMax: 69, educationMin: 10, educationMax: 12, cutoff: 22}),
    Object.freeze({ageMin: 65, ageMax: 69, educationMin: 13, cutoff: 25}),
    Object.freeze({ageMin: 70, ageMax: 79, educationMax: 3, cutoff: 15}),
    Object.freeze({ageMin: 70, ageMax: 79, educationMin: 4, educationMax: 6, cutoff: 18}),
    Object.freeze({ageMin: 70, ageMax: 79, educationMin: 7, educationMax: 9, cutoff: 20}),
    Object.freeze({ageMin: 70, ageMax: 79, educationMin: 10, cutoff: 22}),
    Object.freeze({ageMin: 80, educationMax: 6, cutoff: 13}),
    Object.freeze({ageMin: 80, educationMin: 7, cutoff: 17})
  ]);

  const sequenceKeys = freezeList([
    {key: 't1_mp2rage', label: 'T1_mp2rage'},
    {key: 't1_flaws', label: 'T1_flaws'},
    {key: 'qsm', label: 'qsm_'},
    {key: 't2_me3d', label: 't2_me3d'},
    {key: 'cest_pd', label: 'CEST_PD'},
    {key: 'mt_cest', label: 'MT_CEST'},
    {key: 'resting', label: 'Resting'},
    {key: 'igt_adcb', label: 'IGT_ADCB'},
    {key: 'igt_bdca', label: 'IGT_BDCA'},
    {key: 'dmri_dki', label: 'dMRI_DKI'},
    {key: 'dmri_b0', label: 'dMRI_B0'},
    {key: 'gre_2d_mt', label: '2D_GRE_MT'},
    {key: 'gre_3d', label: '3DGRE'},
    {key: 't1_mprage', label: 'T1_MPRAGE'}
  ].map(function (sequence) {
    return {
      key: sequence.key,
      label: sequence.label,
      field: 'mri_seq_' + sequence.key + '_done'
    };
  }));

  const updrsItemCodes = Object.freeze([
    '01','02','03a','03b','03c','03d','03e','04a','04b','05a','05b','06a','06b',
    '07a','07b','08a','08b','09','10','11','12','13','14','15a','15b','16a','16b',
    '17a','17b','17c','17d','17e','18'
  ]);

  const updrsItems = freezeList(updrsItemCodes.map(function (code) {
    return {
      code: code,
      name: 'updrs3_' + code,
      scoreRange: '0-4',
      wordingStatus: 'use_research_approved_anchor_text_only'
    };
  }));

  const part2 = {
    version: 'part2-1.0',
    authority: 'current_backend_contract_and_research_team_scoring_rules',
    legacyFrontendPolicy: 'Old frontend parameters are not required unless the current backend or current workflow requires them.',

    scoring: Object.freeze({
      hads: Object.freeze({
        displayOrders: Object.freeze(['3210','0123','3210','0123','3210','3210','0123','3210','0123','3210','3210','0123','3210','0123']),
        anxietyItems: Object.freeze([1,3,5,7,9,11,13]),
        depressionItems: Object.freeze([2,4,6,8,10,12,14]),
        review: Object.freeze({anxiety: '>=6', depression: '>=9'}),
        groupingEffect: 'none'
      }),
      sas: sasScoring,
      quip: Object.freeze({
        domains: Object.freeze({A: 5, B: 5, C: 5, D: 5, E: 3, F: 4}),
        effect: 'review_only',
        forbiddenFields: Object.freeze(['quip_e3_detail','quip_e4_yes','quip_e5_yes','quip_f5_yes'])
      }),
      quiprs: Object.freeze({
        cutoffs: Object.freeze({A: 6, B: 8, C: 8, D: 7, E: 7, AD: 10}),
        fHasExclusionCutoff: false,
        pdExclusionEffect: 'Any cutoff reached => Excluded; Group=999; add ICD review.'
      }),
      rbdsq: Object.freeze({cutoffs: Object.freeze({PD: 6, HC: 5}), effect: 'sleep_review_only'}),
      gas: Object.freeze({
        domains: Object.freeze({cognitiveSocial: '1-8', emotionReaction: '9-12', autonomy: '13-16'}),
        cutoff: Object.freeze({PD: 16, HC: null}),
        effect: 'PD apathy grouping support when no ICD exclusion'
      }),
      ami18: Object.freeze({
        social: Object.freeze([2,3,4,8,14,17]),
        emotional: Object.freeze([1,6,7,13,16,18]),
        behavioural: Object.freeze([5,9,10,11,12,15]),
        outputs: Object.freeze(['three_domain_means','overall_18_item_mean','complete']),
        cutoff: null
      }),
      cdars: Object.freeze({
        domainCounts: Object.freeze({pastimes: 4, foodDrink: 4, social: 4, sensory: 5}),
        outputs: Object.freeze(['four_domain_totals','overall_17_item_total','complete']),
        cutoff: null
      }),
      rgpts: Object.freeze({
        referenceItems: '1-8', persecutoryItems: '9-18', totalItems: '1-18',
        review: 'persecutory_total>=18', groupingEffect: 'none'
      }),
      pdi: Object.freeze({
        noResponseRule: 'No => distress/preoccupation/conviction hidden and scored 0',
        yesResponseRule: 'Yes => all three dimensions required, each 1-5',
        outputs: Object.freeze(['yes_total','distress_total','preoccupation_total','conviction_total','total_severity','pdi_total','complete'])
      }),
      ior: Object.freeze({
        scenarios: 15, dimensions: Object.freeze(['frequency','conviction','distress']),
        itemRange: '1-5', outputs: Object.freeze(['three_domain_totals','overall_total','three_ge3_counts','complete'])
      })
    }),

    gas: Object.freeze({
      code: 'GAS',
      title: '高齡者冷漠症狀量表',
      instructions: Object.freeze([
        '請依照最近一個月內的生活情況，選擇最能反映您現在生活的敘述。',
        '十分不符合您的狀況，請選擇「非常不同意」；十分符合您的狀況，請選擇「非常同意」；其餘可選擇「不同意」或「同意」。',
        '填答時，請排除生理方面的動作影響，以及服用藥物的藥效波動。'
      ]),
      options: GAS_OPTIONS,
      items: gasItems,
      layout: Object.freeze({formal: 'full_item_rows_shared_anchors', backfill: 'compact_score_matrix'})
    }),

    cdars: Object.freeze({
      code: 'C-DARS',
      title: '中文版失樂症維度量表 C-DARS',
      instructions: Object.freeze([
        '請仔細思考，按每個分類各提供兩個您享受的活動／體驗例子。',
        '如果最近沒有特別享受的活動／體驗，請回想最享受的活動／體驗，然後根據現在的情況作答。',
        '請選出最能準確形容感覺的答案。例子只供提示；請填寫參加者本人真正喜歡的活動或體驗。'
      ]),
      options: CDARS_OPTIONS,
      domains: cdarsDomains,
      items: Object.freeze(cdarsItems),
      examplesAreRawOnly: true,
      layout: Object.freeze({formal: 'domain_cards_with_examples_and_full_item_grid', backfill: 'domain_compact_0_4_grid'})
    }),

    medication: Object.freeze({
      code: 'MEDICATION',
      presentation: Object.freeze({
        initialState: 'show_add_one_medication_button_only',
        entryOrder: Object.freeze(['name','strength','times_per_day','units_per_time']),
        completionBehaviour: 'collapse_card_show_summary_then_offer_add_another',
        maxItems: 6,
        allowEdit: true,
        allowDelete: true,
        enterMovesNext: true
      }),
      itemFields: medicationFields,
      additionalFields: Object.freeze([
        'medication_entry_choice','medication_self_report_remark','medication_verified_text',
        'medication_verification_status','medication_verification_date','medication_verified_by','medication_source',
        'med_on_off','last_pd_med_minutes','total_ledd_mg','da_ledd_mg','levodopa_ledd_mg',
        'ledd_source','ledd_calculation_date','ledd_calculated_by','ledd_status'
      ]),
      leddRule: 'Hospital-provided LEDD is not recalculated by the website; PDA LEDD is manually calculated from verified medication.'
    }),

    moca: Object.freeze({
      code: 'MOCA',
      maxAttempts: 2,
      attempts: mocaAttempts,
      summaryFields: Object.freeze(['moca_count','moca_repeat_required','moca_repeat_reason']),
      repeatRule: 'Second MoCA exists only when the latest valid MoCA is more than two months before MRI or the research team requires it.',
      adjustmentRule: 'adjusted_total=min(30,raw_total+adjustment); adjustment range 0-2',
      percentileComparisonRule: 'Protocol currently compares raw_total with the 16th cutoff; do not switch to adjusted_total without protocol confirmation.',
      below65Rule: 'cutoff=999 and manual review',
      cutoffs16th: moca16thCutoffs
    }),

    mriSafetyVisits: Object.freeze({
      initial: Object.freeze({
        rule: 'Store the complete initial MRI safety items and date.',
        fields: Object.freeze(['mri_safety_initial_date','mri_safety_initial_complete','mri_safety_initial_review_status'])
      }),
      scanDay: Object.freeze({
        rule: 'Paper form is provided to UBSN; electronic record stores only verification, date, change status and change detail.',
        fields: Object.freeze(['mri_safety_scan_day_checked','mri_safety_scan_day_date','mri_safety_changed_since_initial','mri_safety_change_detail'])
      })
    }),

    sequences: Object.freeze({
      items: sequenceKeys,
      generalRemarkField: 'mri_sequence_general_remark',
      individualRemarkFieldsAllowed: false
    }),

    computerTests: Object.freeze({
      mid: Object.freeze({fields: Object.freeze(['mid_res_time_ms','mid_assessment_date'])}),
      cgt: Object.freeze({
        fields: Object.freeze(['cgt_status','cgt_assessment_date','cgt_remark']),
        rule: 'Placeholder only; no invented items, no scoring, and never blocks submission.'
      }),
      digitSpan: Object.freeze({
        fields: Object.freeze(['digit_span_forward','digit_span_backward','digit_span_total','digit_span_assessment_date']),
        totalRule: 'forward+backward when both are present'
      })
    }),

    clinical: Object.freeze({
      updrs3: Object.freeze({
        routes: Object.freeze(['hospital_total_only','hospital_items','research_assessed','pending_hospital','not_applicable']),
        fields: Object.freeze([
          'updrs3_route','updrs3_source','updrs3_assessment_date','updrs3_status',
          'updrs3_reported_total','updrs3_calculated_total','updrs3_total',
          'updrs3_total_discrepancy','updrs3_complete'
        ]),
        items: updrsItems,
        totalRule: 'Calculate 0-132 only when all 33 item scores are present.',
        dyskinesiaFields: Object.freeze(['updrs3_dyskinesia_present','updrs3_dyskinesia_interference']),
        contextFields: Object.freeze(['updrs3a_pd_treatment','updrs3b_clinical_state','updrs3c_levodopa','updrs3c1_last_levodopa_minutes']),
        sourceNote: 'QMH/TWH have 33 item scores; whether QEH has item scores remains pending confirmation.'
      }),
      updrs15: Object.freeze({
        fields: Object.freeze(['updrs15_route','updrs_item_1_5','updrs_item_1_5_source','updrs_item_1_5_assessment_date','updrs_item_1_5_status'])
      }),
      hy: Object.freeze({
        fields: Object.freeze(['hy_route','hy_stage','hy_source','hy_assessment_date','hy_status'])
      })
    }),

    reviewCategories: Object.freeze({
      clinical: Object.freeze({
        mood: Object.freeze(['HADS-A>=6','HADS-D>=9']),
        apathy: Object.freeze(['SAS>=14','PD GAS>=16']),
        icd: Object.freeze(['QUIP positive => review','QUIP-RS cutoff => formal exclusion']),
        sleep: Object.freeze(['PD RBDSQ>=6','HC RBDSQ>=5']),
        psychosis: Object.freeze(['R-GPTS persecutory>=18']),
        cognition: Object.freeze(['MoCA<=16th','MoCA indeterminate','MoCA repeat required after >2 months'])
      }),
      operational: Object.freeze([
        'MRI safety risk or unknown','MRI scan-day change','Sequence incomplete','Multiple submissions',
        'Uncertain screening/MRI linkage','UPDRS discrepancy','Multiple valid non-repeat scale results','Long-pending clinical data'
      ]),
      countingRule: 'Count by category, not by each repeated text line.'
    }),

    grouping: Object.freeze({
      order: Object.freeze([
        'Establish PD or HC identity.',
        'PD with any QUIP-RS exclusion cutoff => Excluded; Group=ICD.',
        'Non-excluded PD with SAS>=14 or GAS>=16 => Apathy.',
        'Non-excluded PD with complete SAS/GAS and both below cutoff => Pure PD.',
        'Insufficient SAS/GAS => Pending; never assign Pure PD early.',
        'HC => Group=HC; no GAS cutoff; no UPDRS; RBDSQ cutoff=5.'
      ])
    })
  };

  const sasOverride = previous.sas ? Object.freeze(Object.assign({}, previous.sas, {
    scoreKeyStatus: 'confirmed_by_current_backend_contract',
    scoring: sasScoring,
    warning: null
  })) : undefined;

  global.APATHY_QUESTION_BANK = Object.freeze(Object.assign({}, previous, {
    version: 'part1+part2-1.0',
    sas: sasOverride,
    gas: part2.gas,
    cdars: part2.cdars,
    medication: part2.medication,
    moca: part2.moca,
    mriSafetyVisits: part2.mriSafetyVisits,
    sequences: part2.sequences,
    computerTests: part2.computerTests,
    clinical: part2.clinical,
    scoring: part2.scoring,
    reviewCategories: part2.reviewCategories,
    grouping: part2.grouping,
    backendAuthority: Object.freeze({
      authority: part2.authority,
      legacyFrontendPolicy: part2.legacyFrontendPolicy
    })
  }));
}(window));

/*
 * Apathy Research Question Bank - Part 3
 *
 * Text-only extraction from legacy frontend fragments.
 * Legacy executable code, schema versions, page insertion logic, calculated
 * totals and sequence remarks have deliberately been discarded.
 *
 * Scoring authority remains the backend-first rules already established in
 * question-bank-part2.js. This file adds item wording and presentation data
 * only; it does not replace canonical scoring, review or grouping rules.
 */

(function initialiseQuestionBankPart3(global) {
  const previous = global.APATHY_QUESTION_BANK || {};

  function freezeList(values) {
    return Object.freeze(values.map(function (value) {
      return Object.freeze(value);
    }));
  }

  function option(value, label) {
    return {value: value, label: label};
  }

  function numberedItems(prefix, texts, suffix, extraFactory) {
    return freezeList(texts.map(function (text, index) {
      const number = index + 1;
      const key = String(number).padStart(2, '0');
      return Object.assign({
        item: number,
        name: prefix + key + suffix,
        fullLabel: text,
        backfillLabel: key + ' ' + text
      }, extraFactory ? extraFactory(number, key, text) : {});
    }));
  }

  const ONE_TO_FIVE = freezeList([
    option(1, '1'), option(2, '2'), option(3, '3'), option(4, '4'), option(5, '5')
  ]);

  const ZERO_TO_FOUR_ANCHORED = freezeList([
    option(0, '0 完全沒有'),
    option(1, '1'),
    option(2, '2 有一些'),
    option(3, '3'),
    option(4, '4 完全地')
  ]);

  const YES_NO = freezeList([
    option(0, '否'), option(1, '是')
  ]);

  const AMI_OPTIONS = freezeList([
    option(0, '完全正確'),
    option(1, '比較正確'),
    option(2, '不確定'),
    option(3, '比較不正確'),
    option(4, '完全不正確')
  ]);

  const iorScenarios = Object.freeze([
    '我需要防着點別人。',
    '周圍的人對我可能有些負面的評價。',
    '人們會故意做些事，存心讓我生氣。',
    '有些人總是盯着我看。',
    '我不能信任陌生人。',
    '別人會私底下偷偷地交流關於我的事。',
    '陌生人和朋友總是批判地看待我。',
    '人們對我可能有敵意。',
    '人們背地裏說我壞話。',
    '我認識的某個人對我好的原因，是想利用我。',
    '如果有利益衝突，人們會犧牲我的利益來維護自己。',
    '人們在暗地裏嘲笑我。',
    '我希望得到別人的幫助，別人卻會和我談條件。',
    '我可以察覺出別人話裏影射我的資訊。',
    '我的行為和想法可能被別人控制。'
  ]);

  const iorDimensions = freezeList([
    {key: 'frequency', fullLabel: '這種想法多久出現一次？', backfillLabel: '頻率'},
    {key: 'conviction', fullLabel: '您有多相信這種想法？', backfillLabel: '相信程度'},
    {key: 'distress', fullLabel: '這種想法令您有多不安？', backfillLabel: '不安程度'}
  ]);

  const iorItems = [];
  iorScenarios.forEach(function (scenario, index) {
    const number = index + 1;
    const key = String(number).padStart(2, '0');
    iorDimensions.forEach(function (dimension) {
      iorItems.push(Object.freeze({
        scenario: number,
        dimension: dimension.key,
        name: 'ior' + key + '_' + dimension.key,
        scenarioText: scenario,
        fullLabel: dimension.fullLabel,
        combinedFormalLabel: '情境 ' + number + '：' + scenario + '｜' + dimension.fullLabel,
        backfillLabel: key + ' ' + dimension.backfillLabel,
        options: ONE_TO_FIVE,
        scoreRange: '1-5'
      }));
    });
  });

  const amiTexts = Object.freeze([
    '當我聽到壞消息時，我感到難過或失落。',
    '我會主動和陌生人聊天。',
    '我享受和剛認識的人一起做事。',
    '我會和朋友提議一起出去玩。',
    '我做決定時很堅定，從不猶豫。',
    '當我作出決定後，我會想自己是否作了錯誤的選擇。',
    '根據過去兩週的情況，我很在乎和我親近的人如何看待我。',
    '我每週都會和朋友一起外出。',
    '當我決定做某事時，我能夠輕易地付出努力。',
    '我不喜歡無所事事。',
    '我會按時完成該做的事，無需他人提醒。',
    '當我決定做某事時，我有動力堅持到底。',
    '如果我說了一些傷人的話，我會感到很糟糕。',
    '我不需要引導也可以進行交流。',
    '當我有事要做時，我會立刻去做並將事情完成。',
    '當我聽到熟人發生意外或生病時，我會感到難過。',
    '我喜歡在許多活動中選擇要做的活動。',
    '如果我意識到自己令某人不愉快，我會感到非常內疚。'
  ]);

  const amiDomainByItem = Object.freeze({
    1: 'emotional', 2: 'social', 3: 'social', 4: 'social', 5: 'behavioural',
    6: 'emotional', 7: 'emotional', 8: 'social', 9: 'behavioural',
    10: 'behavioural', 11: 'behavioural', 12: 'behavioural', 13: 'emotional',
    14: 'social', 15: 'behavioural', 16: 'emotional', 17: 'social', 18: 'emotional'
  });

  const amiItems = numberedItems('ami', amiTexts, '_score', function (number) {
    return {
      domain: amiDomainByItem[number],
      options: AMI_OPTIONS,
      scoreRange: '0-4',
      scoringAuthority: 'Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source.'
    };
  });

  const rgptsTexts = Object.freeze([
    '我曾花時間去想朋友們說我閒話。',
    '我經常聽到人們提起我。',
    '我因朋友和同事們嚴苛地評價我而感到不安。',
    '人們一定曾在背後嘲笑我。',
    '我想過很多關於人們避開我的事。',
    '人們一直在給我暗示。',
    '我曾認為有些人不是他們表面看上去那樣。',
    '人們在背後議論我令我不快。',
    '某些人故意傷害我。',
    '曾有人想讓我感到害怕，因此盯着我。',
    '我確定有人為了惹惱我而做過一些事。',
    '我確信曾有陰謀針對我。',
    '我曾確信有人想傷害我。',
    '我無法停止「有人想令我感到困惑」這個想法。',
    '我曾因被迫害而感到苦惱。',
    '我很難停止「有人想令我感覺糟糕」這個想法。',
    '人們故意與我敵對。',
    '我曾因有人想傷害我而生氣。'
  ]);

  const rgptsItems = numberedItems('rgpts', rgptsTexts, '_score', function (number) {
    return {
      domain: number <= 8 ? 'reference' : 'persecutory',
      options: ZERO_TO_FOUR_ANCHORED,
      scoreRange: '0-4'
    };
  });

  const pdiTexts = Object.freeze([
    '好像別人說的話對您有暗示或總有別的意思？',
    '報紙、雜誌或電視的報道好像與您有關？',
    '有些人好像表裏不一？',
    '有人想迫害您？',
    '有人陰謀陷害您？',
    '好像命中註定您是一個十分重要的人？',
    '您是一個不平凡的人嗎？',
    '您是否和神靈／上帝非常親近？',
    '您覺得人可以用心靈感應來溝通嗎？',
    '電器，例如電腦，可以影響您的思維嗎？',
    '您可能傷害上天的信使或天使嗎？',
    '您是否信奉巫術／占卜術？',
    '您是否時常擔心伴侶不忠？',
    '您是否比其他人有更多的罪？',
    '別人是否常常因為您的外表而奇怪地望着您？',
    '您是否常常覺得腦海一片空白？',
    '您是否覺得世界末日快要到了？',
    '您是否覺得有一些外來的思想插入到自己腦中？',
    '您的思想過分活躍，擔心有人能讀出您的心思？',
    '您的思想像回音般和您對話？',
    '自己像機器人般沒有自己的思想？'
  ]);

  const pdiItems = freezeList(pdiTexts.map(function (text, index) {
    const number = index + 1;
    const key = String(number).padStart(2, '0');
    return {
      item: number,
      fullLabel: text,
      backfillLabel: key + ' ' + text,
      yesField: 'pdi' + key + '_yes',
      yesOptions: YES_NO,
      dimensions: Object.freeze({
        distress: Object.freeze({
          name: 'pdi' + key + '_distress',
          fullLabel: '這件事是否對您造成困擾？',
          anchors: Object.freeze({1: '沒有困擾', 5: '十分困擾'}),
          options: ONE_TO_FIVE
        }),
        preoccupation: Object.freeze({
          name: 'pdi' + key + '_preoccupation',
          fullLabel: '您是否時常想起這件事？',
          anchors: Object.freeze({1: '幾乎沒有', 5: '一直在想'}),
          options: ONE_TO_FIVE
        }),
        conviction: Object.freeze({
          name: 'pdi' + key + '_conviction',
          fullLabel: '您相信這件事是真的嗎？',
          anchors: Object.freeze({1: '一點都不真實', 5: '非常真實'}),
          options: ONE_TO_FIVE
        })
      })
    };
  }));

  const part3 = Object.freeze({
    version: 'part3-1.0',
    sourcePolicy: Object.freeze({
      textOnly: true,
      discardedLegacyElements: Object.freeze([
        'IIFE wrappers', 'FORM_CONFIG mutations', 'schemaVersion assignments',
        'page insertion functions', 'removeQuestion calls', 'legacy totals',
        'per-sequence remark fields', 'legacy required flags'
      ]),
      scoringPolicy: 'Do not use scoring implied by this source. Preserve the canonical scoring, review and grouping rules already loaded from Part 2.'
    }),

    ior: Object.freeze({
      code: 'IOR',
      title: 'IOR',
      instructions: Object.freeze(['請只根據每個情境回答三個程度題。']),
      scenarios: iorScenarios,
      dimensions: iorDimensions,
      items: Object.freeze(iorItems),
      layout: Object.freeze({
        formal: 'scenario_cards_with_three_dimension_grid',
        backfill: 'compact_15_by_3_matrix'
      }),
      scoringReference: 'APATHY_QUESTION_BANK.scoring.ior'
    }),

    ami18: Object.freeze({
      code: 'AMI-18',
      title: '淡漠動機指數量表（AMI）',
      instructions: Object.freeze([
        '以下是一系列陳述句，請思考過去兩週內的生活並作答。',
        '請選擇最能描述過去兩週生活的選項。完全符合時選擇「完全正確」；完全不符合時選擇「完全不正確」；其餘選擇介於兩者之間的選項。'
      ]),
      options: AMI_OPTIONS,
      items: amiItems,
      layout: Object.freeze({formal: 'full_item_rows_shared_anchors', backfill: 'compact_0_4_matrix'}),
      scoringReference: 'APATHY_QUESTION_BANK.scoring.ami18'
    }),

    rgpts: Object.freeze({
      code: 'R-GPTS',
      title: 'R-GPTS 妄想思維量表',
      instructions: Object.freeze(['請回顧過去一個月；不要根據受藥物影響時的經歷作答。']),
      options: ZERO_TO_FOUR_ANCHORED,
      items: rgptsItems,
      layout: Object.freeze({formal: 'full_item_rows_shared_anchors', backfill: 'compact_0_4_matrix'}),
      scoringReference: 'APATHY_QUESTION_BANK.scoring.rgpts'
    }),

    pdi21: Object.freeze({
      code: 'PDI-21-C',
      title: 'PDI-21-C',
      instructions: Object.freeze([
        '請先回答每個情況是否曾經出現。',
        '如選「否」，三個程度題不顯示並按既定後端規則計為0；如選「是」，請完成困擾、持續想到及相信程度三題。'
      ]),
      items: pdiItems,
      layout: Object.freeze({formal: 'conditional_item_cards', backfill: 'conditional_compact_rows'}),
      scoringReference: 'APATHY_QUESTION_BANK.scoring.pdi'
    }),

    sequenceTextSupplement: Object.freeze({
      retainedFields: previous.sequences ? previous.sequences.items : Object.freeze([]),
      generalRemarkField: 'mri_sequence_general_remark',
      discardedLegacyPerSequenceRemarks: true,
      scoringOrCompletionPolicy: 'Use the existing backend-first sequence contract; this legacy snippet contributes no scoring rule.'
    })
  });

  global.APATHY_QUESTION_BANK = Object.freeze(Object.assign({}, previous, {
    version: 'part1+part2+part3-1.0',
    ior: part3.ior,
    ami18: part3.ami18,
    rgpts: part3.rgpts,
    pdi21: part3.pdi21,
    sequenceTextSupplement: part3.sequenceTextSupplement,
    sourcePolicyPart3: part3.sourcePolicy
  }));
}(window));

/*
 * Apathy Research Question Bank - Part 4
 * Text and field extraction only.
 *
 * Adds:
 * - RBDSQ source field, full Traditional Chinese item wording and Q10 subitems
 * - UPDRS Part III Traditional Chinese item labels and existing supplied anchors
 * - UPDRS 1.5 full supplied anchors
 * - HY field placeholder (formal stage anchors still pending approved wording)
 *
 * Scoring remains governed by the canonical backend-first rules loaded earlier.
 */
(function initialiseQuestionBankPart4(global) {
  const previous = global.APATHY_QUESTION_BANK || {};

  function freezeList(values) {
    return Object.freeze(values.map(function (value) { return Object.freeze(value); }));
  }
  function option(value, label) { return {value: value, label: label}; }

  const YES_NO = freezeList([option(0, '否'), option(1, '是')]);
  const RBDSQ_SOURCE = freezeList([
    option(1, '參加者'), option(2, '照顧者'), option(3, '參加者及照顧者')
  ]);

  const rbdsqItems = freezeList([
    {name:'rbdsq01_score', item:'1', fullLabel:'我有時會做非常生動的夢。', backfillLabel:'01 生動的夢', options:YES_NO},
    {name:'rbdsq02_score', item:'2', fullLabel:'我的夢境經常帶有攻擊性或充滿動作的內容。', backfillLabel:'02 攻擊／動作夢境', options:YES_NO},
    {name:'rbdsq03_score', item:'3', fullLabel:'夢境內容大多與我夜間睡眠中的行為相符。', backfillLabel:'03 夢境與行為相符', options:YES_NO},
    {name:'rbdsq04_score', item:'4', fullLabel:'我知道自己睡覺時手臂或腿會活動。', backfillLabel:'04 睡眠中四肢活動', options:YES_NO},
    {name:'rbdsq05_score', item:'5', fullLabel:'我曾因此差點或實際傷害同床者或自己。', backfillLabel:'05 傷害同床者／自己', options:YES_NO},
    {name:'rbdsq06_1_score', item:'6.1', fullLabel:'在夢境期間，我會說話、呼喊、咒罵或大聲發笑。', backfillLabel:'06.1 說話／呼喊／大笑', options:YES_NO},
    {name:'rbdsq06_2_score', item:'6.2', fullLabel:'在夢境期間，我會突然活動四肢或作出像打鬥的動作。', backfillLabel:'06.2 突然四肢活動／打鬥', options:YES_NO},
    {name:'rbdsq06_3_score', item:'6.3', fullLabel:'在夢境期間，我會作出睡眠時沒有實際用途的手勢或複雜動作，例如揮手、敬禮、驅趕蚊蟲或跌下床。', backfillLabel:'06.3 複雜動作／跌下床', options:YES_NO},
    {name:'rbdsq06_4_score', item:'6.4', fullLabel:'床邊的物件曾因我的睡眠動作跌下，例如床頭燈、書本或眼鏡。', backfillLabel:'06.4 床邊物件跌下', options:YES_NO},
    {name:'rbdsq07_score', item:'7', fullLabel:'我的動作有時會令我醒來。', backfillLabel:'07 動作令自己醒來', options:YES_NO},
    {name:'rbdsq08_score', item:'8', fullLabel:'醒來後，我大多能清楚記得夢境內容。', backfillLabel:'08 記得夢境', options:YES_NO},
    {name:'rbdsq09_score', item:'9', fullLabel:'我的睡眠經常受到干擾。', backfillLabel:'09 睡眠受干擾', options:YES_NO}
  ]);

  const rbdsqDiseaseItems = freezeList([
    {name:'rbdsq10a_stroke', code:'10a', fullLabel:'中風', options:YES_NO},
    {name:'rbdsq10b_head_trauma', code:'10b', fullLabel:'頭部創傷', options:YES_NO},
    {name:'rbdsq10c_parkinsonism', code:'10c', fullLabel:'柏金遜症候群', options:YES_NO},
    {name:'rbdsq10d_rls', code:'10d', fullLabel:'不寧腿症候群（RLS）', options:YES_NO},
    {name:'rbdsq10e_narcolepsy', code:'10e', fullLabel:'嗜睡症', options:YES_NO},
    {name:'rbdsq10f_depression', code:'10f', fullLabel:'抑鬱症', options:YES_NO},
    {name:'rbdsq10g_epilepsy', code:'10g', fullLabel:'癲癇', options:YES_NO},
    {name:'rbdsq10h_inflammatory_brain_disease', code:'10h', fullLabel:'腦部炎症性疾病', options:YES_NO},
    {name:'rbdsq10i_other', code:'10i', fullLabel:'其他神經系統疾病', detailField:'rbdsq10i_other_detail', options:YES_NO}
  ]);

  const suppliedAnchors = Object.freeze({
    speech: freezeList([
      option(0,'正常'), option(1,'表達、發音和構音輕度受損'),
      option(2,'單調、含糊但仍可理解，中度受損'), option(3,'明顯受損，難以理解'), option(4,'完全無法理解')
    ]),
    face: freezeList([
      option(0,'正常'), option(1,'輕微面具臉，可能表現為正常的面無表情'),
      option(2,'輕微但明確異常的面部表情減少'), option(3,'中度面具臉，嘴唇有時張開'),
      option(4,'嚴重面具臉，表情呆滯，口部張開')
    ]),
    rigidity: freezeList([
      option(0,'無'), option(1,'輕微'), option(2,'輕度至中度'), option(3,'明顯'), option(4,'嚴重')
    ]),
    tapping: freezeList([
      option(0,'正常'), option(1,'輕微減慢和／或幅度減小'),
      option(2,'有障礙，較早出現疲勞'), option(3,'嚴重障礙、猶豫或偶爾停頓'), option(4,'幾乎不能完成')
    ]),
    tremor: freezeList([
      option(0,'無'), option(1,'輕微且不經常出現'), option(2,'輕度，影響少數活動'),
      option(3,'中度，影響多數活動'), option(4,'嚴重，影響多數活動')
    ])
  });

  const updrsDefinitions = [
    ['01','3.1 言語','speech'], ['02','3.2 面部表情','face'],
    ['03a','3.3a 僵硬（頸部）','rigidity'], ['03b','3.3b 僵硬（右上肢）','rigidity'],
    ['03c','3.3c 僵硬（左上肢）','rigidity'], ['03d','3.3d 僵硬（右下肢）','rigidity'],
    ['03e','3.3e 僵硬（左下肢）','rigidity'], ['04a','3.4a 手指拍打（右）','tapping'],
    ['04b','3.4b 手指拍打（左）','tapping'], ['05a','3.5a 手掌運動（右）','tapping'],
    ['05b','3.5b 手掌運動（左）','tapping'], ['06a','3.6a 前臂迴旋運動（右）','tapping'],
    ['06b','3.6b 前臂迴旋運動（左）','tapping'], ['07a','3.7a 腳趾拍地運動（右）','tapping'],
    ['07b','3.7b 腳趾拍地運動（左）','tapping'], ['08a','3.8a 腿部靈敏度測試（右）','tapping'],
    ['08b','3.8b 腿部靈敏度測試（左）','tapping'], ['09','3.9 從椅子上站起來','tapping'],
    ['10','3.10 步態','tapping'], ['11','3.11 步態凍結','tapping'],
    ['12','3.12 姿勢平穩度','tapping'], ['13','3.13 姿勢','tapping'],
    ['14','3.14 全身自發性動作（身體動作遲緩）','tapping'],
    ['15a','3.15a 雙手姿態型顫抖（右）','tremor'], ['15b','3.15b 雙手姿態型顫抖（左）','tremor'],
    ['16a','3.16a 雙手動作型顫抖（右）','tremor'], ['16b','3.16b 雙手動作型顫抖（左）','tremor'],
    ['17a','3.17a 靜止型顫抖幅度（右上肢）','tremor'], ['17b','3.17b 靜止型顫抖幅度（左上肢）','tremor'],
    ['17c','3.17c 靜止型顫抖幅度（右下肢）','tremor'], ['17d','3.17d 靜止型顫抖幅度（左下肢）','tremor'],
    ['17e','3.17e 靜止型顫抖幅度（嘴唇／下巴）','tremor'], ['18','3.18 靜止型顫抖持續性','tremor']
  ];

  const updrsItems = freezeList(updrsDefinitions.map(function (definition) {
    return {
      code: definition[0],
      name: 'updrs3_' + definition[0],
      fullLabel: definition[1],
      backfillLabel: definition[1],
      suppliedAnchorFamily: definition[2],
      options: suppliedAnchors[definition[2]],
      scoreRange: '0-4',
      anchorStatus: ['01','02'].indexOf(definition[0]) >= 0
        ? 'supplied_item_specific'
        : 'legacy_generic_family_only_requires_approved_item_specific_anchors'
    };
  }));

  const updrs15Options = freezeList([
    option(0,'正常：沒有冷漠感。'),
    option(1,'很少：察覺到冷漠，但不干擾日常生活和社交活動。'),
    option(2,'輕微：冷漠會干擾獨處活動及社交活動。'),
    option(3,'中度：冷漠會干擾大部分活動及社交活動。'),
    option(4,'嚴重：被動且孤僻，完全失去積極性。')
  ]);

  const part4 = Object.freeze({
    sourcePolicy: Object.freeze({
      language: 'zh-Hant',
      textOnly: true,
      scoringPolicy: 'Use the canonical backend-first scoring rules already loaded; this supplement adds wording and field presentation only.',
      translationStatus: 'Research-team-supplied English wording translated into Traditional Chinese for draft UI review.'
    }),
    rbdsq: Object.freeze({
      code: 'RBDSQ',
      title: '快速眼動睡眠行為障礙篩查問卷（RBDSQ）',
      sourceField: 'rbdsq_source_of_information',
      sourceOptions: RBDSQ_SOURCE,
      items: rbdsqItems,
      diseaseQuestion: '您現在或過去曾患有神經系統疾病嗎？',
      diseaseItems: rbdsqDiseaseItems,
      q10ScoringRule: 'Q10各子項均須保存；任何一項為「是」時Q10得1分，多項為「是」亦只得1分。',
      scoringReference: 'APATHY_QUESTION_BANK.scoring.rbdsq',
      layout: Object.freeze({formal:'full_item_rows_then_q10_subitem_grid',backfill:'compact_yes_no_grid'})
    }),
    updrs3Text: Object.freeze({
      code: 'UPDRS-III',
      title: 'UPDRS-III 運動評估',
      contextFields: Object.freeze([
        {name:'updrs3a_pd_treatment', fullLabel:'3a. 參加者是否正接受柏金遜症藥物治療？', options:YES_NO},
        {name:'updrs3b_clinical_state', fullLabel:'3b. 如正接受藥物治療，請記錄目前臨床功能狀態。', options:freezeList([option('ON','ON／來電'), option('OFF','OFF／停電'), option('NA','不適用')])},
        {name:'updrs3c_levodopa', fullLabel:'3c. 是否有服用左多巴藥物？', options:YES_NO},
        {name:'updrs3c1_last_levodopa_minutes', fullLabel:'3c1. 距離最後一次服用左多巴約多少分鐘？', type:'number'}
      ]),
      items: updrsItems,
      dyskinesiaFields: Object.freeze([
        {name:'updrs3_dyskinesia_present', fullLabel:'檢查期間是否出現異動症（舞蹈症或肌張力不全）？', options:YES_NO},
        {name:'updrs3_dyskinesia_interference', fullLabel:'如有異動症，是否干擾運動功能檢查？', options:YES_NO}
      ]),
      totalRule: 'Only calculate the 0-132 total when all 33 item scores are present.',
      formalAnchorWarning: 'Only speech and facial-expression anchors are item-specific in this source. Other supplied anchors are broad legacy families and must not be treated as final approved item-specific MDS-UPDRS anchors.'
    }),
    updrs15Text: Object.freeze({
      code:'UPDRS-1.5',
      title:'UPDRS Item 1.5 冷漠感',
      instruction:'請考慮自發性活動、自信、動機和積極性，以及對日常生活及社交活動的影響；須區分冷漠與憂鬱等類似症狀。請按過去一週的情況評分。',
      name:'updrs_item_1_5',
      options:updrs15Options
    }),
    hyText: Object.freeze({
      code:'HY',
      title:'Hoehn & Yahr 分期',
      name:'hy_stage',
      allowedRange:'0-5 in 0.5 increments',
      formalStageAnchorStatus:'pending_research_approved_wording'
    })
  });

  const clinical = previous.clinical ? Object.freeze(Object.assign({}, previous.clinical, {
    updrs3: Object.freeze(Object.assign({}, previous.clinical.updrs3 || {}, {text: part4.updrs3Text})),
    updrs15: Object.freeze(Object.assign({}, previous.clinical.updrs15 || {}, {text: part4.updrs15Text})),
    hy: Object.freeze(Object.assign({}, previous.clinical.hy || {}, {text: part4.hyText}))
  })) : undefined;

  global.APATHY_QUESTION_BANK = Object.freeze(Object.assign({}, previous, {
    version:'part1+part2+part3+part4-1.0',
    rbdsq:part4.rbdsq,
    clinical:clinical,
    sourcePolicyPart4:part4.sourcePolicy
  }));
}(window));

/* Apathy Research Question Bank - Part 5
 * Replaces draft UPDRS-III, UPDRS 1.5 and HY wording with the full
 * research-team-supplied Traditional Chinese assessment text.
 * Scoring range and backend field names are unchanged.
 */
(function initialiseQuestionBankPart5(global) {
  const previous = global.APATHY_QUESTION_BANK || {};
  const itemText = [{"code":"01","name":"updrs3_01","instruction":"傾聽參加者說話；如有需要，可與參加者討論工作、興趣、運動或到診經過。評估音量、音調、咬字清晰度，以及有否口齒不清、口吃或說話急促。","options":[{"value":0,"label":"正常：沒有言語問題。"},{"value":1,"label":"很少：喪失正常音調、發音與音量，但所有字句仍可輕易聽懂。"},{"value":2,"label":"輕微：喪失正常音調、發音與音量；少數字句聽不清楚，但整體語句仍可輕易理解。"},{"value":3,"label":"中度：言語較難理解；部分但並非大部分語句很難聽懂。"},{"value":4,"label":"嚴重：大部分言語很難理解或完全聽不懂。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"02","name":"updrs3_02","instruction":"觀察參加者靜坐休息10秒、不說話及說話時的表情變化，包括眨眼頻率、面具臉、面無表情、自發笑容及嘴唇微張。","options":[{"value":0,"label":"正常：面部表情正常。"},{"value":1,"label":"很少：很少面無表情，只有眨眼次數減少。"},{"value":2,"label":"輕微：除眨眼次數減少外，面具臉出現在臉部下半部；嘴巴附近活動較少，自發笑容減少，但嘴唇沒有微張。"},{"value":3,"label":"中度：面具臉；嘴巴休息時有時出現嘴唇微張。"},{"value":4,"label":"嚴重：面具臉；嘴巴休息時大部分時間出現嘴唇微張。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"03a","name":"updrs3_03a","instruction":"在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。","options":[{"value":0,"label":"正常：沒有僵硬。"},{"value":1,"label":"很少：只有其他肢體作誘發動作時才可測到。"},{"value":2,"label":"輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"},{"value":3,"label":"中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"},{"value":4,"label":"嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"03b","name":"updrs3_03b","instruction":"在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。","options":[{"value":0,"label":"正常：沒有僵硬。"},{"value":1,"label":"很少：只有其他肢體作誘發動作時才可測到。"},{"value":2,"label":"輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"},{"value":3,"label":"中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"},{"value":4,"label":"嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"03c","name":"updrs3_03c","instruction":"在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。","options":[{"value":0,"label":"正常：沒有僵硬。"},{"value":1,"label":"很少：只有其他肢體作誘發動作時才可測到。"},{"value":2,"label":"輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"},{"value":3,"label":"中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"},{"value":4,"label":"嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"03d","name":"updrs3_03d","instruction":"在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。","options":[{"value":0,"label":"正常：沒有僵硬。"},{"value":1,"label":"很少：只有其他肢體作誘發動作時才可測到。"},{"value":2,"label":"輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"},{"value":3,"label":"中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"},{"value":4,"label":"嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"03e","name":"updrs3_03e","instruction":"在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。","options":[{"value":0,"label":"正常：沒有僵硬。"},{"value":1,"label":"很少：只有其他肢體作誘發動作時才可測到。"},{"value":2,"label":"輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"},{"value":3,"label":"中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"},{"value":4,"label":"嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"04a","name":"updrs3_04a","instruction":"雙手分別測試。請參加者將拇指與食指盡量分開，以最快速度拍打10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"04b","name":"updrs3_04b","instruction":"雙手分別測試。請參加者將拇指與食指盡量分開，以最快速度拍打10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"05a","name":"updrs3_05a","instruction":"雙手分別測試。請參加者屈肘、手掌面向施測者，握拳後盡量張開，以最快速度連續握緊及張開10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"05b","name":"updrs3_05b","instruction":"雙手分別測試。請參加者屈肘、手掌面向施測者，握拳後盡量張開，以最快速度連續握緊及張開10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"06a","name":"updrs3_06a","instruction":"雙手分別測試。請參加者手掌向下、手臂在身體前方伸直，以最快速度將手掌完全翻向上及下，共10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"06b","name":"updrs3_06b","instruction":"雙手分別測試。請參加者手掌向下、手臂在身體前方伸直，以最快速度將手掌完全翻向上及下，共10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"07a","name":"updrs3_07a","instruction":"雙腳分別測試。請參加者舒適坐在有直背及扶手的椅子上，腳跟放在地上，以最大幅度及最快速度用腳趾拍地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"07b","name":"updrs3_07b","instruction":"雙腳分別測試。請參加者舒適坐在有直背及扶手的椅子上，腳跟放在地上，以最大幅度及最快速度用腳趾拍地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"08a","name":"updrs3_08a","instruction":"雙腳分別測試。請參加者坐在有扶手的靠背椅，雙腳舒適放在地上，以最大幅度及最快速度將腳抬高並跺地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"08b","name":"updrs3_08b","instruction":"雙腳分別測試。請參加者坐在有扶手的靠背椅，雙腳舒適放在地上，以最大幅度及最快速度將腳抬高並跺地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"},{"value":2,"label":"輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"},{"value":3,"label":"中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"},{"value":4,"label":"嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"09","name":"updrs3_09","instruction":"請參加者坐在有扶手的靠背椅，雙腳置地，雙手交叉放在胸前後站起。按正式程序逐步重試，必要時允許使用扶手或由施測者協助。","options":[{"value":0,"label":"正常：沒有問題，可快速且不遲疑地站起。"},{"value":1,"label":"很少：動作稍慢；或需多於1次嘗試；或需坐近椅邊才站起；不需用手推扶手。"},{"value":2,"label":"輕微：可自行用手推扶手站起。"},{"value":3,"label":"中度：需用手推扶手站起但容易向後跌回椅上，或需多於1次嘗試；不需他人協助。"},{"value":4,"label":"嚴重：無法在沒有他人協助下站起。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"10","name":"updrs3_10","instruction":"請參加者來回步行至少10米，以同時觀察左右側。評估步幅、速度、腳離地高度、腳跟着地、轉身及手臂擺動；步態凍結另記於3.11。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：可獨立行走，但有少許步態問題。"},{"value":2,"label":"輕微：可獨立行走，但有明顯步態問題。"},{"value":3,"label":"中度：需要手杖或助行器等工具以安全行走，但不需旁人協助。"},{"value":4,"label":"嚴重：完全不能行走或需要旁人協助。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"11","name":"updrs3_11","instruction":"在步態測試中觀察起步、轉彎、通過出入口及接近終點時有否停頓、碎步或分節。除非基於安全考慮，避免提供感覺提示。","options":[{"value":0,"label":"正常：沒有步態凍結。"},{"value":1,"label":"很少：起步、轉彎或通過出入口時有1次停頓，其後可在平直路面順暢行走。"},{"value":2,"label":"輕微：起步、轉彎或通過出入口時有超過1次停頓，其後可在平直路面順暢行走。"},{"value":3,"label":"中度：在平直路面行走時出現1次步態凍結。"},{"value":4,"label":"嚴重：在平直路面行走時出現多次步態凍結。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"12","name":"updrs3_12","instruction":"在參加者睜眼、雙腳微張站立時，按正式拉動測試評估向後倒的身體反應。第一次為示範，不評分；第二次快速有力地拉動肩膀並確保安全。","options":[{"value":0,"label":"正常：後退1至2步便恢復站立平衡。"},{"value":1,"label":"很少：需要後退3至5步，不需他人協助。"},{"value":2,"label":"輕微：需要後退超過5步，仍不需他人協助。"},{"value":3,"label":"中度：可安全站立但缺乏姿勢平穩反應；若施測者不扶住會跌倒。"},{"value":4,"label":"嚴重：非常不穩，在自然狀態或輕拉肩膀時已有失去平衡傾向。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"13","name":"updrs3_13","instruction":"觀察參加者從椅上站起、步行及接受姿勢平穩度測試時的姿勢。若姿勢不正確，可提醒挺直並觀察能否矯正；按三個觀察點中最差表現評分。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：不太挺直，但對年長人士可算正常。"},{"value":2,"label":"輕微：明確側彎、脊柱側彎或身體傾向一側，但提醒後可矯正。"},{"value":3,"label":"中度：駝背、脊柱側彎或身體傾向一側，提醒後仍不能矯正。"},{"value":4,"label":"嚴重：嚴重駝背、脊柱側彎或側傾，導致姿勢極度異常。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"14","name":"updrs3_14","instruction":"綜合觀察坐姿、站立、起身及其他自發動作，評估整體動作速度、遲疑、動作量及幅度。","options":[{"value":0,"label":"正常：沒有問題。"},{"value":1,"label":"很少：整體動作稍慢，自發動作稍微減少。"},{"value":2,"label":"輕微：整體動作輕微變慢，自發動作輕微減少。"},{"value":3,"label":"中度：整體動作中度變慢，自發動作中度減少。"},{"value":4,"label":"嚴重：整體動作嚴重變慢，自發動作嚴重減少。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"15a","name":"updrs3_15a","instruction":"雙手分別測試。請參加者手掌向下、手臂向前伸直、手腕打直並分開手指，保持10秒。所有顫抖，包括重新出現的靜止型顫抖，均納入評分；按最大幅度評分。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：有顫抖，幅度小於1厘米。"},{"value":2,"label":"輕微：有顫抖，幅度為1厘米至小於3厘米。"},{"value":3,"label":"中度：有顫抖，幅度為3厘米至小於10厘米。"},{"value":4,"label":"嚴重：有顫抖，幅度大於或等於10厘米。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"15b","name":"updrs3_15b","instruction":"雙手分別測試。請參加者手掌向下、手臂向前伸直、手腕打直並分開手指，保持10秒。所有顫抖，包括重新出現的靜止型顫抖，均納入評分；按最大幅度評分。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：有顫抖，幅度小於1厘米。"},{"value":2,"label":"輕微：有顫抖，幅度為1厘米至小於3厘米。"},{"value":3,"label":"中度：有顫抖，幅度為3厘米至小於10厘米。"},{"value":4,"label":"嚴重：有顫抖，幅度大於或等於10厘米。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"16a","name":"updrs3_16a","instruction":"雙手分別測試。請參加者由手臂伸直開始，緩慢作手指至鼻尖的來回動作至少3次，按整個移動過程或接近目標時出現的最大顫抖幅度評分。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：有顫抖，幅度小於1厘米。"},{"value":2,"label":"輕微：有顫抖，幅度為1厘米至小於3厘米。"},{"value":3,"label":"中度：有顫抖，幅度為3厘米至小於10厘米。"},{"value":4,"label":"嚴重：有顫抖，幅度大於或等於10厘米。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"16b","name":"updrs3_16b","instruction":"雙手分別測試。請參加者由手臂伸直開始，緩慢作手指至鼻尖的來回動作至少3次，按整個移動過程或接近目標時出現的最大顫抖幅度評分。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：有顫抖，幅度小於1厘米。"},{"value":2,"label":"輕微：有顫抖，幅度為1厘米至小於3厘米。"},{"value":3,"label":"中度：有顫抖，幅度為3厘米至小於10厘米。"},{"value":4,"label":"嚴重：有顫抖，幅度大於或等於10厘米。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"17a","name":"updrs3_17a","instruction":"綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：有顫抖，幅度小於1厘米。"},{"value":2,"label":"輕微：有顫抖，幅度為1厘米至小於3厘米。"},{"value":3,"label":"中度：有顫抖，幅度為3厘米至小於10厘米。"},{"value":4,"label":"嚴重：有顫抖，幅度大於或等於10厘米。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"17b","name":"updrs3_17b","instruction":"綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：有顫抖，幅度小於1厘米。"},{"value":2,"label":"輕微：有顫抖，幅度為1厘米至小於3厘米。"},{"value":3,"label":"中度：有顫抖，幅度為3厘米至小於10厘米。"},{"value":4,"label":"嚴重：有顫抖，幅度大於或等於10厘米。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"17c","name":"updrs3_17c","instruction":"綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：有顫抖，幅度小於1厘米。"},{"value":2,"label":"輕微：有顫抖，幅度為1厘米至小於3厘米。"},{"value":3,"label":"中度：有顫抖，幅度為3厘米至小於10厘米。"},{"value":4,"label":"嚴重：有顫抖，幅度大於或等於10厘米。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"17d","name":"updrs3_17d","instruction":"綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：有顫抖，幅度小於1厘米。"},{"value":2,"label":"輕微：有顫抖，幅度為1厘米至小於3厘米。"},{"value":3,"label":"中度：有顫抖，幅度為3厘米至小於10厘米。"},{"value":4,"label":"嚴重：有顫抖，幅度大於或等於10厘米。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"17e","name":"updrs3_17e","instruction":"綜合整個檢查期間及靜坐10秒時觀察到的嘴唇／下巴靜止型顫抖，按最大幅度評分，不考慮持續性。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：有顫抖，幅度小於1厘米。"},{"value":2,"label":"輕微：有顫抖，幅度為1厘米至小於2厘米。"},{"value":3,"label":"中度：有顫抖，幅度為2厘米至小於3厘米。"},{"value":4,"label":"嚴重：有顫抖，幅度大於或等於3厘米。"}],"anchorStatus":"research_team_supplied_item_specific"},{"code":"18","name":"updrs3_18","instruction":"綜合整個動作評估期間出現的靜止型顫抖，按顫抖佔全部檢查時間的比例評分。","options":[{"value":0,"label":"正常：沒有顫抖。"},{"value":1,"label":"很少：顫抖出現時間佔全部檢查時間25%或以下。"},{"value":2,"label":"輕微：顫抖出現時間佔26%至50%。"},{"value":3,"label":"中度：顫抖出現時間佔51%至75%。"},{"value":4,"label":"嚴重：顫抖出現時間佔75%以上。"}],"anchorStatus":"research_team_supplied_item_specific"}];
  const byCode = {};
  itemText.forEach(function (entry) { byCode[entry.code] = Object.freeze(entry); });

  const priorClinical = previous.clinical || {};
  const priorUpdrs3 = priorClinical.updrs3 || {};
  const previousItems = priorUpdrs3.items || [];
  const mergedItems = Object.freeze(previousItems.map(function (entry) {
    const text = byCode[entry.code];
    return Object.freeze(Object.assign({}, entry, text || {}));
  }));

  const contextText = Object.freeze({
    updrs3a_pd_treatment: Object.freeze({
      name:'updrs3a_pd_treatment',
      fullLabel:'3a. 參加者是否正接受柏金遜症藥物治療？',
      options:Object.freeze([Object.freeze({value:1,label:'是'}),Object.freeze({value:0,label:'否'})])
    }),
    updrs3b_clinical_state: Object.freeze({
      name:'updrs3b_clinical_state',
      fullLabel:'3b. 如正接受柏金遜症藥物治療，請記錄目前臨床功能狀態。',
      help:'ON／來電：接受藥物並對治療反應良好時的典型功能狀態。OFF／停電：即使接受藥物，對治療反應不佳時的典型功能狀態。',
      options:Object.freeze([Object.freeze({value:'ON',label:'ON／來電'}),Object.freeze({value:'OFF',label:'OFF／停電'})])
    }),
    updrs3c_levodopa: Object.freeze({
      name:'updrs3c_levodopa',fullLabel:'3c. 是否有服用左多巴藥物？',
      options:Object.freeze([Object.freeze({value:1,label:'是'}),Object.freeze({value:0,label:'否'})])
    }),
    updrs3c1_last_levodopa_minutes: Object.freeze({
      name:'updrs3c1_last_levodopa_minutes',fullLabel:'3c1. 距離最後一次服用左多巴約多少分鐘？',type:'number'
    })
  });

  const updrs3Text = Object.freeze(Object.assign({}, (priorUpdrs3.text || {}), {
    contextFields: Object.freeze(Object.keys(contextText).map(function(k){return contextText[k];})),
    items: mergedItems,
    formalAnchorWarning: null,
    anchorStatus:'research_team_supplied_item_specific_for_all_33_items'
  }));

  const updrs15Text = Object.freeze(Object.assign({}, ((priorClinical.updrs15 || {}).text || {}), {
    assessorInstruction:"請考慮自發性活動、自信、動機和積極性，並評量表現程度降低對日常生活及社交活動的影響。須區分冷漠與其他類似症狀，例如抑鬱症。",
    participantInstruction:"在過去一週內，您是否對進行活動或與人相處不感興趣？如回答「是」，請向參加者或照顧者了解更詳盡資料。",
    options:Object.freeze([{"value":0,"label":"正常：沒有冷漠感。"},{"value":1,"label":"很少：參加者或照顧者察覺到冷漠感，但不會干擾日常生活和社交。"},{"value":2,"label":"輕微：冷漠感會干擾獨處和社交。"},{"value":3,"label":"中度：冷漠感會干擾大部分活動和社交。"},{"value":4,"label":"嚴重：被動且孤僻，完全失去積極性。"}].map(function(x){return Object.freeze(x);})),
    wordingStatus:'research_team_supplied_full_text'
  }));

  const hyText = Object.freeze(Object.assign({}, ((priorClinical.hy || {}).text || {}), {
    options:Object.freeze([{"value":0,"label":"第0期：沒有症狀。"},{"value":1,"label":"第1期：單側症狀。"},{"value":2,"label":"第2期：雙側症狀，姿勢平穩度正常。"},{"value":3,"label":"第3期：輕微至中度雙側症狀，姿勢稍微不平衡，不需他人協助。"},{"value":4,"label":"第4期：嚴重失能，但走路和站立仍不需協助。"},{"value":5,"label":"第5期：如沒有人協助，完全依靠輪椅或終日臥床。"}].map(function(x){return Object.freeze(x);})),
    allowedRange:'0-5 integer stages',
    formalStageAnchorStatus:'research_team_supplied_full_text'
  }));

  const clinical = Object.freeze(Object.assign({}, priorClinical, {
    updrs3:Object.freeze(Object.assign({}, priorUpdrs3, {items:mergedItems,text:updrs3Text})),
    updrs15:Object.freeze(Object.assign({}, priorClinical.updrs15 || {}, {text:updrs15Text})),
    hy:Object.freeze(Object.assign({}, priorClinical.hy || {}, {text:hyText}))
  }));

  global.APATHY_QUESTION_BANK = Object.freeze(Object.assign({}, previous, {
    version:'part1+part2+part3+part4+part5-1.0',
    clinical:clinical,
    sourcePolicyPart5:Object.freeze({
      language:'zh-Hant',
      scoringPolicy:'Backend-first scoring and field names unchanged.',
      wordingStatus:'Full research-team-supplied text for UPDRS-III, UPDRS 1.5 and HY.'
    })
  }));
}(window));

/*
 * Apathy Research Question Bank - Part 6
 * Consolidated v9-review corrections supplied by the research team.
 * This layer changes presentation metadata and approved current scoring metadata
 * without removing any existing canonical raw field or formal UPDRS anchor text.
 */
(function initialiseQuestionBankPart6(global) {
  'use strict';
  const previous = global.APATHY_QUESTION_BANK || {};

  function freeze(value) {
    if (Array.isArray(value)) return Object.freeze(value.map(freeze));
    if (value && typeof value === 'object') {
      const output = {};
      Object.keys(value).forEach(function (key) { output[key] = freeze(value[key]); });
      return Object.freeze(output);
    }
    return value;
  }

  const zeroToFourFrequency = freeze([
    {value: 0, label: '0 從不'},
    {value: 1, label: '1 極少'},
    {value: 2, label: '2 有時'},
    {value: 3, label: '3 經常'},
    {value: 4, label: '4 非常頻繁'}
  ]);

  const quipDomains = freeze([
    {
      key: 'a', label: 'A', fullLabel: '賭博',
      description: '如進入賭場、網路賭博、購買彩票、即開型彩票、打賭押注、撲克／賭博機或與朋友打賭。'
    },
    {key: 'b', label: 'B', fullLabel: 'B', description: ''},
    {
      key: 'c', label: 'C', fullLabel: '購物行為',
      description: '例如買過許多相同的物品，或購買不需要、不會使用的東西。'
    },
    {
      key: 'd', label: 'D', fullLabel: '進食行為',
      description: '例如與原來相比吃掉大量或不同種類的食物、進食速度比平常快很多、吃得過飽而感到不適，或在沒有飢餓感時也想進食。'
    }
  ]);

  const quipSharedStems = freeze([
    {
      index: 1,
      shortLabel: '相關行為問題',
      fullText: '您自己或別人是否認為您存在賭博、B相關行為、購物或進食方面的行為問題？'
    },
    {
      index: 2,
      shortLabel: '經常想到',
      fullText: '您是否經常想要賭博、B相關行為、購物或者進食（比如不能控制自己的想法，或者對自己的想法和相關行為產生罪惡感）？'
    },
    {
      index: 3,
      shortLabel: '衝動／困擾',
      fullText: '您是否有衝動或者渴望賭博、B相關行為、購物或者吃東西，而您或者別人都認為這些行為是過度的，或者導致您痛苦（如不能參與這些活動時變得不安或者容易衝動）？'
    },
    {
      index: 4,
      shortLabel: '控制困難',
      fullText: '您是否對賭博、B相關行為、購物或者過度進食等行為有控制困難（比如延長行為時間，或者不能減少或停止這些行為）？'
    },
    {
      index: 5,
      shortLabel: '設法繼續',
      fullText: '您是否會設法讓自己能繼續賭博、B相關行為、購物或者進食行為（比如隱瞞或者說謊、向別人借錢、債務增加、變賣資產、做違法事情、私藏或囤積食物）？'
    }
  ]);

  const quipMatrixCells = [];
  quipSharedStems.forEach(function (stem) {
    quipDomains.forEach(function (domain) {
      quipMatrixCells.push(freeze({
        name: 'quip_' + domain.key + stem.index + '_yes',
        stemIndex: stem.index,
        domain: domain.key.toUpperCase(),
        fullStem: stem.fullText,
        fullDomainLabel: domain.fullLabel,
        backfillLabel: 'Q' + stem.index + ' ' + stem.shortLabel + '｜' + domain.label,
        defaultValueOnGroupCompletion: 0,
        selectedValue: 1
      }));
    });
  });

  const quipFItems = freeze([
    {
      name: 'quip_f1_yes', code: 'F1',
      fullLabel: '您或者別人（包括您的醫生）是否認為您服用了過多的抗柏金遜症藥物，或者超過了處方用量？',
      backfillLabel: 'F1 用藥過量'
    },
    {
      name: 'quip_f2_yes', code: 'F2',
      fullLabel: '隨著時間的進展，您是否增加了抗柏金遜症藥物，以達到期望的身體或精神效果（比如改善心情或者避免「關」期運動症狀）？',
      backfillLabel: 'F2 自行增加藥物'
    },
    {
      name: 'quip_f3_yes', code: 'F3',
      fullLabel: '您是否難以控制或者減少抗柏金遜症藥物劑量（比如在嘗試減藥時出現戒斷反應、情緒消沉、容易激惹或者焦慮）？',
      backfillLabel: 'F3 難以減量'
    },
    {
      name: 'quip_f4_yes', code: 'F4',
      fullLabel: '您是否會想辦法繼續服用更多抗柏金遜症藥物（比如私藏或囤積藥物，或者尋找更多藥物來源）？',
      backfillLabel: 'F4 設法取得更多藥物'
    }
  ].map(function (entry) {
    return Object.assign({}, entry, {defaultValueOnGroupCompletion: 0, selectedValue: 1});
  }));

  const quipEItems = freeze([
    {
      name: 'quip_e1_yes', code: 'E1',
      fullLabel: '您或者別人是否認為您花費了太多時間進行以下行為：完成一項特定任務、個人嗜好或其他有組織的活動（例如寫作、繪畫、園藝、修理或拆卸物品、收集、使用電腦或工作項目等）？',
      backfillLabel: 'E1 任務／愛好', detailField: 'quip_e1_detail',
      detailPrompt: '請具體描述該項活動：'
    },
    {
      name: 'quip_e2_yes', code: 'E2',
      fullLabel: '您自己或他人是否認為您花費了太多時間，重複進行某一項簡單而固定的活動（包括反覆處理、檢查、清潔、分類、整理、排列、收集、囤積或安排物品等）？',
      backfillLabel: 'E2 重複簡單活動', detailField: 'quip_e2_detail',
      detailPrompt: '請具體描述該項重複活動：'
    },
    {
      name: 'quip_e3_yes', code: 'E3',
      fullLabel: '您是否會漫無目的地行走或駕駛很長的距離？',
      backfillLabel: 'E3 漫無目的行走／駕駛'
    }
  ].map(function (entry) {
    return Object.assign({}, entry, {defaultValueOnGroupCompletion: 0, selectedValue: 1});
  }));

  const quip = freeze(Object.assign({}, previous.quip || {}, {
    instructions: '請您根據參加者自柏金遜症（PD）發作以來，在任何時間曾經發生、並持續至少四個星期的行為，回答以下所有問題。如果某一種情況符合，請直接點一下相應的行為名稱或完整句子；選中的項目會變成藍色並顯示✓。如果沒有符合的情況，甚麼都不用點，閱讀完本組全部問題後直接按「下一組」。',
    domains: quipDomains,
    sharedStems: quipSharedStems,
    matrixCells: freeze(quipMatrixCells),
    additionalItems: freeze(quipFItems.concat(quipEItems)),
    groups: freeze([
      {key: 'ad', title: '相關行為', items: 'five_shared_stems_by_four_behaviours'},
      {
        key: 'f', title: '柏金遜症藥物使用', items: quipFItems,
        description: '例如持續過量服用柏金遜症藥物，或在沒有醫療建議的情況下自行增加劑量。'
      },
      {key: 'e', title: '其他重複或過度行為', items: quipEItems}
    ]),
    layout: freeze({
      formal: 'three_group_full_text_no_yes_no_controls',
      groupCount: 3,
      unselectedMeaning: 0,
      selectedMeaning: 1,
      showResultsDuringAnswering: false
    })
  }));

  const quipRsDomains = freeze([
    {
      key: 'a', label: 'A', fullLabel: '賭博',
      description: '賭場、網上賭博、彩票、即開型彩票、投注、撲克／賭博機或與朋友打賭。'
    },
    {key: 'b', label: 'B', fullLabel: 'B', description: ''},
    {
      key: 'c', label: 'C', fullLabel: '購物',
      description: '購買過多相同物品，或購買不需要、不使用的東西。'
    },
    {
      key: 'd', label: 'D', fullLabel: '進食',
      description: '比以往吃更多或不同種類食物、進食過快、吃至不舒服地飽，或在不餓時進食。'
    },
    {
      key: 'e1', label: 'E1', fullLabel: '任務或愛好',
      description: '寫作、繪畫、園藝、修理或拆卸物品、收集、使用電腦或工作項目等。'
    },
    {
      key: 'e2', label: 'E2', fullLabel: '重複簡單活動',
      description: '清潔、整理、處理、檢查、分類、排序、收集、囤積或安排物品等。'
    },
    {
      key: 'f', label: 'F', fullLabel: '柏金遜症藥物使用',
      description: '持續過量服用柏金遜症藥物，或在沒有醫療建議下自行增加劑量。'
    }
  ]);

  const quipRsStems = freeze([
    {
      index: 1, shortLabel: '想法頻率',
      fullText: '您有多經常想到以下行為，例如難以將這些想法從腦海中排除，或因這些想法和行為感到內疚？'
    },
    {
      index: 2, shortLabel: '衝動／困擾',
      fullText: '您有多經常對以下行為出現過度的衝動或渴望，並認為這些衝動過度或造成困擾，例如不能參與時變得焦躁不安或容易激惹？'
    },
    {
      index: 3, shortLabel: '控制困難',
      fullText: '您有多經常難以控制以下行為，例如行為不斷增加，或難以減少或停止？'
    },
    {
      index: 4, shortLabel: '設法繼續',
      fullText: '您有多經常做出特定行動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？'
    }
  ]);

  const quipRsCells = [];
  quipRsStems.forEach(function (stem) {
    quipRsDomains.forEach(function (domain) {
      quipRsCells.push(freeze({
        name: 'quiprs_' + domain.key + '_' + stem.index + '_score',
        stemIndex: stem.index,
        domain: domain.key.toUpperCase(),
        fullStem: stem.fullText,
        fullDomainLabel: domain.fullLabel,
        domainDescription: domain.description,
        backfillLabel: stem.index + ' ' + stem.shortLabel + '｜' + domain.label,
        options: zeroToFourFrequency,
        inputMode: 'single_digit_0_4'
      }));
    });
  });

  const quiprs = freeze(Object.assign({}, previous.quiprs || {}, {
    instructions: '請在同一頁完成全部28個小格。每格只輸入一個0至4的數字；輸入合法數字後會自動移到下一格。請勿輸入多位數。',
    domains: quipRsDomains,
    sharedStems: quipRsStems,
    responseOptions: zeroToFourFrequency,
    matrixCells: freeze(quipRsCells),
    layout: freeze({
      formal: 'single_page_4_by_7_compact_numeric_grid',
      backfill: 'single_page_4_by_7_compact_numeric_grid',
      pageCount: 1,
      inputCount: 28,
      autoAdvanceOnValidDigit: true,
      preventAnswerCarryover: true,
      rejectMultiDigitPaste: true
    })
  }));

  const rgptsOptions = freeze([
    {value: 0, label: '0 完全沒有'},
    {value: 1, label: '1 有少許'},
    {value: 2, label: '2 有一些'},
    {value: 3, label: '3 很多'},
    {value: 4, label: '4 完全地'}
  ]);
  const rgpts = previous.rgpts ? freeze(Object.assign({}, previous.rgpts, {
    items: freeze((previous.rgpts.items || []).map(function (entry) {
      return Object.assign({}, entry, {options: rgptsOptions, scoreRange: '0-4'});
    })),
    responseOptions: rgptsOptions
  })) : previous.rgpts;

  const cdars = previous.cdars ? freeze(Object.assign({}, previous.cdars, {
    domains: freeze((previous.cdars.domains || []).map(function (domain) {
      if (domain.key !== 'pastimes') return domain;
      return Object.assign({}, domain, {
        examplePrompt: '請寫下至少兩項您喜歡，而且主要不涉及與別人交往的消閒娛樂或嗜好。',
        examplePlaceholder: '例如：閱讀報紙、照料盆栽',
        minimumExamples: 2,
        examplesMainlyNonSocial: true,
        exampleValidationMessage: '請再寫一項。這一題需要至少兩項主要不涉及與別人交往的消閒娛樂或嗜好。'
      });
    })),
    presentation: freeze({
      showEnteredExamplesBesideEveryRatingItem: true,
      exampleContextLabel: '您之前填寫的活動：'
    })
  })) : previous.cdars;

  const pdi21 = previous.pdi21 ? freeze(Object.assign({}, previous.pdi21, {
    pageInstructions: freeze({
      page1: '請逐項閱讀以下情況。如果任何情況曾經在您身上出現，請點一下該項；選中的項目會變成藍色，然後請回答下方三個問題。如果以下情況全都沒有在您身上出現，所有項目都不用點，直接按「下一頁」。',
      page2: '請逐項閱讀以下情況。如果任何情況曾經在您身上出現，請點一下該項；選中的項目會變成藍色，然後請回答下方三個問題。如果以下情況全都沒有在您身上出現，所有項目都不用點，直接按「完成本部分」。'
    }),
    layout: freeze({pageCount: 2, page1Items: '1-10', page2Items: '11-21', unselectedOnPageExitMeansNo: true})
  })) : previous.pdi21;

  const updrsLabels = freeze({
    '01':'3.1 言語', '02':'3.2 面部表情',
    '03a':'3.3a 僵硬－頸部', '03b':'3.3b 僵硬－右上肢', '03c':'3.3c 僵硬－左上肢',
    '03d':'3.3d 僵硬－右下肢', '03e':'3.3e 僵硬－左下肢',
    '04a':'3.4a 手指拍打－右手', '04b':'3.4b 手指拍打－左手',
    '05a':'3.5a 手部運動－右手', '05b':'3.5b 手部運動－左手',
    '06a':'3.6a 前臂旋前旋後運動－右手', '06b':'3.6b 前臂旋前旋後運動－左手',
    '07a':'3.7a 腳趾拍地－右腳', '07b':'3.7b 腳趾拍地－左腳',
    '08a':'3.8a 腿部靈活性－右腿', '08b':'3.8b 腿部靈活性－左腿',
    '09':'3.9 從椅子站起來', '10':'3.10 步態', '11':'3.11 步態凍結',
    '12':'3.12 姿勢穩定性', '13':'3.13 姿勢', '14':'3.14 全身動作自發性（身體動作遲緩）',
    '15a':'3.15a 手部姿勢性震顫－右手', '15b':'3.15b 手部姿勢性震顫－左手',
    '16a':'3.16a 手部動作性震顫－右手', '16b':'3.16b 手部動作性震顫－左手',
    '17a':'3.17a 靜止性震顫幅度－右上肢', '17b':'3.17b 靜止性震顫幅度－左上肢',
    '17c':'3.17c 靜止性震顫幅度－右下肢', '17d':'3.17d 靜止性震顫幅度－左下肢',
    '17e':'3.17e 靜止性震顫幅度－嘴唇／下巴', '18':'3.18 靜止性震顫持續性'
  });

  let clinical = previous.clinical;
  if (clinical && clinical.updrs3) {
    const updrsItems = freeze((clinical.updrs3.items || []).map(function (entry) {
      const label = updrsLabels[entry.code];
      return Object.assign({}, entry, {
        fullLabel: label,
        backfillLabel: label,
        displayLabel: label
      });
    }));
    const updrsText = freeze(Object.assign({}, clinical.updrs3.text || {}, {items: updrsItems}));
    clinical = freeze(Object.assign({}, clinical, {
      updrs3: Object.assign({}, clinical.updrs3, {items: updrsItems, text: updrsText})
    }));
  }

  const scoring = freeze(Object.assign({}, previous.scoring || {}, {
    hads: Object.assign({}, (previous.scoring || {}).hads || {}, {
      anxietyItems: [1,3,5,7,9,11,13],
      depressionItems: [2,4,6,8,10,12,14],
      review: {anxiety: '>6', depression: '>9'},
      anxietyReview: {operator: '>', value: 6},
      depressionReview: {operator: '>', value: 9}
    }),
    gas: Object.assign({}, (previous.scoring || {}).gas || {}, {
      pdCutoff: {operator: '>=', value: 16},
      hcCutoff: null
    }),
    quiprs: Object.assign({}, (previous.scoring || {}).quiprs || {}, {
      cutoffs: {A:6, B:8, C:8, D:7, E:7, AD:10},
      fHasExclusionCutoff: false
    })
  }));

  global.APATHY_QUESTION_BANK = Object.freeze(Object.assign({}, previous, {
    version: 'part1+part2+part3+part4+part5+part6-2.0',
    quip: quip,
    quiprs: quiprs,
    cdars: cdars,
    rgpts: rgpts,
    pdi21: pdi21,
    clinical: clinical,
    scoring: scoring,
    sourcePolicyPart6: freeze({
      language: 'zh-Hant',
      status: 'consolidated_after_v9_user_testing',
      preservesCanonicalRawKeys: true,
      resultDisclosure: 'controlled_by_workflow_renderer'
    })
  }));
}(window));
