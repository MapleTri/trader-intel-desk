/**
 * data/meta.js — 站点元信息
 * 更新方：每日 08:00 滚动周报自动化（weekly-rolling-brief）/ 手动触发
 * 说明：本文件只含数据，不含样式；页面通过 window.TID_META 读取。
 */
window.TID_META = {
  date: "2026-08-06",        // 情报日期（YYYY-MM-DD）
  weekday: "星期四",          // 星期
  snapshot: "行情快照：韩股8/6盘中重挫（KOSPI-4.9%、存储链SK海力士-10%）、A股与美股为8/5收盘", // 数据快照时点说明
  dataAsOf: "中(8/5收盘) 韩(8/6盘中) 美(8/5收盘)", // 三市场数据时点标注
  version: "v3.2",           // 页面版本号（随迭代递增）
  updatedAt: "2026-08-06 14:30" // 本数据最后更新时间
};
