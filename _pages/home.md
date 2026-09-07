---
title: "NAP Lab"
layout: homelay
excerpt: "Nuclear Astrophysics & Physics Lab at NIT Rourkela — modelling dense matter, neutron-star oscillations, dark matter and multi-messenger signals."
sitemap: true
permalink: /
---

<!-- ═══════════════════════════════════════════════════════════
     HERO — night field
     ═══════════════════════════════════════════════════════════ -->
<section class="hero" aria-label="Introduction">
  <div class="hero-inner">
    <div class="hero-copy">
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
          <div class="hero-meta-num">50<span>+</span></div>
          <div class="hero-meta-label">Publications</div>
        </div>
        <div class="hero-meta-item">
          <div class="hero-meta-num">1.9<span>k+</span></div>
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

    <aside class="hero-watch" aria-label="Rourkela time and calendar">
      {% include datetime-widget.html %}
    </aside>
  </div>

  <div class="scroll-cue" aria-hidden="true">
    <span>Scroll</span>
    <span class="scroll-cue-line"></span>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     WHAT WE DO
     ═══════════════════════════════════════════════════════════ -->
<section class="mission" aria-label="What we do">
  <div class="mission-inner">
    <span class="eyebrow">What we do</span>
    <h2 class="section-title wide">From finite nuclei to gravitational waves</h2>
    <div class="mission-grid">
      <div class="mission-prose">
        <p>
          The same nuclear force that binds a finite nucleus also supports a neutron star.
          We construct relativistic mean-field interactions — G3, IOPB-I, and NITR — fitted
          to nuclear masses, radii and saturation properties, then use that equation of
          state for the stellar structure problem. The question is whether a model that
          describes nuclei still satisfies the two-solar-mass pulsar limit and the tidal
          deformability measured in GW170817.
        </p>
        <p>
          Many neutron-star observables are tightly correlated. A single tidal measurement
          can therefore be turned, through EoS-insensitive relations, into bounds on radius
          and on the moment of inertia of PSR&nbsp;J0737−3039A. In that sense a
          gravitational-wave event is a nuclear-physics experiment, provided the theory
          connecting the two is under control.
        </p>
      </div>
      <div class="mission-prose">
        <p>
          Oscillation modes are a second window on the same physics. <em>f</em>- and
          <em>p</em>-mode frequencies, computed in the Cowling approximation and in
          linearized general relativity, track nuclear parameters such as the slope of the
          symmetry energy. Universal relations between quasinormal modes and tidal
          deformability give a handle that does not lean on any one equation of state.
        </p>
        <p>
          The core need not be purely nucleonic. Hyperons and Δ-baryons soften the
          equation of state and shift the spectrum; a second fluid of WIMP or fermionic
          dark matter does the same. Those shifts have been compared with GW170817
          posteriors and with compact objects such as PSR&nbsp;J0952−0607. Figures from
          the papers, and the full list, are on the
          <a href="{{ site.url }}{{ site.baseurl }}/publications">publications page</a>.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     PEOPLE
     ═══════════════════════════════════════════════════════════ -->
<section class="band" aria-label="People">
  <div class="section">
    <div class="section-header-row reveal">
      <div>
        <span class="eyebrow">People</span>
        <h2 class="section-title">The researchers</h2>
      </div>
      <a href="{{ site.url }}{{ site.baseurl }}/team" class="btn btn-outline">Full team &amp; alumni →</a>
    </div>

    <div class="pi-card pi-card--compact reveal">
      <div class="pi-photo">
        <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/bk_pic.jpeg"
             alt="Dr. Bharat Kumar" loading="lazy">
      </div>
      <div>
        <span class="pi-badge">Principal Investigator</span>
        <h3 class="pi-name">Dr. Bharat Kumar</h3>
        <p class="pi-role">Assistant Professor · Physics &amp; Astronomy, NIT Rourkela · since 2020</p>
        <p class="pi-bio">Nuclear equation of state, neutron-star oscillations, and multi-messenger constraints.</p>
        <div class="pi-links pi-links--text">
          <a href="{{ site.url }}{{ site.baseurl }}/downloads/CV.pdf">CV</a>
          <a href="https://scholar.google.com/citations?user=4498IKgAAAAJ&hl=en" target="_blank" rel="noopener">Scholar</a>
          <a href="mailto:kumarbh@nitrkl.ac.in">Email</a>
        </div>
      </div>
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
     NEWS + IST CLOCK / CALENDAR
     ═══════════════════════════════════════════════════════════ -->
<section class="section" aria-label="News">
  <div class="reveal">
      <div class="section-header-row" style="margin-bottom:2rem;">
        <div>
          <span class="eyebrow">Lab updates</span>
          <h2 class="section-title">News</h2>
        </div>
        <a href="{{ site.url }}{{ site.baseurl }}/allnews.html" class="btn btn-outline btn-sm">All news →</a>
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
  </div>
</section>

{% include field-news-widget.html %}

<!-- ═══════════════════════════════════════════════════════════
     JOIN THE LAB
     ═══════════════════════════════════════════════════════════ -->
<section class="band" aria-label="Open positions">
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
     CODES
     ═══════════════════════════════════════════════════════════ -->
<section class="section" aria-label="Codes and tools">
  <div class="section-header reveal">
    <span class="eyebrow">Open science</span>
    <h2 class="section-title">Codes &amp; tools</h2>
    <p class="section-lead">
      General-relativistic structure and oscillation codes used in the lab.
      Repositories live under the lab GitHub.
    </p>
  </div>

  <div class="code-grid" data-stagger>
    {% for code in site.data.codes %}
    <article class="code-card">
      <h3>{{ code.title }}</h3>
      <p>{{ code.body }}</p>
      <a href="{{ code.url }}" target="_blank" rel="noopener">GitHub ↗</a>
    </article>
    {% endfor %}
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════
     CONTACT
     ═══════════════════════════════════════════════════════════ -->
<section class="band" id="contact" aria-label="Contact">
  <div class="section">
    <div class="section-header reveal">
      <span class="eyebrow">Find us</span>
      <h2 class="section-title">Contact</h2>
    </div>
    <div class="contact-grid">
      <address class="contact-card reveal">
        <p class="contact-name">Dr. Bharat Kumar</p>
        <p class="contact-role">Assistant Professor · Physics &amp; Astronomy</p>
        <p class="contact-lines">
          MC202, Department of Physics &amp; Astronomy<br>
          National Institute of Technology, Rourkela<br>
          Odisha 769008, India
        </p>
        <p class="contact-email">
          <a href="mailto:kumarbh@nitrkl.ac.in">kumarbh@nitrkl.ac.in</a>
        </p>
        <p class="contact-links">
          <a href="https://shorturl.at/hxMY5" target="_blank" rel="noopener">Campus map ↗</a>
          <a href="https://scholar.google.com/citations?user=4498IKgAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar ↗</a>
          <a href="https://website.nitrkl.ac.in/PH/FacultyDetails/kumarbh" target="_blank" rel="noopener">Faculty page ↗</a>
        </p>
      </address>

      <div class="contact-card reveal">
        <p class="contact-name">Affiliation &amp; support</p>
        <p class="contact-lines">
          NAP Lab is part of the
          <a href="https://website.nitrkl.ac.in/PH/" target="_blank" rel="noopener">Department of Physics and Astronomy</a>
          at NIT Rourkela. The work is supported by the
          <a href="https://www.serbonline.in/" target="_blank" rel="noopener">Science and Engineering Research Board (SERB)</a>,
          Government of India.
        </p>
        <div class="footer-logos" style="filter:none;margin-top:1.25rem;">
          <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/nitrlogo.svg" alt="NIT Rourkela"
               style="height:52px;opacity:1;filter:none;" onerror="this.style.display='none'">
          <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/serblogo.png" alt="SERB"
               style="height:46px;opacity:1;filter:none;" onerror="this.style.display='none'">
        </div>
      </div>
    </div>
  </div>
</section>
