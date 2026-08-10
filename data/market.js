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
 *
 * ★ 2026-08-10 校验：周一开盘前——A股/美股为 8/7 收盘（neodata 结构化确认：纳指 26690.62 +1.30%、道指 54036.93 +0.28%、NVDA 223.96 +2.27%、TSLA 328.58 +2.83%、KOSPI 6258.77、三星 231000 +0.22%、SK海力士 1422000 -4.88%、现代 395500 -1.13%、KOSDAQ 798.81 -0.36%）；KOSPI 今日开盘 +0.8% 报 6306.33（新浪7x24 08:00）；WTI/COMEX金为 8/9 夜盘延时快照（WTI 78.84 +0.84% 与今晨媒体 +0.87% 吻合）
 */
window.TID_MARKET = {
  cards: [
    { name: "上证指数",       change: 1.02, market: "cn" },
    { name: "深证成指",       change: 1.42, market: "cn" },
    { name: "创业板指",       change: 1.35, market: "cn" },
    { name: "KOSPI",          change: 0.80, market: "kr" },
    { name: "KOSDAQ",         change: -0.36, market: "kr" },
    { name: "三星电子",       change: 0.22, market: "kr" },
    { name: "SK海力士",       change: -4.88, market: "kr" },
    { name: "现代汽车",       change: -1.13, market: "kr" },
    { name: "纳斯达克",       change: 1.30, market: "us" },
    { name: "标普500",        change: 0.62, market: "us" },
    { name: "道琼斯",         change: 0.28, market: "us" },
    { name: "英伟达",         change: 2.27, market: "us" },
    { name: "特斯拉",         change: 2.83, market: "us" },
    { name: "WTI 原油",       change: 0.84, market: "us" },
    { name: "COMEX黄金",      change: 0.01, market: "us" }
  ],
  sectors: {
    asOf: "8/7 收盘",
    leaders: [
      { name: "CRO",         change: 10.63 },
      { name: "医疗服务",     change: 8.40 },
      { name: "玻璃玻纤",     change: 7.11 },
      { name: "锗镓概念",     change: 6.91 },
      { name: "元件",         change: 6.74 }
    ],
    laggards: [
      { name: "跨境支付", change: -1.82 },
      { name: "数字货币", change: -1.70 },
      { name: "财税数字化", change: -1.69 },
      { name: "家用电器", change: -0.86 },
      { name: "银行",     change: -0.65 }
    ],
    flows: [
      { name: "电子",     amount: 283.0 },
      { name: "医药生物", amount: 88.5 },
      { name: "有色金属", amount: 40.3 }
    ],
    rotation: "周一消息面驱动：创新药（药明康德胜诉1260H初步禁令）+存储链（SK海力士710亿美元股东回报+V10 NAND键合、长鑫纳入MSCI+瑞银首覆70元、苹果测试长鑫DRAM）周末利好共振，科技催化周开启（宇树打新/长鑫入MSCI 8/10）；但美伊博弈中段今晨油价拉升（WTI一度+1.66%）或扰动石油链，且A股8/7中际旭创盘中跳水显示科技上方套牢盘压力未消，高开需防冲高回落"
  },
  top10: {
    asOf: "8/7 收盘",
    gainers: [
      { name: "CRO",       change: 10.63 },
      { name: "医疗服务",   change: 8.40 },
      { name: "玻璃玻纤",   change: 7.11 },
      { name: "锗镓概念",   change: 6.91 },
      { name: "元件",       change: 6.74 },
      { name: "电子布",     change: 6.64 },
      { name: "电子树脂",   change: 6.62 },
      { name: "减肥药",     change: 6.60 },
      { name: "靶材",       change: 6.11 },
      { name: "生物制品",   change: 6.06 }
    ],
    losers: [
      { name: "天津自贸区", change: -1.98 },
      { name: "跨境支付",   change: -1.82 },
      { name: "数字货币",   change: -1.70 },
      { name: "财税数字化", change: -1.69 },
      { name: "电子身份证", change: -1.69 },
      { name: "数字水印",   change: -1.52 },
      { name: "国产操作系统", change: -1.47 },
      { name: "移动支付",   change: -1.36 },
      { name: "家用电器",   change: -0.86 },
      { name: "银行",       change: -0.65 }
    ]
  },
  gauge: {
    asOf: "8/7 收盘",
    limitUp: 74,
    limitDown: 4,
    breakRate: 26.0,
    ladder: [
      { height: "4板",   stocks: ["百花医药", "云南锗业", "宝鼎科技", "汇绿生态", "沃格光电"] },
      { height: "3板",   stocks: ["和远气体", "有研新材"] },
      { height: "2板",   stocks: ["武汉凡谷", "通宇通讯", "景旺电子", "方正科技", "锴威特", "开开实业"] },
      { height: "6天5板", stocks: ["宝鼎科技"] },
      { height: "10天5板", stocks: ["汇绿生态"] }
    ]
  }
};
