/* ==========================================================================
   NAP Lab — live feeds
   Upcoming conferences & schools · worldwide PhD/postdoc positions ·
   recent journal papers (APS, AAS/IOP, MNRAS/JCAP/PDU).

   Data flow (every feed, in this order):
     1. curated seed + weekly snapshot embedded by _includes/feed-data.html
        (rendered immediately, past items already dropped)
     2. live fetch from INSPIRE HEP (conferences, jobs) and Crossref (papers),
        both CORS-open; results are merged, de-duplicated and re-rendered.
   If a live request fails the page keeps what it has — nothing is invented.
   Past events and passed deadlines are filtered by today's date in IST.
   ========================================================================== */
(function (root) {
  'use strict';

  /* ---------- small helpers ---------- */
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function todayISO() {
    var n = new Date();
    var ist = new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 5.5 * 3600000);
    return ist.getFullYear() + '-' + String(ist.getMonth() + 1).padStart(2, '0') + '-' + String(ist.getDate()).padStart(2, '0');
  }
  function iso10(v) { return v ? String(v).slice(0, 10) : ''; }
  function daysBetween(a, b) {
    return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 864e5);
  }
  function parts(iso) { var p = iso.split('-'); return { y: +p[0], m: +p[1], d: +p[2] }; }
  function fmtDay(iso) { var p = parts(iso); return MONTHS[p.m - 1] + ' ' + p.d; }
  function fmtFull(iso) { var p = parts(iso); return MONTHS[p.m - 1] + ' ' + p.d + ', ' + p.y; }
  function fmtRange(a, b) {
    if (!b || b === a) return fmtFull(a);
    var pa = parts(a), pb = parts(b);
    if (pa.y === pb.y && pa.m === pb.m) return MONTHS[pa.m - 1] + ' ' + pa.d + '–' + pb.d + ', ' + pa.y;
    if (pa.y === pb.y) return fmtDay(a) + ' – ' + fmtDay(b) + ', ' + pa.y;
    return fmtFull(a) + ' – ' + fmtFull(b);
  }
  function when(n) {
    if (n <= 0) return 'today';
    if (n === 1) return 'tomorrow';
    if (n < 14) return 'in ' + n + ' days';
    if (n < 60) return 'in ' + Math.round(n / 7) + ' weeks';
    return 'in ' + Math.round(n / 30.4) + ' months';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function stripTags(s) { return String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
  function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ''); }
  function safeUrl(u) { return /^https?:\/\//i.test(u || '') ? u : '#'; }

  /* ---------- tiny session cache + timeout fetch ---------- */
  function cacheGet(key, ttlMs) {
    try {
      var raw = root.sessionStorage.getItem('lf:' + key);
      if (!raw) return null;
      var o = JSON.parse(raw);
      return (Date.now() - o.t < ttlMs) ? o.v : null;
    } catch (e) { return null; }
  }
  function cacheSet(key, v) {
    try { root.sessionStorage.setItem('lf:' + key, JSON.stringify({ t: Date.now(), v: v })); } catch (e) {}
  }
  function getJSON(url, ttlMs) {
    var hit = cacheGet(url, ttlMs || 30 * 60 * 1000);
    if (hit) return Promise.resolve(hit);
    var ctl = ('AbortController' in root) ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 14000) : null;
    return fetch(url, { headers: { Accept: 'application/json' }, signal: ctl ? ctl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) { if (timer) clearTimeout(timer); cacheSet(url, j); return j; })
      .catch(function (e) { if (timer) clearTimeout(timer); throw e; });
  }

  /* ---------- relevance ---------- */
  var CONF_RELEVANT = /neutron|compact (object|star)|dense|nuclear|gravitational|gravity|multi-?messenger|pulsar|equation of state|astrophys|dark matter|relativ|\bGW\b|LIGO|Virgo|KAGRA|LISA|Einstein Telescope|cosmic explorer|kilonova|supernova|magnetar|quark/i;
  var CORE_FIELD = /neutron[ -]stars?|dense (nuclear )?matter|equation[ -]of[ -]state|nuclear astrophysics|compact[ -]stars?|pulsar|hyperon|quark matter|asteroseismology/i;
  var JOB_RELEVANT = /neutron|compact (object|star)|dense|nuclear (astro|theory)|gravitational[ -]wave|multi-?messenger|pulsar|equation of state|dark matter|relativ|astrophys|kilonova|supernova|\bGW\b/i;
  var PAPER_RELEVANT = /neutron|compact (star|object)|pulsar|dense (nuclear |baryonic )?matter|equation of state|hyperon|quark|quarkyonic|tidal deformab|f-mode|quasinormal|magnetar|kilonova|binary neutron|nuclear matter|symmetry energy|dark matter.*(star|stellar)|admixed/i;

  /* ---------- conferences ---------- */
  var CONF_QUERIES = ['neutron stars', 'gravitational waves', 'dense matter equation of state',
                      'nuclear astrophysics', 'multimessenger astrophysics', 'compact objects'];

  function confType(title) {
    if (/school/i.test(title)) return 'school';
    if (/workshop|webinar|meeting|annual/i.test(title)) return /workshop/i.test(title) ? 'workshop' : 'meeting';
    return 'conference';
  }

  function parseConf(hit) {
    var m = (hit && hit.metadata) || {};
    var title = ((m.titles || [])[0] || {}).title || '';
    var start = iso10(m.opening_date);
    if (!title || !start) return null;
    var end = iso10(m.closing_date) || start;
    var addr = (m.addresses || [])[0] || {};
    var place = [(addr.cities || [])[0], addr.country].filter(Boolean).join(', ');
    var url = (m.urls || [])[0];
    var link = m.control_number ? 'https://inspirehep.net/conferences/' + m.control_number
      : (url && url.value) || 'https://inspirehep.net/conferences';
    return { title: title, start: start, end: end, place: place || 'See event page',
             type: confType(title), tags: [], url: link, source: 'INSPIRE' };
  }

  function normConf(c, source) {
    var start = iso10(c.start), end = iso10(c.end) || start;
    if (!c.title || !start) return null;
    return { title: String(c.title), start: start, end: end, place: c.place || 'See event page',
             type: c.type || confType(c.title), tags: c.tags || [], url: c.url, source: c.source || source };
  }

  function confKey(c) { return c.start.slice(0, 7) + norm(c.title).slice(0, 28); }

  function mergeConfs(lists, today) {
    var seen = {}, seenUrl = {}, out = [];
    lists.forEach(function (list) {
      (list || []).forEach(function (c) {
        if (!c || c.end < today) return;
        var k = confKey(c);
        if (seen[k] || (c.url && seenUrl[c.url])) return;
        seen[k] = 1; if (c.url) seenUrl[c.url] = 1;
        out.push(c);
      });
    });
    out.sort(function (a, b) { return a.start < b.start ? -1 : a.start > b.start ? 1 : 0; });
    return out;
  }

  /* ---------- jobs ---------- */
  var JOB_QUERIES = ['neutron star', 'gravitational waves', 'nuclear astrophysics',
                     'dense matter', 'multimessenger astrophysics', 'compact objects'];

  function parseJob(hit, today) {
    var m = (hit && hit.metadata) || {};
    if (m.status && m.status !== 'open') return null;
    var ranks = (m.ranks || []).map(function (r) { return String(r).toUpperCase(); });
    var level = ranks.indexOf('PHD') >= 0 ? 'phd' : ranks.indexOf('POSTDOC') >= 0 ? 'postdoc' : '';
    if (!level) return null;
    var title = m.position || '';
    var org = ((m.institutions || [])[0] || {}).value || '';
    var desc = stripTags(m.description || '');
    var text = title + ' ' + desc + ' ' + (m.arxiv_categories || []).join(' ');
    if (!title || !JOB_RELEVANT.test(text)) return null;
    var deadline = iso10(m.deadline_date);
    if (deadline && deadline < today) return null;
    if (!deadline) {                      /* no deadline: keep only if recently touched */
      var upd = iso10(hit.updated || hit.created);
      if (!upd || daysBetween(upd, today) > 120) return null;
    }
    var id = m.control_number || (hit.id);
    return {
      title: title, org: org || 'See posting',
      region: (m.regions || [])[0] || '', country: '',
      level: level, deadline: deadline, start: '',
      topics: desc.slice(0, 150) + (desc.length > 150 ? '…' : ''),
      core: CORE_FIELD.test(text),
      url: id ? 'https://inspirehep.net/jobs/' + id : 'https://inspirehep.net/jobs',
      source: 'INSPIRE'
    };
  }

  /* ---------- India faculty posts (INSPIRE ranks JUNIOR / SENIOR, Asia) ---------- */
  var FAC_QUERY = 'status:open and ranks:(JUNIOR or SENIOR) and regions:Asia';
  var FAC_TITLE = /professor|faculty|reader|lecturer|tenure|scientist[ -]?(e|f|g|h)\b/i;
  var INDIA_ORG = /\bIIT\b|\bIISER\b|\bNISER\b|\bIISc\b|\bTIFR\b|\bIUCAA\b|\bNCRA\b|\bIIA\b|\bPRL\b|\bSINP\b|\bVECC\b|\bRRI\b|\bIMSc\b|\bICTS\b|\bHRI\b|\bBARC\b|\bHBNI\b|\bIPR\b|\bARIES\b|\bIoP\b|India|Bhubaneswar|Kolkata|Delhi|Mumbai|Bombay|Pune|Bangalore|Bengaluru|Chennai|Madras|Hyderabad|Kanpur|Kharagpur|Roorkee|Guwahati|Mohali|Ahmedabad|Gurugram|Gurgaon|Rourkela|Varanasi|Indore|Bhopal|Tirupati|Trivandrum|Thiruvananthapuram|Allahabad|Prayagraj|Jaipur|Lucknow|Chandigarh|Gandhinagar|Raipur|Patna|Nagpur|Jodhpur|Mandi|Ropar|Dharwad|Goa|Kerala|Cochin|Kochi|Mysore|Manipal|Dehradun|Jammu|Silchar|Shillong|Tezpur|Bhilai|Palakkad|Kozhikode|Warangal|Surathkal|Trichy|Tiruchirappalli/;
  var FAC_AREA = /astro|nuclear|neutron|gravit|cosmolog|hadron|compact|relativ|pulsar|supernova|quark|multi-?messenger/i;
  var FAC_GENERIC = /all (areas|fields|disciplines|branches)|any (area|field)|open to (all|any)|department of physics|school of physics|physics department|physical sciences?/i;

  function parseFaculty(hit, today) {
    var m = (hit && hit.metadata) || {};
    if (m.status && m.status !== 'open') return null;
    var ranks = (m.ranks || []).map(function (r) { return String(r).toUpperCase(); });
    if (ranks.indexOf('JUNIOR') < 0 && ranks.indexOf('SENIOR') < 0) return null;
    var title = m.position || '';
    var org = ((m.institutions || [])[0] || {}).value || '';
    var desc = stripTags(m.description || '');
    if (!title || !FAC_TITLE.test(title)) return null;
    var text = title + ' ' + desc;
    if (!(INDIA_ORG.test(org) || /\bIndia(n)?\b/.test(title + ' ' + desc.slice(0, 400)))) return null;
    if (!(FAC_AREA.test(text) || FAC_GENERIC.test(text))) return null;
    var deadline = iso10(m.deadline_date);
    if (deadline && deadline < today) return null;
    if (!deadline) {
      var upd = iso10(hit.updated || hit.created);
      if (!upd || daysBetween(upd, today) > 120) return null;
    }
    var id = m.control_number || hit.id;
    return {
      title: title, org: org || 'See posting', region: 'Asia', country: 'India',
      level: 'faculty', deadline: deadline, start: '',
      topics: desc.slice(0, 150) + (desc.length > 150 ? '…' : ''),
      core: CORE_FIELD.test(text),
      url: id ? 'https://inspirehep.net/jobs/' + id : 'https://inspirehep.net/jobs',
      source: 'INSPIRE'
    };
  }

  function normJob(p, source) {
    if (!p.title) return null;
    return { title: p.title, org: p.org || '', region: p.region || '', country: p.country || '',
             level: p.level, deadline: iso10(p.deadline), start: p.start || '', topics: p.topics || '',
             core: !!p.core, url: p.url, alt: p.alt_urls || p.alt || [], source: p.source || source };
  }

  function mergeJobs(lists, today) {
    var seen = {}, out = [];
    lists.forEach(function (list) {
      (list || []).forEach(function (p) {
        if (!p) return;
        if (p.deadline && p.deadline < today) return;
        var k = norm(p.org).slice(0, 18) + norm(p.title).slice(0, 26) + p.level;
        if (seen[k] || (p.url && seen[p.url])) return;
        seen[k] = 1; if (p.url) seen[p.url] = 1;
        (p.alt || []).forEach(function (u) { seen[u] = 1; });
        out.push(p);
      });
    });
    out.sort(function (a, b) {
      if (a.deadline && b.deadline) return a.deadline < b.deadline ? -1 : a.deadline > b.deadline ? 1 : 0;
      if (a.deadline) return -1;
      if (b.deadline) return 1;
      return 0;
    });
    return out;
  }

  /* ---------- journal papers (Crossref) ---------- */
  var JOURNALS = {
    aps:   { label: 'Physical Review (APS)', sub: 'PRD · PRC · PRL · PRR',
             issns: ['2470-0010', '2470-0029', '2469-9985', '2469-9993', '0031-9007', '1079-7114', '2643-1564'] },
    aas:   { label: 'AAS journals', sub: 'ApJ · ApJL · ApJS',
             issns: ['0004-637X', '1538-4357', '2041-8205', '2041-8213', '0067-0049', '1538-4365'] },
    other: { label: 'MNRAS · JCAP · PDU', sub: 'MNRAS · JCAP · Phys. Dark Univ.',
             issns: ['0035-8711', '1365-2966', '1475-7516', '2212-6864'] }
  };
  var PAPER_TITLE_QUERIES = ['neutron star', 'dense matter equation of state', 'compact star gravitational wave'];

  function crossrefURL(issns, query, days, rows) {
    var d = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
    var f = issns.map(function (i) { return 'issn:' + i; }).concat(['from-pub-date:' + d, 'type:journal-article']).join(',');
    return 'https://api.crossref.org/works?rows=' + rows + '&query.title=' + encodeURIComponent(query) +
      '&filter=' + f +
      '&select=DOI,title,author,container-title,short-container-title,issued,published,volume,issue,page,article-number,URL';
  }

  function paperDate(it) {
    var dp = ((it.published || it.issued || {})['date-parts'] || [[]])[0] || [];
    if (!dp[0]) return '';
    return dp[0] + '-' + String(dp[1] || 1).padStart(2, '0') + '-' + String(dp[2] || 1).padStart(2, '0');
  }

  function parseWork(it) {
    var title = stripTags((it.title || [])[0] || '');
    if (!title || !PAPER_RELEVANT.test(title)) return null;
    var authors = (it.author || []).map(function (a) { return [a.given, a.family].filter(Boolean).join(' '); }).filter(Boolean);
    var jr = (it['short-container-title'] || [])[0] || (it['container-title'] || [])[0] || '';
    var loc = it['article-number'] || it.page || '';
    var ref = jr + (it.volume ? ' ' + it.volume : '') + (loc ? ', ' + loc : '');
    return {
      title: title,
      authors: authors.length > 3 ? authors.slice(0, 3).join(', ') + ' et al.' : authors.join(', '),
      journal: jr, ref: ref.trim(), date: paperDate(it),
      href: it.DOI ? 'https://doi.org/' + it.DOI : (it.URL || '#'), doi: it.DOI || ''
    };
  }

  function mergePapers(lists, limit) {
    var seen = {}, out = [];
    lists.forEach(function (l) { (l || []).forEach(function (p) {
      if (!p || seen[p.doi || p.title]) return; seen[p.doi || p.title] = 1; out.push(p);
    }); });
    out.sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
    return out.slice(0, limit || 8);
  }

  function paperTopic(t) {
    t = t.toLowerCase();
    if (/dark matter|admixed/.test(t)) return 'Dark Matter';
    if (/f-mode|oscillat|quasinormal|asteroseism/.test(t)) return 'Oscillations';
    if (/gravitational[ -]wave|tidal|merger|kilonova/.test(t)) return 'Gravitational Waves';
    if (/equation of state|hyperon|quark|nuclear matter|symmetry energy/.test(t)) return 'EoS';
    return 'Neutron Stars';
  }

  /* ---------- seed / snapshot ---------- */
  function readSeed() {
    var el = document.getElementById('feed-seed');
    if (!el) return { conferences: [], positions: [], snapshot: {} };
    try { return JSON.parse(el.textContent); } catch (e) { return { conferences: [], positions: [], snapshot: {} }; }
  }

  /* ======================================================================
     RENDERERS
     ====================================================================== */
  var TYPE_LABEL = { school: 'School', workshop: 'Workshop', conference: 'Conference', meeting: 'Meeting' };

  function confCard(c, today) {
    var p = parts(c.start);
    var ongoing = c.start <= today && c.end >= today;
    var n = daysBetween(today, c.start);
    var chip = ongoing ? '<span class="lf-chip lf-chip-live">Ongoing</span>'
                       : '<span class="lf-chip lf-chip-when">' + when(n) + '</span>';
    var india = (c.tags || []).indexOf('india') >= 0 || /india/i.test(c.place);
    return '<article class="lf-conf" data-type="' + esc(c.type) + '" data-india="' + (india ? 1 : 0) + '">' +
      '<div class="lf-date" aria-hidden="true"><span class="lf-m">' + MONTHS[p.m - 1] + '</span>' +
        '<span class="lf-d">' + p.d + '</span><span class="lf-y">' + p.y + '</span></div>' +
      '<div class="lf-body">' +
        '<div class="lf-chips"><span class="lf-chip lf-chip-type lf-t-' + esc(c.type) + '">' + (TYPE_LABEL[c.type] || 'Meeting') + '</span>' +
          chip + (c.source === 'INSPIRE' ? '<span class="lf-chip lf-chip-src">via INSPIRE</span>' : '') + '</div>' +
        '<h3><a href="' + esc(safeUrl(c.url)) + '" target="_blank" rel="noopener">' + esc(c.title) + '</a></h3>' +
        '<p class="lf-meta"><span>' + esc(fmtRange(c.start, c.end)) + '</span><span>' + esc(c.place) + '</span></p>' +
      '</div></article>';
  }

  function jobCard(p, today) {
    var left = p.deadline ? daysBetween(today, p.deadline) : null;
    var dl = p.deadline
      ? '<span class="lf-deadline' + (left <= 14 ? ' lf-soon' : '') + '">Deadline ' + esc(fmtFull(p.deadline)) +
        ' · ' + (left <= 0 ? 'today' : when(left)) + '</span>'
      : '<span class="lf-deadline">Open until filled — check posting</span>';
    return '<article class="lf-job" data-level="' + esc(p.level) + '" data-region="' + esc(p.region) + '" data-core="' + (p.core ? 1 : 0) + '">' +
      '<div class="lf-chips"><span class="lf-chip lf-lvl-' + esc(p.level) + '">' + (p.level === 'phd' ? 'PhD' : p.level === 'faculty' ? 'Faculty' : 'Postdoc') + '</span>' +
        (p.core ? '<span class="lf-chip lf-chip-core">Core field</span>' : '') +
        (p.region ? '<span class="lf-chip lf-chip-region">' + esc(p.region) + '</span>' : '') + '</div>' +
      '<h3><a href="' + esc(safeUrl(p.url)) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a></h3>' +
      '<p class="lf-org">' + esc(p.org) + (p.country ? ' · ' + esc(p.country) : '') + '</p>' +
      (p.topics ? '<p class="lf-topics">' + esc(p.topics) + '</p>' : '') +
      '<div class="lf-job-foot">' + dl +
        (p.start ? '<span class="lf-start">Start ' + esc(p.start) + '</span>' : '') +
        '<a class="lf-go" href="' + esc(safeUrl(p.url)) + '" target="_blank" rel="noopener">View posting ↗</a></div></article>';
  }

  function paperCard(p) {
    return '<article class="feed-card">' +
      '<div class="feed-card-meta"><span class="feed-source">' + esc(p.journal || 'Journal') + '</span>' +
        '<span class="feed-topic-tag">' + esc(paperTopic(p.title)) + '</span></div>' +
      '<h4>' + esc(p.title) + '</h4>' +
      (p.authors ? '<p>' + esc(p.authors) + '</p>' : '') +
      '<div class="feed-card-footer"><span class="feed-date">' + esc(p.ref) + (p.date ? ' · ' + esc(fmtFull(p.date)) : '') + '</span>' +
        '<a class="feed-link" href="' + esc(safeUrl(p.href)) + '" target="_blank" rel="noopener">DOI ↗</a></div></article>';
  }

  /* ======================================================================
     CONFERENCES widget
     ====================================================================== */
  function initConferences(box, seed) {
    var today = todayISO();
    var limit = parseInt(box.getAttribute('data-limit') || '0', 10);
    var listEl = box.querySelector('[data-role="list"]');
    var statEl = box.querySelector('[data-role="status"]');
    var filterEl = box.querySelector('[data-role="filters"]');
    var state = { filter: 'all', items: [] };

    var seedConfs = (seed.conferences || []).map(function (c) { return normConf(c, 'Curated'); }).filter(Boolean);
    var snapConfs = ((seed.snapshot || {}).conferences || []).map(function (c) { return normConf(c, 'INSPIRE'); }).filter(Boolean);

    function visible() {
      var items = state.items;
      if (state.filter === 'school') items = items.filter(function (c) { return c.type === 'school'; });
      else if (state.filter === 'workshop') items = items.filter(function (c) { return c.type === 'workshop' || c.type === 'meeting'; });
      else if (state.filter === 'conference') items = items.filter(function (c) { return c.type === 'conference'; });
      else if (state.filter === 'india') items = items.filter(function (c) { return (c.tags || []).indexOf('india') >= 0 || /india/i.test(c.place); });
      return limit ? items.slice(0, limit) : items;
    }
    function render() {
      var v = visible();
      var html = '', lastMonth = '';
      v.forEach(function (c) {
        if (!limit) {                       /* full list: group under month headings */
          var mk = c.start.slice(0, 7);
          if (mk !== lastMonth) {
            var pp = parts(c.start);
            html += '<h3 class="lf-month">' + ['January','February','March','April','May','June','July','August','September','October','November','December'][pp.m - 1] + ' ' + pp.y + '</h3>';
            lastMonth = mk;
          }
        }
        html += confCard(c, today);
      });
      listEl.innerHTML = html || '<p class="lf-empty">No meetings match this filter right now.</p>';
      if (filterEl) {
        Array.prototype.forEach.call(filterEl.querySelectorAll('button'), function (b) {
          b.setAttribute('aria-pressed', b.getAttribute('data-f') === state.filter ? 'true' : 'false');
        });
      }
    }
    function setStatus(t) { if (statEl) statEl.textContent = t; }

    state.items = mergeConfs([seedConfs, snapConfs], today);
    render();
    setStatus('Showing ' + state.items.length + ' upcoming meetings · checking INSPIRE for more…');

    if (filterEl) filterEl.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-f]');
      if (!b) return; state.filter = b.getAttribute('data-f'); render();
    });

    Promise.all(CONF_QUERIES.map(function (q) {
      var url = 'https://inspirehep.net/api/conferences?sort=datedesc&size=60&q=' + encodeURIComponent(q) +
                '&fields=titles,opening_date,closing_date,addresses,control_number,urls';
      return getJSON(url).then(function (j) {
        return (((j || {}).hits || {}).hits || []).map(parseConf).filter(function (c) { return c && CONF_RELEVANT.test(c.title); });
      }).catch(function () { return null; });
    })).then(function (res) {
      var ok = res.filter(Boolean);
      if (!ok.length) { setStatus('Showing ' + state.items.length + ' curated meetings (live INSPIRE feed unreachable just now).'); return; }
      var live = [].concat.apply([], ok);
      state.items = mergeConfs([seedConfs, snapConfs, live], today);
      render();
      setStatus(state.items.length + ' upcoming meetings · live from INSPIRE HEP + curated list · ' +
                new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' IST');
    });
  }

  /* ======================================================================
     POSITIONS widget
     ====================================================================== */
  function initPositions(box, seed) {
    var today = todayISO();
    var limit = parseInt(box.getAttribute('data-limit') || '0', 10);
    var listEl = box.querySelector('[data-role="list"]');
    var statEl = box.querySelector('[data-role="status"]');
    var filterEl = box.querySelector('[data-role="filters"]');
    var qEl = box.querySelector('[data-role="search"]');
    var state = { level: 'all', q: '', items: [] };

    var seedJobs = (seed.positions || []).map(function (p) { return normJob(p, 'Curated'); }).filter(Boolean);
    var snapJobs = ((seed.snapshot || {}).positions || []).map(function (p) { return normJob(p, 'INSPIRE'); }).filter(Boolean);

    function visible() {
      var items = state.items.filter(function (p) {
        if (state.level === 'phd' || state.level === 'postdoc' || state.level === 'faculty') { if (p.level !== state.level) return false; }
        else if (state.level === 'india') { if (String(p.country).toLowerCase() !== 'india') return false; }
        else if (state.level === 'core') { if (!p.core) return false; }
        if (state.q) {
          var hay = (p.title + ' ' + p.org + ' ' + p.country + ' ' + p.region + ' ' + p.topics).toLowerCase();
          if (hay.indexOf(state.q) < 0) return false;
        }
        return true;
      });
      return limit ? items.slice(0, limit) : items;
    }
    function render() {
      var v = visible();
      listEl.innerHTML = v.length ? v.map(function (p) { return jobCard(p, today); }).join('')
        : '<p class="lf-empty">No open posts match right now — try another filter or the job boards below.</p>';
      if (filterEl) {
        Array.prototype.forEach.call(filterEl.querySelectorAll('button'), function (b) {
          b.setAttribute('aria-pressed', b.getAttribute('data-f') === state.level ? 'true' : 'false');
        });
      }
    }
    function setStatus(t) { if (statEl) statEl.textContent = t; }

    state.items = mergeJobs([seedJobs, snapJobs], today);
    render();
    setStatus(state.items.length + ' open posts · checking INSPIRE jobs for more…');

    if (filterEl) filterEl.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-f]');
      if (!b) return; state.level = b.getAttribute('data-f'); render();
    });
    if (qEl) qEl.addEventListener('input', function () { state.q = qEl.value.trim().toLowerCase(); render(); });

    var jobFields = '&fields=position,institutions,ranks,regions,deadline_date,status,description,arxiv_categories,control_number';
    var fetchers = JOB_QUERIES.map(function (q) {
      var url = 'https://inspirehep.net/api/jobs?sort=mostrecent&size=40&q=' + encodeURIComponent(q) + jobFields;
      return getJSON(url, 60 * 60 * 1000).then(function (j) {
        return (((j || {}).hits || {}).hits || []).map(function (h) { return parseJob(h, today); }).filter(Boolean);
      }).catch(function () { return null; });
    });
    fetchers.push(getJSON('https://inspirehep.net/api/jobs?sort=mostrecent&size=100&q=' + encodeURIComponent(FAC_QUERY) + jobFields,
                          60 * 60 * 1000).then(function (j) {
      return (((j || {}).hits || {}).hits || []).map(function (h) { return parseFaculty(h, today); }).filter(Boolean);
    }).catch(function () { return null; }));
    Promise.all(fetchers
    ).then(function (res) {
      var ok = res.filter(Boolean);
      if (!ok.length) { setStatus(state.items.length + ' open posts from the curated list (live INSPIRE jobs feed unreachable just now).'); return; }
      var live = [].concat.apply([], ok);
      state.items = mergeJobs([seedJobs, snapJobs, live], today);
      render();
      setStatus(state.items.length + ' open posts · live from INSPIRE HEP jobs + curated list · ' +
                new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' IST');
    });
  }

  /* ======================================================================
     JOURNAL tabs
     ====================================================================== */
  function initJournals(box, seed) {
    var arxivPane = box.querySelector('[data-pane="arxiv"]');
    var jPane = box.querySelector('[data-pane="journal"]');
    var jGrid = box.querySelector('[data-role="journal-grid"]');
    var jNote = box.querySelector('[data-role="journal-note"]');
    var tabs = box.querySelector('[data-role="tabs"]');
    var snap = (seed.snapshot || {}).papers || {};
    var loaded = {};

    function show(key) {
      Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (b) {
        var on = b.getAttribute('data-tab') === key;
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
      if (key === 'arxiv') { arxivPane.hidden = false; jPane.hidden = true; return; }
      arxivPane.hidden = true; jPane.hidden = false;
      loadJournal(key);
    }

    function loadJournal(key) {
      var cfg = JOURNALS[key];
      if (loaded[key]) { paint(key, loaded[key].papers, loaded[key].note); return; }
      jGrid.innerHTML = '<div class="feed-skeleton"><div class="skel skel-title"></div><div class="skel skel-text"></div><div class="skel skel-text w60"></div></div>';
      jNote.textContent = 'Querying Crossref for ' + cfg.sub + '…';
      Promise.all(PAPER_TITLE_QUERIES.map(function (q) {
        return getJSON(crossrefURL(cfg.issns, q, 150, 40), 60 * 60 * 1000).then(function (j) {
          return (((j || {}).message || {}).items || []).map(parseWork).filter(Boolean);
        }).catch(function () { return null; });
      })).then(function (res) {
        var ok = res.filter(Boolean);
        var papers, note;
        if (ok.length) {
          papers = mergePapers(ok, 8);
          note = 'Recent papers in ' + cfg.sub + ' on neutron stars, dense matter and GW physics · live from Crossref · refreshed on each visit.';
        } else {
          papers = (snap[key] || []).map(function (p) { return p; });
          note = papers.length ? 'Crossref unreachable — showing the last weekly snapshot.' : 'Crossref unreachable just now.';
        }
        loaded[key] = { papers: papers, note: note };
        paint(key, papers, note);
      });
    }

    function paint(key, papers, note) {
      jGrid.innerHTML = papers.length ? papers.map(paperCard).join('')
        : '<p class="lf-empty">Nothing matched in the last five months — see the journal sites directly.</p>';
      jNote.textContent = note;
    }

    tabs.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('button[data-tab]');
      if (b) show(b.getAttribute('data-tab'));
    });
    tabs.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var bs = Array.prototype.slice.call(tabs.querySelectorAll('button'));
      var i = bs.findIndex(function (b) { return b.getAttribute('aria-selected') === 'true'; });
      i = (i + (e.key === 'ArrowRight' ? 1 : bs.length - 1)) % bs.length;
      bs[i].focus(); show(bs[i].getAttribute('data-tab'));
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    var seed = readSeed();
    Array.prototype.forEach.call(document.querySelectorAll('[data-feed="conferences"]'), function (b) { initConferences(b, seed); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-feed="positions"]'), function (b) { initPositions(b, seed); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-feed="journals"]'), function (b) { initJournals(b, seed); });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  }

  /* exported for tests */
  root.LiveFeeds = { parseConf: parseConf, parseJob: parseJob, parseWork: parseWork, mergeConfs: mergeConfs,
    mergeJobs: mergeJobs, mergePapers: mergePapers, normConf: normConf, normJob: normJob, fmtRange: fmtRange,
    when: when, daysBetween: daysBetween, crossrefURL: crossrefURL, confCard: confCard, jobCard: jobCard, paperCard: paperCard,
    JOURNALS: JOURNALS };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.LiveFeeds;
})(typeof window !== 'undefined' ? window : globalThis);
