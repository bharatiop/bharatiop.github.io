<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NAP Lab @ NIT Rourkela — Nuclear Astrophysics & Physics</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --white: #ffffff; --off-white: #f8f8f6; --bg-subtle: #f5f5f2;
      --border: #e5e5e0; --border-soft: #eeede8;
      --text: #1a1a18; --text-muted: #5a5a56; --text-light: #9a9a96;
      --accent: #1a3a5c; --accent-mid: #2d5f8e; --accent-light: #e8f0f8;
      --tag-bg: #eef3f8; --tag-text: #2d5f8e;
      --green: #1a6b4a; --green-bg: #e6f4ee;
      --amber: #7a4f00; --amber-bg: #fef3e0;
      --serif: 'DM Serif Display', Georgia, serif;
      --sans: 'Inter', system-ui, sans-serif;
      --radius: 10px; --radius-sm: 6px; --radius-lg: 14px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow: 0 2px 8px rgba(0,0,0,0.08);
      --max-w: 1100px;
    }
    html { scroll-behavior: smooth; }
    body { font-family: var(--sans); color: var(--text); background: var(--white); line-height: 1.65; font-size: 15px; }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }

    /* NAV */
    .site-nav { position: sticky; top: 0; z-index: 200; background: rgba(255,255,255,0.96); backdrop-filter: blur(10px); border-bottom: 0.5px solid var(--border); }
    .nav-inner { max-width: var(--max-w); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 62px; }
    .nav-logo-text { font-family: var(--serif); font-size: 20px; color: var(--accent); }
    .nav-logo-sub { font-size: 11.5px; color: var(--text-light); padding-left: 10px; border-left: 1px solid var(--border); margin-left: 10px; }
    .nav-links { display: flex; gap: 0; }
    .nav-links a { font-size: 13.5px; color: var(--text-muted); padding: 0 14px; height: 62px; display: flex; align-items: center; border-bottom: 2px solid transparent; transition: color .15s; }
    .nav-links a:hover { color: var(--text); }
    .nav-links a.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 500; }

    /* PAGE */
    .page-content { min-height: 80vh; }
    .section { max-width: var(--max-w); margin: 0 auto; padding: 64px 2rem; }
    .section-sm { max-width: var(--max-w); margin: 0 auto; padding: 40px 2rem; }
    .divider { border: none; border-top: 0.5px solid var(--border-soft); }

    /* TYPE */
    .eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-light); margin-bottom: 10px; display: block; }
    .section-title { font-family: var(--serif); font-size: 28px; color: var(--accent); line-height: 1.2; margin-bottom: 4px; }
    .section-header { margin-bottom: 36px; }

    /* BUTTONS */
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 20px; border-radius: var(--radius-sm); font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all .15s; font-family: var(--sans); border: 1px solid transparent; }
    .btn-primary { background: var(--accent); color: white; border-color: var(--accent); }
    .btn-primary:hover { background: var(--accent-mid); }
    .btn-secondary { background: transparent; color: var(--accent); border-color: var(--border); }
    .btn-secondary:hover { border-color: var(--accent); background: var(--accent-light); }
    .btn-sm { padding: 6px 14px; font-size: 12.5px; }

    /* HERO */
    .hero { max-width: var(--max-w); margin: 0 auto; padding: 80px 2rem 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center; }
    .hero-eyebrow { font-size: 11.5px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--accent-mid); margin-bottom: 18px; display: block; }
    .hero h1 { font-family: var(--serif); font-size: clamp(30px, 3.5vw, 46px); line-height: 1.13; color: var(--accent); margin-bottom: 20px; }
    .hero-desc { font-size: 15.5px; color: var(--text-muted); line-height: 1.8; }
    .hero-cta { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
    .hero-right { display: flex; flex-direction: column; gap: 16px; }
    .hero-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 0.5px solid var(--border); border-radius: var(--radius); overflow: hidden; }
    .stat-box { background: var(--white); padding: 22px 16px; text-align: center; }
    .stat-num { font-family: var(--serif); font-size: 32px; color: var(--accent); line-height: 1; margin-bottom: 5px; }
    .stat-label { font-size: 11.5px; color: var(--text-muted); }
    .hero-img { border: 0.5px solid var(--border); border-radius: var(--radius); overflow: hidden; background: var(--off-white); }
    .hero-img img { width: 100%; height: 200px; object-fit: cover; }

    /* ============================================
       CLOCK + CALENDAR WIDGET
    ============================================ */
    .datetime-widget {
      border: 0.5px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      background: var(--white);
    }

    /* Clock strip */
    .clock-strip {
      background: var(--accent);
      color: white;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .clock-time {
      font-family: var(--serif);
      font-size: 34px;
      letter-spacing: 1px;
      line-height: 1;
    }
    .clock-right { text-align: right; }
    .clock-date { font-size: 12.5px; font-weight: 500; opacity: 0.9; line-height: 1.3; }
    .clock-tz { font-size: 10.5px; opacity: 0.6; letter-spacing: 0.5px; margin-top: 3px; }

    /* Mini calendar */
    .mini-cal { padding: 14px 16px; }
    .cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .cal-month { font-size: 12.5px; font-weight: 600; color: var(--accent); }
    .cal-nav-btn { background: none; border: 0.5px solid var(--border); border-radius: 4px; width: 22px; height: 22px; cursor: pointer; font-size: 11px; color: var(--text-muted); display: flex; align-items: center; justify-content: center; transition: background .15s; }
    .cal-nav-btn:hover { background: var(--accent-light); }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
    .cal-dow { font-size: 9.5px; font-weight: 600; text-align: center; color: var(--text-light); letter-spacing: .5px; padding-bottom: 4px; text-transform: uppercase; }
    .cal-day { font-size: 11px; text-align: center; padding: 4px 2px; border-radius: 4px; cursor: default; color: var(--text-muted); line-height: 1; }
    .cal-day.today { background: var(--accent); color: white; font-weight: 600; border-radius: 50%; }
    .cal-day.other-month { color: var(--border); }
    .cal-day.has-event { position: relative; }
    .cal-day.has-event::after { content: ''; position: absolute; bottom: 1px; left: 50%; transform: translateX(-50%); width: 3px; height: 3px; background: var(--accent-mid); border-radius: 50%; }

    /* Upcoming events under calendar */
    .cal-events { border-top: 0.5px solid var(--border-soft); padding: 12px 16px 14px; }
    .cal-events-title { font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text-light); margin-bottom: 8px; }
    .cal-event-item { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 8px; }
    .cal-event-item:last-child { margin-bottom: 0; }
    .cal-event-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-mid); margin-top: 5px; flex-shrink: 0; }
    .cal-event-text { font-size: 11.5px; color: var(--text-muted); line-height: 1.45; }
    .cal-event-text strong { color: var(--text); font-weight: 500; display: block; }

    /* RESEARCH CARDS */
    .research-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 16px; }
    .research-card { border: 0.5px solid var(--border); border-radius: var(--radius); padding: 24px; transition: border-color .15s; position: relative; overflow: hidden; }
    .research-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent-mid); opacity: 0; transition: opacity .2s; }
    .research-card:hover { border-color: #b8cfe0; }
    .research-card:hover::before { opacity: 1; }
    .research-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); background: var(--accent-light); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 20px; }
    .research-card h3 { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 8px; }
    .research-card p { font-size: 13px; color: var(--text-muted); line-height: 1.7; }

    /* PUBLICATIONS */
    .pub-list { display: flex; flex-direction: column; gap: 12px; }
    .pub-item { border: 0.5px solid var(--border); border-radius: var(--radius-sm); padding: 16px 20px; display: flex; gap: 16px; align-items: flex-start; transition: border-color .15s; }
    .pub-item:hover { border-color: #b8cfe0; }
    .highlight-pub { border-left: 3px solid var(--accent-mid); }
    .pub-year { font-size: 11.5px; font-weight: 600; color: var(--accent-mid); background: var(--accent-light); border-radius: 4px; padding: 3px 8px; white-space: nowrap; flex-shrink: 0; margin-top: 2px; }
    .pub-info h4 { font-size: 14px; font-weight: 500; color: var(--text); line-height: 1.5; margin-bottom: 5px; }
    .pub-info .pub-authors { font-size: 12.5px; color: var(--text-muted); margin-bottom: 5px; }
    .pub-links { display: flex; gap: 8px; flex-wrap: wrap; }
    .pub-link { font-size: 12px; color: var(--accent-mid); padding: 2px 8px; border: 0.5px solid #b8cfe0; border-radius: 4px; transition: background .15s; }
    .pub-link:hover { background: var(--accent-light); }

    /* TEAM */
    .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 16px; }
    .team-card { border: 0.5px solid var(--border); border-radius: var(--radius); padding: 22px 18px; text-align: center; transition: border-color .15s; }
    .team-card:hover { border-color: #b8cfe0; }
    .team-avatar { width: 76px; height: 76px; border-radius: 50%; overflow: hidden; margin: 0 auto 14px; border: 2px solid var(--border); background: var(--off-white); display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-size: 22px; color: var(--accent-mid); }
    .team-card h3 { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
    .team-card .role { font-size: 12px; color: var(--text-muted); margin-bottom: 10px; line-height: 1.4; }
    .tag { font-size: 11.5px; color: var(--tag-text); background: var(--tag-bg); border-radius: 4px; padding: 3px 9px; display: inline-block; line-height: 1.5; }

    /* NEWS */
    .news-list { display: flex; flex-direction: column; }
    .news-item { display: grid; grid-template-columns: 140px 1fr; gap: 16px; padding: 16px 0; border-bottom: 0.5px solid var(--border-soft); }
    .news-item:last-child { border-bottom: none; }
    .news-date { font-size: 12px; color: var(--text-light); padding-top: 2px; }
    .news-text { font-size: 14px; color: var(--text-muted); line-height: 1.65; }
    .news-text a { color: var(--accent-mid); }

    /* TWO-COL */
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }

    /* ============================================
       LIVE FIELD NEWS WIDGET (AI-powered)
    ============================================ */
    .field-news-section { background: var(--bg-subtle); border-top: 0.5px solid var(--border-soft); border-bottom: 0.5px solid var(--border-soft); }
    .field-news-inner { max-width: var(--max-w); margin: 0 auto; padding: 52px 2rem; }

    .news-feed-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
    .live-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--green); background: var(--green-bg); padding: 4px 10px; border-radius: 4px; }
    .live-dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }

    .news-feed-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; margin-bottom: 20px; }
    .feed-card { background: var(--white); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 20px; transition: border-color .15s, box-shadow .15s; }
    .feed-card:hover { border-color: #b8cfe0; box-shadow: var(--shadow-sm); }
    .feed-card-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
    .feed-source { font-size: 10.5px; font-weight: 600; letter-spacing: .5px; text-transform: uppercase; color: var(--text-light); }
    .feed-topic-tag { font-size: 10.5px; color: var(--tag-text); background: var(--tag-bg); border-radius: 4px; padding: 2px 7px; }
    .feed-card h4 { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.5; margin-bottom: 8px; }
    .feed-card p { font-size: 12.5px; color: var(--text-muted); line-height: 1.7; }
    .feed-card-footer { margin-top: 12px; display: flex; align-items: center; justify-content: space-between; }
    .feed-date { font-size: 11px; color: var(--text-light); }
    .feed-link { font-size: 11.5px; color: var(--accent-mid); }
    .feed-link:hover { text-decoration: underline; }

    /* Skeleton loading */
    .feed-skeleton { background: var(--white); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 20px; }
    .skel { background: linear-gradient(90deg, var(--border) 25%, var(--border-soft) 50%, var(--border) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 4px; }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    .skel-line { height: 12px; margin-bottom: 8px; }
    .skel-title { height: 16px; width: 80%; margin-bottom: 6px; }
    .skel-text { height: 11px; margin-bottom: 5px; }
    .skel-text.w60 { width: 60%; }

    /* OPENINGS */
    .openings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
    .opening-card { border: 0.5px solid var(--border); border-radius: var(--radius); padding: 20px; }
    .opening-type { font-size: 10.5px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--accent); background: var(--accent-light); padding: 3px 8px; border-radius: 4px; display: inline-block; margin-bottom: 10px; }
    .opening-card h4 { font-size: 14.5px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
    .opening-card p { font-size: 13px; color: var(--text-muted); line-height: 1.65; margin-bottom: 12px; }
    .opening-card a { color: var(--accent-mid); font-size: 13px; }
    .opening-card a:hover { text-decoration: underline; }

    /* SCHOLAR CARD */
    .scholar-card { border: 0.5px solid var(--border); border-radius: var(--radius); padding: 24px; display: flex; gap: 24px; align-items: flex-start; }
    .scholar-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border-radius: var(--radius-sm); overflow: hidden; margin-top: 16px; }
    .scholar-stat { background: var(--white); padding: 14px 12px; text-align: center; }
    .scholar-stat .n { font-family: var(--serif); font-size: 26px; color: var(--accent); line-height: 1; }
    .scholar-stat .l { font-size: 11px; color: var(--text-muted); }

    /* FOOTER */
    .site-footer { border-top: 0.5px solid var(--border); background: var(--off-white); }
    .footer-inner { max-width: var(--max-w); margin: 0 auto; padding: 48px 2rem 32px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
    .footer-logo { font-family: var(--serif); font-size: 20px; color: var(--accent); margin-bottom: 10px; }
    .footer-desc { font-size: 13px; color: var(--text-muted); line-height: 1.75; }
    .footer-col h5 { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text-light); margin-bottom: 14px; }
    .footer-col a { display: block; font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
    .footer-col a:hover { color: var(--accent); }
    .footer-bottom { border-top: 0.5px solid var(--border); padding: 18px 2rem; max-width: var(--max-w); margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .footer-bottom p { font-size: 12px; color: var(--text-light); }

    /* UTILITIES */
    .mt-4 { margin-top: 16px; } .mt-6 { margin-top: 24px; } .mt-8 { margin-top: 32px; } .mb-4 { margin-bottom: 16px; }
    .refresh-btn { font-size: 12px; color: var(--text-muted); background: none; border: 0.5px solid var(--border); border-radius: var(--radius-sm); padding: 5px 12px; cursor: pointer; transition: all .15s; font-family: var(--sans); }
    .refresh-btn:hover { border-color: var(--accent); color: var(--accent); }
    .refresh-btn:disabled { opacity: .5; cursor: default; }
    .error-msg { font-size: 13px; color: var(--text-muted); padding: 24px; text-align: center; }

    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; padding: 40px 1.5rem; }
      .two-col { grid-template-columns: 1fr; }
      .footer-inner { grid-template-columns: 1fr; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>

<!-- NAV -->
<nav class="site-nav">
  <div class="nav-inner">
    <div style="display:flex;align-items:center">
      <span class="nav-logo-text">NAP Lab</span>
      <span class="nav-logo-sub">NIT Rourkela</span>
    </div>
    <div class="nav-links">
      <a href="#" class="active">Home</a>
      <a href="#">Research</a>
      <a href="#">Publications</a>
      <a href="#">Team</a>
      <a href="#">Teaching</a>
      <a href="#">Openings</a>
      <a href="#">Contact</a>
    </div>
  </div>
</nav>

<main class="page-content">

<!-- HERO -->
<section aria-label="Introduction">
  <div class="hero">
    <div class="hero-left">
      <span class="hero-eyebrow">Nuclear Astrophysics &amp; Physics Lab</span>
      <h1>Probing the densest objects in the universe</h1>
      <p class="hero-desc">
        We are a research group at the
        <a href="https://www.nitrkl.ac.in/" style="color:var(--accent-mid);text-decoration:underline">National Institute of Technology, Rourkela</a>,
        India — working at the intersection of nuclear physics, astrophysics, gravitational waves, and dark matter to unravel the mysteries of neutron stars.
      </p>
      <div class="hero-cta">
        <a href="#" class="btn btn-primary">Publications</a>
        <a href="#" class="btn btn-secondary">Meet the Team</a>
        <a href="#" class="btn btn-secondary" target="_blank">Google Scholar ↗</a>
      </div>
    </div>
    <div class="hero-right">
      <div class="hero-stats-grid">
        <div class="stat-box">
          <div class="stat-num">30+</div>
          <div class="stat-label">Publications</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">3</div>
          <div class="stat-label">PhD Students</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">2020</div>
          <div class="stat-label">Founded</div>
        </div>
      </div>

      <!-- ★ CLOCK + CALENDAR WIDGET -->
      <div class="datetime-widget">
        <!-- Live clock strip -->
        <div class="clock-strip">
          <div class="clock-time" id="clockTime">--:--:--</div>
          <div class="clock-right">
            <div class="clock-date" id="clockDate">Loading…</div>
            <div class="clock-tz" id="clockTz">IST (UTC+5:30)</div>
          </div>
        </div>

        <!-- Mini monthly calendar -->
        <div class="mini-cal">
          <div class="cal-header">
            <button class="cal-nav-btn" id="calPrev" title="Previous month">‹</button>
            <span class="cal-month" id="calMonthLabel"></span>
            <button class="cal-nav-btn" id="calNext" title="Next month">›</button>
          </div>
          <div class="cal-grid" id="calGrid"></div>
        </div>

        <!-- Upcoming conference dots legend -->
        <div class="cal-events">
          <div class="cal-events-title">Upcoming · This Quarter</div>
          <div class="cal-event-item">
            <div class="cal-event-dot"></div>
            <div class="cal-event-text">
              <strong>Asian GW Astronomy Meeting</strong>
              Jul 5–11, 2026 · Chiang Mai, Thailand
            </div>
          </div>
          <div class="cal-event-item">
            <div class="cal-event-dot"></div>
            <div class="cal-event-text">
              <strong>IGWN School 2026</strong>
              Aug 10–14, 2026 · Perimeter Institute, Canada
            </div>
          </div>
          <div class="cal-event-item">
            <div class="cal-event-dot"></div>
            <div class="cal-event-text">
              <strong>Zakopane Nuclear Physics Conf.</strong>
              Aug 30–Sep 6, 2026 · Poland
            </div>
          </div>
        </div>
      </div>
      <!-- end clock/calendar widget -->

    </div>
  </div>
</section>

<hr class="divider">

<!-- RESEARCH AREAS -->
<section class="section" aria-label="Research areas">
  <div class="section-header">
    <span class="eyebrow">Focus Areas</span>
    <h2 class="section-title">What we study</h2>
  </div>
  <div class="research-grid">
    <div class="research-card">
      <div class="research-icon">⭐</div>
      <h3>Equation of State of Neutron Stars</h3>
      <p>Deciphering dense matter at nuclear densities using RMF models and observational constraints from LIGO, NICER, and pulsar timing.</p>
    </div>
    <div class="research-card">
      <div class="research-icon">🔮</div>
      <h3>Hyperons &amp; Exotic Matter</h3>
      <p>Exploring strangeness-bearing particles — hyperons, delta baryons, and quarkyonic matter — and their effect on stellar stability.</p>
    </div>
    <div class="research-card">
      <div class="research-icon">🌊</div>
      <h3>Gravitational Waves &amp; Oscillations</h3>
      <p>Computing f-mode/p-mode frequencies, tidal deformability, and I-Love-Q relations connecting to GW170817 and Einstein Telescope.</p>
    </div>
    <div class="research-card">
      <div class="research-icon">🌑</div>
      <h3>Dark Matter in Neutron Stars</h3>
      <p>Constraining WIMP, fermionic, and self-interacting dark matter through mass, radius, and oscillation observables.</p>
    </div>
    <div class="research-card">
      <div class="research-icon">🌡</div>
      <h3>Thermal Evolution</h3>
      <p>Investigating neutron star cooling, proto-NS evolution, and the role of temperature and lepton fraction on nuclear matter.</p>
    </div>
    <div class="research-card">
      <div class="research-icon">🔭</div>
      <h3>Multi-Messenger Astrophysics</h3>
      <p>Bridging nuclear theory with EM, GW, and neutrino observations to constrain the neutron star equation of state.</p>
    </div>
  </div>
</section>

<hr class="divider">

<!-- PI SECTION -->
<section class="section" aria-label="Principal Investigator">
  <div class="section-header">
    <span class="eyebrow">Principal Investigator</span>
    <h2 class="section-title">Dr. Bharat Kumar</h2>
  </div>
  <div class="scholar-card">
    <div class="team-avatar" style="width:100px;height:100px;flex-shrink:0;border-radius:50%;overflow:hidden;border:2px solid var(--border);">BK</div>
    <div style="flex:1;">
      <p style="font-size:15.5px;font-weight:500;color:var(--text);margin-bottom:4px;">Bharat Kumar</p>
      <p style="font-size:13.5px;color:var(--text-muted);margin-bottom:12px;">Assistant Professor · Department of Physics &amp; Astronomy, NIT Rourkela · <em>since June 2020</em></p>
      <p style="font-size:13.5px;color:var(--text-muted);line-height:1.75;margin-bottom:14px;">
        M.Sc. Physics, AMU Aligarh · Ph.D. with S K Patra, IOP Bhubaneswar · Postdoc with Sukanta Bose (LIGO-India, IUCAA) · Postdoc with Takashi Nakatsukasa, University of Tsukuba, Japan
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <a href="#" class="btn btn-secondary btn-sm">CV (PDF)</a>
        <a href="#" class="btn btn-secondary btn-sm">Google Scholar ↗</a>
        <a href="#" class="btn btn-secondary btn-sm">ORCID ↗</a>
        <a href="mailto:kumarbh@nitrkl.ac.in" class="btn btn-secondary btn-sm">Email</a>
      </div>
      <div class="scholar-stats" style="max-width:360px;">
        <div class="scholar-stat"><div class="n">30+</div><div class="l">Papers</div></div>
        <div class="scholar-stat"><div class="n">500+</div><div class="l">Citations</div></div>
        <div class="scholar-stat"><div class="n">—</div><div class="l">h-index</div></div>
      </div>
    </div>
  </div>
</section>

<hr class="divider">

<!-- ★ LIVE FIELD NEWS — AI-powered -->
<div class="field-news-section">
  <div class="field-news-inner">
    <div class="news-feed-header">
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
          <span class="eyebrow" style="margin-bottom:0">Field Intelligence</span>
          <span class="live-badge"><span class="live-dot"></span>AI-Updated</span>
        </div>
        <h2 class="section-title">Latest in neutron-star &amp; GW astrophysics</h2>
        <p style="font-size:13px;color:var(--text-muted);margin-top:4px;">Recent developments in dense matter, gravitational-wave astronomy, and dark matter searches — curated by AI.</p>
      </div>
      <button class="refresh-btn" id="refreshNewsBtn" onclick="loadFieldNews()">↻ Refresh</button>
    </div>

    <div class="news-feed-grid" id="newsFeedGrid">
      <!-- Skeleton placeholders -->
      <div class="feed-skeleton">
        <div class="skel skel-line" style="width:40%;margin-bottom:12px;"></div>
        <div class="skel skel-title"></div>
        <div class="skel skel-title" style="width:65%;"></div>
        <div class="skel skel-text" style="margin-top:10px;"></div>
        <div class="skel skel-text w60"></div>
      </div>
      <div class="feed-skeleton">
        <div class="skel skel-line" style="width:40%;margin-bottom:12px;"></div>
        <div class="skel skel-title"></div>
        <div class="skel skel-title" style="width:70%;"></div>
        <div class="skel skel-text" style="margin-top:10px;"></div>
        <div class="skel skel-text w60"></div>
      </div>
      <div class="feed-skeleton">
        <div class="skel skel-line" style="width:40%;margin-bottom:12px;"></div>
        <div class="skel skel-title"></div>
        <div class="skel skel-title" style="width:55%;"></div>
        <div class="skel skel-text" style="margin-top:10px;"></div>
        <div class="skel skel-text w60"></div>
      </div>
    </div>

    <p style="font-size:11.5px;color:var(--text-light);margin-top:4px;">
      Summaries generated by AI · Always verify at <a href="https://arxiv.org/list/astro-ph.HE/recent" target="_blank" style="color:var(--accent-mid)">arXiv:astro-ph.HE ↗</a> and <a href="https://arxiv.org/list/nucl-th/recent" target="_blank" style="color:var(--accent-mid)">nucl-th ↗</a>
    </p>
  </div>
</div>

<hr class="divider">

<!-- NEWS + EVENTS -->
<section class="section" aria-label="News and Events">
  <div class="two-col">
    <div>
      <div class="section-header">
        <span class="eyebrow">Lab Updates</span>
        <h2 class="section-title">News</h2>
      </div>
      <div class="news-list">
        <div class="news-item">
          <span class="news-date">23 Dec 2024</span>
          <p class="news-text">Congrats to Pinku for Best Poster Award at DAE High Energy Physics Symposium, BHU. <a href="#">Event ↗</a></p>
        </div>
        <div class="news-item">
          <span class="news-date">1 Sep 2023</span>
          <p class="news-text">Pinku's paper on WIMP dark matter accepted in <a href="#">MNRAS ↗</a></p>
        </div>
        <div class="news-item">
          <span class="news-date">Jun 2020</span>
          <p class="news-text">NAP Lab established at NIT Rourkela under Dr. Bharat Kumar.</p>
        </div>
      </div>
      <div class="mt-6"><a href="#" class="btn btn-secondary">All news →</a></div>
    </div>
    <div>
      <div class="section-header">
        <span class="eyebrow">Field Conferences &amp; Schools</span>
        <h2 class="section-title">Upcoming events</h2>
      </div>
      <div class="news-list">
        <div class="news-item">
          <span class="news-date">Jul 5–11, 2026</span>
          <p class="news-text"><strong>Asian GW Astronomy Meeting (AGWAM 2026)</strong> — Chiang Mai, Thailand.</p>
        </div>
        <div class="news-item">
          <span class="news-date">Aug 10–14, 2026</span>
          <p class="news-text"><strong>IGWN School 2026</strong> — Perimeter Institute, Canada.</p>
        </div>
        <div class="news-item">
          <span class="news-date">Aug 30–Sep 6, 2026</span>
          <p class="news-text"><strong>Zakopane Conference on Nuclear Physics</strong> — Poland.</p>
        </div>
        <div class="news-item">
          <span class="news-date">Oct 5–9, 2026</span>
          <p class="news-text"><strong>NuSym26 — Nuclear Symmetry Energy Symposium</strong></p>
        </div>
      </div>
      <div class="mt-6"><a href="#" class="btn btn-secondary">All events →</a></div>
    </div>
  </div>
</section>

<hr class="divider">

<!-- TEAM -->
<section class="section" aria-label="Team">
  <div class="section-header">
    <span class="eyebrow">People</span>
    <h2 class="section-title">Current team members</h2>
  </div>
  <p class="eyebrow mb-4">PhD Students</p>
  <div class="team-grid" style="margin-bottom:32px;">
    <div class="team-card">
      <div class="team-avatar">PR</div>
      <h3>Pinku Routaray</h3>
      <div class="role">Ph.D. Student · joined Jul 2021<br>M.Sc., Berhampur University</div>
      <span class="tag">Dark Matter in NSs</span>
    </div>
    <div class="team-card">
      <div class="team-avatar">SG</div>
      <h3>Sayantan Ghosh</h3>
      <div class="role">Ph.D. Student · joined Jul 2022<br>M.Sc., Banaras Hindu University</div>
      <span class="tag">Quasinormal Modes</span>
    </div>
    <div class="team-card">
      <div class="team-avatar">PK</div>
      <h3>Probit J. Kalita</h3>
      <div class="role">Ph.D. Student · joined Jul 2022<br>M.Sc., Tezpur University</div>
      <span class="tag">NS Composition</span>
    </div>
  </div>
  <p class="eyebrow mb-4">Master Students</p>
  <div class="team-grid" style="margin-bottom:28px;">
    <div class="team-card">
      <div class="team-avatar">KK</div>
      <h3>Kanika Karan</h3>
      <div class="role">Ongoing MSc Thesis</div>
      <span class="tag">Quasinormal Modes</span>
    </div>
    <div class="team-card">
      <div class="team-avatar">SS</div>
      <h3>Shubhajit Saha</h3>
      <div class="role">Ongoing MSc Thesis</div>
      <span class="tag">Quarkyonic Matter</span>
    </div>
  </div>
  <a href="#" class="btn btn-secondary">View full team &amp; alumni →</a>
</section>

<hr class="divider">

<!-- PUBLICATIONS -->
<section class="section" aria-label="Publications">
  <div class="section-header">
    <span class="eyebrow">Research Output</span>
    <h2 class="section-title">Selected publications</h2>
  </div>
  <div class="pub-list">
    <div class="pub-item highlight-pub">
      <span class="pub-year">2023</span>
      <div class="pub-info">
        <h4>Probing the Impact of WIMP Dark Matter on Universal Relations, GW170817 Posterior and Radial Oscillations</h4>
        <p class="pub-authors">Pinku Routaray, Abdul Quddus, Kabir Chakravarti, Bharat Kumar</p>
        <div class="pub-links"><a href="#" class="pub-link">MNRAS 25, 5492 (2023)</a><a href="#" class="pub-link">PDF</a></div>
      </div>
    </div>
    <div class="pub-item highlight-pub">
      <span class="pub-year">2023</span>
      <div class="pub-info">
        <h4>Radial Oscillations of Dark Matter Admixed Neutron Stars</h4>
        <p class="pub-authors">Pinku Routray, H. C. Das, Souhardya Sen, Bharat Kumar, Grigoris Panotopoulos, Tianqi Zhao</p>
        <div class="pub-links"><a href="#" class="pub-link">Phys. Rev. D 107, 103039 (2023)</a><a href="#" class="pub-link">PDF</a></div>
      </div>
    </div>
    <div class="pub-item highlight-pub">
      <span class="pub-year">2019</span>
      <div class="pub-info">
        <h4>Inferring Neutron Star Properties from GW170817 with Universal Relations</h4>
        <p class="pub-authors">Bharat Kumar, Philippe Landry</p>
        <div class="pub-links"><a href="#" class="pub-link">Phys. Rev. D 99, 123026 (2019)</a><a href="#" class="pub-link">PDF</a></div>
      </div>
    </div>
  </div>
  <div class="mt-6">
    <a href="#" class="btn btn-secondary">All publications →</a>
    <a href="#" class="btn btn-secondary" style="margin-left:10px;">Google Scholar ↗</a>
  </div>
</section>

<hr class="divider">

<!-- OPENINGS -->
<section class="section" aria-label="Open positions">
  <div class="section-header">
    <span class="eyebrow">Opportunities</span>
    <h2 class="section-title">Join us</h2>
  </div>
  <div class="openings-grid">
    <div class="opening-card">
      <span class="opening-type">PhD Position</span>
      <h4>PhD Fellowship (DST WISE)</h4>
      <p>Positions in nuclear physics, neutron star astrophysics, and dark matter physics.</p>
      <a href="#">Apply via DST WISE ↗</a>
    </div>
    <div class="opening-card">
      <span class="opening-type">Postdoc</span>
      <h4>SERB-NPDF Fellowship</h4>
      <p>Postdoc candidates can apply through SERB NPDF to work in our group.</p>
      <a href="#">Apply via SERB ↗</a>
    </div>
    <div class="opening-card" style="background:var(--accent-light);border-color:#c0d8ee;">
      <span class="opening-type" style="background:var(--accent);color:white;">External Fellowship</span>
      <h4>Own Fellowship? Join Us</h4>
      <p>If you have an external fellowship and wish to pursue a PhD or Postdoc, please get in touch.</p>
      <a href="mailto:kumarbh@nitrkl.ac.in">kumarbh@nitrkl.ac.in ↗</a>
    </div>
  </div>
  <div class="mt-8"><a href="#" class="btn btn-primary">All openings &amp; details →</a></div>
</section>

<hr class="divider">

<!-- CONTACT -->
<section class="section-sm section" aria-label="Contact">
  <div class="two-col">
    <div>
      <span class="eyebrow" style="margin-bottom:10px;">Find us</span>
      <h2 class="section-title" style="margin-bottom:16px;">Contact</h2>
      <address style="font-style:normal;font-size:14px;color:var(--text-muted);line-height:1.9;">
        <strong>Dr. Bharat Kumar</strong><br>
        MC202, Department of Physics &amp; Astronomy<br>
        National Institute of Technology, Rourkela<br>
        Odisha 769008, India<br><br>
        Email: <a href="mailto:kumarbh@nitrkl.ac.in" style="color:var(--accent-mid)">kumarbh@nitrkl.ac.in</a>
      </address>
    </div>
    <div>
      <span class="eyebrow" style="margin-bottom:10px;">Funding &amp; Affiliation</span>
      <h2 class="section-title" style="margin-bottom:16px;">Support</h2>
      <p style="font-size:14px;color:var(--text-muted);line-height:1.75;">
        Supported by the <a href="https://www.serbonline.in/" target="_blank" style="color:var(--accent-mid)">Science and Engineering Research Board (SERB)</a>, Government of India.<br><br>
        Part of the <a href="#" style="color:var(--accent-mid)">Department of Physics and Astronomy</a>, NIT Rourkela.
      </p>
    </div>
  </div>
</section>

</main>

<!-- FOOTER -->
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">NAP Lab</div>
      <p class="footer-desc">Nuclear Astrophysics &amp; Physics Lab at NIT Rourkela, India. Probing dense matter, neutron stars, and the dark universe.</p>
    </div>
    <div class="footer-col">
      <h5>Quick links</h5>
      <a href="#">Research</a>
      <a href="#">Publications</a>
      <a href="#">Team</a>
      <a href="#">Teaching</a>
      <a href="#">Openings</a>
    </div>
    <div class="footer-col">
      <h5>External</h5>
      <a href="https://arxiv.org" target="_blank">arXiv ↗</a>
      <a href="https://www.nitrkl.ac.in/" target="_blank">NIT Rourkela ↗</a>
      <a href="https://www.serbonline.in/" target="_blank">SERB ↗</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© <span id="footerYear"></span> NAP Lab, NIT Rourkela. All rights reserved.</p>
    <p style="font-size:11.5px;color:var(--text-light);">Built with Jekyll · GitHub Pages</p>
  </div>
</footer>

<script>
/* ================================================
   1. LIVE CLOCK — IST (UTC+5:30)
================================================ */
function updateClock() {
  const now = new Date();
  // IST offset
  const istMs = now.getTime() + (now.getTimezoneOffset() * 60000) + (5.5 * 3600000);
  const ist = new Date(istMs);

  const h = String(ist.getHours()).padStart(2,'0');
  const m = String(ist.getMinutes()).padStart(2,'0');
  const s = String(ist.getSeconds()).padStart(2,'0');
  document.getElementById('clockTime').textContent = `${h}:${m}:${s}`;

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('clockDate').textContent =
    `${days[ist.getDay()]}, ${ist.getDate()} ${months[ist.getMonth()]} ${ist.getFullYear()}`;
}
updateClock();
setInterval(updateClock, 1000);

// Footer year
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ================================================
   2. MINI CALENDAR
================================================ */
// Events to highlight (month is 0-indexed)
const EVENTS = [
  { y:2026, m:6, d:5 },  // Jul 5
  { y:2026, m:7, d:10 }, // Aug 10
  { y:2026, m:7, d:30 }, // Aug 30
  { y:2026, m:9, d:5 },  // Oct 5
];

let calYear, calMonth;
(function initCal() {
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();
  renderCal();
})();

document.getElementById('calPrev').addEventListener('click', () => {
  calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; } renderCal();
});
document.getElementById('calNext').addEventListener('click', () => {
  calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; } renderCal();
});

function renderCal() {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('calMonthLabel').textContent = `${months[calMonth]} ${calYear}`;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  // Day-of-week headers
  ['Su','Mo','Tu','We','Th','Fr','Sa'].forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-dow'; el.textContent = d;
    grid.appendChild(el);
  });

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();

  // Blank cells before month starts
  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day other-month'; el.textContent = '';
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;

    const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    if (isToday) el.classList.add('today');

    const hasEv = EVENTS.some(e => e.y === calYear && e.m === calMonth && e.d === d);
    if (hasEv && !isToday) el.classList.add('has-event');

    grid.appendChild(el);
  }
}

/* ================================================
   3. AI-POWERED FIELD NEWS
================================================ */
async function loadFieldNews() {
  const grid = document.getElementById('newsFeedGrid');
  const btn = document.getElementById('refreshNewsBtn');
  btn.disabled = true;
  btn.textContent = '↻ Loading…';

  // Show skeletons
  grid.innerHTML = [1,2,3].map(() => `
    <div class="feed-skeleton">
      <div class="skel skel-line" style="width:40%;margin-bottom:12px;"></div>
      <div class="skel skel-title"></div>
      <div class="skel skel-title" style="width:65%;"></div>
      <div class="skel skel-text" style="margin-top:10px;"></div>
      <div class="skel skel-text w60"></div>
    </div>
  `).join('');

  const today = new Date().toISOString().slice(0,10);
  const prompt = `You are an academic news summarizer for a nuclear astrophysics lab (NAP Lab, NIT Rourkela). 
Today is ${today}. Generate 6 recent developments (from mid-2025 to now) in these fields: neutron star physics, gravitational wave astronomy, dark matter detection in compact stars, nuclear equation of state, LIGO/Einstein Telescope results, and multi-messenger astrophysics.

Respond ONLY with valid JSON — no markdown, no code fences, just raw JSON:
{
  "items": [
    {
      "title": "Short punchy headline (max 12 words)",
      "summary": "2-sentence summary suitable for a researcher audience. Include specifics like detector names, mass measurements, or theoretical implications.",
      "topic": "one of: Neutron Stars | Gravitational Waves | Dark Matter | Nuclear EoS | Multi-Messenger | LIGO/ET",
      "source": "Journal or collaboration name (e.g. Phys. Rev. Lett., LIGO, NICER, arXiv)",
      "date": "Approx month and year (e.g. May 2026)"
    }
  ]
}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const raw = data.content.map(b => b.text || '').join('');
    const clean = raw.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      // Truncated response — recover all complete JSON objects from the array
      const recovered = [];
      const re = /\{[^\{\}]*?"title"[\s\S]*?"date"[\s\S]*?\}/g;
      let m;
      while ((m = re.exec(clean)) !== null) {
        try { recovered.push(JSON.parse(m[0])); } catch(_) {}
      }
      if (recovered.length === 0) throw new Error('No parseable items in response');
      parsed = { items: recovered };
    }
    renderNews(parsed.items);
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<div class="error-msg" style="grid-column:1/-1;">
      <p style="margin-bottom:8px;">Could not load AI news feed.</p>
      <p style="font-size:12px;color:var(--text-light);">Check <a href="https://arxiv.org/list/astro-ph.HE/recent" target="_blank" style="color:var(--accent-mid)">arXiv:astro-ph.HE</a> for the latest preprints.</p>
    </div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = '↻ Refresh';
  }
}

function renderNews(items) {
  const topicColors = {
    'Neutron Stars': '#1a3a5c',
    'Gravitational Waves': '#2d5f8e',
    'Dark Matter': '#4a2d6b',
    'Nuclear EoS': '#1a6b4a',
    'Multi-Messenger': '#7a4f00',
    'LIGO/ET': '#2d5f8e'
  };
  const topicBgs = {
    'Neutron Stars': '#e8f0f8',
    'Gravitational Waves': '#e8f0f8',
    'Dark Matter': '#f0e8f8',
    'Nuclear EoS': '#e6f4ee',
    'Multi-Messenger': '#fef3e0',
    'LIGO/ET': '#e8f0f8'
  };

  const grid = document.getElementById('newsFeedGrid');
  grid.innerHTML = items.slice(0,6).map(item => {
    const tc = topicColors[item.topic] || '#2d5f8e';
    const tb = topicBgs[item.topic] || '#e8f0f8';
    return `
    <div class="feed-card">
      <div class="feed-card-meta">
        <span class="feed-source">${escHtml(item.source)}</span>
        <span class="feed-topic-tag" style="color:${tc};background:${tb}">${escHtml(item.topic)}</span>
      </div>
      <h4>${escHtml(item.title)}</h4>
      <p>${escHtml(item.summary)}</p>
      <div class="feed-card-footer">
        <span class="feed-date">${escHtml(item.date)}</span>
        <a href="https://arxiv.org/search/?searchtype=all&query=${encodeURIComponent(item.title.split(' ').slice(0,4).join('+'))}" target="_blank" class="feed-link">Search arXiv ↗</a>
      </div>
    </div>`;
  }).join('');
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Auto-load on page open
loadFieldNews();
</script>
</body>
</html>
