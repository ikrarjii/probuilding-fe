import { useState } from 'react';
import { testimonials } from '../../data';
import styles from './Testimonials.module.scss';

function StarRating({ count }) {
  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill={i < count ? '#F5A623' : '#E5E8EC'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className={`section ${styles.section}`} id="testimonials">
      <div className="container">
        <div className={`${styles.grid}`}>
          {/* Left */}
          <div className={`${styles.left} reveal-left`}>
            <span className="section__label">Testimoni</span>
            <h2 className="section__title">
              Apa Kata Mereka<br />
              yang Telah <span className={styles.accent}>Hadir</span>
            </h2>
            <p className="section__subtitle">
              Ribuan pelaku industri telah membuktikan nilai nyata Konstruksi Expo.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.stat__value}>98%</span>
                <span className={styles.stat__label}>Kepuasan Peserta</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__value}>4.9/5</span>
                <span className={styles.stat__label}>Rating Event</span>
              </div>
            </div>

            <div className={styles.navBtns}>
              <button className={styles.navBtn} onClick={prev} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className={styles.navBtn} onClick={next} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Cards */}
          <div className={`${styles.right} reveal-right`}>
            <div className={styles.cards}>
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className={`${styles.card} ${i === active ? styles.card__active : ''}`}
                  onClick={() => setActive(i)}
                >
                  {/* Quote mark */}
                  <div className={styles.card__quote}>"</div>

                  <StarRating count={t.rating} />

                  <p className={styles.card__text}>
                    {t.quote}
                  </p>

                  <div className={styles.card__author}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className={styles.card__avatar}
                    />
                    <div className={styles.card__info}>
                      <strong>{t.name}</strong>
                      <span>{t.position}</span>
                      <span className={styles.card__company}>{t.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dot__active : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
