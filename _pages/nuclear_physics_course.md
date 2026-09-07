---
title: "Nuclear & Particle Physics"
layout: default
excerpt: "PH 5202 / PH 5001 — Nuclear and Particle Physics course homepage: lectures, assignments, and resources"
sitemap: true
permalink: /teaching/nuclear-physics/
---

{% assign lec_pdfs = site.static_files | where_exp: "f", "f.path contains '/downloads/nuclearphysics/lectures/'" | where_exp: "f", "f.extname == '.pdf'" | sort: "name" %}
{% assign asg_pdfs = site.static_files | where_exp: "f", "f.path contains '/downloads/nuclearphysics/assignments/'" | where_exp: "f", "f.extname == '.pdf'" | sort: "name" %}
{% assign res_pdfs = site.static_files | where_exp: "f", "f.path contains '/downloads/nuclearphysics/resources/'" | where_exp: "f", "f.extname == '.pdf'" | sort: "name" %}

<div class="page-hero course-hero">
  <div class="page-hero-inner">
    <span class="eyebrow">Course homepage · Teaching</span>
    <div class="course-hero-codes">
      <span class="course-code">PH 5202</span>
      <span class="course-code">PH 5001</span>
    </div>
    <h1>Nuclear &amp; Particle Physics</h1>
    <p class="course-hero-meta">
      M.Sc. Physics · Department of Physics &amp; Astronomy · NIT Rourkela<br>
      Instructor: <strong>Dr. Bharat Kumar</strong> · Even semester
    </p>
    <nav class="course-toc" aria-label="Course sections">
      <a href="#overview">Overview</a>
      <a href="#lectures">Lectures <span class="course-toc-count">{{ lec_pdfs.size }}</span></a>
      <a href="#assignments">Assignments <span class="course-toc-count">{{ asg_pdfs.size }}</span></a>
      <a href="#resources">Resources <span class="course-toc-count">{{ res_pdfs.size }}</span></a>
    </nav>
  </div>
</div>

<div class="section">

  <!-- OVERVIEW -->
  <div class="section-header" id="overview">
    <span class="eyebrow">Syllabus</span>
    <h2 class="section-title">Course overview</h2>
  </div>

  <div class="course-overview-grid">
    <div class="course-overview-main">
      <p>
        This postgraduate course develops the foundations of nuclear structure and
        low-energy nuclear reactions, and connects them to particle-physics ideas
        used in modern nuclear astrophysics. Students work through nuclear forces,
        radioactive decay, fission and fusion, and selected topics linking the
        laboratory nucleus to compact stars and nucleosynthesis.
      </p>
      <h3 class="course-subhead">Topics</h3>
      <ul class="course-topic-list">
        <li>Nuclear sizes, masses, and binding; semi-empirical mass formula</li>
        <li>Nuclear force and two-nucleon systems</li>
        <li>Shell model and collective models</li>
        <li>Radioactivity: α, β, and γ decay</li>
        <li>Nuclear reactions and cross sections</li>
        <li>Fission, fusion, and reactors (introductory)</li>
        <li>Introduction to particle physics for nuclear science</li>
        <li>Nuclear astrophysics: nucleosynthesis and neutron stars (selected)</li>
      </ul>
    </div>
    <aside class="course-info-card">
      <h3>At a glance</h3>
      <dl class="course-info-dl">
        <dt>Level</dt><dd>M.Sc. Physics (core / related)</dd>
        <dt>Semester</dt><dd>Even</dd>
        <dt>Department</dt><dd>Physics &amp; Astronomy, NIT Rourkela</dd>
        <dt>Materials</dt>
        <dd>
          {{ lec_pdfs.size }} lectures
          {% if asg_pdfs.size > 0 %}· {{ asg_pdfs.size }} assignments{% endif %}
        </dd>
        <dt>Contact</dt>
        <dd><a href="mailto:kumarbh@nitrkl.ac.in">kumarbh@nitrkl.ac.in</a></dd>
      </dl>
      <a class="btn btn-secondary btn-sm" href="{{ site.url }}{{ site.baseurl }}/teaching/">← All courses</a>
    </aside>
  </div>

  <hr class="divider" style="margin:48px 0;">

  <!-- LECTURES (password-protected downloads) -->
  <div class="section-header" id="lectures">
    <span class="eyebrow">Downloads · Password protected</span>
    <h2 class="section-title">Lectures</h2>
    <p class="course-section-lead">
      Lecture PDFs for enrolled students. Enter the course password once per browser session to unlock downloads.
    </p>
  </div>

  <div class="course-lock-banner" role="status">
    <div class="course-lock-banner-text">
      <strong>Downloads locked</strong>
      <span>Ask your instructor for the password (shared in class / LMS).</span>
    </div>
    <button type="button" class="btn btn-primary btn-sm" data-course-unlock>Enter password</button>
  </div>
  <div class="course-lock-unlocked" hidden role="status">
    <div class="course-lock-banner-text">
      <strong>Downloads unlocked</strong>
      <span>for this browser session. You can open lecture PDFs and the full notes below.</span>
    </div>
  </div>

  {% if lec_pdfs.size > 0 %}
  <div class="course-table-wrap" style="margin-bottom:52px;">
    <table class="course-table">
      <thead>
        <tr>
          <th class="col-num">#</th>
          <th>Title</th>
          <th class="col-file">File</th>
          <th class="col-action">Download</th>
        </tr>
      </thead>
      <tbody>
        {% for file in lec_pdfs %}
        {% assign basename = file.name | replace: '.pdf', '' %}
        {% if basename contains 'Lecture' %}
          {% assign lec_num = basename | remove: 'Lecture' %}
          {% assign label = 'Lecture ' | append: lec_num %}
        {% else %}
          {% assign lec_num = forloop.index %}
          {% assign label = basename | replace: '_', ' ' | replace: '-', ' ' %}
        {% endif %}
        <tr>
          <td class="col-num">{{ lec_num }}</td>
          <td><strong>{{ label }}</strong></td>
          <td class="col-file"><code>{{ file.name }}</code></td>
          <td class="col-action">
            <a class="course-dl course-dl-locked"
               href="#"
               data-protected-href="{{ site.url }}{{ site.baseurl }}{{ file.path }}"
               target="_blank"
               rel="noopener"
               aria-disabled="true">Unlock →</a>
          </td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
  {% else %}
  <div class="notes-empty" style="margin-bottom:52px;">
    <p>No lecture PDFs yet. Add files named <code>Lecture01.pdf</code>, <code>Lecture02.pdf</code>, … to <code>downloads/nuclearphysics/lectures/</code>.</p>
  </div>
  {% endif %}

  <hr class="divider" style="margin-bottom:48px;">

  <!-- ASSIGNMENTS -->
  <div class="section-header" id="assignments">
    <span class="eyebrow">Homework</span>
    <h2 class="section-title">Assignments</h2>
    <p class="course-section-lead">
      Problem sets and homework. Drop PDFs into
      <code>downloads/nuclearphysics/assignments/</code>
      (e.g. <code>Assignment01.pdf</code>, <code>HW02.pdf</code>).
    </p>
  </div>

  {% if asg_pdfs.size > 0 %}
  <div class="course-table-wrap" style="margin-bottom:52px;">
    <table class="course-table">
      <thead>
        <tr>
          <th class="col-num">#</th>
          <th>Assignment</th>
          <th class="col-file">File</th>
          <th class="col-action">Download</th>
        </tr>
      </thead>
      <tbody>
        {% for file in asg_pdfs %}
        {% assign basename = file.name | replace: '.pdf', '' %}
        {% assign label = basename | replace: '_', ' ' | replace: '-', ' ' %}
        <tr>
          <td class="col-num">{{ forloop.index }}</td>
          <td><strong>{{ label }}</strong></td>
          <td class="col-file"><code>{{ file.name }}</code></td>
          <td class="col-action">
            <a class="course-dl" href="{{ site.url }}{{ site.baseurl }}{{ file.path }}" target="_blank" rel="noopener">PDF →</a>
          </td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
  {% else %}
  <div class="notes-empty" style="margin-bottom:52px;">
    <p>No assignments posted yet. Check back during the semester, or upload PDFs to <code>downloads/nuclearphysics/assignments/</code>.</p>
  </div>
  {% endif %}

  <hr class="divider" style="margin-bottom:48px;">

  <!-- RESOURCES / BOOK (password-protected) -->
  <div class="section-header" id="resources">
    <span class="eyebrow">Extras · Password protected</span>
    <h2 class="section-title">Resources &amp; full notes</h2>
    <p class="course-section-lead">
      Combined notes / course book and other handouts. Same password as lectures.
    </p>
  </div>

  {% if res_pdfs.size > 0 %}
  <div class="notes-grid" style="margin-bottom:40px;">
    {% for file in res_pdfs %}
    {% assign basename = file.name | replace: '.pdf', '' %}
    {% assign label = basename | replace: '_', ' ' | replace: '-', ' ' %}
    <a class="note-card course-dl-locked"
       href="#"
       data-protected-href="{{ site.url }}{{ site.baseurl }}{{ file.path }}"
       target="_blank"
       rel="noopener"
       aria-disabled="true">
      <div class="note-card-icon" aria-hidden="true">PDF</div>
      <div class="note-card-body">
        <h4>{{ label }}</h4>
        <p class="note-card-meta">{{ file.name }}</p>
      </div>
      <span class="note-card-action">Password required →</span>
    </a>
    {% endfor %}
  </div>
  {% else %}
  <div class="notes-empty" style="margin-bottom:40px;">
    <p>No extra resources yet.</p>
  </div>
  {% endif %}

  <div class="course-refs">
    <h3 class="course-subhead">Suggested references</h3>
    <ul class="course-topic-list">
      <li>K. S. Krane — <em>Introductory Nuclear Physics</em></li>
      <li>S. S. M. Wong — <em>Introductory Nuclear Physics</em></li>
      <li>B. Povh et al. — <em>Particles and Nuclei</em></li>
      <li>C. A. Bertulani — <em>Nuclear Physics in a Nutshell</em> (selected chapters)</li>
    </ul>
  </div>

</div>

<!-- Password modal -->
<div id="course-password-modal" class="course-modal" hidden role="dialog" aria-modal="true" aria-labelledby="course-password-title">
  <div class="course-modal-panel">
    <button type="button" class="course-modal-close" data-course-modal-close aria-label="Close">&times;</button>
    <h3 id="course-password-title">Course materials password</h3>
    <p class="course-modal-lead">
      Lecture notes and the full notes PDF are for enrolled students.
      Enter the password shared in class or on the LMS.
    </p>
    <form id="course-password-form" autocomplete="off">
      <label class="course-modal-label" for="course-password-input">Password</label>
      <input id="course-password-input" type="password" name="course_password" autocomplete="current-password" required>
      <p id="course-password-error" class="course-modal-error" hidden></p>
      <div class="course-modal-actions">
        <button type="button" class="btn btn-secondary btn-sm" data-course-modal-close>Cancel</button>
        <button type="submit" class="btn btn-primary btn-sm">Unlock downloads</button>
      </div>
    </form>
  </div>
</div>

<script src="{{ site.url }}{{ site.baseurl }}/js/course-protect.js" defer></script>
