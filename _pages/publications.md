---
title: "Publications"
layout: default
excerpt: "NAP Lab publications — neutron stars, dark matter, gravitational waves, nuclear EoS"
sitemap: true
permalink: /publications/
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Literata:wght@600&display=swap">

{% assign all_bk = site.data.papers | where: "bk", true %}
{% assign pubd = all_bk | where: "preprint", false %}
{% assign pres = all_bk | where: "preprint", true %}
{% assign leads = all_bk | where: "lead", true %}

<div class="pr-p">

  <header class="pr-p-hero" style="background-image: linear-gradient(180deg, rgba(11,18,34,.35) 0%, rgba(11,18,34,.92) 100%), url('{{ site.url }}{{ site.baseurl }}/images/research/banner.svg');">
    <div class="pr-p-hero-in">
      <h1>Publications</h1>
      <div class="pr-p-hero-row">
        <div class="pr-p-stats">
          <div><b>{{ all_bk.size }}</b><span><strong>papers</strong>{{ pubd.size }} published · {{ pres.size }} preprints</span></div>
          <div><b>{{ leads.size }}</b><span><strong>lead or corresponding author</strong>marked ★ below</span></div>
          <div><b>20</b><span><strong>h-index</strong>~1700 citations, INSPIRE-HEP</span></div>
        </div>
        <div class="pr-p-ext">
          <a href="https://scholar.google.com/citations?user=4498IKgAAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h4v4M13 3L7 9M6 4H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-2"/></svg></a>
          <a href="https://inspirehep.net/literature?q=a%20Kumar%2C%20Bharat%20and%20aff%20NIT%20Rourkela" target="_blank" rel="noopener">INSPIRE-HEP <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h4v4M13 3L7 9M6 4H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-2"/></svg></a>
          <a href="https://arxiv.org/a/kumar_b_1" target="_blank" rel="noopener">arXiv <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h4v4M13 3L7 9M6 4H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-2"/></svg></a>
        </div>
      </div>
    </div>
  </header>

  <section class="pr-p-wrap" id="papers">
    <div class="pr-p-head">
      <h2>Papers</h2>
      <a class="pr-p-more" href="{{ site.url }}{{ site.baseurl }}/research/">Research topics <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg></a>
    </div>

    <div class="pr-p-chips" id="ppChips" role="group" aria-label="Filter papers by topic">
      <button type="button" data-f="all" aria-pressed="true"><span>All</span><i>{{ site.data.papers.size }}</i></button>
      {% assign defs = "eos|Equation of state,osc|Neutron-star oscillations,dm|Dark matter,exo|Exotic matter,mg|Modified gravity,gw|GW &amp; multi-messenger,nuc|Nuclear structure,pre|Preprints" | split: "," %}
      {% for d in defs %}
        {% assign kv = d | split: "|" %}
        {% assign sel = site.data.papers | where_exp: "p", "p.tags contains kv[0]" %}
        <button type="button" data-f="{{ kv[0] }}" aria-pressed="false"><span>{{ kv[1] }}</span><i>{{ sel.size }}</i></button>
      {% endfor %}
    </div>

    <div class="pr-p-tools">
      <label class="pr-p-search"><span class="pr-p-sr">Search papers</span>
        <input type="search" id="ppSearch" placeholder="Search title, author, journal…" autocomplete="off">
      </label>
      <span class="pr-p-count" id="ppCount" aria-live="polite"></span>
    </div>

    <div class="pr-p-list" id="ppList">
      {% for p in site.data.papers %}
      <article class="pr-p-item" data-a="{{ p.tags | join: ' ' }}">
        <span class="pr-p-year">{{ p.year }}</span>
        <div class="pr-p-body">
          <h3>{{ p.title }}</h3>
          <div class="pr-p-meta">
            {% if p.preprint %}<span class="pr-p-badge pre">Preprint</span>{% else %}{% if p.doi != "" %}<a class="pr-p-badge jr" href="https://doi.org/{{ p.doi }}" target="_blank" rel="noopener">{{ p.journal }}</a>{% elsif p.arxiv != "" %}<a class="pr-p-badge jr" href="https://arxiv.org/abs/{{ p.arxiv }}" target="_blank" rel="noopener">{{ p.journal }}</a>{% else %}<span class="pr-p-badge jr">{{ p.journal }}</span>{% endif %}{% endif %}
            {% if p.arxiv != "" %}<a class="pr-p-badge ax" href="https://arxiv.org/abs/{{ p.arxiv }}" target="_blank" rel="noopener">arXiv:{{ p.arxiv }}</a>{% endif %}
            {% if p.pdf != "" %}<a class="pr-p-badge pdf" href="{{ p.pdf }}" target="_blank" rel="noopener">PDF</a>{% endif %}
            <span class="pr-p-au">{% for a in p.authors %}{% if a == "Bharat Kumar" %}<b>{{ a }}</b>{% else %}{{ a }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}{% if p.lead %} <em class="pr-p-star" title="Lead or corresponding author">★</em>{% endif %}</span>
          </div>
        </div>
      </article>
      {% endfor %}
      <p class="pr-p-empty" id="ppEmpty" hidden>No papers match this filter.</p>
    </div>
  </section>

  <section class="pr-p-figs" aria-label="Selected paper figures">
    <div class="pr-p-wrap">
      <div class="pr-p-head"><h2>Selected results</h2></div>
      <p class="pr-p-lead">Figures taken directly from NAP Lab publications. Follow the citation under each one to open the paper.</p>
      <div class="obs-grid paper-fig-grid">
        {% for fig in site.data.paper_figures %}
        <figure class="obs-card paper-fig-card">
          <div class="paper-fig-img"><img src="{{ site.url }}{{ site.baseurl }}{{ fig.image }}" alt="{{ fig.alt }}" loading="lazy"></div>
          <figcaption>
            <strong>{{ fig.title }}</strong>
            <a class="paper-fig-link" href="{{ fig.url }}" target="_blank" rel="noopener">{{ fig.citation }} ↗</a>
          </figcaption>
        </figure>
        {% endfor %}
      </div>
    </div>
  </section>

</div>

<script>
(function () {
  var chips = document.getElementById('ppChips'), list = document.getElementById('ppList');
  if (!chips || !list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll('.pr-p-item'));
  items.forEach(function (it) { it.dataset.text = it.textContent.toLowerCase().replace(/\s+/g, ' '); });
  var state = { f: 'all', q: '' };
  function apply() {
    var shown = 0;
    items.forEach(function (it) {
      var okF = state.f === 'all' || (' ' + it.dataset.a + ' ').indexOf(' ' + state.f + ' ') > -1;
      var ok = okF && (!state.q || it.dataset.text.indexOf(state.q) > -1);
      it.hidden = !ok; if (ok) shown++;
    });
    document.getElementById('ppCount').textContent = shown + ' of ' + items.length;
    document.getElementById('ppEmpty').hidden = shown > 0;
    chips.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.f === state.f ? 'true' : 'false'); });
  }
  chips.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-f]'); if (!b) return;
    state.f = (b.dataset.f !== 'all' && state.f === b.dataset.f) ? 'all' : b.dataset.f; apply();   /* second click clears */
  });
  document.getElementById('ppSearch').addEventListener('input', function () { state.q = this.value.trim().toLowerCase(); apply(); });
  apply();
})();
</script>
