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
 * ★ 2026-08-17（周一）校验：统一口径——A股 8/14（周五）收盘：上证3927.18+0.01/深成指14354.31+0.45/创业板3626.30+1.12（上证报，成交2.14万亿缩量4081亿/涨停63/跌停13/封板率77%）；韩股 8/14（周五）收盘：KOSPI 6977.94+2.42（盘中破7000最高7010.86、外资单日净买3.038万亿韩元创纪录，纽斯频/朝鲜日报）、KOSDAQ 864.65+0.38（三星+2.43%/SK海力士+3.26%/现代汽车+8.24%）；美股 8/14（周五）收盘：道指53732.41-0.20/纳指26729.16-0.28/标普7785.76-0.17、费半-0.31，NVDA 225.16-0.06/TSLA 342.27+0.68、WTI 82.40+1.42、COMEX金4432+0.26（证券时报/新浪财经/上证报）；今日周一开盘前，最新收盘为8/14口径（韩股8/17光复节补假休市），重点关注今日15:00中国7月经济数据。
 */
window.TID_MARKET = {
  cards: [
    { name: "上证指数",       change: 0.01, market: "cn" },
    { name: "深证成指",       change: 0.45, market: "cn" },
    { name: "创业板指",       change: 1.12, market: "cn" },
    { name: "KOSPI",          change: 2.42, market: "kr" },
    { name: "KOSDAQ",         change: 0.38, market: "kr" },
    { name: "三星电子",       change: 2.43, market: "kr" },
    { name: "SK海力士",       change: 3.26, market: "kr" },
    { name: "现代汽车",       change: 8.24, market: "kr" },
    { name: "纳斯达克",       change: -0.28, market: "us" },
    { name: "标普500",        change: -0.17, market: "us" },
    { name: "道琼斯",         change: -0.20, market: "us" },
    { name: "英伟达",         change: -0.06, market: "us" },
    { name: "特斯拉",         change: 0.68, market: "us" },
    { name: "WTI 原油",       change: 1.40, market: "us" },
    { name: "伦敦金现",       change: 0.60, market: "us" }
  ],
  sectors: {
    asOf: "8/14 收盘（申万一级）",
    leaders: [
      { name: "通信",   change: 3.45 },
      { name: "综合",   change: 2.39 },
      { name: "建筑材料", change: 1.82 },
      { name: "煤炭",   change: 1.51 },
      { name: "有色金属", change: 1.30 }
    ],
    laggards: [
      { name: "美容护理", change: -1.86 },
      { name: "公用事业", change: -1.75 },
      { name: "农林牧渔", change: -1.56 },
      { name: "非银金融", change: -1.49 },
      { name: "商贸零售", change: -1.37 }
    ],
    flows: [
      { name: "通信",   amount: 100.19 },
      { name: "食品饮料", amount: 11.83 },
      { name: "房地产", amount: 7.72 }
    ],
    rotation: "新一周（8/17-8/23）开篇，今日焦点=中国7月经济数据15:00发布（预期工业+4.8%/社零+0.8~2.5%/固投累计-6.5%，7月PMI 49.2%重回荣枯线下、内需走弱，数据或偏弱但8/20 LPR若下调将对冲）；回顾上周8/14缩量回稳、高位退潮：上证+0.01%报3927.18、成交2.14万亿缩量4081亿、涨停63/跌停13/封板率77%、连板晋级率16.4%（低于25%健康线）、高度7→5→3板逐级压缩——「科技反抽、接力退潮」：通信+3.45%领涨（主力净流入100.19亿居首、亨通光电+24.97亿/CPO光通信净流入）、美容护理-1.86%/公用事业-1.75%领跌；周末海外催化：伊朗-阿曼就霍尔木兹通航达成协议（地缘缓和但主导权博弈未解，油价高波动）、宇树科技IPO超购5000倍中签率0.0181%创新低（8/19前后挂牌，人形机器人/具身智能估值锚）、央行《十五五》双支柱规划+8000亿特别国债清单下达（政策组合拳）；8/17韩股休市（光复节补假）关注8/18三星/SK海力士原股；本周主线=8/17中国7月数据+8/19 FOMC纪要+8/20 LPR+8/21美8月PMI、8/19-23世界机器人大会+8/22人形机器人运动会；下周一关键=蓝盾光电竞价+中石科技分歧+晋级率能否回30%+成交能否回2.3万亿"
  },
  top10: {
    asOf: "8/14 收盘（申万一级）",
    gainers: [
      { name: "通信",   change: 3.45 },
      { name: "综合",   change: 2.39 },
      { name: "建筑材料", change: 1.82 },
      { name: "煤炭",   change: 1.51 },
      { name: "有色金属", change: 1.30 },
      { name: "电子",   change: 1.30 },
      { name: "机械设备", change: 1.01 },
      { name: "环保",   change: 0.48 }
    ],
    losers: [
      { name: "美容护理", change: -1.86 },
      { name: "公用事业", change: -1.75 },
      { name: "农林牧渔", change: -1.56 },
      { name: "非银金融", change: -1.49 },
      { name: "商贸零售", change: -1.37 },
      { name: "食品饮料", change: -1.12 },
      { name: "房地产", change: -0.98 },
      { name: "医药生物", change: -0.82 }
    ]
  },
  gauge: {
    asOf: "8/14 收盘（封板率77%）",
    limitUp: 63,
    limitDown: 13,
    breakRate: 23,
    ladder: [
      { height: "5板",   stocks: ["蓝盾光电（20cm光通信）"] },
      { height: "7天5板", stocks: ["开开实业（医药）"] },
      { height: "3板",   stocks: ["澳洋健康", "天洋新材", "华西股份"] },
      { height: "2板",   stocks: ["博济医药", "神奇制药", "金螳螂", "坤泰股份", "思看科技"] },
      { height: "连板晋级率16.4%", stocks: ["高度7→5→3板逐级压缩，退潮期；8/17关注能否回30%"] }
    ]
  }
};
