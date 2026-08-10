/**
 * data/calendar.js — 事件与风险日历（P1 模块数据）
 * 更新方：每日 08:00 自动化（查询本周宏观数据/解禁/业绩预告后填充）
 * 页面通过 window.TID_CALENDAR 读取。
 *
 * 字段契约：
 * - macro[]:    宏观数据日历 { date:"MM-DD", name:"7月CPI", expect:"预期 0.3%", prev:"前值 0.1%", market:"cn" }
 * - unlock[]:   解禁日历     { date:"MM-DD", name:"XX科技", scale:"解禁市值 12.3亿", market:"cn" }
 * - earnings[]: 业绩预告雷区 { date:"MM-DD", name:"XX股份", summary:"预减 50%+", sentiment:"down", market:"cn" }
 *
 * ★ 2026-08-10（周一）更新：本周=8/10-8/16。中国7月物价已发布（CPI+0.5%/PPI+3.5%）；7月金融数据本周公布；
 *   8/12 美CPI（彭博预期3.3%）+腾讯二季报、8/13 PPI+京东/中芯/华虹财报、8/14 零售销售+13F截止+成品油调价窗口。
 *   解禁：本周高峰在8/10（17家182.91亿占64%，合计285.22亿）。
 *   业绩预告：8月为披露季，周末新增寒武纪+123%、盛美上海+42.14%、拓维信息-12.16%。
 */
window.TID_CALENDAR = {
  asOf: "2026-08-10",
  macro: [
    { date: "08-10", name: "日本央行7月货币政策意见摘要", expect: "关注政策路径暗示", prev: "7月维持政策不变", market: "us" },
    { date: "08-10", name: "中国7月金融数据（M2/社融/新增信贷）", expect: "社融预测1.16万亿，信贷或负增长", prev: "6月社融3.4万亿", market: "cn" },
    { date: "08-11", name: "澳洲联储利率决议", expect: "预期维持4.35%", prev: "—", market: "us" },
    { date: "08-12", name: "美国7月CPI（重磅，定价9月加息路径）", expect: "彭博预期 同比3.3%/核心2.4%", prev: "前值 同比3.9%", market: "us" },
    { date: "08-12", name: "腾讯二季报（20:00，港股头号焦点）", expect: "关注AI资本开支/游戏/视频号", prev: "—", market: "cn" },
    { date: "08-13", name: "美国7月PPI", expect: "—", prev: "前值 同比5.5%", market: "us" },
    { date: "08-13", name: "中芯国际/华虹/京东财报（半导体+科网双验证）", expect: "影响半导体反弹持续性", prev: "—", market: "cn" },
    { date: "08-14", name: "美国7月零售销售（恐怖数据）", expect: "—", prev: "前值 环比+0.2%", market: "us" },
    { date: "08-14", name: "SEC 13F持仓截止披露；成品油调价窗口24时（预计下调395元/吨）", expect: "关注机构科技/能源配置", prev: "—", market: "us" },
    { date: "08-15", name: "贵州茅台/海光信息财报（中概财报季最密集日）", expect: "8/15单日126家A股放榜", prev: "—", market: "cn" }
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
    { date: "08-10", name: "寒武纪", summary: "上半年净利23.11亿 +122.61%（AI算力兑现）", sentiment: "up", market: "cn" },
    { date: "08-10", name: "盛美上海", summary: "上半年净利9.89亿 +42.14%（半导体设备）", sentiment: "up", market: "cn" },
    { date: "08-10", name: "拓维信息", summary: "上半年净利 -12.16%（拟10派0.25元）", sentiment: "down", market: "cn" },
    { date: "08-10", name: "江波龙", summary: "37亿定增落地（560元/股，溢价45%）", sentiment: "up", market: "cn" },
    { date: "08-07", name: "天能股份", summary: "净利预降 65.46%-68.92%（硫酸涨价+政策调整）", sentiment: "down", market: "cn" },
    { date: "08-07", name: "魅视科技", summary: "净利预降超七成（半导体项目存不确定性）", sentiment: "down", market: "cn" },
    { date: "08-07", name: "闽灿坤B", summary: "由盈转亏（净利-2871万，-279%）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "牧原股份", summary: "预亏57-67亿，由盈转亏（猪价-28%）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "新希望", summary: "预亏16-18亿，由盈转亏", sentiment: "down", market: "cn" },
    { date: "08-06", name: "百济神州", summary: "净利32.71亿 +627%，上调全年指引", sentiment: "up", market: "cn" },
    { date: "08-06", name: "百奥赛图", summary: "净利预增 391.87%-412.71%", sentiment: "up", market: "cn" },
    { date: "08-06", name: "爱丽家居", summary: "半年报预亏4050-3450万（10连板投机风险）", sentiment: "down", market: "cn" }
  ]
};
