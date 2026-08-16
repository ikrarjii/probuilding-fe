// import { sponsors } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './Sponsors.module.scss';

function SponsorLogo({ sponsor, className, variant = 'supporting', backgroundColor }) {
  const colors = ['#1A5FD6', '#F5A623', '#7A8899', '#2D9C6E'];
  const color = colors[sponsor.id % colors.length];

  const abbrev = sponsor.name
    ? sponsor.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'SP';

  const logoContent = sponsor.logo ? (
    <img src={sponsor.logo} alt={sponsor.name} />
  ) : (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          color: color,
          marginBottom: '0.25rem',
        }}
      >
        {abbrev}
      </div>
      {variant === 'supporting' && (
        <div style={{ fontSize: '0.7rem', color: '#666' }}>{sponsor.name}</div>
      )}
    </div>
  );

  return (
    <div className={`${className} ${styles.logoContainer}`} title={sponsor.name}>
      <div
        className={styles.logoImageWrapper}
        style={{
          ...(!sponsor.logo ? { borderColor: color } : {}),
          ...(backgroundColor ? { backgroundColor } : {}),
        }}
      >
        {logoContent}
      </div>

      {variant === 'main' && <div className={styles.mainName}>{sponsor.name}</div>}

      {variant === 'secondary' && (
        <div className={styles.secondaryInfo}>
          <div className={styles.secondaryName}>{sponsor.name}</div>
          {sponsor.fullName && <div className={styles.secondaryFullName}>{sponsor.fullName}</div>}
        </div>
      )}
    </div>
  );
}

export default function Sponsors() {
  const { lang } = useLanguage();
  const t = translations.sponsors[lang];

  const secondaryLoop =
    t.content.secondary.length > 0
      ? [
          ...t.content.secondary,
          ...t.content.secondary,
          ...t.content.secondary,
          ...t.content.secondary,
        ]
      : [];

  return (
    <section className={styles.section} id='sponsors'>
      <div className='container'>
        {/* Header */}
        <div className='section__header reveal' style={{ marginBottom: '2rem' }}>
          <span className='section__label'>{t.label}</span>
          <h2 className='section__title'>
            <span className='text-primary'>
              {t.title} <span className={styles.accent}>{t.accent}</span>
            </span>
          </h2>
          <p className='section__subtitle'>{t.subtitle}</p>
        </div>

        {/* 1. Main Sponsor */}
        {t.content.main.length > 0 && (
          <div className='reveal'>
            <div className={styles.subHeader}>
              <h3>{t.mainHeader}</h3>
            </div>
            <div className={styles.mainWrapper}>
              {t.content.main.map((sponsor) => (
                <SponsorLogo
                  key={sponsor.id}
                  sponsor={sponsor}
                  className={styles.mainCard}
                  variant='main'
                  backgroundColor={sponsor?.backgroundColor}
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. Secondary Sponsor (Marquee) */}
        {t.content.secondary.length > 0 && (
          <div className='reveal'>
            <div className={styles.subHeader}>
              <h3>{t.secondaryHeader}</h3>
            </div>

            <div className={styles.secondaryWrapper}>
              <div className={styles.secondaryTrack}>
                {secondaryLoop.map((s, i) => (
                  <SponsorLogo
                    key={`${s.id}-${i}`}
                    sponsor={s}
                    className={styles.secondaryCard}
                    variant='secondary'
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className={`reveal ${styles.cta}`}>
          <p>{t.ctaText}</p>
          <a
            href='https://wa.me/6285705852676?text=Halo%20Saya%20tertarik%20jadi%20sponsor%20ProBuild%20INTIM%202026'
            target='_blank'
            className='btn btn--primary'
          >
            {t.ctaBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
