# Payment, Tax, and Margin Model

Last updated: 2026-07-15

This is an operating note for RaidBench pricing decisions. It is not tax, legal, or accounting advice. Before enabling paid checkout, confirm the final structure with an accountant who understands Chinese tax residency, cross-border digital services, and the payment provider being used.

## Working Product

RaidBench sells website-based planning services, not in-game goods:

- Free pages: SEO pages, problem checklists, basic calculators, scorecards, and guide hubs.
- Paid products: credit packs for human/AI-assisted planning outputs, such as build audits, base optimization, boss prep, breeding goal checks, and route planning.
- Exclusions: no game currency, no game top-up, no boosting, no account sales, no item trading, and no official affiliation claims.

## Do Not Mix Up Fees and Taxes

PayPal withdrawal is not usually the moment where "tax is deducted." Tax is normally based on the sale, business profit, tax residency, and customer location. PayPal can charge processing, currency conversion, withdrawal, chargeback, and dispute fees. Those are operating costs, not income tax.

Use this breakdown for every sale:

1. Gross customer price.
2. Payment processing fee, fixed fee, currency conversion spread, and withdrawal cost.
3. VAT, sales tax, GST, or similar indirect tax if applicable.
4. Merchant of Record fee if using Paddle, Lemon Squeezy, Creem, or similar.
5. Server, storage, email, and API/LLM cost.
6. Refund, chargeback, and support reserve.
7. Remaining contribution margin before income tax.

## Tax Responsibility Map

| Layer | Who usually collects or pays | What it means for RaidBench |
| --- | --- | --- |
| Payment fee | PayPal, Payoneer, card networks, or Merchant of Record | Treat as cost of sales. It reduces margin but is not tax. |
| Currency conversion and withdrawal | Payment provider or bank | Treat as operating cost. Avoid unnecessary conversions between USD, EUR, GBP, and CNY. |
| Customer-side VAT/sales tax | Seller or Merchant of Record, depending on setup | Direct PayPal checkout can leave compliance on us. A Merchant of Record can handle more of this. |
| China income tax | Chinese individual/operator/company, depending on entity setup | If the operator is China tax resident or a Chinese entity, overseas revenue may need to be declared in China. |
| Overseas income withholding | Depends on country, product type, and structure | Usually not triggered by simple B2C digital checkout in every country, but some jurisdictions may create obligations. Confirm before scale. |

## Direct PayPal vs Merchant of Record

Direct PayPal is fastest for MVP checkout:

- Lower setup friction once PayPal Business is approved.
- Can use buttons, links, or hosted checkout before a full account system.
- You still need order records, refund handling, support email, and tax assessment.

Merchant of Record is cleaner when selling to many countries:

- Usually higher fee than direct PayPal.
- Can reduce VAT/sales-tax administration for EU/UK and other locations.
- Better once paid volume is real, because tax logic and invoices become the hidden workload.

Practical path:

1. Start with PayPal Business only after the site has policies, support email, delivery records, and clear product language.
2. Keep paid products as digital planning services, not game services.
3. If EU/UK buyers appear, evaluate a Merchant of Record before scaling ads.
4. Keep country, currency, buyer email, item, tax shown, payment fee, refund status, and delivery evidence for every order.

## Minimum Pricing Guardrails

Do not sell very small $1 to $2 credit packs through PayPal. Fixed transaction fees and support time can destroy margin.

Suggested floor:

| Product | Price | Intended cost shape | Decision |
| --- | ---: | --- | --- |
| Starter | $4.99 / €4.99 / £4.49 | One small answer, low API use, no long support loop | Minimum viable paid pack |
| Pro | $9.99 / €9.99 / £8.99 | One full audit or several checklist answers | Main MVP offer |
| Season | $19.99 / €19.99 / £17.99 | Recurring patch-sensitive help with capped credits | Best margin, but needs clear limits |

## Rough Margin Examples

These are planning examples only. Replace with real fee data from the active PayPal account and actual API/server invoices.

| Pack | Gross | Processing + FX assumption | Indirect tax / MoR assumption | API/server | Refund/support reserve | Pre-income-tax margin |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Starter | $4.99 | $0.75 | $1.00 | $0.30 | $0.50 | $2.44 |
| Pro | $9.99 | $1.10 | $2.00 | $0.80 | $1.00 | $5.09 |
| Season | $19.99 | $1.80 | $4.00 | $2.50 | $2.50 | $9.19 |

The risk is not just tax. A product can lose money if:

- The user asks many follow-up questions but the package has no credit cap.
- The answer uses expensive API calls without budget limits.
- Ads are bought before organic conversion is proven.
- Refunds or chargebacks are not reserved.
- Currency conversion happens multiple times.
- EU/UK tax obligations are ignored until volume is already large.

## Cost Controls Before Checkout

- Keep the free site static on Cloudflare Pages while validating search demand.
- Use Cloudflare Workers, Pages Functions, or a small serverless backend before renting a VPS.
- Add per-order credit limits before integrating AI/API calls.
- Store every paid answer with game version, last checked date, source notes, and update status.
- Mark content as Current, Needs Review, Deprecated, or Archived after patches.
- For paid users, promise a limited correction window for RaidBench factual errors, not unlimited lifetime support.

## Source Notes

- PayPal Checkout supports hosted checkout, payment links, and a PayPal Business requirement; PayPal fees are listed per transaction and subject to change.
- UK digital services VAT guidance says customer location and whether the supply is a digital service matter; payment processors alone are not treated as the digital platform responsible for VAT.
- EU VAT One Stop Shop exists to simplify cross-border e-commerce VAT.
- Chinese official tax guidance includes foreign-income declaration and foreign tax credit concepts for residents and resident enterprises.
