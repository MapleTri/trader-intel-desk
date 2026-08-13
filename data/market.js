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
 * ★ 2026-08-13 校验：8/12（周三）收盘口径统一——A股（上证3946.68+0.32/深成指14414.43+1.09/创业板3602.08+1.49，证券时报/证券日报）；韩股（KOSPI 6579.04+3.68、KOSDAQ 858.91+0.12、三星255000韩元+6.68、SK海力士1504000韩元+5.54、现代汽车409500韩元+1.61，韩联社/纽斯频/BusinessKorea）；美股（道指53770.27-0.04、纳指26588.49+0.54、标普7748.50+0.26、NVDA 224.09+3.03、TSLA-1.59、WTI 83.27+0.08、COMEX 12月金4483.30+0.95，财联社/新浪/新华财经）。
 *   8/13盘中：KOSPI 11:20 +4.19%报6855（三星+5.48%/SK海力士+7.55%/三星电机+12.73%，韩联社）、开盘+2.96%报6773.92；A股午盘上证+0.42%报3963.15/深成指+0.73%/创业板+1.61%报3660.25（半日56涨停/0跌停、放量2076亿，证券时报/中新经纬）；腾讯港股低开3.68%报446.8港元。
 */
window.TID_MARKET = {
  cards: [
    { name: "上证指数",       change: 0.32, market: "cn" },
    { name: "深证成指",       change: 1.09, market: "cn" },
    { name: "创业板指",       change: 1.49, market: "cn" },
    { name: "KOSPI",          change: 3.68, market: "kr" },
    { name: "KOSDAQ",         change: 0.12, market: "kr" },
    { name: "三星电子",       change: 6.68, market: "kr" },
    { name: "SK海力士",       change: 5.54, market: "kr" },
    { name: "现代汽车",       change: 1.61, market: "kr" },
    { name: "纳斯达克",       change: 0.54, market: "us" },
    { name: "标普500",        change: 0.26, market: "us" },
    { name: "道琼斯",         change: -0.04, market: "us" },
    { name: "英伟达",         change: 3.03, market: "us" },
    { name: "特斯拉",         change: -1.59, market: "us" },
    { name: "WTI 原油",       change: 0.08, market: "us" },
    { name: "COMEX黄金",      change: 0.95, market: "us" }
  ],
  sectors: {
    asOf: "8/12 收盘（申万一级）",
    leaders: [
      { name: "房地产", change: 3.46 },
      { name: "通信",   change: 3.37 },
      { name: "综合",   change: 3.09 },
      { name: "电子",   change: 2.05 },
      { name: "机械设备", change: 1.28 }
    ],
    laggards: [
      { name: "石油石化", change: -1.55 },
      { name: "煤炭",   change: -1.42 },
      { name: "家用电器", change: -0.67 },
      { name: "公用事业", change: -0.45 },
      { name: "银行",   change: -0.34 }
    ],
    flows: [
      { name: "通信",   amount: 129.03 },
      { name: "电子",   amount: 125.77 },
      { name: "电力设备", amount: 41.71 }
    ],
    rotation: "8/12普涨修复：涨停96家/跌停0家（近期首次零跌停）/炸板率12.4%、成交2.15万亿连续三日缩量（2.54→2.32→2.15）；主力净流入324.27亿——通信净流入129.03亿/电子125.77亿居首（芯片概念+229.4亿、CPO+165亿），「科技硬件+地产+消费」双轮驱动（房地产+3.46%领涨10股涨停、光通信/CPO/算力租赁活跃、百花医药7连板），医药生物主力净流出24.87亿居首（创新药高位分化）；石油石化-1.55%/煤炭-1.42%逆势调整。8/13盘中：A股三大指数高开高走，创业板午盘+1.61%报3660.25（CRO/创新药大涨：博济医药/万邦医药/陇神戎发涨停，CPO活跃：共进股份/天洋新材涨停、天孚通信一度+13%），贵金属/油气/工业金属回调，半日56涨停/0跌停、放量2076亿——CPI温和落地+费半+2.49%+腾讯资本开支超预期，存储/算力链三地共振强化；韩股8/13盘中再暴涨（KOSPI 11:20 +4.19%报6855、三星+5.48%/SK海力士+7.55%/三星电机+12.73%）。风险提示：腾讯港股低开3.68%（利润+0.7%逊预期）、Cerebras盘后-16%/Coherent盘后-5%提示高位波动，百花医药7连板后澄清不涉创新药研发、传智教育遭深交所重点监控——高位题材防分歧，美债10年拍卖收益率4.683%创2007年来新高为中期隐忧"
  },
  top10: {
    asOf: "8/12 收盘（申万一级）",
    gainers: [
      { name: "房地产",   change: 3.46 },
      { name: "通信",     change: 3.37 },
      { name: "综合",     change: 3.09 },
      { name: "电子",     change: 2.05 },
      { name: "机械设备", change: 1.28 },
      { name: "电力设备", change: 1.27 },
      { name: "轻工制造", change: 1.26 },
      { name: "环保",     change: 1.22 },
      { name: "有色金属", change: 1.17 },
      { name: "社会服务", change: 1.15 }
    ],
    losers: [
      { name: "石油石化", change: -1.55 },
      { name: "煤炭",   change: -1.42 },
      { name: "家用电器", change: -0.67 },
      { name: "公用事业", change: -0.45 },
      { name: "银行",   change: -0.34 },
      { name: "医药生物", change: -0.09 }
    ]
  },
  gauge: {
    asOf: "8/12 收盘",
    limitUp: 96,
    limitDown: 0,
    breakRate: 12.4,
    ladder: [
      { height: "7板",   stocks: ["百花医药（创新药）"] },
      { height: "4板",   stocks: ["秦安股份"] },
      { height: "3板",   stocks: ["一鸣食品", "京投发展"] },
      { height: "2板",   stocks: ["城地香江", "鸿博股份"] }
    ]
  }
};
