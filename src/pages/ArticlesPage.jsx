import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data';
import styles from './ArticlesPage.module.scss';

export default function ArticlesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort((a, b) => b.sortableDate - a.sortableDate);

  return (
    <main className={styles.page}>
      <div className='container'>
        <div className={styles.header}>
          <h1 className={styles.title}>Artikel & Berita</h1>
          <p className={styles.subtitle}>
            Temukan insight terbaru seputar industri konstruksi dan arsitektur
          </p>
        </div>

        <div className={styles.grid}>
          {sortedArticles.map((article) =>
            article.externalContent ? (
              <a
                key={article.id}
                href={article.link}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.card}
              >
                <div className={styles.card__image}>
                  <img src={article.image} alt={article.title} />
                  <span
                    className={`${styles.card__category} ${styles[`card__category--${article.categoryColor}`]}`}
                  >
                    {article.category}
                  </span>
                </div>
                <div className={styles.card__content}>
                  <h3 className={styles.card__title}>{article.title}</h3>
                  <p className={styles.card__excerpt}>{article.excerpt}</p>
                  <div className={styles.card__meta}>
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </a>
            ) : (
              <Link key={article.id} to={`/artikel/${article.slug}`} className={styles.card}>
                <div className={styles.card__image}>
                  <img src={article.image} alt={article.title} />
                  <span
                    className={`${styles.card__category} ${styles[`card__category--${article.categoryColor}`]}`}
                  >
                    {article.category}
                  </span>
                </div>
                <div className={styles.card__content}>
                  <h3 className={styles.card__title}>{article.title}</h3>
                  <p className={styles.card__excerpt}>{article.excerpt}</p>
                  <div className={styles.card__meta}>
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </main>
  );
}
