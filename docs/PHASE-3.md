# Phase 3 — WhatsApp E-Ticket Delivery

## Scope

Phase 3 sends one WhatsApp registration confirmation that reuses the persistent secure e-ticket URL and QR identity from Phase 2. It does not add email delivery, authentication, dashboards, QR scanning, check-in actions, attendance actions, or reporting.

## Delivery flow

```text
Registration transaction
  -> registration and talkshow outcomes saved
  -> one WhatsApp delivery and one unique outbox row saved
  -> HTTP registration response succeeds

Outbox processor
  -> claims one available outbox row
  -> builds the message from the saved registration
  -> reuses the existing secure e-ticket URL
  -> invokes the configured WhatsApp provider
  -> records SENT or FAILED and schedules a bounded retry
```

No provider call occurs inside the registration transaction. A WhatsApp outage therefore cannot roll back or invalidate a successful registration.

## Architecture and stored data

- `WhatsAppProvider` is the provider-neutral contract used by the delivery service.
- `MockWhatsAppProvider` writes a safe test message to `storage/logs/whatsapp-mock.log` and never contacts WhatsApp.
- `NullWhatsAppProvider` fails safely when no supported provider is configured. Production also refuses to use the mock provider.
- `ticket_deliveries` stores registration ID, normalized WhatsApp recipient reference, notification type, provider label, `PENDING`/`SENT`/`FAILED` status, attempt count, last attempt, next retry, safe error text, provider message ID, and timestamps.
- `outbox_messages` separates registration from external delivery and prevents duplicate work.
- Unique delivery and idempotency keys prevent repeated registration requests from creating unlimited messages.
- Retry reuses the same delivery, ticket URL, QR identity, and idempotency key.

Provider secrets and complete provider responses are not stored in delivery or outbox records. The public e-ticket URL contains only the secure opaque Phase 2 token, not the participant name, WhatsApp number, email, or a sequential database ID.

## WhatsApp message

The Indonesian message contains the participant name, event name, registration number, brief check-in instructions, and the exact existing e-ticket URL. The URL opens the database-backed e-ticket containing the current participant, event, talkshow, QR, and check-in information.

## Environment variables

Use these safe values locally:

```dotenv
PUBLIC_WEB_URL=http://localhost:5173

REGISTRATION_WHATSAPP_DRIVER=mock
REGISTRATION_WHATSAPP_MOCK_FAILURE=false
REGISTRATION_WHATSAPP_MOCK_LOG_CHANNEL=whatsapp_mock

NOTIFICATION_MAX_ATTEMPTS=5
NOTIFICATION_RETRY_BASE_MINUTES=5
NOTIFICATION_CLAIM_TIMEOUT_MINUTES=10
```

The following placeholders are reserved for a future production adapter and must stay server-side:

```dotenv
REGISTRATION_WHATSAPP_BASE_URL=
REGISTRATION_WHATSAPP_ACCESS_TOKEN=
REGISTRATION_WHATSAPP_PHONE_NUMBER_ID=
REGISTRATION_WHATSAPP_TEMPLATE_NAME=
```

Never use `VITE_*` for provider credentials. After changing server environment values, run:

```powershell
php artisan config:clear
```

## Local mock test

From the repository root, start the PHP API in terminal 1:

```powershell
cd server
php artisan migrate
php artisan config:clear
php artisan serve
```

Start React in terminal 2:

```powershell
npm run dev
```

Then:

1. Open `http://localhost:5173` and click the unchanged **Registrasi Visitor** button.
2. Submit a new test participant using a valid, unused WhatsApp number.
3. In a third terminal, process the pending message:

   ```powershell
   cd server
   php artisan notifications:process
   ```

4. Expect `Processed: 1, sent: 1, failed: 0.`
5. Read the mock output:

   ```powershell
   Get-Content .\storage\logs\whatsapp-mock.log -Tail 100
   ```

6. Confirm the log contains the normalized recipient, participant name, registration number, message body, e-ticket URL, and a successful command result.
7. Copy the e-ticket URL into the browser. Confirm the correct e-ticket and QR Code appear with initial status `NOT CHECKED IN`.
8. Refresh the page and confirm the URL and QR remain unchanged.

Use test participant data: the mock log contains the message recipient and content.

### Smartphone QR test

`localhost` on a computer is not reachable as `localhost` from a phone. Put both devices on the same network, run Vite and Laravel on a LAN-accessible host, and set `PUBLIC_WEB_URL` to that accessible frontend URL before registering. Alternatively, test after HTTPS deployment. Scan the displayed QR with the normal phone camera and confirm it opens the same e-ticket URL. Safari/iPhone generally requires an HTTPS or otherwise reachable URL.

## Failure and retry test

Set this server value:

```dotenv
REGISTRATION_WHATSAPP_MOCK_FAILURE=true
```

Run `php artisan config:clear`, create a new registration, and process notifications. Expect `sent: 0, failed: 1`. The registration and e-ticket must still open.

Restore the flag to `false`, clear configuration again, and find the failed delivery UUID:

```powershell
php artisan tinker
App\Models\TicketDelivery::where('status', 'failed')->latest()->first(['id','status','attempts','last_error']);
```

Exit Tinker, then retry the displayed UUID:

```powershell
php artisan notifications:retry DELIVERY_UUID
php artisan notifications:process
```

The same record becomes `SENT`, its attempt count increases, and its existing e-ticket URL and idempotency key remain unchanged.

## Automated verification

```powershell
cd server
php artisan test --filter=WhatsAppDeliveryTest
php artisan test
vendor\bin\pint --test

cd ..
npm run build
```

The feature tests cover message creation and contents, normalized recipient, URL resolution, persistent ticket/QR identity, PII-free QR payload, provider failure, registration durability, retry, idempotency, duplicate registration protection, credential exclusion, and actual mock-log output.

## Production configuration

No real WhatsApp vendor has been selected, so no real provider adapter or credentials have been invented. Keep production disabled:

```dotenv
REGISTRATION_WHATSAPP_DRIVER=disabled
```

After a vendor is selected, add an adapter implementing `WhatsAppProvider`, register its driver in `AppServiceProvider`, and map its credentials from server-only environment variables. The adapter should pass the existing idempotency key to a native provider idempotency field when available.

Run Laravel's scheduler every minute in production so pending outbox messages are processed:

```cron
* * * * * cd /path/to/server && php artisan schedule:run > /dev/null 2>&1
```

## Known limitations

- Mock mode proves message composition and delivery state only; it does not send a real WhatsApp message.
- A production adapter cannot be completed until the provider, approved message/template, endpoint, and credential format are selected.
- `SENT` currently means the provider adapter accepted the request. Delivery/read webhooks are not implemented.
- Manual resend UI and its staff audit trail are deferred to the authenticated admin/panitia phase. The protected server-side retry service and CLI command are ready for later integration.
- Existing registrations are not bulk-enqueued by the migration, preventing accidental messages during deployment. New registrations receive the Phase 3 delivery record.
