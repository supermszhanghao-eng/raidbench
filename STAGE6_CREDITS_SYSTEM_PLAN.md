# Stage 6 Credits System Plan

Last updated: 2026-07-05

## Goal

Prepare a cloud-safe credits system without enabling real credits too early.

Credits should only launch after:

- analytics shows repeated tool usage
- at least one paid-offer signal exists
- PayPal Business checkout is configured
- a cloud backend and database are ready

## Rule

Never store credit balances only in browser JavaScript.

Credit balances must live in a server-side ledger because browser state can be changed by users.

## First Credit Use Cases

Start with features that justify repeat usage:

| Feature | Suggested cost | Why it can justify credits |
| --- | ---: | --- |
| Custom raid route planner | 3 credits | Player inputs base path and gets a route plan |
| Wipe prep checklist generator | 2 credits | Repeatable per wipe/server |
| Base upkeep plan generator | 2 credits | Repeatable when base expands |
| Premium raid pack generator | 5 credits | Higher-value generated output |

## First Credit Packages

Do not create many packages at launch.

| Package | Credits | Price |
| --- | ---: | ---: |
| Starter | 20 | USD 5 |
| Raider | 60 | USD 12 |
| Clan | 160 | USD 25 |

Start with one package if conversion is weak.

## Ledger Model

Credits should use an append-only ledger:

- purchases add credits
- usage subtracts credits
- refunds subtract or reverse purchase credits
- admin adjustments are explicit rows

Never update a balance without a ledger row.

## Minimum Tables

- `users`
- `credit_accounts`
- `credit_ledger`
- `orders`
- `generated_plans`
- `idempotency_keys`

## Minimum API

Public:

- `GET /api/me`
- `GET /api/credits/balance`
- `POST /api/credits/quote`
- `POST /api/credits/use`
- `GET /api/plans/:id`

Payments:

- `POST /api/paypal/webhook`
- `POST /api/orders/create`

Admin:

- `GET /api/admin/orders`
- `GET /api/admin/ledger`
- `POST /api/admin/adjust-credit`

## Safety Requirements

- Use PayPal webhook verification before adding credits.
- Use idempotency keys for payment and usage events.
- Store PayPal transaction IDs.
- Keep buyer email and fulfillment evidence.
- Never trust credit cost sent from the browser.
- Calculate cost server-side from known product/action IDs.
- Keep admin adjustments auditable.

## Recommended Cloud Architecture

First cloud version:

```text
Cloudflare Pages
Cloudflare Workers API
Cloudflare D1 database
PayPal hosted checkout or PayPal standard checkout
```

Later VPS version, only if needed:

```text
Node/Express or Next.js API
Postgres
Redis queue
Object storage for generated files
```

## Launch Gate

Do not launch real credits until all are true:

- PayPal Business payment link or checkout is working.
- Webhook endpoint is live on cloud.
- Ledger schema is deployed.
- A test purchase can create an order and add credits once.
- Duplicate webhook events do not double-add credits.
- A credit spend cannot create a negative balance.
- Refund handling is defined.

## Stage 6 Output In This Repo

This stage currently produces:

- credit-system product rules
- API contract
- database schema
- deployment options
- cloud-readiness checklist

It does not enable real balances or real credit purchases yet.
