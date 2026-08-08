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
 *   3) WebFetch/WebSearch 可靠站点兜底并注明来源：Investing.com(英为财情,指数实时页)、新浪财经全球行情、东方财富全球指数、同花顺国际财经、韩联社中文网(yna.cn)
 */
window.TID_MARKET = {
  cards: [
    { name: "上证指数",       change: 0.57, market: "cn" },
    { name: "深证成指",       change: -0.24, market: "cn" },
    { name: "创业板指",       change: -0.55, market: "cn" },
    { name: "KOSPI",          change: -0.57, market: "kr" },
    { name: "KOSDAQ",         change: 0.26, market: "kr" },
    { name: "三星电子",       change: 0.87, market: "kr" },
    { name: "SK海力士",       change: -5.08, market: "kr" },
    { name: "现代汽车",       change: -2.13, market: "kr" },
    { name: "纳斯达克",       change: -0.06, market: "us" },
    { name: "标普500",        change: -0.18, market: "us" },
    { name: "道琼斯",         change: -0.85, market: "us" },
    { name: "英伟达",         change: -0.10, market: "us" },
    { name: "特斯拉",         change: -0.63, market: "us" },
    { name: "WTI 原油",       change: 1.32, market: "us" },
    { name: "COMEX黄金",      change: 0.58, market: "us" }
  ],
  sectors: {
    asOf: "8/7 盘中",
    leaders: [
      { name: "玻璃玻纤",     change: 8.20 },
      { name: "元件",         change: 7.46 },
      { name: "医疗服务",     change: 6.09 },
      { name: "非金属材料",   change: 5.78 },
      { name: "生物制品",     change: 3.89 }
    ],
    laggards: [
      { name: "在线教育",   change: -0.73 },
      { name: "电力改革",   change: -0.66 },
      { name: "电力",       change: -0.65 },
      { name: "教育信息化", change: -0.59 },
      { name: "教育",       change: -0.54 }
    ],
    flows: [
      { name: "元件",     amount: 98.2 },
      { name: "半导体",   amount: 55.6 },
      { name: "通信设备", amount: 52.0 }
    ],
    rotation: "风格切向「顺周期+半导体材料」：玻璃玻纤/元件/CRO/PCB/靶材领涨，资金从电新（净流出108亿）/软件/教育/电力撤离；存储链受隔夜美股重挫压制（西数-13%），SK海力士盘中-5%传导A股半导体承压"
  },
  top10: {
    asOf: "8/7 盘中",
    gainers: [
      { name: "电子布",     change: 8.24 },
      { name: "玻璃玻纤",   change: 8.20 },
      { name: "CRO",        change: 8.10 },
      { name: "元件",       change: 7.46 },
      { name: "电子树脂",   change: 6.59 },
      { name: "博通概念",   change: 6.58 },
      { name: "靶材",       change: 6.27 },
      { name: "锗镓概念",   change: 6.23 },
      { name: "医疗服务",   change: 6.09 },
      { name: "非金属材料", change: 5.78 }
    ],
    losers: [
      { name: "在线教育",   change: -0.73 },
      { name: "电力改革",   change: -0.66 },
      { name: "电力",       change: -0.65 },
      { name: "教育信息化", change: -0.59 },
      { name: "教育",       change: -0.54 }
    ]
  },
  gauge: {
    asOf: "8/6 收盘（8/7午盘涨停60家）",
    limitUp: 79,
    limitDown: 1,
    breakRate: 20.2,
    ladder: [
      { height: "10板",   stocks: ["爱丽家居"] },
      { height: "5板",    stocks: ["豪尔赛"] },
      { height: "4板",    stocks: ["欣天科技", "风范股份"] },
      { height: "9天5板", stocks: ["汇绿生态"] },
      { height: "5天4板", stocks: ["宝鼎科技"] }
    ]
  }
};
