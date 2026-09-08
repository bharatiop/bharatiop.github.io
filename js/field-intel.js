/* Live Field Intelligence — INSPIRE HEP (CORS-open). No invented papers. */
(function () {
  var PAPER_Q = '("neutron star" OR "neutron stars") AND ("equation of state" OR "tidal deformability" OR "dark matter" OR "f-mode" OR "gravitational waves" OR hyperon OR quarkyonic)';
  var CONF_Q = 'gravitational waves OR neutron stars';
  var PAPER_URL = 'https://inspirehep.net/api/literature?sort=mostrecent&size=16&q=' + encodeURIComponent(PAPER_Q);
  var CONF_URL = 'https://inspirehep.net/api/conferences?sort=datedesc&size=40&q=' + encodeURIComponent(CONF_Q);
  var MUST_NS = /neutron\s*stars?|compact\s*stars?|pulsar/i;

  var grid = document.getElementById('fieldNewsGrid');
  var confList = document.getElementById('fieldConfList');
  var stamp = document.getElementById('fieldNewsStamp');
  var badge = document.getElementById('fieldNewsBadge');
  if (!grid) return;

  function todayISO() {
    var n = new Date();
    var ist = new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 5.5 * 3600000);
    var m = String(ist.getMonth() + 1).padStart(2, '0');
    var d = String(ist.getDate()).padStart(2, '0');
    return ist.getFullYear() + '-' + m + '-' + d;
  }

  function fmtDate(iso) {
    if (!iso) return '';
    var p = String(iso).slice(0, 10).split('-');
    if (p.length < 3) return iso;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[parseInt(p[1], 10) - 1] + ' ' + parseInt(p[2], 10) + ', ' + p[0];
  }

  function absPlain(m) {
    var a = (m.abstracts || [])[0];
    if (!a || !a.value) return '';
    return String(a.value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function paperLink(m) {
    var arx = (m.arxiv_eprints || [])[0];
    if (arx && arx.value) return { href: 'https://arxiv.org/abs/' + arx.value, label: 'arXiv:' + arx.value };
    var doi = (m.dois || [])[0];
    if (doi && doi.value) return { href: 'https://doi.org/' + doi.value, label: 'DOI' };
    if (m.control_number) return { href: 'https://inspirehep.net/literature/' + m.control_number, label: 'INSPIRE' };
    return null;
  }

  function topic(title, abs) {
    var t = (title + ' ' + abs).toLowerCase();
    if (/dark matter|wimp|admixed/.test(t)) return 'Dark Matter';
    if (/f-mode|p-mode|oscillat|asteroseism/.test(t)) return 'Oscillations';
    if (/gravitational wave|ligo|lvk|tidal/.test(t)) return 'Gravitational Waves';
    if (/equation of state|eos|hyperon|quark/.test(t)) return 'EoS';
    return 'Neutron Stars';
  }

  function parsePapers(data) {
    var hits = (((data || {}).hits || {}).hits) || [];
    var out = [];
    var seen = {};
    hits.forEach(function (h) {
      var m = h.metadata || {};
      var title = ((m.titles || [])[0] || {}).title || '';
      var abs = absPlain(m);
      if (!title || !MUST_NS.test(title + ' ' + abs)) return;
      var link = paperLink(m);
      if (!link) return;
      if (seen[title]) return;
      seen[title] = true;
      out.push({
        title: title,
        abs: abs,
        date: m.earliest_date || '',
        source: link.label,
        href: link.href,
        topic: topic(title, abs)
      });
    });
    return out.slice(0, 6);
  }

  function parseConfs(data) {
    var hits = (((data || {}).hits || {}).hits) || [];
    var today = todayISO();
    var out = [];
    var seen = {};
    hits.forEach(function (h) {
      var m = h.metadata || {};
      var title = ((m.titles || [])[0] || {}).title || '';
      var open = m.opening_date || '';
      if (!title || !open || open < today) return;
      if (seen[title]) return;
      seen[title] = true;
      var addr = (m.addresses || [])[0] || {};
      var city = (addr.cities || [])[0] || '';
      var country = addr.country || '';
      var place = [city, country].filter(Boolean).join(', ');
      var close = m.closing_date || '';
      var when = fmtDate(open) + (close ? ' – ' + fmtDate(close) : '');
      var href = m.control_number
        ? 'https://inspirehep.net/conferences/' + m.control_number
        : 'https://inspirehep.net/conferences';
      out.push({ title: title, when: when, place: place, href: href, open: open });
    });
    out.sort(function (a, b) { return a.open < b.open ? -1 : 1; });
    return out.slice(0, 4);
  }

  function cardHTML(p) {
    var snippet = p.abs ? p.abs.slice(0, 220) + (p.abs.length > 220 ? '…' : '') : '';
    return '<article class="feed-card">' +
      '<div class="feed-card-meta">' +
        '<span class="feed-source">' + esc(p.source) + '</span>' +
        '<span class="feed-topic-tag">' + esc(p.topic) + '</span>' +
      '</div>' +
      '<h4>' + esc(p.title) + '</h4>' +
      (snippet ? '<p>' + esc(snippet) + '</p>' : '') +
      '<div class="feed-card-footer">' +
        '<span class="feed-date">' + esc(fmtDate(p.date)) + '</span>' +
        '<a class="feed-link" href="' + esc(p.href) + '" target="_blank" rel="noopener">Read ↗</a>' +
      '</div></article>';
  }

  function confHTML(c) {
    return '<a class="field-conf-item" href="' + esc(c.href) + '" target="_blank" rel="noopener">' +
      '<span class="field-conf-when">' + esc(c.when) + '</span>' +
      '<strong>' + esc(c.title) + '</strong>' +
      (c.place ? '<span class="field-conf-place">' + esc(c.place) + '</span>' : '') +
      '</a>';
  }

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function fail(msg) {
    grid.innerHTML = '<p class="error-msg">' + esc(msg) +
      ' See <a href="https://arxiv.org/list/astro-ph.HE/recent" target="_blank" rel="noopener">arXiv:astro-ph.HE</a> and ' +
      '<a href="https://inspirehep.net/literature?q=neutron%20star" target="_blank" rel="noopener">INSPIRE</a>.</p>';
    if (badge) badge.innerHTML = '<span class="live-dot"></span>Offline';
  }

  fetch(PAPER_URL, { headers: { Accept: 'application/json' } })
    .then(function (r) { if (!r.ok) throw new Error('INSPIRE ' + r.status); return r.json(); })
    .then(function (data) {
      var papers = parsePapers(data);
      if (!papers.length) throw new Error('empty');
      grid.innerHTML = papers.map(cardHTML).join('');
      if (stamp) {
        stamp.textContent = 'Updated ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST · source INSPIRE HEP';
      }
      if (badge) badge.innerHTML = '<span class="live-dot"></span>Live';
    })
    .catch(function () {
      fail('Could not reach INSPIRE just now.');
    });

  if (confList) {
    fetch(CONF_URL, { headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('conf'); return r.json(); })
      .then(function (data) {
        var confs = parseConfs(data);
        if (!confs.length) {
          confList.innerHTML = '<p class="field-conf-empty">No upcoming GW / neutron-star meetings listed on INSPIRE yet.</p>';
          return;
        }
        confList.innerHTML = confs.map(confHTML).join('');
      })
      .catch(function () {
        confList.innerHTML = '<p class="field-conf-empty">Conference list unavailable. Check <a href="https://inspirehep.net/conferences" target="_blank" rel="noopener">INSPIRE conferences ↗</a>.</p>';
      });
  }
})();
