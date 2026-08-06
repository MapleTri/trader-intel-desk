/**
 * data/brief.js — 滚动周报情报流（核心数据）
 * 更新方：每日 08:00 滚动周报自动化（weekly-rolling-brief）
 * 数据源底稿：金融情报\周报\滚动周报\滚动周报_<本周一>.md
 * 页面通过 window.TID_BRIEF 读取。
 *
 * 字段契约：
 * - quick[]:     30秒速览。sentiment ∈ up(利好/红)|down(利空/绿)|neu(中性/灰)
 * - yesterday[]: 🆕昨日新增（全量 5-10 条，日期倒序）。tag = 板块标签（含方向词）
 * - week / lastWeek: 4 类分节（policy 政策 / industry 行业 / company 公司 / overseas 海外），
 *                    节内日期倒序；analysis 为补充分析点（本周周报必有，上周回顾同构）
 * - summary:     一句话总结
 * 排序铁律：三区全部日期倒序（最新在前），同日按重要度排列。
 */
window.TID_BRIEF = {
  quick: [
    { sentiment: "up", text: "A股8/5放量普涨：沪指+1.47%、科创50+4.78%，成交2.66万亿，半导体+有色双主线，涨停104家" },
    { sentiment: "down", text: "隔夜美股分化：道指新高、纳指-0.83%；三星盘中-5.89%——存储链高位分歧，黄金避险大涨破4300美元" },
    { sentiment: "neu", text: "今日关注：周五美国非农、周六中国进出口/外储；8连板传智教育高位分歧，连板晋级率降至26%" }
  ],

  yesterday: [
    { date: "08-06", title: "隔夜美股分化：道指+0.49%续创新高、纳指-0.83%", tag: "利空 科技·半导体", market: "us", sentiment: "down" },
    { date: "08-06", title: "黄金大涨：COMEX金+3.74%破4300美元，ADP就业放缓降温加息担忧", tag: "利好 黄金·贵金属", market: "us", sentiment: "up" },
    { date: "08-06", title: "韩股存储链回调：三星盘中-5.89%、SK海力士ADR -2.17%", tag: "利空 存储链", market: "kr", sentiment: "down" },
    { date: "08-05", title: "A股放量普涨：科创50+4.78%、成交2.66万亿、涨停104家", tag: "利好 科技·有色", market: "cn", sentiment: "up" },
    { date: "08-05", title: "三大存储原厂2027年DRAM/HBM产能售罄、HBF高带宽闪存标准发布", tag: "利好 存储链", market: "cn", sentiment: "up" },
    { date: "08-05", title: "SEMI：2026全球半导体设备销售1659亿美元+23.2%创新高", tag: "利好 半导体设备", market: "cn", sentiment: "up" },
    { date: "08-05", title: "中际旭创-7.27%、成交675亿创单日历史天量", tag: "利空 光模块", market: "cn", sentiment: "down" },
    { date: "08-05", title: "申通快递被国家邮政局立案调查", tag: "利空 快递", market: "cn", sentiment: "down" },
    { date: "08-05", title: "宇树科技IPO初步询价（73天过会最快纪录）", tag: "利好 人形机器人", market: "cn", sentiment: "up" },
    { date: "08-05", title: "荣昌生物预盈47亿扭亏、百济神州Q2收入+30%", tag: "利好 创新药", market: "cn", sentiment: "up" }
  ],

  week: {
    policy: [
      { date: "08-04", title: "央行 5000 亿买断式逆回购加量", analysis: "流动性宽松+财政协同信号", tag: "利好 债市", market: "cn", sentiment: "up" },
      { date: "08-03", title: "证监会涉港 10 项举措", analysis: "跨境资金通道拓宽，支持港股境内上市、ETF快速注册", tag: "利好 券商·跨境金融", market: "cn", sentiment: "up" },
      { date: "08-03", title: "八部门科技金融政策", analysis: "设国家创投引导基金，支持优质未盈利科技企业上市", tag: "利好 创投·科技成长", market: "cn", sentiment: "up" },
      { date: "08-03", title: "新型电力系统「十五五」规划", analysis: "2030年新型储能3亿千瓦、核电1.1亿千瓦", tag: "利好 储能·核电", market: "cn", sentiment: "up" },
      { date: "08-03", title: "集成电路布图条例修订", analysis: "加大侵权赔偿力度，10/15施行", tag: "利好 半导体", market: "cn", sentiment: "up" }
    ],
    industry: [
      { date: "08-05", title: "存储超级周期确认：2027年DRAM/HBM产能售罄", analysis: "三大原厂产能售罄+HBF标准落地，NAND 8月敲定配额；Q2三星DRAM市占39%登顶", tag: "利好 存储链", market: "cn", sentiment: "up" },
      { date: "08-05", title: "A股科技+资源双主线共振", analysis: "电子+5.66%、有色+5.34%、半导体主力净流入130亿；存量调仓红利→成长+涨价", tag: "利好 半导体·有色", market: "cn", sentiment: "up" },
      { date: "08-04", title: "A股科技大反弹（通信+9.41%）", analysis: "超跌修复+外围共振，成交2.23万亿放量", tag: "利好 算力·光模块", market: "cn", sentiment: "up" },
      { date: "08-04", title: "长鑫获海外存储基金重仓（12.97%）", analysis: "Tema Memory ETF第一大重仓，外资认可国产存储链", tag: "利好 存储", market: "cn", sentiment: "up" },
      { date: "08-03", title: "储能 7 企集体涨价 2-30%", analysis: "低价内卷松动，盈利预期改善", tag: "利好 储能", market: "cn", sentiment: "up" },
      { date: "08-03", title: "Q3 PC DRAM 预计涨价 15-20%", analysis: "供应短缺延续涨价周期（TrendForce）", tag: "利好 存储链", market: "cn", sentiment: "up" }
    ],
    company: [
      { date: "08-05", title: "SpaceX首份财报-13.6%、AMD Q3指引不及预期", analysis: "海外AI龙头财报兑现度分化，支出超预期引发估值审视", tag: "利空 AI硬件映射", market: "us", sentiment: "down" },
      { date: "08-05", title: "荣昌生物预盈47亿扭亏", analysis: "RC148授权收入大增，创新药出海兑现", tag: "利好 创新药", market: "cn", sentiment: "up" },
      { date: "08-04", title: "中微预增 282%-311%", analysis: "上半年净利27-29亿，半导体设备国产替代放量", tag: "利好 半导体设备", market: "cn", sentiment: "up" },
      { date: "08-04", title: "药明半年报净利 +29.4%", analysis: "营收288.97亿+38.93%，10派5.1元，指引兑现", tag: "利好 CXO", market: "cn", sentiment: "up" },
      { date: "08-04", title: "阿里 Qwen3.8（2.4万亿参数）", analysis: "港股阿里+7%，国产大模型全球第一梯队", tag: "利好 AI应用", market: "cn", sentiment: "up" },
      { date: "08-04", title: "7月沪市回购增持 341 亿", analysis: "156家次、年内月度第一；阳光电源拟回购5-10亿", tag: "利好 高股息", market: "cn", sentiment: "up" },
      { date: "08-03", title: "宁德中期分红 61.8 亿", analysis: "10派14.11元，8/10除息，现金流充裕", tag: "利好 高股息", market: "cn", sentiment: "up" },
      { date: "08-03", title: "药明上调 2026 指引至 585-605 亿", analysis: "CXO景气回升，出海加速", tag: "利好 CXO", market: "cn", sentiment: "up" }
    ],
    overseas: [
      { date: "08-06", title: "隔夜美股分化：道指新高、纳指-0.83%、黄金+3.74%", analysis: "ADP就业放缓降温9月加息预期，避险领涨、存储尾盘跳水（闪迪/西数-5.4%）", tag: "利好 黄金；利空 科技", market: "us", sentiment: "neu" },
      { date: "08-05", title: "韩股存储链高位回调：三星盘中-5.89%", analysis: "KOSPI两日+5.5%后分歧加大，A股存储链短线承压联动", tag: "利空 存储链", market: "kr", sentiment: "down" },
      { date: "08-04", title: "韩股反弹：KOSPI +1.62%，SK海力士ADR +8.17%", analysis: "存储风向标回暖，传导A股存储链", tag: "利好 存储链", market: "kr", sentiment: "up" },
      { date: "08-04", title: "美股两连涨，费半 +6.55%", analysis: "道指标普创收盘新高，8月费半已反弹7%+", tag: "利好 半导体", market: "us", sentiment: "up" },
      { date: "08-04", title: "美伊协议预期升温，WTI 两日累跌超 10%", analysis: "贝森特称4或5日或达成，油价中枢下移", tag: "利空 石油链", market: "us", sentiment: "down" },
      { date: "08-04", title: "SpaceX 营收+92%、Palantir +30%", analysis: "AI应用商业化加速兑现（盘后一度跌7%）", tag: "中性 海外映射", market: "us", sentiment: "neu" },
      { date: "08-03", title: "美股大涨纳指 +2.13%", analysis: "美伊缓和油价跌5%，风险偏好回升", tag: "利好 科技", market: "us", sentiment: "up" },
      { date: "08-03", title: "美伊谈判开启，海峡重开未定", analysis: "伊朗已拒绝提议，地缘反复油价波动加大", tag: "中性 地缘", market: "us", sentiment: "neu" }
    ]
  },

  lastWeek: {
    range: "7/27 ~ 8/2",
    policy: [
      { date: "07-31", title: "国常会核准 8 台核电机组", analysis: "2026年首批，单项目超1700亿", tag: "利好 核电·电力设备", market: "cn", sentiment: "up" },
      { date: "07-31", title: "政治局会议定调扩内需居首", analysis: "发布《扩大消费「十五五」规划》", tag: "利好 消费·内需", market: "cn", sentiment: "up" }
    ],
    industry: [
      { date: "07月", title: "7月 ETF 净流入 4940 亿创纪录", analysis: "多只宽基ETF放量，增量资金持续托底", tag: "利好 宽基", market: "cn", sentiment: "up" },
      { date: "07-31", title: "A股反弹企稳：创业板 +3.06%", analysis: "超跌修复，情绪边际改善", tag: "利好 科技修复", market: "cn", sentiment: "up" },
      { date: "07-28", title: "「黑色星期二」：创业板 -7.35%", analysis: "AI硬件重挫（中际旭创-15%），恐慌集中释放", tag: "利空 算力·半导体", market: "cn", sentiment: "down" },
      { date: "07-28", title: "日韩熔断：KOSPI -8%、SK海力士-10%", analysis: "存储链恐慌出清", tag: "利空 存储", market: "kr", sentiment: "down" }
    ],
    company: [
      { date: "07-28", title: "英伟达「循环融资」担忧", analysis: "为OpenAI租算力担保最高2500亿美元", tag: "利空 AI开支链", market: "us", sentiment: "down" }
    ],
    overseas: [
      { date: "07月", title: "费半 7 月跌超 20%", analysis: "动量股抛售「史上最严重之一」，存储链重挫", tag: "利空 科技", market: "us", sentiment: "down" },
      { date: "07-31", title: "美日联合干预汇市：日元 164→155", analysis: "不排除追加干预，汇率波动加大", tag: "中性 汇率", market: "us", sentiment: "neu" },
      { date: "07-30", title: "美联储议息落地：9月加息预期高企", analysis: "CME约64.5%，政策路径不确定性上升", tag: "中性 流动性", market: "us", sentiment: "neu" }
    ]
  },

  summary: "A股放量普涨确认反弹（科创50两日+10%），但隔夜美股科技回调+韩股存储链高位分歧（三星盘中-5.9%）+黄金避险大涨破4300美元——今日关注半导体/存储链联动与8连板分歧，周五非农或定9月加息路径。"
};
