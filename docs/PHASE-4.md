# Phase 4 — Staff operations and access control

Phase 4 adds the authenticated `/staff` workspace and `/api/v1/staff` API without changing the public registration routes.

## Roles

- **Super Admin:** all events, participant and registration views, daily/talkshow check-in, user role management, Panitia assignments, and audit logs.
- **Panitia:** participant and operational access only for events with an active Panitia assignment.
- **Vendor:** event list and aggregate statistics only. Vendor responses never contain participant rows, names, contact fields, addresses, searches, or participant identifiers.

The access-control seeder maintains the fixed system permissions. Super Admin-only routes require both the `super_admin` role and the applicable permission. Event operations additionally use `EventPolicy::viewOperations`; statistics use `EventPolicy::viewStatistics`.

## Authentication

`POST /api/v1/staff/auth/login` returns a 256-bit opaque bearer token. The database stores only its SHA-256 hash. Tokens expire after eight hours by default, are capped per user, and are revoked on logout or account deactivation. Login is throttled and successful/failed login events are audited without logging credentials or raw tokens.

Bootstrap the first administrator interactively after seeding:

```bash
php artisan staff:create-super-admin --name="Operations Admin" --email="admin@example.com"
```

## API

- `POST /api/v1/staff/auth/login`
- `GET /api/v1/staff/auth/me`
- `POST /api/v1/staff/auth/logout`
- `GET /api/v1/staff/events`
- `GET /api/v1/staff/events/{event}/statistics`
- `GET /api/v1/staff/events/{event}/participants` (paginated, Super Admin/assigned Panitia only)
- `POST /api/v1/staff/events/{event}/event-days/{eventDay}/check-ins`
- `POST /api/v1/staff/events/{event}/talkshows/{talkshow}/attendances`
- `GET|POST /api/v1/staff/users` and `PATCH /api/v1/staff/users/{user}` (Super Admin)
- `GET /api/v1/staff/roles` (Super Admin)
- `GET|POST /api/v1/staff/events/{event}/assignments` (Super Admin)
- `DELETE /api/v1/staff/events/{event}/assignments/{assignment}` (Super Admin)
- `GET /api/v1/staff/audit-logs` (Super Admin, paginated)

## Check-in concurrency

Daily check-in and talkshow attendance run inside retryable database transactions and use atomic `insertOrIgnore` operations. Database unique constraints on `(registration_id, event_day_id)` and `(registration_id, talkshow_id)` are the final invariant. A losing concurrent request reads and returns the already-created record with an idempotent result instead of creating a duplicate.

Ticket scans accept the canonical e-ticket URL or its 64-character token. Route nesting and ticket event ownership are validated before writes. Scan logs store a token hash only for successfully parsed tokens and never store the raw QR payload.

## Statistics and PII

Statistics are produced by SQL counts, distinct counts, and relationship count subqueries. Participant models are not loaded for statistics. Participant lists have a maximum page size of 100 and eager-load their bounded related data.

WhatsApp provider work remains outside Phase 4 and was not changed.
