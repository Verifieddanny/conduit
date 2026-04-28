# Conduit

The dashboard and developer portal for [Conduit Engine](https://github.com/Verifieddanny/conduit-engine) — a source-agnostic webhook relay service that receives, stores, and reliably delivers webhook events with retry logic, payload signing, and full delivery observability.

## What This Is

Conduit's frontend gives developers two things: a public-facing developer portal with full API documentation, and a private dashboard to manage endpoints, monitor deliveries, generate API keys, and simulate webhook events — all connected to the live backend via JWT-authenticated API calls.

## Pages

### Public

**Landing** (`/`) — Product overview with animated pipeline hero, three-step integration walkthrough, supported webhook sources (GitHub, Stripe, Paystack, Slack, Shopify), feature grid, architecture diagram, and tech stack breakdown.

**Documentation** (`/docs`) — 11-section developer guide covering getting started, authentication, API reference, webhook source setup for each provider, delivery and reliability mechanics, security with signature verification code samples (Node.js, Python, Go), and architecture overview.

**Register** (`/register`) — Account creation with username, email, and password.

**Login** (`/login`) — Sign in with username and password. JWT and user metadata stored in Zustand with persistence.

### Dashboard (Protected)

**Overview** (`/dashboard`) — Stats grid (total endpoints, total deliveries, success rate), pipeline health visualization, recent deliveries feed with endpoint association, reliability metrics, and quick action links to endpoints, simulator, and API key pages.

**Endpoints** (`/dashboard/endpoints`) — List all registered endpoints with status indicators (active/inactive), delivery stats per endpoint (delivered/failed/dead counts), create new endpoints via slide-over panel with URL, event subscriptions, external source, and optional secret. Edit endpoints inline via modal (update URL, events, status, secret). Delete with ownership verification.

**Endpoint Detail** (`/dashboard/endpoints/:id`) — Single endpoint overview with live delivery counts, callback attempts list with status badges and timestamps, delivery lifecycle sidebar showing the journey from pending to delivered/failed/dead, retry information sidebar with attempt count, next retry time, and backoff schedule. Manual replay button for failed and dead deliveries.

**Deliveries** (`/dashboard/deliveries`) — Aggregated delivery log across all endpoints. Filterable delivery history with status indicators.

**API Key** (`/dashboard/api-key`) — Generate an API key via the backend. Secure one-time reveal with copy-to-clipboard. Usage examples showing cURL, JavaScript, and Python integration snippets. Status sidebar showing whether a key has been generated.

**Simulator** (`/dashboard/simulator`) — Select an endpoint from a dropdown of your registered endpoints, compose a custom event type, edit the JSON payload in a code editor, fire the test webhook, and see the delivery result in real time — callback ID, status, and response code. Direct link to delivery logs from the simulation result.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (auth store with persistence)
- **Data Fetching:** TanStack React Query + Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React

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
│       ├── deliveries/page.tsx
│       ├── api-key/page.tsx
│       ├── simulator/page.tsx
│       ├── layout.tsx
│       └── page.tsx
├── layout.tsx
├── globals.css
└── favicon.ico

components/
├── auth/
│   ├── login-form.tsx           # Login form with validation
│   ├── register-form.tsx        # Registration form with validation
│   ├── marketing-feature.tsx    # Auth page marketing sidebar
│   └── monitor-snapshot.tsx     # Auth page preview graphic
├── dashboard/
│   ├── endpoints/
│   │   ├── detail/
│   │   │   ├── callback-attempts.tsx   # Delivery attempt list
│   │   │   ├── callback-row.tsx        # Individual attempt with status badge
│   │   │   ├── lifecycle-sidebar.tsx   # Delivery journey visualization
│   │   │   ├── overview.tsx            # Endpoint stats summary
│   │   │   └── retry-sidebar.tsx       # Retry schedule and next attempt
│   │   ├── create-sidebar.tsx   # New endpoint slide-over form
│   │   ├── detail-header.tsx    # Endpoint detail page header
│   │   ├── edit-modal.tsx       # Edit endpoint modal (URL, events, status, secret)
│   │   ├── endpoint-card.tsx    # Endpoint list card with delivery counts
│   │   ├── header.tsx           # Endpoints page header
│   │   ├── list.tsx             # Endpoint list container
│   │   └── stats.tsx            # Endpoint-level statistics
│   ├── api-key/
│   │   ├── empty-state.tsx      # No key generated state
│   │   ├── header.tsx           # API key page header
│   │   ├── key-reveal.tsx       # One-time key display with copy
│   │   ├── status-sidebar.tsx   # Key generation status
│   │   └── usage-examples.tsx   # cURL, JS, Python code snippets
│   ├── simulator/
│   │   ├── event-constraints.tsx  # Event type selector
│   │   ├── header.tsx             # Simulator page header
│   │   ├── payload-editor.tsx     # JSON payload code editor
│   │   └── result-sidebar.tsx     # Simulation result display
│   ├── pipeline-health.tsx      # Visual pipeline status
│   ├── quick-links.tsx          # Dashboard action shortcuts
│   ├── recent-deliveries.tsx    # Latest deliveries feed
│   ├── relay-stream.tsx         # Live relay activity
│   ├── reliability-card.tsx     # Delivery success metrics
│   ├── search-header.tsx        # Dashboard search bar
│   ├── sidebar.tsx              # Dashboard navigation sidebar
│   └── stats-grid.tsx           # Overview statistics grid
├── docs/
│   ├── sections/                # 11 documentation sections
│   │   ├── getting-started.tsx
│   │   ├── quickstart.tsx
│   │   ├── auth.tsx
│   │   ├── api-key.tsx
│   │   ├── create-endpoint.tsx
│   │   ├── sources.tsx
│   │   ├── receive-webhook.tsx
│   │   ├── delivery.tsx
│   │   ├── security.tsx
│   │   ├── api-reference.tsx
│   │   └── architecture.tsx
│   ├── code-block.tsx           # Syntax-highlighted code display
│   ├── copy-button.tsx          # Copy to clipboard button
│   ├── header.tsx               # Docs page header
│   ├── mobile-sidebar.tsx       # Responsive docs navigation
│   ├── navbar.tsx               # Docs top navigation
│   ├── section.tsx              # Doc section wrapper
│   └── sidebar.tsx              # Docs sidebar navigation
├── landing/
│   ├── hero.tsx                 # Animated pipeline hero
│   ├── feature.tsx              # Feature grid
│   ├── how-it-works.tsx         # Three-step integration guide
│   └── resillence.tsx           # Reliability features section
├── navbar.tsx                   # Global navigation bar
└── footer.tsx                   # Global footer

hooks/
├── use-auth.ts              # Auth mutations (register, login, API key generation)
├── use-deliveries.ts        # Delivery logs per endpoint, stats, recent, manual replay
├── use-endpoints.ts         # Endpoint CRUD, single endpoint fetch by ID
└── use-simulator.ts         # Fire test webhooks, result handling

lib/
└── axios.ts                 # Axios instance with base URL and JWT interceptor

providers/
└── query-provider.tsx       # TanStack React Query provider

store/
└── use-auth-store.ts        # Zustand auth state (token, userId, email, username, hasApiKey)

public/svgs/
├── conduit-logo.svg
├── github.svg
├── stripe.svg
├── paystack.svg
├── slack.svg
├── shopify.svg
└── custom.svg
```

## Auth Flow

```
Register → POST /api/auth/register → Redirect to /login
Login → POST /api/auth/login → JWT + userId + email + username + hasApiKey stored in Zustand
API Key → PUT /api/auth/api-key → Key shown once, copy to clipboard, hasApiKey updated
Dashboard → Protected routes, redirect to /login if no token
Logout → Clear Zustand store → Redirect to /login
```

## API Integration

All dashboard API calls route through `/api/dashboard/*` with JWT authentication. Auth routes use `/api/auth/*` (no dashboard prefix). The Axios instance (`lib/axios.ts`) attaches the JWT from Zustand's persisted store to every request via a request interceptor. Base URL defaults to `http://localhost:8080/api` and is configurable via `NEXT_PUBLIC_API_URL`.

### `use-auth.ts`

| Action | Method | Endpoint | Details |
|--------|--------|----------|---------|
| Register | POST | `/auth/register` | Redirects to `/login` on success |
| Login | POST | `/auth/login` | Returns `auth_token`, `userId`, `email`, `username`, `has_api_key`. All stored in Zustand |
| Generate API key | PUT | `/auth/api-key` | Returns `api_key` (shown once). Updates `hasApiKey` in store |

Exposes `getErrorMessage()` helper that extracts error messages from Axios error responses.

### `use-endpoints.ts`

| Action | Method | Endpoint | Details |
|--------|--------|----------|---------|
| List all | GET | `/dashboard/endpoints` | Returns endpoints with `deliveredCount`, `failedCount`, `deadCount` per endpoint |
| Get by ID | GET | `/dashboard/endpoints/:id` | Flattens nested `stats` object into top-level counts. Query key: `['endpoint', id]` |
| Create | POST | `/dashboard/endpoints` | Invalidates `['endpoints']` on success |
| Update | PUT | `/dashboard/endpoints/:id` | Accepts URL, events, status, secret. Invalidates both list and detail queries |
| Delete | DELETE | `/dashboard/endpoints/:id` | Invalidates `['endpoints']` on success |

`useEndpoint(id)` is exposed as a standalone query hook for the detail page, enabled only when `id` is truthy.

### `use-deliveries.ts`

| Action | Method | Endpoint | Details |
|--------|--------|----------|---------|
| Per-endpoint logs | GET | `/dashboard/deliveries/:endpointId` | Returns `Callback[]`. Query key: `['deliveries', endpointId]` |
| Global stats | GET | `/dashboard/deliveries/stats` | Returns `totalEndpoints`, `totalDeliveries`, `delivered`, `failed`, `dead` |
| Recent deliveries | GET | `/dashboard/deliveries/recent` | Last 10 deliveries across all endpoints, with associated endpoint info |
| Replay | POST | `/dashboard/deliveries/:callbackId/replay` | Invalidates deliveries, recent, and stats queries on success |

Exported as three separate hooks: `useDeliveries(endpointId)`, `useGlobalStats()`, and `useRecentDeliveries()`.

### `use-simulator.ts`

| Action | Method | Endpoint | Details |
|--------|--------|----------|---------|
| Fire test webhook | POST | `/dashboard/simulator/:endpointId` | Sends full payload body. Returns `callbackId`, `status`, and `response` (code + body) |

### Zustand Store (`use-auth-store.ts`)

Persisted to `localStorage` under key `conduit-auth`.

| Field | Type | Description |
|-------|------|-------------|
| `token` | `string \| null` | JWT auth token |
| `apiKey` | `string \| null` | Generated API key (transient, shown once) |
| `hasApiKey` | `boolean` | Whether user has generated an API key |
| `userId` | `string \| null` | User UUID |
| `username` | `string` | Display username |
| `email` | `string` | User email |

Actions: `setAuth()`, `setApiKey()`, `logout()` (clears all fields).

## Setup

```bash
git clone https://github.com/Verifieddanny/conduit.git
cd conduit
bun install
bun dev
```

Requires the [Conduit backend](https://github.com/Verifieddanny/conduit-engine) running on `http://localhost:8080`.

## Related

- **Backend:** [conduit-engine](https://github.com/Verifieddanny/conduit-engine) — Express 5, PostgreSQL, Redis, BullMQ, HMAC-SHA256 signing, exponential backoff retry

## Author

**Danny (DevDanny)** — [@dannyclassi_c](https://x.com/dannyclassi_c)

## License

MIT

Previous projects: [URL Shortener](https://github.com/Verifieddanny/url-shortener) | [NexusChat](https://github.com/Verifieddanny/nexus-chat) | [Shipyard](https://github.com/Verifieddanny/ship-yard)