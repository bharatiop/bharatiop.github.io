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
  </div>

  {% assign np_pdfs = site.static_files | where_exp: "f", "f.path contains '/downloads/nuclearphysics/'" | where_exp: "f", "f.extname == '.pdf'" %}
  {% assign np_sorted = np_pdfs | sort: "name" %}

  {% if np_sorted.size > 0 %}
  <div class="notes-grid" style="margin-bottom:52px;">
    {% for file in np_sorted %}
    {% assign basename = file.name | replace: '.pdf', '' %}
    {% if basename contains 'Lecture' %}
      {% assign lec_num = basename | remove: 'Lecture' %}
      {% assign label = 'Lecture ' | append: lec_num %}
    {% else %}
      {% assign label = basename | replace: '_', ' ' | replace: '-', ' ' %}
    {% endif %}
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

  <p style="font-size:13.5px;color:var(--text-muted);line-height:1.7;">
    Related course list:
    <a href="{{ site.url }}{{ site.baseurl }}/teaching" style="color:var(--accent-mid);">Teaching page →</a>
  </p>

</div>
