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
    { sentiment: "up", text: "美股创4月以来最大单周涨幅：标普8/7收7757.64新高（周涨3.58%）、纳指周涨5.19%、费半+2.56%；7月非农-2.3万降温加息预期（9月概率降至44%），金价破4400" },
    { sentiment: "up", text: "A股8/7放量四连阳（沪指+1.02%报3940、成交2.68万亿、涨停74家封板率74%）：创新药CRO+10.63%涨停潮+AI硬件PCB/CPO双主线" },
    { sentiment: "neu", text: "今日休市（周日）：下周焦点=8/10宇树科技打新+长鑫科技纳入MSCI、8/12美国7月CPI（彭博预期3.3%）直接定价9月加息路径、中概财报季最密集周（腾讯8/12/京东8/13/茅台8/15）" }
  ],

  yesterday: [
    { date: "08-09", title: "下周宏观验证周：美国7月CPI（8/12，彭博预期同比3.3%/核心2.4%）/PPI（8/13）/零售销售（8/14）直接定价9月加息路径；澳联储8/11按兵不动预期；日央行8/10发布7月意见摘要；SEC 13F持仓8/14截止披露", tag: "中性 全球流动性", market: "us", sentiment: "neu" },
    { date: "08-09", title: "中概财报季最密集周：腾讯（8/12）、京东（8/13）、中芯国际（8/13）、海光/贵州茅台（8/15）；8/15单日126家A股放榜；美股AI基建财报三夜连测（Lumentum/CoreWeave/超微、思科/Coherent/应用材料）", tag: "中性 财报验证", market: "cn", sentiment: "neu" },
    { date: "08-09", title: "宇树科技8/10科创板打新（年内人形机器人头号IPO）；长鑫科技8/10纳入MSCI中国全股票指数；下周4只新股发行（双英集团/宇树/绿控传动、高凯技术）", tag: "利好 人形机器人·存储链", market: "cn", sentiment: "up" },
    { date: "08-09", title: "下周解禁285.22亿元：8/10为解禁高峰（17家182.91亿占64%），陆家嘴71.1亿居首、盟固利30.58亿、凌玮科技27.28亿", tag: "中性 解禁压力", market: "cn", sentiment: "neu" },
    { date: "08-09", title: "成品油调价窗口8/14 24时：参考原油均价80.85美元/桶、变化率-9.57%，预计汽柴油零售价下调395元/吨", tag: "利好 出行链；利空 石油", market: "cn", sentiment: "up" },
    { date: "08-09", title: "C919首条国际航线8/12开通（国航北京-乌兰巴托）；2026西普会8/11-16海南博鳌（AI+健康主题）；固态电池双峰会（8/11-12芝加哥、8/13-14长沙SMM）", tag: "利好 大飞机·创新药·固态电池", market: "cn", sentiment: "up" },
    { date: "08-08", title: "韩国政府成立AI智能电网专责小组：产业通商资源部牵头、成员含财政/科学/国土部及韩电，目标打造AI次世代电网", tag: "利好 韩国电网·AI电力", market: "kr", sentiment: "up" },
    { date: "08-08", title: "三星电子2026年底在德州建第二晶圆厂（泰勒二厂2030年量产）：60-70%存储产能将签LTA长协（已签5家数据中心客户+5家AI客户谈判中），Q2存储营收同比+471%", tag: "利好 存储链·半导体设备", market: "kr", sentiment: "up" },
    { date: "08-08", title: "SK海力士评估30亿美元重庆工厂资产：或出售股份引入中国基金/产业资本，可能保留少数股权（彭博）", tag: "中性 存储链资本运作", market: "kr", sentiment: "neu" },
    { date: "08-08", title: "特朗普投资30亿美元关键矿产；OpenAI暂停部分Astra模型开发（网络安全风险）；美参议院通过对俄能源制裁法案", tag: "中性 地缘·AI", market: "us", sentiment: "neu" }
  ],

  week: {
    policy: [
      { date: "08-08", title: "北京楼市再松绑：非京籍五环内社保年限2年→1年", analysis: "全市统一1年（五环外不限套数），限购边际放松信号明确，地产链政策预期升温", tag: "利好 房地产·家居", market: "cn", sentiment: "up" },
      { date: "08-08", title: "八大多晶硅企业签反内卷《倡议书》", analysis: "销售价不得低于按团体标准核算的完全成本（4.5-4.8万/吨），硅料价格战宣告终结信号", tag: "利好 光伏·多晶硅", market: "cn", sentiment: "up" },
      { date: "08-06", title: "商务部公布多项对美反制清单", analysis: "无人机及关键零部件出口管制+6家美实体列入，贸易摩擦从关税延伸至出口管制与实体清单", tag: "利好 无人机·军工", market: "cn", sentiment: "up" },
      { date: "08-06", title: "电池消费税分步恢复征收", analysis: "锂原电池/锂离子蓄电池恢复征收，电池成本中枢上移", tag: "利空 锂电池", market: "cn", sentiment: "down" },
      { date: "08-04", title: "央行 5000 亿买断式逆回购加量", analysis: "流动性宽松+财政协同信号", tag: "利好 债市", market: "cn", sentiment: "up" },
      { date: "08-03", title: "证监会涉港 10 项举措", analysis: "跨境资金通道拓宽，支持港股境内上市、ETF快速注册", tag: "利好 券商·跨境金融", market: "cn", sentiment: "up" },
      { date: "08-03", title: "八部门科技金融政策", analysis: "设国家创投引导基金，支持优质未盈利科技企业上市", tag: "利好 创投·科技成长", market: "cn", sentiment: "up" },
      { date: "08-03", title: "新型电力系统「十五五」规划", analysis: "2030年新型储能3亿千瓦、核电1.1亿千瓦", tag: "利好 储能·核电", market: "cn", sentiment: "up" },
      { date: "08-03", title: "集成电路布图条例修订", analysis: "加大侵权赔偿力度，10/15施行", tag: "利好 半导体", market: "cn", sentiment: "up" }
    ],
    industry: [
      { date: "08-09", title: "下周产业催化密集：宇树8/10打新+长鑫纳入MSCI", analysis: "宇树科技科创板打新为年内人形机器人头号IPO；长鑫科技8/10纳入MSCI中国全股票指数（大型IPO快车道规则）；谷歌Pixel 11发布会/闪迪投资者日/朱雀三号再发射/黄仁勋会见LG高管，8/10-8/16为科技催化周", tag: "利好 人形机器人·存储链", market: "cn", sentiment: "up" },
      { date: "08-09", title: "存储超级周期延续：三星德州二厂+LTA锁产能", analysis: "三星2026年底德州泰勒二厂（2030量产），60-70%存储产能签LTA长协（已签5家数据中心客户）；SK海力士重庆工厂估值约30亿美元考虑售股引中国资本——原厂扩产+长协锁量，涨价预期延续至2028年底", tag: "利好 存储链·半导体设备", market: "kr", sentiment: "up" },
      { date: "08-07", title: "A股放量四连阳，创新药+AI硬件双主线", analysis: "沪指+1.02%报3940、成交2.68万亿放量1359亿、涨停74家封板率74%；本周沪指+2.81%/创业板+6.55%；但中际旭创巨量跳水显示科技上方套牢盘压力", tag: "利好 创新药·PCB", market: "cn", sentiment: "up" },
      { date: "08-07", title: "高盛上调AI服务器PCB/CCL预测", analysis: "2028年市场840亿/480亿美元（CAGR 148%/161%），6层以上HDI占比66%；PCB涨价链（铜箔/电子布）弹性大", tag: "利好 PCB·覆铜板", market: "cn", sentiment: "up" },
      { date: "08-08", title: "SK海力士54万亿韩元本土扩产", analysis: "清州M17厂19.1万亿+龙仁35.2万亿韩元（产HBM及下一代DRAM，约384亿美元），存储原厂逆周期扩产、HBM军备竞赛加剧", tag: "利好 存储链·半导体设备", market: "kr", sentiment: "up" },
      { date: "08-06", title: "A股缩量重返3900：煤炭涨停潮", analysis: "资金切向通信设备/电子化学品/元件/煤炭；缩量突破有效性待验证，3900点攻防为焦点", tag: "利好 煤炭·通信设备", market: "cn", sentiment: "up" },
      { date: "08-06", title: "长鑫存储拒绝苹果压价", analysis: "DRAM报价不低于三星/海力士，存储议价权向中国转移，涨价传导至终端", tag: "利好 存储链", market: "cn", sentiment: "up" },
      { date: "08-05", title: "存储超级周期确认：2027年DRAM/HBM产能售罄", analysis: "三大原厂产能售罄+HBF标准落地，NAND 8月敲定配额；Q2三星DRAM市占39%登顶", tag: "利好 存储链", market: "cn", sentiment: "up" },
      { date: "08-05", title: "A股科技+资源双主线共振", analysis: "电子+5.66%、有色+5.34%、半导体主力净流入130亿；存量调仓红利→成长+涨价", tag: "利好 半导体·有色", market: "cn", sentiment: "up" },
      { date: "08-04", title: "A股科技大反弹（通信+9.41%）", analysis: "超跌修复+外围共振，成交2.23万亿放量", tag: "利好 算力·光模块", market: "cn", sentiment: "up" },
      { date: "08-04", title: "长鑫获海外存储基金重仓（12.97%）", analysis: "Tema Memory ETF第一大重仓，外资认可国产存储链", tag: "利好 存储", market: "cn", sentiment: "up" },
      { date: "08-03", title: "储能 7 企集体涨价 2-30%", analysis: "低价内卷松动，盈利预期改善", tag: "利好 储能", market: "cn", sentiment: "up" },
      { date: "08-03", title: "Q3 PC DRAM 预计涨价 15-20%", analysis: "供应短缺延续涨价周期（TrendForce）", tag: "利好 存储链", market: "cn", sentiment: "up" }
    ],
    company: [
      { date: "08-07", title: "天能股份净利预降65%-69%", analysis: "硫酸涨价+增值税加计抵减政策调整挤压毛利，铅蓄电池行业成本传导受阻，中报雷区提示", tag: "利空 铅蓄电池", market: "cn", sentiment: "down" },
      { date: "08-06", title: "百济神州净利+627%、百奥赛图预增392%-413%", analysis: "创新药中报兑现潮，出海逻辑验证，百济上调全年指引至449-462亿", tag: "利好 创新药", market: "cn", sentiment: "up" },
      { date: "08-06", title: "牧原预亏57-67亿由盈转亏", analysis: "生猪均价10.4元/公斤-28%，猪周期底部确认、行业去产能加速", tag: "利空 生猪养殖", market: "cn", sentiment: "down" },
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
      { date: "08-09", title: "下周海外事件前瞻：美CPI/PPI定价9月加息路径", analysis: "8/12美国7月CPI（彭博预测整体3.3%/核心2.4%）、8/13 PPI、8/14零售销售——非农后9月加息概率降至44%，CPI若偏热沃什或考虑加息；澳联储8/11按兵不动；日央行8/10意见摘要；SEC 13F 8/14截止", tag: "中性 全球流动性", market: "us", sentiment: "neu" },
      { date: "08-08", title: "美伊霍尔木兹协议框架明确，WTI周跌7.67%", analysis: "伊朗与阿曼已达成总体框架，美预计很快达成海峡航运协议、官宣后解除对伊港口封锁；WTI收78.18美元周跌7.67%——地缘缓和油价中枢下移，通胀压力缓解", tag: "利好 化工·航空；利空 石油链", market: "us", sentiment: "up" },
      { date: "08-08", title: "美国7月非农大幅不及预期（-2.3万）", analysis: "预期+8万，5/6月下修10.3万；CME 9月加息概率55%→44%（华尔街见闻），劳动力市场降温坐实", tag: "利好 成长股·黄金", market: "us", sentiment: "up" },
      { date: "08-08", title: "隔夜美股大涨：标普创收盘新高、费半+2.56%", analysis: "纳指+1.30%、英伟达+2.27%、特斯拉+2.83%；本周道指+2.96%/纳指+5.19%（4月以来最大周涨幅）；COMEX金破4400周涨7.17%", tag: "利好 半导体·黄金", market: "us", sentiment: "up" },
      { date: "08-08", title: "中国央行连续21个月增持黄金", analysis: "7月末黄金储备7608万盎司（环比+64万盎司），外汇储备34188亿美元，全球央行购金趋势延续", tag: "利好 黄金·贵金属", market: "cn", sentiment: "up" },
      { date: "08-08", title: "韩国成立AI智能电网专责小组", analysis: "产业通商资源部牵头、含财政/科学/国土部及韩电，打造AI次世代电网（李在明上周提议后落地）", tag: "利好 韩国电网·AI电力", market: "kr", sentiment: "up" },
      { date: "08-07", title: "韩股连续第七周下跌（2022年以来最长连跌）", analysis: "KOSPI 8/7收6258.77（-0.60%）、外资净卖8590亿韩元；SK海力士-4.88%（传英伟达下调Rubin Ultra HBM规格）、三星+0.22%；KOSDAQ 8/7收798.81周涨超10%", tag: "利空 存储链", market: "kr", sentiment: "down" },
      { date: "08-07", title: "隔夜美股存储重挫：西数-13%、闪迪-7%", analysis: "道指-0.85%终结5连涨、费半仅+0.33%；存储高位分歧加剧，A股存储链短线承压联动", tag: "利空 存储链", market: "us", sentiment: "down" },
      { date: "08-07", title: "特朗普签多晶硅232关税行政令", analysis: "进口多晶硅及衍生产品加最低进口价+额外关税，贸易摩擦扩散至新能源材料", tag: "利空 光伏出口链", market: "us", sentiment: "down" },
      { date: "08-07", title: "中国7月进出口超预期", analysis: "前7月30.13万亿+17.3%，7月出口+17.8%、进口+21.2%，集成电路出口累计+99.5%", tag: "利好 出口链·机电", market: "cn", sentiment: "up" },
      { date: "08-06", title: "隔夜美股分化：道指新高、纳指-0.83%、黄金+3.74%", analysis: "ADP就业放缓降温9月加息预期，避险领涨、存储尾盘跳水", tag: "利好 黄金；利空 科技", market: "us", sentiment: "neu" },
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

  summary: "本周（8/3-8/9）全球风险资产共振修复：A股放量四连阳确立反弹（沪指3940、创新药CRO+10.63%与AI硬件PCB/CPO双主线、电子主力净流入283亿）；美股创4月以来最大周涨幅（标普7757.64新高、纳指周涨5.19%、7月非农-2.3万降温加息预期、金价破4400）；韩股KOSPI 8/7收6258.77周涨2.9%企稳，SK海力士54万亿扩产+三星德州二厂LTA锁产能彰显存储超级周期延续。下周焦点：8/10宇树打新+长鑫纳入MSCI、8/12美国7月CPI直接定价9月加息路径、中概财报季最密集周（腾讯/京东/中芯/茅台）——财报验证与宏观定价双线并行。"
};
