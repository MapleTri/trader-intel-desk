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
 * ★ 2026-08-18（周二）更新：中国7月经济数据已于8/17发布（工业+4.5%/社零+0.6%/1-7月固投-19.2%，内需偏弱验证）。今日8/18百度港股Q2财报、小米/兆易创新盘后放榜；8/19 FOMC纪要+宇树科技科创板上市+世界机器人大会开幕；8/20 LPR+阿里/网易财报；8/21美8月PMI。
 *   解禁：8/17已释放高峰316.57亿（广钢气体244.99亿居首）；8/18解禁12.63亿（6家：鸿仕达8.86亿居首）；本周（8/17-23）合计442.65亿。
 *   业绩预告（8月披露季）：A股半年报高峰期，多氟多+897%/融捷+1076%/招金黄金+407%/芯原股份AI订单151.42亿等密集披露。
 */
window.TID_CALENDAR = {
  asOf: "2026-08-18",
  macro: [
    { date: "08-17", name: "中国7月规模以上工业增加值/社零/固定资产投资/70城房价（已发布）", expect: "已发布：工业+4.5%（预期+4.8%）/社零+0.6%（预期0.8~2.5%下沿）/1-7月固投-19.2%，内需偏弱", prev: "6月工业+5.3%", market: "cn" },
    { date: "08-18", name: "百度港股Q2财报 + 小米/兆易创新盘后放榜", expect: "中概科网AI资本开支与业绩兑现；兆易创新存储景气验证", prev: "—", market: "cn" },
    { date: "08-19", name: "美联储7月FOMC会议纪要（周三，关注加息/按兵不动分歧）", expect: "7月9-3按兵不动、3位票委投加息；纪要寻政策路径线索", prev: "—", market: "us" },
    { date: "08-19", name: "宇树科技科创板上市（688836）+2026世界机器人大会开幕（8/19-23）", expect: "人形机器人/具身智能估值锚确立，机器人链催化", prev: "发行价150.80元、市盈率219倍", market: "cn" },
    { date: "08-20", name: "中国8月LPR报价（1年期/5年期以上，已连续14个月不变）", expect: "关注是否下调（若下调利好地产/银行信贷，对冲7月内需走弱）", prev: "1年期3.0%/5年期3.5%", market: "cn" },
    { date: "08-20", name: "阿里巴巴/网易Q2财报（港股）", expect: "中概科网AI资本开支与业绩兑现", prev: "—", market: "cn" },
    { date: "08-20", name: "美国周初请失业金 + 8月费城联储制造业指数", expect: "劳动力市场是否续降温", prev: "—", market: "us" },
    { date: "08-21", name: "美国8月标普全球制造业/服务业PMI初值 + 全球8月PMI", expect: "通胀与就业双验证", prev: "—", market: "us" },
    { date: "09月", name: "美联储FOMC议息（9月加息概率回落至约33%）", expect: "CME 9月维持利率不变概率约67%", prev: "7月会议3位票委投加息", market: "us" }
  ],
  unlock: [
    { date: "08-18", name: "鸿仕达", scale: "解禁 8.86亿（641.70万股，占股本11.43%，今日最大）", market: "cn" },
    { date: "08-18", name: "奥瑞德", scale: "解禁 2.74亿（6972.22万股，占股本2.53%）", market: "cn" },
    { date: "08-18", name: "新亚电子", scale: "解禁 0.69亿（443.44万股，占股本1.14%）", market: "cn" },
    { date: "08-20", name: "真兰仪表", scale: "解禁 52亿（占股本75%）", market: "cn" },
    { date: "8/17-23", name: "合计442.65亿（29家）", scale: "8/17已释放高峰10家316.57亿（广钢气体244.99亿居首）；8/18-21合计约95亿", market: "cn" },
    { date: "12月", name: "全月超6000亿", scale: "2026年解禁压力最大月份", market: "cn" }
  ],
  earnings: [
    { date: "08-17", name: "多氟多", summary: "上半年净利5.12亿 +897.19%（六氟磷酸锂Q2环比降63%但同比大增）", sentiment: "up", market: "cn" },
    { date: "08-17", name: "融捷股份", summary: "上半年净利10.02亿 +1076.14%（营收+402.35%）", sentiment: "up", market: "cn" },
    { date: "08-17", name: "招金黄金", summary: "上半年净利2.27亿 +407.44%（金价新高驱动）", sentiment: "up", market: "cn" },
    { date: "08-17", name: "芯原股份", summary: "上半年营收18.64亿+91.37%、净亏6.12亿，AI算力订单151.42亿（占比90%），预计2027转正", sentiment: "down", market: "cn" },
    { date: "08-17", name: "中材科技", summary: "上半年净利12.08亿 +20.93%（特种纤维布收入+114%）", sentiment: "up", market: "cn" },
    { date: "08-16", name: "生益科技", summary: "上半年营收190.26亿+50.05%、净利32.87亿+130.42%（覆铜板/CCL景气验证）", sentiment: "up", market: "cn" },
    { date: "08-14", name: "贵州茅台", summary: "上半年营收+1.47%、净利-1.95%（增收不增利）", sentiment: "down", market: "cn" },
    { date: "08-12", name: "工业富联", summary: "营收5578.61亿+54.63%、净利237.4亿+95.99%（AI服务器兑现）", sentiment: "up", market: "cn" },
    { date: "08-11", name: "江波龙", summary: "净利105.77亿 +71528.66%，拟4-8亿回购", sentiment: "up", market: "cn" },
    { date: "08-10", name: "寒武纪", summary: "上半年净利23.11亿 +122.61%（AI算力兑现）", sentiment: "up", market: "cn" },
    { date: "08-07", name: "天能股份", summary: "净利预降 65.46%-68.92%（硫酸涨价+政策调整）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "百济神州", summary: "净利32.71亿 +627%，上调全年指引", sentiment: "up", market: "cn" }
  ]
};
