import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, toggleLanguage } = useLanguage();
  const t = translations.nav[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setMobileOpen(false);

    if (link.isRoute) {
      navigate(link.href);
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const target = document.querySelector(link.href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const target = document.querySelector(link.href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleBookingClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to='/' className={styles.logo} onClick={() => setMobileOpen(false)}>
          <span className={styles.logo__icon}>
            <img src='/images/logo-probuild.png' alt='Logo' />
          </span>
          <span className={styles.logo__text}>
            <strong>
              <span className={styles.textRed}>Pro</span>
              <span className={styles.textGreen}>Build</span>{' '}
              <span className={styles.textBlue}>INT</span>
              <span className={styles.textOrange}>IM</span>
            </strong>
            <em>
              <span className={styles.textRed}>2</span>
              <span className={styles.textGreen}>0</span>
              <span className={styles.textBlue}>2</span>
              <span className={styles.textOrange}>6</span>
            </em>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {t.links.map((link) => (
            <a
              key={link.href}
              className={styles.nav__link}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link);
              }}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language Toggle (desktop) */}
        <button
          className={`${styles.langToggle} ${scrolled ? styles.langToggle__scrolled : ''}`}
          onClick={toggleLanguage}
          aria-label='Toggle language'
          title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
        >
          <span>{lang === 'id' ? '🇮🇩' : '🇬🇧'}</span>
          <span>{lang === 'id' ? 'ID' : 'EN'}</span>
        </button>

        {/* CTA */}
        <a href='#booking' className={styles.cta} onClick={handleBookingClick}>
          {t.cta}
        </a>

        {/* Mobile Controls (Language Toggle + Hamburger) */}
        <div className={styles.mobileControls}>
          <button
            className={`${styles.langToggleMobile} ${scrolled ? styles.langToggleMobile__scrolled : ''}`}
            onClick={toggleLanguage}
            aria-label='Toggle language'
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
          >
            <span>{lang === 'id' ? '🇮🇩' : '🇬🇧'}</span>
            <span>{lang === 'id' ? 'ID' : 'EN'}</span>
          </button>
          <button
            className={`${styles.toggle} ${mobileOpen ? styles.open : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label='Toggle menu'
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobile} ${mobileOpen ? styles.mobile__open : ''}`}>
        <nav className={styles.mobile__nav}>
          {t.links.map((link) => (
            <a
              key={link.href}
              className={styles.mobile__link}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link);
              }}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <a href='#booking' className={styles.mobile__cta} onClick={handleBookingClick}>
            {t.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
