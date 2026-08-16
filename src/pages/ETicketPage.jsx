import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getETicket, getETicketPdfUrl } from '../api/client';
import { useLanguage } from '../context/LanguageContext';
import { eTicketContent } from '../features/registration/registrationContent';
import styles from './ETicketPage.module.scss';

function formatDateRange(event, lang) {
  const locale = lang === 'id' ? 'id-ID' : 'en-GB';
  const start = new Date(`${event.starts_on}T00:00:00+08:00`);
  const end = new Date(`${event.ends_on}T00:00:00+08:00`);
  const startLabel = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
  }).format(start);
  const endLabel = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(end);

  return `${startLabel} – ${endLabel}`;
}

function formatSession(startsAt, lang) {
  const locale = lang === 'id' ? 'id-ID' : 'en-GB';
  const date = new Date(startsAt);

  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Makassar',
  }).format(date);
}

function SessionList({ items, status, labels, lang }) {
  if (!items.length) return null;

  return (
    <div className={styles.sessionGroup}>
      <h3>{labels[status]}</h3>
      <ul>
        {items.map((talkshow) => (
          <li key={`${talkshow.code}-${status}`}>
            <span className={`${styles.sessionIcon} ${styles[`sessionIcon_${status}`]}`}>
              {status === 'confirmed' ? '✓' : '○'}
            </span>
            <div>
              <strong>{talkshow.title}</strong>
              <small>
                {formatSession(talkshow.starts_at, lang)} WITA
                {talkshow.room ? ` · ${talkshow.room}` : ''}
              </small>
              {status === 'waitlisted' && (
                <em>{labels.waitlistPosition.replace('{position}', talkshow.waitlist_position)}</em>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ETicketPage({ success = false }) {
  const { ticketToken } = useParams();
  const { lang } = useLanguage();
  const t = eTicketContent[lang];
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTicket = useCallback(
    async (signal) => {
      if (!ticketToken) return;

      setLoading(true);
      setError(null);

      try {
        setTicket(await getETicket(ticketToken, signal));
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError({
            message: requestError.message || t.errorMessage,
            status: requestError.status,
          });
        }
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [t.errorMessage, ticketToken]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    loadTicket(controller.signal);
    return () => controller.abort();
  }, [loadTicket]);

  if (!ticketToken) {
    return <Navigate to='/registrasi' replace />;
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={`container ${styles.stateContainer}`}>
          <div className={styles.loader} aria-label={t.loading} />
          <p>{t.loading}</p>
        </div>
      </main>
    );
  }

  if (error || !ticket) {
    return (
      <main className={styles.page}>
        <div className={`container ${styles.stateContainer}`}>
          <div className={styles.errorMark}>!</div>
          <h1>{error?.status === 404 ? t.errorTitle : t.unavailableTitle}</h1>
          <p>{error?.message || t.errorMessage}</p>
          <button type='button' onClick={() => loadTicket()}>
            {t.retry}
          </button>
          <Link to='/registrasi'>{t.backToRegistration}</Link>
        </div>
      </main>
    );
  }

  const overallStatus = ticket.check_in.overall_status;
  const hasTalkshows =
    ticket.talkshows.confirmed.length > 0 || ticket.talkshows.waitlisted.length > 0;

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={`container ${styles.container}`}>
          {success && (
            <div className={styles.successMark} aria-hidden='true'>
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                <path d='m5 12 4 4L19 6' />
              </svg>
            </div>
          )}
          <span className='section__label'>{success ? t.successEyebrow : t.ticketEyebrow}</span>
          <h1>{success ? t.successTitle : t.ticketTitle}</h1>
          <p className={styles.subtitle}>
            {success
              ? t.successSubtitle.replace('{name}', ticket.participant.full_name)
              : t.ticketSubtitle}
          </p>

          <article className={styles.ticketCard}>
            <header className={styles.ticketHeader}>
              <div>
                <span>PROBUILD INTIM 2026</span>
                <strong>{t.ticketLabel}</strong>
              </div>
              <i aria-hidden='true' />
            </header>

            <div className={styles.ticketBody}>
              <div className={styles.ticketInformation}>
                <div className={styles.registrationNumber}>
                  <span>{t.registrationNumber}</span>
                  <strong>{ticket.registration_number}</strong>
                </div>

                <dl className={styles.details}>
                  <div>
                    <dt>{t.participant}</dt>
                    <dd>{ticket.participant.full_name}</dd>
                  </div>
                  <div>
                    <dt>{t.currentStatus}</dt>
                    <dd>
                      <span className={`${styles.status} ${styles[`status_${overallStatus}`]}`}>
                        {t.statuses[overallStatus]}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt>{t.eventDate}</dt>
                    <dd>{formatDateRange(ticket.event, lang)}</dd>
                  </div>
                  <div>
                    <dt>{t.location}</dt>
                    <dd>
                      {ticket.event.venue}
                      {ticket.event.address && <small>{ticket.event.address}</small>}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className={styles.qrPanel}>
                <div className={styles.qrFrame}>
                  <img src={ticket.qr_code.data_uri} alt={t.qrAlt} width='360' height='360' />
                </div>
                <strong>{t.presentQr}</strong>
                <p>{t.qrInstruction}</p>
              </div>
            </div>

            <section className={styles.ticketSection}>
              <h2>{t.selectedTalkshows}</h2>
              {!hasTalkshows && <p className={styles.emptyState}>{t.noTalkshows}</p>}
              <div className={styles.sessionColumns}>
                <SessionList
                  items={ticket.talkshows.confirmed}
                  status='confirmed'
                  labels={t}
                  lang={lang}
                />
                <SessionList
                  items={ticket.talkshows.waitlisted}
                  status='waitlisted'
                  labels={t}
                  lang={lang}
                />
              </div>
            </section>

            <section className={styles.ticketSection}>
              <h2>{t.dailyAttendance}</h2>
              <div className={styles.dayGrid}>
                {ticket.check_in.event_days.map((day) => (
                  <div key={day.date} className={styles.dayCard}>
                    <span>{day.label}</span>
                    <strong>
                      {new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', {
                        day: 'numeric',
                        month: 'short',
                      }).format(new Date(`${day.date}T00:00:00+08:00`))}
                    </strong>
                    <em className={styles[`dayStatus_${day.status}`]}>{t.statuses[day.status]}</em>
                  </div>
                ))}
              </div>
            </section>

            <footer className={styles.ticketFooter}>{t.databaseNote}</footer>
          </article>

          <div className={styles.actions}>
            <a
              href={getETicketPdfUrl(ticketToken)}
              className={styles.downloadButton}
              download={`e-ticket-${ticket.registration_number}.pdf`}
              rel='noreferrer'
            >
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2'>
                <path d='M12 3v12m0 0 5-5m-5 5-5-5M5 21h14' />
              </svg>
              {t.downloadPdf}
            </a>
            <Link to='/' className={styles.homeButton}>
              {t.backHome}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
