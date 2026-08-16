# Phase 2 — QR Code and E-Ticket

## Scope

Phase 2 adds one persistent QR/e-ticket identity, a public live e-ticket, and a downloadable PDF. It does not add email/WhatsApp delivery, dashboards, authentication, staff scanning, check-in actions, attendance actions, or reporting.

## Identity and security model

- Every registration receives one cryptographically secure 32-byte random token (256 bits).
- The token is the single identity used by both the e-ticket URL and QR Code. The QR payload is the full URL `PUBLIC_WEB_URL/ticket/{token}`.
- The URL contains no participant name, email, WhatsApp number, address, registration number, or database ID.
- The database stores a unique SHA-256 token hash for lookup and an application-encrypted copy so the same URL and QR can be rendered again. Existing Phase 2 rows are migrated to one canonical identity.
- The backend hashes the supplied token before lookup. Malformed and unknown values receive the same safe 404 response.
- Idempotent retries return the original registration, token, URL, and QR identity. A duplicate WhatsApp registration does not create another ticket.
- Public ticket responses use `private, no-store`, `no-referrer`, and `noindex` headers and omit email, WhatsApp, address, organization, job title, and internal IDs.
- Production must use HTTPS. Reverse-proxy and access-log rules should redact the token segment of `/ticket/` and `/api/v1/public/e-tickets/` URLs.
- `APP_KEY` protects the encrypted token copy. Store and back it up securely; changing or losing it prevents existing QR Codes from being recreated.

The public URL is a bearer secret: anyone who receives the complete URL can see the minimum e-ticket information. It must only be delivered through trusted channels in a later phase.

## Routes

Frontend:

- `/registrasi/sukses/{ticketToken}` — registration-success experience.
- `/ticket/{ticketToken}` — canonical public e-ticket URL encoded in the QR Code.
- `/e-ticket/{ticketToken}` — backward-compatible web alias.

API:

- `GET /api/v1/public/e-tickets/{ticketToken}` — validates the token and returns the current e-ticket projection plus SVG QR.
- `GET /api/v1/public/e-tickets/{ticketToken}/pdf` — validates the token and generates the current A4 PDF.

There is no public participant search, QR recovery, scanner, or check-in endpoint.

## Configuration

Set the origin from which participants can open the React website:

```dotenv
PUBLIC_WEB_URL=http://localhost:5173
```

Production must use the deployed HTTPS origin, for example:

```dotenv
PUBLIC_WEB_URL=https://event.example.com
```

After changing it, run `php artisan config:clear`. Changing this value changes the URL encoded when a QR is rendered, so it must be finalized before tickets are distributed. The secure token itself remains unchanged.

## Run after updating

```powershell
cd server
composer install
php artisan migrate
php artisan config:clear
php artisan serve
```

In a second VS Code terminal:

```powershell
cd D:\PROJECT\event-exhibition\probuild-intim
npm install
npm run dev
```

## Manual smartphone scan

`localhost` on a phone means the phone itself, not the development computer. For the most reliable test, use the deployed HTTPS domain. For a same-Wi-Fi development test:

1. Find the computer's IPv4 address with `ipconfig`, for example `192.168.1.10`.
2. Set `PUBLIC_WEB_URL=http://192.168.1.10:5173` in `server/.env` and run `php artisan config:clear`.
3. Run Laravel normally in the first VS Code terminal.
4. Run `npm run dev -- --host 0.0.0.0` in the second terminal. Allow port 5173 through Windows Firewall if prompted.
5. On the phone connected to the same Wi-Fi, first open `http://192.168.1.10:5173` to confirm connectivity.
6. Register with a new WhatsApp number. Open the success e-ticket and scan its QR using the phone's normal camera.
7. Confirm the browser opens `/ticket/{64-character-token}` and displays the same participant and registration number.
8. Scan the QR from both the screen and the downloaded PDF/print. Confirm the QR is unobstructed, high contrast, and readable at normal ticket size.
9. Refresh the ticket and download it again. Confirm the URL and QR are unchanged.
10. Alter one character in the token. Confirm the safe “E-ticket tidak ditemukan” state is shown.

Do not upload a real participant QR Code to a public online QR decoder because its URL is a bearer secret.

## Automated verification

```powershell
cd server
php artisan test
vendor\bin\pint --test

cd ..
npm run build
```

Tests cover URL-shaped QR payloads, token presence, PII exclusion, unique and persistent identity, correct ticket resolution, safe invalid tokens, idempotent retries, duplicate registrations, current database-backed daily check-in status, waitlists, PDF output, migration compatibility, and repeat rendering.

## Known limitations

- The PDF is a snapshot generated at download time. The database/web ticket remains the live source of truth.
- Token rotation and recovery are intentionally unavailable publicly. Authenticated admin/panitia recovery belongs to the dashboard phase.
- Actual staff scanning, explicit check-in, and attendance actions are not included in Phase 2.
- MVP check-in will require an active internet connection.
