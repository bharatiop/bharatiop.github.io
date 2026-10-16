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
    if p is not None:
        new["positions"] = p
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
