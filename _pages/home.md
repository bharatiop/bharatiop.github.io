---
title: "NAP Lab"
layout: homelay
excerpt: "Nuclear Astrophysics & Physics Lab at NIT Rourkela — modelling dense matter, neutron-star oscillations, dark matter and multi-messenger signals."
sitemap: true
permalink: /
---

<!-- ═══════════════════════════════════════════════════════════
     HERO — full viewport
     ═══════════════════════════════════════════════════════════ -->
<section class="hero" aria-label="Introduction">
  <div class="hero-orb" aria-hidden="true"></div>

  <div class="hero-inner">
    <span class="hero-eyebrow">Nuclear Astrophysics &amp; Physics Lab</span>

    <h1>Reading the physics of <em>matter at its limit</em>.</h1>

    <p class="hero-desc">
      Inside a neutron star, matter is squeezed past anything we can make on Earth.
      At the <a href="https://www.nitrkl.ac.in/" target="_blank" rel="noopener">National Institute of Technology, Rourkela</a>
      we build the nuclear models — and test them against gravitational waves,
      pulsar timing and X-ray data — to work out what that matter actually is.
    </p>

    <div class="hero-cta">
      <a href="{{ site.url }}{{ site.baseurl }}/research" class="btn btn-primary">Explore the research</a>
      <a href="{{ site.url }}{{ site.baseurl }}/publications" class="btn btn-ghost">Publications</a>
    </div>

    <div class="hero-meta">
      <div class="hero-meta-item">
        <div class="hero-meta-num">30<span>+</span></div>
        <div class="hero-meta-label">Publications</div>
      </div>
      <div class="hero-meta-item">
        <div class="hero-meta-num">1.5<span>k+</span></div>
        <div class="hero-meta-label">Citations</div>
      </div>
      <div class="hero-meta-item">
        <div class="hero-meta-num">3</div>
        <div class="hero-meta-label">PhD researchers</div>
      </div>
      <div class="hero-meta-item">
        <div class="hero-meta-num">2020</div>
        <div class="hero-meta-label">Lab founded</div>
      </div>
    </div>
  </div>

  <div class="scroll-cue" aria-hidden="true">
    <span>Scroll</span>
    <span class="scroll-cue-line"></span>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     MISSION
     ═══════════════════════════════════════════════════════════ -->
<section class="mission" aria-label="Mission">
  <div class="mission-inner">
    <div class="mission-grid">
      <div class="reveal">
        <span class="eyebrow">What we do</span>
        <p class="mission-statement">
          We use the <em>densest objects in the universe</em> as laboratories for
          nuclear physics we can never build on Earth.
        </p>
      </div>
      <div class="mission-aside reveal">
        <p>
          A neutron star packs more than the Sun's mass into a sphere the width of a city.
          Its core reaches several times the density of an atomic nucleus — a regime no
          accelerator on Earth can reproduce.
        </p>
        <p>
          That makes every merger LIGO hears, every pulsar NICER times, and every
          glitch we observe a measurement of nuclear physics. Our work is building the
          theory precise enough to read those measurements.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     RESEARCH ROWS — question-driven
     ═══════════════════════════════════════════════════════════ -->
<section class="section" aria-label="Research areas">
  <div class="section-header reveal">
    <span class="eyebrow">Research</span>
    <h2 class="section-title wide">Four questions driving the lab</h2>
    <p class="section-lead">
      Each one connects a piece of nuclear theory to something a telescope or
      detector can actually measure.
    </p>
  </div>

  <div class="rows">
    {% for row in site.data.research_rows %}
    {% assign row_is_odd = forloop.index0 | modulo: 2 %}
    <article class="row-item{% if row_is_odd == 1 %} reverse{% endif %} reveal">
      <div class="row-media">
        <img src="{{ site.url }}{{ site.baseurl }}{{ row.image }}" alt="{{ row.alt }}" loading="lazy">
        {% if row.citation %}<span class="row-media-tag">{{ row.citation }}</span>{% endif %}
      </div>
      <div class="row-body">
        <span class="row-num">{{ row.number }} — {{ row.label }}</span>
        <h3>{{ row.question }}</h3>
        {% for para in row.body %}<p>{{ para }}</p>{% endfor %}
        {% if row.tags %}
        <div class="row-tags">
          {% for t in row.tags %}<span class="tag">{{ t }}</span>{% endfor %}
        </div>
        {% endif %}
        <a href="{{ site.url }}{{ site.baseurl }}{{ row.link_url | default: '/research' }}" class="row-link">{{ row.link_text | default: "Read more →" }}</a>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     METRICS BAND
     ═══════════════════════════════════════════════════════════ -->
<section class="band-dark" aria-label="Lab at a glance">
  <div class="section">
    <div class="section-header reveal">
      <span class="eyebrow">At a glance</span>
      <h2 class="section-title">The lab in numbers</h2>
    </div>
    <div class="metrics reveal">
      <div class="metric">
        <div class="metric-num">30+</div>
        <div class="metric-label">Peer-reviewed papers</div>
      </div>
      <div class="metric">
        <div class="metric-num">1,540+</div>
        <div class="metric-label">Citations</div>
      </div>
      <div class="metric">
        <div class="metric-num">6</div>
        <div class="metric-label">Researchers &amp; students</div>
      </div>
      <div class="metric">
        <div class="metric-num">1</div>
        <div class="metric-label">PhD awarded</div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     SELECTED FIGURES
     ═══════════════════════════════════════════════════════════ -->
<section class="obs-section" aria-label="Selected paper figures">
  <div class="obs-inner">
    <div class="section-header reveal">
      <span class="eyebrow">From our papers</span>
      <h2 class="section-title wide">Selected results</h2>
      <p class="obs-lead">
        Figures taken directly from NAP Lab publications. Follow the citation under each
        one to open the paper.
      </p>
    </div>

    <div class="obs-grid paper-fig-grid" data-stagger>
      {% for fig in site.data.paper_figures %}
      <figure class="obs-card paper-fig-card">
        <div class="paper-fig-img">
          <img src="{{ site.url }}{{ site.baseurl }}{{ fig.image }}" alt="{{ fig.alt }}" loading="lazy">
        </div>
        <figcaption>
          <strong>{{ fig.title }}</strong>
          <a class="paper-fig-link" href="{{ fig.url }}" target="_blank" rel="noopener">{{ fig.citation }} ↗</a>
        </figcaption>
      </figure>
      {% endfor %}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     PRINCIPAL INVESTIGATOR
     ═══════════════════════════════════════════════════════════ -->
<section class="section" aria-label="Principal Investigator">
  <div class="section-header reveal">
    <span class="eyebrow">Principal Investigator</span>
    <h2 class="section-title">Who runs the lab</h2>
  </div>

  <div class="pi-card reveal">
    <div class="pi-photo">
      <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/bk_pic.jpeg"
           alt="Dr. Bharat Kumar" loading="lazy"
           onerror="this.parentElement.innerHTML='<span style=&quot;font-family:var(--display);font-size:3rem;font-weight:700;color:var(--plasma-deep);display:flex;align-items:center;justify-content:center;height:100%&quot;>BK</span>'">
    </div>

    <div>
      <span class="pi-badge">Assistant Professor</span>
      <h3 class="pi-name">Dr. Bharat Kumar</h3>
      <p class="pi-role">Department of Physics &amp; Astronomy, NIT Rourkela — since June 2020</p>

      <p class="pi-bio">
        Bharat works on the nuclear equation of state and what it implies for compact
        objects — from relativistic mean-field models of dense matter through to
        gravitational-wave signatures of neutron star oscillations. He founded NAP Lab
        in 2020 and supervises its PhD and Masters researchers.
      </p>

      <div class="pi-track">
        <div class="pi-track-item"><strong>M.Sc. Physics</strong> — Aligarh Muslim University</div>
        <div class="pi-track-item"><strong>Ph.D.</strong> — with S. K. Patra, Institute of Physics, Bhubaneswar</div>
        <div class="pi-track-item"><strong>Postdoc</strong> — LIGO-India group of Sukanta Bose, IUCAA Pune</div>
        <div class="pi-track-item"><strong>Postdoc</strong> — with Takashi Nakatsukasa, University of Tsukuba, Japan</div>
      </div>

      <div class="pi-links">
        <a href="{{ site.url }}{{ site.baseurl }}/downloads/CV.pdf" class="btn btn-outline btn-sm">Curriculum Vitae</a>
        <a href="https://scholar.google.com/citations?user=4498IKgAAAAJ&hl=en" class="btn btn-outline btn-sm" target="_blank" rel="noopener">Google Scholar ↗</a>
        <a href="mailto:kumarbh@nitrkl.ac.in" class="btn btn-outline btn-sm">Email</a>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     TEAM
     ═══════════════════════════════════════════════════════════ -->
<section class="band" aria-label="Team">
  <div class="section">
    <div class="section-header-row reveal">
      <div>
        <span class="eyebrow">People</span>
        <h2 class="section-title">The researchers</h2>
      </div>
      <a href="{{ site.url }}{{ site.baseurl }}/team" class="btn btn-outline">Full team &amp; alumni →</a>
    </div>

    <div class="team-grid" data-stagger>
      {% for person in site.data.home_team %}
      <div class="team-card">
        <div class="team-avatar">
          <img src="{{ site.url }}{{ site.baseurl }}{{ person.photo }}" alt="{{ person.name }}" loading="lazy"
               onerror="this.parentElement.classList.add('initials');this.parentElement.textContent='{{ person.initials }}';this.remove()">
        </div>
        <h3>{{ person.name }}</h3>
        <div class="role">{{ person.role }}</div>
        <span class="tag{% if person.tag_class %} {{ person.tag_class }}{% endif %}">{{ person.tag }}</span>
        <div class="team-links">
          {% for link in person.links %}<a href="{{ link.url }}" class="tag" target="_blank" rel="noopener">{{ link.label }}</a>{% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     NEWS + EVENTS
     ═══════════════════════════════════════════════════════════ -->
<section class="section" aria-label="News and events">
  <div class="two-col">

    <div class="reveal">
      <div class="section-header-row" style="margin-bottom:2rem;">
        <div>
          <span class="eyebrow">Lab updates</span>
          <h2 class="section-title" style="font-size:clamp(1.5rem,2.6vw,2.1rem)">News</h2>
        </div>
      </div>
      <div class="news-list">
        <div class="news-item">
          <span class="news-date">July 2026</span>
          <p class="news-text">
            <strong>Pinku Routaray defends his PhD</strong> on “Dark Matter Effects on Neutron
            Star Structure and Observables”, and moves to the Kavli Institute for Astronomy
            and Astrophysics, China, as a postdoctoral fellow.
          </p>
        </div>
        <div class="news-item">
          <span class="news-date">Feb 2026</span>
          <p class="news-text">
            New paper on spacetime curvature as a probe of exotic core phases in modified
            gravity — <a href="https://doi.org/10.1103/rjzl-pcr4" target="_blank" rel="noopener">Phys. Rev. D 113, 024070 ↗</a>
          </p>
        </div>
        <div class="news-item">
          <span class="news-date">Sep 2025</span>
          <p class="news-text">
            Work on adiabatic sound speeds and radial-oscillation stability published in
            <a href="https://doi.org/10.1088/1475-7516/2025/09/025" target="_blank" rel="noopener">JCAP 09, 025 ↗</a>
          </p>
        </div>
        <div class="news-item">
          <span class="news-date">Dec 2024</span>
          <p class="news-text">
            Pinku wins <strong>Best Poster</strong> at the DAE High Energy Physics Symposium, BHU.
            <a href="https://indico.cern.ch/event/1426931/" target="_blank" rel="noopener">Event ↗</a>
          </p>
        </div>
      </div>
      <div class="mt-8">
        <a href="{{ site.url }}{{ site.baseurl }}/allnews.html" class="btn btn-outline btn-sm">All news →</a>
      </div>
    </div>

    <div class="reveal">
      <div class="section-header-row" style="margin-bottom:2rem;">
        <div>
          <span class="eyebrow">Conferences &amp; schools</span>
          <h2 class="section-title" style="font-size:clamp(1.5rem,2.6vw,2.1rem)">Upcoming</h2>
        </div>
      </div>
      <div class="news-list">
        <div class="news-item">
          <span class="news-date">28 Jun – 3 Jul 2026</span>
          <p class="news-text"><strong>GWsNS-2026</strong> — Gravitational Waves from Neutron Stars school, Roscoff, France.</p>
        </div>
        <div class="news-item">
          <span class="news-date">5–11 Jul 2026</span>
          <p class="news-text"><strong>AGWAM 2026</strong> — Asian Gravitational Wave Astronomy Meeting, Chiang Mai, Thailand.</p>
        </div>
        <div class="news-item">
          <span class="news-date">6–14 Jul 2026</span>
          <p class="news-text"><strong>Multimessenger Astrophysics 2026</strong> — 9th ICE Summer School, Barcelona, Spain.</p>
        </div>
        <div class="news-item">
          <span class="news-date">16–22 Sep 2026</span>
          <p class="news-text"><strong>Erice School</strong> — Neutrinos in Cosmology, Astro-, Particle &amp; Nuclear Physics, Sicily.</p>
        </div>
      </div>
      <div class="mt-8">
        <a href="{{ site.url }}{{ site.baseurl }}/events" class="btn btn-outline btn-sm">All events →</a>
      </div>
    </div>

  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     SELECTED PUBLICATIONS
     ═══════════════════════════════════════════════════════════ -->
<section class="band" aria-label="Publications">
  <div class="section">
    <div class="section-header-row reveal">
      <div>
        <span class="eyebrow">Research output</span>
        <h2 class="section-title">Recent publications</h2>
      </div>
      <a href="{{ site.url }}{{ site.baseurl }}/publications" class="btn btn-outline">All publications →</a>
    </div>

    <div class="pub-list reveal">
      <div class="pub-item highlight-pub">
        <span class="pub-year">2026</span>
        <div class="pub-info">
          <h4>Spacetime Curvature as a Probe of Exotic Core Phases in Neutron Stars within Modified Gravity</h4>
          <p class="pub-authors">
            <a href="https://sites.google.com/view/sayantanns" target="_blank" rel="noopener">Sayantan Ghosh</a>,
            Bharat Kumar, Subhash Mahapatra
          </p>
          <div class="pub-links">
            <a href="https://doi.org/10.1103/rjzl-pcr4" class="pub-link" target="_blank" rel="noopener">Phys. Rev. D 113, 024070</a>
          </div>
        </div>
      </div>

      <div class="pub-item highlight-pub">
        <span class="pub-year">2025</span>
        <div class="pub-info">
          <h4>Observable Signatures of a Quarkyonic Phase in Neutron Stars</h4>
          <p class="pub-authors">
            <a href="https://scholar.google.com/citations?user=h9DkoD4AAAAJ&hl=en" target="_blank" rel="noopener">Probit J. Kalita</a>,
            Tuhin Malik, Tianqi Zhao, Bharat Kumar, James M. Lattimer
          </p>
          <div class="pub-links">
            <a href="https://arxiv.org/abs/2510.23405" class="pub-link" target="_blank" rel="noopener">arXiv:2510.23405</a>
          </div>
        </div>
      </div>

      <div class="pub-item highlight-pub">
        <span class="pub-year">2025</span>
        <div class="pub-info">
          <h4>The Role of Adiabatic Sound Speeds in Neutron Star Radial Oscillations and Stability</h4>
          <p class="pub-authors">
            <a href="https://sites.google.com/view/sayantanns" target="_blank" rel="noopener">Sayantan Ghosh</a>,
            Tianqi Zhao, Bharat Kumar,
            <a href="https://scholar.google.com/citations?user=mx_PbkcAAAAJ&hl=en" target="_blank" rel="noopener">Sailesh Ranjan Mohanty</a>
          </p>
          <div class="pub-links">
            <a href="https://doi.org/10.1088/1475-7516/2025/09/025" class="pub-link" target="_blank" rel="noopener">JCAP 09, 025</a>
          </div>
        </div>
      </div>

      <div class="pub-item highlight-pub">
        <span class="pub-year">2024</span>
        <div class="pub-info">
          <h4>Probing the Impact of Delta-Baryons on Nuclear Matter and Non-Radial Oscillations in Neutron Stars</h4>
          <p class="pub-authors">
            <a href="https://scholar.google.com/citations?user=h9DkoD4AAAAJ&hl=en" target="_blank" rel="noopener">Probit Jyoti Kalita</a>,
            <a href="https://scholar.google.com/citations?user=d1j-L6cAAAAJ&hl=en" target="_blank" rel="noopener">Pinku Routaray</a>,
            <a href="https://sites.google.com/view/sayantanns" target="_blank" rel="noopener">Sayantan Ghosh</a>,
            Bharat Kumar, Bijay K. Agrawal
          </p>
          <div class="pub-links">
            <a href="https://doi.org/10.1088/1475-7516/2024/04/065" class="pub-link" target="_blank" rel="noopener">JCAP 04, 065</a>
            <a href="https://arxiv.org/abs/2308.09008" class="pub-link" target="_blank" rel="noopener">arXiv</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     JOIN THE LAB
     ═══════════════════════════════════════════════════════════ -->
<section class="band-dark" aria-label="Open positions">
  <div class="section">
    <div class="section-header reveal">
      <span class="eyebrow">Opportunities</span>
      <h2 class="section-title wide">Join the lab</h2>
      <p class="section-lead">
        We take students and postdocs who want to work at the boundary between nuclear
        theory and observational astrophysics. Prior experience with numerical methods
        helps; curiosity matters more.
      </p>
    </div>

    <div class="openings-grid" data-stagger>
      <div class="opening-card">
        <span class="opening-type">PhD</span>
        <h4>PhD Fellowship — DST WISE</h4>
        <p>
          Projects in neutron-star asteroseismology, dark-matter admixed stars, and
          multi-messenger constraints on the equation of state.
        </p>
        <a href="https://onlinedst.gov.in/Projectproposalformat.aspx" target="_blank" rel="noopener">Apply via DST WISE →</a>
      </div>

      <div class="opening-card">
        <span class="opening-type">Postdoc</span>
        <h4>SERB National Postdoctoral Fellowship</h4>
        <p>
          Postdoctoral work in nuclear astrophysics, gravitational-wave oscillation modes,
          or EoS inference from LIGO and NICER data.
        </p>
        <a href="https://serbonline.in/SERB/npdf" target="_blank" rel="noopener">Apply via SERB →</a>
      </div>

      <div class="opening-card">
        <span class="opening-type">Any time</span>
        <h4>Bring your own fellowship</h4>
        <p>
          Already hold external funding, or planning to apply? Write with a short note on
          what you want to work on and we will take it from there.
        </p>
        <a href="mailto:kumarbh@nitrkl.ac.in">kumarbh@nitrkl.ac.in →</a>
      </div>
    </div>

    <div class="mt-8 reveal">
      <a href="{{ site.url }}{{ site.baseurl }}/vacancies" class="btn btn-primary">All openings &amp; details →</a>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     CONTACT
     ═══════════════════════════════════════════════════════════ -->
<section class="section" aria-label="Contact">
  <div class="two-col">
    <div class="reveal">
      <span class="eyebrow">Find us</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.6vw,2.1rem)">Contact</h2>
      <address class="mt-6">
        <strong style="color:var(--ink)">Dr. Bharat Kumar</strong><br>
        MC202, Department of Physics &amp; Astronomy<br>
        National Institute of Technology, Rourkela<br>
        Odisha 769008, India<br><br>
        <a href="mailto:kumarbh@nitrkl.ac.in">kumarbh@nitrkl.ac.in</a><br>
        <a href="https://shorturl.at/hxMY5" target="_blank" rel="noopener">Campus map ↗</a>
      </address>
    </div>

    <div class="reveal">
      <span class="eyebrow">Funding &amp; affiliation</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.6vw,2.1rem)">Support</h2>
      <p style="font-size:15.5px;color:var(--ink-2);line-height:1.85;margin-top:1.5rem;">
        Our work is supported by the
        <a href="https://www.serbonline.in/" target="_blank" rel="noopener" style="color:var(--plasma-deep)">Science and Engineering Research Board (SERB)</a>,
        Government of India.
      </p>
      <p style="font-size:15.5px;color:var(--ink-2);line-height:1.85;margin-top:1em;">
        NAP Lab is part of the
        <a href="https://website.nitrkl.ac.in/PH/" target="_blank" rel="noopener" style="color:var(--plasma-deep)">Department of Physics and Astronomy</a>
        at NIT Rourkela.
      </p>
      <div class="footer-logos mt-8" style="filter:none;">
        <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/nitrlogo.svg" alt="NIT Rourkela"
             style="height:52px;opacity:1;filter:none;" onerror="this.style.display='none'">
        <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/serblogo.png" alt="SERB"
             style="height:46px;opacity:1;filter:none;" onerror="this.style.display='none'">
      </div>
    </div>
  </div>
</section>
