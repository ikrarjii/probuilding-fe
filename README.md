# ProBuild INTIM 2026

Event website and registration system for ProBuild INTIM 2026. The existing React landing page remains the visual source of truth; participant registration, persistent QR identity, web e-ticket, and downloadable PDF are implemented without redesigning the landing page.

## Applications

- `src/` — React 18 + Vite 5 public website and participant registration UI.
- `server/` — Laravel 12 JSON API, database schema, registration domain services, and tests.

## Phase 1 capabilities

- Required full name, WhatsApp, and email registration fields, with optional organization, job title, city, and address.
- Event-scoped WhatsApp uniqueness and shared email support.
- One registration number and one protected QR identity per event registration.
- Multiple talkshow selections with capacity, registration windows, and optional waitlists.
- Partial fulfillment: the event registration succeeds even when an individual talkshow is full or closed.
- Manual, audited waitlist promotion domain service.
- Four event days under one registration, with a unique daily check-in constraint.
- Talkshow attendance kept separate from daily event check-in, including an audited Super Admin override.
- Participant notification delivery is intentionally deferred to Phase 3.
- RBAC/event-assignment schema. Login and dashboards are intentionally deferred to Phase 4.

No public QR recovery endpoint is present, and the registration API never returns the QR token.

## Phase 2 capabilities

- One persistent 256-bit opaque token per registration, stored as a unique hash plus an encrypted recoverable copy.
- One canonical public URL, `/ticket/{token}`, used as both the e-ticket URL and the QR payload.
- High-contrast SVG QR generation with adequate quiet space and no participant PII in the URL.
- Responsive ProBuild-styled success and web e-ticket pages.
- Current confirmed and waitlisted talkshow selections read from the database.
- Database-backed overall and per-day check-in status.
- A compact A4 PDF generated on demand with the current database status and the same QR identity.
- Safe invalid-token and rendering error responses without internal stack traces.

See [`docs/PHASE-2.md`](docs/PHASE-2.md) for routes, security details, and manual test steps.

## Phase 3 capabilities

- One WhatsApp confirmation delivery created reliably after registration; email delivery is outside Phase 3 scope.
- A provider-neutral WhatsApp contract and safe local mock provider.
- Concise Indonesian confirmation using the same persistent e-ticket URL and QR identity.
- Deduplicated outbox processing, bounded retry, safe delivery errors, and delivery status tracking.
- Production mock protection so local/test mode cannot transmit real messages.

See [`docs/PHASE-3.md`](docs/PHASE-3.md) for configuration, processing, retry, and provider integration details.

## Local setup

Prerequisites: Node.js 18+, npm, PHP 8.2+, Composer, and the PHP SQLite, DOM, and SimpleXML extensions for local development.

```bash
npm install
copy .env.example .env

cd server
composer install
copy .env.example .env
php artisan key:generate
```

For a quick local environment, change the server database settings to:

```dotenv
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/server/database/database.sqlite
```

Create the SQLite file, then initialize the schema and reference data:

```bash
php artisan migrate --seed
php artisan serve
```

In a second terminal at the repository root:

```bash
npm run dev
```

The Vite server proxies `/api` to `VITE_API_PROXY_TARGET`, which defaults to `http://127.0.0.1:8000`.

The local frontend configuration must keep the Laravel `/api` prefix:

```dotenv
VITE_API_URL=/api
VITE_API_PROXY_TARGET=http://127.0.0.1:8000
VITE_EVENT_SLUG=probuild-intim-2026
```

If the browser calls Laravel directly instead of using the Vite proxy, configure the backend with the exact permitted frontend origins:

```dotenv
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## Verification

```bash
cd server
php artisan test
vendor/bin/pint --test

cd ..
npm run build
```

## Production notes

- Use PostgreSQL as configured in `server/.env.example`.
- Serve the SPA and API behind HTTPS, preferably on the same origin with `/api` routed to Laravel.
- For the current separate API deployment, build the frontend with `VITE_API_URL=https://backend.probuildintim.com/api` and configure Laravel with `CORS_ALLOWED_ORIGINS=https://www.probuildintim.com,https://probuildintim.com`.
- Set `PUBLIC_WEB_URL` to that public HTTPS origin before distributing tickets.
- Set a unique production `APP_KEY`; changing it later will make encrypted QR identities unreadable.
- Treat e-ticket URLs as bearer secrets, exclude them from analytics/referrer logging, and always use HTTPS.
- Run migrations with `php artisan migrate --force` and seed the event/reference roles once with `php artisan db:seed --force`.
- Clear and rebuild Laravel's configuration cache after changing deployment environment variables: `php artisan config:clear` followed by `php artisan config:cache`.
- Run Laravel's scheduler every minute so the notification outbox is processed continuously.
- Keep `APP_DEBUG=false`, protect database/backups, configure trusted proxies correctly, and retain audit logs.
- Session capacities in the seed data are intentionally unset until the organizer supplies authoritative limits.
