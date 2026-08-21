/* ==========================================================================
 * 交易员情报台 · 渲染引擎（v3.0 数据驱动架构）
 *
 * 数据来源（全部为本目录 data/*.js 注入的全局变量，免服务器、file:// 可用）：
 *   window.TID_META      站点元信息        data/meta.js
 *   window.TID_MARKET    行情盘面          data/market.js
 *   window.TID_BRIEF     滚动周报情报流    data/brief.js
 *   window.TID_CALENDAR  事件与风险日历    data/calendar.js
 *   window.TID_REC       当日推荐(盘前)    data/rec.js
 *
 * 职责：读取数据 → 渲染各区块 DOM → 绑定交互（市场Tab/情绪筛选/折叠/倒计时/交易笔记）
 * 维护：每日自动化只更新 data/*.js，本文件与 index.html / main.css 保持稳定。
 * ========================================================================== */
(function () {
  'use strict';

  /* ---------- 0. 工具函数 ---------- */

  /** querySelector 简写 */
  const $ = (sel) => document.querySelector(sel);

  /** HTML 转义（数据落 DOM 前统一过一遍，防注入防破版） */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /** 方向 → 样式类名：up=涨/利好(红) down=跌/利空(绿) neu=中性(灰) */
  const SENTIMENT_CLASS = { up: 'up', down: 'down', neu: 'neu' };

  /** 市场 → 中文角标：cn=中 kr=韩 us=美 */
  const MARKET_LABEL = { cn: '中', kr: '韩', us: '美' };

  /** 创建元素的快捷方式 */
  function el(tag, cls, html) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }

  /** 全局筛选状态：市场 + 情绪（两个维度可组合） */
  const state = { market: 'all', sentiment: 'all' };

  /* 数据兜底：任一数据文件缺失/损坏时用空结构，保证页面不白屏 */
  const META = window.TID_META || {};
  const MARKET = window.TID_MARKET || { cards: [], sectors: null, top10: {}, gauge: {} };
  const BRIEF = window.TID_BRIEF || { quick: [], yesterday: [], week: {}, lastWeek: {}, summary: '' };
  const CALENDAR = window.TID_CALENDAR || { macro: [], unlock: [], earnings: [] };
  const REC = window.TID_REC || null;

  /* ==========================================================================
   * 1. 页头：日期 / 快照时点 / 市场状态与倒计时
   * ========================================================================== */

  function renderHeader() {
    $('#h-title').textContent = '📊 每日交易员情报台';
    $('#h-date').textContent =
      (META.date || '') + ' ' + (META.weekday || '') +
      (META.snapshot ? ' · ' + META.snapshot : '');
  }

  /**
   * A股交易时段状态机（按本机时间计算，每分钟刷新）
   * 09:15-09:25 集合竞价 / 09:30-11:30 上午盘 / 11:30-13:00 午休 /
   * 13:00-15:00 下午盘 / 其余 盘前或已收盘；周末休市。
   */
  function renderSession() {
    const now = new Date();
    const day = now.getDay(); // 0=周日 6=周六
    const mins = now.getHours() * 60 + now.getMinutes();
    const node = $('#h-session');
    let text = '';

    if (day === 0 || day === 6) {
      text = '周末休市 · 周一 09:30 开盘';
    } else if (mins < 9 * 60 + 15) {
      text = '盘前 · 距集合竞价 ' + fmtCountdown(9 * 60 + 15 - mins);
    } else if (mins < 9 * 60 + 30) {
      text = '集合竞价 · 09:30 开盘';
    } else if (mins < 11 * 60 + 30) {
      text = '盘中（上午）· 11:30 休市';
    } else if (mins < 13 * 60) {
      text = '午间休市 · 13:00 续市';
    } else if (mins < 15 * 60) {
      text = '盘中（下午）· 距收盘 ' + fmtCountdown(15 * 60 - mins);
    } else {
      text = '已收盘 · 明日 09:30 开盘';
    }
    node.textContent = text;
  }

  /** 分钟差 → "X小时X分钟" / "X分钟" */
  function fmtCountdown(diffMin) {
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    return h > 0 ? (h + '小时' + (m > 0 ? m + '分钟' : '')) : (m + '分钟');
  }

  /* ==========================================================================
   * 2. 30秒速览
   * ========================================================================== */

  function renderQuick() {
    const box = $('#quick-list');
    box.innerHTML = '';
    (BRIEF.quick || []).forEach((q) => {
      const item = el('div', 'item');
      item.appendChild(el('span', 'dot ' + (SENTIMENT_CLASS[q.sentiment] || 'neu')));
      item.appendChild(el('p', null, esc(q.text)));
      box.appendChild(item);
    });
  }

  /* ==========================================================================
   * 3. 市场数据卡（按中/韩/美分组，色条宽度=相对强度）
   * ========================================================================== */

  function renderMarketCards() {
    const host = $('#market-cards');
    host.innerHTML = '';
    $('#market-asof').textContent = META.dataAsOf ? ' · ' + META.dataAsOf : '';

    const cards = MARKET.cards || [];
    if (!cards.length) { host.appendChild(emptyState('行情数据待更新')); return; }

    // 色条归一化：以全场最大涨跌幅为 100%
    const maxAbs = Math.max.apply(null, cards.map((c) => Math.abs(c.change)).concat([1]));

    ['cn', 'kr', 'us'].forEach((m) => {
      const group = cards.filter((c) => c.market === m);
      if (!group.length) return;
      const grp = el('div', 'grp', { cn: '🇨🇳 中国', kr: '🇰🇷 韩国', us: '🇺🇸 美国' }[m]);
      grp.dataset.market = m; // 组标题跟随市场过滤
      host.appendChild(grp);

      const grid = el('div', 'grid');
      group.forEach((c) => {
        const dir = c.change > 0 ? 'up' : c.change < 0 ? 'down' : 'neu';
        const card = el('div', 'mcard');
        card.dataset.market = m;
        const pct = (c.change > 0 ? '+' : '') + c.change.toFixed(2) + '%';
        const width = Math.max(Math.abs(c.change) / maxAbs * 100, 6).toFixed(0);
        card.innerHTML =
          '<div class="name">' + esc(c.name) + '</div>' +
          '<div class="val ' + dir + '-c">' + pct + '</div>' +
          '<div class="bar ' + dir + '" style="width:' + width + '%"></div>';
        grid.appendChild(card);
      });
      host.appendChild(grid);
    });
  }

  /* ==========================================================================
   * 4. 板块动态（领涨/领跌/主力资金/轮动一句话）
   * ========================================================================== */

  function renderSectors() {
    const host = $('#sectors-body');
    host.innerHTML = '';
    const s = MARKET.sectors;
    if (!s) { host.appendChild(emptyState('板块数据待更新')); return; }

    $('#sectors-asof').textContent = s.asOf ? ' · ' + s.asOf : '';

    if (s.leaders && s.leaders.length) {
      const pills = el('div', 'pills');
      s.leaders.forEach((l, i) => {
        pills.appendChild(el('span', 'pill up',
          (i === 0 ? '领涨 ' : '') + esc(l.name) + ' +' + l.change.toFixed(2) + '%'));
      });
      (s.laggards || []).forEach((l) => {
        pills.appendChild(el('span', 'pill down', esc(l.name) + ' ' + l.change.toFixed(2) + '%'));
      });
      host.appendChild(pills);
    }

    if (s.flows && s.flows.length) {
      host.appendChild(el('div', 'flows', '主力资金：' +
        s.flows.map((f) => esc(f.name) + ' +' + f.amount.toFixed(1) + ' 亿').join(' · ')));
    }

    if (s.rotation) {
      host.appendChild(el('div', 'rotation', '轮动：<b>' + esc(s.rotation) + '</b>'));
    }
  }

  /* ==========================================================================
   * 5. P1 框架模块：板块TOP10 / 情绪温度计 / 事件风险日历
   *    共性：数据为空时显示「待启用」空态；自动化填充后自动渲染
   * ========================================================================== */

  function renderTop10() {
    const host = $('#top10-body');
    host.innerHTML = '';
    const t = MARKET.top10 || {};
    const has = (t.gainers && t.gainers.length) || (t.losers && t.losers.length);
    if (!has) {
      host.appendChild(emptyState('今日暂无数据（每日 08:00 自动化更新；周末/节假日休市无数据）。'));
      return;
    }
    // 有数据时的渲染（自动化填充后生效）
    const build = (rows, dir) => {
      const table = el('table', 'mini-table');
      table.innerHTML = '<tr><th>板块</th><th>涨跌幅</th></tr>' + rows.map((r) =>
        '<tr><td>' + esc(r.name) + '</td><td class="' + dir + '-c">' +
        (r.change > 0 ? '+' : '') + Number(r.change).toFixed(2) + '%</td></tr>').join('');
      return table;
    };
    if (t.gainers && t.gainers.length) {
      host.appendChild(el('div', 'sub', '涨幅榜'));
      host.appendChild(build(t.gainers, 'up'));
    }
    if (t.losers && t.losers.length) {
      host.appendChild(el('div', 'sub', '跌幅榜'));
      host.appendChild(build(t.losers, 'down'));
    }
  }

  function renderGauge() {
    const host = $('#gauge-body');
    host.innerHTML = '';
    const g = MARKET.gauge || {};
    if (g.limitUp == null && !(g.ladder && g.ladder.length)) {
      host.appendChild(emptyState('今日暂无数据（每日 08:00 自动化更新：涨停/跌停家数、连板梯队、炸板率）。'));
      return;
    }
    // 有数据时的渲染（自动化填充后生效）
    const line = '涨停 <b class="up-c">' + g.limitUp + '</b> 家 · 跌停 <b class="down-c">' +
      g.limitDown + '</b> 家 · 炸板率 ' + g.breakRate + '%';
    host.appendChild(el('div', 'flows', line));
    (g.ladder || []).forEach((l) => {
      host.appendChild(el('div', 'rotation', esc(l.height) + '：' + esc((l.stocks || []).join('、'))));
    });
  }

  function renderCalendar() {
    renderCalendarList('#cal-macro', CALENDAR.macro, function (r) {
      return '<td>' + esc(r.date) + '</td><td>' + esc(r.name) + '</td><td>' +
        esc(r.expect || '—') + '</td><td>' + esc(r.prev || '—') + '</td>';
    }, '<tr><th>日期</th><th>数据</th><th>预期</th><th>前值</th></tr>',
      '本周暂无宏观数据发布记录（每日 08:00 自动化更新，含预期值与即时解读）。');

    renderCalendarList('#cal-unlock', CALENDAR.unlock, function (r) {
      return '<td>' + esc(r.date) + '</td><td>' + esc(r.name) + '</td><td>' + esc(r.scale || '') + '</td>';
    }, '<tr><th>日期</th><th>个股</th><th>解禁规模</th></tr>',
      '本周暂无解禁记录（每日 08:00 自动化更新）。');

    renderCalendarList('#cal-earnings', CALENDAR.earnings, function (r) {
      const dir = SENTIMENT_CLASS[r.sentiment] || 'neu';
      return '<td>' + esc(r.date) + '</td><td>' + esc(r.name) + '</td><td class="' +
        dir + '-c">' + esc(r.summary || '') + '</td>';
    }, '<tr><th>日期</th><th>个股</th><th>预告要点</th></tr>',
      '近期暂无业绩预告风险记录（披露季每日 08:00 自动化更新）。');
  }

  /** 日历子区块通用渲染：空数组 → 空态；有数据 → 紧凑表格 */
  function renderCalendarList(sel, rows, rowTpl, headHtml, emptyText) {
    const host = $(sel);
    host.innerHTML = '';
    if (!rows || !rows.length) { host.appendChild(emptyState(emptyText)); return; }
    const table = el('table', 'mini-table');
    table.innerHTML = headHtml + rows.map((r) => '<tr>' + rowTpl(r) + '</tr>').join('');
    host.appendChild(table);
  }

  /* ==========================================================================
   * 5.5 今日推荐（盘前计算：消息面传导 + 技术面验证）
   *    数据来自 data/rec.js（每日 08:15 整合自动化覆盖）；空 → 空态
   * ========================================================================== */

  function renderRec() {
    const host = $('#rec-body');
    host.innerHTML = '';
    $('#rec-asof').textContent = '';
    if (!REC || !REC.sectors || !REC.sectors.length) {
      host.appendChild(emptyState('今日暂无推荐（每日 08:15 自动化计算：消息面板块传导 + 技术面验证；节假日休市无推荐）。'));
      return;
    }
    $('#rec-asof').textContent = REC.asOf ? ' · ' + REC.asOf : '';

    // 一句话依据
    if (REC.basis) {
      host.appendChild(el('div', 'rec-basis', '依据：<b>' + esc(REC.basis) + '</b>'));
    }
    // 传导链
    (REC.chains || []).forEach((c) => {
      host.appendChild(el('div', 'rec-chain', '⇢ ' + esc(c)));
    });
    // 推荐板块 + 代表个股
    (REC.sectors || []).forEach((s) => {
      const box = el('div', 'rec-sector');
      box.appendChild(el('div', 'rec-sector-name', '🏁 ' + esc(s.name)));
      if (s.logic) box.appendChild(el('div', 'rec-sector-logic', esc(s.logic)));
      (s.stocks || []).forEach((st) => {
        const mk = st.market || 'cn';
        const row = el('div', 'rec-stock');
        row.appendChild(el('span', 'mk mk-' + mk, MARKET_LABEL[mk] || '中'));
        let html = '<b>' + esc(st.name) + '</b>' +
          (st.code ? ' <span class="code">' + esc(st.code) + '</span>' : '') +
          ' <span class="analysis">' + esc(st.logic || '') + '</span>';
        row.appendChild(el('p', null, html));
        if (st.tech) row.appendChild(el('span', 'rec-tech', '📐 ' + esc(st.tech)));
        box.appendChild(row);
      });
      host.appendChild(box);
    });
    // 风险提示
    if (REC.risks && REC.risks.length) {
      host.appendChild(el('div', 'rec-risk', '⚠ 风险：' +
        REC.risks.map((r) => esc(r)).join('；')));
    }
    // 免责声明
    host.appendChild(el('div', 'rec-disl', esc(REC.disclaimer || '以上为公开信息整理与逻辑推演，不构成投资建议')));
  }

  /* ==========================================================================
   * 6. 情报流三区：昨日新增 / 本周周报 / 上周回顾
   *    排序铁律：日期倒序（最新在前）—— 数据文件生成时已排好，这里原样渲染
   * ========================================================================== */

  /** 单条情报行：市场角标 + 方向色点 + [日期] 标题 + 补充分析 + 板块标签 */
  function newsRow(item) {
    const row = el('div', 'item-row');
    row.dataset.market = item.market || 'cn';
    row.dataset.sentiment = item.sentiment || 'neu';
    const mk = item.market || 'cn';
    row.appendChild(el('span', 'mk mk-' + mk, MARKET_LABEL[mk] || '中'));
    row.appendChild(el('span', 'dot ' + (SENTIMENT_CLASS[item.sentiment] || 'neu')));
    let html = '<span class="dt">[' + esc(item.date) + ']</span> ' + esc(item.title);
    if (item.analysis) html += ' <span class="analysis">' + esc(item.analysis) + '</span>';
    if (item.tag) html += ' <span class="tag">' + esc(item.tag) + '</span>';
    row.appendChild(el('p', null, html));
    return row;
  }

  /** 四类分节的固定顺序与标题（📜政策/🏭行业/💼公司/🌍海外） */
  const CATEGORY_ORDER = [
    ['policy', '📜 政策/监管'],
    ['industry', '🏭 行业/产业'],
    ['company', '💼 公司/公告'],
    ['overseas', '🌍 海外/宏观']
  ];

  /** 渲染一个分类分节区块（本周周报 / 上周回顾共用） */
  function renderCategorized(hostId, data) {
    const host = $(hostId);
    host.innerHTML = '';
    let total = 0;
    CATEGORY_ORDER.forEach(([key, label]) => {
      const items = (data && data[key]) || [];
      if (!items.length) return;
      total += items.length;
      host.appendChild(el('div', 'sub', label));
      const list = el('div', 'list');
      list.style.marginBottom = '8px';
      items.forEach((it) => list.appendChild(newsRow(it)));
      host.appendChild(list);
    });
    return total;
  }

  /* ==========================================================================
   * 7. 筛选（市场 Tab × 情绪 Chips 组合过滤）+ 计数联动
   * ========================================================================== */

  /** 应用当前筛选：遍历所有带 data-market / data-sentiment 的元素 */
  function applyFilters() {
    // 市场过滤：作用于所有带 data-market 的元素（卡片、新闻行、组标题）
    document.querySelectorAll('[data-market]').forEach((elm) => {
      const tags = elm.dataset.market.split(' ');
      elm._marketHidden = !(state.market === 'all' || tags.includes(state.market));
    });
    // 情绪过滤：只作用于带 data-sentiment 的元素（新闻行）
    document.querySelectorAll('[data-sentiment]').forEach((elm) => {
      elm._sentimentHidden = !(state.sentiment === 'all' || elm.dataset.sentiment === state.sentiment);
    });
    // 合并可见性
    document.querySelectorAll('[data-market],[data-sentiment]').forEach((elm) => {
      elm.style.display = (elm._marketHidden || elm._sentimentHidden) ? 'none' : '';
    });

    // 各折叠区计数联动 + 「无匹配」提示
    updateSectionCounts();

    // Tab / Chip 激活态
    document.querySelectorAll('#tabs .tab').forEach((t) =>
      t.classList.toggle('active', t.dataset.m === state.market));
    document.querySelectorAll('#chips .chip').forEach((c) =>
      c.classList.toggle('active', c.dataset.s === state.sentiment));
  }

  /** 更新每个 details 的 "N 条" 计数（筛选后显示 匹配/总数）与空提示 */
  function updateSectionCounts() {
    document.querySelectorAll('details[data-countable]').forEach((d) => {
      const rows = d.querySelectorAll('.item-row[data-market]');
      const total = rows.length;
      let visible = 0;
      rows.forEach((r) => { if (r.style.display !== 'none') visible++; });
      const cnt = d.querySelector('summary .cnt');
      if (cnt && cnt.dataset.tpl) {
        cnt.textContent = cnt.dataset.tpl
          .replace('{n}', state.market === 'all' && state.sentiment === 'all' ? total : visible + '/' + total);
      }
      // 子分类标题：若其下条目全被隐藏则同步隐藏
      d.querySelectorAll('.sub').forEach((sub) => {
        const list = sub.nextElementSibling;
        if (!list || !list.classList.contains('list')) return;
        const anyVisible = Array.prototype.some.call(
          list.querySelectorAll('.item-row'), (r) => r.style.display !== 'none');
        sub.style.display = anyVisible ? '' : 'none';
        list.style.display = anyVisible ? '' : 'none';
      });
      // 整区无匹配提示
      let hint = d.querySelector('.no-match');
      if (!hint) {
        hint = el('div', 'no-match', '当前筛选条件下无匹配条目');
        d.querySelector('.inner').appendChild(hint);
      }
      hint.style.display = visible === 0 ? 'block' : 'none';
    });
  }

  /* ==========================================================================
   * 8. 预计阅读时长（呼应「单日阅读 ≤8 分钟」纪律，约 400 字/分钟）
   * ========================================================================== */

  function renderReadingTime() {
    let chars = 0;
    const eat = (s) => { chars += String(s || '').length; };
    (BRIEF.quick || []).forEach((q) => eat(q.text));
    (BRIEF.yesterday || []).forEach((i) => { eat(i.title); eat(i.tag); });
    // 只统计每日必读区（速览+昨日新增+本周周报+总结）；上周回顾为备查参考，不计入
    CATEGORY_ORDER.forEach(([key]) => {
      (((BRIEF.week || {})[key]) || []).forEach((i) => { eat(i.title); eat(i.analysis); });
    });
    eat(BRIEF.summary);
    const mins = Math.max(1, Math.round(chars / 400));
    const node = $('#reading-time');
    node.textContent = '预计阅读约 ' + mins + ' 分钟';
    node.style.color = mins > 8 ? 'var(--up)' : 'var(--dim)'; // 超 8 分钟红线提醒
  }

  /* ==========================================================================
   * 9. 交易计划与复盘（localStorage 持久化，纯前端零依赖）
   * ========================================================================== */

  const JOURNAL_KEY = 'tid.journal.v1';

  function loadJournal() {
    try { return JSON.parse(localStorage.getItem(JOURNAL_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function saveJournal(data) {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(data));
  }

  function todayKey() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  function renderJournal() {
    const data = loadJournal();
    const today = todayKey();
    const entry = data[today] || { plan: '', review: '' };
    $('#j-date').textContent = today;
    $('#j-plan').value = entry.plan || '';
    $('#j-review').value = entry.review || '';
    renderJournalHistory(data);
  }

  function renderJournalHistory(data) {
    const host = $('#j-history');
    const dates = Object.keys(data).filter((d) => d !== todayKey()).sort().reverse();
    if (!dates.length) { host.innerHTML = ''; host.style.display = 'none'; return; }
    host.style.display = 'block';
    host.innerHTML = '<div class="label">历史记录</div>';
    dates.slice(0, 14).forEach((d) => {
      const e = data[d];
      const item = el('div', 'h-item');
      item.appendChild(el('span', 'h-date', esc(d)));
      const text = (e.plan ? '计划：' + e.plan : '') +
        (e.plan && e.review ? '\n' : '') + (e.review ? '复盘：' + e.review : '');
      item.appendChild(el('span', 'h-text', esc(text)));
      host.appendChild(item);
    });
  }

  function bindJournal() {
    $('#j-save').addEventListener('click', () => {
      const data = loadJournal();
      data[todayKey()] = {
        plan: $('#j-plan').value.trim(),
        review: $('#j-review').value.trim(),
        updated: new Date().toISOString()
      };
      saveJournal(data);
      renderJournalHistory(data);
      const tip = $('#j-tip');
      tip.textContent = '已保存（存于本机浏览器）';
      setTimeout(() => { tip.textContent = ''; }, 2000);
    });
    // 导出全部记录为 Markdown 文件
    $('#j-export').addEventListener('click', () => {
      const data = loadJournal();
      const dates = Object.keys(data).sort().reverse();
      let md = '# 交易计划与复盘\n\n';
      dates.forEach((d) => {
        md += '## ' + d + '\n\n';
        if (data[d].plan) md += '**计划**\n' + data[d].plan + '\n\n';
        if (data[d].review) md += '**复盘**\n' + data[d].review + '\n\n';
      });
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '交易计划与复盘.md';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  /* ==========================================================================
   * 10. 通用小组件：空态 / 返回顶部 / 页脚
   * ========================================================================== */

  function emptyState(html) { return el('div', 'empty', html); }

  function renderFooter() {
    $('#footer').innerHTML =
      '每日交易员情报台 · ' + esc(META.version || '') + '（数据驱动架构 · ' + esc(META.updatedAt || '') + ' 更新）<br>' +
      '数据源：neodata / westock / 财联社·证券时报·上证报·金融界 等 · 仅供个人参考，不构成投资建议';
  }

  function bindToTop() {
    const btn = $('#to-top');
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ==========================================================================
   * 11. 初始化
   * ========================================================================== */

  function init() {
    renderHeader();
    renderSession();
    setInterval(renderSession, 30 * 1000); // 市场状态每 30 秒刷新

    renderQuick();
    renderMarketCards();
    renderSectors();
    renderTop10();
    renderGauge();
    renderCalendar();
    renderRec();

    // 情报流三区（计数模板在 HTML 中预置，applyFilters 时替换 {n}）
    const yBox = $('#yesterday-list');
    (BRIEF.yesterday || []).forEach((it) => yBox.appendChild(newsRow(it)));
    renderCategorized('#week-body', BRIEF.week);
    renderCategorized('#lastweek-body', BRIEF.lastWeek);

    $('#summary-text').innerHTML = '一句话：<b>' + esc(BRIEF.summary || '') + '</b>';

    // 筛选交互
    document.querySelectorAll('#tabs .tab').forEach((t) =>
      t.addEventListener('click', () => { state.market = t.dataset.m; applyFilters(); }));
    document.querySelectorAll('#chips .chip').forEach((c) =>
      c.addEventListener('click', () => { state.sentiment = c.dataset.s; applyFilters(); }));

    renderReadingTime();
    renderJournal();
    bindJournal();
    renderFooter();
    bindToTop();
    applyFilters(); // 初始计数
  }

  document.addEventListener('DOMContentLoaded', init);
})();
