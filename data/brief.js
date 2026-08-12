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
 *
 * ★ 2026-08-12（周三）更新：昨日新增 = 08-11 全天 + 08-12 凌晨（含隔夜美股 8/11 收盘、韩股 8/11 收盘 + 8/12 盘中、今日盘前要闻）。
 *   本周周报已累积 08-10 ~ 08-12（政策4/行业4/公司5/海外8）。
 */
window.TID_BRIEF = {
  quick: [
    { sentiment: "up", text: "今日焦点：三地半导体共振——韩股8/12盘中+2.35%破6500（三星+4.18%、SK海力士+3.02%，经贝恩SPC2间接成铠侠最大股东）、隔夜费半+0.87%存储股领涨、A股8/12翻红（创业板+0.91%）；工业富联中报净利+96%兑现AI服务器" },
    { sentiment: "down", text: "隔夜美股三大指数收跌（纳指-0.60%），谷歌-3.61%近6个月最大单日跌幅、中概金龙-2.94%（腾讯音乐-11%）；WTI续涨至83.20美元（伊朗称海峡条件满足前不开放）；港股低开恒指-1.15%、腾讯业绩前-2.25%" },
    { sentiment: "neu", text: "A股8/11缩量整固：上证-0.82%报3934.09、有色-4.42%重挫，创新药（百花医药6连板）与机器人逆势；8/12创新药7连板+算力租赁/影视/工业母机活跃；今晚20:30美CPI（共识3.4%/核心2.5%）定价9月加息路径（CME加息概率约48-51%）" }
  ],

  yesterday: [
    { date: "08-12", title: "韩股8/12暴涨：KOSPI盘中+2.35%破6500（三星+4.18%/SK海力士+3.02%/SK Square+6.35%），外资净买3260亿韩元；KOSDAQ盘中-1.82%资金回流主板", tag: "利好 存储链", market: "kr", sentiment: "up" },
    { date: "08-12", title: "隔夜美股三大指数收跌（纳指-0.60%/道指-0.34%/标普-0.32%），费半+0.87%逆势（阿斯麦+3%）、存储股领涨（SK海力士+4%/闪迪+2%）、光通信反弹；谷歌-3.61%近6月最大跌幅、中概金龙-2.94%；CoreWeave盘后+16%（在手合同1040亿美元）、芝商所将推算力期货", tag: "利好 存储·半导体；利空 中概", market: "us", sentiment: "down" },
    { date: "08-12", title: "工业富联中报：营收5578.61亿+54.63%、净利237.4亿+95.99%——AI服务器兑现；佰维存储拟回购2-2.5亿、强瑞技术定增10.5亿投液冷、源杰科技43亿扩激光器芯片", tag: "利好 AI算力·液冷·光芯片", market: "cn", sentiment: "up" },
    { date: "08-12", title: "上海《软件和信息服务业\"十五五\"规划》：松江/临港/青浦十万卡级智算集群、自主芯片与大模型深度融合，2030年产业规模4万亿", tag: "利好 算力·国产芯片", market: "cn", sentiment: "up" },
    { date: "08-11", title: "A股8/11缩量冲高回落：上证-0.82%报3934.09、创业板+0.34%，成交2.32万亿缩量2021亿；通信+1.13%领涨、有色-4.42%重挫（主力净流出57.6亿）；创新药逆势（百花医药6连板、万邦医药20cm）、人形机器人异动；涨停60/跌停2/封板率74.07%", tag: "中性 缩量整固·高低切换", market: "cn", sentiment: "neu" },
    { date: "08-11", title: "SK海力士经贝恩SPC2间接成铠侠最大股东：SPC2持14.19%（7740万股）超东芝14.06%（东芝7/15-8/3分7批减持）；SK海力士持SPC2可转债约3950亿日元可换绝大部分表决权；NAND若协同合计32%超三星", tag: "中性 存储链·NAND整合", market: "kr", sentiment: "neu" },
    { date: "08-11", title: "韩国8月1-10日出口213亿美元+45.3%创同期新高、半导体出口100亿美元+155.4%，存储见顶担忧缓解；韩股8/11收涨0.73%报6345.53（三星+4.13%）；韩国拟明年投1万亿韩元主权财富基金（AI/机器人/电池/电网）", tag: "利好 存储链", market: "kr", sentiment: "up" },
    { date: "08-11", title: "创新药现「对子价」警示：凯莱英/药明康德/美迪西/荣昌生物/泽璟制药/百普赛斯/海思科/奥浦迈现对子价（此前科技股对子价后见顶）；监管通报C基金公司「风格漂移」「大V带货」，责令改正+暂停公募注册3个月", tag: "利空 创新药高位；中性 公募监管", market: "cn", sentiment: "down" },
    { date: "08-11", title: "SAG：2026H1全球人形机器人出货1.91万台+近300%、中国厂商占97%+（智元8400台份额44%居首/宇树5900台31%第二）；8/12-13中国具身智能机器人产业大会", tag: "利好 人形机器人", market: "cn", sentiment: "up" },
    { date: "08-11", title: "韩国副总理：单股杠杆ETF交易规模从7/30的12.4万亿韩元降至8/7的8000亿韩元（降96%）；汇添富黄金LOF大额申购限额降至100元（8/12起，金价火热管制申购）", tag: "中性 韩股波动管控·黄金", market: "kr", sentiment: "neu" }
  ],

  week: {
    policy: [
      { date: "08-12", title: "上海「软件信息业十五五」规划：十万卡级智算集群", analysis: "松江/临港/青浦布局十万卡级超大规模智算集群，推动自主芯片与主流大模型深度融合；2030年产业规模力争4万亿、增加值破1.1万亿——算力基建从「全国一盘棋」落到地方执行，智算中心/液冷/交换机与国产算力芯片双逻辑受益", tag: "利好 算力·国产芯片", market: "cn", sentiment: "up" },
      { date: "08-11", title: "韩国5万亿韩元半导体专项基金落地", analysis: "投材料/零部件/设备/fabless四领域，配套5万亿贸易融资+10年1万亿供应商计划；三星/SK海力士+供应商拟合计投5760亿美元建厂（龙仁2041年供电14.7GW）——超级项目全链条推进，韩系设备/材料需求与国产替代共振", tag: "利好 半导体设备·材料", market: "kr", sentiment: "up" },
      { date: "08-11", title: "央行印发《\"十五五\"改革发展规划》", analysis: "健全货币政策框架、完善基础货币投放机制、发挥市场汇率决定性作用；流动性合理充裕基调延续，利好资本市场情绪托底", tag: "利好 金融·资本市场", market: "cn", sentiment: "up" },
      { date: "08-10", title: "北京公积金贷款额度提升至夫妻最高240万", analysis: "配合非京籍社保1年新政（8/8落地），楼市宽松组合拳延续，地产链政策预期升温", tag: "利好 房地产·家居", market: "cn", sentiment: "up" }
    ],
    industry: [
      { date: "08-11", title: "江波龙中报爆表：净利+715倍+4-8亿回购", analysis: "营收240.88亿+136.26%，AI存储需求兑现（叠加长鑫拒苹果压价、SK海力士产能售罄信号）；存储涨价链中报验证是本轮核心逻辑，注意大幅高开后博弈兑现风险（8/11盘中+4.88%）", tag: "利好 存储链", market: "cn", sentiment: "up" },
      { date: "08-11", title: "MLCC追价抢料潮（AI驱动被动元件涨价）", analysis: "部分客户以原价2-3倍抢货（双星新材涨停）；AI算力升级驱动电容需求，MLCC/电感/电容量价齐升（华泰观点）——涨价链从存储蔓延至被动元件", tag: "利好 MLCC·被动元件", market: "cn", sentiment: "up" },
      { date: "08-10", title: "长鑫今日纳入MSCI+瑞银首覆70元+苹果测试DRAM", analysis: "预计2026-28年净利1397/3328/4282亿（复合增速约75%）；DRAM超级周期+半导体本土刚需双逻辑，存储链A股映射强化", tag: "利好 存储链·半导体设备", market: "cn", sentiment: "up" },
      { date: "08-10", title: "SK海力士V10 NAND键合技术+710亿美元股东回报", analysis: "375层V10首用晶圆键合（混合键合设备2030年市场或达100亿元）；40万亿韩元回购对冲ADR稀释，HBM主导地位强化", tag: "利好 存储链·半导体设备", market: "kr", sentiment: "up" }
    ],
    company: [
      { date: "08-12", title: "工业富联中报净利+96%（AI服务器兑现）", analysis: "营收5578.61亿+54.63%、净利237.4亿+95.99%——此前中际旭创/江波龙/寒武纪/盛美中报均超预期，算力硬件链中报共振确认景气上行（国盛证券：「预期叙事」切「业绩兑现」）；佰维存储回购2-2.5亿、强瑞技术定增10.5亿投液冷、源杰科技43亿扩激光器芯片，链上资本开支同步扩张", tag: "利好 AI算力·液冷·光芯片", market: "cn", sentiment: "up" },
      { date: "08-11", title: "SK海力士经贝恩SPC2间接成铠侠最大股东", analysis: "东芝减持至14.06%、SPC2持14.19%登顶，SK海力士持CB可获SPC2绝大部分表决权（债转股需多国反垄断审批、2028年前投票权≤15%）；NAND格局三星29%/SK海力士18%/铠侠14%，若协同合计32%超三星——企业级SSD+3D NAND联合开发想象空间打开，短期象征意义大于经营影响", tag: "中性 存储链·NAND", market: "kr", sentiment: "neu" },
      { date: "08-11", title: "英伟达5000亿美元AI融资引发「循环融资」质疑", analysis: "与黑石/贝莱德等6家机构签备忘录为AI基建募资5000亿美元+投30亿美元Lancium（星际之门电力配套）；英特尔增发150亿美元——AI算力融资狂潮下担忧杠杆循环与股权稀释，费半-2.94%、NVDA-2.86%，映射A股算力链短期情绪", tag: "中性 算力·AI电力", market: "us", sentiment: "neu" },
      { date: "08-11", title: "甘李药业授权Menarini欧盟27国（GLP-1出海）", analysis: "首付款6200万欧元+里程碑款最高6.64亿欧元；创新药出海再下一城（百济/荣昌/药明后），GLP-1减重赛道全球化提速", tag: "利好 创新药·GLP-1", market: "cn", sentiment: "up" },
      { date: "08-10", title: "药明康德胜诉1260H初步禁令", analysis: "美哥伦比亚特区联邦法院批准禁止执行1260H认定，司法期间免受不利影响（阶段性胜诉非终审）；海外客户恐慌性解约风险解除，CXO估值修复核心催化", tag: "利好 CXO·创新药", market: "cn", sentiment: "up" }
    ],
    overseas: [
      { date: "08-12", title: "韩股半导体暴涨：KOSPI盘中+2.35%破6500", analysis: "三星+4.18%收复25万韩元、SK海力士+3.02%破145万、SK Square+6.35%，外资净买3260亿韩元；驱动=费半+0.87%+CoreWeave盘后+16%+韩国8月1-10日半导体出口+155.4%+股东回报预期；但KOSDAQ盘中-1.82%（资金回流主板，生物/电池获利回吐）——韩股「弃成长、买存储」再切换，A股存储链强联动；Kiwoom下调三星目标价39万→35万韩元（维持买入）", tag: "利好 存储链", market: "kr", sentiment: "up" },
      { date: "08-12", title: "隔夜美股结构分化：费半+0.87%存储领涨", analysis: "三大指数收跌（纳指-0.60%），谷歌-3.61%近6个月最大跌幅、中概金龙-2.94%（腾讯音乐-11%）；存储股领涨（SK海力士+4%/闪迪+2%）、光通信反弹（Coherent/Marvell）、阿斯麦+3%；CoreWeave Q2营收+1倍/在手合同1040亿美元、Lumentum指引超预期、芝商所将推全球首个算力期货——AI链从「融资质疑」转向「业绩+需求验证」，NVDA仅-0.02%企稳；美伊僵局WTI+1.3%报83.20、COMEX金+0.18%报4427.8；今晚20:30美CPI（共识3.4%/核心2.5%）为关键验证", tag: "利好 存储·半导体；利空 中概·大型科技", market: "us", sentiment: "down" },
      { date: "08-11", title: "隔夜美股收跌+油价大涨5.27%", analysis: "道指-0.11%/纳指-0.32%/标普-0.06%，费半-2.94%（格芯-7%/ARM-5.21%）；光通信大跌（Coherent-14%/Lumentum-8%）；WTI+5.27%报82.30、COMEX金+1.11%破4448——美伊谈判不确定+伊朗开更高筹码→油价反弹→通胀担忧与加息预期升温（哈马克或需多次加息）；金龙指数逆势+1.65%（阿里+3%）；8/12美CPI（预期3.3%）为关键验证", tag: "利空 光模块·半导体；利好 石油链·黄金", market: "us", sentiment: "down" },
      { date: "08-11", title: "KOSPI低开转涨，三星+3.26%超跌反弹", analysis: "8/11盘中6339.54+0.63%（开盘-0.95%）；SK海力士-0.42%（Solidigm美国NAND子公司或上市+股东回报担忧）；KOSDAQ冲高回落-0.81%；华西证券警示韩股中期仍承压（杠杆监管+央行加息）；三星反弹利好A股存储链情绪修复", tag: "利好 存储链", market: "kr", sentiment: "up" },
      { date: "08-10", title: "KOSDAQ暴涨6.97%触发年内第18次买入sidecar", analysis: "收854.47（8月+17.61%、较7/29低点+35%），Alteogen+14%（贝莱德持股5%）；7/31单股杠杆监管后资金从KOSPI杠杆产品迁入KOSDAQ（成交4万亿→7万亿韩元）；KOSPI仅+0.65%（外资净卖1.49万亿韩元）——韩股「弃存忆、买成长」再平衡，A股映射=存储链分歧+题材活跃并存", tag: "利好 韩股生物·二次电池；中性 存储链", market: "kr", sentiment: "neu" },
      { date: "08-10", title: "美伊博弈中段：伊朗批准霍尔木兹安全纲要", analysis: "革命卫队称保持海峡控制至敌方接受全部条件；特朗普倾向经济施压；今晨WTI一度+1.66%——地缘反复油价反弹，通胀压力边际回升，海峡重开短期变数犹存", tag: "利空 石油链下游；利好 石油开采", market: "us", sentiment: "down" },
      { date: "08-10", title: "中国7月物价温和：CPI+0.5%/PPI+3.5%", analysis: "PPI涨幅回落0.6pct、PPI-CPI剪刀差仍存；本周聚焦7月金融数据（C50调查：社融预测1.16万亿、新增信贷或负增长-0.51万亿）", tag: "中性 宏观·流动性", market: "cn", sentiment: "neu" },
      { date: "08-10", title: "KOSPI高开+0.8%报6306.33企稳", analysis: "上周连续第七周下跌后现企稳信号；韩国存储Q2财报印证三赛道高景气，产业与股价分歧待修复——利于A股存储链联动", tag: "利好 存储链", market: "kr", sentiment: "up" }
    ]
  },

  lastWeek: {
    range: "8/3 ~ 8/9",
    policy: [
      { date: "08-08", title: "北京楼市再松绑（五环内社保2年→1年）", analysis: "全市统一1年、五环外不限套数，限购边际放松信号明确", tag: "利好 房地产·家居", market: "cn", sentiment: "up" },
      { date: "08-08", title: "八大多晶硅企业签反内卷《倡议书》", analysis: "售价不得低于完全成本（4.5-4.8万/吨），硅料价格战终结信号", tag: "利好 光伏·多晶硅", market: "cn", sentiment: "up" },
      { date: "08-06", title: "商务部对美反制清单（无人机出口管制）", analysis: "贸易摩擦从关税延伸至出口管制与实体清单", tag: "利好 无人机·军工", market: "cn", sentiment: "up" },
      { date: "08-06", title: "电池消费税分步恢复征收", analysis: "锂离子蓄电池恢复征收，电池成本中枢上移", tag: "利空 锂电池", market: "cn", sentiment: "down" },
      { date: "08-04", title: "央行5000亿买断式逆回购加量", analysis: "连续第二月加量，流动性宽松+财政协同信号", tag: "利好 债市", market: "cn", sentiment: "up" },
      { date: "08-03", title: "证监会涉港10项举措", analysis: "支持港股境内上市、ETF快速注册，跨境通道拓宽", tag: "利好 券商·跨境金融", market: "cn", sentiment: "up" },
      { date: "08-03", title: "八部门科技金融政策", analysis: "设国家创投引导基金，支持优质未盈利科技企业上市", tag: "利好 创投·科技成长", market: "cn", sentiment: "up" },
      { date: "08-03", title: "新型电力系统「十五五」规划", analysis: "2030年新型储能3亿千瓦、核电1.1亿千瓦", tag: "利好 储能·核电", market: "cn", sentiment: "up" },
      { date: "08-03", title: "集成电路布图条例修订", analysis: "加大侵权赔偿力度，10/15施行", tag: "利好 半导体", market: "cn", sentiment: "up" }
    ],
    industry: [
      { date: "08-09", title: "下周产业催化密集：宇树打新+长鑫纳入MSCI", analysis: "8/10-8/16为科技催化周（谷歌Pixel 11/闪迪投资者日/朱雀三号）", tag: "利好 人形机器人·存储链", market: "cn", sentiment: "up" },
      { date: "08-09", title: "存储超级周期延续：三星德州二厂+LTA锁产能", analysis: "三星60-70%存储产能签LTA长协；SK海力士重庆工厂约30亿美元考虑售股", tag: "利好 存储链", market: "kr", sentiment: "up" },
      { date: "08-08", title: "SK海力士54万亿韩元本土扩产", analysis: "清州M17+龙仁35.2万亿韩元产HBM，存储军备竞赛加剧", tag: "利好 存储链·半导体设备", market: "kr", sentiment: "up" },
      { date: "08-07", title: "A股放量四连阳，创新药+AI硬件双主线", analysis: "沪指+1.02%报3940、成交2.68万亿、涨停74家；CRO+10.63%涨停潮", tag: "利好 创新药·PCB", market: "cn", sentiment: "up" },
      { date: "08-07", title: "高盛上调AI服务器PCB/CCL预测", analysis: "2028年840亿/480亿美元，PCB涨价链弹性大", tag: "利好 PCB·覆铜板", market: "cn", sentiment: "up" },
      { date: "08-06", title: "A股缩量重返3900：煤炭涨停潮", analysis: "资金切向通信设备/元件/煤炭，缩量突破有效性待验证", tag: "利好 煤炭·通信设备", market: "cn", sentiment: "up" },
      { date: "08-06", title: "长鑫存储拒绝苹果压价", analysis: "DRAM报价不低于三星/海力士，议价权向中国转移", tag: "利好 存储链", market: "cn", sentiment: "up" },
      { date: "08-05", title: "存储超级周期确认：2027年产能售罄", analysis: "三大原厂DRAM/HBM产能售罄+HBF标准落地", tag: "利好 存储链", market: "cn", sentiment: "up" },
      { date: "08-05", title: "A股科技+资源双主线共振", analysis: "电子+5.66%、半导体主力净流入130亿", tag: "利好 半导体·有色", market: "cn", sentiment: "up" },
      { date: "08-04", title: "A股科技大反弹（通信+9.41%）", analysis: "超跌修复+外围共振，成交2.23万亿放量", tag: "利好 算力·光模块", market: "cn", sentiment: "up" },
      { date: "08-04", title: "长鑫获海外存储基金重仓12.97%", analysis: "Tema Memory ETF第一大重仓", tag: "利好 存储", market: "cn", sentiment: "up" },
      { date: "08-03", title: "储能7企集体涨价2-30%", analysis: "低价内卷松动，盈利预期改善", tag: "利好 储能", market: "cn", sentiment: "up" },
      { date: "08-03", title: "Q3 PC DRAM预计涨价15-20%", analysis: "供应短缺延续涨价周期（TrendForce）", tag: "利好 存储链", market: "cn", sentiment: "up" }
    ],
    company: [
      { date: "08-07", title: "天能股份净利预降65%-69%", analysis: "硫酸涨价+政策调整挤压毛利，中报雷区提示", tag: "利空 铅蓄电池", market: "cn", sentiment: "down" },
      { date: "08-06", title: "百济神州净利+627%、百奥赛图预增392%-413%", analysis: "创新药中报兑现潮，百济上调全年指引", tag: "利好 创新药", market: "cn", sentiment: "up" },
      { date: "08-06", title: "牧原预亏57-67亿由盈转亏", analysis: "猪价-28%，猪周期底部确认", tag: "利空 生猪养殖", market: "cn", sentiment: "down" },
      { date: "08-05", title: "SpaceX首份财报-13.6%、AMD指引不及预期", analysis: "海外AI龙头财报兑现度分化", tag: "利空 AI硬件映射", market: "us", sentiment: "down" },
      { date: "08-05", title: "荣昌生物预盈47亿扭亏", analysis: "RC148授权收入大增，创新药出海兑现", tag: "利好 创新药", market: "cn", sentiment: "up" },
      { date: "08-04", title: "中微预增282%-311%", analysis: "半导体设备国产替代放量", tag: "利好 半导体设备", market: "cn", sentiment: "up" },
      { date: "08-04", title: "药明半年报净利+29.4%", analysis: "营收288.97亿+38.93%，10派5.1元", tag: "利好 CXO", market: "cn", sentiment: "up" },
      { date: "08-04", title: "阿里Qwen3.8（2.4万亿参数）", analysis: "港股阿里+7%，国产大模型第一梯队", tag: "利好 AI应用", market: "cn", sentiment: "up" },
      { date: "08-04", title: "7月沪市回购增持341亿", analysis: "156家次、年内月度第一", tag: "利好 高股息", market: "cn", sentiment: "up" },
      { date: "08-03", title: "宁德中期分红61.8亿", analysis: "10派14.11元，8/10除息", tag: "利好 高股息", market: "cn", sentiment: "up" },
      { date: "08-03", title: "药明上调2026指引至585-605亿", analysis: "CXO景气回升，出海加速", tag: "利好 CXO", market: "cn", sentiment: "up" }
    ],
    overseas: [
      { date: "08-09", title: "下周海外事件前瞻：美CPI/PPI定价9月加息路径", analysis: "8/12美国7月CPI（预期3.3%）/8/13 PPI/8/14零售销售，非农后9月加息概率降至44%", tag: "中性 全球流动性", market: "us", sentiment: "neu" },
      { date: "08-08", title: "美伊霍尔木兹协议框架明确，WTI周跌7.67%", analysis: "伊阿曼达成总体框架，官宣后解除对伊港口封锁", tag: "利好 化工·航空", market: "us", sentiment: "up" },
      { date: "08-08", title: "美国7月非农大幅不及预期（-2.3万）", analysis: "CME 9月加息概率55%→44%，劳动力降温坐实", tag: "利好 成长股·黄金", market: "us", sentiment: "up" },
      { date: "08-08", title: "隔夜美股大涨：标普创收盘新高、费半+2.56%", analysis: "本周纳指+5.19%（4月以来最大周涨幅）；COMEX金破4400周涨7.17%", tag: "利好 半导体·黄金", market: "us", sentiment: "up" },
      { date: "08-08", title: "中国央行连续21个月增持黄金", analysis: "7月末7608万盎司（环比+64万盎司）", tag: "利好 黄金", market: "cn", sentiment: "up" },
      { date: "08-08", title: "韩国成立AI智能电网专责小组", analysis: "产业通商资源部牵头，打造AI次世代电网", tag: "利好 韩国电网·AI电力", market: "kr", sentiment: "up" },
      { date: "08-07", title: "韩股连续第七周下跌", analysis: "KOSPI 8/7收6258.77、外资净卖8590亿韩元；SK海力士-4.88%", tag: "利空 存储链", market: "kr", sentiment: "down" },
      { date: "08-07", title: "隔夜美股存储重挫：西数-13%、闪迪-7%", analysis: "道指-0.85%终结5连涨，存储高位分歧加剧", tag: "利空 存储链", market: "us", sentiment: "down" },
      { date: "08-07", title: "特朗普签多晶硅232关税行政令", analysis: "最低进口价+额外关税，光伏出口链承压", tag: "利空 光伏出口链", market: "us", sentiment: "down" },
      { date: "08-07", title: "中国7月进出口超预期", analysis: "7月出口+17.8%、进口+21.2%", tag: "利好 出口链·机电", market: "cn", sentiment: "up" },
      { date: "08-06", title: "隔夜美股分化：道指新高、纳指-0.83%", analysis: "ADP就业放缓降温9月加息预期", tag: "利好 黄金", market: "us", sentiment: "neu" },
      { date: "08-05", title: "韩股存储链高位回调：三星盘中-5.89%", analysis: "KOSPI两日+5.5%后分歧加大", tag: "利空 存储链", market: "kr", sentiment: "down" },
      { date: "08-04", title: "韩股反弹：KOSPI+1.62%、SK海力士ADR+8.17%", analysis: "存储风向标回暖，传导A股存储链", tag: "利好 存储链", market: "kr", sentiment: "up" },
      { date: "08-04", title: "美股两连涨，费半+6.55%", analysis: "道指标普创收盘新高", tag: "利好 半导体", market: "us", sentiment: "up" },
      { date: "08-04", title: "美伊协议预期升温，WTI两日累跌超10%", analysis: "贝森特称4或5日或达成", tag: "利空 石油链", market: "us", sentiment: "down" },
      { date: "08-04", title: "SpaceX营收+92%、Palantir+30%", analysis: "AI应用商业化加速兑现", tag: "中性 海外映射", market: "us", sentiment: "neu" },
      { date: "08-03", title: "美股大涨纳指+2.13%", analysis: "美伊缓和油价跌5%，风险偏好回升", tag: "利好 科技", market: "us", sentiment: "up" },
      { date: "08-03", title: "美伊谈判开启，海峡重开未定", analysis: "伊朗已拒绝提议，地缘反复", tag: "中性 地缘", market: "us", sentiment: "neu" }
    ]
  },

  summary: "三地半导体共振是本日主旋律：韩股8/12盘中+2.35%破6500（三星+4.18%、SK海力士+3.02%并经贝恩SPC2间接成铠侠最大股东）、隔夜费半+0.87%存储股领涨（CoreWeave盘后+16%）、工业富联中报净利+96%——存储/算力链从「预期叙事」切向「业绩兑现」；但隐忧并存：谷歌-3.61%、中概金龙-2.94%、港股恒指-1.15%，美伊僵局推WTI至83.2美元，创新药现「对子价」见顶警示，A股8/11缩量整固（有色-4.42%重挫）。今日关键变量=今晚20:30美CPI（共识3.4%/核心2.5%，CME 9月加息概率约48-51%）+腾讯二季报——若通胀温和则「存储景气+加息降温」双主线强化，若超预期则谨防高油价与鹰派联储压制风险偏好。"
};
