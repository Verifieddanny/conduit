# Conduit — Frontend

The frontend application for [Conduit](https://github.com/Verifieddanny/conduit-engine), a source-agnostic webhook relay service.

## Pages

### Landing Page (`/`)
Product overview with animated pipeline hero, three-step integration walkthrough, supported webhook sources (GitHub, Stripe, Paystack, Slack, Shopify), feature grid, architecture diagram, and tech stack.

### Documentation (`/docs`)
Comprehensive public developer documentation with getting started guide, authentication docs, full API reference, webhook source setup guides, delivery & reliability docs, security section with signature verification code examples, and architecture overview.

### Auth
- **Register** (`/register`) — Create account with username, email, password
- **Login** (`/login`) — Sign in with username and password, JWT stored in Zustand

### Dashboard (`/dashboard`)
- **Overview** — Stats grid (total endpoints, deliveries, success rate), pipeline health visualization, recent deliveries feed, reliability metrics, quick action links
- **Endpoints** (`/dashboard/endpoints`) — List all endpoints with status indicators, create new endpoints via slide-over panel, endpoint cards with delivery stats, edit/delete actions
- **Endpoint Detail** (`/dashboard/endpoints/:id`) — Endpoint overview, callback attempts list with status badges, delivery lifecycle sidebar, retry information sidebar
- **API Key** (`/dashboard/api-key`) — Key generation, reveal/copy interface, usage examples, status sidebar
- **Simulator** (`/dashboard/simulator`) — Event simulator with payload editor, event type constraints, and result sidebar for testing webhook delivery

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (auth store with persistence)
- **Data Fetching:** TanStack React Query + Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## Project Structure

```
app/
├── (landing)/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── (documentation)/
│   └── docs/
│       ├── layout.tsx
│       └── page.tsx
├── (dashboard)/
│   └── dashboard/
│       ├── endpoints/
│       │   ├── [id]/page.tsx
│       │   └── page.tsx
│       ├── api-key/page.tsx
│       ├── simulator/page.tsx
│       ├── layout.tsx
│       └── page.tsx
├── globals.css
└── favicon.ico

components/
├── auth/
│   ├── login-form.tsx
│   ├── register-form.tsx
│   ├── marketing-feature.tsx
│   └── monitor-snapshot.tsx
├── dashboard/
│   ├── endpoints/
│   │   ├── detail/
│   │   │   ├── callback-attempts.tsx
│   │   │   ├── callback-row.tsx
│   │   │   ├── lifecycle-sidebar.tsx
│   │   │   ├── overview.tsx
│   │   │   └── retry-sidebar.tsx
│   │   ├── create-sidebar.tsx
│   │   ├── endpoint-card.tsx
│   │   ├── header.tsx
│   │   ├── list.tsx
│   │   └── stats.tsx
│   ├── api-key/
│   │   ├── empty-state.tsx
│   │   ├── header.tsx
│   │   ├── key-reveal.tsx
│   │   ├── status-sidebar.tsx
│   │   └── usage-examples.tsx
│   ├── simulator/
│   │   ├── event-constraints.tsx
│   │   ├── header.tsx
│   │   ├── payload-editor.tsx
│   │   └── result-sidebar.tsx
│   ├── pipeline-health.tsx
│   ├── quick-links.tsx
│   ├── recent-deliveries.tsx
│   ├── relay-stream.tsx
│   ├── reliability-card.tsx
│   ├── search-header.tsx
│   ├── sidebar.tsx
│   └── stats-grid.tsx
├── docs/
│   ├── sections/ (11 doc sections)
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

hooks/
└── use-auth.ts          # Auth mutations (register, login)

lib/
└── axios.ts             # Axios instance with API base URL

providers/
└── query-provider.tsx   # TanStack Query provider

store/
└── use-auth-store.ts    # Zustand auth state (token, userId)

public/svgs/
├── conduit-logo.svg
├── github.svg, stripe.svg, paystack.svg
├── slack.svg, shopify.svg, custom.svg
```

## Auth Flow

```
Register → POST /api/auth/register → Redirect to /login
Login → POST /api/auth/login → JWT + userId stored in Zustand (persisted)
Dashboard → Protected routes, redirect to /login if no token
Logout → Clear Zustand store → Redirect to /login
```

## Setup

```bash
git clone https://github.com/Verifieddanny/conduit.git
cd conduit
bun install
bun dev
```

Requires the [Conduit backend](https://github.com/Verifieddanny/conduit-engine) running on `http://localhost:8080`.

## Related

- **Backend:** [conduit-engine](https://github.com/Verifieddanny/conduit-engine)

## Author

**Danny (DevDanny)** — [@dannyclassi_c](https://x.com/dannyclassi_c)

## License

MIT

Previous projects: [URL Shortener](https://github.com/Verifieddanny/url-shortener) | [NexusChat](https://github.com/Verifieddanny/nexus-chat) | [Shipyard](https://github.com/Verifieddanny/ship-yard)