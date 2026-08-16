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
 * ★ 2026-08-16（周日）更新：今日休市。下周（8/17-21）宏观密集：8/17中国7月工业/社零/固投+日本Q2 GDP、8/19美FOMC纪要+英国CPI、8/20中国LPR+阿里/网易财报、8/21美8月PMI+全球PMI。
 *   解禁：下周（8/17-21）共29家445.24亿（8月全月约1153.57亿年内最低）；8/17为解禁高峰14家380.45亿（广钢气体244.99亿最大/真兰仪表44.3亿/中船科技36.64亿）、8/20真兰仪表52亿。
 *   业绩预告（8月披露季）：新增中芯/华虹Q2营收齐创新高（中芯首破30亿美元净利+261.7%、华虹+385.9%）；周末海外（非A股业绩，参考）：SK海力士「芯片通胀」、软银减持台积电、伯克希尔增持谷歌。
 */
window.TID_CALENDAR = {
  asOf: "2026-08-16",
  macro: [
    { date: "08-17", name: "中国7月规模以上工业增加值/社会消费品零售/固定资产投资（国新办发布会）", expect: "工业+4.8%/社零+1.6%/固投-6.0%（Newsquawk预测），关注内需", prev: "6月工业+5.3%", market: "cn" },
    { date: "08-17", name: "日本Q2 GDP初值", expect: "+0.5% Q/Q、+2.0%年化", prev: "Q1 +0.5%", market: "jp" },
    { date: "08-18", name: "美国7月住房开工/营建许可 + ADP就业", expect: "关注劳动力市场是否续降温", prev: "—", market: "us" },
    { date: "08-19", name: "美联储7月FOMC会议纪要（周三，关注加息/按兵不动分歧）", expect: "7月9-3按兵不动、3位票委投加息；纪要寻政策路径线索", prev: "—", market: "us" },
    { date: "08-19", name: "美国7月工业产出/产能利用率 + 英国7月CPI", expect: "—", prev: "—", market: "us" },
    { date: "08-20", name: "中国8月LPR报价（1年期/5年期以上）", expect: "关注是否下调（若下调利好地产/银行信贷）", prev: "—", market: "cn" },
    { date: "08-20", name: "美国周初请失业金 + 8月费城联储制造业指数", expect: "—", prev: "—", market: "us" },
    { date: "08-21", name: "美国8月标普全球制造业/服务业PMI初值", expect: "通胀与就业双验证", prev: "—", market: "us" },
    { date: "08-21", name: "欧元区/英国/日本8月PMI初值 + 英国7月零售销售", expect: "—", prev: "—", market: "us" },
    { date: "09月", name: "美联储FOMC议息（9月加息概率进一步回落至32.5%）", expect: "CME 9月维持利率不变概率67.5%", prev: "7月会议3位票委投加息", market: "us" }
  ],
  unlock: [
    { date: "08-17", name: "广钢气体", scale: "解禁 244.99亿（6.28亿股，占股本47.61%，下周解禁最大/8月高峰）", market: "cn" },
    { date: "08-17", name: "真兰仪表", scale: "解禁 44.3亿（3.07亿股，占股本75%）", market: "cn" },
    { date: "08-17", name: "中船科技", scale: "解禁 36.64亿（4.17亿股）", market: "cn" },
    { date: "08-17", name: "亚通精工", scale: "解禁 占股本63.34%（当日占股本比例最高）", market: "cn" },
    { date: "08-20", name: "真兰仪表", scale: "解禁 52亿（占股本75%）", market: "cn" },
    { date: "8/17-21", name: "合计445.24亿（29家）", scale: "8/17为高峰14家380.45亿占85.45%；8月全月1153.57亿年内最低", market: "cn" },
    { date: "12月", name: "全月超6000亿", scale: "2026年解禁压力最大月份", market: "cn" }
  ],
  earnings: [
    { date: "08-14", name: "贵州茅台", summary: "上半年营收+1.47%、净利-1.95%（增收不增利）、经营现金流706.91亿+438.84%、中央汇金/证金退出十大股东", sentiment: "down", market: "cn" },
    { date: "08-14", name: "生益科技/生益电子", summary: "生益科技净利+130%、生益电子净利+109%（AI需求，覆铜板）", sentiment: "up", market: "cn" },
    { date: "08-14", name: "闻泰科技", summary: "上半年营收-94%、归母净利转亏4亿（业务剥离后聚焦半导体）", sentiment: "down", market: "cn" },
    { date: "08-12", name: "同力天启", summary: "上半年净利2039.7万-82.39%（3连板后提示非理性炒作风险）", sentiment: "down", market: "cn" },
    { date: "08-13", name: "乐欣户外", summary: "上半年预减42%-44%（铝价涨20%+OEM订单拉长）", sentiment: "down", market: "cn" },
    { date: "08-14", name: "皇氏集团", summary: "半年度预亏-1950万~-3750万（亏损扩大，4连板后8/14跌停）", sentiment: "down", market: "cn" },
    { date: "08-12", name: "金龙鱼", summary: "上半年净利22.94亿 +30.69%（消费复苏）", sentiment: "up", market: "cn" },
    { date: "08-12", name: "工业富联", summary: "营收5578.61亿+54.63%、净利237.4亿+95.99%（AI服务器兑现）", sentiment: "up", market: "cn" },
    { date: "08-11", name: "江波龙", summary: "净利105.77亿 +71528.66%，营收+136.26%，拟4-8亿回购", sentiment: "up", market: "cn" },
    { date: "08-13", name: "中芯国际/华虹", summary: "中芯Q2拥有人应占利润4.79亿美元+261.7%、华虹+385.9%（半导体代工兑现）", sentiment: "up", market: "cn" },
    { date: "08-11", name: "芯联集成", summary: "净利2.78亿扭亏为盈（半导体代工）", sentiment: "up", market: "cn" },
    { date: "08-11", name: "南模生物", summary: "净利预降 44.96%-55.97%（股份支付费用大增）", sentiment: "down", market: "cn" },
    { date: "08-11", name: "京投发展", summary: "上半年亏损3.13亿（上年同期亏2.63亿）", sentiment: "down", market: "cn" },
    { date: "08-11", name: "赣粤高速", summary: "半年净利同比 -72.81%", sentiment: "down", market: "cn" },
    { date: "08-10", name: "寒武纪", summary: "上半年净利23.11亿 +122.61%（AI算力兑现）", sentiment: "up", market: "cn" },
    { date: "08-07", name: "天能股份", summary: "净利预降 65.46%-68.92%（硫酸涨价+政策调整）", sentiment: "down", market: "cn" },
    { date: "08-06", name: "百济神州", summary: "净利32.71亿 +627%，上调全年指引", sentiment: "up", market: "cn" }
  ]
};
