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
 * ★ 2026-08-12 校验：8/11（周二）收盘口径统一——A股（上证3934.09-0.82/深成指14259.44-0.40/创业板3549.16+0.34，证券时报）；韩股（KOSPI 6345.53+0.73、KOSDAQ 857.84+0.39、三星239500韩元+4.13、SK海力士142万韩元+0.35、现代403000韩元-1.23，纽斯频/韩联社）；美股（道指53791.85-0.34、纳指26445.45-0.60、标普7728.20-0.32、NVDA 217.50-0.02、TSLA+0.58、WTI 83.20+1.30、COMEX金4427.80+0.18，证券时报/中新经纬/每日经济新闻）。
 *   8/12盘中：KOSPI +2.35%报6494.71破6500（三星+4.18%/SK海力士+3.02%/SK Square+6.35%，9:15朝鲜日报）、KOSDAQ 842.19-1.82%（9:33 BigGo）；A股创业板指+0.91%（10:11）、上证+0.10%；港股恒指-1.15%、腾讯-2.25%（业绩前，10:12）
 */
window.TID_MARKET = {
  cards: [
    { name: "上证指数",       change: -0.82, market: "cn" },
    { name: "深证成指",       change: -0.40, market: "cn" },
    { name: "创业板指",       change: 0.34, market: "cn" },
    { name: "KOSPI",          change: 0.73, market: "kr" },
    { name: "KOSDAQ",         change: 0.39, market: "kr" },
    { name: "三星电子",       change: 4.13, market: "kr" },
    { name: "SK海力士",       change: 0.35, market: "kr" },
    { name: "现代汽车",       change: -1.23, market: "kr" },
    { name: "纳斯达克",       change: -0.60, market: "us" },
    { name: "标普500",        change: -0.32, market: "us" },
    { name: "道琼斯",         change: -0.34, market: "us" },
    { name: "英伟达",         change: -0.02, market: "us" },
    { name: "特斯拉",         change: 0.58, market: "us" },
    { name: "WTI 原油",       change: 1.30, market: "us" },
    { name: "COMEX黄金",      change: 0.18, market: "us" }
  ],
  sectors: {
    asOf: "8/11 收盘（申万一级）",
    leaders: [
      { name: "通信",     change: 1.13 },
      { name: "石油石化", change: 0.50 },
      { name: "医药生物", change: 0.31 },
      { name: "公用事业", change: 0.27 },
      { name: "家用电器", change: 0.20 }
    ],
    laggards: [
      { name: "有色金属", change: -4.42 },
      { name: "国防军工", change: -2.38 },
      { name: "基础化工", change: -1.57 },
      { name: "钢铁",     change: -1.52 },
      { name: "交通运输", change: -1.43 }
    ],
    flows: [
      { name: "通信",   amount: 32.19 },
      { name: "建筑装饰", amount: 9.99 },
      { name: "汽车",   amount: 8.13 }
    ],
    rotation: "8/11缩量整固+高低切换：两市主力净流出102.8亿、成交2.32万亿缩量2021亿；创新药逆势强势（百花医药6连板、万邦医药20cm、甘李药业/哈药涨停），人形机器人午后异动（斯菱智驱20cm、巨轮智能2分钟涨停），MLCC/被动元件活跃（洁美科技涨停）；有色-4.42%重挫（主力净流出57.6亿）+军工-2.38%，资金从资源股撤向医药/科技。8/12盘中A股低开高走翻红（创业板+0.91%、超4000股上涨，算力租赁/影视/工业母机/食品饮料活跃、油气/电力调整）——韩股半导体暴涨（KOSPI破6500、三星+4.18%）、费半+0.87%存储领涨，存储/算力链三地共振；今晚20:30美CPI（共识3.4%/核心2.5%）为关键变量，谨防创新药高位「对子价」见顶信号与油价（WTI 83.2、伊朗称海峡不开放）扰动；韩股注意：KOSDAQ 8/12盘中-1.82%，资金从中小盘回流主板，韩股「弃成长、买存储」再切换"
  },
  top10: {
    asOf: "8/11 收盘（申万一级）",
    gainers: [
      { name: "通信",     change: 1.13 },
      { name: "石油石化", change: 0.50 },
      { name: "医药生物", change: 0.31 },
      { name: "公用事业", change: 0.27 },
      { name: "家用电器", change: 0.20 },
      { name: "纺织服饰", change: 0.11 }
    ],
    losers: [
      { name: "有色金属", change: -4.42 },
      { name: "国防军工", change: -2.38 },
      { name: "基础化工", change: -1.57 },
      { name: "钢铁",     change: -1.52 },
      { name: "交通运输", change: -1.43 },
      { name: "农林牧渔", change: -1.21 },
      { name: "社会服务", change: -1.21 },
      { name: "非银金融", change: -0.92 },
      { name: "美容护理", change: -0.90 },
      { name: "电子",     change: -0.87 }
    ]
  },
  gauge: {
    asOf: "8/11 收盘（涨停/跌停/封板率）· 8/12 早盘（连板梯队）",
    limitUp: 60,
    limitDown: 2,
    breakRate: 74.07,
    ladder: [
      { height: "7板",   stocks: ["百花医药（创新药）"] },
      { height: "3板",   stocks: ["皇氏集团", "北京文化", "华东数控"] },
      { height: "2板",   stocks: ["城地香江", "云赛智联"] }
    ]
  }
};
