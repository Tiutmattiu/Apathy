// @ts-nocheck
'use strict';
const QUIP_DOMAIN_B_FULL_LABEL = '性行爲';
const QUIP_DOMAIN_B_DESCRIPTION = '對他人提出性要求，濫交、賣淫、改變性取向、自慰、互聯網或電話性活動、或色情';
window.APATHY_QUESTION_BANK = Object.freeze({
  "version": "11.0.0-fe-clean",
  "language": "zh-Hant",
  "displayPolicy": {
    "formalGridAllowed": true,
    "formalGridRequirement": "完整說明、完整題幹、完整選項錨點必須在同一畫面可讀；不得只顯示短標籤。",
    "backfillGridAllowed": true,
    "backfillMayUseShortLabels": true,
    "sensitiveDomainDisplay": "B"
  },
  "hads": {
    "code": "HADS",
    "title": "醫院焦慮和抑鬱量表",
    "englishTitle": "Hospital Anxiety and Depression Scale",
    "instructions": [
      "醫生都認識到情緒在多種疾病中扮演重要角色。因此，如果醫生了解您的感受，便能更全面地幫助您。",
      "這份問卷的設計是為了幫助醫生了解您的感受。請閱讀下列每題，並選出最接近您過去一星期情緒狀況的答案。",
      "請不要花太多時間考慮答案；對問題的即時反應，往往比反覆思量更準確。"
    ],
    "layout": {
      "formal": "full_item_rows",
      "backfill": "compact_score_matrix",
      "columns": [
        "題目",
        "A",
        "B",
        "C",
        "D"
      ]
    },
    "items": [
      {
        "item": 1,
        "name": "hads01_score",
        "fullLabel": "我感到神經緊張：",
        "backfillLabel": "01 緊張",
        "domain": "Anxiety",
        "options": [
          {
            "value": 3,
            "label": "大部份時候感到",
            "code": "A"
          },
          {
            "value": 2,
            "label": "很多時候感到",
            "code": "B"
          },
          {
            "value": 1,
            "label": "有時候、間中感到",
            "code": "C"
          },
          {
            "value": 0,
            "label": "完全不感到",
            "code": "D"
          }
        ]
      },
      {
        "item": 2,
        "name": "hads02_score",
        "fullLabel": "我依然享受我以前享受的事物：",
        "backfillLabel": "02 享受事物",
        "domain": "Depression",
        "options": [
          {
            "value": 0,
            "label": "肯定和以前一樣",
            "code": "A"
          },
          {
            "value": 1,
            "label": "有點不及以前",
            "code": "B"
          },
          {
            "value": 2,
            "label": "只及以前少許",
            "code": "C"
          },
          {
            "value": 3,
            "label": "和以前差得極遠",
            "code": "D"
          }
        ]
      },
      {
        "item": 3,
        "name": "hads03_score",
        "fullLabel": "我有一種驚恐，好像有些可怕的事情會發生：",
        "backfillLabel": "03 可怕事情",
        "domain": "Anxiety",
        "options": [
          {
            "value": 3,
            "label": "很肯定有，而且相當厲害",
            "code": "A"
          },
          {
            "value": 2,
            "label": "有，但不太厲害",
            "code": "B"
          },
          {
            "value": 1,
            "label": "有少許，但不令我擔心",
            "code": "C"
          },
          {
            "value": 0,
            "label": "完全沒有",
            "code": "D"
          }
        ]
      },
      {
        "item": 4,
        "name": "hads04_score",
        "fullLabel": "我能看到事物有趣的一面並且會心微笑：",
        "backfillLabel": "04 有趣一面",
        "domain": "Depression",
        "options": [
          {
            "value": 0,
            "label": "和以前一樣",
            "code": "A"
          },
          {
            "value": 1,
            "label": "有點不如以前",
            "code": "B"
          },
          {
            "value": 2,
            "label": "肯定不如以前",
            "code": "C"
          },
          {
            "value": 3,
            "label": "完全不能",
            "code": "D"
          }
        ]
      },
      {
        "item": 5,
        "name": "hads05_score",
        "fullLabel": "煩惱的念頭在我腦海中浮現：",
        "backfillLabel": "05 煩惱念頭",
        "domain": "Anxiety",
        "options": [
          {
            "value": 3,
            "label": "絕大部份時候",
            "code": "A"
          },
          {
            "value": 2,
            "label": "很多時候",
            "code": "B"
          },
          {
            "value": 1,
            "label": "有時候，但不太常",
            "code": "C"
          },
          {
            "value": 0,
            "label": "只是間中",
            "code": "D"
          }
        ]
      },
      {
        "item": 6,
        "name": "hads06_score",
        "fullLabel": "我感到高興：",
        "backfillLabel": "06 高興",
        "domain": "Depression",
        "options": [
          {
            "value": 3,
            "label": "完全不感到",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不時常感到",
            "code": "B"
          },
          {
            "value": 1,
            "label": "有時候感到",
            "code": "C"
          },
          {
            "value": 0,
            "label": "大部份時候感到",
            "code": "D"
          }
        ]
      },
      {
        "item": 7,
        "name": "hads07_score",
        "fullLabel": "我能安坐並感到鬆弛：",
        "backfillLabel": "07 安坐鬆弛",
        "domain": "Anxiety",
        "options": [
          {
            "value": 0,
            "label": "肯定能夠",
            "code": "A"
          },
          {
            "value": 1,
            "label": "通常能夠",
            "code": "B"
          },
          {
            "value": 2,
            "label": "不時常能夠",
            "code": "C"
          },
          {
            "value": 3,
            "label": "完全不能",
            "code": "D"
          }
        ]
      },
      {
        "item": 8,
        "name": "hads08_score",
        "fullLabel": "我感到缺乏衝勁，整個人都慢下來：",
        "backfillLabel": "08 缺乏衝勁",
        "domain": "Depression",
        "options": [
          {
            "value": 3,
            "label": "差不多全部時候",
            "code": "A"
          },
          {
            "value": 2,
            "label": "非常多時候",
            "code": "B"
          },
          {
            "value": 1,
            "label": "有時候",
            "code": "C"
          },
          {
            "value": 0,
            "label": "完全沒有",
            "code": "D"
          }
        ]
      },
      {
        "item": 9,
        "name": "hads09_score",
        "fullLabel": "我有一種忐忑不安的驚恐（十五、十六的感覺）：",
        "backfillLabel": "09 忐忑驚恐",
        "domain": "Anxiety",
        "options": [
          {
            "value": 0,
            "label": "完全沒有",
            "code": "A"
          },
          {
            "value": 1,
            "label": "間中有",
            "code": "B"
          },
          {
            "value": 2,
            "label": "相當多時候有",
            "code": "C"
          },
          {
            "value": 3,
            "label": "很常有",
            "code": "D"
          }
        ]
      },
      {
        "item": 10,
        "name": "hads10_score",
        "fullLabel": "我對自己的儀容已失去興趣：",
        "backfillLabel": "10 儀容興趣",
        "domain": "Depression",
        "options": [
          {
            "value": 3,
            "label": "肯定失去",
            "code": "A"
          },
          {
            "value": 2,
            "label": "比我應該關心的少",
            "code": "B"
          },
          {
            "value": 1,
            "label": "可能比我以前關心的少",
            "code": "C"
          },
          {
            "value": 0,
            "label": "我像以前一樣關心",
            "code": "D"
          }
        ]
      },
      {
        "item": 11,
        "name": "hads11_score",
        "fullLabel": "我感到不能安靜，像要不停地走動：",
        "backfillLabel": "11 不能安靜",
        "domain": "Anxiety",
        "options": [
          {
            "value": 3,
            "label": "很強烈",
            "code": "A"
          },
          {
            "value": 2,
            "label": "相當強烈",
            "code": "B"
          },
          {
            "value": 1,
            "label": "不太強烈",
            "code": "C"
          },
          {
            "value": 0,
            "label": "完全沒有",
            "code": "D"
          }
        ]
      },
      {
        "item": 12,
        "name": "hads12_score",
        "fullLabel": "我對未來的事抱有熱切期望：",
        "backfillLabel": "12 未來期望",
        "domain": "Depression",
        "options": [
          {
            "value": 0,
            "label": "和以前一樣",
            "code": "A"
          },
          {
            "value": 1,
            "label": "較為不如以前",
            "code": "B"
          },
          {
            "value": 2,
            "label": "肯定不如以前",
            "code": "C"
          },
          {
            "value": 3,
            "label": "絕無僅有",
            "code": "D"
          }
        ]
      },
      {
        "item": 13,
        "name": "hads13_score",
        "fullLabel": "我突然感到驚惶失措：",
        "backfillLabel": "13 驚惶失措",
        "domain": "Anxiety",
        "options": [
          {
            "value": 3,
            "label": "非常多時候",
            "code": "A"
          },
          {
            "value": 2,
            "label": "相當多時候",
            "code": "B"
          },
          {
            "value": 1,
            "label": "不太多時候",
            "code": "C"
          },
          {
            "value": 0,
            "label": "完全沒有",
            "code": "D"
          }
        ]
      },
      {
        "item": 14,
        "name": "hads14_score",
        "fullLabel": "我能享受喜歡的書、電台或電視節目：",
        "backfillLabel": "14 書／電台／電視",
        "domain": "Depression",
        "options": [
          {
            "value": 0,
            "label": "經常能夠",
            "code": "A"
          },
          {
            "value": 1,
            "label": "有時候能夠",
            "code": "B"
          },
          {
            "value": 2,
            "label": "不常能夠",
            "code": "C"
          },
          {
            "value": 3,
            "label": "絕少能夠",
            "code": "D"
          }
        ]
      }
    ]
  },
  "sas": {
    "code": "SAS",
    "title": "冷漠測量表",
    "englishTitle": "Apathy Scale (AS)",
    "instructions": [],
    "responseOptions": [
      {
        "value": "not_at_all",
        "label": "完全不符合",
        "code": "A"
      },
      {
        "value": "slightly",
        "label": "稍微符合",
        "code": "B"
      },
      {
        "value": "somewhat",
        "label": "有些符合",
        "code": "C"
      },
      {
        "value": "mostly",
        "label": "大部分符合",
        "code": "D"
      }
    ],
    "scoreKeyStatus": "confirmed_by_current_backend_contract",
    "warning": null,
    "layout": {
      "formal": "full_item_rows_shared_anchors",
      "backfill": "compact_score_matrix",
      "formalColumns": [
        "題目",
        "完全不符合",
        "稍微符合",
        "有些符合",
        "大部分符合"
      ],
      "backfillColumns": [
        "題目",
        "0",
        "1",
        "2",
        "3"
      ]
    },
    "items": [
      {
        "item": 1,
        "name": "sas01_score",
        "responseName": "sas01_response",
        "fullLabel": "您對學習新事物感興趣嗎？",
        "backfillLabel": "01 學習新事物",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 2,
        "name": "sas02_score",
        "responseName": "sas02_response",
        "fullLabel": "有事物會令您感興趣？",
        "backfillLabel": "02 會令我感興趣",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 3,
        "name": "sas03_score",
        "responseName": "sas03_response",
        "fullLabel": "您是否擔心自己的情況？",
        "backfillLabel": "03 擔心自己的情況",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 4,
        "name": "sas04_score",
        "responseName": "sas04_response",
        "fullLabel": "您是否投入很多努力去做事情？",
        "backfillLabel": "04 努力做事情",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 5,
        "name": "sas05_score",
        "responseName": "sas05_response",
        "fullLabel": "您是否總會找事情做？",
        "backfillLabel": "05 找事情做",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 6,
        "name": "sas06_score",
        "responseName": "sas06_response",
        "fullLabel": "對於未來，您是否有制定計畫和目標？",
        "backfillLabel": "06 未來計畫目標",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 7,
        "name": "sas07_score",
        "responseName": "sas07_response",
        "fullLabel": "您充滿動力和幹勁嗎？",
        "backfillLabel": "07 動力和幹勁",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 8,
        "name": "sas08_score",
        "responseName": "sas08_response",
        "fullLabel": "您有精力進行日常活動嗎？",
        "backfillLabel": "08 日常活動精力",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 9,
        "name": "sas09_score",
        "responseName": "sas09_response",
        "fullLabel": "您需要他人告知每日應該做什麼嗎？",
        "backfillLabel": "09 需要他人告知",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 10,
        "name": "sas10_score",
        "responseName": "sas10_response",
        "fullLabel": "您對事物是否不感興趣？",
        "backfillLabel": "10 對事物不感興趣",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 11,
        "name": "sas11_score",
        "responseName": "sas11_response",
        "fullLabel": "您是否對很多事情都漠不關心？",
        "backfillLabel": "11 漠不關心",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 12,
        "name": "sas12_score",
        "responseName": "sas12_response",
        "fullLabel": "您是否需要推動力才能開始做事情？",
        "backfillLabel": "12 需要推動力",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 13,
        "name": "sas13_score",
        "responseName": "sas13_response",
        "fullLabel": "您是否既不快樂也不悲傷，只是介於兩者之間？",
        "backfillLabel": "13 不快樂也不悲傷",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      },
      {
        "item": 14,
        "name": "sas14_score",
        "responseName": "sas14_response",
        "fullLabel": "您認為自己是冷漠嗎？",
        "backfillLabel": "14 認為自己冷漠",
        "responseOptions": [
          {
            "value": "not_at_all",
            "label": "完全不符合",
            "code": "A"
          },
          {
            "value": "slightly",
            "label": "稍微符合",
            "code": "B"
          },
          {
            "value": "somewhat",
            "label": "有些符合",
            "code": "C"
          },
          {
            "value": "mostly",
            "label": "大部分符合",
            "code": "D"
          }
        ],
        "scoreMapStatus": "requires_approved_scoring_key",
        "scoreRange": "0-3"
      }
    ],
    "scoring": {
      "displayOrderByItem": {
        "1": [
          3,
          2,
          1,
          0
        ],
        "2": [
          3,
          2,
          1,
          0
        ],
        "3": [
          3,
          2,
          1,
          0
        ],
        "4": [
          3,
          2,
          1,
          0
        ],
        "5": [
          3,
          2,
          1,
          0
        ],
        "6": [
          3,
          2,
          1,
          0
        ],
        "7": [
          3,
          2,
          1,
          0
        ],
        "8": [
          3,
          2,
          1,
          0
        ],
        "9": [
          0,
          1,
          2,
          3
        ],
        "10": [
          0,
          1,
          2,
          3
        ],
        "11": [
          0,
          1,
          2,
          3
        ],
        "12": [
          0,
          1,
          2,
          3
        ],
        "13": [
          0,
          1,
          2,
          3
        ],
        "14": [
          0,
          1,
          2,
          3
        ]
      },
      "totalFields": [
        "sas01_score",
        "sas02_score",
        "sas03_score",
        "sas04_score",
        "sas05_score",
        "sas06_score",
        "sas07_score",
        "sas08_score",
        "sas09_score",
        "sas10_score",
        "sas11_score",
        "sas12_score",
        "sas13_score",
        "sas14_score"
      ],
      "outputFields": [
        "sas_total",
        "sas_complete",
        "sas_apathy_flag"
      ],
      "cutoff": {
        "operator": ">=",
        "value": 14
      },
      "applicability": "PD grouping support when no QUIP-RS exclusion; HC is never assigned to PD Apathy."
    }
  },
  "quip": {
    "code": "QUIP",
    "title": "柏金遜症患者衝動與強迫障礙問卷",
    "englishTitle": "Questionnaire for Impulsive-Compulsive Disorders in Parkinson's Disease",
    "instructions": "請您根據參加者自柏金遜症（PD）發作以來，在任何時間曾經發生、並持續至少四個星期的行為，回答以下所有問題。如果某一種情況符合，請直接點一下相應的行為名稱或完整句子；選中的項目會變成藍色並顯示✓。如果沒有符合的情況，甚麼都不用點，閱讀完本組全部問題後直接按「下一組」。",
    "domains": [
      {
        "key": "a",
        "label": "A",
        "fullLabel": "賭博",
        "description": "如進入賭場、網路賭博、購買彩票、即開型彩票、打賭押注、撲克／賭博機或與朋友打賭。"
      },
      {
        "key": "b",
        "label": "B",
        "fullLabel": "性行為",
        "description": "對他人提出性要求，濫交、賣淫、改變性取向、自慰、互聯網或電話性活動、或色情"
      },
      {
        "key": "c",
        "label": "C",
        "fullLabel": "購物行為",
        "description": "例如買過許多相同的物品，或購買不需要、不會使用的東西。"
      },
      {
        "key": "d",
        "label": "D",
        "fullLabel": "進食行為",
        "description": "例如與原來相比吃掉大量或不同種類的食物、進食速度比平常快很多、吃得過飽而感到不適，或在沒有飢餓感時也想進食。"
      }
    ],
    "sharedStems": [
      {
        "index": 1,
        "shortLabel": "相關行為問題",
        "fullText": "您自己或別人是否認為您存在賭博、B相關行為、購物或進食方面的行為問題？"
      },
      {
        "index": 2,
        "shortLabel": "經常想到",
        "fullText": "您是否經常想要賭博、B相關行為、購物或者進食（比如不能控制自己的想法，或者對自己的想法和相關行為產生罪惡感）？"
      },
      {
        "index": 3,
        "shortLabel": "衝動／困擾",
        "fullText": "您是否有衝動或者渴望賭博、B相關行為、購物或者吃東西，而您或者別人都認為這些行為是過度的，或者導致您痛苦（如不能參與這些活動時變得不安或者容易衝動）？"
      },
      {
        "index": 4,
        "shortLabel": "控制困難",
        "fullText": "您是否對賭博、B相關行為、購物或者過度進食等行為有控制困難（比如延長行為時間，或者不能減少或停止這些行為）？"
      },
      {
        "index": 5,
        "shortLabel": "設法繼續",
        "fullText": "您是否會設法讓自己能繼續賭博、B相關行為、購物或者進食行為（比如隱瞞或者說謊、向別人借錢、債務增加、變賣資產、做違法事情、私藏或囤積食物）？"
      }
    ],
    "matrixCells": [
      {
        "name": "quip_a1_yes",
        "stemIndex": 1,
        "domain": "A",
        "fullStem": "您自己或別人是否認為您存在賭博、B相關行為、購物或進食方面的行為問題？",
        "fullDomainLabel": "賭博",
        "backfillLabel": "Q1 相關行為問題｜A",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_b1_yes",
        "stemIndex": 1,
        "domain": "B",
        "fullStem": "您自己或別人是否認為您存在賭博、姓相關行為、購物或進食方面的行為問題？",
        "fullDomainLabel": "性行為",
        "backfillLabel": "Q1 相關行為問題｜B",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1,
      },
      {
        "name": "quip_c1_yes",
        "stemIndex": 1,
        "domain": "C",
        "fullStem": "您自己或別人是否認為您存在賭博、B相關行為、購物或進食方面的行為問題？",
        "fullDomainLabel": "購物行為",
        "backfillLabel": "Q1 相關行為問題｜C",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_d1_yes",
        "stemIndex": 1,
        "domain": "D",
        "fullStem": "您自己或別人是否認為您存在賭博、B相關行為、購物或進食方面的行為問題？",
        "fullDomainLabel": "進食行為",
        "backfillLabel": "Q1 相關行為問題｜D",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_a2_yes",
        "stemIndex": 2,
        "domain": "A",
        "fullStem": "您是否經常想要賭博、B相關行為、購物或者進食（比如不能控制自己的想法，或者對自己的想法和相關行為產生罪惡感）？",
        "fullDomainLabel": "賭博",
        "backfillLabel": "Q2 經常想到｜A",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_b2_yes",
        "stemIndex": 2,
        "domain": "B",
        "fullStem": "您是否經常想要賭博、B相關行為、購物或者進食（比如不能控制自己的想法，或者對自己的想法和相關行為產生罪惡感）？",
        "fullDomainLabel": "性行為",
        "backfillLabel": "Q2 經常想到｜B",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1,
        "domainDescription": "對他人提出性要求，濫交、賣淫、改變性取向、自慰、互聯網或電話性活動、或色情"
      },
      {
        "name": "quip_c2_yes",
        "stemIndex": 2,
        "domain": "C",
        "fullStem": "您是否經常想要賭博、B相關行為、購物或者進食（比如不能控制自己的想法，或者對自己的想法和相關行為產生罪惡感）？",
        "fullDomainLabel": "購物行為",
        "backfillLabel": "Q2 經常想到｜C",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_d2_yes",
        "stemIndex": 2,
        "domain": "D",
        "fullStem": "您是否經常想要賭博、B相關行為、購物或者進食（比如不能控制自己的想法，或者對自己的想法和相關行為產生罪惡感）？",
        "fullDomainLabel": "進食行為",
        "backfillLabel": "Q2 經常想到｜D",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_a3_yes",
        "stemIndex": 3,
        "domain": "A",
        "fullStem": "您是否有衝動或者渴望賭博、B相關行為、購物或者吃東西，而您或者別人都認為這些行為是過度的，或者導致您痛苦（如不能參與這些活動時變得不安或者容易衝動）？",
        "fullDomainLabel": "賭博",
        "backfillLabel": "Q3 衝動／困擾｜A",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_b3_yes",
        "stemIndex": 3,
        "domain": "B",
        "fullStem": "您是否有衝動或者渴望賭博、B相關行為、購物或者吃東西，而您或者別人都認為這些行為是過度的，或者導致您痛苦（如不能參與這些活動時變得不安或者容易衝動）？",
        "fullDomainLabel": "性行為",
        "backfillLabel": "Q3 衝動／困擾｜B",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1,
        "domainDescription": "【请在这里粘贴已批准的B类中文说明】"
      },
      {
        "name": "quip_c3_yes",
        "stemIndex": 3,
        "domain": "C",
        "fullStem": "您是否有衝動或者渴望賭博、B相關行為、購物或者吃東西，而您或者別人都認為這些行為是過度的，或者導致您痛苦（如不能參與這些活動時變得不安或者容易衝動）？",
        "fullDomainLabel": "購物行為",
        "backfillLabel": "Q3 衝動／困擾｜C",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_d3_yes",
        "stemIndex": 3,
        "domain": "D",
        "fullStem": "您是否有衝動或者渴望賭博、B相關行為、購物或者吃東西，而您或者別人都認為這些行為是過度的，或者導致您痛苦（如不能參與這些活動時變得不安或者容易衝動）？",
        "fullDomainLabel": "進食行為",
        "backfillLabel": "Q3 衝動／困擾｜D",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_a4_yes",
        "stemIndex": 4,
        "domain": "A",
        "fullStem": "您是否對賭博、B相關行為、購物或者過度進食等行為有控制困難（比如延長行為時間，或者不能減少或停止這些行為）？",
        "fullDomainLabel": "賭博",
        "backfillLabel": "Q4 控制困難｜A",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_b4_yes",
        "stemIndex": 4,
        "domain": "B",
        "fullStem": "您是否對賭博、B相關行為、購物或者過度進食等行為有控制困難（比如延長行為時間，或者不能減少或停止這些行為）？",
        "fullDomainLabel": "【请在这里粘贴已批准的B类完整中文标题】",
        "backfillLabel": "Q4 控制困難｜B",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1,
        "domainDescription": "【请在这里粘贴已批准的B类中文说明】"
      },
      {
        "name": "quip_c4_yes",
        "stemIndex": 4,
        "domain": "C",
        "fullStem": "您是否對賭博、B相關行為、購物或者過度進食等行為有控制困難（比如延長行為時間，或者不能減少或停止這些行為）？",
        "fullDomainLabel": "購物行為",
        "backfillLabel": "Q4 控制困難｜C",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_d4_yes",
        "stemIndex": 4,
        "domain": "D",
        "fullStem": "您是否對賭博、B相關行為、購物或者過度進食等行為有控制困難（比如延長行為時間，或者不能減少或停止這些行為）？",
        "fullDomainLabel": "進食行為",
        "backfillLabel": "Q4 控制困難｜D",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_a5_yes",
        "stemIndex": 5,
        "domain": "A",
        "fullStem": "您是否會設法讓自己能繼續賭博、性相關行為、購物或者進食行為（比如隱瞞或者說謊、向別人借錢、債務增加、變賣資產、做違法事情、私藏或囤積食物）？",
        "fullDomainLabel": "賭博",
        "backfillLabel": "Q5 設法繼續｜A",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_b5_yes",
        "stemIndex": 5,
        "domain": "B",
        "fullStem": "您是否會設法讓自己能繼續賭博、性相關行為、購物或者進食行為（比如隱瞞或者說謊、向別人借錢、債務增加、變賣資產、做違法事情、私藏或囤積食物）？",
        "fullDomainLabel": "【请在这里粘贴已批准的B类完整中文标题】",
        "backfillLabel": "Q5 設法繼續｜B",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1,
        "domainDescription": "【请在这里粘贴已批准的B类中文说明】"
      },
      {
        "name": "quip_c5_yes",
        "stemIndex": 5,
        "domain": "C",
        "fullStem": "您是否會設法讓自己能繼續賭博、性相關行為、購物或者進食行為（比如隱瞞或者說謊、向別人借錢、債務增加、變賣資產、做違法事情、私藏或囤積食物）？",
        "fullDomainLabel": "購物行為",
        "backfillLabel": "Q5 設法繼續｜C",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_d5_yes",
        "stemIndex": 5,
        "domain": "D",
        "fullStem": "您是否會設法讓自己能繼續賭博、性相關行為、購物或者進食行為（比如隱瞞或者說謊、向別人借錢、債務增加、變賣資產、做違法事情、私藏或囤積食物）？",
        "fullDomainLabel": "進食行為",
        "backfillLabel": "Q5 設法繼續｜D",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      }
    ],
    "additionalItems": [
      {
        "name": "quip_f1_yes",
        "code": "F1",
        "fullLabel": "您或者別人（包括您的醫生）是否認為您服用了過多的抗柏金遜症藥物，或者超過了處方用量？",
        "backfillLabel": "F1 用藥過量",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_f2_yes",
        "code": "F2",
        "fullLabel": "隨著時間的進展，您是否增加了抗柏金遜症藥物，以達到期望的身體或精神效果（比如改善心情或者避免「關」期運動症狀）？",
        "backfillLabel": "F2 自行增加藥物",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_f3_yes",
        "code": "F3",
        "fullLabel": "您是否難以控制或者減少抗柏金遜症藥物劑量（比如在嘗試減藥時出現戒斷反應、情緒消沉、容易激惹或者焦慮）？",
        "backfillLabel": "F3 難以減量",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_f4_yes",
        "code": "F4",
        "fullLabel": "您是否會想辦法繼續服用更多抗柏金遜症藥物（比如私藏或囤積藥物，或者尋找更多藥物來源）？",
        "backfillLabel": "F4 設法取得更多藥物",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_e1_yes",
        "code": "E1",
        "fullLabel": "您或者別人是否認為您花費了太多時間進行以下行為：完成一項特定任務、個人嗜好或其他有組織的活動（例如寫作、繪畫、園藝、修理或拆卸物品、收集、使用電腦或工作項目等）？",
        "backfillLabel": "E1 任務／愛好",
        "detailField": "quip_e1_detail",
        "detailPrompt": "請具體描述該項活動：",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_e2_yes",
        "code": "E2",
        "fullLabel": "您自己或他人是否認為您花費了太多時間，重複進行某一項簡單而固定的活動（包括反覆處理、檢查、清潔、分類、整理、排列、收集、囤積或安排物品等）？",
        "backfillLabel": "E2 重複簡單活動",
        "detailField": "quip_e2_detail",
        "detailPrompt": "請具體描述該項重複活動：",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      },
      {
        "name": "quip_e3_yes",
        "code": "E3",
        "fullLabel": "您是否會漫無目的地行走或駕駛很長的距離？",
        "backfillLabel": "E3 漫無目的行走／駕駛",
        "defaultValueOnGroupCompletion": 0,
        "selectedValue": 1
      }
    ],
    "layout": {
      "formal": "three_group_full_text_no_yes_no_controls",
      "groupCount": 3,
      "unselectedMeaning": 0,
      "selectedMeaning": 1,
      "showResultsDuringAnswering": false
    },
    "groups": [
      {
        "key": "ad",
        "title": "相關行為",
        "items": "five_shared_stems_by_four_behaviours"
      },
      {
        "key": "f",
        "title": "柏金遜症藥物使用",
        "items": [
          {
            "name": "quip_f1_yes",
            "code": "F1",
            "fullLabel": "您或者別人（包括您的醫生）是否認為您服用了過多的抗柏金遜症藥物，或者超過了處方用量？",
            "backfillLabel": "F1 用藥過量",
            "defaultValueOnGroupCompletion": 0,
            "selectedValue": 1
          },
          {
            "name": "quip_f2_yes",
            "code": "F2",
            "fullLabel": "隨著時間的進展，您是否增加了抗柏金遜症藥物，以達到期望的身體或精神效果（比如改善心情或者避免「關」期運動症狀）？",
            "backfillLabel": "F2 自行增加藥物",
            "defaultValueOnGroupCompletion": 0,
            "selectedValue": 1
          },
          {
            "name": "quip_f3_yes",
            "code": "F3",
            "fullLabel": "您是否難以控制或者減少抗柏金遜症藥物劑量（比如在嘗試減藥時出現戒斷反應、情緒消沉、容易激惹或者焦慮）？",
            "backfillLabel": "F3 難以減量",
            "defaultValueOnGroupCompletion": 0,
            "selectedValue": 1
          },
          {
            "name": "quip_f4_yes",
            "code": "F4",
            "fullLabel": "您是否會想辦法繼續服用更多抗柏金遜症藥物（比如私藏或囤積藥物，或者尋找更多藥物來源）？",
            "backfillLabel": "F4 設法取得更多藥物",
            "defaultValueOnGroupCompletion": 0,
            "selectedValue": 1
          }
        ],
        "description": "例如持續過量服用柏金遜症藥物，或在沒有醫療建議的情況下自行增加劑量。"
      },
      {
        "key": "e",
        "title": "其他重複或過度行為",
        "items": [
          {
            "name": "quip_e1_yes",
            "code": "E1",
            "fullLabel": "您或者別人是否認為您花費了太多時間進行以下行為：完成一項特定任務、個人嗜好或其他有組織的活動（例如寫作、繪畫、園藝、修理或拆卸物品、收集、使用電腦或工作項目等）？",
            "backfillLabel": "E1 任務／愛好",
            "detailField": "quip_e1_detail",
            "detailPrompt": "請具體描述該項活動：",
            "defaultValueOnGroupCompletion": 0,
            "selectedValue": 1
          },
          {
            "name": "quip_e2_yes",
            "code": "E2",
            "fullLabel": "您自己或他人是否認為您花費了太多時間，重複進行某一項簡單而固定的活動（包括反覆處理、檢查、清潔、分類、整理、排列、收集、囤積或安排物品等）？",
            "backfillLabel": "E2 重複簡單活動",
            "detailField": "quip_e2_detail",
            "detailPrompt": "請具體描述該項重複活動：",
            "defaultValueOnGroupCompletion": 0,
            "selectedValue": 1
          },
          {
            "name": "quip_e3_yes",
            "code": "E3",
            "fullLabel": "您是否會漫無目的地行走或駕駛很長的距離？",
            "backfillLabel": "E3 漫無目的行走／駕駛",
            "defaultValueOnGroupCompletion": 0,
            "selectedValue": 1
          }
        ]
      }
    ]
  },
  "quiprs": {
    "code": "QUIP-RS",
    "title": "QUIP-RS",
    "referencePeriod": "過去4週",
    "instructions": "請在同一頁完成全部28個小格。每格只輸入一個0至4的數字；輸入合法數字後會自動移到下一格。請勿輸入多位數。",
    "domains": [
      {
        "key": "a",
        "label": "A",
        "fullLabel": "賭博",
        "description": "賭場、網上賭博、彩票、即開型彩票、投注、撲克／賭博機或與朋友打賭。"
      },
      {
        "key": "b",
        "label": "B",
        "fullLabel": "性行為",
        "description": "對他人提出性要求，濫交、賣淫、改變性取向、自慰、互聯網或電話性活動、或色情"
      },
      {
        "key": "c",
        "label": "C",
        "fullLabel": "購物",
        "description": "購買過多相同物品，或購買不需要、不使用的東西。"
      },
      {
        "key": "d",
        "label": "D",
        "fullLabel": "進食",
        "description": "比以往吃更多或不同種類食物、進食過快、吃至不舒服地飽，或在不餓時進食。"
      },
      {
        "key": "e1",
        "label": "E1",
        "fullLabel": "任務或愛好",
        "description": "寫作、繪畫、園藝、修理或拆卸物品、收集、使用電腦或工作項目等。"
      },
      {
        "key": "e2",
        "label": "E2",
        "fullLabel": "重複簡單活動",
        "description": "清潔、整理、處理、檢查、分類、排序、收集、囤積或安排物品等。"
      },
      {
        "key": "f",
        "label": "F",
        "fullLabel": "柏金遜症藥物使用",
        "description": "持續過量服用柏金遜症藥物，或在沒有醫療建議下自行增加劑量。"
      }
    ],
    "sharedStems": [
      {
        "index": 1,
        "shortLabel": "想法頻率",
        "fullText": "您有多經常想到以下行為，例如難以將這些想法從腦海中排除，或因這些想法和行為感到內疚？"
      },
      {
        "index": 2,
        "shortLabel": "衝動／困擾",
        "fullText": "您有多經常對以下行為出現過度的衝動或渴望，並認為這些衝動過度或造成困擾，例如不能參與時變得焦躁不安或容易激惹？"
      },
      {
        "index": 3,
        "shortLabel": "控制困難",
        "fullText": "您有多經常難以控制以下行為，例如行為不斷增加，或難以減少或停止？"
      },
      {
        "index": 4,
        "shortLabel": "設法繼續",
        "fullText": "您有多經常做出特定行動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？"
      }
    ],
    "responseOptions": [
      {
        "value": 0,
        "label": "0 從不"
      },
      {
        "value": 1,
        "label": "1 極少"
      },
      {
        "value": 2,
        "label": "2 有時"
      },
      {
        "value": 3,
        "label": "3 經常"
      },
      {
        "value": 4,
        "label": "4 非常頻繁"
      }
    ],
    "matrixCells": [
      {
        "name": "quiprs_a_1_score",
        "stemIndex": 1,
        "domain": "A",
        "fullStem": "您有多經常想到以下行為，例如難以將這些想法從腦海中排除，或因這些想法和行為感到內疚？",
        "fullDomainLabel": "賭博",
        "domainDescription": "賭場、網上賭博、彩票、即開型彩票、投注、撲克／賭博機或與朋友打賭。",
        "backfillLabel": "1 想法頻率｜A",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_b_1_score",
        "stemIndex": 1,
        "domain": "B",
        "fullStem": "您有多經常想到以下行為，例如難以將這些想法從腦海中排除，或因這些想法和行為感到內疚？",
        "fullDomainLabel": "性行為",
        "domainDescription": "對他人提出性要求，濫交、賣淫、改變性取向、自慰、互聯網或電話性活動、或色情",
        "backfillLabel": "1 想法頻率｜B",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_c_1_score",
        "stemIndex": 1,
        "domain": "C",
        "fullStem": "您有多經常想到以下行為，例如難以將這些想法從腦海中排除，或因這些想法和行為感到內疚？",
        "fullDomainLabel": "購物",
        "domainDescription": "購買過多相同物品，或購買不需要、不使用的東西。",
        "backfillLabel": "1 想法頻率｜C",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_d_1_score",
        "stemIndex": 1,
        "domain": "D",
        "fullStem": "您有多經常想到以下行為，例如難以將這些想法從腦海中排除，或因這些想法和行為感到內疚？",
        "fullDomainLabel": "進食",
        "domainDescription": "比以往吃更多或不同種類食物、進食過快、吃至不舒服地飽，或在不餓時進食。",
        "backfillLabel": "1 想法頻率｜D",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_e1_1_score",
        "stemIndex": 1,
        "domain": "E1",
        "fullStem": "您有多經常想到以下行為，例如難以將這些想法從腦海中排除，或因這些想法和行為感到內疚？",
        "fullDomainLabel": "任務或愛好",
        "domainDescription": "寫作、繪畫、園藝、修理或拆卸物品、收集、使用電腦或工作項目等。",
        "backfillLabel": "1 想法頻率｜E1",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_e2_1_score",
        "stemIndex": 1,
        "domain": "E2",
        "fullStem": "您有多經常想到以下行為，例如難以將這些想法從腦海中排除，或因這些想法和行為感到內疚？",
        "fullDomainLabel": "重複簡單活動",
        "domainDescription": "清潔、整理、處理、檢查、分類、排序、收集、囤積或安排物品等。",
        "backfillLabel": "1 想法頻率｜E2",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_f_1_score",
        "stemIndex": 1,
        "domain": "F",
        "fullStem": "您有多經常想到以下行為，例如難以將這些想法從腦海中排除，或因這些想法和行為感到內疚？",
        "fullDomainLabel": "柏金遜症藥物使用",
        "domainDescription": "持續過量服用柏金遜症藥物，或在沒有醫療建議下自行增加劑量。",
        "backfillLabel": "1 想法頻率｜F",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_a_2_score",
        "stemIndex": 2,
        "domain": "A",
        "fullStem": "您有多經常對以下行為出現過度的衝動或渴望，並認為這些衝動過度或造成困擾，例如不能參與時變得焦躁不安或容易激惹？",
        "fullDomainLabel": "賭博",
        "domainDescription": "賭場、網上賭博、彩票、即開型彩票、投注、撲克／賭博機或與朋友打賭。",
        "backfillLabel": "2 衝動／困擾｜A",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_b_2_score",
        "stemIndex": 2,
        "domain": "B",
        "fullStem": "您有多經常對以下行為出現過度的衝動或渴望，並認為這些衝動過度或造成困擾，例如不能參與時變得焦躁不安或容易激惹？",
        "fullDomainLabel": "性行为",
        "domainDescription": "對他人提出性要求，濫交、賣淫、改變性取向、自慰、互聯網或電話性活動、或色情",
        "backfillLabel": "2 衝動／困擾｜B",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_c_2_score",
        "stemIndex": 2,
        "domain": "C",
        "fullStem": "您有多經常對以下行為出現過度的衝動或渴望，並認為這些衝動過度或造成困擾，例如不能參與時變得焦躁不安或容易激惹？",
        "fullDomainLabel": "購物",
        "domainDescription": "購買過多相同物品，或購買不需要、不使用的東西。",
        "backfillLabel": "2 衝動／困擾｜C",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_d_2_score",
        "stemIndex": 2,
        "domain": "D",
        "fullStem": "您有多經常對以下行為出現過度的衝動或渴望，並認為這些衝動過度或造成困擾，例如不能參與時變得焦躁不安或容易激惹？",
        "fullDomainLabel": "進食",
        "domainDescription": "比以往吃更多或不同種類食物、進食過快、吃至不舒服地飽，或在不餓時進食。",
        "backfillLabel": "2 衝動／困擾｜D",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_e1_2_score",
        "stemIndex": 2,
        "domain": "E1",
        "fullStem": "您有多經常對以下行為出現過度的衝動或渴望，並認為這些衝動過度或造成困擾，例如不能參與時變得焦躁不安或容易激惹？",
        "fullDomainLabel": "任務或愛好",
        "domainDescription": "寫作、繪畫、園藝、修理或拆卸物品、收集、使用電腦或工作項目等。",
        "backfillLabel": "2 衝動／困擾｜E1",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_e2_2_score",
        "stemIndex": 2,
        "domain": "E2",
        "fullStem": "您有多經常對以下行為出現過度的衝動或渴望，並認為這些衝動過度或造成困擾，例如不能參與時變得焦躁不安或容易激惹？",
        "fullDomainLabel": "重複簡單活動",
        "domainDescription": "清潔、整理、處理、檢查、分類、排序、收集、囤積或安排物品等。",
        "backfillLabel": "2 衝動／困擾｜E2",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_f_2_score",
        "stemIndex": 2,
        "domain": "F",
        "fullStem": "您有多經常對以下行為出現過度的衝動或渴望，並認為這些衝動過度或造成困擾，例如不能參與時變得焦躁不安或容易激惹？",
        "fullDomainLabel": "柏金遜症藥物使用",
        "domainDescription": "持續過量服用柏金遜症藥物，或在沒有醫療建議下自行增加劑量。",
        "backfillLabel": "2 衝動／困擾｜F",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_a_3_score",
        "stemIndex": 3,
        "domain": "A",
        "fullStem": "您有多經常難以控制以下行為，例如行為不斷增加，或難以減少或停止？",
        "fullDomainLabel": "賭博",
        "domainDescription": "賭場、網上賭博、彩票、即開型彩票、投注、撲克／賭博機或與朋友打賭。",
        "backfillLabel": "3 控制困難｜A",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_b_3_score",
        "stemIndex": 3,
        "domain": "B",
        "fullStem": "您有多經常難以控制以下行為，例如行為不斷增加，或難以減少或停止？",
        "fullDomainLabel": "性行为",
        "domainDescription": "對他人提出性要求，濫交、賣淫、改變性取向、自慰、互聯網或電話性活動、或色情",
        "backfillLabel": "3 控制困難｜B",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_c_3_score",
        "stemIndex": 3,
        "domain": "C",
        "fullStem": "您有多經常難以控制以下行為，例如行為不斷增加，或難以減少或停止？",
        "fullDomainLabel": "購物",
        "domainDescription": "購買過多相同物品，或購買不需要、不使用的東西。",
        "backfillLabel": "3 控制困難｜C",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_d_3_score",
        "stemIndex": 3,
        "domain": "D",
        "fullStem": "您有多經常難以控制以下行為，例如行為不斷增加，或難以減少或停止？",
        "fullDomainLabel": "進食",
        "domainDescription": "比以往吃更多或不同種類食物、進食過快、吃至不舒服地飽，或在不餓時進食。",
        "backfillLabel": "3 控制困難｜D",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_e1_3_score",
        "stemIndex": 3,
        "domain": "E1",
        "fullStem": "您有多經常難以控制以下行為，例如行為不斷增加，或難以減少或停止？",
        "fullDomainLabel": "任務或愛好",
        "domainDescription": "寫作、繪畫、園藝、修理或拆卸物品、收集、使用電腦或工作項目等。",
        "backfillLabel": "3 控制困難｜E1",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_e2_3_score",
        "stemIndex": 3,
        "domain": "E2",
        "fullStem": "您有多經常難以控制以下行為，例如行為不斷增加，或難以減少或停止？",
        "fullDomainLabel": "重複簡單活動",
        "domainDescription": "清潔、整理、處理、檢查、分類、排序、收集、囤積或安排物品等。",
        "backfillLabel": "3 控制困難｜E2",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_f_3_score",
        "stemIndex": 3,
        "domain": "F",
        "fullStem": "您有多經常難以控制以下行為，例如行為不斷增加，或難以減少或停止？",
        "fullDomainLabel": "柏金遜症藥物使用",
        "domainDescription": "持續過量服用柏金遜症藥物，或在沒有醫療建議下自行增加劑量。",
        "backfillLabel": "3 控制困難｜F",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_a_4_score",
        "stemIndex": 4,
        "domain": "A",
        "fullStem": "您有多經常做出特定行動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？",
        "fullDomainLabel": "賭博",
        "domainDescription": "賭場、網上賭博、彩票、即開型彩票、投注、撲克／賭博機或與朋友打賭。",
        "backfillLabel": "4 設法繼續｜A",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_b_4_score",
        "stemIndex": 4,
        "domain": "B",
        "fullStem": "您有多經常做出特定行動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？",
        "fullDomainLabel": "性行為",
        "domainDescription": "對他人提出性要求，濫交、賣淫、改變性取向、自慰、互聯網或電話性活動、或色情",
        "backfillLabel": "4 設法繼續｜B",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_c_4_score",
        "stemIndex": 4,
        "domain": "C",
        "fullStem": "您有多經常做出特定行動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？",
        "fullDomainLabel": "購物",
        "domainDescription": "購買過多相同物品，或購買不需要、不使用的東西。",
        "backfillLabel": "4 設法繼續｜C",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_d_4_score",
        "stemIndex": 4,
        "domain": "D",
        "fullStem": "您有多經常做出特定行動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？",
        "fullDomainLabel": "進食",
        "domainDescription": "比以往吃更多或不同種類食物、進食過快、吃至不舒服地飽，或在不餓時進食。",
        "backfillLabel": "4 設法繼續｜D",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_e1_4_score",
        "stemIndex": 4,
        "domain": "E1",
        "fullStem": "您有多經常做出特定行動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？",
        "fullDomainLabel": "任務或愛好",
        "domainDescription": "寫作、繪畫、園藝、修理或拆卸物品、收集、使用電腦或工作項目等。",
        "backfillLabel": "4 設法繼續｜E1",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_e2_4_score",
        "stemIndex": 4,
        "domain": "E2",
        "fullStem": "您有多經常做出特定行動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？",
        "fullDomainLabel": "重複簡單活動",
        "domainDescription": "清潔、整理、處理、檢查、分類、排序、收集、囤積或安排物品等。",
        "backfillLabel": "4 設法繼續｜E2",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      },
      {
        "name": "quiprs_f_4_score",
        "stemIndex": 4,
        "domain": "F",
        "fullStem": "您有多經常做出特定行動以繼續以下行為，例如隱瞞、欺騙、囤積物品、向他人借錢、積累債務、偷竊或參與非法活動？",
        "fullDomainLabel": "柏金遜症藥物使用",
        "domainDescription": "持續過量服用柏金遜症藥物，或在沒有醫療建議下自行增加劑量。",
        "backfillLabel": "4 設法繼續｜F",
        "options": [
          {
            "value": 0,
            "label": "0 從不"
          },
          {
            "value": 1,
            "label": "1 極少"
          },
          {
            "value": 2,
            "label": "2 有時"
          },
          {
            "value": 3,
            "label": "3 經常"
          },
          {
            "value": 4,
            "label": "4 非常頻繁"
          }
        ],
        "inputMode": "single_digit_0_4"
      }
    ],
    "layout": {
      "formal": "single_page_4_by_7_compact_numeric_grid",
      "backfill": "single_page_4_by_7_compact_numeric_grid",
      "pageCount": 1,
      "inputCount": 28,
      "autoAdvanceOnValidDigit": true,
      "preventAnswerCarryover": true,
      "rejectMultiDigitPaste": true
    }
  },
  "gas": {
    "code": "GAS",
    "title": "高齡者冷漠症狀量表",
    "instructions": [
      "請依照最近一個月內的生活情況，選擇最能反映您現在生活的敘述。",
      "十分不符合您的狀況，請選擇「非常不同意」；十分符合您的狀況，請選擇「非常同意」；其餘可選擇「不同意」或「同意」。",
      "填答時，請排除生理方面的動作影響，以及服用藥物的藥效波動。"
    ],
    "options": [
      {
        "value": 3,
        "label": "非常不同意",
        "code": "A"
      },
      {
        "value": 2,
        "label": "不同意",
        "code": "B"
      },
      {
        "value": 1,
        "label": "同意",
        "code": "C"
      },
      {
        "value": 0,
        "label": "非常同意",
        "code": "D"
      }
    ],
    "items": [
      {
        "name": "gas01_score",
        "fullLabel": "我不排斥和剛認識的人一起共事。",
        "backfillLabel": "01 與新認識的人共事",
        "item": 1,
        "domain": "cognitive_social",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas02_score",
        "fullLabel": "我會主動向家人提議，一起進行活動（用餐、運動、休閒娛樂）。",
        "backfillLabel": "02 主動提議家庭活動",
        "item": 2,
        "domain": "cognitive_social",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas03_score",
        "fullLabel": "我和親戚、朋友會定期聚會（聚餐、旅遊）。",
        "backfillLabel": "03 定期親友聚會",
        "item": 3,
        "domain": "cognitive_social",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas04_score",
        "fullLabel": "我會在休閒活動之中，選擇自己有興趣的參加。",
        "backfillLabel": "04 選擇興趣活動",
        "item": 4,
        "domain": "cognitive_social",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas05_score",
        "fullLabel": "我會想為家人付出（替家人着想、為家庭做規劃）。",
        "backfillLabel": "05 為家人付出",
        "item": 5,
        "domain": "cognitive_social",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas06_score",
        "fullLabel": "我會去做我喜歡的事（興趣、愛好）。",
        "backfillLabel": "06 做喜歡的事",
        "item": 6,
        "domain": "cognitive_social",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas07_score",
        "fullLabel": "我會想去學習新事物。",
        "backfillLabel": "07 學習新事物",
        "item": 7,
        "domain": "cognitive_social",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas08_score",
        "fullLabel": "我會想辦法解決遇到的問題。",
        "backfillLabel": "08 解決問題",
        "item": 8,
        "domain": "cognitive_social",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas09_score",
        "fullLabel": "突然的壞消息會讓我感到難過。",
        "backfillLabel": "09 壞消息感到難過",
        "item": 9,
        "domain": "emotion_reaction",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas10_score",
        "fullLabel": "如果我說了一些無情的話，我會感到很糟糕。",
        "backfillLabel": "10 無情說話後難受",
        "item": 10,
        "domain": "emotion_reaction",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas11_score",
        "fullLabel": "聽到認識的人發生意外或是生病時，我會感到難過。",
        "backfillLabel": "11 熟人意外／生病",
        "item": 11,
        "domain": "emotion_reaction",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas12_score",
        "fullLabel": "如果我發現自己對別人不好時，會感到自責。",
        "backfillLabel": "12 對別人不好後自責",
        "item": 12,
        "domain": "emotion_reaction",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas13_score",
        "fullLabel": "為了完成某件事，我會去努力。",
        "backfillLabel": "13 努力完成事情",
        "item": 13,
        "domain": "autonomy",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas14_score",
        "fullLabel": "我能有始有終、從頭到尾地做完一件事。",
        "backfillLabel": "14 有始有終",
        "item": 14,
        "domain": "autonomy",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas15_score",
        "fullLabel": "我會馬上處理重要的事。",
        "backfillLabel": "15 馬上處理重要事情",
        "item": 15,
        "domain": "autonomy",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      },
      {
        "name": "gas16_score",
        "fullLabel": "外出參加活動前，我會預先為自己準備。",
        "backfillLabel": "16 活動前預先準備",
        "item": 16,
        "domain": "autonomy",
        "options": [
          {
            "value": 3,
            "label": "非常不同意",
            "code": "A"
          },
          {
            "value": 2,
            "label": "不同意",
            "code": "B"
          },
          {
            "value": 1,
            "label": "同意",
            "code": "C"
          },
          {
            "value": 0,
            "label": "非常同意",
            "code": "D"
          }
        ],
        "scoreRange": "0-3"
      }
    ],
    "layout": {
      "formal": "full_item_rows_shared_anchors",
      "backfill": "compact_score_matrix"
    }
  },
  "cdars": {
    "code": "C-DARS",
    "title": "中文版失樂症維度量表 C-DARS",
    "instructions": [
      "請仔細思考，按每個分類各提供兩個您享受的活動／體驗例子。",
      "如果最近沒有特別享受的活動／體驗，請回想最享受的活動／體驗，然後根據現在的情況作答。",
      "請選出最能準確形容感覺的答案。例子只供提示；請填寫參加者本人真正喜歡的活動或體驗。"
    ],
    "options": [
      {
        "value": 0,
        "label": "一點都不",
        "code": "1"
      },
      {
        "value": 1,
        "label": "輕度",
        "code": "2"
      },
      {
        "value": 2,
        "label": "中度",
        "code": "3"
      },
      {
        "value": 3,
        "label": "高度",
        "code": "4"
      },
      {
        "value": 4,
        "label": "極度",
        "code": "5"
      }
    ],
    "domains": [
      {
        "key": "pastimes",
        "title": "消閒娛樂／嗜好",
        "examplePrompt": "請寫下至少兩項您喜歡的单人消閒娛樂或嗜好。 請分別填寫兩個例子（例如：读书、园艺、看剧）",
        "items": [
          [
            "enjoy",
            "我會享受這些活動。",
            "享受活動"
          ],
          [
            "time",
            "我會花時間參與這些活動。",
            "花時間參與"
          ],
          [
            "want",
            "我希望做這些事。",
            "希望去做"
          ],
          [
            "interest",
            "這些活動讓我提起興趣。",
            "提起興趣"
          ]
        ],
        "minimumExamples": 2,
        "examplesMainlyNonSocial": true,
        "exampleValidationMessage": "請再寫一項。這一題需要至少兩項主自己一个人进行的消閒娛樂或嗜好）",
        "example1Field": "cdars_pastimes_example_1",
        "example2Field": "cdars_pastimes_example_2"
      },
      {
        "key": "food_drink",
        "title": "食物／飲品",
        "examplePrompt": "請寫下一種或多種您喜歡的食物或飲品。 請分別填寫兩個例子（如咖啡、虾饺、云吞面）",
        "items": [
          [
            "effort",
            "我會儘力去購買／製作這些食物／飲品。",
            "購買／製作"
          ],
          [
            "enjoy",
            "我會享受這些食物／飲品。",
            "享受食物／飲品"
          ],
          [
            "want",
            "我希望得到這些食物／飲品。",
            "希望得到"
          ],
          [
            "consume",
            "我會儘可能多吃／喝這些食物／飲品。",
            "儘可能多吃／喝"
          ]
        ],
        "example1Field": "cdars_food_drink_example_1",
        "example2Field": "cdars_food_drink_example_2",
        "minimumExamples": 2
      },
      {
        "key": "social",
        "title": "社交活動",
        "examplePrompt": "請寫下一項或多項您喜歡的社交活動。 請分別填寫兩個例子（如参加社区活动、聚餐、和亲友唱歌）",
        "items": [
          [
            "happy",
            "花時間參與這些活動讓我感到快樂。",
            "參與時快樂"
          ],
          [
            "interest",
            "我會有興趣參與群體活動。",
            "有興趣參與"
          ],
          [
            "plan",
            "我會參與策劃這些活動。",
            "參與策劃"
          ],
          [
            "active",
            "我會積極參與這些社交活動。",
            "積極參與"
          ]
        ],
        "example1Field": "cdars_social_example_1",
        "example2Field": "cdars_social_example_2",
        "minimumExamples": 2
      },
      {
        "key": "sensory",
        "title": "感官體驗",
        "examplePrompt": "請寫下一項或多項您喜歡的感官體驗(望闻常听触）。請分別填寫兩個例子（例如：聽音樂、聞花香、品茶）",
        "items": [
          [
            "seek",
            "我會主動尋求這些體驗。",
            "主動尋求"
          ],
          [
            "excited",
            "我想到這些體驗時感覺興奮。",
            "想到時興奮"
          ],
          [
            "savour",
            "如果有機會體驗這些事，我會細味每一刻。",
            "細味每一刻"
          ],
          [
            "want",
            "我希望擁有這些體驗。",
            "希望擁有"
          ],
          [
            "effort_time",
            "我會儘力去花時間參與這些體驗。",
            "花時間參與"
          ]
        ],
        "example1Field": "cdars_sensory_example_1",
        "example2Field": "cdars_sensory_example_2",
        "minimumExamples": 2
      }
    ],
    "items": [
      {
        "name": "cdars_pastimes_enjoy_score",
        "fullLabel": "我會享受這些活動。",
        "backfillLabel": "消閒娛樂／嗜好 1｜享受活動",
        "domain": "pastimes",
        "domainItem": 1,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_pastimes_time_score",
        "fullLabel": "我會花時間參與這些活動。",
        "backfillLabel": "消閒娛樂／嗜好 2｜花時間參與",
        "domain": "pastimes",
        "domainItem": 2,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_pastimes_want_score",
        "fullLabel": "我希望做這些事。",
        "backfillLabel": "消閒娛樂／嗜好 3｜希望去做",
        "domain": "pastimes",
        "domainItem": 3,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_pastimes_interest_score",
        "fullLabel": "這些活動讓我提起興趣。",
        "backfillLabel": "消閒娛樂／嗜好 4｜提起興趣",
        "domain": "pastimes",
        "domainItem": 4,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_food_drink_effort_score",
        "fullLabel": "我會儘力去購買／製作這些食物／飲品。",
        "backfillLabel": "食物／飲品 1｜購買／製作",
        "domain": "food_drink",
        "domainItem": 1,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_food_drink_enjoy_score",
        "fullLabel": "我會享受這些食物／飲品。",
        "backfillLabel": "食物／飲品 2｜享受食物／飲品",
        "domain": "food_drink",
        "domainItem": 2,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_food_drink_want_score",
        "fullLabel": "我希望得到這些食物／飲品。",
        "backfillLabel": "食物／飲品 3｜希望得到",
        "domain": "food_drink",
        "domainItem": 3,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_food_drink_consume_score",
        "fullLabel": "我會儘可能多吃／喝這些食物／飲品。",
        "backfillLabel": "食物／飲品 4｜儘可能多吃／喝",
        "domain": "food_drink",
        "domainItem": 4,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_social_happy_score",
        "fullLabel": "花時間參與這些活動讓我感到快樂。",
        "backfillLabel": "社交活動 1｜參與時快樂",
        "domain": "social",
        "domainItem": 1,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_social_interest_score",
        "fullLabel": "我會有興趣參與群體活動。",
        "backfillLabel": "社交活動 2｜有興趣參與",
        "domain": "social",
        "domainItem": 2,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_social_plan_score",
        "fullLabel": "我會參與策劃這些活動。",
        "backfillLabel": "社交活動 3｜參與策劃",
        "domain": "social",
        "domainItem": 3,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_social_active_score",
        "fullLabel": "我會積極參與這些社交活動。",
        "backfillLabel": "社交活動 4｜積極參與",
        "domain": "social",
        "domainItem": 4,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_sensory_seek_score",
        "fullLabel": "我會主動尋求這些體驗。",
        "backfillLabel": "感官體驗 1｜主動尋求",
        "domain": "sensory",
        "domainItem": 1,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_sensory_excited_score",
        "fullLabel": "我想到這些體驗時感覺興奮。",
        "backfillLabel": "感官體驗 2｜想到時興奮",
        "domain": "sensory",
        "domainItem": 2,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_sensory_savour_score",
        "fullLabel": "如果有機會體驗這些事，我會細味每一刻。",
        "backfillLabel": "感官體驗 3｜細味每一刻",
        "domain": "sensory",
        "domainItem": 3,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_sensory_want_score",
        "fullLabel": "我希望擁有這些體驗。",
        "backfillLabel": "感官體驗 4｜希望擁有",
        "domain": "sensory",
        "domainItem": 4,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      },
      {
        "name": "cdars_sensory_effort_time_score",
        "fullLabel": "我會儘力去花時間參與這些體驗。",
        "backfillLabel": "感官體驗 5｜花時間參與",
        "domain": "sensory",
        "domainItem": 5,
        "options": [
          {
            "value": 0,
            "label": "一點都不",
            "code": "1"
          },
          {
            "value": 1,
            "label": "輕度",
            "code": "2"
          },
          {
            "value": 2,
            "label": "中度",
            "code": "3"
          },
          {
            "value": 3,
            "label": "高度",
            "code": "4"
          },
          {
            "value": 4,
            "label": "極度",
            "code": "5"
          }
        ],
        "displayValueRange": "1-5",
        "storedScoreRange": "0-4"
      }
    ],
    "examplesAreRawOnly": true,
    "layout": {
      "formal": "domain_cards_with_examples_and_full_item_grid",
      "backfill": "domain_compact_0_4_grid"
    },
    "presentation": {
      "twoSeparateInputs": true,
      "inlineExamplesInRatingStem": true
    }
  },
  "medication": {
    "code": "MEDICATION",
    "presentation": {
      "initialState": "show_add_one_medication_button_only",
      "entryOrder": [
        "name",
        "strength",
        "times_per_day",
        "units_per_time"
      ],
      "completionBehaviour": "collapse_card_show_summary_then_offer_add_another",
      "maxItems": 6,
      "allowEdit": true,
      "allowDelete": true,
      "enterMovesNext": true
    },
    "itemFields": [
      {
        "index": 1,
        "fields": {
          "name": "medication_01_name",
          "strength": "medication_01_strength",
          "timesPerDay": "medication_01_times_per_day",
          "unitsPerTime": "medication_01_units_per_time"
        }
      },
      {
        "index": 2,
        "fields": {
          "name": "medication_02_name",
          "strength": "medication_02_strength",
          "timesPerDay": "medication_02_times_per_day",
          "unitsPerTime": "medication_02_units_per_time"
        }
      },
      {
        "index": 3,
        "fields": {
          "name": "medication_03_name",
          "strength": "medication_03_strength",
          "timesPerDay": "medication_03_times_per_day",
          "unitsPerTime": "medication_03_units_per_time"
        }
      },
      {
        "index": 4,
        "fields": {
          "name": "medication_04_name",
          "strength": "medication_04_strength",
          "timesPerDay": "medication_04_times_per_day",
          "unitsPerTime": "medication_04_units_per_time"
        }
      },
      {
        "index": 5,
        "fields": {
          "name": "medication_05_name",
          "strength": "medication_05_strength",
          "timesPerDay": "medication_05_times_per_day",
          "unitsPerTime": "medication_05_units_per_time"
        }
      },
      {
        "index": 6,
        "fields": {
          "name": "medication_06_name",
          "strength": "medication_06_strength",
          "timesPerDay": "medication_06_times_per_day",
          "unitsPerTime": "medication_06_units_per_time"
        }
      }
    ],
    "additionalFields": [
      "medication_entry_choice",
      "medication_self_report_remark",
      "medication_verified_text",
      "medication_verification_status",
      "medication_verification_date",
      "medication_verified_by",
      "medication_source",
      "med_on_off",
      "last_pd_med_minutes",
      "total_ledd_mg",
      "da_ledd_mg",
      "levodopa_ledd_mg",
      "ledd_source",
      "ledd_calculation_date",
      "ledd_calculated_by",
      "ledd_status"
    ],
    "leddRule": "Hospital-provided LEDD is not recalculated by the website; PDA LEDD is manually calculated from verified medication."
  },
  "moca": {
    "code": "MOCA",
    "maxAttempts": 2,
    "attempts": [
      {
        "attempt": 1,
        "fields": {
          "rawTotal": "moca_1_raw_total",
          "adjustment": "moca_1_adjustment",
          "adjustedTotal": "moca_1_adjusted_total",
          "ageYears": "moca_1_age_years",
          "educationYears": "moca_1_education_years",
          "percentile16Cutoff": "moca_1_16th_cutoff",
          "normResultCode": "moca_1_norm_result_code",
          "assessmentDate": "moca_1_assessment_date",
          "source": "moca_1_source",
          "context": "moca_1_context"
        }
      },
      {
        "attempt": 2,
        "fields": {
          "rawTotal": "moca_2_raw_total",
          "adjustment": "moca_2_adjustment",
          "adjustedTotal": "moca_2_adjusted_total",
          "ageYears": "moca_2_age_years",
          "educationYears": "moca_2_education_years",
          "percentile16Cutoff": "moca_2_16th_cutoff",
          "normResultCode": "moca_2_norm_result_code",
          "assessmentDate": "moca_2_assessment_date",
          "source": "moca_2_source",
          "context": "moca_2_context"
        }
      }
    ],
    "summaryFields": [
      "moca_count",
      "moca_repeat_required",
      "moca_repeat_reason"
    ],
    "repeatRule": "Second MoCA exists only when the latest valid MoCA is more than two months before MRI or the research team requires it.",
    "adjustmentRule": "adjusted_total=min(30,raw_total+adjustment); adjustment range 0-2",
    "percentileComparisonRule": "Protocol currently compares raw_total with the 16th cutoff; do not switch to adjusted_total without protocol confirmation.",
    "below65Rule": "cutoff=999 and manual review",
    "cutoffs16th": [
      {
        "ageMin": 65,
        "ageMax": 69,
        "educationMax": 3,
        "cutoff": 17
      },
      {
        "ageMin": 65,
        "ageMax": 69,
        "educationMin": 4,
        "educationMax": 6,
        "cutoff": 19
      },
      {
        "ageMin": 65,
        "ageMax": 69,
        "educationMin": 7,
        "educationMax": 9,
        "cutoff": 21
      },
      {
        "ageMin": 65,
        "ageMax": 69,
        "educationMin": 10,
        "educationMax": 12,
        "cutoff": 22
      },
      {
        "ageMin": 65,
        "ageMax": 69,
        "educationMin": 13,
        "cutoff": 25
      },
      {
        "ageMin": 70,
        "ageMax": 79,
        "educationMax": 3,
        "cutoff": 15
      },
      {
        "ageMin": 70,
        "ageMax": 79,
        "educationMin": 4,
        "educationMax": 6,
        "cutoff": 18
      },
      {
        "ageMin": 70,
        "ageMax": 79,
        "educationMin": 7,
        "educationMax": 9,
        "cutoff": 20
      },
      {
        "ageMin": 70,
        "ageMax": 79,
        "educationMin": 10,
        "cutoff": 22
      },
      {
        "ageMin": 80,
        "educationMax": 6,
        "cutoff": 13
      },
      {
        "ageMin": 80,
        "educationMin": 7,
        "cutoff": 17
      }
    ]
  },
  "mriSafetyVisits": {
    "initial": {
      "rule": "Store the complete initial MRI safety items and date.",
      "fields": [
        "mri_safety_initial_date",
        "mri_safety_initial_complete",
        "mri_safety_initial_review_status"
      ]
    },
    "scanDay": {
      "rule": "Paper form is provided to UBSN; electronic record stores only verification, date, change status and change detail.",
      "fields": [
        "mri_safety_scan_day_checked",
        "mri_safety_scan_day_date",
        "mri_safety_changed_since_initial",
        "mri_safety_change_detail"
      ]
    }
  },
  "sequences": {
    "items": [
      {
        "key": "t1_mp2rage",
        "label": "T1_mp2rage",
        "field": "mri_seq_t1_mp2rage_done"
      },
      {
        "key": "t1_flaws",
        "label": "T1_flaws",
        "field": "mri_seq_t1_flaws_done"
      },
      {
        "key": "qsm",
        "label": "qsm_",
        "field": "mri_seq_qsm_done"
      },
      {
        "key": "t2_me3d",
        "label": "t2_me3d",
        "field": "mri_seq_t2_me3d_done"
      },
      {
        "key": "cest_pd",
        "label": "CEST_PD",
        "field": "mri_seq_cest_pd_done"
      },
      {
        "key": "mt_cest",
        "label": "MT_CEST",
        "field": "mri_seq_mt_cest_done"
      },
      {
        "key": "resting",
        "label": "Resting",
        "field": "mri_seq_resting_done"
      },
      {
        "key": "igt_adcb",
        "label": "IGT_ADCB",
        "field": "mri_seq_igt_adcb_done"
      },
      {
        "key": "igt_bdca",
        "label": "IGT_BDCA",
        "field": "mri_seq_igt_bdca_done"
      },
      {
        "key": "dmri_dki",
        "label": "dMRI_DKI",
        "field": "mri_seq_dmri_dki_done"
      },
      {
        "key": "dmri_b0",
        "label": "dMRI_B0",
        "field": "mri_seq_dmri_b0_done"
      },
      {
        "key": "gre_2d_mt",
        "label": "2D_GRE_MT",
        "field": "mri_seq_gre_2d_mt_done"
      },
      {
        "key": "gre_3d",
        "label": "3DGRE",
        "field": "mri_seq_gre_3d_done"
      },
      {
        "key": "t1_mprage",
        "label": "T1_MPRAGE",
        "field": "mri_seq_t1_mprage_done"
      }
    ],
    "generalRemarkField": "mri_sequence_general_remark",
    "individualRemarkFieldsAllowed": false
  },
  "computerTests": {
    "mid": {
      "fields": [
        "mid_res_time_ms",
        "mid_assessment_date"
      ]
    },
    "cgt": {
      "fields": [
        "cgt_status",
        "cgt_assessment_date",
        "cgt_remark"
      ],
      "rule": "Placeholder only; no invented items, no scoring, and never blocks submission."
    },
    "digitSpan": {
      "fields": [
        "digit_span_forward",
        "digit_span_backward",
        "digit_span_total",
        "digit_span_assessment_date"
      ],
      "totalRule": "forward+backward when both are present"
    }
  },
  "clinical": {
    "updrs3": {
      "routes": [
        "hospital_total_only",
        "hospital_items",
        "research_assessed",
        "pending_hospital",
        "not_applicable"
      ],
      "fields": [
        "updrs3_route",
        "updrs3_source",
        "updrs3_assessment_date",
        "updrs3_status",
        "updrs3_reported_total",
        "updrs3_calculated_total",
        "updrs3_total",
        "updrs3_total_discrepancy",
        "updrs3_complete"
      ],
      "items": [
        {
          "code": "01",
          "name": "updrs3_01",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "傾聽參加者說話；如有需要，可與參加者討論工作、興趣、運動或到診經過。評估音量、音調、咬字清晰度，以及有否口齒不清、口吃或說話急促。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有言語問題。"
            },
            {
              "value": 1,
              "label": "很少：喪失正常音調、發音與音量，但所有字句仍可輕易聽懂。"
            },
            {
              "value": 2,
              "label": "輕微：喪失正常音調、發音與音量；少數字句聽不清楚，但整體語句仍可輕易理解。"
            },
            {
              "value": 3,
              "label": "中度：言語較難理解；部分但並非大部分語句很難聽懂。"
            },
            {
              "value": 4,
              "label": "嚴重：大部分言語很難理解或完全聽不懂。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.1 言語",
          "backfillLabel": "3.1 言語",
          "displayLabel": "3.1 言語"
        },
        {
          "code": "02",
          "name": "updrs3_02",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "觀察參加者靜坐休息10秒、不說話及說話時的表情變化，包括眨眼頻率、面具臉、面無表情、自發笑容及嘴唇微張。",
          "options": [
            {
              "value": 0,
              "label": "正常：面部表情正常。"
            },
            {
              "value": 1,
              "label": "很少：很少面無表情，只有眨眼次數減少。"
            },
            {
              "value": 2,
              "label": "輕微：除眨眼次數減少外，面具臉出現在臉部下半部；嘴巴附近活動較少，自發笑容減少，但嘴唇沒有微張。"
            },
            {
              "value": 3,
              "label": "中度：面具臉；嘴巴休息時有時出現嘴唇微張。"
            },
            {
              "value": 4,
              "label": "嚴重：面具臉；嘴巴休息時大部分時間出現嘴唇微張。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.2 面部表情",
          "backfillLabel": "3.2 面部表情",
          "displayLabel": "3.2 面部表情"
        },
        {
          "code": "03a",
          "name": "updrs3_03a",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有僵硬。"
            },
            {
              "value": 1,
              "label": "很少：只有其他肢體作誘發動作時才可測到。"
            },
            {
              "value": 2,
              "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
            },
            {
              "value": 3,
              "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
            },
            {
              "value": 4,
              "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.3a 僵硬－頸部",
          "backfillLabel": "3.3a 僵硬－頸部",
          "displayLabel": "3.3a 僵硬－頸部"
        },
        {
          "code": "03b",
          "name": "updrs3_03b",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有僵硬。"
            },
            {
              "value": 1,
              "label": "很少：只有其他肢體作誘發動作時才可測到。"
            },
            {
              "value": 2,
              "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
            },
            {
              "value": 3,
              "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
            },
            {
              "value": 4,
              "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.3b 僵硬－右上肢",
          "backfillLabel": "3.3b 僵硬－右上肢",
          "displayLabel": "3.3b 僵硬－右上肢"
        },
        {
          "code": "03c",
          "name": "updrs3_03c",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有僵硬。"
            },
            {
              "value": 1,
              "label": "很少：只有其他肢體作誘發動作時才可測到。"
            },
            {
              "value": 2,
              "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
            },
            {
              "value": 3,
              "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
            },
            {
              "value": 4,
              "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.3c 僵硬－左上肢",
          "backfillLabel": "3.3c 僵硬－左上肢",
          "displayLabel": "3.3c 僵硬－左上肢"
        },
        {
          "code": "03d",
          "name": "updrs3_03d",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有僵硬。"
            },
            {
              "value": 1,
              "label": "很少：只有其他肢體作誘發動作時才可測到。"
            },
            {
              "value": 2,
              "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
            },
            {
              "value": 3,
              "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
            },
            {
              "value": 4,
              "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.3d 僵硬－右下肢",
          "backfillLabel": "3.3d 僵硬－右下肢",
          "displayLabel": "3.3d 僵硬－右下肢"
        },
        {
          "code": "03e",
          "name": "updrs3_03e",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有僵硬。"
            },
            {
              "value": 1,
              "label": "很少：只有其他肢體作誘發動作時才可測到。"
            },
            {
              "value": 2,
              "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
            },
            {
              "value": 3,
              "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
            },
            {
              "value": 4,
              "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.3e 僵硬－左下肢",
          "backfillLabel": "3.3e 僵硬－左下肢",
          "displayLabel": "3.3e 僵硬－左下肢"
        },
        {
          "code": "04a",
          "name": "updrs3_04a",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者將拇指與食指盡量分開，以最快速度拍打10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.4a 手指拍打－右手",
          "backfillLabel": "3.4a 手指拍打－右手",
          "displayLabel": "3.4a 手指拍打－右手"
        },
        {
          "code": "04b",
          "name": "updrs3_04b",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者將拇指與食指盡量分開，以最快速度拍打10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.4b 手指拍打－左手",
          "backfillLabel": "3.4b 手指拍打－左手",
          "displayLabel": "3.4b 手指拍打－左手"
        },
        {
          "code": "05a",
          "name": "updrs3_05a",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者屈肘、手掌面向施測者，握拳後盡量張開，以最快速度連續握緊及張開10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.5a 手部運動－右手",
          "backfillLabel": "3.5a 手部運動－右手",
          "displayLabel": "3.5a 手部運動－右手"
        },
        {
          "code": "05b",
          "name": "updrs3_05b",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者屈肘、手掌面向施測者，握拳後盡量張開，以最快速度連續握緊及張開10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.5b 手部運動－左手",
          "backfillLabel": "3.5b 手部運動－左手",
          "displayLabel": "3.5b 手部運動－左手"
        },
        {
          "code": "06a",
          "name": "updrs3_06a",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者手掌向下、手臂在身體前方伸直，以最快速度將手掌完全翻向上及下，共10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.6a 前臂旋前旋後運動－右手",
          "backfillLabel": "3.6a 前臂旋前旋後運動－右手",
          "displayLabel": "3.6a 前臂旋前旋後運動－右手"
        },
        {
          "code": "06b",
          "name": "updrs3_06b",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者手掌向下、手臂在身體前方伸直，以最快速度將手掌完全翻向上及下，共10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.6b 前臂旋前旋後運動－左手",
          "backfillLabel": "3.6b 前臂旋前旋後運動－左手",
          "displayLabel": "3.6b 前臂旋前旋後運動－左手"
        },
        {
          "code": "07a",
          "name": "updrs3_07a",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙腳分別測試。請參加者舒適坐在有直背及扶手的椅子上，腳跟放在地上，以最大幅度及最快速度用腳趾拍地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.7a 腳趾拍地－右腳",
          "backfillLabel": "3.7a 腳趾拍地－右腳",
          "displayLabel": "3.7a 腳趾拍地－右腳"
        },
        {
          "code": "07b",
          "name": "updrs3_07b",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙腳分別測試。請參加者舒適坐在有直背及扶手的椅子上，腳跟放在地上，以最大幅度及最快速度用腳趾拍地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.7b 腳趾拍地－左腳",
          "backfillLabel": "3.7b 腳趾拍地－左腳",
          "displayLabel": "3.7b 腳趾拍地－左腳"
        },
        {
          "code": "08a",
          "name": "updrs3_08a",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙腳分別測試。請參加者坐在有扶手的靠背椅，雙腳舒適放在地上，以最大幅度及最快速度將腳抬高並跺地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.8a 腿部靈活性－右腿",
          "backfillLabel": "3.8a 腿部靈活性－右腿",
          "displayLabel": "3.8a 腿部靈活性－右腿"
        },
        {
          "code": "08b",
          "name": "updrs3_08b",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙腳分別測試。請參加者坐在有扶手的靠背椅，雙腳舒適放在地上，以最大幅度及最快速度將腳抬高並跺地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
            },
            {
              "value": 2,
              "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
            },
            {
              "value": 3,
              "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
            },
            {
              "value": 4,
              "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.8b 腿部靈活性－左腿",
          "backfillLabel": "3.8b 腿部靈活性－左腿",
          "displayLabel": "3.8b 腿部靈活性－左腿"
        },
        {
          "code": "09",
          "name": "updrs3_09",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "請參加者坐在有扶手的靠背椅，雙腳置地，雙手交叉放在胸前後站起。按正式程序逐步重試，必要時允許使用扶手或由施測者協助。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題，可快速且不遲疑地站起。"
            },
            {
              "value": 1,
              "label": "很少：動作稍慢；或需多於1次嘗試；或需坐近椅邊才站起；不需用手推扶手。"
            },
            {
              "value": 2,
              "label": "輕微：可自行用手推扶手站起。"
            },
            {
              "value": 3,
              "label": "中度：需用手推扶手站起但容易向後跌回椅上，或需多於1次嘗試；不需他人協助。"
            },
            {
              "value": 4,
              "label": "嚴重：無法在沒有他人協助下站起。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.9 從椅子站起來",
          "backfillLabel": "3.9 從椅子站起來",
          "displayLabel": "3.9 從椅子站起來"
        },
        {
          "code": "10",
          "name": "updrs3_10",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "請參加者來回步行至少10米，以同時觀察左右側。評估步幅、速度、腳離地高度、腳跟着地、轉身及手臂擺動；步態凍結另記於3.11。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：可獨立行走，但有少許步態問題。"
            },
            {
              "value": 2,
              "label": "輕微：可獨立行走，但有明顯步態問題。"
            },
            {
              "value": 3,
              "label": "中度：需要手杖或助行器等工具以安全行走，但不需旁人協助。"
            },
            {
              "value": 4,
              "label": "嚴重：完全不能行走或需要旁人協助。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.10 步態",
          "backfillLabel": "3.10 步態",
          "displayLabel": "3.10 步態"
        },
        {
          "code": "11",
          "name": "updrs3_11",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "在步態測試中觀察起步、轉彎、通過出入口及接近終點時有否停頓、碎步或分節。除非基於安全考慮，避免提供感覺提示。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有步態凍結。"
            },
            {
              "value": 1,
              "label": "很少：起步、轉彎或通過出入口時有1次停頓，其後可在平直路面順暢行走。"
            },
            {
              "value": 2,
              "label": "輕微：起步、轉彎或通過出入口時有超過1次停頓，其後可在平直路面順暢行走。"
            },
            {
              "value": 3,
              "label": "中度：在平直路面行走時出現1次步態凍結。"
            },
            {
              "value": 4,
              "label": "嚴重：在平直路面行走時出現多次步態凍結。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.11 步態凍結",
          "backfillLabel": "3.11 步態凍結",
          "displayLabel": "3.11 步態凍結"
        },
        {
          "code": "12",
          "name": "updrs3_12",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "在參加者睜眼、雙腳微張站立時，按正式拉動測試評估向後倒的身體反應。第一次為示範，不評分；第二次快速有力地拉動肩膀並確保安全。",
          "options": [
            {
              "value": 0,
              "label": "正常：後退1至2步便恢復站立平衡。"
            },
            {
              "value": 1,
              "label": "很少：需要後退3至5步，不需他人協助。"
            },
            {
              "value": 2,
              "label": "輕微：需要後退超過5步，仍不需他人協助。"
            },
            {
              "value": 3,
              "label": "中度：可安全站立但缺乏姿勢平穩反應；若施測者不扶住會跌倒。"
            },
            {
              "value": 4,
              "label": "嚴重：非常不穩，在自然狀態或輕拉肩膀時已有失去平衡傾向。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.12 姿勢穩定性",
          "backfillLabel": "3.12 姿勢穩定性",
          "displayLabel": "3.12 姿勢穩定性"
        },
        {
          "code": "13",
          "name": "updrs3_13",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "觀察參加者從椅上站起、步行及接受姿勢平穩度測試時的姿勢。若姿勢不正確，可提醒挺直並觀察能否矯正；按三個觀察點中最差表現評分。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：不太挺直，但對年長人士可算正常。"
            },
            {
              "value": 2,
              "label": "輕微：明確側彎、脊柱側彎或身體傾向一側，但提醒後可矯正。"
            },
            {
              "value": 3,
              "label": "中度：駝背、脊柱側彎或身體傾向一側，提醒後仍不能矯正。"
            },
            {
              "value": 4,
              "label": "嚴重：嚴重駝背、脊柱側彎或側傾，導致姿勢極度異常。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.13 姿勢",
          "backfillLabel": "3.13 姿勢",
          "displayLabel": "3.13 姿勢"
        },
        {
          "code": "14",
          "name": "updrs3_14",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "綜合觀察坐姿、站立、起身及其他自發動作，評估整體動作速度、遲疑、動作量及幅度。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有問題。"
            },
            {
              "value": 1,
              "label": "很少：整體動作稍慢，自發動作稍微減少。"
            },
            {
              "value": 2,
              "label": "輕微：整體動作輕微變慢，自發動作輕微減少。"
            },
            {
              "value": 3,
              "label": "中度：整體動作中度變慢，自發動作中度減少。"
            },
            {
              "value": 4,
              "label": "嚴重：整體動作嚴重變慢，自發動作嚴重減少。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.14 全身動作自發性（身體動作遲緩）",
          "backfillLabel": "3.14 全身動作自發性（身體動作遲緩）",
          "displayLabel": "3.14 全身動作自發性（身體動作遲緩）"
        },
        {
          "code": "15a",
          "name": "updrs3_15a",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者手掌向下、手臂向前伸直、手腕打直並分開手指，保持10秒。所有顫抖，包括重新出現的靜止型顫抖，均納入評分；按最大幅度評分。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：有顫抖，幅度小於1厘米。"
            },
            {
              "value": 2,
              "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
            },
            {
              "value": 3,
              "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
            },
            {
              "value": 4,
              "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.15a 手部姿勢性震顫－右手",
          "backfillLabel": "3.15a 手部姿勢性震顫－右手",
          "displayLabel": "3.15a 手部姿勢性震顫－右手"
        },
        {
          "code": "15b",
          "name": "updrs3_15b",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者手掌向下、手臂向前伸直、手腕打直並分開手指，保持10秒。所有顫抖，包括重新出現的靜止型顫抖，均納入評分；按最大幅度評分。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：有顫抖，幅度小於1厘米。"
            },
            {
              "value": 2,
              "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
            },
            {
              "value": 3,
              "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
            },
            {
              "value": 4,
              "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.15b 手部姿勢性震顫－左手",
          "backfillLabel": "3.15b 手部姿勢性震顫－左手",
          "displayLabel": "3.15b 手部姿勢性震顫－左手"
        },
        {
          "code": "16a",
          "name": "updrs3_16a",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者由手臂伸直開始，緩慢作手指至鼻尖的來回動作至少3次，按整個移動過程或接近目標時出現的最大顫抖幅度評分。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：有顫抖，幅度小於1厘米。"
            },
            {
              "value": 2,
              "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
            },
            {
              "value": 3,
              "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
            },
            {
              "value": 4,
              "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.16a 手部動作性震顫－右手",
          "backfillLabel": "3.16a 手部動作性震顫－右手",
          "displayLabel": "3.16a 手部動作性震顫－右手"
        },
        {
          "code": "16b",
          "name": "updrs3_16b",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "雙手分別測試。請參加者由手臂伸直開始，緩慢作手指至鼻尖的來回動作至少3次，按整個移動過程或接近目標時出現的最大顫抖幅度評分。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：有顫抖，幅度小於1厘米。"
            },
            {
              "value": 2,
              "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
            },
            {
              "value": 3,
              "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
            },
            {
              "value": 4,
              "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.16b 手部動作性震顫－左手",
          "backfillLabel": "3.16b 手部動作性震顫－左手",
          "displayLabel": "3.16b 手部動作性震顫－左手"
        },
        {
          "code": "17a",
          "name": "updrs3_17a",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：有顫抖，幅度小於1厘米。"
            },
            {
              "value": 2,
              "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
            },
            {
              "value": 3,
              "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
            },
            {
              "value": 4,
              "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.17a 靜止性震顫幅度－右上肢",
          "backfillLabel": "3.17a 靜止性震顫幅度－右上肢",
          "displayLabel": "3.17a 靜止性震顫幅度－右上肢"
        },
        {
          "code": "17b",
          "name": "updrs3_17b",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：有顫抖，幅度小於1厘米。"
            },
            {
              "value": 2,
              "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
            },
            {
              "value": 3,
              "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
            },
            {
              "value": 4,
              "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.17b 靜止性震顫幅度－左上肢",
          "backfillLabel": "3.17b 靜止性震顫幅度－左上肢",
          "displayLabel": "3.17b 靜止性震顫幅度－左上肢"
        },
        {
          "code": "17c",
          "name": "updrs3_17c",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：有顫抖，幅度小於1厘米。"
            },
            {
              "value": 2,
              "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
            },
            {
              "value": 3,
              "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
            },
            {
              "value": 4,
              "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.17c 靜止性震顫幅度－右下肢",
          "backfillLabel": "3.17c 靜止性震顫幅度－右下肢",
          "displayLabel": "3.17c 靜止性震顫幅度－右下肢"
        },
        {
          "code": "17d",
          "name": "updrs3_17d",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：有顫抖，幅度小於1厘米。"
            },
            {
              "value": 2,
              "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
            },
            {
              "value": 3,
              "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
            },
            {
              "value": 4,
              "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.17d 靜止性震顫幅度－左下肢",
          "backfillLabel": "3.17d 靜止性震顫幅度－左下肢",
          "displayLabel": "3.17d 靜止性震顫幅度－左下肢"
        },
        {
          "code": "17e",
          "name": "updrs3_17e",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的嘴唇／下巴靜止型顫抖，按最大幅度評分，不考慮持續性。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：有顫抖，幅度小於1厘米。"
            },
            {
              "value": 2,
              "label": "輕微：有顫抖，幅度為1厘米至小於2厘米。"
            },
            {
              "value": 3,
              "label": "中度：有顫抖，幅度為2厘米至小於3厘米。"
            },
            {
              "value": 4,
              "label": "嚴重：有顫抖，幅度大於或等於3厘米。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.17e 靜止性震顫幅度－嘴唇／下巴",
          "backfillLabel": "3.17e 靜止性震顫幅度－嘴唇／下巴",
          "displayLabel": "3.17e 靜止性震顫幅度－嘴唇／下巴"
        },
        {
          "code": "18",
          "name": "updrs3_18",
          "scoreRange": "0-4",
          "wordingStatus": "use_research_approved_anchor_text_only",
          "instruction": "綜合整個動作評估期間出現的靜止型顫抖，按顫抖佔全部檢查時間的比例評分。",
          "options": [
            {
              "value": 0,
              "label": "正常：沒有顫抖。"
            },
            {
              "value": 1,
              "label": "很少：顫抖出現時間佔全部檢查時間25%或以下。"
            },
            {
              "value": 2,
              "label": "輕微：顫抖出現時間佔26%至50%。"
            },
            {
              "value": 3,
              "label": "中度：顫抖出現時間佔51%至75%。"
            },
            {
              "value": 4,
              "label": "嚴重：顫抖出現時間佔75%以上。"
            }
          ],
          "anchorStatus": "research_team_supplied_item_specific",
          "fullLabel": "3.18 靜止性震顫持續性",
          "backfillLabel": "3.18 靜止性震顫持續性",
          "displayLabel": "3.18 靜止性震顫持續性"
        }
      ],
      "totalRule": "Calculate 0-132 only when all 33 item scores are present.",
      "dyskinesiaFields": [
        "updrs3_dyskinesia_present",
        "updrs3_dyskinesia_interference"
      ],
      "contextFields": [
        "updrs3a_pd_treatment",
        "updrs3b_clinical_state",
        "updrs3c_levodopa",
        "updrs3c1_last_levodopa_minutes"
      ],
      "sourceNote": "QMH/TWH have 33 item scores; whether QEH has item scores remains pending confirmation.",
      "text": {
        "code": "UPDRS-III",
        "title": "UPDRS-III 運動評估",
        "contextFields": [
          {
            "name": "updrs3a_pd_treatment",
            "fullLabel": "3a. 參加者是否正接受柏金遜症藥物治療？",
            "options": [
              {
                "value": 1,
                "label": "是"
              },
              {
                "value": 0,
                "label": "否"
              }
            ]
          },
          {
            "name": "updrs3b_clinical_state",
            "fullLabel": "3b. 如正接受柏金遜症藥物治療，請記錄目前臨床功能狀態。",
            "help": "ON／來電：接受藥物並對治療反應良好時的典型功能狀態。OFF／停電：即使接受藥物，對治療反應不佳時的典型功能狀態。",
            "options": [
              {
                "value": "ON",
                "label": "ON／來電"
              },
              {
                "value": "OFF",
                "label": "OFF／停電"
              }
            ]
          },
          {
            "name": "updrs3c_levodopa",
            "fullLabel": "3c. 是否有服用左多巴藥物？",
            "options": [
              {
                "value": 1,
                "label": "是"
              },
              {
                "value": 0,
                "label": "否"
              }
            ]
          },
          {
            "name": "updrs3c1_last_levodopa_minutes",
            "fullLabel": "3c1. 距離最後一次服用左多巴約多少分鐘？",
            "type": "number"
          }
        ],
        "items": [
          {
            "code": "01",
            "name": "updrs3_01",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "傾聽參加者說話；如有需要，可與參加者討論工作、興趣、運動或到診經過。評估音量、音調、咬字清晰度，以及有否口齒不清、口吃或說話急促。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有言語問題。"
              },
              {
                "value": 1,
                "label": "很少：喪失正常音調、發音與音量，但所有字句仍可輕易聽懂。"
              },
              {
                "value": 2,
                "label": "輕微：喪失正常音調、發音與音量；少數字句聽不清楚，但整體語句仍可輕易理解。"
              },
              {
                "value": 3,
                "label": "中度：言語較難理解；部分但並非大部分語句很難聽懂。"
              },
              {
                "value": 4,
                "label": "嚴重：大部分言語很難理解或完全聽不懂。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.1 言語",
            "backfillLabel": "3.1 言語",
            "displayLabel": "3.1 言語"
          },
          {
            "code": "02",
            "name": "updrs3_02",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "觀察參加者靜坐休息10秒、不說話及說話時的表情變化，包括眨眼頻率、面具臉、面無表情、自發笑容及嘴唇微張。",
            "options": [
              {
                "value": 0,
                "label": "正常：面部表情正常。"
              },
              {
                "value": 1,
                "label": "很少：很少面無表情，只有眨眼次數減少。"
              },
              {
                "value": 2,
                "label": "輕微：除眨眼次數減少外，面具臉出現在臉部下半部；嘴巴附近活動較少，自發笑容減少，但嘴唇沒有微張。"
              },
              {
                "value": 3,
                "label": "中度：面具臉；嘴巴休息時有時出現嘴唇微張。"
              },
              {
                "value": 4,
                "label": "嚴重：面具臉；嘴巴休息時大部分時間出現嘴唇微張。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.2 面部表情",
            "backfillLabel": "3.2 面部表情",
            "displayLabel": "3.2 面部表情"
          },
          {
            "code": "03a",
            "name": "updrs3_03a",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有僵硬。"
              },
              {
                "value": 1,
                "label": "很少：只有其他肢體作誘發動作時才可測到。"
              },
              {
                "value": 2,
                "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
              },
              {
                "value": 3,
                "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
              },
              {
                "value": 4,
                "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.3a 僵硬－頸部",
            "backfillLabel": "3.3a 僵硬－頸部",
            "displayLabel": "3.3a 僵硬－頸部"
          },
          {
            "code": "03b",
            "name": "updrs3_03b",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有僵硬。"
              },
              {
                "value": 1,
                "label": "很少：只有其他肢體作誘發動作時才可測到。"
              },
              {
                "value": 2,
                "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
              },
              {
                "value": 3,
                "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
              },
              {
                "value": 4,
                "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.3b 僵硬－右上肢",
            "backfillLabel": "3.3b 僵硬－右上肢",
            "displayLabel": "3.3b 僵硬－右上肢"
          },
          {
            "code": "03c",
            "name": "updrs3_03c",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有僵硬。"
              },
              {
                "value": 1,
                "label": "很少：只有其他肢體作誘發動作時才可測到。"
              },
              {
                "value": 2,
                "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
              },
              {
                "value": 3,
                "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
              },
              {
                "value": 4,
                "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.3c 僵硬－左上肢",
            "backfillLabel": "3.3c 僵硬－左上肢",
            "displayLabel": "3.3c 僵硬－左上肢"
          },
          {
            "code": "03d",
            "name": "updrs3_03d",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有僵硬。"
              },
              {
                "value": 1,
                "label": "很少：只有其他肢體作誘發動作時才可測到。"
              },
              {
                "value": 2,
                "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
              },
              {
                "value": 3,
                "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
              },
              {
                "value": 4,
                "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.3d 僵硬－右下肢",
            "backfillLabel": "3.3d 僵硬－右下肢",
            "displayLabel": "3.3d 僵硬－右下肢"
          },
          {
            "code": "03e",
            "name": "updrs3_03e",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "在參加者放鬆休息時，轉動或扭轉四肢及頸部，分別評估頸部和四肢主要關節。上肢同時測試腕及肘關節；下肢同時測試髖及膝關節。如未測到僵硬，讓未測試的另一側肢體作誘發動作。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有僵硬。"
              },
              {
                "value": 1,
                "label": "很少：只有其他肢體作誘發動作時才可測到。"
              },
              {
                "value": 2,
                "label": "輕微：無需誘發動作已可測到僵硬，但關節全活動範圍可輕易完成。"
              },
              {
                "value": 3,
                "label": "中度：無需誘發動作已可測到僵硬，完成關節全活動範圍需要用力。"
              },
              {
                "value": 4,
                "label": "嚴重：無需誘發動作已可測到僵硬，無法完成關節全活動範圍。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.3e 僵硬－左下肢",
            "backfillLabel": "3.3e 僵硬－左下肢",
            "displayLabel": "3.3e 僵硬－左下肢"
          },
          {
            "code": "04a",
            "name": "updrs3_04a",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者將拇指與食指盡量分開，以最快速度拍打10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.4a 手指拍打－右手",
            "backfillLabel": "3.4a 手指拍打－右手",
            "displayLabel": "3.4a 手指拍打－右手"
          },
          {
            "code": "04b",
            "name": "updrs3_04b",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者將拇指與食指盡量分開，以最快速度拍打10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.4b 手指拍打－左手",
            "backfillLabel": "3.4b 手指拍打－左手",
            "displayLabel": "3.4b 手指拍打－左手"
          },
          {
            "code": "05a",
            "name": "updrs3_05a",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者屈肘、手掌面向施測者，握拳後盡量張開，以最快速度連續握緊及張開10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.5a 手部運動－右手",
            "backfillLabel": "3.5a 手部運動－右手",
            "displayLabel": "3.5a 手部運動－右手"
          },
          {
            "code": "05b",
            "name": "updrs3_05b",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者屈肘、手掌面向施測者，握拳後盡量張開，以最快速度連續握緊及張開10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.5b 手部運動－左手",
            "backfillLabel": "3.5b 手部運動－左手",
            "displayLabel": "3.5b 手部運動－左手"
          },
          {
            "code": "06a",
            "name": "updrs3_06a",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者手掌向下、手臂在身體前方伸直，以最快速度將手掌完全翻向上及下，共10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.6a 前臂旋前旋後運動－右手",
            "backfillLabel": "3.6a 前臂旋前旋後運動－右手",
            "displayLabel": "3.6a 前臂旋前旋後運動－右手"
          },
          {
            "code": "06b",
            "name": "updrs3_06b",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者手掌向下、手臂在身體前方伸直，以最快速度將手掌完全翻向上及下，共10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.6b 前臂旋前旋後運動－左手",
            "backfillLabel": "3.6b 前臂旋前旋後運動－左手",
            "displayLabel": "3.6b 前臂旋前旋後運動－左手"
          },
          {
            "code": "07a",
            "name": "updrs3_07a",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙腳分別測試。請參加者舒適坐在有直背及扶手的椅子上，腳跟放在地上，以最大幅度及最快速度用腳趾拍地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.7a 腳趾拍地－右腳",
            "backfillLabel": "3.7a 腳趾拍地－右腳",
            "displayLabel": "3.7a 腳趾拍地－右腳"
          },
          {
            "code": "07b",
            "name": "updrs3_07b",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙腳分別測試。請參加者舒適坐在有直背及扶手的椅子上，腳跟放在地上，以最大幅度及最快速度用腳趾拍地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.7b 腳趾拍地－左腳",
            "backfillLabel": "3.7b 腳趾拍地－左腳",
            "displayLabel": "3.7b 腳趾拍地－左腳"
          },
          {
            "code": "08a",
            "name": "updrs3_08a",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙腳分別測試。請參加者坐在有扶手的靠背椅，雙腳舒適放在地上，以最大幅度及最快速度將腳抬高並跺地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.8a 腿部靈活性－右腿",
            "backfillLabel": "3.8a 腿部靈活性－右腿",
            "displayLabel": "3.8a 腿部靈活性－右腿"
          },
          {
            "code": "08b",
            "name": "updrs3_08b",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙腳分別測試。請參加者坐在有扶手的靠背椅，雙腳舒適放在地上，以最大幅度及最快速度將腳抬高並跺地10次。評估速度、幅度、遲疑或停頓，以及幅度是否逐漸減小。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：規律性被1至2次中斷或遲疑打斷；或動作稍慢；或幅度在10次的末段才減小。"
              },
              {
                "value": 2,
                "label": "輕微：規律性被3至5次中斷或遲疑打斷；或動作輕微變慢；或幅度在10次的中段開始減小。"
              },
              {
                "value": 3,
                "label": "中度：規律性被超過5次中斷或遲疑打斷，或至少出現1次動作凍結；或動作中度變慢；或幅度從開始便逐漸減小。"
              },
              {
                "value": 4,
                "label": "嚴重：因動作遲緩或中斷而不能或幾乎不能完成。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.8b 腿部靈活性－左腿",
            "backfillLabel": "3.8b 腿部靈活性－左腿",
            "displayLabel": "3.8b 腿部靈活性－左腿"
          },
          {
            "code": "09",
            "name": "updrs3_09",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "請參加者坐在有扶手的靠背椅，雙腳置地，雙手交叉放在胸前後站起。按正式程序逐步重試，必要時允許使用扶手或由施測者協助。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題，可快速且不遲疑地站起。"
              },
              {
                "value": 1,
                "label": "很少：動作稍慢；或需多於1次嘗試；或需坐近椅邊才站起；不需用手推扶手。"
              },
              {
                "value": 2,
                "label": "輕微：可自行用手推扶手站起。"
              },
              {
                "value": 3,
                "label": "中度：需用手推扶手站起但容易向後跌回椅上，或需多於1次嘗試；不需他人協助。"
              },
              {
                "value": 4,
                "label": "嚴重：無法在沒有他人協助下站起。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.9 從椅子站起來",
            "backfillLabel": "3.9 從椅子站起來",
            "displayLabel": "3.9 從椅子站起來"
          },
          {
            "code": "10",
            "name": "updrs3_10",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "請參加者來回步行至少10米，以同時觀察左右側。評估步幅、速度、腳離地高度、腳跟着地、轉身及手臂擺動；步態凍結另記於3.11。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：可獨立行走，但有少許步態問題。"
              },
              {
                "value": 2,
                "label": "輕微：可獨立行走，但有明顯步態問題。"
              },
              {
                "value": 3,
                "label": "中度：需要手杖或助行器等工具以安全行走，但不需旁人協助。"
              },
              {
                "value": 4,
                "label": "嚴重：完全不能行走或需要旁人協助。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.10 步態",
            "backfillLabel": "3.10 步態",
            "displayLabel": "3.10 步態"
          },
          {
            "code": "11",
            "name": "updrs3_11",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "在步態測試中觀察起步、轉彎、通過出入口及接近終點時有否停頓、碎步或分節。除非基於安全考慮，避免提供感覺提示。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有步態凍結。"
              },
              {
                "value": 1,
                "label": "很少：起步、轉彎或通過出入口時有1次停頓，其後可在平直路面順暢行走。"
              },
              {
                "value": 2,
                "label": "輕微：起步、轉彎或通過出入口時有超過1次停頓，其後可在平直路面順暢行走。"
              },
              {
                "value": 3,
                "label": "中度：在平直路面行走時出現1次步態凍結。"
              },
              {
                "value": 4,
                "label": "嚴重：在平直路面行走時出現多次步態凍結。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.11 步態凍結",
            "backfillLabel": "3.11 步態凍結",
            "displayLabel": "3.11 步態凍結"
          },
          {
            "code": "12",
            "name": "updrs3_12",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "在參加者睜眼、雙腳微張站立時，按正式拉動測試評估向後倒的身體反應。第一次為示範，不評分；第二次快速有力地拉動肩膀並確保安全。",
            "options": [
              {
                "value": 0,
                "label": "正常：後退1至2步便恢復站立平衡。"
              },
              {
                "value": 1,
                "label": "很少：需要後退3至5步，不需他人協助。"
              },
              {
                "value": 2,
                "label": "輕微：需要後退超過5步，仍不需他人協助。"
              },
              {
                "value": 3,
                "label": "中度：可安全站立但缺乏姿勢平穩反應；若施測者不扶住會跌倒。"
              },
              {
                "value": 4,
                "label": "嚴重：非常不穩，在自然狀態或輕拉肩膀時已有失去平衡傾向。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.12 姿勢穩定性",
            "backfillLabel": "3.12 姿勢穩定性",
            "displayLabel": "3.12 姿勢穩定性"
          },
          {
            "code": "13",
            "name": "updrs3_13",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "觀察參加者從椅上站起、步行及接受姿勢平穩度測試時的姿勢。若姿勢不正確，可提醒挺直並觀察能否矯正；按三個觀察點中最差表現評分。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：不太挺直，但對年長人士可算正常。"
              },
              {
                "value": 2,
                "label": "輕微：明確側彎、脊柱側彎或身體傾向一側，但提醒後可矯正。"
              },
              {
                "value": 3,
                "label": "中度：駝背、脊柱側彎或身體傾向一側，提醒後仍不能矯正。"
              },
              {
                "value": 4,
                "label": "嚴重：嚴重駝背、脊柱側彎或側傾，導致姿勢極度異常。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.13 姿勢",
            "backfillLabel": "3.13 姿勢",
            "displayLabel": "3.13 姿勢"
          },
          {
            "code": "14",
            "name": "updrs3_14",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "綜合觀察坐姿、站立、起身及其他自發動作，評估整體動作速度、遲疑、動作量及幅度。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有問題。"
              },
              {
                "value": 1,
                "label": "很少：整體動作稍慢，自發動作稍微減少。"
              },
              {
                "value": 2,
                "label": "輕微：整體動作輕微變慢，自發動作輕微減少。"
              },
              {
                "value": 3,
                "label": "中度：整體動作中度變慢，自發動作中度減少。"
              },
              {
                "value": 4,
                "label": "嚴重：整體動作嚴重變慢，自發動作嚴重減少。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.14 全身動作自發性（身體動作遲緩）",
            "backfillLabel": "3.14 全身動作自發性（身體動作遲緩）",
            "displayLabel": "3.14 全身動作自發性（身體動作遲緩）"
          },
          {
            "code": "15a",
            "name": "updrs3_15a",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者手掌向下、手臂向前伸直、手腕打直並分開手指，保持10秒。所有顫抖，包括重新出現的靜止型顫抖，均納入評分；按最大幅度評分。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：有顫抖，幅度小於1厘米。"
              },
              {
                "value": 2,
                "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
              },
              {
                "value": 3,
                "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
              },
              {
                "value": 4,
                "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.15a 手部姿勢性震顫－右手",
            "backfillLabel": "3.15a 手部姿勢性震顫－右手",
            "displayLabel": "3.15a 手部姿勢性震顫－右手"
          },
          {
            "code": "15b",
            "name": "updrs3_15b",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者手掌向下、手臂向前伸直、手腕打直並分開手指，保持10秒。所有顫抖，包括重新出現的靜止型顫抖，均納入評分；按最大幅度評分。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：有顫抖，幅度小於1厘米。"
              },
              {
                "value": 2,
                "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
              },
              {
                "value": 3,
                "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
              },
              {
                "value": 4,
                "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.15b 手部姿勢性震顫－左手",
            "backfillLabel": "3.15b 手部姿勢性震顫－左手",
            "displayLabel": "3.15b 手部姿勢性震顫－左手"
          },
          {
            "code": "16a",
            "name": "updrs3_16a",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者由手臂伸直開始，緩慢作手指至鼻尖的來回動作至少3次，按整個移動過程或接近目標時出現的最大顫抖幅度評分。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：有顫抖，幅度小於1厘米。"
              },
              {
                "value": 2,
                "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
              },
              {
                "value": 3,
                "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
              },
              {
                "value": 4,
                "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.16a 手部動作性震顫－右手",
            "backfillLabel": "3.16a 手部動作性震顫－右手",
            "displayLabel": "3.16a 手部動作性震顫－右手"
          },
          {
            "code": "16b",
            "name": "updrs3_16b",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "雙手分別測試。請參加者由手臂伸直開始，緩慢作手指至鼻尖的來回動作至少3次，按整個移動過程或接近目標時出現的最大顫抖幅度評分。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：有顫抖，幅度小於1厘米。"
              },
              {
                "value": 2,
                "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
              },
              {
                "value": 3,
                "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
              },
              {
                "value": 4,
                "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.16b 手部動作性震顫－左手",
            "backfillLabel": "3.16b 手部動作性震顫－左手",
            "displayLabel": "3.16b 手部動作性震顫－左手"
          },
          {
            "code": "17a",
            "name": "updrs3_17a",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：有顫抖，幅度小於1厘米。"
              },
              {
                "value": 2,
                "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
              },
              {
                "value": 3,
                "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
              },
              {
                "value": 4,
                "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.17a 靜止性震顫幅度－右上肢",
            "backfillLabel": "3.17a 靜止性震顫幅度－右上肢",
            "displayLabel": "3.17a 靜止性震顫幅度－右上肢"
          },
          {
            "code": "17b",
            "name": "updrs3_17b",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：有顫抖，幅度小於1厘米。"
              },
              {
                "value": 2,
                "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
              },
              {
                "value": 3,
                "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
              },
              {
                "value": 4,
                "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.17b 靜止性震顫幅度－左上肢",
            "backfillLabel": "3.17b 靜止性震顫幅度－左上肢",
            "displayLabel": "3.17b 靜止性震顫幅度－左上肢"
          },
          {
            "code": "17c",
            "name": "updrs3_17c",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：有顫抖，幅度小於1厘米。"
              },
              {
                "value": 2,
                "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
              },
              {
                "value": 3,
                "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
              },
              {
                "value": 4,
                "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.17c 靜止性震顫幅度－右下肢",
            "backfillLabel": "3.17c 靜止性震顫幅度－右下肢",
            "displayLabel": "3.17c 靜止性震顫幅度－右下肢"
          },
          {
            "code": "17d",
            "name": "updrs3_17d",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的肢體靜止型顫抖，按最大幅度評分，不考慮持續性。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：有顫抖，幅度小於1厘米。"
              },
              {
                "value": 2,
                "label": "輕微：有顫抖，幅度為1厘米至小於3厘米。"
              },
              {
                "value": 3,
                "label": "中度：有顫抖，幅度為3厘米至小於10厘米。"
              },
              {
                "value": 4,
                "label": "嚴重：有顫抖，幅度大於或等於10厘米。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.17d 靜止性震顫幅度－左下肢",
            "backfillLabel": "3.17d 靜止性震顫幅度－左下肢",
            "displayLabel": "3.17d 靜止性震顫幅度－左下肢"
          },
          {
            "code": "17e",
            "name": "updrs3_17e",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "綜合整個檢查期間及靜坐10秒時觀察到的嘴唇／下巴靜止型顫抖，按最大幅度評分，不考慮持續性。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：有顫抖，幅度小於1厘米。"
              },
              {
                "value": 2,
                "label": "輕微：有顫抖，幅度為1厘米至小於2厘米。"
              },
              {
                "value": 3,
                "label": "中度：有顫抖，幅度為2厘米至小於3厘米。"
              },
              {
                "value": 4,
                "label": "嚴重：有顫抖，幅度大於或等於3厘米。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.17e 靜止性震顫幅度－嘴唇／下巴",
            "backfillLabel": "3.17e 靜止性震顫幅度－嘴唇／下巴",
            "displayLabel": "3.17e 靜止性震顫幅度－嘴唇／下巴"
          },
          {
            "code": "18",
            "name": "updrs3_18",
            "scoreRange": "0-4",
            "wordingStatus": "use_research_approved_anchor_text_only",
            "instruction": "綜合整個動作評估期間出現的靜止型顫抖，按顫抖佔全部檢查時間的比例評分。",
            "options": [
              {
                "value": 0,
                "label": "正常：沒有顫抖。"
              },
              {
                "value": 1,
                "label": "很少：顫抖出現時間佔全部檢查時間25%或以下。"
              },
              {
                "value": 2,
                "label": "輕微：顫抖出現時間佔26%至50%。"
              },
              {
                "value": 3,
                "label": "中度：顫抖出現時間佔51%至75%。"
              },
              {
                "value": 4,
                "label": "嚴重：顫抖出現時間佔75%以上。"
              }
            ],
            "anchorStatus": "research_team_supplied_item_specific",
            "fullLabel": "3.18 靜止性震顫持續性",
            "backfillLabel": "3.18 靜止性震顫持續性",
            "displayLabel": "3.18 靜止性震顫持續性"
          }
        ],
        "dyskinesiaFields": [
          {
            "name": "updrs3_dyskinesia_present",
            "fullLabel": "檢查期間是否出現異動症（舞蹈症或肌張力不全）？",
            "options": [
              {
                "value": 0,
                "label": "否"
              },
              {
                "value": 1,
                "label": "是"
              }
            ]
          },
          {
            "name": "updrs3_dyskinesia_interference",
            "fullLabel": "如有異動症，是否干擾運動功能檢查？",
            "options": [
              {
                "value": 0,
                "label": "否"
              },
              {
                "value": 1,
                "label": "是"
              }
            ]
          }
        ],
        "totalRule": "Only calculate the 0-132 total when all 33 item scores are present.",
        "formalAnchorWarning": null,
        "anchorStatus": "research_team_supplied_item_specific_for_all_33_items"
      }
    },
    "updrs15": {
      "fields": [
        "updrs15_route",
        "updrs_item_1_5",
        "updrs_item_1_5_source",
        "updrs_item_1_5_assessment_date",
        "updrs_item_1_5_status"
      ],
      "text": {
        "code": "UPDRS-1.5",
        "title": "UPDRS Item 1.5 冷漠感",
        "instruction": "請考慮自發性活動、自信、動機和積極性，以及對日常生活及社交活動的影響；須區分冷漠與憂鬱等類似症狀。請按過去一週的情況評分。",
        "name": "updrs_item_1_5",
        "options": [
          {
            "value": 0,
            "label": "正常：沒有冷漠感。"
          },
          {
            "value": 1,
            "label": "很少：參加者或照顧者察覺到冷漠感，但不會干擾日常生活和社交。"
          },
          {
            "value": 2,
            "label": "輕微：冷漠感會干擾獨處和社交。"
          },
          {
            "value": 3,
            "label": "中度：冷漠感會干擾大部分活動和社交。"
          },
          {
            "value": 4,
            "label": "嚴重：被動且孤僻，完全失去積極性。"
          }
        ],
        "assessorInstruction": "請考慮自發性活動、自信、動機和積極性，並評量表現程度降低對日常生活及社交活動的影響。須區分冷漠與其他類似症狀，例如抑鬱症。",
        "participantInstruction": "在過去一週內，您是否對進行活動或與人相處不感興趣？如回答「是」，請向參加者或照顧者了解更詳盡資料。",
        "wordingStatus": "research_team_supplied_full_text"
      }
    },
    "hy": {
      "fields": [
        "hy_route",
        "hy_stage",
        "hy_source",
        "hy_assessment_date",
        "hy_status"
      ],
      "text": {
        "code": "HY",
        "title": "Hoehn & Yahr 分期",
        "name": "hy_stage",
        "allowedRange": "0-5 integer stages",
        "formalStageAnchorStatus": "research_team_supplied_full_text",
        "options": [
          {
            "value": 0,
            "label": "第0期：沒有症狀。"
          },
          {
            "value": 1,
            "label": "第1期：單側症狀。"
          },
          {
            "value": 2,
            "label": "第2期：雙側症狀，姿勢平穩度正常。"
          },
          {
            "value": 3,
            "label": "第3期：輕微至中度雙側症狀，姿勢稍微不平衡，不需他人協助。"
          },
          {
            "value": 4,
            "label": "第4期：嚴重失能，但走路和站立仍不需協助。"
          },
          {
            "value": 5,
            "label": "第5期：如沒有人協助，完全依靠輪椅或終日臥床。"
          }
        ]
      }
    }
  },
  "scoring": {
    "hads": {
      "displayOrders": [
        "3210",
        "0123",
        "3210",
        "0123",
        "3210",
        "3210",
        "0123",
        "3210",
        "0123",
        "3210",
        "3210",
        "0123",
        "3210",
        "0123"
      ],
      "anxietyItems": [
        1,
        3,
        5,
        7,
        9,
        11,
        13
      ],
      "depressionItems": [
        2,
        4,
        6,
        8,
        10,
        12,
        14
      ],
      "review": {
        "anxiety": ">6",
        "depression": ">9"
      },
      "groupingEffect": "none",
      "anxietyReview": {
        "operator": ">",
        "value": 6
      },
      "depressionReview": {
        "operator": ">",
        "value": 9
      }
    },
    "sas": {
      "displayOrderByItem": {
        "1": [
          3,
          2,
          1,
          0
        ],
        "2": [
          3,
          2,
          1,
          0
        ],
        "3": [
          3,
          2,
          1,
          0
        ],
        "4": [
          3,
          2,
          1,
          0
        ],
        "5": [
          3,
          2,
          1,
          0
        ],
        "6": [
          3,
          2,
          1,
          0
        ],
        "7": [
          3,
          2,
          1,
          0
        ],
        "8": [
          3,
          2,
          1,
          0
        ],
        "9": [
          0,
          1,
          2,
          3
        ],
        "10": [
          0,
          1,
          2,
          3
        ],
        "11": [
          0,
          1,
          2,
          3
        ],
        "12": [
          0,
          1,
          2,
          3
        ],
        "13": [
          0,
          1,
          2,
          3
        ],
        "14": [
          0,
          1,
          2,
          3
        ]
      },
      "totalFields": [
        "sas01_score",
        "sas02_score",
        "sas03_score",
        "sas04_score",
        "sas05_score",
        "sas06_score",
        "sas07_score",
        "sas08_score",
        "sas09_score",
        "sas10_score",
        "sas11_score",
        "sas12_score",
        "sas13_score",
        "sas14_score"
      ],
      "outputFields": [
        "sas_total",
        "sas_complete",
        "sas_apathy_flag"
      ],
      "cutoff": {
        "operator": ">=",
        "value": 14
      },
      "applicability": "PD grouping support when no QUIP-RS exclusion; HC is never assigned to PD Apathy."
    },
    "quip": {
      "domains": {
        "A": 5,
        "B": 5,
        "C": 5,
        "D": 5,
        "E": 3,
        "F": 4
      },
      "effect": "review_only",
      "forbiddenFields": [
        "quip_e3_detail",
        "quip_e4_yes",
        "quip_e5_yes",
        "quip_f5_yes"
      ]
    },
    "quiprs": {
      "cutoffs": {
        "A": 6,
        "B": 8,
        "C": 8,
        "D": 7,
        "E": 7,
        "AD": 10
      },
      "fHasExclusionCutoff": false,
      "pdExclusionEffect": "Any cutoff reached => Excluded; Group=999; add ICD review."
    },
    "rbdsq": {
      "cutoffs": {
        "PD": 6,
        "HC": 5
      },
      "effect": "sleep_review_only"
    },
    "gas": {
      "domains": {
        "cognitiveSocial": "1-8",
        "emotionReaction": "9-12",
        "autonomy": "13-16"
      },
      "cutoff": {
        "PD": 16,
        "HC": null
      },
      "effect": "PD apathy grouping support when no ICD exclusion",
      "pdCutoff": {
        "operator": ">=",
        "value": 16
      },
      "hcCutoff": null
    },
    "ami18": {
      "social": [
        2,
        3,
        4,
        8,
        14,
        17
      ],
      "emotional": [
        1,
        6,
        7,
        13,
        16,
        18
      ],
      "behavioural": [
        5,
        9,
        10,
        11,
        12,
        15
      ],
      "outputs": [
        "three_domain_means",
        "overall_18_item_mean",
        "complete"
      ],
      "cutoff": null
    },
    "cdars": {
      "domainCounts": {
        "pastimes": 4,
        "foodDrink": 4,
        "social": 4,
        "sensory": 5
      },
      "outputs": [
        "four_domain_totals",
        "overall_17_item_total",
        "complete"
      ],
      "cutoff": null
    },
    "rgpts": {
      "referenceItems": "1-8",
      "persecutoryItems": "9-18",
      "totalItems": "1-18",
      "review": "persecutory_total>=18",
      "groupingEffect": "none"
    },
    "pdi": {
      "noResponseRule": "No => distress/preoccupation/conviction hidden and scored 0",
      "yesResponseRule": "Yes => all three dimensions required, each 1-5",
      "outputs": [
        "yes_total",
        "distress_total",
        "preoccupation_total",
        "conviction_total",
        "total_severity",
        "pdi_total",
        "complete"
      ]
    },
    "ior": {
      "scenarios": 15,
      "dimensions": [
        "frequency",
        "conviction",
        "distress"
      ],
      "itemRange": "1-5",
      "outputs": [
        "three_domain_totals",
        "overall_total",
        "three_ge3_counts",
        "complete"
      ]
    }
  },
  "reviewCategories": {
    "clinical": {
      "mood": [
        "HADS-A>=6",
        "HADS-D>=9"
      ],
      "apathy": [
        "SAS>=14",
        "PD GAS>=16"
      ],
      "icd": [
        "QUIP positive => review",
        "QUIP-RS cutoff => formal exclusion"
      ],
      "sleep": [
        "PD RBDSQ>=6",
        "HC RBDSQ>=5"
      ],
      "psychosis": [
        "R-GPTS persecutory>=18"
      ],
      "cognition": [
        "MoCA<=16th",
        "MoCA indeterminate",
        "MoCA repeat required after >2 months"
      ]
    },
    "operational": [
      "MRI safety risk or unknown",
      "MRI scan-day change",
      "Sequence incomplete",
      "Multiple submissions",
      "Uncertain screening/MRI linkage",
      "UPDRS discrepancy",
      "Multiple valid non-repeat scale results",
      "Long-pending clinical data"
    ],
    "countingRule": "Count by category, not by each repeated text line."
  },
  "grouping": {
    "order": [
      "Establish PD or HC identity.",
      "PD with any QUIP-RS exclusion cutoff => Excluded; Group=ICD.",
      "Non-excluded PD with SAS>=14 or GAS>=16 => Apathy.",
      "Non-excluded PD with complete SAS/GAS and both below cutoff => Pure PD.",
      "Insufficient SAS/GAS => Pending; never assign Pure PD early.",
      "HC => Group=HC; no GAS cutoff; no UPDRS; RBDSQ cutoff=5."
    ]
  },
  "backendAuthority": {
    "authority": "current_backend_contract_and_research_team_scoring_rules",
    "legacyFrontendPolicy": "Old frontend parameters are not required unless the current backend or current workflow requires them."
  },
  "ior": {
    "code": "IOR",
    "title": "IOR",
    "instructions": [
      "請只根據每個情境回答三個程度題。"
    ],
    "scenarios": [
      "我需要防着點別人。",
      "周圍的人對我可能有些負面的評價。",
      "人們會故意做些事，存心讓我生氣。",
      "有些人總是盯着我看。",
      "我不能信任陌生人。",
      "別人會私底下偷偷地交流關於我的事。",
      "陌生人和朋友總是批判地看待我。",
      "人們對我可能有敵意。",
      "人們背地裏說我壞話。",
      "我認識的某個人對我好的原因，是想利用我。",
      "如果有利益衝突，人們會犧牲我的利益來維護自己。",
      "人們在暗地裏嘲笑我。",
      "我希望得到別人的幫助，別人卻會和我談條件。",
      "我可以察覺出別人話裏影射我的資訊。",
      "我的行為和想法可能被別人控制。"
    ],
    "dimensions": [
      {
        "key": "frequency",
        "fullLabel": "這種想法多久出現一次？",
        "backfillLabel": "頻率"
      },
      {
        "key": "conviction",
        "fullLabel": "您有多相信這種想法？",
        "backfillLabel": "相信程度"
      },
      {
        "key": "distress",
        "fullLabel": "這種想法令您有多不安？",
        "backfillLabel": "不安程度"
      }
    ],
    "items": [
      {
        "scenario": 1,
        "dimension": "frequency",
        "name": "ior01_frequency",
        "scenarioText": "我需要防着點別人。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 1：我需要防着點別人。｜這種想法多久出現一次？",
        "backfillLabel": "01 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 1,
        "dimension": "conviction",
        "name": "ior01_conviction",
        "scenarioText": "我需要防着點別人。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 1：我需要防着點別人。｜您有多相信這種想法？",
        "backfillLabel": "01 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 1,
        "dimension": "distress",
        "name": "ior01_distress",
        "scenarioText": "我需要防着點別人。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 1：我需要防着點別人。｜這種想法令您有多不安？",
        "backfillLabel": "01 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 2,
        "dimension": "frequency",
        "name": "ior02_frequency",
        "scenarioText": "周圍的人對我可能有些負面的評價。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 2：周圍的人對我可能有些負面的評價。｜這種想法多久出現一次？",
        "backfillLabel": "02 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 2,
        "dimension": "conviction",
        "name": "ior02_conviction",
        "scenarioText": "周圍的人對我可能有些負面的評價。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 2：周圍的人對我可能有些負面的評價。｜您有多相信這種想法？",
        "backfillLabel": "02 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 2,
        "dimension": "distress",
        "name": "ior02_distress",
        "scenarioText": "周圍的人對我可能有些負面的評價。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 2：周圍的人對我可能有些負面的評價。｜這種想法令您有多不安？",
        "backfillLabel": "02 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 3,
        "dimension": "frequency",
        "name": "ior03_frequency",
        "scenarioText": "人們會故意做些事，存心讓我生氣。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 3：人們會故意做些事，存心讓我生氣。｜這種想法多久出現一次？",
        "backfillLabel": "03 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 3,
        "dimension": "conviction",
        "name": "ior03_conviction",
        "scenarioText": "人們會故意做些事，存心讓我生氣。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 3：人們會故意做些事，存心讓我生氣。｜您有多相信這種想法？",
        "backfillLabel": "03 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 3,
        "dimension": "distress",
        "name": "ior03_distress",
        "scenarioText": "人們會故意做些事，存心讓我生氣。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 3：人們會故意做些事，存心讓我生氣。｜這種想法令您有多不安？",
        "backfillLabel": "03 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 4,
        "dimension": "frequency",
        "name": "ior04_frequency",
        "scenarioText": "有些人總是盯着我看。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 4：有些人總是盯着我看。｜這種想法多久出現一次？",
        "backfillLabel": "04 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 4,
        "dimension": "conviction",
        "name": "ior04_conviction",
        "scenarioText": "有些人總是盯着我看。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 4：有些人總是盯着我看。｜您有多相信這種想法？",
        "backfillLabel": "04 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 4,
        "dimension": "distress",
        "name": "ior04_distress",
        "scenarioText": "有些人總是盯着我看。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 4：有些人總是盯着我看。｜這種想法令您有多不安？",
        "backfillLabel": "04 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 5,
        "dimension": "frequency",
        "name": "ior05_frequency",
        "scenarioText": "我不能信任陌生人。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 5：我不能信任陌生人。｜這種想法多久出現一次？",
        "backfillLabel": "05 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 5,
        "dimension": "conviction",
        "name": "ior05_conviction",
        "scenarioText": "我不能信任陌生人。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 5：我不能信任陌生人。｜您有多相信這種想法？",
        "backfillLabel": "05 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 5,
        "dimension": "distress",
        "name": "ior05_distress",
        "scenarioText": "我不能信任陌生人。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 5：我不能信任陌生人。｜這種想法令您有多不安？",
        "backfillLabel": "05 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 6,
        "dimension": "frequency",
        "name": "ior06_frequency",
        "scenarioText": "別人會私底下偷偷地交流關於我的事。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 6：別人會私底下偷偷地交流關於我的事。｜這種想法多久出現一次？",
        "backfillLabel": "06 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 6,
        "dimension": "conviction",
        "name": "ior06_conviction",
        "scenarioText": "別人會私底下偷偷地交流關於我的事。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 6：別人會私底下偷偷地交流關於我的事。｜您有多相信這種想法？",
        "backfillLabel": "06 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 6,
        "dimension": "distress",
        "name": "ior06_distress",
        "scenarioText": "別人會私底下偷偷地交流關於我的事。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 6：別人會私底下偷偷地交流關於我的事。｜這種想法令您有多不安？",
        "backfillLabel": "06 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 7,
        "dimension": "frequency",
        "name": "ior07_frequency",
        "scenarioText": "陌生人和朋友總是批判地看待我。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 7：陌生人和朋友總是批判地看待我。｜這種想法多久出現一次？",
        "backfillLabel": "07 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 7,
        "dimension": "conviction",
        "name": "ior07_conviction",
        "scenarioText": "陌生人和朋友總是批判地看待我。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 7：陌生人和朋友總是批判地看待我。｜您有多相信這種想法？",
        "backfillLabel": "07 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 7,
        "dimension": "distress",
        "name": "ior07_distress",
        "scenarioText": "陌生人和朋友總是批判地看待我。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 7：陌生人和朋友總是批判地看待我。｜這種想法令您有多不安？",
        "backfillLabel": "07 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 8,
        "dimension": "frequency",
        "name": "ior08_frequency",
        "scenarioText": "人們對我可能有敵意。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 8：人們對我可能有敵意。｜這種想法多久出現一次？",
        "backfillLabel": "08 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 8,
        "dimension": "conviction",
        "name": "ior08_conviction",
        "scenarioText": "人們對我可能有敵意。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 8：人們對我可能有敵意。｜您有多相信這種想法？",
        "backfillLabel": "08 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 8,
        "dimension": "distress",
        "name": "ior08_distress",
        "scenarioText": "人們對我可能有敵意。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 8：人們對我可能有敵意。｜這種想法令您有多不安？",
        "backfillLabel": "08 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 9,
        "dimension": "frequency",
        "name": "ior09_frequency",
        "scenarioText": "人們背地裏說我壞話。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 9：人們背地裏說我壞話。｜這種想法多久出現一次？",
        "backfillLabel": "09 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 9,
        "dimension": "conviction",
        "name": "ior09_conviction",
        "scenarioText": "人們背地裏說我壞話。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 9：人們背地裏說我壞話。｜您有多相信這種想法？",
        "backfillLabel": "09 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 9,
        "dimension": "distress",
        "name": "ior09_distress",
        "scenarioText": "人們背地裏說我壞話。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 9：人們背地裏說我壞話。｜這種想法令您有多不安？",
        "backfillLabel": "09 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 10,
        "dimension": "frequency",
        "name": "ior10_frequency",
        "scenarioText": "我認識的某個人對我好的原因，是想利用我。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 10：我認識的某個人對我好的原因，是想利用我。｜這種想法多久出現一次？",
        "backfillLabel": "10 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 10,
        "dimension": "conviction",
        "name": "ior10_conviction",
        "scenarioText": "我認識的某個人對我好的原因，是想利用我。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 10：我認識的某個人對我好的原因，是想利用我。｜您有多相信這種想法？",
        "backfillLabel": "10 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 10,
        "dimension": "distress",
        "name": "ior10_distress",
        "scenarioText": "我認識的某個人對我好的原因，是想利用我。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 10：我認識的某個人對我好的原因，是想利用我。｜這種想法令您有多不安？",
        "backfillLabel": "10 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 11,
        "dimension": "frequency",
        "name": "ior11_frequency",
        "scenarioText": "如果有利益衝突，人們會犧牲我的利益來維護自己。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 11：如果有利益衝突，人們會犧牲我的利益來維護自己。｜這種想法多久出現一次？",
        "backfillLabel": "11 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 11,
        "dimension": "conviction",
        "name": "ior11_conviction",
        "scenarioText": "如果有利益衝突，人們會犧牲我的利益來維護自己。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 11：如果有利益衝突，人們會犧牲我的利益來維護自己。｜您有多相信這種想法？",
        "backfillLabel": "11 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 11,
        "dimension": "distress",
        "name": "ior11_distress",
        "scenarioText": "如果有利益衝突，人們會犧牲我的利益來維護自己。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 11：如果有利益衝突，人們會犧牲我的利益來維護自己。｜這種想法令您有多不安？",
        "backfillLabel": "11 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 12,
        "dimension": "frequency",
        "name": "ior12_frequency",
        "scenarioText": "人們在暗地裏嘲笑我。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 12：人們在暗地裏嘲笑我。｜這種想法多久出現一次？",
        "backfillLabel": "12 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 12,
        "dimension": "conviction",
        "name": "ior12_conviction",
        "scenarioText": "人們在暗地裏嘲笑我。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 12：人們在暗地裏嘲笑我。｜您有多相信這種想法？",
        "backfillLabel": "12 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 12,
        "dimension": "distress",
        "name": "ior12_distress",
        "scenarioText": "人們在暗地裏嘲笑我。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 12：人們在暗地裏嘲笑我。｜這種想法令您有多不安？",
        "backfillLabel": "12 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 13,
        "dimension": "frequency",
        "name": "ior13_frequency",
        "scenarioText": "我希望得到別人的幫助，別人卻會和我談條件。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 13：我希望得到別人的幫助，別人卻會和我談條件。｜這種想法多久出現一次？",
        "backfillLabel": "13 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 13,
        "dimension": "conviction",
        "name": "ior13_conviction",
        "scenarioText": "我希望得到別人的幫助，別人卻會和我談條件。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 13：我希望得到別人的幫助，別人卻會和我談條件。｜您有多相信這種想法？",
        "backfillLabel": "13 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 13,
        "dimension": "distress",
        "name": "ior13_distress",
        "scenarioText": "我希望得到別人的幫助，別人卻會和我談條件。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 13：我希望得到別人的幫助，別人卻會和我談條件。｜這種想法令您有多不安？",
        "backfillLabel": "13 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 14,
        "dimension": "frequency",
        "name": "ior14_frequency",
        "scenarioText": "我可以察覺出別人話裏影射我的資訊。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 14：我可以察覺出別人話裏影射我的資訊。｜這種想法多久出現一次？",
        "backfillLabel": "14 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 14,
        "dimension": "conviction",
        "name": "ior14_conviction",
        "scenarioText": "我可以察覺出別人話裏影射我的資訊。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 14：我可以察覺出別人話裏影射我的資訊。｜您有多相信這種想法？",
        "backfillLabel": "14 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 14,
        "dimension": "distress",
        "name": "ior14_distress",
        "scenarioText": "我可以察覺出別人話裏影射我的資訊。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 14：我可以察覺出別人話裏影射我的資訊。｜這種想法令您有多不安？",
        "backfillLabel": "14 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 15,
        "dimension": "frequency",
        "name": "ior15_frequency",
        "scenarioText": "我的行為和想法可能被別人控制。",
        "fullLabel": "這種想法多久出現一次？",
        "combinedFormalLabel": "情境 15：我的行為和想法可能被別人控制。｜這種想法多久出現一次？",
        "backfillLabel": "15 頻率",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 15,
        "dimension": "conviction",
        "name": "ior15_conviction",
        "scenarioText": "我的行為和想法可能被別人控制。",
        "fullLabel": "您有多相信這種想法？",
        "combinedFormalLabel": "情境 15：我的行為和想法可能被別人控制。｜您有多相信這種想法？",
        "backfillLabel": "15 相信程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      },
      {
        "scenario": 15,
        "dimension": "distress",
        "name": "ior15_distress",
        "scenarioText": "我的行為和想法可能被別人控制。",
        "fullLabel": "這種想法令您有多不安？",
        "combinedFormalLabel": "情境 15：我的行為和想法可能被別人控制。｜這種想法令您有多不安？",
        "backfillLabel": "15 不安程度",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          },
          {
            "value": 3,
            "label": "3"
          },
          {
            "value": 4,
            "label": "4"
          },
          {
            "value": 5,
            "label": "5"
          }
        ],
        "scoreRange": "1-5"
      }
    ],
    "layout": {
      "formal": "scenario_cards_with_three_dimension_grid",
      "backfill": "compact_15_by_3_matrix"
    },
    "scoringReference": "APATHY_QUESTION_BANK.scoring.ior"
  },
  "ami18": {
    "code": "AMI-18",
    "title": "淡漠動機指數量表（AMI）",
    "instructions": [
      "以下是一系列陳述句，請思考過去兩週內的生活並作答。",
      "請選擇最能描述過去兩週生活的選項。完全符合時選擇「完全正確」；完全不符合時選擇「完全不正確」；其餘選擇介於兩者之間的選項。"
    ],
    "options": [
      {
        "value": 0,
        "label": "完全正確"
      },
      {
        "value": 1,
        "label": "比較正確"
      },
      {
        "value": 2,
        "label": "不確定"
      },
      {
        "value": 3,
        "label": "比較不正確"
      },
      {
        "value": 4,
        "label": "完全不正確"
      }
    ],
    "items": [
      {
        "item": 1,
        "name": "ami01_score",
        "fullLabel": "當我聽到壞消息時，我感到難過或失落。",
        "backfillLabel": "01 當我聽到壞消息時，我感到難過或失落。",
        "domain": "emotional",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 2,
        "name": "ami02_score",
        "fullLabel": "我會主動和陌生人聊天。",
        "backfillLabel": "02 我會主動和陌生人聊天。",
        "domain": "social",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 3,
        "name": "ami03_score",
        "fullLabel": "我享受和剛認識的人一起做事。",
        "backfillLabel": "03 我享受和剛認識的人一起做事。",
        "domain": "social",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 4,
        "name": "ami04_score",
        "fullLabel": "我會和朋友提議一起出去玩。",
        "backfillLabel": "04 我會和朋友提議一起出去玩。",
        "domain": "social",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 5,
        "name": "ami05_score",
        "fullLabel": "我做決定時很堅定，從不猶豫。",
        "backfillLabel": "05 我做決定時很堅定，從不猶豫。",
        "domain": "behavioural",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 6,
        "name": "ami06_score",
        "fullLabel": "當我作出決定後，我會想自己是否作了錯誤的選擇。",
        "backfillLabel": "06 當我作出決定後，我會想自己是否作了錯誤的選擇。",
        "domain": "emotional",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 7,
        "name": "ami07_score",
        "fullLabel": "根據過去兩週的情況，我很在乎和我親近的人如何看待我。",
        "backfillLabel": "07 根據過去兩週的情況，我很在乎和我親近的人如何看待我。",
        "domain": "emotional",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 8,
        "name": "ami08_score",
        "fullLabel": "我每週都會和朋友一起外出。",
        "backfillLabel": "08 我每週都會和朋友一起外出。",
        "domain": "social",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 9,
        "name": "ami09_score",
        "fullLabel": "當我決定做某事時，我能夠輕易地付出努力。",
        "backfillLabel": "09 當我決定做某事時，我能夠輕易地付出努力。",
        "domain": "behavioural",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 10,
        "name": "ami10_score",
        "fullLabel": "我不喜歡無所事事。",
        "backfillLabel": "10 我不喜歡無所事事。",
        "domain": "behavioural",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 11,
        "name": "ami11_score",
        "fullLabel": "我會按時完成該做的事，無需他人提醒。",
        "backfillLabel": "11 我會按時完成該做的事，無需他人提醒。",
        "domain": "behavioural",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 12,
        "name": "ami12_score",
        "fullLabel": "當我決定做某事時，我有動力堅持到底。",
        "backfillLabel": "12 當我決定做某事時，我有動力堅持到底。",
        "domain": "behavioural",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 13,
        "name": "ami13_score",
        "fullLabel": "如果我說了一些傷人的話，我會感到很糟糕。",
        "backfillLabel": "13 如果我說了一些傷人的話，我會感到很糟糕。",
        "domain": "emotional",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 14,
        "name": "ami14_score",
        "fullLabel": "我不需要引導也可以進行交流。",
        "backfillLabel": "14 我不需要引導也可以進行交流。",
        "domain": "social",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 15,
        "name": "ami15_score",
        "fullLabel": "當我有事要做時，我會立刻去做並將事情完成。",
        "backfillLabel": "15 當我有事要做時，我會立刻去做並將事情完成。",
        "domain": "behavioural",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 16,
        "name": "ami16_score",
        "fullLabel": "當我聽到熟人發生意外或生病時，我會感到難過。",
        "backfillLabel": "16 當我聽到熟人發生意外或生病時，我會感到難過。",
        "domain": "emotional",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 17,
        "name": "ami17_score",
        "fullLabel": "我喜歡在許多活動中選擇要做的活動。",
        "backfillLabel": "17 我喜歡在許多活動中選擇要做的活動。",
        "domain": "social",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      },
      {
        "item": 18,
        "name": "ami18_score",
        "fullLabel": "如果我意識到自己令某人不愉快，我會感到非常內疚。",
        "backfillLabel": "18 如果我意識到自己令某人不愉快，我會感到非常內疚。",
        "domain": "emotional",
        "options": [
          {
            "value": 0,
            "label": "完全正確"
          },
          {
            "value": 1,
            "label": "比較正確"
          },
          {
            "value": 2,
            "label": "不確定"
          },
          {
            "value": 3,
            "label": "比較不正確"
          },
          {
            "value": 4,
            "label": "完全不正確"
          }
        ],
        "scoreRange": "0-4",
        "scoringAuthority": "Use canonical AMI-18 backend rules from the existing question bank; do not infer scoring from this legacy text source."
      }
    ],
    "layout": {
      "formal": "full_item_rows_shared_anchors",
      "backfill": "compact_0_4_matrix"
    },
    "scoringReference": "APATHY_QUESTION_BANK.scoring.ami18"
  },
  "rgpts": {
    "code": "R-GPTS",
    "title": "R-GPTS 妄想思維量表",
    "instructions": [
      "請回顧過去一個月；不要根據受藥物影響時的經歷作答。"
    ],
    "options": [
      {
        "value": 0,
        "label": "0 完全沒有"
      },
      {
        "value": 1,
        "label": "1"
      },
      {
        "value": 2,
        "label": "2 有一些"
      },
      {
        "value": 3,
        "label": "3"
      },
      {
        "value": 4,
        "label": "4 完全地"
      }
    ],
    "items": [
      {
        "item": 1,
        "name": "rgpts01_score",
        "fullLabel": "我曾花時間去想朋友們說我閒話。",
        "backfillLabel": "01 我曾花時間去想朋友們說我閒話。",
        "domain": "reference",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 2,
        "name": "rgpts02_score",
        "fullLabel": "我經常聽到人們提起我。",
        "backfillLabel": "02 我經常聽到人們提起我。",
        "domain": "reference",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 3,
        "name": "rgpts03_score",
        "fullLabel": "我因朋友和同事們嚴苛地評價我而感到不安。",
        "backfillLabel": "03 我因朋友和同事們嚴苛地評價我而感到不安。",
        "domain": "reference",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 4,
        "name": "rgpts04_score",
        "fullLabel": "人們一定曾在背後嘲笑我。",
        "backfillLabel": "04 人們一定曾在背後嘲笑我。",
        "domain": "reference",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 5,
        "name": "rgpts05_score",
        "fullLabel": "我想過很多關於人們避開我的事。",
        "backfillLabel": "05 我想過很多關於人們避開我的事。",
        "domain": "reference",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 6,
        "name": "rgpts06_score",
        "fullLabel": "人們一直在給我暗示。",
        "backfillLabel": "06 人們一直在給我暗示。",
        "domain": "reference",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 7,
        "name": "rgpts07_score",
        "fullLabel": "我曾認為有些人不是他們表面看上去那樣。",
        "backfillLabel": "07 我曾認為有些人不是他們表面看上去那樣。",
        "domain": "reference",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 8,
        "name": "rgpts08_score",
        "fullLabel": "人們在背後議論我令我不快。",
        "backfillLabel": "08 人們在背後議論我令我不快。",
        "domain": "reference",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 9,
        "name": "rgpts09_score",
        "fullLabel": "某些人故意傷害我。",
        "backfillLabel": "09 某些人故意傷害我。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 10,
        "name": "rgpts10_score",
        "fullLabel": "曾有人想讓我感到害怕，因此盯着我。",
        "backfillLabel": "10 曾有人想讓我感到害怕，因此盯着我。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 11,
        "name": "rgpts11_score",
        "fullLabel": "我確定有人為了惹惱我而做過一些事。",
        "backfillLabel": "11 我確定有人為了惹惱我而做過一些事。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 12,
        "name": "rgpts12_score",
        "fullLabel": "我確信曾有陰謀針對我。",
        "backfillLabel": "12 我確信曾有陰謀針對我。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 13,
        "name": "rgpts13_score",
        "fullLabel": "我曾確信有人想傷害我。",
        "backfillLabel": "13 我曾確信有人想傷害我。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 14,
        "name": "rgpts14_score",
        "fullLabel": "我無法停止「有人想令我感到困惑」這個想法。",
        "backfillLabel": "14 我無法停止「有人想令我感到困惑」這個想法。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 15,
        "name": "rgpts15_score",
        "fullLabel": "我曾因被迫害而感到苦惱。",
        "backfillLabel": "15 我曾因被迫害而感到苦惱。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 16,
        "name": "rgpts16_score",
        "fullLabel": "我很難停止「有人想令我感覺糟糕」這個想法。",
        "backfillLabel": "16 我很難停止「有人想令我感覺糟糕」這個想法。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 17,
        "name": "rgpts17_score",
        "fullLabel": "人們故意與我敵對。",
        "backfillLabel": "17 人們故意與我敵對。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      },
      {
        "item": 18,
        "name": "rgpts18_score",
        "fullLabel": "我曾因有人想傷害我而生氣。",
        "backfillLabel": "18 我曾因有人想傷害我而生氣。",
        "domain": "persecutory",
        "options": [
          {
            "value": 0,
            "label": "0 完全沒有"
          },
          {
            "value": 1,
            "label": "1 有少許"
          },
          {
            "value": 2,
            "label": "2 有一些"
          },
          {
            "value": 3,
            "label": "3 很多"
          },
          {
            "value": 4,
            "label": "4 完全地"
          }
        ],
        "scoreRange": "0-4"
      }
    ],
    "layout": {
      "formal": "full_item_rows_shared_anchors",
      "backfill": "compact_0_4_matrix"
    },
    "scoringReference": "APATHY_QUESTION_BANK.scoring.rgpts",
    "responseOptions": [
      {
        "value": 0,
        "label": "0 完全沒有"
      },
      {
        "value": 1,
        "label": "1 有少許"
      },
      {
        "value": 2,
        "label": "2 有一些"
      },
      {
        "value": 3,
        "label": "3 很多"
      },
      {
        "value": 4,
        "label": "4 完全地"
      }
    ]
  },
  "pdi21": {
    "code": "PDI-21-C",
    "title": "PDI-21-C",
    "instructions": [
      "請先回答每個情況是否曾經出現。",
      "如選「否」，三個程度題不顯示並按既定後端規則計為0；如選「是」，請完成困擾、持續想到及相信程度三題。"
    ],
    "items": [
      {
        "item": 1,
        "fullLabel": "好像別人說的話對您有暗示或總有別的意思？",
        "backfillLabel": "01 好像別人說的話對您有暗示或總有別的意思？",
        "yesField": "pdi01_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi01_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi01_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi01_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 2,
        "fullLabel": "報紙、雜誌或電視的報道好像與您有關？",
        "backfillLabel": "02 報紙、雜誌或電視的報道好像與您有關？",
        "yesField": "pdi02_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi02_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi02_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi02_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 3,
        "fullLabel": "有些人好像表裏不一？",
        "backfillLabel": "03 有些人好像表裏不一？",
        "yesField": "pdi03_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi03_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi03_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi03_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 4,
        "fullLabel": "有人想迫害您？",
        "backfillLabel": "04 有人想迫害您？",
        "yesField": "pdi04_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi04_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi04_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi04_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 5,
        "fullLabel": "有人陰謀陷害您？",
        "backfillLabel": "05 有人陰謀陷害您？",
        "yesField": "pdi05_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi05_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi05_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi05_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 6,
        "fullLabel": "好像命中註定您是一個十分重要的人？",
        "backfillLabel": "06 好像命中註定您是一個十分重要的人？",
        "yesField": "pdi06_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi06_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi06_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi06_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 7,
        "fullLabel": "您是一個不平凡的人嗎？",
        "backfillLabel": "07 您是一個不平凡的人嗎？",
        "yesField": "pdi07_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi07_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi07_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi07_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 8,
        "fullLabel": "您是否和神靈／上帝非常親近？",
        "backfillLabel": "08 您是否和神靈／上帝非常親近？",
        "yesField": "pdi08_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi08_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi08_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi08_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 9,
        "fullLabel": "您覺得人可以用心靈感應來溝通嗎？",
        "backfillLabel": "09 您覺得人可以用心靈感應來溝通嗎？",
        "yesField": "pdi09_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi09_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi09_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi09_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 10,
        "fullLabel": "電器，例如電腦，可以影響您的思維嗎？",
        "backfillLabel": "10 電器，例如電腦，可以影響您的思維嗎？",
        "yesField": "pdi10_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi10_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi10_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi10_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 11,
        "fullLabel": "您可能傷害上天的信使或天使嗎？",
        "backfillLabel": "11 您可能傷害上天的信使或天使嗎？",
        "yesField": "pdi11_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi11_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi11_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi11_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 12,
        "fullLabel": "您是否信奉巫術／占卜術？",
        "backfillLabel": "12 您是否信奉巫術／占卜術？",
        "yesField": "pdi12_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi12_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi12_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi12_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 13,
        "fullLabel": "您是否時常擔心伴侶不忠？",
        "backfillLabel": "13 您是否時常擔心伴侶不忠？",
        "yesField": "pdi13_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi13_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi13_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi13_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 14,
        "fullLabel": "您是否比其他人有更多的罪？",
        "backfillLabel": "14 您是否比其他人有更多的罪？",
        "yesField": "pdi14_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi14_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi14_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi14_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 15,
        "fullLabel": "別人是否常常因為您的外表而奇怪地望着您？",
        "backfillLabel": "15 別人是否常常因為您的外表而奇怪地望着您？",
        "yesField": "pdi15_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi15_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi15_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi15_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 16,
        "fullLabel": "您是否常常覺得腦海一片空白？",
        "backfillLabel": "16 您是否常常覺得腦海一片空白？",
        "yesField": "pdi16_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi16_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi16_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi16_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 17,
        "fullLabel": "您是否覺得世界末日快要到了？",
        "backfillLabel": "17 您是否覺得世界末日快要到了？",
        "yesField": "pdi17_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi17_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi17_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi17_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 18,
        "fullLabel": "您是否覺得有一些外來的思想插入到自己腦中？",
        "backfillLabel": "18 您是否覺得有一些外來的思想插入到自己腦中？",
        "yesField": "pdi18_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi18_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi18_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi18_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 19,
        "fullLabel": "您的思想過分活躍，擔心有人能讀出您的心思？",
        "backfillLabel": "19 您的思想過分活躍，擔心有人能讀出您的心思？",
        "yesField": "pdi19_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi19_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi19_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi19_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 20,
        "fullLabel": "您的思想像回音般和您對話？",
        "backfillLabel": "20 您的思想像回音般和您對話？",
        "yesField": "pdi20_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi20_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi20_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi20_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      },
      {
        "item": 21,
        "fullLabel": "自己像機器人般沒有自己的思想？",
        "backfillLabel": "21 自己像機器人般沒有自己的思想？",
        "yesField": "pdi21_yes",
        "yesOptions": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ],
        "dimensions": {
          "distress": {
            "name": "pdi21_distress",
            "fullLabel": "這件事是否對您造成困擾？",
            "anchors": {
              "1": "沒有困擾",
              "5": "十分困擾"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "preoccupation": {
            "name": "pdi21_preoccupation",
            "fullLabel": "您是否時常想起這件事？",
            "anchors": {
              "1": "幾乎沒有",
              "5": "一直在想"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          },
          "conviction": {
            "name": "pdi21_conviction",
            "fullLabel": "您相信這件事是真的嗎？",
            "anchors": {
              "1": "一點都不真實",
              "5": "非常真實"
            },
            "options": [
              {
                "value": 1,
                "label": "1"
              },
              {
                "value": 2,
                "label": "2"
              },
              {
                "value": 3,
                "label": "3"
              },
              {
                "value": 4,
                "label": "4"
              },
              {
                "value": 5,
                "label": "5"
              }
            ]
          }
        }
      }
    ],
    "layout": {
      "pageCount": 21,
      "itemsPerPage": 1,
      "explicitYesNo": true,
      "untouchedMeansNo": false,
      "noClearsDimensionsToNull": true
    },
    "scoringReference": "APATHY_QUESTION_BANK.scoring.pdi",
    "pageInstructions": {
      "page1": "請逐項閱讀以下情況。如果任何情況曾經在您身上出現，請點一下該項；選中的項目會變成藍色，然後請回答下方三個問題。如果以下情況全都沒有在您身上出現，所有項目都不用點，直接按「下一頁」。",
      "page2": "請逐項閱讀以下情況。如果任何情況曾經在您身上出現，請點一下該項；選中的項目會變成藍色，然後請回答下方三個問題。如果以下情況全都沒有在您身上出現，所有項目都不用點，直接按「完成本部分」。"
    }
  },
  "sequenceTextSupplement": {
    "retainedFields": [
      {
        "key": "t1_mp2rage",
        "label": "T1_mp2rage",
        "field": "mri_seq_t1_mp2rage_done"
      },
      {
        "key": "t1_flaws",
        "label": "T1_flaws",
        "field": "mri_seq_t1_flaws_done"
      },
      {
        "key": "qsm",
        "label": "qsm_",
        "field": "mri_seq_qsm_done"
      },
      {
        "key": "t2_me3d",
        "label": "t2_me3d",
        "field": "mri_seq_t2_me3d_done"
      },
      {
        "key": "cest_pd",
        "label": "CEST_PD",
        "field": "mri_seq_cest_pd_done"
      },
      {
        "key": "mt_cest",
        "label": "MT_CEST",
        "field": "mri_seq_mt_cest_done"
      },
      {
        "key": "resting",
        "label": "Resting",
        "field": "mri_seq_resting_done"
      },
      {
        "key": "igt_adcb",
        "label": "IGT_ADCB",
        "field": "mri_seq_igt_adcb_done"
      },
      {
        "key": "igt_bdca",
        "label": "IGT_BDCA",
        "field": "mri_seq_igt_bdca_done"
      },
      {
        "key": "dmri_dki",
        "label": "dMRI_DKI",
        "field": "mri_seq_dmri_dki_done"
      },
      {
        "key": "dmri_b0",
        "label": "dMRI_B0",
        "field": "mri_seq_dmri_b0_done"
      },
      {
        "key": "gre_2d_mt",
        "label": "2D_GRE_MT",
        "field": "mri_seq_gre_2d_mt_done"
      },
      {
        "key": "gre_3d",
        "label": "3DGRE",
        "field": "mri_seq_gre_3d_done"
      },
      {
        "key": "t1_mprage",
        "label": "T1_MPRAGE",
        "field": "mri_seq_t1_mprage_done"
      }
    ],
    "generalRemarkField": "mri_sequence_general_remark",
    "discardedLegacyPerSequenceRemarks": true,
    "scoringOrCompletionPolicy": "Use the existing backend-first sequence contract; this legacy snippet contributes no scoring rule."
  },
  "sourcePolicyPart3": {
    "textOnly": true,
    "discardedLegacyElements": [
      "IIFE wrappers",
      "FORM_CONFIG mutations",
      "schemaVersion assignments",
      "page insertion functions",
      "removeQuestion calls",
      "legacy totals",
      "per-sequence remark fields",
      "legacy required flags"
    ],
    "scoringPolicy": "Do not use scoring implied by this source. Preserve the canonical scoring, review and grouping rules already loaded from Part 2."
  },
  "rbdsq": {
    "code": "RBDSQ",
    "title": "快速眼動睡眠行為障礙篩查問卷（RBDSQ）",
    "sourceField": "rbdsq_source_of_information",
    "sourceOptions": [
      {
        "value": 1,
        "label": "參加者"
      },
      {
        "value": 2,
        "label": "照顧者"
      },
      {
        "value": 3,
        "label": "參加者及照顧者"
      }
    ],
    "items": [
      {
        "name": "rbdsq01_score",
        "item": "1",
        "fullLabel": "我有時會做非常生動的夢。",
        "backfillLabel": "01 生動的夢",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq02_score",
        "item": "2",
        "fullLabel": "我的夢境經常帶有攻擊性或充滿動作的內容。",
        "backfillLabel": "02 攻擊／動作夢境",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq03_score",
        "item": "3",
        "fullLabel": "夢境內容大多與我夜間睡眠中的行為相符。",
        "backfillLabel": "03 夢境與行為相符",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq04_score",
        "item": "4",
        "fullLabel": "我知道自己睡覺時手臂或腿會活動。",
        "backfillLabel": "04 睡眠中四肢活動",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq05_score",
        "item": "5",
        "fullLabel": "我曾因此差點或實際傷害同床者或自己。",
        "backfillLabel": "05 傷害同床者／自己",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq06_1_score",
        "item": "6.1",
        "fullLabel": "在夢境期間，我會說話、呼喊、咒罵或大聲發笑。",
        "backfillLabel": "06.1 說話／呼喊／大笑",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq06_2_score",
        "item": "6.2",
        "fullLabel": "在夢境期間，我會突然活動四肢或作出像打鬥的動作。",
        "backfillLabel": "06.2 突然四肢活動／打鬥",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq06_3_score",
        "item": "6.3",
        "fullLabel": "在夢境期間，我會作出睡眠時沒有實際用途的手勢或複雜動作，例如揮手、敬禮、驅趕蚊蟲或跌下床。",
        "backfillLabel": "06.3 複雜動作／跌下床",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq06_4_score",
        "item": "6.4",
        "fullLabel": "床邊的物件曾因我的睡眠動作跌下，例如床頭燈、書本或眼鏡。",
        "backfillLabel": "06.4 床邊物件跌下",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq07_score",
        "item": "7",
        "fullLabel": "我的動作有時會令我醒來。",
        "backfillLabel": "07 動作令自己醒來",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq08_score",
        "item": "8",
        "fullLabel": "醒來後，我大多能清楚記得夢境內容。",
        "backfillLabel": "08 記得夢境",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq09_score",
        "item": "9",
        "fullLabel": "我的睡眠經常受到干擾。",
        "backfillLabel": "09 睡眠受干擾",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      }
    ],
    "diseaseQuestion": "您現在或過去曾患有神經系統疾病嗎？",
    "diseaseItems": [
      {
        "name": "rbdsq10a_stroke",
        "code": "10a",
        "fullLabel": "中風",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq10b_head_trauma",
        "code": "10b",
        "fullLabel": "頭部創傷",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq10c_parkinsonism",
        "code": "10c",
        "fullLabel": "柏金遜症候群",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq10d_rls",
        "code": "10d",
        "fullLabel": "不寧腿症候群（RLS）",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq10e_narcolepsy",
        "code": "10e",
        "fullLabel": "嗜睡症",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq10f_depression",
        "code": "10f",
        "fullLabel": "抑鬱症",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq10g_epilepsy",
        "code": "10g",
        "fullLabel": "癲癇",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq10h_inflammatory_brain_disease",
        "code": "10h",
        "fullLabel": "腦部炎症性疾病",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      },
      {
        "name": "rbdsq10i_other",
        "code": "10i",
        "fullLabel": "其他神經系統疾病",
        "detailField": "rbdsq10i_other_detail",
        "options": [
          {
            "value": 0,
            "label": "否"
          },
          {
            "value": 1,
            "label": "是"
          }
        ]
      }
    ],
    "q10ScoringRule": "Q10各子項均須保存；任何一項為「是」時Q10得1分，多項為「是」亦只得1分。",
    "scoringReference": "APATHY_QUESTION_BANK.scoring.rbdsq",
    "layout": {
      "formal": "full_item_rows_then_q10_subitem_grid",
      "backfill": "compact_yes_no_grid"
    }
  },
  "sourcePolicyPart4": {
    "language": "zh-Hant",
    "textOnly": true,
    "scoringPolicy": "Use the canonical backend-first scoring rules already loaded; this supplement adds wording and field presentation only.",
    "translationStatus": "Research-team-supplied English wording translated into Traditional Chinese for draft UI review."
  },
  "sourcePolicyPart5": {
    "language": "zh-Hant",
    "scoringPolicy": "Backend-first scoring and field names unchanged.",
    "wordingStatus": "Full research-team-supplied text for UPDRS-III, UPDRS 1.5 and HY."
  },
  "sourcePolicyPart6": {
    "language": "zh-Hant",
    "status": "consolidated_after_v9_user_testing",
    "preservesCanonicalRawKeys": true,
    "resultDisclosure": "controlled_by_workflow_renderer"
  }
});
