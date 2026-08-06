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
  asOf: "2026-08-06",
  macro: [
    { date: "08-06", name: "美国初请失业金", expect: "预期 21.0万", prev: "前值 19.7万", market: "us" },
    { date: "08-07", name: "美国7月非农", expect: "预期 +9.1万", prev: "前值 +5.7万", market: "us" },
    { date: "08-07", name: "中国7月进出口", expect: "出口预期 +24.5%", prev: "前值 +27.0%", market: "cn" },
    { date: "08-07", name: "中国7月外汇储备", expect: "—", prev: "前值 34160亿美元", market: "cn" },
    { date: "08-09", name: "中国7月CPI/PPI", expect: "CPI预期 +0.91% / PPI预期 +3.80%", prev: "CPI前值 +1.00% / PPI前值 +4.10%", market: "cn" }
  ],
  unlock: [
    { date: "08-06", name: "麦格米特", scale: "解禁 35.12亿（占股本5.15%）", market: "cn" },
    { date: "08-06", name: "科翔股份", scale: "解禁 11.09亿（4.75%）", market: "cn" },
    { date: "08-06", name: "正虹科技", scale: "解禁 4.24亿（23.08%）", market: "cn" },
    { date: "08-06", name: "汉桑科技", scale: "解禁 3.82亿（7.49%）", market: "cn" },
    { date: "08-06", name: "安克创新", scale: "解禁 2.00亿（0.29%）", market: "cn" }
  ],
  earnings: [
    { date: "08-05", name: "荣昌生物", summary: "预盈约47亿，扭亏为盈", sentiment: "up", market: "cn" },
    { date: "08-05", name: "鲁北化工", summary: "净利 +119.46%", sentiment: "up", market: "cn" },
    { date: "08-05", name: "赛分科技", summary: "净利预增 +80%~110%", sentiment: "up", market: "cn" },
    { date: "08-05", name: "百济神州", summary: "Q2收入 17亿美元 +30%", sentiment: "up", market: "us" },
    { date: "08-05", name: "天德钰", summary: "净利 -9.42%（Q2环比+99.8%）", sentiment: "down", market: "cn" },
    { date: "08-05", name: "牧原股份", summary: "7月收入 88.97亿 -23.56%", sentiment: "down", market: "cn" },
    { date: "08-05", name: "长安汽车", summary: "7月销量 -23.29%", sentiment: "down", market: "cn" }
  ]
};
