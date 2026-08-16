import styles from './ArticleDetail.module.scss';

export default function ArticleDetail({ article, onBack }) {
  return (
    <div className={styles.page} id="news">
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <button className={styles.back} onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali ke Artikel
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className={styles.heroImg}>
        <img src={article.image} alt={article.title} />
        <div className={styles.heroImg__overlay} />
      </div>

      {/* Content */}
      <div className="container">
        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={`tag tag--${article.categoryColor === 'red' ? 'red' : article.categoryColor === 'blue' ? 'blue' : 'green'}`}>
              {article.category}
            </span>
            <span className={styles.metaItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {article.date}
            </span>
            <span className={styles.metaItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {article.readTime} baca
            </span>
          </div>

          <h1 className={styles.title}>{article.title}</h1>

          <div className={styles.author}>
            <div className={styles.author__avatar}>{article.author.charAt(0)}</div>
            <div>
              <strong>{article.author}</strong>
              <span>Editor Konstruksi Expo</span>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.body}>
            {article.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className={styles.footer}>
            <p className={styles.footer__cta}>
              Ingin mengetahui lebih lanjut tentang inovasi ini? Temukan di{' '}
              <strong>Konstruksi Expo 2025</strong>, 14–17 November di JIExpo Kemayoran.
            </p>
            <div className={styles.footer__btns}>
              <button
                className="btn btn--primary"
                onClick={() => {
                  onBack();
                  setTimeout(() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
              >
                Daftar ke Event
              </button>
              <button className="btn btn--outline-dark" onClick={onBack}>
                ← Artikel Lainnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
