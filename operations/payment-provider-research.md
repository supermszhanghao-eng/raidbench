# Payment Provider Research

Last updated: 2026-07-06

## Goal

Choose the fastest safe payment path for a small digital game-guide product such as the USD 9
Rust Raid Prep Pack.

## Shortlist

Note: "Pando Cream" appears to be a naming mix-up rather than a mainstream payment provider.
The relevant providers for this project are more likely Paddle and Creem.

| Provider | Type | Strong fit | Watch-outs |
| --- | --- | --- | --- |
| PayPal Business | Payment account / hosted buttons | Fastest because the account is already open and the site can use a hosted PayPal button. | More manual fulfillment, buyer disputes still need evidence, domestic withdrawal setup may require a business bank account or legal representative card. |
| Stripe | Payment processor | Strong long-term option for cards, wallets, Checkout Sessions, Payment Links, subscriptions, and later credits. | Availability, onboarding, tax handling, and dispute handling remain merchant responsibilities unless using other services. |
| Lemon Squeezy | Merchant of Record | Good for digital products and software where the platform should handle tax/VAT complexity. | Product approval, fees, country support, payout timing, and platform rules need confirmation before launch. |
| Paddle | Merchant of Record | Mature option for global SaaS/digital products with tax and invoicing handled by the MoR. | Onboarding review can be stricter; may be more than needed for a USD 9 validation test. |
| Creem | Merchant of Record | Lightweight MoR positioned for software and AI products; worth watching as an alternative. | Newer vendor; verify coverage, payout country support, refund/dispute workflows, and reputation before relying on it. |

## Recommendation

Use PayPal Business first for validation because the account exists and the site only needs a hosted
checkout link. Keep manual fulfillment for the first 10-20 buyers.

Move to a Merchant of Record such as Lemon Squeezy, Paddle, or Creem if:

- international tax/VAT handling becomes painful,
- card payments convert better than PayPal,
- refund/dispute handling needs a cleaner merchant workflow,
- downloadable product delivery should be automated without a custom backend.

Move to Stripe if:

- RaidBench needs full product control,
- accounts, credits, subscriptions, or metered usage become core,
- a Cloudflare Workers backend is already in place for webhooks and fulfillment.

## Implementation Notes

For Stripe, prefer Payment Links for the first simple product or Checkout Sessions for a controlled
web checkout. Avoid building custom card collection early.

For PayPal, keep delivery evidence:

- transaction ID,
- buyer email,
- payment status,
- delivery timestamp,
- delivered file/version,
- refund or dispute status.

## Open Questions

- Should `support@raidbench.com` continue forwarding to `superms123@gmail.com`, or move to a shared mailbox later?
- Is the first product a one-time PDF/CSV pack, or will it become credits?
- Should buyers receive a download link, email attachment, or account-based delivery?

## Source Links

- PayPal Business setup notes: `operations/paypal-receiving-setup.md`
- Stripe Checkout / Payment Links guidance: https://docs.stripe.com/payments/payment-links
- Stripe Checkout Sessions API: https://docs.stripe.com/api/checkout/sessions
- Lemon Squeezy: https://www.lemonsqueezy.com/
- Paddle: https://www.paddle.com/
- Creem: https://www.creem.io/
