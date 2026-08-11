/**
 * data/market.js — 行情盘面数据
 * 更新方：每日 08:00 滚动周报自动化（weekly-rolling-brief）/ 手动触发
 * 页面通过 window.TID_MARKET 读取。
 *
 * 字段契约：
 * - cards[]:    指数/龙头股数据卡。change 为涨跌幅百分比数值（正=涨/红，负=跌/绿）；market ∈ cn|kr|us
 *               ★ 2026-08-06 起扩展为「中韩美指数 + 龙头股」共 15 卡（韩股 5：KOSPI/KOSDAQ/三星/SK海力士/现代汽车；美股 7：纳指/标普/道指/英伟达/特斯拉/WTI/黄金），数量可增减，渲染引擎按 market 自动分组
 * - sectors:    板块动态（A股最近交易日）。leaders 领涨 / laggards 领跌 / flows 主力净流入(亿元) / rotation 轮动一句话
 * - top10:      板块涨跌榜 TOP10（gainers/losers 各≤10条），{ name, change }
 * - gauge:      情绪温度计（limitUp 涨停 / limitDown 跌停 / breakRate 炸板率% / ladder 连板梯队）
 *
 * 韩/美行情数据源（2026-08-06 定稿，缺项逐级兜底）：
 *   1) neodata-financial-search：韩股个股（三星005930.KS/SK海力士000660.KS/现代005380.KS）、美股个股（NVDA/TSLA）、指数
 *   2) westock-data：--market kr / 美股指数补充
 *   3) WebFetch/WebSearch 可靠站点兜底并注明来源：Investing.com(英为财情,指数实时页)、新浪财经全球行情、东方财富全球指数、同花顺国际财经、韩联社中文网(yna.cn)、朝鲜日报英文网(biz.chosun.com)、纽斯频(newspim)、BusinessKorea
 *
 * ★ 2026-08-11 校验：8/10（周一）收盘口径统一——A股（上证3966.59+0.67/深成指14316.96+0.04/创业板3537.21-0.73，证券时报）；韩股（KOSPI 6299.66+0.65、KOSDAQ 854.47+6.97、三星230000-0.43、SK海力士1420000-0.14、现代408000+3.16，韩联社/纽斯频）；美股（道指53975.98-0.11、纳指26605.36-0.32、标普7753.11-0.06、NVDA 217.55-2.86、TSLA 330.88+0.70、WTI 82.30+5.27、COMEX金4448.6+1.11，证券时报/东方财富）。8/11盘中：KOSPI 6339.54+0.63、三星+3.26%、SK海力士-0.42%、KOSDAQ 847.55-0.81（朝鲜日报11:07）；A股创业板指+1.48%转涨（11:09）
 */
window.TID_MARKET = {
  cards: [
    { name: "上证指数",       change: 0.67, market: "cn" },
    { name: "深证成指",       change: 0.04, market: "cn" },
    { name: "创业板指",       change: -0.73, market: "cn" },
    { name: "KOSPI",          change: 0.65, market: "kr" },
    { name: "KOSDAQ",         change: 6.97, market: "kr" },
    { name: "三星电子",       change: -0.43, market: "kr" },
    { name: "SK海力士",       change: -0.14, market: "kr" },
    { name: "现代汽车",       change: 3.16, market: "kr" },
    { name: "纳斯达克",       change: -0.32, market: "us" },
    { name: "标普500",        change: -0.06, market: "us" },
    { name: "道琼斯",         change: -0.11, market: "us" },
    { name: "英伟达",         change: -2.86, market: "us" },
    { name: "特斯拉",         change: 0.70, market: "us" },
    { name: "WTI 原油",       change: 5.27, market: "us" },
    { name: "COMEX黄金",      change: 1.11, market: "us" }
  ],
  sectors: {
    asOf: "8/10 收盘",
    leaders: [
      { name: "贵金属",     change: 3.9 },
      { name: "农林牧渔",   change: 3.14 },
      { name: "食品饮料",   change: 2.51 },
      { name: "纺织服饰",   change: 2.40 },
      { name: "煤炭",       change: 2.0 }
    ],
    laggards: [
      { name: "通信",   change: -3.16 },
      { name: "电子",   change: -0.49 },
      { name: "计算机", change: -0.26 }
    ],
    flows: [
      { name: "医药生物", amount: 68.0 },
      { name: "基础化工", amount: 30.0 },
      { name: "食品饮料", amount: 30.0 }
    ],
    rotation: "8/10高低切换明显：资金从高位科技（电子-211亿/通信-135亿净流出）切向消费/医药/贵金属（医药生物+68亿、农林牧渔+24亿），寒武纪-6.33%/中际旭创-6.01%拖累双创、上证五连阳距年线一步；贵金属近4%创3个月新高、军工尾盘异动（北方长龙20cm涨停）。8/11盘中科技修复（创业板指+1.48%转涨、江波龙+4.88%、MLCC抢料双星新材涨停）但存储/算力高位分歧未消——韩股三星8/11盘中+3.26%反弹联动A股存储链，警惕8/12美CPI（预期3.3%）与油价+5.27%（美伊+鹰派联储）的滞胀扰动；韩股注意：KOSDAQ 8/10单日+6.97%后8/11盘中回落-0.81%，存储杠杆监管后波动加大"
  },
  top10: {
    asOf: "8/10 收盘（缺精确值的概念板块未列）",
    gainers: [
      { name: "贵金属",   change: 3.9 },
      { name: "农林牧渔", change: 3.14 },
      { name: "食品饮料", change: 2.51 },
      { name: "纺织服饰", change: 2.40 },
      { name: "煤炭",     change: 2.0 }
    ],
    losers: [
      { name: "通信",   change: -3.16 },
      { name: "电子",   change: -0.49 },
      { name: "计算机", change: -0.26 }
    ]
  },
  gauge: {
    asOf: "8/10 收盘（涨停/跌停）· 8/11 早盘（连板梯队）",
    limitUp: 103,
    limitDown: 5,
    breakRate: null,
    ladder: [
      { height: "12天11板(停牌核查)", stocks: ["爱丽家居"] },
      { height: "6板",   stocks: ["百花医药"] },
      { height: "5板",   stocks: ["宝鼎科技"] },
      { height: "3板",   stocks: ["高争民爆", "开开实业"] },
      { height: "2板",   stocks: ["瑞康医药", "哈三联", "百普赛斯", "海正药业", "先导基电", "哈药股份", "秦安股份"] }
    ]
  }
};
