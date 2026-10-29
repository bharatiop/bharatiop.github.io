#!/usr/bin/env python3
"""Refresh _data/live_feeds.json from INSPIRE HEP (conferences, jobs) and Crossref (papers).

Run weekly by .github/workflows/update-feeds.yml. Standard library only.
The browser fetches the same sources live on each visit; this snapshot is the
fallback when a visitor's request fails and keeps the page useful with JS slow.
Nothing is invented: if a source is unreachable its previous snapshot is kept.
"""
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "_data" / "live_feeds.json"
UA = {"User-Agent": "nap-lab-site-feed-updater/1.0 (+https://bharatiop.github.io)", "Accept": "application/json"}

CONF_RELEVANT = re.compile(r"neutron|compact (object|star)|dense|nuclear|gravitational|gravity|multi-?messenger|pulsar|"
                           r"equation of state|astrophys|dark matter|relativ|\bGW\b|LIGO|Virgo|KAGRA|LISA|"
                           r"Einstein Telescope|cosmic explorer|kilonova|supernova|magnetar|quark", re.I)
CORE_FIELD = re.compile(r"neutron[ -]stars?|dense (nuclear )?matter|equation[ -]of[ -]state|nuclear astrophysics|"
                        r"compact[ -]stars?|pulsar|hyperon|quark matter|asteroseismology", re.I)
JOB_RELEVANT = re.compile(r"neutron|compact (object|star)|dense|nuclear (astro|theory)|gravitational[ -]wave|"
                          r"multi-?messenger|pulsar|equation of state|dark matter|relativ|astrophys|kilonova|supernova|\bGW\b", re.I)
PAPER_RELEVANT = re.compile(r"neutron|compact (star|object)|pulsar|dense (nuclear |baryonic )?matter|equation of state|hyperon|"
                            r"quark|quarkyonic|tidal deformab|f-mode|quasinormal|magnetar|kilonova|binary neutron|nuclear matter|"
                            r"symmetry energy|dark matter.*(star|stellar)|admixed", re.I)

CONF_QUERIES = ["neutron stars", "gravitational waves", "dense matter equation of state",
                "nuclear astrophysics", "multimessenger astrophysics", "compact objects"]
JOB_QUERIES = ["neutron star", "gravitational waves", "nuclear astrophysics",
               "dense matter", "multimessenger astrophysics", "compact objects"]
PAPER_QUERIES = ["neutron star", "dense matter equation of state", "compact star gravitational wave"]
JOURNALS = {
    "aps": ["2470-0010", "2470-0029", "2469-9985", "2469-9993", "0031-9007", "1079-7114", "2643-1564"],
    "aas": ["0004-637X", "1538-4357", "2041-8205", "2041-8213", "0067-0049", "1538-4365"],
    "other": ["0035-8711", "1365-2966", "1475-7516", "2212-6864"],
}


def get_json(url, tries=3):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except Exception as e:  # noqa: BLE001 - network is best-effort
            last = e
            time.sleep(2 * (i + 1))
    print(f"  ! failed: {url[:90]}… ({last})", file=sys.stderr)
    return None


def strip_tags(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s or "")).strip()


def norm(s):
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())


def conf_type(title):
    if re.search(r"school", title, re.I):
        return "school"
    if re.search(r"workshop", title, re.I):
        return "workshop"
    if re.search(r"webinar|meeting|annual", title, re.I):
        return "meeting"
    return "conference"


def fetch_conferences(today):
    seen, out = set(), []
    got_any = False
    for q in CONF_QUERIES:
        url = ("https://inspirehep.net/api/conferences?sort=datedesc&size=60&q=" + urllib.parse.quote(q) +
               "&fields=titles,opening_date,closing_date,addresses,control_number,urls")
        j = get_json(url)
        if j is None:
            continue
        got_any = True
        for h in (j.get("hits") or {}).get("hits") or []:
            m = h.get("metadata") or {}
            title = ((m.get("titles") or [{}])[0] or {}).get("title", "")
            start = (m.get("opening_date") or "")[:10]
            end = (m.get("closing_date") or start)[:10]
            if not title or not start or end < today or not CONF_RELEVANT.search(title):
                continue
            key = start[:7] + norm(title)[:28]
            if key in seen:
                continue
            seen.add(key)
            addr = (m.get("addresses") or [{}])[0] or {}
            place = ", ".join(x for x in [(addr.get("cities") or [""])[0], addr.get("country")] if x)
            cn = m.get("control_number")
            out.append({"title": title, "start": start, "end": end, "place": place or "See event page",
                        "type": conf_type(title), "tags": [], "source": "INSPIRE",
                        "url": f"https://inspirehep.net/conferences/{cn}" if cn else "https://inspirehep.net/conferences"})
    out.sort(key=lambda c: c["start"])
    return out if got_any else None


def fetch_jobs(today):
    seen, out = set(), []
    got_any = False
    today_d = date.fromisoformat(today)
    for q in JOB_QUERIES:
        url = ("https://inspirehep.net/api/jobs?sort=mostrecent&size=40&q=" + urllib.parse.quote(q) +
               "&fields=position,institutions,ranks,regions,deadline_date,status,description,arxiv_categories,control_number")
        j = get_json(url)
        if j is None:
            continue
        got_any = True
        for h in (j.get("hits") or {}).get("hits") or []:
            m = h.get("metadata") or {}
            if m.get("status") and m["status"] != "open":
                continue
            ranks = [str(r).upper() for r in (m.get("ranks") or [])]
            level = "phd" if "PHD" in ranks else "postdoc" if "POSTDOC" in ranks else ""
            title = m.get("position") or ""
            desc = strip_tags(m.get("description") or "")
            text = f"{title} {desc} {' '.join(m.get('arxiv_categories') or [])}"
            if not level or not title or not JOB_RELEVANT.search(text):
                continue
            deadline = (m.get("deadline_date") or "")[:10]
            if deadline and deadline < today:
                continue
            if not deadline:
                upd = (h.get("updated") or h.get("created") or "")[:10]
                try:
                    if not upd or (today_d - date.fromisoformat(upd)).days > 120:
                        continue
                except ValueError:
                    continue
            org = ((m.get("institutions") or [{}])[0] or {}).get("value", "")
            key = norm(org)[:18] + norm(title)[:26] + level
            if key in seen:
                continue
            seen.add(key)
            cn = m.get("control_number")
            out.append({"title": title, "org": org or "See posting", "region": (m.get("regions") or [""])[0],
                        "country": "", "level": level, "deadline": deadline, "start": "",
                        "topics": desc[:150] + ("…" if len(desc) > 150 else ""),
                        "core": bool(CORE_FIELD.search(text)), "source": "INSPIRE",
                        "url": f"https://inspirehep.net/jobs/{cn}" if cn else "https://inspirehep.net/jobs"})
    out.sort(key=lambda p: (p["deadline"] == "", p["deadline"]))
    return out if got_any else None


# ---- India faculty (INSPIRE ranks JUNIOR/SENIOR, region Asia) ----------------
FAC_QUERY = "status:open and ranks:(JUNIOR or SENIOR) and regions:Asia"
FAC_TITLE = re.compile(r"professor|faculty|reader|lecturer|tenure|scientist[ -]?(e|f|g|h)\b", re.I)
INDIA_ORG = re.compile(
    r"\bIIT\b|\bIISER\b|\bNISER\b|\bIISc\b|\bTIFR\b|\bIUCAA\b|\bNCRA\b|\bIIA\b|\bPRL\b|\bSINP\b|\bVECC\b|\bRRI\b|"
    r"\bIMSc\b|\bICTS\b|\bHRI\b|\bBARC\b|\bHBNI\b|\bIPR\b|\bARIES\b|India|Bhubaneswar|Kolkata|Delhi|Mumbai|Bombay|Pune|"
    r"Bangalore|Bengaluru|Chennai|Madras|Hyderabad|Kanpur|Kharagpur|Roorkee|Guwahati|Mohali|Ahmedabad|Gurugram|Gurgaon|Rourkela|"
    r"Varanasi|Indore|Bhopal|Tirupati|Trivandrum|Thiruvananthapuram|Allahabad|Prayagraj|Jaipur|Lucknow|Chandigarh|Gandhinagar|"
    r"Raipur|Patna|Nagpur|Jodhpur|Mandi|Ropar|Dharwad|Goa|Kerala|Cochin|Kochi|Mysore|Manipal|Dehradun|Jammu|Silchar|Shillong|"
    r"Tezpur|Bhilai|Palakkad|Kozhikode|Warangal|Surathkal|Trichy|Tiruchirappalli")
FAC_AREA = re.compile(r"astro|nuclear|neutron|gravit|cosmolog|hadron|compact|relativ|pulsar|supernova|quark|multi-?messenger", re.I)
FAC_GENERIC = re.compile(r"all (areas|fields|disciplines|branches)|any (area|field)|open to (all|any)|department of physics|"
                         r"school of physics|physics department|physical sciences?", re.I)


def fetch_faculty(today):
    url = ("https://inspirehep.net/api/jobs?sort=mostrecent&size=100&q=" + urllib.parse.quote(FAC_QUERY) +
           "&fields=position,institutions,ranks,regions,deadline_date,status,description,arxiv_categories,control_number")
    j = get_json(url)
    if j is None:
        return None
    today_d = date.fromisoformat(today)
    out = []
    for h in (j.get("hits") or {}).get("hits") or []:
        m = h.get("metadata") or {}
        if m.get("status") and m["status"] != "open":
            continue
        ranks = [str(r).upper() for r in (m.get("ranks") or [])]
        if "JUNIOR" not in ranks and "SENIOR" not in ranks:
            continue
        title = m.get("position") or ""
        org = ((m.get("institutions") or [{}])[0] or {}).get("value", "")
        desc = strip_tags(m.get("description") or "")
        text = f"{title} {desc}"
        if not title or not FAC_TITLE.search(title):
            continue
        if not (INDIA_ORG.search(org) or re.search(r"\bIndia(n)?\b", title + " " + desc[:400])):
            continue
        if not (FAC_AREA.search(text) or FAC_GENERIC.search(text)):
            continue
        deadline = (m.get("deadline_date") or "")[:10]
        if deadline and deadline < today:
            continue
        if not deadline:
            upd = (h.get("updated") or h.get("created") or "")[:10]
            try:
                if not upd or (today_d - date.fromisoformat(upd)).days > 120:
                    continue
            except ValueError:
                continue
        cn = m.get("control_number")
        out.append({"title": title, "org": org or "See posting", "region": "Asia", "country": "India",
                    "level": "faculty", "deadline": deadline, "start": "",
                    "topics": desc[:150] + ("…" if len(desc) > 150 else ""),
                    "core": bool(CORE_FIELD.search(text)), "source": "INSPIRE",
                    "url": f"https://inspirehep.net/jobs/{cn}" if cn else "https://inspirehep.net/jobs"})
    return out


# ---- Astronomical Society of India job register (server-side only: no CORS) ---
ASI_BASE = "https://www.astron-soc.in"
ASI_PAGES = {"faculty": "/list-of-jobs/faculty", "postdoc": "/list-of-jobs/postdoc", "phd": "/list-of-jobs/phd"}
ISO = re.compile(r"^\d{4}-\d{2}-\d{2}$")


class _Rows(HTMLParser):
    """Collect <tr> rows as (href, [cell texts]) from a listing table."""
    def __init__(self):
        super().__init__()
        self.rows, self._cells, self._href, self._in_td, self._buf = [], None, None, False, []

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self._cells, self._href = [], None
        elif tag in ("td", "th") and self._cells is not None:
            self._in_td, self._buf = True, []
        elif tag == "a" and self._in_td and self._href is None:
            h = dict(attrs).get("href") or ""
            if "/jobdetails/" in h:
                self._href = h

    def handle_endtag(self, tag):
        if tag in ("td", "th") and self._in_td:
            self._cells.append(re.sub(r"\s+", " ", "".join(self._buf)).strip())
            self._in_td = False
        elif tag == "tr" and self._cells is not None:
            if self._href:
                self.rows.append((self._href, self._cells))
            self._cells = None

    def handle_data(self, data):
        if self._in_td:
            self._buf.append(data)


def _get_html(url):
    for i in range(3):
        try:
            req = urllib.request.Request(url, headers={**UA, "Accept": "text/html"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(2 * (i + 1))
    print(f"  ! failed: {url[:90]}… ({last})", file=sys.stderr)
    return None


def _asi_institute(url):
    html = _get_html(url)
    if not html:
        return ""
    lines = [re.sub(r"\s+", " ", l).strip() for l in re.sub(r"<(br|/p|/div|/tr|/li|/h\d)[^>]*>", "\n", html).splitlines()]
    lines = [strip_tags(l) for l in lines]
    lines = [l for l in lines if l]
    for i, l in enumerate(lines):
        m = re.match(r"^(Institute|Institution|Organi[sz]ation)\s*[:\-]?\s*(.*)$", l, re.I)
        if m:
            val = m.group(2).strip() or (lines[i + 1] if i + 1 < len(lines) else "")
            if 3 <= len(val) <= 120:
                return val
    return ""


def fetch_asi(today):
    out, got_any = [], False
    for level, path in ASI_PAGES.items():
        html = _get_html(ASI_BASE + path)
        if html is None:
            continue
        got_any = True
        parser = _Rows()
        parser.feed(html)
        for href, cells in parser.rows:
            title = cells[0] if cells else ""
            dates = [c for c in cells if ISO.match(c)]
            deadline = cells[3] if len(cells) > 3 and ISO.match(cells[3]) else (dates[-1] if len(dates) == 2 else "")
            if not title or (deadline and deadline < today):
                continue
            url = href if href.startswith("http") else ASI_BASE + href
            org = _asi_institute(url)
            india = level == "faculty" or bool(INDIA_ORG.search(org + " " + title))
            out.append({"title": title, "org": org or "See posting (ASI job register)", "region": "Asia",
                        "country": "India" if india else "", "level": level, "deadline": deadline, "start": "",
                        "topics": "Listed on the Astronomical Society of India job register.",
                        "core": False, "source": "ASI", "url": url})
    return out if got_any else None


def work_date(it):
    dp = ((it.get("published") or it.get("issued") or {}).get("date-parts") or [[]])[0]
    if not dp or not dp[0]:
        return ""
    return f"{dp[0]}-{(dp[1] if len(dp) > 1 else 1):02d}-{(dp[2] if len(dp) > 2 else 1):02d}"


def fetch_papers(issns):
    since = (datetime.now(timezone.utc) - timedelta(days=150)).date().isoformat()
    flt = ",".join([f"issn:{i}" for i in issns] + [f"from-pub-date:{since}", "type:journal-article"])
    seen, out, got_any = set(), [], False
    for q in PAPER_QUERIES:
        url = ("https://api.crossref.org/works?rows=40&query.title=" + urllib.parse.quote(q) + "&filter=" + flt +
               "&select=DOI,title,author,container-title,short-container-title,issued,published,volume,issue,page,article-number,URL")
        j = get_json(url)
        if j is None:
            continue
        got_any = True
        for it in (j.get("message") or {}).get("items") or []:
            title = strip_tags((it.get("title") or [""])[0])
            if not title or not PAPER_RELEVANT.search(title):
                continue
            doi = it.get("DOI") or ""
            if (doi or title) in seen:
                continue
            seen.add(doi or title)
            au = [" ".join(x for x in [a.get("given"), a.get("family")] if x) for a in it.get("author") or []]
            au = [a for a in au if a]
            jr = ((it.get("short-container-title") or [""])[0]) or ((it.get("container-title") or [""])[0])
            loc = it.get("article-number") or it.get("page") or ""
            ref = (jr + (f" {it['volume']}" if it.get("volume") else "") + (f", {loc}" if loc else "")).strip()
            out.append({"title": title, "authors": (", ".join(au[:3]) + " et al.") if len(au) > 3 else ", ".join(au),
                        "journal": jr, "ref": ref, "date": work_date(it),
                        "href": f"https://doi.org/{doi}" if doi else it.get("URL", ""), "doi": doi})
    out.sort(key=lambda p: p["date"], reverse=True)
    return out[:8] if got_any else None


def main():
    today = datetime.now(timezone(timedelta(hours=5, minutes=30))).date().isoformat()
    try:
        old = json.loads(OUT.read_text())
    except Exception:  # noqa: BLE001
        old = {}
    new = {
        "updated": today,
        "note": "Regenerated weekly by .github/workflows/update-feeds.yml (scripts/update_feeds.py).",
        "conferences": old.get("conferences", []),
        "positions": old.get("positions", []),
        "papers": old.get("papers") or {"aps": [], "aas": [], "other": []},
    }
    print("conferences…")
    c = fetch_conferences(today)
    if c is not None:
        new["conferences"] = c
    print("jobs…")
    p = fetch_jobs(today)
    print("India faculty (INSPIRE)…")
    f = fetch_faculty(today)
    print("ASI job register…")
    a = fetch_asi(today)
    if p is not None or f is not None or a is not None:
        merged, seen = [], set()
        for src in (p, f, a):
            for x in src or []:
                key = norm(x.get("org", ""))[:18] + norm(x["title"])[:26] + x["level"]
                if key in seen or x["url"] in seen:
                    continue
                seen.add(key)
                seen.add(x["url"])
                merged.append(x)
        # a source that failed this week keeps its previous items
        if p is None:
            merged += [x for x in new["positions"] if x.get("source") == "INSPIRE" and x.get("level") != "faculty"]
        if f is None:
            merged += [x for x in new["positions"] if x.get("source") == "INSPIRE" and x.get("level") == "faculty"]
        if a is None:
            merged += [x for x in new["positions"] if x.get("source") == "ASI"]
        merged.sort(key=lambda x: (x["deadline"] == "", x["deadline"]))
        new["positions"] = merged
    for k, issns in JOURNALS.items():
        print("papers", k, "…")
        r = fetch_papers(issns)
        if r is not None:
            new["papers"][k] = r
    # drop anything that has already passed, even if a source was unreachable
    new["conferences"] = [x for x in new["conferences"] if (x.get("end") or x.get("start", "")) >= today]
    new["positions"] = [x for x in new["positions"] if not x.get("deadline") or x["deadline"] >= today]
    OUT.write_text(json.dumps(new, indent=2, ensure_ascii=False) + "\n")
    print(f"wrote {OUT}: {len(new['conferences'])} conferences, {len(new['positions'])} positions, "
          + ", ".join(f"{k}={len(v)}" for k, v in new["papers"].items()))


if __name__ == "__main__":
    main()
