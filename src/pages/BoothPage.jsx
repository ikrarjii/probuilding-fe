import { useState, useEffect } from 'react';
import { exhibitorPackages, sponsorshipPackages } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import styles from './BoothPage.module.scss';

const WA_NUMBER = '6285705852676';

export default function BoothPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const { lang } = useLanguage();
  const t = translations.boothPage[lang];

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTo');

    if (scrollTarget) {
      sessionStorage.removeItem('scrollTo');
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
    document.body.style.overflow = 'auto';
  };

  const docFiles = [
    '/files/Peraturan exhibition ProBuild INTIM 2026.pdf',
    '/files/Jadwal setup booth dan move-in exhibitor.pdf',
    '/files/Jadwal loading dan unloading booth ProBuild INTIM 2026.pdf',
  ];

  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__overlay} />
        <div className={styles.hero__content}>
          <div className='container'>
            <h1 className={styles.hero__title}>{t.heroTitle}</h1>
            <p className={styles.hero__subtitle}>{t.heroSubtitle}</p>
          </div>
        </div>
      </section>

      {/* Venue Layout Section */}
      <section id='venue-layout' className={`section ${styles.venueSection}`}>
        <div className='container'>
          <div className={styles.venueSection}>
            <span className='section__label'>
              <span style={{ background: '#4CAF50' }} />
              {t.venueLabel}
            </span>
            <h2 className='section__title'>
              {t.venueTitle} <span className={styles.textRed}>Pro</span>
              <span className={styles.textGreen}>Build</span>{' '}
              <span className={styles.textBlue}>INT</span>
              <span className={styles.textOrange}>IM</span>{' '}
              <span className={styles.textRed}>2</span>
              <span className={styles.textGreen}>0</span>
              <span className={styles.textBlue}>2</span>
              <span className={styles.textOrange}>6</span>
            </h2>
            <p className='section__subtitle'>{t.venueSubtitle}</p>
          </div>
          <div className={styles.layoutImage} onClick={() => openModal('/images/layout.png')}>
            <img src='/images/layout.png' alt='Venue Layout ProBuild INTIM 2026' />
            <div className={styles.layoutImage__overlay}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='48'
                height='48'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='11' cy='11' r='8' />
                <path d='m21 21-4.35-4.35' />
                <line x1='11' y1='8' x2='11' y2='14' />
                <line x1='8' y1='11' x2='14' y2='11' />
              </svg>
              <span>{t.zoomHint}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitor Packages Section */}
      <section className={`section section--light ${styles.packagesSection}`}>
        <div className='container'>
          <div className={styles.packagesHeader}>
            <span className='section__label'>
              <span style={{ background: '#4CAF50' }} />
              {t.packagesLabel}
            </span>
            <h2 className='section__title'>{t.packagesTitle}</h2>
            <p className='section__subtitle'>{t.packagesSubtitle}</p>
          </div>

          <div className={styles.packagesGrid}>
            {exhibitorPackages.map((pkg, index) => {
              const pkgT = t.packages[index];
              const waMessage = t.waMessageBooth(pkg.name);
              const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

              return (
                <div
                  key={pkg.id}
                  className={`${styles.packageCard} ${pkg.popular ? styles['packageCard--popular'] : ''} ${styles[`packageCard--${pkg.color}`]} reveal delay-${index + 1}`}
                >
                  {pkg.popular && <div className={styles.packageCard__badge}>{t.popularBadge}</div>}

                  <div className={styles.packageCard__header}>
                    <div className={styles.packageCard__icon}>{pkg.icon}</div>
                    <h3 className={styles.packageCard__name}>{pkg.name}</h3>
                    <p className={styles.packageCard__tagline}>{pkgT?.tagline ?? pkg.tagline}</p>
                  </div>

                  <a
                    href={waUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.packageCard__contactBtn}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                    </svg>
                    {t.contactBtn}
                  </a>

                  <div className={styles.packageCard__divider} />

                  <ul className={styles.packageCard__features}>
                    {(pkgT?.features ?? pkg.features).map((feature, idx) => (
                      <li key={idx}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <polyline points='20 6 9 17 4 12' />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section id='sponsorship' className={`section ${styles.sponsorshipSection}`}>
        <div className='container'>
          <div className={styles.sponsorshipHeader}>
            <span className='section__label'>
              <span style={{ background: '#4CAF50' }} />
              {t.sponsorLabel}
            </span>
            <h2 className={styles.sponsorshipTitle}>{t.sponsorTitle}</h2>
            <p className={styles.sponsorshipSubtitle}>{t.sponsorSubtitle}</p>
          </div>

          {/* Column headers */}
          <div className={styles.sponsorshipColHeaders}>
            <span>{t.sponsorColLevel}</span>
            <span>{t.sponsorColPrivileges}</span>
          </div>

          {/* Card list */}
          <div className={styles.sponsorshipList}>
            {sponsorshipPackages.map((pkg, index) => {
              const pkgT = t.sponsorPackages[index];
              const waMessage = t.waMessageSponsor(pkg.name);
              const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

              return (
                <div
                  key={pkg.id}
                  className={styles.sponsorCard}
                  style={{ '--pkg-color': pkg.colorHex }}
                >
                  {/* Left: icon + name */}
                  <div className={styles.sponsorCard__level}>
                    <div className={styles.sponsorCard__iconWrap}>
                      <span>{pkg.icon}</span>
                    </div>
                    <span className={styles.sponsorCard__name}>{pkg.name}</span>
                  </div>

                  {/* Middle: privileges bullet list */}
                  <ul className={styles.sponsorCard__privileges}>
                    {(pkgT?.privileges ?? pkg.privileges).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  {/* Right: CTA button */}
                  <a
                    href={waUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.sponsorCard__btn}
                  >
                    {t.sponsorCta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Documents Section */}
      <section
        id='download-documents'
        className={`section section--light ${styles.downloadSection}`}
      >
        <div className='container'>
          <div className={styles.downloadHeader}>
            <span className='section__label'>
              <span style={{ background: '#4CAF50' }} />
              {t.downloadLabel}
            </span>
            <h2 className='section__title'>{t.downloadTitle}</h2>
            <p className='section__subtitle'>{t.downloadSubtitle}</p>
          </div>

          <div className={styles.downloadGrid}>
            {t.docs.map((doc, i) => (
              <div key={i} className={styles.downloadCard}>
                <div className={styles.downloadCard__icon}>
                  {i === 0 && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='48'
                      height='48'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                      <polyline points='14 2 14 8 20 8' />
                      <line x1='16' y1='13' x2='8' y2='13' />
                      <line x1='16' y1='17' x2='8' y2='17' />
                      <polyline points='10 9 9 9 8 9' />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='48'
                      height='48'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
                      <line x1='16' y1='2' x2='16' y2='6' />
                      <line x1='8' y1='2' x2='8' y2='6' />
                      <line x1='3' y1='10' x2='21' y2='10' />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='48'
                      height='48'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <polyline points='12 6 12 12 16 14' />
                    </svg>
                  )}
                </div>
                <h3 className={styles.downloadCard__title}>{doc.title}</h3>
                <p className={styles.downloadCard__description}>{doc.desc}</p>
                <a href={docFiles[i]} download className={styles.downloadCard__button}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                    <polyline points='7 10 12 15 17 10' />
                    <line x1='12' y1='15' x2='12' y2='3' />
                  </svg>
                  {doc.btn}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modal__overlay} />
          <div className={styles.modal__content}>
            <button className={styles.modal__close} onClick={closeModal} aria-label='Close modal'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>
            <img
              src={modalImage}
              alt='Venue Layout - Zoomed'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  );
}
