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
 * ★ 2026-08-14 校验：统一口径——A股 8/13（周三）收盘：上证3926.96-0.50/深成指14289.44-0.87/创业板3586.04-0.45（证券时报/中新经纬，放量2.55万亿/涨停59/跌停4）；韩股 8/13（周四）收盘：KOSPI 6813.34+3.56（自7/30低点累涨22%进技术性牛市，陆家嘴早餐）、KOSDAQ 861.37+0.29（econplex），8/14盘中：KOSPI破7000最高7010.86（+2.9%、SK海力士+5.78%/现代汽车+6.93%/三星+1.68%，Aju Press/格隆汇/东方财富）；美股 8/13（周四）收盘：道指53839.99+0.13/纳指26803.03+0.81/标普7798.99+0.65创历史新高、费半+0.46，NVDA+0.56/TSLA+3.8、WTI 81.21-2.47、伦敦金现4350.02-1.32（21经济/金融时报/证券时报）；8/14 A股盘中：沪+0.08/深+0.32/创+0.67高开，存储芯片/CPO/半导体领涨（中新经纬/第一财经）。
 */
window.TID_MARKET = {
  cards: [
    { name: "上证指数",       change: -0.50, market: "cn" },
    { name: "深证成指",       change: -0.87, market: "cn" },
    { name: "创业板指",       change: -0.45, market: "cn" },
    { name: "KOSPI",          change: 3.56, market: "kr" },
    { name: "KOSDAQ",         change: 0.29, market: "kr" },
    { name: "三星电子",       change: 1.68, market: "kr" },
    { name: "SK海力士",       change: 5.78, market: "kr" },
    { name: "现代汽车",       change: 6.93, market: "kr" },
    { name: "纳斯达克",       change: 0.81, market: "us" },
    { name: "标普500",        change: 0.65, market: "us" },
    { name: "道琼斯",         change: 0.13, market: "us" },
    { name: "英伟达",         change: 0.56, market: "us" },
    { name: "特斯拉",         change: 3.80, market: "us" },
    { name: "WTI 原油",       change: -2.47, market: "us" },
    { name: "伦敦金现",       change: -1.32, market: "us" }
  ],
  sectors: {
    asOf: "8/13 收盘（申万一级）+ 8/14 盘中",
    leaders: [
      { name: "医药生物", change: 1.13 },
      { name: "综合",   change: 0.93 },
      { name: "银行",   change: 0.52 },
      { name: "公用事业", change: 0.49 },
      { name: "通信",   change: 0.35 }
    ],
    laggards: [
      { name: "有色金属", change: -3.63 },
      { name: "建筑材料", change: -2.51 },
      { name: "房地产", change: -2.20 },
      { name: "基础化工", change: -2.04 },
      { name: "传媒",   change: -1.72 }
    ],
    flows: [
      { name: "医药生物", amount: 129.00 },
      { name: "通信",   amount: 25.77 },
      { name: "公用事业", amount: 17.40 }
    ],
    rotation: "8/13放量普跌高低切换：上证-0.50%报3926.96、成交2.55万亿放量3985亿（放量下跌=分歧量非进攻量）、涨停59/跌停4/炸板率37%、申万仅7个行业收红——资金从高估值周期资源（有色金属-3.63%净流出93.17亿全市场最大）+前期暴涨科技，切向医药防御（医药生物净流入129亿断崖领先、创新药单日47.19亿9股涨停，机构底仓配置特征）+银行/公用事业/电力（尾盘逆势拉升），「哑铃+中卫」策略、指数逼近年线压力位获利盘集中了结但3850-3900有支撑（腾讯/证券时报报道）；最高连板5板（秦安股份）、一鸣食品13天9板、百花医药7连板后巨量分歧降至5板。8/14盘中：A股高开存储芯片/CPO/半导体/电子化学品领涨（中石科技一字涨停——控股股东10.47%股份转让给中际旭创）、贵金属/油气/影视/工业金属领跌——隔夜美股存储暴涨+韩股破7000带动存储/算力链三地共振；港股低开（恒指-0.7%）科网普跌（京东-6%/联想-4%）芯片强（中芯国际+4%）；风险提示：皇氏集团4连板后8/14跌停、百花医药6次风险提示+传智教育遭监控，高位题材兑现压力，美联储内部分歧+美债长端隐忧仍在"
  },
  top10: {
    asOf: "8/13 收盘（申万一级）",
    gainers: [
      { name: "医药生物", change: 1.13 },
      { name: "综合",     change: 0.93 },
      { name: "银行",     change: 0.52 },
      { name: "公用事业", change: 0.49 },
      { name: "通信",     change: 0.35 },
      { name: "食品饮料", change: 0.34 },
      { name: "非银金融", change: 0.31 },
      { name: "农林牧渔", change: -0.41 }
    ],
    losers: [
      { name: "有色金属", change: -3.63 },
      { name: "建筑材料", change: -2.51 },
      { name: "房地产", change: -2.20 },
      { name: "基础化工", change: -2.04 },
      { name: "传媒",   change: -1.72 },
      { name: "纺织服饰", change: -1.71 },
      { name: "石油石化", change: -1.62 },
      { name: "轻工制造", change: -1.55 }
    ]
  },
  gauge: {
    asOf: "8/13 收盘",
    limitUp: 59,
    limitDown: 4,
    breakRate: 37,
    ladder: [
      { height: "5板",   stocks: ["秦安股份（人形机器人）"] },
      { height: "4板",   stocks: ["蓝盾光电", "北京文化", "京投发展", "皇氏集团", "同力天启"] },
      { height: "3板",   stocks: ["城地香江", "亚泰集团"] },
      { height: "连板总22只", stocks: ["一鸣食品13天9板"] }
    ]
  }
};
