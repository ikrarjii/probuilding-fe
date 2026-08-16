import { useState, useEffect, useRef } from 'react';
import { eventInfo } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './About.module.scss';

const highlightNumbers = [
  { icon: '🏗️', number: 100, color: 'red' },
  { icon: '👥', number: 15000, color: 'blue' },
  { icon: '🎓', number: 20, color: 'green' },
  { icon: '📅', number: 4, color: 'yellow' },
];

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString('id-ID')}
      {suffix}
    </span>
  );
}

export default function About() {
  const { lang } = useLanguage();
  const t = translations.about[lang];

  const tagColors = ['red', 'blue', 'green', 'yellow', 'red', 'blue', 'green'];

  const body1 = t.body1
    .replace('{exhibitor}', eventInfo.exhibitor)
    .replace('{targetVisitor}', eventInfo.targetVisitor?.toLocaleString('id-ID'));

  const body2 = t.body2.replace(
    '{targetVisitor}',
    eventInfo.targetVisitor?.toLocaleString('id-ID')
  );

  return (
    <section className={`section ${styles.about}`} id='about'>
      <div className='container'>
        <div className={styles.grid}>
          {/* Left: Text Content */}
          <div className={`${styles.textCol} reveal-left`}>
            <span className='section__label'>{t.label}</span>
            <h2 className='section__title'>
              {t.title[0]}
              <br />
              <span className={styles.accent}>{t.title[1]}</span>
              <br />
              {t.title[2]}
            </h2>
            <p className={styles.body}>
              <strong>ProBuild 2026</strong> {body1}
            </p>
            <p className={styles.body}>
              <strong>{lang === 'id' ? 'Target 2026' : 'Target 2026'}</strong>, {body2}
            </p>

            {/* Tags */}
            <div className={styles.tags}>
              {t.tags.map((tag, i) => (
                <span key={tag} className={`tag tag--${tagColors[i]}`}>
                  {tag}
                </span>
              ))}
            </div>

            <a href='/tentang-kami' className='btn btn--outline-dark'>
              {t.readMore}
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                <path d='M5 12h14M12 5l7 7-7 7' />
              </svg>
            </a>
          </div>

          {/* Right: Image + Highlights */}
          <div className={`${styles.imageCol} reveal`}>
            <div className={styles.imageWrap}>
              <img
                src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
                alt='Konstruksi Expo'
                className={styles.image}
              />
              {/* Floating card */}
              <div className={styles.floatCard}>
                <span className={styles.floatCard__dot} />
                <div>
                  <strong>{t.floatCard}</strong>
                  <span>{eventInfo.date}</span>
                </div>
              </div>
              {/* Decorative squares */}
              <div className={styles.deco1} aria-hidden='true' />
              <div className={styles.deco2} aria-hidden='true' />
            </div>
          </div>
        </div>

        {/* Highlights Strip */}
        <div className={`${styles.highlights} reveal`}>
          {highlightNumbers.map((h, i) => (
            <div key={i} className={`${styles.highlight} ${styles[`highlight--${h.color}`]}`}>
              <span className={styles.highlight__icon}>{h.icon}</span>
              <span className={styles.highlight__value}>
                <Counter end={h.number} suffix={t.highlightSuffixes[i]} />
              </span>
              <span className={styles.highlight__label}>{t.highlights[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
