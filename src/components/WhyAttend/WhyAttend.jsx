import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './WhyAttend.module.scss';

const icons = {
  building: (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
      <path d='M3 21h18M9 21V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v16M3 10h4m10 0h4M6 10V7H3v14m15-14v-3h3v14' />
    </svg>
  ),
  lightbulb: (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
      <path d='M9 21h6m-6-3h6m-3-15a6 6 0 0 0-3 11.2V15h6v-1.8A6 6 0 0 0 12 3z' />
    </svg>
  ),
  chart: (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
      <path d='M3 3v18h18M7 16l4-4 4 4 4-5' />
    </svg>
  ),
  seminar: (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75'>
      <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 0-3 3-1.5-1.5M22 7l-3 3' />
    </svg>
  ),
};

const iconKeys = ['building', 'lightbulb', 'chart', 'seminar'];
const colorKeys = ['red', 'blue', 'green', 'yellow'];

const colorMap = {
  red: { bg: '#FFF0F1', border: '#FECDD0', icon: '#E8303A' },
  blue: { bg: '#EEF4FF', border: '#C7D9FF', icon: '#1A5FD6' },
  green: { bg: '#EDFAF4', border: '#B8EED8', icon: '#2D9C6E' },
  yellow: { bg: '#FFF9ED', border: '#FDDDA8', icon: '#D48A0E' },
};

export default function WhyAttend() {
  const { lang } = useLanguage();
  const t = translations.whyAttend[lang];

  return (
    <section className={`section section--light ${styles.section}`} id='why-attend'>
      <div className='container'>
        <div className={`section__header ${styles.header}`}>
          <div className='reveal'>
            <span className='section__label'>{t.label}</span>
            <h2 className='section__title'>
              {t.title[0]}
              <br />
              {t.title[1]}
              <br />
              <span className={styles.accentRed}>Pro</span>
              <span className={styles.accentGreen}>Build</span>{' '}
              <span className={styles.accentBlue}>INT</span>
              <span className={styles.accentOrange}>IM</span> 2026
            </h2>
          </div>
          <p className={`section__subtitle reveal delay-2`} style={{ maxWidth: '48ch' }}>
            {t.subtitle}
          </p>
        </div>

        <div className={styles.cards}>
          {t.cards.map((item, i) => {
            const colors = colorMap[colorKeys[i]];
            return (
              <a
                key={i}
                href='/tentang-kami'
                className={`${styles.card} reveal delay-${i + 1}`}
                style={{
                  '--icon-bg': colors.bg,
                  '--icon-border': colors.border,
                  '--icon-color': colors.icon,
                }}
              >
                <div className={styles.card__number}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.card__icon}>{icons[iconKeys[i]]}</div>
                <h3 className={styles.card__title}>{item.title}</h3>
                <p className={styles.card__desc}>{item.description}</p>
                <div className={styles.card__footer}>
                  <span className={styles.card__more}>{t.learnMore}</span>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className={styles.card__arrow}
                  >
                    <path d='M5 12h14M12 5l7 7-7 7' />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.bottomCta} reveal`}>
          <div className={styles.bottomCta__text}>
            <strong>{t.bottomCta.ready}</strong>
            <span>{t.bottomCta.sub}</span>
          </div>
          <div className={styles.bottomCta__btns}>
            <a
              href='#booking'
              className='btn btn--primary'
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.bottomCta.bookNow}
            </a>
            <a href='/booth' className={`btn ${styles.btnProgram}`}>
              {t.bottomCta.program}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
