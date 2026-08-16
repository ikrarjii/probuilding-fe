import { useState, useEffect } from 'react';
import { eventInfo } from '../../data';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './Hero.module.scss';

function CountdownUnit({ value, label, color }) {
  return (
    <div className={`${styles.countdown__unit} ${styles[`countdown__unit--${color}`]}`}>
      <span className={styles.countdown__number}>{String(value).padStart(2, '0')}</span>
      <span className={styles.countdown__label}>{label}</span>
    </div>
  );
}

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(eventInfo.targetDate);
  const { lang } = useLanguage();
  const t = translations.hero[lang];

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const description = t.description
    .replace('{exhibitor}', eventInfo.exhibitor)
    .replace('{targetVisitor}', eventInfo.targetVisitor?.toLocaleString('id-ID'));

  return (
    <section className={styles.hero} id='home'>
      {/* Background */}
      <div className={styles.bg}>
        <img
          src='https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85'
          alt='Modern Architecture'
          className={styles.bg__img}
        />
        <div className={styles.bg__overlay} />
        <div className={styles.bg__noise} />
      </div>

      {/* Grid lines decoration */}
      <div className={styles.gridLines} aria-hidden='true'>
        {[...Array(5)].map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className={styles.containerHero}>
        <div className={styles.content}>
          {/* Eyebrow */}
          <a
            className={styles.eyebrow}
            href='https://maps.app.goo.gl/zYf5uwPERH5E6ymn6'
            target='_blank'
          >
            <span className={styles.eyebrow__dot} />
            <span>
              {eventInfo.location} • {eventInfo.date}
            </span>
          </a>

          {/* Headline */}
          <div className={styles.headline}>
            <h3 className={styles.headline__top}>INDONESIA'S PREMIER EASTERN EXPO</h3>
            <div className={styles.headline__mainAccent}>
              <h1 className={styles.headline__main}>
                <span className={styles.main__red}>Pro</span>
                <span className={styles.main__green}>Build</span>
              </h1>
              <h1 className={styles.headline__accent}>
                <span className={styles.main__blue}>INT</span>
                <span className={styles.main__yellow}>IM</span>
              </h1>
            </div>
            <h1 className={styles.headline__sub}>
              <span className={styles.main__red}>2</span>
              <span className={styles.main__green}>0</span>
              <span className={styles.main__blue}>2</span>
              <span className={styles.main__yellow}>6</span>
            </h1>
          </div>

          {/* Description */}
          <p className={styles.description}>{description}</p>

          {/* CTA Buttons */}
          <div className={styles.ctas}>
            <a
              href='https://forms.gle/mbR83h9yksfL3Rtd8'
              className={`btn btn--primary ${styles.cta__primary}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                <rect x='3' y='3' width='7' height='7' />
                <rect x='14' y='3' width='7' height='7' />
                <rect x='14' y='14' width='7' height='7' />
                <rect x='3' y='14' width='7' height='7' />
              </svg>
              {t.ctaPrimary}
            </a>
            <a
              href='/registrasi'
              className={`btn ${styles.cta__visitor}`}
            >
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                <circle cx='9' cy='7' r='4' />
                <path d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
              </svg>
              {t.ctaVisitor}
            </a>
            <a href='/tentang-kami' className={`btn btn--outline ${styles.cta__outline}`}>
              {t.ctaOutline}
            </a>
          </div>

          {/* Countdown */}
          <div className={styles.countdownWrap}>
            <span className={styles.countdownLabel}>{t.countdownLabel}</span>
            <div className={styles.countdown}>
              <CountdownUnit value={days} label={t.days} color='red' />
              <CountdownUnit value={hours} label={t.hours} color='blue' />
              <CountdownUnit value={minutes} label={t.minutes} color='green' />
              <CountdownUnit value={seconds} label={t.seconds} color='yellow' />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className={styles.scrollDown}
        onClick={() => handleScroll('#about')}
        aria-label='Scroll down'
      >
        <span className={styles.scrollDown__line} />
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
          <path d='M7 10l5 5 5-5' />
        </svg>
      </button>
    </section>
  );
}
