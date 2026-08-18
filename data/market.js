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
 * ★ 2026-08-18（周二）校验：统一口径——A股 8/17（周一）收盘：上证3982.65+1.41/深成指14704.27+2.44/创业板3740.16+3.14/科创综指2099.06+3.89（证券时报/上海证券报，成交2.4万亿放量2459亿/涨停63/炸板19/封板率77%/连板晋级率45.45%）；韩股 8/17（周一）收盘：KOSPI 6977.94+2.42（外资净买）、KOSDAQ 864.65+0.38；8/18（周二）早盘韩股大涨：KOSPI 7126.81+2.13、KOSDAQ 852.93-1.36（三星+3.46%/SK海力士+6.32%/现代汽车-0.88%，韩联社）；美股 8/17（周一）收盘：道指53459.78-0.51/纳指26644.91-0.32/标普7745.06-0.52、费半+1.64，NVDA 225.01-0.07/TSLA 339.30-0.87、WTI 84.95+3.09、现货金4416.75+0.92（东方财富/新浪/澎湃）；今日周二，最新收盘统一8/17（周一）口径，韩股取8/18早盘盘中。
 */
window.TID_MARKET = {
  cards: [
    { name: "上证指数",       change: 1.41, market: "cn" },
    { name: "深证成指",       change: 2.44, market: "cn" },
    { name: "创业板指",       change: 3.14, market: "cn" },
    { name: "KOSPI",          change: 2.42, market: "kr" },
    { name: "KOSDAQ",         change: 0.38, market: "kr" },
    { name: "三星电子",       change: 3.46, market: "kr" },
    { name: "SK海力士",       change: 6.32, market: "kr" },
    { name: "现代汽车",       change: -0.88, market: "kr" },
    { name: "纳斯达克",       change: -0.32, market: "us" },
    { name: "标普500",        change: -0.52, market: "us" },
    { name: "道琼斯",         change: -0.51, market: "us" },
    { name: "英伟达",         change: -0.07, market: "us" },
    { name: "特斯拉",         change: -0.87, market: "us" },
    { name: "WTI 原油",       change: 3.09, market: "us" },
    { name: "伦敦金现",       change: 0.92, market: "us" }
  ],
  sectors: {
    asOf: "8/17 收盘（申万一级）",
    leaders: [
      { name: "电子",   change: 4.61 },
      { name: "通信",   change: 4.19 },
      { name: "机械设备", change: 1.80 },
      { name: "电力设备", change: 1.60 },
      { name: "有色金属", change: 1.40 }
    ],
    laggards: [
      { name: "食品饮料", change: -1.87 },
      { name: "传媒",   change: -0.84 },
      { name: "银行",   change: -0.70 },
      { name: "公用事业", change: -0.55 },
      { name: "建筑装饰", change: -0.45 }
    ],
    flows: [
      { name: "电子",   amount: 342.26 },
      { name: "通信",   amount: 54.27 },
      { name: "机械设备", amount: 20.00 }
    ],
    rotation: "8/17(周一)A股科技全线爆发、全面进攻日：上证+1.41%报3982.65、创业板+3.14%突破3700创1个月新高、科创综指+3.89%，成交2.4万亿放量2459亿、超4300只上涨、超百股涨停——「科技主线」三重共振回归：半导体/存储/CPO/先进封装全线上攻，长鑫科技+12%报61.8元单日+4428亿重回4万亿市值（主力净流入556.93亿、电子+342.26亿居首/通信+54.27亿次席）、7月高技术制造业增加值+16.9%（存储芯片产量+30.2%）；涨停63家/炸板19家/封板率77%、连板晋级率45.45%（4连板金螳螂/澳洋健康/天洋新材、3连板共进股份/神奇制药）；但食品饮料-1.87%/传媒-0.84%领跌（白酒/影视/游戏走弱）；海外催化：美伊临时停火到期特朗普拒绝延长（WTI 84.95+3.09%、布油破90）、OpenAI与英伟达扩大合作（至多1050亿美元AI工厂）、美股存储逆势大涨（铠侠ADR+13%/闪迪+8.88%）、Anthropic年化营收超650亿美元；中国7月数据落地（工业+4.5%/社零+0.6%内需偏弱）验证政策组合拳必要性；韩股8/18早盘再大涨（KOSPI 7126.81+2.13%、SK海力士+6.32%）；本周主线=8/18百度港股财报+8/19 FOMC纪要+宇树科技8/19科创板上市+8/20 LPR+阿里/网易财报+8/21美8月PMI、8/19-23世界机器人大会+8/22人形机器人运动会；今日关注8/18 A股能否延续科技主升、共进股份800G风险提示后高位分化、爱丽家居复牌"
  },
  top10: {
    asOf: "8/17 收盘（申万一级）",
    gainers: [
      { name: "电子",   change: 4.61 },
      { name: "通信",   change: 4.19 },
      { name: "机械设备", change: 1.80 },
      { name: "电力设备", change: 1.60 },
      { name: "有色金属", change: 1.40 },
      { name: "基础化工", change: 1.30 },
      { name: "医药生物", change: 1.00 },
      { name: "国防军工", change: 0.90 }
    ],
    losers: [
      { name: "食品饮料", change: -1.87 },
      { name: "传媒",   change: -0.84 },
      { name: "银行",   change: -0.70 },
      { name: "公用事业", change: -0.55 },
      { name: "建筑装饰", change: -0.45 },
      { name: "煤炭",   change: -0.40 },
      { name: "非银金融", change: -0.30 },
      { name: "房地产", change: -0.20 }
    ]
  },
  gauge: {
    asOf: "8/17 收盘（封板率77%/晋级率45.45%）",
    limitUp: 63,
    limitDown: 13,
    breakRate: 23,
    ladder: [
      { height: "4板",   stocks: ["金螳螂", "澳洋健康", "天洋新材"] },
      { height: "3板",   stocks: ["共进股份（800G交换机）", "神奇制药（医药）"] },
      { height: "11天7板", stocks: ["风范股份"] },
      { height: "6天5板", stocks: ["一鸣食品"] },
      { height: "7天5板", stocks: ["誉衡药业（医药）"] },
      { height: "连板晋级率45.45%", stocks: ["科技主升日、短线情绪活跃；但高度降至4板，10cm接力意愿仍受制约（蓝盾光电20cm5板前高）"] }
    ]
  }
};
