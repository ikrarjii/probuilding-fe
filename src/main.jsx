import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import * as Sentry from '@sentry/react';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const ticketTokenPattern = /(\/(?:ticket|e-tickets?|registrasi\/sukses)\/)[a-f0-9]{64}/gi;

function redactTicketToken(value) {
  return typeof value === 'string' ? value.replace(ticketTokenPattern, '$1[REDACTED]') : value;
}

function scrubMonitoringEvent(event) {
  if (event.request?.url) event.request.url = redactTicketToken(event.request.url);
  if (event.transaction) event.transaction = redactTicketToken(event.transaction);

  if (event.breadcrumbs) {
    event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => ({
      ...breadcrumb,
      data: breadcrumb.data
        ? {
            ...breadcrumb.data,
            url: redactTicketToken(breadcrumb.data.url),
            from: redactTicketToken(breadcrumb.data.from),
            to: redactTicketToken(breadcrumb.data.to),
          }
        : breadcrumb.data,
    }));
  }

  return event;
}

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || 0.1),
    sendDefaultPii: false,
    beforeSend: scrubMonitoringEvent,
    beforeSendTransaction: scrubMonitoringEvent,
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2>Oops! Telah terjadi kesalahan sistem.</h2>
          <p>Tim engineer kami telah mendapatkan notifikasi terkait error ini secara real-time.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.6rem 1.2rem',
              marginTop: '1rem',
              cursor: 'pointer',
              background: '#e8303a',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Muat Ulang Halaman
          </button>
        </div>
      }
    >
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
