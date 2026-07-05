# RaidBench Product Spec

Last updated: 2026-07-05

## Purpose

RaidBench is a fast-launch Rust companion site for validating whether a tool-first game guide website can attract overseas traffic and later support USD monetization.

## Target User

Rust players who search for:

- raid cost calculator
- sheet metal door raid cost
- garage door raid cost
- stone wall raid cost
- base upkeep calculator
- solo/duo raid path
- sulfur planning

## MVP Promise

Help a player quickly estimate:

1. how many raid items they need
2. rough sulfur cost
3. weekly upkeep from daily tool cupboard values
4. which beginner guides to read next

## Included In Stage 1

- Static website.
- Raid cost calculator.
- Upkeep estimator.
- Basic raid cost chart.
- Three SEO guide sections.
- Email interest form as a non-network demo.
- Unofficial/fan-made disclaimer.
- Generated original artwork, no official game assets.
- `robots.txt` and `sitemap.xml`.

## Excluded From Stage 1

- Real email capture.
- User accounts.
- PayPal checkout.
- Credit wallet.
- Backend database.
- Admin dashboard.
- Official game art or scraped data.
- Spam/outreach automation.

## UX Requirements

- First screen must show the actual tool, not a marketing-only page.
- Calculator must work without login.
- Mobile must not overflow horizontally.
- Copy should be practical and short.
- Ads/popups should not exist in Stage 1.

## Data Caveat

Raid cost values are community-style estimates and should be rechecked after major Rust patches.

## Stage 1 Success Criteria

- Local page opens.
- Calculator can add and remove targets.
- Upkeep totals update from input values.
- Desktop and mobile render without obvious overlap.
- Static site is deploy-ready.

## Stage 2 Success Criteria

- Public URL is live.
- Google Search Console is configured.
- Sitemap is submitted.
- Analytics is installed.

## Stage 3 Success Criteria

- 10-20 indexable guide pages are published.
- Search Console shows impressions.
- At least one tool or guide gets usage signal.

