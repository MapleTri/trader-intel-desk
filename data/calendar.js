/**
 * data/calendar.js — 事件与风险日历（P1 模块数据）
 * 更新方：每日 08:00 自动化（查询本周宏观数据/解禁/业绩预告后填充）
 * 页面通过 window.TID_CALENDAR 读取。
 *
 * 字段契约：
 * - macro[]:    宏观数据日历 { date:"MM-DD", name:"7月CPI", expect:"预期 0.3%", prev:"前值 0.1%", market:"cn" }
 * - unlock[]:   解禁日历     { date:"MM-DD", name:"XX科技", scale:"解禁市值 12.3亿", market:"cn" }
 * - earnings[]: 业绩预告雷区 { date:"MM-DD", name:"XX股份", summary:"预减 50%+", sentiment:"down", market:"cn" }
 */
window.TID_CALENDAR = {
  asOf: "2026-08-09",
  macro: [
    { date: "08-10", name: "日本央行7月货币政策意见摘要", expect: "关注政策路径暗示", prev: "7月维持政策不变", market: "us" },
    { date: "08-10", name: "中国7月M2/社融/新增信贷", expect: "社融预测1.15万亿", prev: "可能发布", market: "cn" },
    { date: "08-11", name: "澳洲联储利率决议", expect: "预期维持4.35%", prev: "—", market: "us" },
    { date: "08-12", name: "美国7月CPI（重磅，定价9月加息路径）", expect: "彭博预期 同比3.3%/核心2.4%", prev: "前值 同比3.9%", market: "us" },
    { date: "08-12", name: "腾讯二季报（20:00，港股头号焦点）", expect: "关注AI资本开支/游戏/视频号", prev: "—", market: "cn" },
    { date: "08-13", name: "美国7月PPI", expect: "—", prev: "前值 同比5.5%", market: "us" },
    { date: "08-13", name: "美国10年期国债拍卖；中芯国际财报", expect: "—", prev: "—", market: "us" },
    { date: "08-14", name: "美国7月零售销售（恐怖数据）", expect: "—", prev: "前值 环比+0.2%", market: "us" },
    { date: "08-14", name: "8月密歇根消费者信心；SEC 13F持仓截止披露", expect: "关注机构科技/能源配置", prev: "—", market: "us" }
  ],
  unlock: [
    { date: "08-10", name: "陆家嘴", scale: "解禁 71.10亿（7.79亿股，占股本19.79%，上半年净利11.08亿+35.91%）", market: "cn" },
    { date: "08-10", name: "盟固利", scale: "解禁 30.58亿（1.87亿股，占股本40.65%）", market: "cn" },
    { date: "08-10", name: "凌玮科技", scale: "解禁 27.28亿（占股本26.41%）", market: "cn" },
    { date: "08-10", name: "华能蒙电", scale: "解禁 5.36亿股（解禁股数第二）", market: "cn" },
    { date: "08-10", name: "紫建电子", scale: "解禁 8.46亿（占股本25.33%）", market: "cn" },
    { date: "08-10", name: "蓝箭电子", scale: "解禁 7.77亿（占股本15.76%）", market: "cn" },
    { date: "08-10", name: "威力传动", scale: "解禁 5.17亿（占股本17.41%）", market: "cn" }
  ],
  earnings: [
    { date: "08-10", name: "南京新百", summary: "预减 77.15%-78.90%（净利约3512-3805万）", sentiment: "down", market: "cn" },
    { date: "08-10", name: "江淮汽车", summary: "上半年续亏（下周解禁股）", sentiment: "down", market: "cn" },
    { date: "08-07", name: "天能股份", summary: "净利预降 65.46%-68.92%（硫酸涨价+政策调整）", sentiment: "down", market: "cn" },
    { date: "08-07", name: "魅视科技", summary: "净利预降超七成（半导体项目存不确定性）", sentiment: "down", market: "cn" },
    { date: "08-07", name: "闽灿坤B", summary: "由盈转亏（净利-2871万，-279%）", sentiment: "down", market: "cn" },
    { date: "08-07", name: "金麒麟", summary: "净利 -83.94%", sentiment: "down", market: "cn" },
    { date: "08-06", name: "牧原股份", summary: "预亏57-67亿，由盈转亏（猪价-28%）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "新希望", summary: "预亏16-18亿，由盈转亏", sentiment: "down", market: "cn" },
    { date: "08-06", name: "百济神州", summary: "净利32.71亿 +627%，上调全年指引", sentiment: "up", market: "cn" },
    { date: "08-06", name: "百奥赛图", summary: "净利预增 391.87%-412.71%", sentiment: "up", market: "cn" },
    { date: "08-06", name: "爱丽家居", summary: "半年报预亏4050-3450万（10连板投机风险）", sentiment: "down", market: "cn" }
  ]
};
