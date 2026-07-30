---
title: "Lecture Notes"
layout: default
excerpt: "Downloadable PDF lecture notes from courses taught by Dr. Bharat Kumar"
sitemap: true
permalink: /lecture-notes/
---

<div class="page-hero">
  <div class="page-hero-inner">
    <span class="eyebrow">Teaching materials</span>
    <h1>Lecture Notes</h1>
    <p style="margin-top:10px;font-size:14.5px;color:var(--text-muted);max-width:640px;">
      PDF notes for courses taught at NIT Rourkela. Files are hosted in the repository under
      <code>downloads/</code> and appear here automatically after they are pushed to GitHub.
    </p>
  </div>
</div>

<div class="section">

  <!-- NUCLEAR PHYSICS -->
  <div class="section-header" id="nuclear-physics">
    <span class="eyebrow">Course notes</span>
    <h2 class="section-title">Nuclear Physics</h2>
    <p style="font-size:14px;color:var(--text-muted);margin-top:8px;max-width:640px;line-height:1.7;">
      Expanded notes for <strong>PH5001 / nuclear physics</strong> topics: nuclear structure,
      the shell model, radioactivity (\(\alpha\), \(\beta\), \(\gamma\)), reactions, fission, and fusion.
      Source folder on the site:
      <code>downloads/nuclearphysics/</code>.
    </p>
  </div>

  {% assign np_pdfs = site.static_files | where_exp: "f", "f.path contains '/downloads/nuclearphysics/'" | where_exp: "f", "f.extname == '.pdf'" %}
  {% assign np_sorted = np_pdfs | sort: "name" %}

  {% if np_sorted.size > 0 %}
  <div class="notes-grid" style="margin-bottom:52px;">
    {% for file in np_sorted %}
    {% assign label = file.name | replace: '.pdf', '' | replace: '_', ' ' | replace: '-', ' ' %}
    <a class="note-card" href="{{ site.url }}{{ site.baseurl }}{{ file.path }}" target="_blank" rel="noopener">
      <div class="note-card-icon" aria-hidden="true">PDF</div>
      <div class="note-card-body">
        <h4>{{ label }}</h4>
        <p class="note-card-meta">
          {{ file.name }}
          {% if file.modified_time %}
          · updated {{ file.modified_time | date: "%Y-%m-%d" }}
          {% endif %}
        </p>
      </div>
      <span class="note-card-action">Download →</span>
    </a>
    {% endfor %}
  </div>
  {% else %}
  <div class="notes-empty" style="margin-bottom:52px;">
    <p>No PDFs yet in <code>downloads/nuclearphysics/</code>.</p>
    <p style="margin-top:8px;font-size:13.5px;color:var(--text-muted);">
      Add files to that folder and push to GitHub; they will list here automatically.
    </p>
  </div>
  {% endif %}

  <hr class="divider" style="margin-bottom:48px;">

  <!-- HOW TO ADD -->
  <div class="section-header">
    <span class="eyebrow">For site maintainers</span>
    <h2 class="section-title">How to upload new notes</h2>
  </div>

  <div class="course-list" style="margin-bottom:40px;">
    <div class="course-item">
      <span class="course-code">1</span>
      <div>
        <h4>Add the PDF</h4>
        <p>
          Copy the file into the repository folder
          <code>downloads/nuclearphysics/</code>
          (for nuclear physics notes).
        </p>
      </div>
    </div>
    <div class="course-item">
      <span class="course-code">2</span>
      <div>
        <h4>Commit and push</h4>
        <p>
          <code>git add downloads/nuclearphysics/</code> then commit and <code>git push</code>
        </p>
      </div>
    </div>
    <div class="course-item">
      <span class="course-code">3</span>
      <div>
        <h4>Automatic listing</h4>
        <p>
          After GitHub Pages rebuilds, the PDF appears in the list above—no HTML edit required.
        </p>
      </div>
    </div>
  </div>

  <p style="font-size:13.5px;color:var(--text-muted);line-height:1.7;">
    Related course list:
    <a href="{{ site.url }}{{ site.baseurl }}/teaching" style="color:var(--accent-mid);">Teaching page →</a>
  </p>

</div>
