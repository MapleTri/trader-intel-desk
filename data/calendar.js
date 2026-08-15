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
 * ★ 2026-08-14（周五）更新：8/13美PPI已落地（同比+4.7%低于预期4.9%，交易员不再充分定价今年加息）、美股三大指数齐创新高（标普+0.65%报7798.99）；今日焦点=20:30美7月零售销售（前值+0.2%，本周第三份关键数据）+A股消费板块财报大日（茅台/安琪酵母盘后）+成品油今晚24时或下调（年内第5次）+央行月中隔夜逆回购首现（≤6000亿）。
 *   解禁：8月全月约1153.57亿（年内最低，较7月降近六成）；下周一8/17为月内高峰14股约340亿（广钢气体236亿最大/亚通精工占股本63%）、8/20真兰仪表52亿；本周8/14解禁华能蒙电27.36亿/志高机械14.68亿。
 *   业绩预告（8月披露季）：新增皇氏集团半年度预亏-1950万~-3750万（亏损扩大，8/14跌停）、箭牌家居首亏（预亏5400-7000万）、卫龙净利-4.58%、乐欣户外预减42%。
 */
window.TID_CALENDAR = {
  asOf: "2026-08-14",
  macro: [
    { date: "08-14", name: "央行隔夜逆回购（每日≤6000亿，8/17-19续做，首次月中开展）+10000亿买断式逆回购到期", expect: "流动性宽松精准滴灌，关注利率传导", prev: "—", market: "cn" },
    { date: "08-14", name: "美国7月零售销售（今晚20:30，本周第三份关键数据）", expect: "—", prev: "前值 环比+0.2%", market: "us" },
    { date: "08-14", name: "A股消费板块财报大日（贵州茅台/安琪酵母/承德露露/香飘飘盘后）", expect: "消费旺季临近，关注白酒/食品景气", prev: "—", market: "cn" },
    { date: "08-14", name: "成品油调价窗口24时（2026年以来第五次下调预期）", expect: "机构预测下调幅度远超50元/吨红线", prev: "—", market: "cn" },
    { date: "08-14", name: "中国香港二季度GDP", expect: "—", prev: "—", market: "cn" },
    { date: "08-14", name: "SEC 13F持仓截止披露（关注机构科技/存储配置）", expect: "—", prev: "—", market: "us" },
    { date: "08-15", name: "中报披露最密集日：单日126家A股放榜", expect: "8/15为披露高峰，关注消费/医药", prev: "—", market: "cn" },
    { date: "08-中下旬", name: "北京世界机器人大会（WRC）+宇树科技上市在即（中签率0.018%创历史新低）", expect: "人形机器人催化（高盛：2027年出货7.6万台）", prev: "—", market: "cn" },
    { date: "08-20", name: "财政部澳门发行60亿元人民币国债（连续第五年）", expect: "—", prev: "—", market: "cn" },
    { date: "09月", name: "美联储FOMC议息（9月加息概率进一步回落，PPI降温后交易员不再充分定价加息）", expect: "8月CPI/非农/PCE为关键验证", prev: "7月会议3位票委投票加息", market: "us" }
  ],
  unlock: [
    { date: "08-17", name: "广钢气体", scale: "解禁 236亿（6.28亿股，占股本47.61%，8月解禁高峰最大）", market: "cn" },
    { date: "08-17", name: "亚通精工", scale: "解禁 占股本63.34%（当日占股本比例最高）", market: "cn" },
    { date: "08-17", name: "固高科技", scale: "解禁 29.58%股本（1.20亿股，8/17上市流通）", market: "cn" },
    { date: "08-14", name: "华能蒙电", scale: "解禁 27.36亿（5.36亿股，占股本6.85%）", market: "cn" },
    { date: "08-14", name: "志高机械", scale: "解禁 14.68亿（8586.15万股，占股本68.80%）", market: "cn" },
    { date: "08-20", name: "真兰仪表", scale: "解禁 52亿（占股本75%）", market: "cn" },
    { date: "8月全月", name: "合计约1153.57亿", scale: "年内最低解禁月（较7月降近六成），高峰在8/17；12月超6000亿为年内最大", market: "cn" }
  ],
  earnings: [
    { date: "08-14", name: "皇氏集团", summary: "半年度预亏-1950万~-3750万（亏损扩大，4连板后8/14跌停）", sentiment: "down", market: "cn" },
    { date: "08-14", name: "箭牌家居", summary: "上半年首亏（预亏5400万-7000万，同比-289%~-346%）", sentiment: "down", market: "cn" },
    { date: "08-14", name: "卫龙美味", summary: "上半年营收37.15亿+6.7%、净利7.67亿-4.58%（辣条收入缩水）", sentiment: "down", market: "cn" },
    { date: "08-13", name: "乐欣户外", summary: "上半年预减42%-44%（铝价涨20%+OEM订单拉长）", sentiment: "down", market: "cn" },
    { date: "08-13", name: "中芯国际/华虹", summary: "中芯Q2拥有人应占利润4.79亿美元+261.7%、华虹+385.9%（半导体代工兑现）", sentiment: "up", market: "cn" },
    { date: "08-12", name: "金龙鱼", summary: "上半年净利22.94亿 +30.69%（消费复苏）", sentiment: "up", market: "cn" },
    { date: "08-12", name: "工业富联", summary: "营收5578.61亿+54.63%、净利237.4亿+95.99%（AI服务器兑现）", sentiment: "up", market: "cn" },
    { date: "08-11", name: "江波龙", summary: "净利105.77亿 +71528.66%，营收+136.26%，拟4-8亿回购", sentiment: "up", market: "cn" },
    { date: "08-11", name: "芯联集成", summary: "净利2.78亿扭亏为盈（半导体代工）", sentiment: "up", market: "cn" },
    { date: "08-11", name: "南模生物", summary: "净利预降 44.96%-55.97%（股份支付费用大增）", sentiment: "down", market: "cn" },
    { date: "08-11", name: "京投发展", summary: "上半年亏损3.13亿（上年同期亏2.63亿）", sentiment: "down", market: "cn" },
    { date: "08-11", name: "赣粤高速", summary: "半年净利同比 -72.81%", sentiment: "down", market: "cn" },
    { date: "08-10", name: "寒武纪", summary: "上半年净利23.11亿 +122.61%（AI算力兑现，但营收增速放缓）", sentiment: "up", market: "cn" },
    { date: "08-10", name: "盛美上海", summary: "上半年净利9.89亿 +42.14%（半导体设备）", sentiment: "up", market: "cn" },
    { date: "08-07", name: "天能股份", summary: "净利预降 65.46%-68.92%（硫酸涨价+政策调整）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "牧原股份", summary: "预亏57-67亿，由盈转亏（猪价-28%）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "百济神州", summary: "净利32.71亿 +627%，上调全年指引", sentiment: "up", market: "cn" }
  ]
};
