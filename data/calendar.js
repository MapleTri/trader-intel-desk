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
 * ★ 2026-08-12（周三）更新：8/12 美CPI（20:30，共识整体3.4%/核心2.5%，前值3.53%/2.6%）+腾讯二季报（20:00）+谷歌Pixel 11发布会+MSCI 8月指数调整+具身智能产业大会（8/12-13）+C919首条国际航线+欧佩克/IEA月报；
 *   8/13 美PPI+中芯/华虹/京东财报；8/14 零售销售+13F截止+成品油调价窗口；8/15 茅台/海光（126家放榜）；中国7月金融数据本周公布（社融预测1.16万亿）。
 *   解禁：本周（8/10-8/14）合计约279亿，8/10为高峰（17家182.91亿占64%）。
 *   业绩预告（8月披露季）：新增工业富联+95.99%、鹏鼎控股（中际旭创子公司进第四大股东）。
 */
window.TID_CALENDAR = {
  asOf: "2026-08-12",
  macro: [
    { date: "08-12", name: "美国7月CPI（20:30，重磅：定价9月加息路径）", expect: "共识 同比3.4%/核心2.5%、环比+0.1%转正（高盛更乐观：3.35%/2.47%）", prev: "前值 同比3.53%/核心2.6%、环比-0.4%", market: "us" },
    { date: "08-12", name: "腾讯二季报（20:00，港股头号焦点）", expect: "业绩前股价-2.25%；关注AI资本开支/游戏/视频号", prev: "—", market: "cn" },
    { date: "08-12", name: "谷歌Pixel 11发布会（AI手机催化）", expect: "关注端侧AI/TPU进展对A股消费电子映射", prev: "—", market: "us" },
    { date: "08-12", name: "MSCI 8月指数调整公告（长鑫已纳入生效）", expect: "关注新增/剔除成分对被动资金流向影响", prev: "—", market: "cn" },
    { date: "08-12", name: "中国具身智能机器人产业大会（8/12-13）+C919首条国际航线", expect: "人形机器人/大飞机催化", prev: "—", market: "cn" },
    { date: "08-12", name: "欧佩克/IEA月度原油市场报告", expect: "关注产量政策与需求预期对油价影响", prev: "—", market: "us" },
    { date: "08-13", name: "美国7月PPI", expect: "—", prev: "前值 同比5.5%", market: "us" },
    { date: "08-13", name: "中芯国际/华虹/京东财报（半导体+科网双验证）", expect: "影响半导体反弹持续性（中芯8/13放榜）", prev: "—", market: "cn" },
    { date: "08-14", name: "美国7月零售销售（恐怖数据）", expect: "—", prev: "前值 环比+0.2%", market: "us" },
    { date: "08-14", name: "SEC 13F持仓截止披露；成品油调价窗口24时", expect: "关注机构科技/能源配置", prev: "—", market: "us" },
    { date: "08-14", name: "中国7月金融数据（M2/社融/新增信贷，本周公布）", expect: "社融预测1.16万亿，信贷或负增长", prev: "6月社融3.4万亿", market: "cn" },
    { date: "08-15", name: "贵州茅台/海光信息财报（中概财报季最密集日）", expect: "8/15单日126家A股放榜", prev: "—", market: "cn" },
    { date: "08-20", name: "财政部澳门发行60亿元人民币国债（连续第五年）", expect: "—", prev: "—", market: "cn" }
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
    { date: "08-12", name: "工业富联", summary: "营收5578.61亿+54.63%、净利237.4亿+95.99%（AI服务器兑现）", sentiment: "up", market: "cn" },
    { date: "08-12", name: "鹏鼎控股", summary: "中际旭创子公司新进第四大股东（对应市值23.2亿），PCB景气", sentiment: "up", market: "cn" },
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
