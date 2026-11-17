---
title: "Research"
layout: default
excerpt: "Research areas of NAP Lab — neutron stars, gravitational waves, dark matter, equation of state"
sitemap: true
permalink: /research/
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Literata:wght@600&display=swap">

<div class="pr-r">

  <header class="pr-r-strip" style="background-image: url('{{ site.url }}{{ site.baseurl }}/images/research/banner.svg');" role="img" aria-label="Illustration of a neutron star with beams and a gravitational wave"></header>

  <section class="pr-r-wrap" id="topics">
    <div class="pr-r-head">
      <div>
        <p class="pr-r-eyebrow">What we work on</p>
        <h1>Research</h1>
      </div>
      <a class="pr-r-more" href="{{ site.url }}{{ site.baseurl }}/publications/">All papers <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg></a>
    </div>

    <div class="pr-r-areas" id="rsAreas" role="group" aria-label="Filter by area">
      <span class="pr-r-areas-label">Main areas</span>
      <button type="button" data-f="eos" aria-pressed="false">Equation of state</button>
      <button type="button" data-f="osc" aria-pressed="false">Neutron-star oscillations</button>
      <button type="button" data-f="gw" aria-pressed="false">Gravitational waves</button>
      <button type="button" data-f="dm" aria-pressed="false">Dark matter</button>
      <button type="button" data-f="exo" aria-pressed="false">Exotic matter</button>
      <button type="button" data-f="therm" aria-pressed="false">Thermal evolution</button>
      <button type="button" data-f="mm" aria-pressed="false">Multi-messenger</button>
    </div>

    <div class="pr-r-tiles" id="rsTiles">
      {% for t in site.data.research_tiles %}
      <article class="pr-r-tile{% if t.areas contains 'gw' or t.areas contains 'osc' %} is-gw{% endif %}" data-a="{{ t.areas }}">
        <img class="pr-r-thumb" src="{{ site.url }}{{ site.baseurl }}/images/research/{{ t.slug }}.svg" alt="" loading="lazy">
        <h2>{{ t.title }}</h2>
        <p>{{ t.body }}</p>
        <div class="pr-r-pp"><b>{% if t.papers.size > 1 %}Papers{% else %}Paper{% endif %}</b>
          {% for p in t.papers %}<span class="pr-r-nw"><a href="{{ p.url }}" target="_blank" rel="noopener">{{ p.label }}</a> ({{ p.venue }})</span>{% unless forloop.last %}, {% endunless %}{% endfor %}
        </div>
      </article>
      {% endfor %}
    </div>
  </section>

</div>

<script>
(function () {
  var box = document.getElementById('rsAreas'), grid = document.getElementById('rsTiles');
  if (!box || !grid) return;
  var tiles = grid.querySelectorAll('.pr-r-tile');
  function show(f) {
    box.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-f') === f ? 'true' : 'false'); });
    tiles.forEach(function (t) { t.hidden = !(!f || (' ' + t.getAttribute('data-a') + ' ').indexOf(' ' + f + ' ') > -1); });
  }
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-f]'); if (!b) return;
    show(b.getAttribute('aria-pressed') === 'true' ? null : b.getAttribute('data-f'));   /* second click clears */
  });
})();
</script>
