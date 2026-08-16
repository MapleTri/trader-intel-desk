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
 * ★ 2026-08-16（周日）校验：统一口径——A股 8/14（周五）收盘：上证3927.18+0.01/深成指14354.31+0.45/创业板3626.30+1.12（上证报，成交2.14万亿缩量4081亿/涨停63/跌停13）；韩股 8/14（周五）收盘：KOSPI 6977.94+2.42（盘中破7000最高7010.86、外资单日净买3.038万亿韩元创纪录，纽斯频/朝鲜日报）、KOSDAQ 864.65+0.38（三星+2.43%/SK海力士+3.26%/现代汽车+8.24%）；美股 8/14（周五）收盘：道指53732.41-0.20/纳指26729.16-0.28/标普7785.76-0.17、费半-0.31，NVDA-0.06/TSLA+0.68、WTI 82.40+1.4、现货金4375.67+0.6（证券时报/新浪财经/上证报）；今日周日休市，数据为周五(8/14)收盘口径，收录周末海外新闻（中芯华虹Q2/30年美债5.216%新高/美联储暂停RMP/SK海力士赴美选址）。
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
      { name: "通信",   amount: 141.00 },
      { name: "食品饮料", amount: 11.83 },
      { name: "房地产", amount: 7.72 }
    ],
    rotation: "周末海外催化密集：中芯/华虹Q2营收齐创新高（中芯首破30亿美元净利+261.7%、华虹+385.9%）、SK海力士董事长「芯片通胀」警示+赴美选址前端晶圆厂、美30年美债标售5.216%创2001年来新高——利好晶圆代工/存储链/半导体设备，但美债长端上行独立压制高估值成长；回顾8/14缩量回稳、高位退潮：上证+0.01%报3927.18、成交2.14万亿缩量4081亿、涨停63/跌停13/炸板率23%、连板晋级率16.4%（低于25%健康线）、高度7→5→3板逐级压缩——「科技反抽、接力退潮」：通信+3.45%领涨（主力净流入141亿居首、亨通光电+31.78亿/网宿科技+20.64亿/CPO光模块净流入，本周首次「科技线资金+涨停」双印证但属8/12主线反抽）、美容护理-1.86%/公用事业-1.75%领跌；医药「吃药」内部高低切（百花医药断板、开开实业7天5板反包）；蓝盾光电20cm5板为独苗高度锚；下周一（8/17）关键=蓝盾光电竞价+中石科技分歧（CPO散热）+晋级率能否回30%+成交能否回2.3万亿+世界机器人大会（8/19-23）催化，若高标继续退潮则进入缩量阴跌冰点期；8/17为A股解禁高峰（广钢气体236亿）"
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
    asOf: "8/14 收盘",
    limitUp: 63,
    limitDown: 13,
    breakRate: 23,
    ladder: [
      { height: "5板",   stocks: ["蓝盾光电（20cm光通信）"] },
      { height: "3板",   stocks: ["澳洋健康", "天洋新材", "华西股份"] },
      { height: "2板",   stocks: ["博济医药", "神奇制药", "金螳螂", "坤泰股份", "思看科技"] },
      { height: "连板晋级率16.4%", stocks: ["高度7→5→3板逐级压缩，退潮期"] }
    ]
  }
};
