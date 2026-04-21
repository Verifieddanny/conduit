# Conduit — Frontend

The frontend application for [Conduit](https://github.com/Verifieddanny/conduit-engine), a source-agnostic webhook relay service.

## Pages

### Landing Page (`/`)
Product overview with animated pipeline hero, three-step integration walkthrough, supported webhook sources (GitHub, Stripe, Paystack, Slack, Shopify), feature grid, architecture diagram, and tech stack.

### Documentation (`/docs`)
Comprehensive public developer documentation with:
- **Getting Started** — What is Conduit, Quick Start guide
- **Authentication** — JWT for dashboard, API keys for programmatic access
- **API Reference** — Every endpoint with method badges, auth requirements, request/response schemas, curl examples
- **Webhook Sources** — Per-source setup guides with signature verification details
- **Delivery & Reliability** — Retry logic, exponential backoff + jitter, dead letter queue, manual replay
- **Security** — Verifying Conduit signatures (Node.js, Python, Go examples), payload signing, secret management
- **Architecture** — Producer-consumer pattern, write-ahead persistence, system diagram

### Dashboard (coming soon)
- Endpoint management (create, list, update, delete)
- Delivery logs with status filtering and payload inspection
- API key lifecycle management
- Event simulator for testing
- Delivery analytics

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## Design

Dark industrial aesthetic — infrastructure monitoring meets developer tooling. Custom SVG icons for each webhook source. Pipeline flow visuals. Status-colored elements (green/amber/red) for delivery states.

## Project Structure

```
app/
├── (landing)/
│   ├── layout.tsx
│   └── page.tsx
├── (documentation)/
│   └── docs/
│       ├── layout.tsx
│       └── page.tsx
├── globals.css
└── favicon.ico

components/
├── docs/
│   ├── sections/
│   │   ├── getting-started.tsx
│   │   ├── quickstart.tsx
│   │   ├── auth.tsx
│   │   ├── api-reference.tsx
│   │   ├── api-key.tsx
│   │   ├── create-endpoint.tsx
│   │   ├── receive-webhook.tsx
│   │   ├── sources.tsx
│   │   ├── delivery.tsx
│   │   ├── security.tsx
│   │   └── architecture.tsx
│   ├── code-block.tsx
│   ├── copy-button.tsx
│   ├── header.tsx
│   ├── mobile-sidebar.tsx
│   ├── navbar.tsx
│   ├── section.tsx
│   └── sidebar.tsx
├── landing/
│   ├── hero.tsx
│   ├── feature.tsx
│   ├── how-it-works.tsx
│   └── resillence.tsx
├── navbar.tsx
└── footer.tsx

public/svgs/
├── conduit-logo.svg
├── github.svg
├── stripe.svg
├── paystack.svg
├── slack.svg
├── shopify.svg
└── custom.svg
```

## Setup

```bash
# Clone
git clone https://github.com/Verifieddanny/conduit.git
cd conduit

# Install dependencies
bun install

# Start dev server
bun dev
```

## Related

- **Backend:** [conduit-engine](https://github.com/Verifieddanny/conduit-engine)

## Author

**Danny (DevDanny)** — [@dannyclassi_c](https://x.com/dannyclassi_c)

## License

MIT

Previous projects: [URL Shortener](https://github.com/Verifieddanny/url-shortener) | [NexusChat](https://github.com/Verifieddanny/nexus-chat) | [Shipyard](https://github.com/Verifieddanny/ship-yard)