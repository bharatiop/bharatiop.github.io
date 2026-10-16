---
title: "Events"
layout: default
excerpt: "Upcoming conferences, schools and workshops in neutron-star, dense-matter, nuclear-astrophysics and gravitational-wave physics — plus NAP Lab milestones."
sitemap: true
feeds: true
permalink: /events/
---

<div class="page-hero">
  <div class="page-hero-inner">
    <span class="eyebrow">Conferences &amp; Schools</span>
    <h1>Events</h1>
    <p>
      Meetings relevant to nuclear astrophysics, neutron stars, gravitational waves and dark matter,
      plus NAP Lab milestones. The calendar refreshes itself: finished meetings drop off and new ones
      are pulled from INSPIRE HEP.
    </p>
    <div class="ev-hero-stats" aria-label="Calendar summary">
      <div><b id="evCount">–</b><span>Upcoming meetings</span></div>
      <div><b id="evNext">–</b><span>Next one starts</span></div>
    </div>
  </div>
</div>

<div class="section">

  <div class="section-header">
    <span class="eyebrow">Field-wide</span>
    <h2 class="section-title">Upcoming conferences &amp; schools</h2>
  </div>

  {% include conferences-widget.html limit=0 filters=true %}

  <div class="section-header" style="margin-top:3.5rem;">
    <span class="eyebrow">Keep looking</span>
    <h2 class="section-title">Where new meetings are announced</h2>
  </div>
  <div class="ev-sources">
    <a class="ev-source" href="https://inspirehep.net/conferences" target="_blank" rel="noopener"><b>INSPIRE conferences ↗</b><span>Searchable database of HEP, nuclear and astro meetings.</span></a>
    <a class="ev-source" href="https://www.lisamission.org/news/conferences/conferences-future/" target="_blank" rel="noopener"><b>LISA Consortium events ↗</b><span>Conferences, schools and workshops in GW physics.</span></a>
    <a class="ev-source" href="https://www.iucaa.in/en/iucaa-events/events-outside-iucaa" target="_blank" rel="noopener"><b>IUCAA events ↗</b><span>Meetings and schools in India (LIGO-India, GW).</span></a>
    <a class="ev-source" href="https://www.astron-soc.in/announcement" target="_blank" rel="noopener"><b>Astronomical Society of India ↗</b><span>National events and notifications.</span></a>
    <a class="ev-source" href="https://heasarc.gsfc.nasa.gov/docs/heasarc/meetings.html" target="_blank" rel="noopener"><b>NASA HEASARC meetings ↗</b><span>High-energy astrophysics, NICER, X-ray timing.</span></a>
    <a class="ev-source" href="https://www.nu.to.infn.it/conf/" target="_blank" rel="noopener"><b>INFN Neutrino Unbound ↗</b><span>Astroparticle and neutrino conferences.</span></a>
  </div>

  <hr class="divider" style="margin:3.5rem 0 2.5rem;">

  <div class="section-header">
    <span class="eyebrow">NAP Lab</span>
    <h2 class="section-title">Lab milestones &amp; talks</h2>
  </div>

  <div class="ev-timeline">
    <div class="ev-tl-item">
      <div class="ev-tl-date">5 Oct 2026</div>
      <p>Sayantan Ghosh successfully defends his PhD thesis on quasinormal modes of neutron stars.</p>
    </div>
    <div class="ev-tl-item">
      <div class="ev-tl-date">Jul 2026</div>
      <p>Pinku Routaray defends his PhD thesis on dark-matter effects on neutron-star structure and joins the Kavli Institute for Astronomy and Astrophysics, China, as a postdoctoral fellow.</p>
    </div>
    <div class="ev-tl-item">
      <div class="ev-tl-date">23 Dec 2024</div>
      <p>Pinku Routaray wins the Best Poster Award at the DAE High Energy Physics Symposium, BHU.</p>
    </div>
    <div class="ev-tl-item">
      <div class="ev-tl-date">2023</div>
      <p>Invited lecture on dark-matter admixed neutron stars at the DAE-BRNS National Symposium.</p>
    </div>
    <div class="ev-tl-item">
      <div class="ev-tl-date">2022</div>
      <p>Dr. Kumar serves as resource person for the SERB School on Nuclear Astrophysics, NIT Rourkela.</p>
    </div>
  </div>
  <div class="mt-6"><a href="{{ site.url }}{{ site.baseurl }}/allnews.html" class="btn btn-secondary">All lab news →</a></div>

  <details class="ev-archive">
    <summary>Earlier in 2026 (archive)</summary>
    <ul>
      <li><span>Oct 5–9, 2026</span><div><a href="https://conference-service.com/conferences/nuclear-physics.html" target="_blank" rel="noopener">8th Workshop on Compound-Nuclear Reactions and Related Topics</a><br>ACROS Fukuoka, Japan</div></li>
      <li><span>Sep 16–22, 2026</span><div><a href="https://www.nu.to.infn.it/conf/" target="_blank" rel="noopener">Erice School — Neutrinos in Cosmology, Astro-, Particle &amp; Nuclear Physics</a><br>Erice, Italy</div></li>
      <li><span>Jul 19–31, 2026</span><div><a href="https://benasque.org/2026relativity/" target="_blank" rel="noopener">New Frontiers in Strong Gravity</a><br>Benasque, Spain</div></li>
      <li><span>Jul 6–14, 2026</span><div><a href="https://www.nu.to.infn.it/conf/" target="_blank" rel="noopener">Multimessenger Astrophysics 2026 — 9th ICE Summer School</a><br>ICE-CSIC, Barcelona, Spain</div></li>
      <li><span>Jul 5–11, 2026</span><div><a href="https://www.lisamission.org/news/conferences/conferences-future/" target="_blank" rel="noopener">Asian Gravitational-Wave Astronomy Meeting (AGWAM 2026)</a><br>NARIT, Chiang Mai, Thailand</div></li>
      <li><span>Jun 28 – Jul 3, 2026</span><div><a href="https://indico.in2p3.fr/event/37646/" target="_blank" rel="noopener">GWsNS-2026 — Gravitational Waves from Neutron Stars</a><br>Roscoff, France</div></li>
    </ul>
  </details>

</div>

<script>
/* Hero summary: read the rendered calendar once the live feed has populated it. */
(function () {
  function summarise() {
    var cards = document.querySelectorAll('.lf-conf');
    var c = document.getElementById('evCount'), n = document.getElementById('evNext');
    var pressed = document.querySelector('[data-feed="conferences"] [aria-pressed="true"]');
    if (!c || !cards.length || (pressed && pressed.getAttribute('data-f') !== 'all')) return;
    c.textContent = cards.length;
    var first = cards[0].querySelector('.lf-chip-when, .lf-chip-live');
    n.textContent = first ? first.textContent : '–';
  }
  var box = document.querySelector('[data-feed="conferences"]');
  if (!box) return;
  new MutationObserver(summarise).observe(box.querySelector('[data-role="list"]'), { childList: true });
  setTimeout(summarise, 800);
})();
</script>
