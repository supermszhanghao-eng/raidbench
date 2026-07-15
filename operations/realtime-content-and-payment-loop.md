# Realtime Content And Payment Loop

Last updated: 2026-07-15

## Product Position

RaidBench sells current-version decision help for complex games.

It does not sell:

- in-game currency
- game accounts
- boosting
- skins or in-game items
- gambling, betting, or bug exploitation services

The product is a loop:

```text
player problem -> version-aware answer -> paid audit/credits -> delivery evidence -> update monitoring -> refresh or expiry notice
```

## Game Priority

Current active tracks:

1. POE2
2. Rust

Next track to start:

3. Palworld

Watchlist:

4. Warframe
5. Destiny 2

The source of truth is:

```text
content/game-opportunity-matrix.json
```

## Why Not Chase Every Hot Game

High player count is not enough.

RaidBench should only add a game when it has:

- frequent player uncertainty
- enough systems depth
- repeatable problem templates
- content that can be versioned
- a clear paid diagnostic product
- safe, unofficial, non-exploit positioning

Games with huge traffic but low paid diagnostic fit should stay out.

## Content Freshness Model

Every guide and paid output should have a content state:

| State | Meaning | User-facing action |
| --- | --- | --- |
| Current | Checked against known latest source context | Show normally |
| Watchlist | Official update or community spike may affect it | Show warning banner |
| Needs Review | Likely affected by patch, balance, bug fix, or economy shift | Hide from paid recommendations until reviewed |
| Deprecated | Known outdated or based on removed behavior | Keep indexed only if useful, but clearly mark outdated |
| Archived | No longer useful for current game state | Remove from main navigation |

## Update Triggers

Do not wait for a daily batch when these happen:

- official patch note appears
- hotfix mentions skills, items, bosses, AI, economy, or raid mechanics
- exploit or bug is fixed
- official server maintenance includes gameplay changes
- Reddit/Steam/YouTube questions spike around the same failure
- paid users submit repeated complaints about the same answer

## Response Speed

| Trigger type | Target response |
| --- | --- |
| Major official patch | mark affected pages within 2 hours, review within 24 hours |
| Hotfix or bug fix | mark affected pages within 2 hours |
| New exploit discovered | do not sell exploit guidance; mark as unstable if mentioned |
| Economy/meta shift | add watchlist flag within 12 hours |
| Normal community demand | add to backlog daily |

## Bug And Exploit Policy

Bug-dependent advice is not a stable paid product.

Allowed:

- mention that a method is unstable or reportedly fixed
- warn users not to rely on it
- mark old content as deprecated

Not allowed:

- sell a bug abuse guide
- promise a bug will keep working
- market exploit use as a guaranteed method

## Paid Product Promise

Use three product promises.

### One-Off Answer

The user pays for one current-context answer.

Rules:

- valid for the game state known at delivery time
- no unlimited updates
- correction is free if RaidBench made an error
- major patch refresh requires a new credit spend or Season plan

Suggested copy:

```text
This answer is based on the game state known at delivery time. Major patches, hotfixes,
economy shifts, and bug fixes may change the recommendation.
```

### Short Correction Window

For customer trust:

- 7 days for correction when RaidBench made a factual mistake
- no free rewrite for unrelated game updates
- if a patch lands within 24 hours of delivery and directly invalidates the answer, offer one discounted refresh or goodwill refresh for Season users

### Season Pass

Season Pass users pay for update coverage, not one static guide.

Include:

- patch impact alerts
- limited refresh credits
- priority review for affected outputs
- monthly or season-cycle summary

## Notification Rules For Paid Users

When content changes, notify only affected users.

Minimum notification data needed:

- email
- purchased product/action
- game
- content version
- delivery date
- patch context
- affected tags

Notification types:

| Type | Trigger | Message |
| --- | --- | --- |
| Watchlist alert | likely affected but not confirmed | "Your previous answer may need review." |
| Invalidated alert | confirmed outdated | "This recommendation is no longer current." |
| Refresh offer | one-off buyer | "Spend credits for a refreshed answer." |
| Included refresh | Season user | "Your plan includes a refresh request." |

## Closed Loop Needed Before Real Credits

PayPal can accept money after the business account and checkout link/button are ready, but that is not yet a complete product loop.

Minimum closed loop:

1. User chooses pack or audit.
2. Checkout collects payment.
3. Order is recorded.
4. Credits or delivery entitlement is created server-side.
5. User submits intake form.
6. Answer is generated with game/version/source context.
7. Delivery record is stored.
8. Content monitor detects updates.
9. Affected paid outputs are flagged.
10. User receives email alert or refresh offer.

## Launch Modes

### Manual MVP

Fastest paid launch:

- PayPal hosted checkout
- manual order export
- intake form
- manual or semi-automated audit
- email delivery
- spreadsheet delivery log

This can prove payment demand quickly, but it does not support automatic credits.

### Automated Credits

Needed for scalable closure:

- PayPal or Merchant of Record checkout
- webhook verification
- Cloudflare Worker API
- D1 credit ledger
- user/order table
- intake submissions
- generated output records
- notification worker

Do not trust browser-only credit balances.

## Next Implementation Order

1. Add Palworld content backlog and 6 initial pages.
2. Add content state fields to guide data.
3. Add a public "last checked / patch sensitive" block to POE2 pages.
4. Add a manual paid-order delivery log for POE2 audits.
5. Connect PayPal hosted checkout for one Starter pack only.
6. Add Workers + D1 only after a real payment test works.
