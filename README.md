# NAP Lab Website

Website for the **Nuclear Astrophysics & Physics (NAP) Lab**, led by Dr. Bharat Kumar, Department of Physics & Astronomy, National Institute of Technology, Rourkela.

🔗 **Live site:** https://bharatiop.github.io

## Stack

- [Jekyll](https://jekyllrb.com) static site generator
- Hosted on GitHub Pages
- Custom CSS (no framework) — `css/main.css`
- Fonts: Inter + DM Serif Display (Google Fonts)

## Structure

```
_pages/         All site pages (home, research, teaching, team, publications, events, vacancies, allnews)
_data/          YAML data (team_members, publist, news, alumni, PhD)
_includes/      Reusable partials (header, footer, head, analytics)
_layouts/       Page layout templates
css/main.css    All site styling
images/         Photos, logos
downloads/      PDFs (CV, papers)
```

## Local development

```bash
bundle install
bundle exec jekyll serve
```
Visit `http://localhost:4000`.

## Contributing (for lab members)

- **Add a publication:** edit `_data/publist.yml`
- **Add a news item:** edit `_data/news.yml` (or directly in `_pages/allnews.md`)
- **Update team:** edit `_data/team_members.yml`, `_data/PhD.yml`, or the team cards in `_pages/team.md`
- **Add an event:** edit `_pages/events.md`

Submit a pull request — most changes are simple YAML/Markdown edits and don't require touching the layout or CSS.

## Homepage features

- Live clock (IST) and mini calendar with upcoming conference highlights
- AI-curated "Field Intelligence" panel summarizing recent neutron-star / GW astrophysics developments (calls the Anthropic API client-side)

## License

Content © NAP Lab, NIT Rourkela. Code may be reused/adapted for similar academic lab websites.
