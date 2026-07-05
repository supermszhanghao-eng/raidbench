# RaidBench QA Log

Last updated: 2026-07-05

## Stage 1 Local QA

Status:

```text
Passed local smoke and browser interaction checks.
Not publicly deployed yet.
```

Local URL:

```text
http://localhost:4289/
```

Checks completed:

- JavaScript syntax check passed with `node --check`.
- HTML parser smoke check passed.
- Local server started on port `4289`.
- `/`, `/robots.txt`, and `/sitemap.xml` returned HTTP 200 via Python HTTP check.
- Browser title matched `RaidBench - Rust Raid Cost & Upkeep Calculator`.
- Page rendered meaningful content.
- Console warnings/errors were empty in browser check.
- First viewport was revised to be tool-first, not marketing-hero-first.
- Raid calculator default total rendered.
- Added `3 x Garage Door / Explosive Ammo`; totals updated.
- Removed the added row; totals returned to default.
- Changed upkeep fields; weekly totals updated.
- Mobile viewport `390x844` had no horizontal overflow.
- Mobile first viewport shows the calculator form directly.

Screenshots captured outside repo:

- `/tmp/raidbench-desktop-v3.png`
- `/tmp/raidbench-mobile-v2.png`

Known limitations:

- `robots.txt` and `sitemap.xml` still use `https://example.com/` placeholders.
- No public deployment yet.
- No real analytics yet.
- No real email capture yet.
- No payment, credits, or account system yet.

Next step:

```text
Stage 2: Deploy and index.
```
