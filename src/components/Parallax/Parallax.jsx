import { useEffect, useRef } from 'react';
import styles from './Parallax.module.scss';
import { eventInfo } from '../../data';
import { translations } from '../../translations';
import { useLanguage } from '../../context/LanguageContext';

export default function Parallax() {
  const bgRef = useRef(null);
  const { lang } = useLanguage();
  const t = translations.parallax[lang];
  console.log('🚀 ~ Parallax ~ t:', t);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const section = bgRef.current.closest('section');
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewH) return;

      const progress = (viewH - rect.top) / (viewH + rect.height);
      const shift = (progress - 0.5) * 500;
      bgRef.current.style.transform = `translateY(${shift}px) scale(1.15)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.parallax}>
      {/* Parallax BG */}
      <div className={styles.bg} ref={bgRef}>
        <img src='/images/exhibition-hall.png' alt='Construction Background' />
      </div>
      <div className={styles.overlay} />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrow__line} />
            {eventInfo.date} · {eventInfo.location}
          </span>

          <h2 className={styles.headline}>
            {t.headline1}
            <br />
            {t.headline2}
            <br />
            <em>{t.headlineAccent}</em>
          </h2>

          <p className={styles.body}>{t.body}</p>

          <div className={styles.ctas}>
            <a
              href='#booking'
              className={`btn btn--primary ${styles.ctaPrimary}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.cta}
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                <path d='M5 12h14M12 5l7 7-7 7' />
              </svg>
            </a>
          </div>

          {/* Features row */}
          <div className={styles.features}>
            {t.features.map((f, i) => (
              <div key={i} className={styles.feature}>
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
