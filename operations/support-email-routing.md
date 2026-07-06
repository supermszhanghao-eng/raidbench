# Support Email Routing

Last updated: 2026-07-06

## Current Setup

`support@raidbench.com` is configured with Cloudflare Email Routing.

Incoming mail is forwarded to:

```text
superms123@gmail.com
```

## Cloudflare State Checked

- Domain: `raidbench.com`
- Email Routing status: `ready`
- Destination address: `superms123@gmail.com`
- Destination verification: verified
- Route rule: `support@raidbench.com` forwards to `superms123@gmail.com`

## DNS Records Checked

Public DNS resolves the Cloudflare Email Routing records:

- MX: `route1.mx.cloudflare.net`
- MX: `route2.mx.cloudflare.net`
- MX: `route3.mx.cloudflare.net`
- SPF TXT: `v=spf1 include:_spf.mx.cloudflare.net ~all`
- DKIM TXT: `cf2024-1._domainkey.raidbench.com`

## Test Notes

Local direct SMTP delivery from this Mac was rejected by Cloudflare because the residential sender IP
failed reverse lookup. That is a sender-network restriction, not a missing route rule.

Use a normal external inbox such as Gmail, Outlook, or a phone mail app to send a real test message to
`support@raidbench.com`, then confirm it arrives in `superms123@gmail.com`.

## Future Options

- Keep the current forwarding setup for early validation.
- Move to Google Workspace, Zoho Mail, or another mailbox provider if replies should be sent directly
  as `support@raidbench.com`.
- Create aliases such as `billing@raidbench.com` after payments are enabled.
