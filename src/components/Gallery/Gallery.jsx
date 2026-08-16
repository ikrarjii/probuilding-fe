import { useState } from 'react';
import { galleryImages } from '../../data';
import styles from './Gallery.module.scss';

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (img) => setLightbox(img);
  const closeLightbox = () => setLightbox(null);

  const navigate = (dir) => {
    const idx = galleryImages.findIndex((g) => g.id === lightbox.id);
    const next = (idx + dir + galleryImages.length) % galleryImages.length;
    setLightbox(galleryImages[next]);
  };

  return (
    <section className={`section ${styles.section}`} id="gallery">
      <div className="container">
        <div className={`section__header reveal`}>
          <span className="section__label">Galeri</span>
          <h2 className="section__title">
            Suasana &{' '}
            <span className={styles.accent}>Atmosfer</span>
            <br />
            Konstruksi Expo
          </h2>
          <p className="section__subtitle">
            Saksikan keseruan dan antusiasme ribuan pelaku industri di event tahun sebelumnya.
          </p>
        </div>

        <div className={styles.grid}>
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              className={`${styles.item} ${i === 0 ? styles.item__featured : ''} reveal delay-${(i % 4) + 1}`}
              onClick={() => openLightbox(img)}
            >
              <div className={styles.item__inner}>
                <img src={img.thumb} alt={img.alt} loading="lazy" />
                <div className={styles.item__overlay}>
                  <span className={styles.item__label}>{img.label}</span>
                  <div className={styles.item__zoom}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightbox__close} onClick={closeLightbox} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            className={`${styles.lightbox__nav} ${styles.lightbox__prev}`}
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className={styles.lightbox__content} onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.alt} />
            <div className={styles.lightbox__info}>
              <span className="tag tag--red">{lightbox.label}</span>
              <span className={styles.lightbox__counter}>
                {galleryImages.findIndex((g) => g.id === lightbox.id) + 1} / {galleryImages.length}
              </span>
            </div>
          </div>

          <button
            className={`${styles.lightbox__nav} ${styles.lightbox__next}`}
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
