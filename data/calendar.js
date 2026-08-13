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
 * ★ 2026-08-13（周四）更新：8/12美CPI已落地（同比+3.4%/核心+2.5%符合预期，CME 9月不加息概率约60%）、腾讯Q2财报已出（资本开支+176%）；今日焦点=20:30美7月PPI+京东/中芯国际财报；8/14美零售销售+13F截止+成品油调价+央行隔夜逆回购+中国7月金融数据（社融预测1.16万亿）待公布。
 *   解禁：本周（8/10-8/14）合计约279亿、8/10为高峰已过（17家182.91亿占64%）；下周（8/17-8/21）数据待更新（检索结果为历史旧闻已排除，不采用）。
 *   业绩预告（8月披露季）：新增金龙鱼中报+30.69%；中芯国际/华虹今晚放榜。
 */
window.TID_CALENDAR = {
  asOf: "2026-08-13",
  macro: [
    { date: "08-13", name: "美国7月PPI（今晚20:30，CPI后第二份通胀验证）", expect: "—", prev: "前值 同比5.5%", market: "us" },
    { date: "08-13", name: "中芯国际/华虹/京东财报（半导体+科网双验证，中芯8/13放榜）", expect: "影响半导体反弹持续性；今日中芯A股盘中+3.53%", prev: "—", market: "cn" },
    { date: "08-14", name: "央行隔夜逆回购（每日≤6000亿，8/17-19续做，首次月中开展）", expect: "流动性宽松从喊话到操作，关注利率传导", prev: "—", market: "cn" },
    { date: "08-14", name: "美国7月零售销售（恐怖数据）", expect: "—", prev: "前值 环比+0.2%", market: "us" },
    { date: "08-14", name: "SEC 13F持仓截止披露；成品油调价窗口24时", expect: "关注机构科技/能源配置", prev: "—", market: "us" },
    { date: "08-14", name: "中国7月金融数据（M2/社融/新增信贷，本周公布）", expect: "社融预测1.16万亿，信贷或负增长", prev: "6月社融3.4万亿", market: "cn" },
    { date: "08-15", name: "贵州茅台/海光信息财报（中概财报季最密集日）", expect: "8/15单日126家A股放榜", prev: "—", market: "cn" },
    { date: "08-中下旬", name: "北京世界机器人大会（WRC）进入倒计时+宇树科技上市在即（中签率0.018%创历史新低）", expect: "人形机器人催化（高盛：2027年出货7.6万台）", prev: "—", market: "cn" },
    { date: "08-20", name: "财政部澳门发行60亿元人民币国债（连续第五年）", expect: "—", prev: "—", market: "cn" },
    { date: "09月", name: "美联储FOMC议息（9月不加息概率约60%，8月CPI/非农/PCE为关键验证）", expect: "CME：维持不变约60%、加息约45-46%、降息约17%", prev: "7月会议3位票委投票加息", market: "us" }
  ],
  unlock: [
    { date: "08-10", name: "陆家嘴", scale: "解禁 71.10亿（7.79亿股，占股本19.79%，上半年净利11.08亿+35.91%）", market: "cn" },
    { date: "08-10", name: "盟固利", scale: "解禁 30.58亿（1.87亿股，占股本40.65%）", market: "cn" },
    { date: "08-10", name: "凌玮科技", scale: "解禁 27.28亿（占股本26.41%，8月累计跌52.7%）", market: "cn" },
    { date: "08-10", name: "华能蒙电", scale: "解禁 5.36亿股（解禁股数第二）", market: "cn" },
    { date: "08-10", name: "紫建电子", scale: "解禁 8.46亿（占股本25.33%）", market: "cn" },
    { date: "08-10", name: "蓝箭电子", scale: "解禁 7.77亿（占股本15.76%）", market: "cn" },
    { date: "08-10", name: "威力传动", scale: "解禁 5.17亿（占股本17.41%）", market: "cn" }
  ],
  earnings: [
    { date: "08-12", name: "金龙鱼", summary: "上半年净利22.94亿 +30.69%（消费复苏）", sentiment: "up", market: "cn" },
    { date: "08-12", name: "工业富联", summary: "营收5578.61亿+54.63%、净利237.4亿+95.99%（AI服务器兑现）", sentiment: "up", market: "cn" },
    { date: "08-12", name: "鹏鼎控股", summary: "中际旭创子公司新进第四大股东（对应市值23.2亿），PCB景气", sentiment: "up", market: "cn" },
    { date: "08-13", name: "中芯国际/华虹（今晚放榜）", summary: "半导体代工双验证，今日盘中中芯+3.53%/华虹+6.37%", sentiment: "neu", market: "cn" },
    { date: "08-11", name: "江波龙", summary: "净利105.77亿 +71528.66%，营收+136.26%，拟4-8亿回购", sentiment: "up", market: "cn" },
    { date: "08-11", name: "芯联集成", summary: "净利2.78亿扭亏为盈（半导体代工）", sentiment: "up", market: "cn" },
    { date: "08-11", name: "南模生物", summary: "净利预降 44.96%-55.97%（股份支付费用大增）", sentiment: "down", market: "cn" },
    { date: "08-11", name: "京投发展", summary: "上半年亏损3.13亿（上年同期亏2.63亿）", sentiment: "down", market: "cn" },
    { date: "08-11", name: "赣粤高速", summary: "半年净利同比 -72.81%", sentiment: "down", market: "cn" },
    { date: "08-11", name: "九号公司", summary: "半年净利同比 -18.79%", sentiment: "down", market: "cn" },
    { date: "08-10", name: "德尔未来", summary: "上半年预亏1700-2500万（股价异常波动提示）", sentiment: "down", market: "cn" },
    { date: "08-10", name: "爱丽家居", summary: "上半年预亏4050-3450万（12天11板，8/11起停牌核查）", sentiment: "down", market: "cn" },
    { date: "08-10", name: "寒武纪", summary: "上半年净利23.11亿 +122.61%（AI算力兑现，但营收增速放缓）", sentiment: "up", market: "cn" },
    { date: "08-10", name: "盛美上海", summary: "上半年净利9.89亿 +42.14%（半导体设备）", sentiment: "up", market: "cn" },
    { date: "08-07", name: "天能股份", summary: "净利预降 65.46%-68.92%（硫酸涨价+政策调整）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "牧原股份", summary: "预亏57-67亿，由盈转亏（猪价-28%）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "百济神州", summary: "净利32.71亿 +627%，上调全年指引", sentiment: "up", market: "cn" }
  ]
};
