import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError, createParticipantRegistration, getRegistrationOptions } from '../api/client';
import { useLanguage } from '../context/LanguageContext';
import { registrationContent } from '../features/registration/registrationContent';
import styles from './RegisterPage.module.scss';

const EVENT_SLUG = import.meta.env.VITE_EVENT_SLUG || 'probuild-intim-2026';

const initialForm = {
  full_name: '',
  whatsapp: '',
  email: '',
  organization: '',
  job_title: '',
  city: '',
  address: '',
  talkshow_ids: [],
};

function formatEventDate(event, lang) {
  if (!event) return '';

  const locale = lang === 'id' ? 'id-ID' : 'en-GB';
  const start = new Date(`${event.starts_on}T00:00:00+08:00`);
  const end = new Date(`${event.ends_on}T00:00:00+08:00`);
  const startLabel = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(
    start
  );
  const endLabel = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(end);

  return `${startLabel} – ${endLabel}`;
}

function formatTalkshowTime(talkshow, lang) {
  const locale = lang === 'id' ? 'id-ID' : 'en-GB';
  const startsAt = new Date(talkshow.starts_at);
  const endsAt = new Date(talkshow.ends_at);
  const date = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Makassar',
  }).format(startsAt);
  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Makassar',
  });

  return `${date} · ${timeFormatter.format(startsAt)}–${timeFormatter.format(endsAt)} WITA`;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = registrationContent[lang];
  const [form, setForm] = useState(initialForm);
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const idempotencyKeyRef = useRef(null);

  const loadRegistration = useCallback(
    async (signal) => {
      setLoading(true);
      setLoadError('');

      try {
        const data = await getRegistrationOptions(EVENT_SLUG, signal);
        setRegistrationData(data);
      } catch (error) {
        if (error.name !== 'AbortError') setLoadError(error.message || t.loadError);
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [t.loadError]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();
    loadRegistration(controller.signal);
    return () => controller.abort();
  }, [loadRegistration]);

  const updateField = (field, value) => {
    idempotencyKeyRef.current = null;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setGeneralError('');
  };

  const toggleTalkshow = (talkshowId) => {
    const selected = form.talkshow_ids.includes(talkshowId);
    updateField(
      'talkshow_ids',
      selected
        ? form.talkshow_ids.filter((id) => id !== talkshowId)
        : [...form.talkshow_ids, talkshowId]
    );
  };

  const validate = () => {
    const nextErrors = {};
    if (form.full_name.trim().length < 2) nextErrors.full_name = [t.fullName];
    if (!form.whatsapp.trim()) nextErrors.whatsapp = [t.whatsapp];
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = [t.email];
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate() || submitting) return;

    setSubmitting(true);
    setGeneralError('');
    if (!idempotencyKeyRef.current) idempotencyKeyRef.current = crypto.randomUUID();

    try {
      const response = await createParticipantRegistration(
        EVENT_SLUG,
        form,
        idempotencyKeyRef.current
      );
      const ticketToken = response.registration.e_ticket?.access_token;

      if (!ticketToken) {
        throw new ApiError(t.generalError, 503);
      }

      navigate(`/registrasi/sukses/${encodeURIComponent(ticketToken)}`, { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(error.errors);
        setGeneralError(error.message || t.generalError);
      } else {
        setGeneralError(t.generalError);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const event = registrationData?.event;
  const talkshows = registrationData?.talkshows || [];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className='container'>
          <span className='section__label'>{t.eyebrow}</span>
          <h1 className={styles.hero__title}>{t.title}</h1>
          <p className={styles.hero__subtitle}>{t.subtitle}</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={`container ${styles.layout}`}>
          <aside className={styles.sidebar}>
            <div className={styles.eventCard}>
              <span className={styles.eventCard__brand}>ProBuild INTIM 2026</span>
              <h2>{t.eventInfo}</h2>
              <dl>
                <div>
                  <dt>{t.eventDate}</dt>
                  <dd>{event ? formatEventDate(event, lang) : '24–27 September 2026'}</dd>
                </div>
                <div>
                  <dt>{t.eventVenue}</dt>
                  <dd>{event?.venue || 'SMMCC – Makassar'}</dd>
                </div>
              </dl>
            </div>

            <div className={styles.noteCard}>
              <h3>{t.important}</h3>
              <ul>
                {t.notes.map((note) => (
                  <li key={note}>
                    <span>✓</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <div>
                <h2>{t.formTitle}</h2>
                <p>{t.formSubtitle}</p>
              </div>
              <span>01</span>
            </div>

            {loadError ? (
              <div className={styles.loadState}>
                <strong>{t.loadError}</strong>
                <p>{loadError}</p>
                <button type='button' onClick={() => loadRegistration()}>
                  {t.retry}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldsGrid}>
                  <label className={styles.fieldFull}>
                    <span>{t.fullName} *</span>
                    <input
                      type='text'
                      value={form.full_name}
                      onChange={(e) => updateField('full_name', e.target.value)}
                      autoComplete='name'
                      aria-invalid={Boolean(errors.full_name)}
                    />
                    {errors.full_name && <small>{errors.full_name[0]}</small>}
                  </label>
                  <label>
                    <span>{t.whatsapp} *</span>
                    <input
                      type='tel'
                      value={form.whatsapp}
                      onChange={(e) => updateField('whatsapp', e.target.value)}
                      placeholder={t.whatsappHint}
                      autoComplete='tel'
                      aria-invalid={Boolean(errors.whatsapp)}
                    />
                    {errors.whatsapp && <small>{errors.whatsapp[0]}</small>}
                  </label>
                  <label>
                    <span>{t.email} *</span>
                    <input
                      type='email'
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      autoComplete='email'
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <small>{errors.email[0]}</small>}
                  </label>
                  <label>
                    <span>
                      {t.organization} <em>{t.optional}</em>
                    </span>
                    <input
                      type='text'
                      value={form.organization}
                      onChange={(e) => updateField('organization', e.target.value)}
                      autoComplete='organization'
                    />
                  </label>
                  <label>
                    <span>
                      {t.jobTitle} <em>{t.optional}</em>
                    </span>
                    <input
                      type='text'
                      value={form.job_title}
                      onChange={(e) => updateField('job_title', e.target.value)}
                      autoComplete='organization-title'
                    />
                  </label>
                  <label>
                    <span>
                      {t.city} <em>{t.optional}</em>
                    </span>
                    <input
                      type='text'
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      autoComplete='address-level2'
                    />
                  </label>
                  <label className={styles.fieldFull}>
                    <span>
                      {t.address} <em>{t.optional}</em>
                    </span>
                    <textarea
                      rows='3'
                      value={form.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      autoComplete='street-address'
                    />
                  </label>
                </div>

                <div className={styles.formDivider} />
                <div className={styles.talkshowHeader}>
                  <div>
                    <h2>{t.talkshowsTitle}</h2>
                    <p>{t.talkshowsSubtitle}</p>
                  </div>
                  <span>02</span>
                </div>

                <div className={styles.talkshows} aria-busy={loading}>
                  {loading &&
                    [...Array(3)].map((_, index) => (
                      <div key={index} className={styles.skeleton} />
                    ))}
                  {!loading &&
                    talkshows.map((talkshow) => {
                      const disabled = ['closed', 'full'].includes(talkshow.availability);
                      const selected = form.talkshow_ids.includes(talkshow.id);
                      let availabilityLabel = t.unlimited;
                      if (talkshow.availability === 'waitlist') availabilityLabel = t.waitlist;
                      if (talkshow.availability === 'full') availabilityLabel = t.full;
                      if (talkshow.availability === 'closed') availabilityLabel = t.closed;
                      if (
                        talkshow.availability === 'available' &&
                        talkshow.remaining_capacity !== null
                      ) {
                        availabilityLabel = t.remaining.replace(
                          '{count}',
                          talkshow.remaining_capacity
                        );
                      }

                      return (
                        <label
                          key={talkshow.id}
                          className={`${styles.talkshow} ${selected ? styles.talkshowSelected : ''} ${disabled ? styles.talkshowDisabled : ''}`}
                        >
                          <input
                            type='checkbox'
                            checked={selected}
                            disabled={disabled}
                            onChange={() => toggleTalkshow(talkshow.id)}
                          />
                          <span className={styles.checkbox} aria-hidden='true'>
                            ✓
                          </span>
                          <span className={styles.talkshow__content}>
                            <strong>{talkshow.title}</strong>
                            <span>{formatTalkshowTime(talkshow, lang)}</span>
                            {talkshow.room && <span>{talkshow.room}</span>}
                          </span>
                          <span
                            className={`${styles.availability} ${styles[`availability_${talkshow.availability}`]}`}
                          >
                            {availabilityLabel}
                          </span>
                        </label>
                      );
                    })}
                </div>

                {errors.talkshow_ids && (
                  <p className={styles.sectionError}>{errors.talkshow_ids[0]}</p>
                )}
                {generalError && <div className={styles.submitError}>{generalError}</div>}
                <p className={styles.consent}>{t.consent}</p>
                <button
                  type='submit'
                  className={styles.submitButton}
                  disabled={submitting || loading || !event?.registration_open}
                >
                  {submitting ? t.submitting : t.submit}
                  {!submitting && (
                    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                      <path d='M5 12h14M12 5l7 7-7 7' />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
