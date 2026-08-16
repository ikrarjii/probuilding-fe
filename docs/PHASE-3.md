# Phase 3 — Email and WhatsApp E-Ticket Delivery

## Scope

Phase 3 adds reliable registration-confirmation delivery. It reuses the one secure e-ticket URL, QR identity, and on-demand PDF from Phase 2. It does not add dashboards, public recovery, participant management, QR scanning, check-in actions, attendance actions, or reporting.

## Delivery flow

```text
Registration transaction
  -> registration and talkshow outcomes saved
  -> one email delivery + unique outbox row saved
  -> one WhatsApp delivery + unique outbox row saved
  -> HTTP registration response succeeds

Scheduled outbox processor
  -> claims one available outbox row
  -> builds current confirmation from the registration
  -> uses the existing e-ticket URL
  -> invokes the configured channel provider
  -> marks delivery SENT or FAILED
  -> schedules bounded exponential retry when appropriate
```

No provider call occurs inside the registration request. A provider outage therefore cannot roll back or invalidate a successful registration.

## Data and idempotency

- `ticket_deliveries` stores channel, notification type, provider label, status, cumulative attempts, last/next attempt timestamps, safe error text, provider message ID, and a unique idempotency key.
- A unique `(registration_id, channel, notification_type)` constraint prevents duplicate confirmation deliveries.
- `outbox_messages.deduplication_key` prevents duplicate work items.
- The processor reserves work before sending, recovers stale reservations, and stops automatically after `NOTIFICATION_MAX_ATTEMPTS`.
- A retry reuses the original delivery and idempotency key. A `SENT` delivery cannot be retried by the retry service.
- Provider secrets and complete provider responses are never written to delivery/outbox records.

The idempotency key is passed to every provider adapter. A future HTTP/API adapter must pass it to the provider's native idempotency field when supported. SMTP does not provide universal exactly-once guarantees; see Known limitations.

## Message contents

Both channels use a projection of the saved registration containing:

- participant name;
- event name and location;
- registration number;
- confirmed talkshows;
- waitlisted talkshows and positions;
- the exact existing e-ticket URL;
- short explicit check-in instructions.

Email contains a branded HTML version, a plain-text fallback, a **VIEW E-TICKET** button, and—when enabled—the existing Phase 2 PDF rendered with the same QR identity. WhatsApp uses a concise text message suitable for a later template/API adapter.

## Environment variables

Safe local defaults:

```dotenv
REGISTRATION_EMAIL_DRIVER=mock
REGISTRATION_EMAIL_FROM_ADDRESS=info@probuildintim.com
REGISTRATION_EMAIL_FROM_NAME="ProBuild INTIM"
REGISTRATION_EMAIL_ATTACH_PDF=true
REGISTRATION_EMAIL_MOCK_FAILURE=false

REGISTRATION_WHATSAPP_DRIVER=mock
REGISTRATION_WHATSAPP_MOCK_FAILURE=false

NOTIFICATION_MAX_ATTEMPTS=5
NOTIFICATION_RETRY_BASE_MINUTES=5
NOTIFICATION_CLAIM_TIMEOUT_MINUTES=10
```

The mock drivers never contact an external service. In `production`, the application refuses to use mock drivers and marks the corresponding delivery failed safely.

### Email production configuration

The built-in provider-neutral email adapter uses Laravel Mail. Configure it with:

```dotenv
REGISTRATION_EMAIL_DRIVER=mail
REGISTRATION_EMAIL_FROM_ADDRESS=info@your-domain.example
REGISTRATION_EMAIL_FROM_NAME="ProBuild INTIM"
REGISTRATION_EMAIL_ATTACH_PDF=true

MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_SCHEME=null
```

Use the exact settings supplied by the selected email service. An API-based email provider can later be added as another `EmailProvider` adapter without changing registration or outbox logic.

### WhatsApp production configuration

No production WhatsApp vendor has been selected, so Phase 3 intentionally contains no invented endpoint or credentials. Keep the channel disabled in production until an approved adapter is implemented:

```dotenv
REGISTRATION_WHATSAPP_DRIVER=disabled
```

The future adapter must implement `WhatsAppProvider`, pass the existing message/idempotency key to the selected vendor, use server-side credentials, map provider failures to safe exceptions, and be registered under a new driver name. Existing registration code does not need to change.

After changing environment values:

```powershell
php artisan config:clear
php artisan config:cache
```

Never put these credentials in `VITE_*` variables or React source files.

## Development test

Apply the migration and keep both drivers on `mock`:

```powershell
cd server
php artisan migrate
php artisan config:clear
```

1. Register a new test participant from the React form.
2. Process pending messages:

   ```powershell
   php artisan notifications:process
   ```

3. The command should report `Processed: 2, sent: 2, failed: 0.` No external message is sent.

To inspect recent status locally:

```powershell
php artisan tinker
App\Models\TicketDelivery::latest()->get(['id','channel','provider','status','attempts','last_attempt_at']);
```

### Safe email rendering test

Use Laravel's local log mail transport:

```dotenv
REGISTRATION_EMAIL_DRIVER=mail
MAIL_MAILER=log
REGISTRATION_WHATSAPP_DRIVER=mock
```

Run `php artisan config:clear`, register a new test participant, then run `php artisan notifications:process`. The email is written to the local Laravel log rather than sent externally. Do this only with test participant data because the log contains message content.

### Failure and retry test

To simulate an email outage locally:

```dotenv
REGISTRATION_EMAIL_DRIVER=mock
REGISTRATION_EMAIL_MOCK_FAILURE=true
```

Clear configuration, create a test registration, and run the processor. Email becomes `FAILED`; WhatsApp remains independent. Restore the flag to `false`, clear configuration, obtain the failed delivery UUID, then run:

```powershell
php artisan notifications:retry DELIVERY_UUID
php artisan notifications:process
```

Use `REGISTRATION_WHATSAPP_MOCK_FAILURE=true` for the equivalent WhatsApp test.

## Production processing

Configure the server cron to invoke Laravel's scheduler every minute:

```cron
* * * * * cd /path/to/server && php artisan schedule:run > /dev/null 2>&1
```

The scheduler runs `notifications:process --limit=100` with overlap protection. Monitor failed delivery counts and scheduler health. Do not expose the processor or retry command as a public endpoint.

## Automated verification

```powershell
cd server
php artisan test
vendor\bin\pint --test

cd ..
npm run build
```

Tests cover delivery creation, independent channel failure, registration durability, `SENT`/`FAILED` transitions, safe retry, duplicate prevention, shared e-ticket URL, persistent QR identity, confirmed/waitlisted content, invalid contacts, mock safety, the Laravel Mail adapter/PDF, and frontend credential exclusion.

## Known limitations

- A production WhatsApp adapter cannot be completed until the provider, approved template, endpoint, and credential format are selected.
- The current system records provider acceptance as `SENT`; delivery/read webhooks are not implemented. `delivered_at` remains available for a future webhook phase.
- SMTP has an unavoidable crash window after a remote server accepts a message but before the local database records `SENT`. API providers with native idempotency keys are preferable when strict duplicate suppression is required.
- Manual resend UI and authenticated resend audit are deferred to the admin/panitia dashboard phase. The server-side retry service and CLI command are ready for that integration.
- Existing registrations are not automatically enqueued during migration, preventing accidental bulk messages on deployment. Phase 3 notifications are created for new registrations.
