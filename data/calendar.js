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
  asOf: "2026-08-07",
  macro: [
    { date: "08-07", name: "中国7月进出口（已发布）", expect: "出口预期 +24.5%", prev: "实际：出口+17.8%、进口+21.2%", market: "cn" },
    { date: "08-07", name: "美国7月非农（今晚20:30）", expect: "预期 +9.1万", prev: "前值 +5.7万", market: "us" },
    { date: "08-07", name: "中国7月外汇储备", expect: "—", prev: "前值 34160亿美元", market: "cn" },
    { date: "08-09", name: "中国7月CPI/PPI", expect: "CPI预期 +0.91% / PPI预期 +3.80%", prev: "CPI前值 +1.00% / PPI前值 +4.10%", market: "cn" },
    { date: "08-09", name: "CIES第十六届国际储能大会（8/9-11）", expect: "—", prev: "—", market: "cn" },
    { date: "08-09", name: "中国1-7月社融/M2/新增贷款", expect: "—", prev: "可能发布", market: "cn" }
  ],
  unlock: [
    { date: "08-10", name: "陆家嘴", scale: "解禁 7.79亿股（占股本19.79%）", market: "cn" },
    { date: "08-10", name: "天富龙", scale: "解禁 2205.73万股（占股本37.56%）", market: "cn" },
    { date: "08-10", name: "电科蓝天", scale: "解禁 1000.47万股（占股本7.04%）", market: "cn" },
    { date: "08-10", name: "碧兴物联", scale: "解禁 692.50万股（占股本12.88%）", market: "cn" },
    { date: "08-10", name: "林平发展", scale: "解禁 38.03万股（占股本2.02%）", market: "cn" }
  ],
  earnings: [
    { date: "08-06", name: "牧原股份", summary: "预亏57-67亿，由盈转亏（猪价-28%）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "新希望", summary: "预亏16-18亿，由盈转亏", sentiment: "down", market: "cn" },
    { date: "08-06", name: "金麒麟", summary: "净利 -83.94%", sentiment: "down", market: "cn" },
    { date: "08-06", name: "闽灿坤B", summary: "由盈转亏（净利-2871万，-279%）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "天合光能", summary: "上半年亏损2.7亿，同比大幅减亏", sentiment: "down", market: "cn" },
    { date: "08-06", name: "百济神州", summary: "净利32.71亿 +627%，上调全年指引", sentiment: "up", market: "cn" },
    { date: "08-06", name: "百奥赛图", summary: "净利预增 391.87%-412.71%", sentiment: "up", market: "cn" },
    { date: "08-06", name: "爱丽家居", summary: "半年报预亏4050-3450万（10连板投机风险）", sentiment: "down", market: "cn" }
  ]
};
