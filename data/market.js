/**
 * data/market.js — 行情盘面数据
 * 更新方：每日 08:00 滚动周报自动化（weekly-rolling-brief）
 * 页面通过 window.TID_MARKET 读取。
 *
 * 字段契约：
 * - cards[]:    指数数据卡。change 为涨跌幅百分比数值（正=涨/红，负=跌/绿）；market ∈ cn|kr|us
 * - sectors:    板块动态（A股最近交易日）。leaders 领涨 / laggards 领跌 / flows 主力净流入(亿元) / rotation 轮动一句话
 * - top10:      P1 框架｜板块涨跌榜 TOP10（gainers/losers 各≤10条），{ name, change }
 * - gauge:      P1 框架｜情绪温度计（limitUp 涨停 / limitDown 跌停 / breakRate 炸板率% / ladder 连板梯队）
 * 说明：费城半导体 8/5 精确值数据源未返回，卡片以「黄金」补齐商品维度，费半走势见文字区。
 */
window.TID_MARKET = {
  cards: [
    { name: "上证指数",       change: 1.47, market: "cn" },
    { name: "深证成指",       change: 1.86, market: "cn" },
    { name: "创业板指",       change: 1.32, market: "cn" },
    { name: "KOSPI",          change: 3.76, market: "kr" },
    { name: "SK海力士(ADR)",  change: -2.17, market: "kr" },
    { name: "三星电子(盘中)",  change: -5.89, market: "kr" },
    { name: "纳斯达克",       change: -0.83, market: "us" },
    { name: "标普500",        change: -0.17, market: "us" },
    { name: "道琼斯",         change: 0.49, market: "us" },
    { name: "WTI 原油",       change: -0.91, market: "us" },
    { name: "COMEX黄金",      change: 3.74, market: "us" }
  ],
  sectors: {
    asOf: "8/5 收盘",
    leaders: [
      { name: "贵金属",     change: 7.87 },
      { name: "高带宽内存", change: 7.77 },
      { name: "中芯概念",   change: 6.82 },
      { name: "MLCC",       change: 6.74 },
      { name: "存储芯片",   change: 6.32 }
    ],
    laggards: [
      { name: "通信",     change: -1.65 },
      { name: "银行",     change: -1.14 },
      { name: "食品饮料", change: -1.07 }
    ],
    flows: [
      { name: "半导体",   amount: 130.3 },
      { name: "工业金属", amount: 65.1 },
      { name: "元件",     amount: 57.8 }
    ],
    rotation: "存量调仓迁徙：资金从红利防御（银行/电力/白酒）切向「科技成长+资源涨价」双主线，半导体净流入130亿、科创50两日+10%"
  },
  top10: {
    asOf: "8/5 收盘",
    gainers: [
      { name: "贵金属",     change: 7.87 },
      { name: "高带宽内存", change: 7.77 },
      { name: "中芯概念",   change: 6.82 },
      { name: "MLCC",       change: 6.74 },
      { name: "存储芯片",   change: 6.32 },
      { name: "小金属",     change: 6.23 },
      { name: "光刻机",     change: 5.97 },
      { name: "电子(申万)", change: 5.66 },
      { name: "有色金属(申万)", change: 5.34 },
      { name: "稀土",       change: 4.95 }
    ],
    losers: [
      { name: "通信",     change: -1.65 },
      { name: "银行",     change: -1.14 },
      { name: "食品饮料", change: -1.07 }
    ]
  },
  gauge: {
    asOf: "8/5 收盘",
    limitUp: 104,
    limitDown: 1,
    breakRate: 29.7,
    ladder: [
      { height: "8板",   stocks: ["传智教育"] },
      { height: "4板",   stocks: ["德龙汇能", "豪尔赛"] },
      { height: "3板",   stocks: ["欣天科技", "风范股份"] },
      { height: "8天4板", stocks: ["汇绿生态", "海星股份"] }
    ]
  }
};
