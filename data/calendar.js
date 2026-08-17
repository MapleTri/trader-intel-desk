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
 * ★ 2026-08-17（周一）更新：今日中国7月经济数据15:00发布（工业/社零/固投/70城房价，国新办发布会），为本周关键验证。8/17韩股休市（光复节补假）。
 *   解禁：本周（8/17-23）共29家442.65亿；8/17为解禁高峰10家316.57亿（广钢气体244.99亿居首占股本47.61%、固高科技26.89、德福科技22.89、亚通精工解禁比例63.34%最高）。
 *   业绩预告（8月披露季）：A股半年报进入高峰期，下周1100+只披露（中国平安/中际旭创/紫金矿业/兆易创新/天孚通信/恒瑞医药）。
 */
window.TID_CALENDAR = {
  asOf: "2026-08-17",
  macro: [
    { date: "08-17", name: "中国7月规模以上工业增加值/社会消费品零售/固定资产投资/70城房价（国新办15:00发布会）", expect: "工业+4.8%/社零+0.8~2.5%/固投累计-6.5%（长江证券/第一财经预测），7月PMI 49.2%重回荣枯线下、内需走弱", prev: "6月工业+5.3%", market: "cn" },
    { date: "08-17", name: "韩国光复节补假，韩股休市", expect: "关注8/18三星/SK海力士原股（SK海力士ADR 8/14收166.33）", prev: "—", market: "kr" },
    { date: "08-19", name: "美联储7月FOMC会议纪要（周三，关注加息/按兵不动分歧）", expect: "7月9-3按兵不动、3位票委投加息；纪要寻政策路径线索", prev: "—", market: "us" },
    { date: "08-19", name: "美国7月零售销售（8/14已公布环比-0.6%创去年5月来最大降幅）+英国7月CPI", expect: "消费疲软缓解9月加息预期", prev: "—", market: "us" },
    { date: "08-20", name: "中国8月LPR报价（1年期/5年期以上，已连续14个月不变）", expect: "关注是否下调（若下调利好地产/银行信贷，对冲7月内需走弱）", prev: "1年期3.0%/5年期3.5%", market: "cn" },
    { date: "08-20", name: "阿里巴巴/网易/百度Q2财报（港股）+A股半年报高峰", expect: "中概科网AI资本开支与业绩兑现", prev: "—", market: "cn" },
    { date: "08-20", name: "美国周初请失业金 + 8月费城联储制造业指数", expect: "劳动力市场是否续降温", prev: "—", market: "us" },
    { date: "08-21", name: "美国8月标普全球制造业/服务业PMI初值 + 全球8月PMI", expect: "通胀与就业双验证", prev: "—", market: "us" },
    { date: "08-21", name: "恒生指数Q2检讨结果公布", expect: "成份股变动9/7及9/14生效", prev: "—", market: "cn" },
    { date: "09月", name: "美联储FOMC议息（9月加息概率回落至32.5%）", expect: "CME 9月维持利率不变概率67.5%", prev: "7月会议3位票委投加息", market: "us" }
  ],
  unlock: [
    { date: "08-17", name: "广钢气体", scale: "解禁 244.99亿（6.28亿股，占股本47.61%，今日解禁最大/8月高峰）", market: "cn" },
    { date: "08-17", name: "固高科技", scale: "解禁 26.89亿（1.01亿股，占股本24.94%）", market: "cn" },
    { date: "08-17", name: "德福科技", scale: "解禁 22.89亿", market: "cn" },
    { date: "08-17", name: "亚通精工", scale: "解禁比例 63.34%（当日最高）", market: "cn" },
    { date: "08-17", name: "中船科技", scale: "解禁 36.64亿（4.17亿股）", market: "cn" },
    { date: "8/17-23", name: "合计442.65亿（29家）", scale: "8/17为高峰10家316.57亿；广钢气体244.99亿居首", market: "cn" },
    { date: "12月", name: "全月超6000亿", scale: "2026年解禁压力最大月份", market: "cn" }
  ],
  earnings: [
    { date: "08-14", name: "贵州茅台", summary: "上半年营收+1.47%、净利-1.95%（增收不增利）、经营现金流706.91亿+438.84%、中央汇金/证金退出十大股东", sentiment: "down", market: "cn" },
    { date: "08-16", name: "生益科技", summary: "上半年营收190.26亿+50.05%、净利32.87亿+130.42%（覆铜板/CCL景气验证，应收账款+50.2%需关注）", sentiment: "up", market: "cn" },
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
