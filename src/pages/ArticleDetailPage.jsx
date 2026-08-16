import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { articles } from '../data';
import styles from './ArticleDetailPage.module.scss';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <main className={styles.page}>
        <div className='container'>
          <div className={styles.notFound}>
            <h1>Artikel tidak ditemukan</h1>
            <Link to='/artikel' className='btn btn--primary'>
              Kembali ke Artikel
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <div className='container'>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← Kembali
          </button>

          <header className={styles.header}>
            <span className={`${styles.category} ${styles[`category--${article.categoryColor}`]}`}>
              {article.category}
            </span>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          <div className={styles.image}>
            <img src={article.image} alt={article.title} />
          </div>

          <div className={styles.content}>
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className={styles.related}>
          <div className='container'>
            <h2 className={styles.relatedTitle}>Artikel Terkait</h2>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/artikel/${related.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedCard__image}>
                    <img src={related.image} alt={related.title} />
                  </div>
                  <div className={styles.relatedCard__content}>
                    <span className={styles.relatedCard__category}>{related.category}</span>
                    <h3 className={styles.relatedCard__title}>{related.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
