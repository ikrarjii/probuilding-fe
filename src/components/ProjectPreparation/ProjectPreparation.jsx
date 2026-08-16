import { galleryPreparation } from '../../data';
import styles from './ProjectPreparation.module.scss';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export default function ProjectShowcase() {
  // Triple the items for smooth infinite scroll
  const loop = [...galleryPreparation, ...galleryPreparation, ...galleryPreparation];
  const { lang } = useLanguage();
  const t = translations.projectPreparation[lang];

  return (
    <section className={`section ${styles.section}`}>
      <div className='container'>
        <div className='section__header reveal' style={{ marginBottom: '2rem' }}>
          <span className='section__label'>{t.label}</span>
          <h2 className='section__title'>
            <span className={styles.accent}>{t.titleAccent}</span> {t.titleSuffix}
          </h2>
          <p className='section__subtitle'>
            {t.subtitle}
            <br />
            <strong>{t.strong}</strong>
          </p>
        </div>

        <div className={styles.carouselWrap}>
          <div className={styles.track}>
            {loop.map((item, i) => (
              <div key={`${item.id}-${i}`} className={styles.slide}>
                <div className={styles.card}>
                  <img src={item.thumb} alt={item.alt} loading='lazy' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
