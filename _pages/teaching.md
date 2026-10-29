---
title: "Teaching"
layout: default
excerpt: "Teaching activities of Dr. Bharat Kumar at NIT Rourkela — courses, lectures, invited talks and student supervision"
sitemap: true
permalink: /teaching/
---

{% assign lec_pdfs = site.static_files | where_exp: "f", "f.path contains '/downloads/lectures/'" | where_exp: "f", "f.extname == '.pdf'" %}

<div class="teaching-surface">
<div class="page-hero">
  <div class="page-hero-inner">
    <span class="eyebrow">Education</span>
    <h1>Teaching</h1>
    <p>
      Courses taught by Dr. Bharat Kumar at the Department of Physics &amp; Astronomy, NIT Rourkela,
      from first-year wave physics to graduate nuclear astrophysics, plus invited lectures and student supervision.
    </p>
    <div class="ev-hero-stats" aria-label="Teaching at a glance">
      <div><b>5</b><span>Courses</span></div>
      <div><b>UG · PG</b><span>Levels</span></div>
      <div><b>{{ lec_pdfs.size }}</b><span>Lecture PDFs</span></div>
      <div><b>6</b><span>Invited talks</span></div>
    </div>
    <nav class="tch-jump" aria-label="On this page">
      <a href="#courses">Courses</a>
      <a href="#course-pages">Course pages</a>
      <a href="#talks">Invited talks</a>
      <a href="#supervision">Supervision</a>
    </nav>
  </div>
</div>

<div class="section">

  <!-- COURSES -->
  <div class="section-header" id="courses">
    <span class="eyebrow">Current &amp; Recent Courses</span>
    <h2 class="section-title">Courses at NIT Rourkela</h2>
  </div>

  <div class="lf-toolbar tch-toolbar">
    <div class="lf-filters" role="group" aria-label="Filter courses" id="tchFilters">
      <button type="button" data-f="all" aria-pressed="true">All</button>
      <button type="button" data-f="pg" aria-pressed="false">Postgraduate</button>
      <button type="button" data-f="ug" aria-pressed="false">Undergraduate</button>
      <button type="button" data-f="odd" aria-pressed="false">Odd semester</button>
      <button type="button" data-f="even" aria-pressed="false">Even semester</button>
    </div>
  </div>

  <div class="tch-grid" id="tchGrid">

    <article class="tch-card tch-card-feature" data-tags="pg even">
      <div class="tch-card-top">
        <span class="course-code">PH 5202</span>
        <span class="tch-chip">M.Sc. Physics</span>
        <span class="tch-chip tch-chip-sem">Even semester</span>
      </div>
      <h3>Nuclear &amp; Particle Physics</h3>
      <p>Postgraduate core course. Covers nuclear structure, nuclear forces, radioactive decay, nuclear reactions, fission and fusion, and introductory nuclear astrophysics (nucleosynthesis, neutron stars).</p>
      <ul class="tch-topics" aria-label="Topics">
        <li>Nuclear forces</li><li>Decay</li><li>Reactions</li><li>Fission &amp; fusion</li><li>Nucleosynthesis</li><li>Neutron stars</li>
      </ul>
      <div class="tch-links">
        <a class="btn btn-primary" href="{{ site.url }}{{ site.baseurl }}/teaching/nuclear-physics/">Course homepage →</a>
        <a href="{{ site.url }}{{ site.baseurl }}/teaching/nuclear-physics/#lectures">Lectures</a>
        <a href="{{ site.url }}{{ site.baseurl }}/teaching/nuclear-physics/#assignments">Assignments</a>
      </div>
    </article>

    <article class="tch-card" data-tags="pg ug odd">
      <div class="tch-card-top">
        <span class="course-code">PH 3101</span>
        <span class="tch-chip">B.Tech. / M.Sc.</span>
        <span class="tch-chip tch-chip-sem">Odd semester</span>
      </div>
      <h3>Quantum Mechanics</h3>
      <p>Core course. The Schrödinger equation, operators and observables, hydrogen atom, angular momentum, perturbation theory, and an introduction to scattering theory.</p>
      <ul class="tch-topics" aria-label="Topics">
        <li>Operators</li><li>Hydrogen atom</li><li>Angular momentum</li><li>Perturbation theory</li><li>Scattering</li>
      </ul>
    </article>

    <article class="tch-card" data-tags="ug even">
      <div class="tch-card-top">
        <span class="course-code">PH 2102</span>
        <span class="tch-chip">B.Tech. (all branches)</span>
        <span class="tch-chip tch-chip-sem">Even semester</span>
      </div>
      <h3>Waves and Optics</h3>
      <p>Engineering physics course on wave mechanics, interference, diffraction, polarisation and optical instruments, for B.Tech. students across all disciplines.</p>
      <ul class="tch-topics" aria-label="Topics">
        <li>Interference</li><li>Diffraction</li><li>Polarisation</li><li>Optical instruments</li>
      </ul>
    </article>

    <article class="tch-card" data-tags="pg odd">
      <div class="tch-card-top">
        <span class="course-code">PH 5301</span>
        <span class="tch-chip">M.Sc. elective</span>
        <span class="tch-chip tch-chip-sem">Odd semester</span>
      </div>
      <h3>Astrophysics</h3>
      <p>Stellar structure and evolution, compact objects (white dwarfs, neutron stars, black holes), cosmology fundamentals, and multi-messenger astronomy including gravitational waves.</p>
      <ul class="tch-topics" aria-label="Topics">
        <li>Stellar evolution</li><li>Compact objects</li><li>Cosmology</li><li>Gravitational waves</li>
      </ul>
    </article>

    <article class="tch-card" data-tags="ug pg even">
      <div class="tch-card-top">
        <span class="course-code">PH 4014</span>
        <span class="tch-chip">B.Tech. minor / M.Sc.</span>
        <span class="tch-chip tch-chip-sem">Even semester</span>
      </div>
      <h3>Atomic &amp; Molecular Physics</h3>
      <p>Atomic structure, fine and hyperfine structure, multi-electron atoms, molecular bonding, spectroscopy and lasers. Builds on quantum mechanics and electromagnetism.</p>
      <ul class="tch-topics" aria-label="Topics">
        <li>Fine structure</li><li>Multi-electron atoms</li><li>Spectroscopy</li><li>Lasers</li>
      </ul>
    </article>

  </div>
  <p class="lf-empty" id="tchEmpty" hidden>No courses match this filter.</p>

  <hr class="divider" style="margin:3rem 0 2.5rem;">

  <!-- COURSE PAGES -->
  <div class="section-header" id="course-pages">
    <span class="eyebrow">Course materials</span>
    <h2 class="section-title">Course homepages</h2>
  </div>

  <p class="section-lead" style="margin-bottom:20px;">
    Dedicated pages with lectures, assignments and resources, structured like a standard course site.
  </p>

  <div class="join-banner" style="margin-bottom:3rem;">
    <div class="join-banner-text">
      <p>Nuclear &amp; Particle Physics</p>
      <span>PH 5202 / PH 5001 · lectures &amp; full notes password-protected · assignments open</span>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <a class="btn btn-primary" href="{{ site.url }}{{ site.baseurl }}/teaching/nuclear-physics/">Open course page →</a>
      <a class="btn btn-secondary" href="{{ site.url }}{{ site.baseurl }}/teaching/nuclear-physics/#lectures">Lectures</a>
      <a class="btn btn-secondary" href="{{ site.url }}{{ site.baseurl }}/teaching/nuclear-physics/#assignments">Assignments</a>
    </div>
  </div>

  <hr class="divider" style="margin-bottom:2.5rem;">

  <!-- INVITED TALKS -->
  <div class="section-header" id="talks">
    <span class="eyebrow">Outreach &amp; Schools</span>
    <h2 class="section-title">Invited talks &amp; lectures</h2>
  </div>

  <ol class="tch-talks">
    <li>
      <span class="tch-year">2024</span>
      <div><span class="tch-kind">Resource person</span>
        <p><em>DAE-BRNS National Symposium on Nuclear Physics</em>, NIT Rourkela.<br>
        Talk: <em>“Neutron Star Oscillations as Probes of Dense Matter.”</em></p></div>
    </li>
    <li>
      <span class="tch-year">2023</span>
      <div><span class="tch-kind">Invited lecture</span>
        <p><em>DAE Symposium on Nuclear Physics</em>, BHU Varanasi.<br>
        Talk: <em>“Dark Matter Admixed Neutron Stars: Universal Relations and GW Constraints.”</em></p></div>
    </li>
    <li>
      <span class="tch-year">2022</span>
      <div><span class="tch-kind">Resource person</span>
        <p><em>SERB School on Nuclear Astrophysics</em>, NIT Rourkela.<br>
        Lectures on the nuclear equation of state and relativistic mean-field theory.</p></div>
    </li>
    <li>
      <span class="tch-year">2022</span>
      <div><span class="tch-kind">Invited seminar</span>
        <p><em>Physical Research Laboratory (PRL)</em>, Ahmedabad.<br>
        Talk: <em>“Equation of State of Neutron Stars and Multi-Messenger Astrophysics.”</em></p></div>
    </li>
    <li>
      <span class="tch-year">2021</span>
      <div><span class="tch-kind">Invited talk</span>
        <p><em>Workshop on Gravitational Waves and Multi-Messenger Astrophysics</em>, IUCAA Pune.<br>
        Talk: <em>“Constraints on Nuclear Matter from GW170817 and Universal Relations.”</em></p></div>
    </li>
    <li>
      <span class="tch-year">2021</span>
      <div><span class="tch-kind">Online lecture</span>
        <p><em>ICTS Summer School on Gravitational Wave Astronomy.</em><br>
        Topic: <em>“Neutron Star EoS and Tidal Deformability.”</em></p></div>
    </li>
  </ol>

  <hr class="divider" style="margin:2.5rem 0;">

  <!-- SUPERVISION -->
  <div class="section-header" id="supervision">
    <span class="eyebrow">Graduate Supervision</span>
    <h2 class="section-title">PhD &amp; thesis supervision</h2>
  </div>

  <p class="section-lead" style="margin-bottom:24px;">
    Dr. Kumar currently supervises two doctoral students at NIT Rourkela, with additional M.Sc./IM.Sc. thesis students each year.
    Students work on computational astrophysics, nuclear theory and gravitational-wave physics.
    For supervision inquiries please see the <a href="{{ site.url }}{{ site.baseurl }}/vacancies">Openings page →</a>
  </p>

  <div class="tch-people">
    <div class="tch-person">
      <span class="tag">Ongoing PhD</span>
      <h4>Probit J. Kalita</h4>
      <p>Delta-baryons, exotic composition, and non-radial oscillations of neutron stars.</p>
    </div>
    <div class="tch-person">
      <span class="tag">Ongoing PhD</span>
      <h4>Subha Mitra</h4>
      <p>Joined August 2026. M.Sc., University of Calcutta.</p>
    </div>
    <a class="tch-person tch-person-cta" href="{{ site.url }}{{ site.baseurl }}/vacancies">
      <span class="tag">Join the lab</span>
      <h4>Interested in working with us?</h4>
      <p>See current openings for PhD, project and thesis students →</p>
    </a>
  </div>

</div>
</div>

<script>
(function () {
  var box = document.getElementById('tchFilters'), grid = document.getElementById('tchGrid');
  if (!box || !grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.tch-card')), empty = document.getElementById('tchEmpty');
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-f]'); if (!b) return;
    var f = b.getAttribute('data-f'), shown = 0;
    box.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    cards.forEach(function (c) {
      var ok = f === 'all' || (' ' + c.getAttribute('data-tags') + ' ').indexOf(' ' + f + ' ') > -1;
      c.hidden = !ok; if (ok) shown++;
    });
    empty.hidden = shown > 0;
  });
})();
</script>
