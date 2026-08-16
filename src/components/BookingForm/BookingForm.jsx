import { eventInfo } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './BookingForm.module.scss';

const GOOGLE_FORMS = {
  booth: 'https://forms.gle/mbR83h9yksfL3Rtd8',
  visitor: '/registrasi',
};

export default function BookingForm() {
  const { lang } = useLanguage();
  const t = translations.bookingForm[lang];

  const benefits = t.benefits.map((b) => ({
    ...b,
    desc: b.desc
      .replace('{location}', eventInfo.location)
      .replace('{venue}', eventInfo.venue)
      .replace('{targetVisitor}', eventInfo.targetVisitor?.toLocaleString('id-ID')),
  }));

  return (
    <section className={`section ${styles.section}`} id='booking'>
      <div className='container'>
        <div className={styles.grid}>
          <div className={styles.info}>
            <span className='section__label' style={{ color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ background: '#E8303A' }} />
              {t.label}
            </span>
            <h2 className={`section__title ${styles.infoTitle}`}>
              {t.title}
              <br />
              <span className={styles.accent}>{t.accent}</span> {t.titleSuffix}
            </h2>
            <p className={styles.infoBody}>{t.body}</p>

            <div className={styles.benefits}>
              {benefits.map((b, i) => (
                <div key={i} className={styles.benefit}>
                  <span className={styles.benefit__icon}>{b.icon}</span>
                  <div>
                    <strong>{b.title}</strong>
                    <span>{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.contact}>
              <span>{t.contactHelp}</span>
              <p className={styles.contact__phone}>
                <a href='https://wa.me/6285705852676' target='_blank' rel='noopener noreferrer'>
                  085705852676
                </a>
                {' / '}
                <a href='https://wa.me/620811443577' target='_blank' rel='noopener noreferrer'>
                  0811443577
                </a>
              </p>
              <a href='mailto:info@probuildintim.com'>✉️ info@probuildintim.com</a>
            </div>
          </div>

          <div className={styles.formWrap}>
            <div className={styles.ctaPanel}>
              <div className={styles.ctaPanel__header}>
                <h3>{t.ctaTitle}</h3>
                <p>{t.ctaSub}</p>
              </div>

              <div className={styles.ctaButtons}>
                <a
                  href={GOOGLE_FORMS.booth}
                  className={`btn btn--primary ${styles.ctaBtn}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {t.toggleBooth}
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                    <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                    <polyline points='15 3 21 3 21 9' />
                    <line x1='10' y1='14' x2='21' y2='3' />
                  </svg>
                </a>

                <a
                  href={GOOGLE_FORMS.visitor}
                  className={`btn btn--outline-dark ${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
                >
                  {t.toggleVisitor}
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                    <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                    <polyline points='15 3 21 3 21 9' />
                    <line x1='10' y1='14' x2='21' y2='3' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
