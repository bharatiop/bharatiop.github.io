# NAP Lab site — design and content

Visual system and how to add a paper, person, or news item without touching layout CSS.

The site is Jekyll on GitHub Pages. Routes, YAML in `_data/`, and scientific copy stay in those files. Do not invent papers, metrics, people, emails, or vacancies.

## Two surfaces, one identity

| Surface | Where | Tokens |
|---|---|---|
| **Night** | Sticky nav, homepage hero, join band, footer | `--void #04060c`, `--deep #070b16`, `--panel #101828` |
| **Paper** | Inner pages and reading sections | `--paper #fbfcfe`, `--ink #0a1020` |

- Accent **plasma** `#45d8ec` — at most ~8% of the UI (logo dot, Vacancies button, hero overline, focus rings).
- **Fusion** `#e8a03a` — one highlight per viewport (hero emphasis, calendar “today”, join-band eyebrow).
- Type: **DM Serif Display** for H1/H2; **Inter** 17–18px / 1.65 for body.
- Body text is never cyan. Links on paper use `--link #0a5c6e` (WCAG AA on `--paper`).
- No purple gradients, particle-JS, or stock galaxy heroes.

Tokens live in `css/main.css` under `:root`. Inner pages still use older names (`--text-muted`, `--accent-mid`, `--border`, `--serif`); those are aliases of the new tokens. Prefer the new names in new markup.

## File map

```
_config.yml            Jekyll config (pretty permalinks, collections)
_data/                 YAML — the content CMS
  publist.yml          Publication records
  paper_figures.yml    Homepage “selected results” figures
  research_rows.yml    Four research questions
  home_team.yml        Homepage people grid
  team_members.yml     PI record
  PhD.yml              Doctoral researchers
  news.yml             News archive items
  codes.yml            Homepage codes / tools
  alumni_*.yml         Alumni lists (team page)
_includes/
  header.html          Sticky night nav
  footer.html          Night footer
  datetime-widget.html IST clock + mini calendar
  field-news-widget.html  Field Intelligence (restyle only)
_layouts/default.html  Shell: fonts, nav, footer, menu JS
_pages/                All public routes
  home.md              /  — homepage
  research.md          /research/
  team.md              /team/
  publications.md      /publications/
  events.md            /events/
  teaching.md          /teaching/
  vacancies.md         /vacancies/
  allnews.md           /allnews/
css/main.css           Design system (do not compile css/main.scss over this)
```

Homepage order: night hero (IST clock, then H1) → what we do → four questions → people → news → live Field Intelligence (INSPIRE) → join → codes → contact.

Selected paper figures live on `/publications/`, not the homepage. Field Intelligence is fetched in the browser from INSPIRE HEP (`js/field-intel.js`); it is not a hand-edited list.

Nav: Research · Team · Publications · Events · Teaching · **Vacancies**.

## Add a paper

Two places, depending on what you want to show.

### 1. Publications page (the full list)

Edit `_pages/publications.md`. Copy an existing `.pub-item` block. Keep the year, title, authors, and DOI/arXiv as they appear on the paper. Set `data-year` and `data-tags` so the filter buttons still work (`dm`, `osc`, `eos`, `emsg`, `delta`, `highlight`, or a year).

Optional: also append a record to `_data/publist.yml`:

```yaml
- title: "Exact title from the journal or arXiv"
  authors: Author One, Author Two, Bharat Kumar
  link:
    url: https://doi.org/10.xxxx/xxxxx
    display: Journal vol, page (year)
  highlight: 0
```

Do not add a paper that is not submitted, posted, or published.

### 2. Homepage “selected results” figure

1. Put the figure file in `images/papers/` (PNG/JPEG from the paper, not a screenshot of a slide).
2. Append a block to `_data/paper_figures.yml`:

```yaml
- image: /images/papers/your_figure.png
  alt: "One sentence describing the axes / result"
  title: "Short caption"
  citation: "Journal vol, page (year)"
  url: "https://doi.org/10.xxxx/xxxxx"
```

Order in the YAML is display order. Rebuild; the grid updates itself.

## Add a person

### Homepage snapshot

Edit `_data/home_team.yml`. Photo goes in `images/teampic/`.

```yaml
- name: "Given Family"
  photo: /images/teampic/given_pic.jpg
  initials: "GF"
  role: "Ph.D. Researcher · since Mon YYYY<br>M.Sc., Institution"
  tag: "Topic tag"
  links:
    - label: "Scholar ↗"
      url: "https://scholar.google.com/citations?user=..."
```

If the photo is missing, `initials` is shown. Use `tag_class: tag-amber` for alumni.

### Team page

The team page cards currently live in `_pages/team.md` (PI, PhD, masters, alumni). Duplicate the markup of an existing card; do not invent emails. Alumni lists can also be extended in `_data/alumni_members.yml`, `_data/alumni_msc.yml`, `_data/alumni_bsc.yml`, `_data/alumni_visitors.yml`. Doctoral records: `_data/PhD.yml`.

## Add a news item

1. **Archive / All news** — `_pages/allnews.md` (grouped by year) and, for the YAML feed, `_data/news.yml`:

```yaml
- date: 7 September 2026
  headline: Short factual sentence with optional [Markdown link](https://doi.org/...).
```

2. **Homepage news column** — the four featured items are in `_pages/home.md` in the News section. Replace the oldest item with the new one. Do not add rumours or unannounced results.

Upcoming conferences belong on `_pages/events.md` and, if they fall in the current quarter, as a line in `_includes/datetime-widget.html`.

## Add a code card

Edit `_data/codes.yml`. Only link repositories that already exist (the lab GitHub is `https://github.com/bharatiop` unless a dedicated repo URL is public).

## Local build

```bash
bundle install
bundle exec jekyll serve
```

`css/main.scss` (Bootstrap leftover) is excluded so it cannot overwrite `css/main.css`. The standalone `index.html` is also excluded; the homepage is `_pages/home.md`.

## What not to do

- Do not migrate to React, Next, or Webflow.
- Do not invent citation counts, vacancies, or ORCID/emails.
- Do not set body copy to `--plasma`.
- Do not add a second fusion highlight in the same viewport.
