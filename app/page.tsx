import Link from 'next/link';
import { getPublishedArticles } from '@/lib/db';
import { NewsletterForm } from '@/components/NewsletterForm';

export default async function HomePage() {
  const articles = await getPublishedArticles(15);

  return (
    <main className="container grid">
      <section className="hero">
        <h1>TrendAI Empire</h1>
        <p>منصة نشر ذكية تعمل تلقائيًا لاكتشاف الترندات وصناعة محتوى SEO احترافي.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/landing" className="btn">Landing Page</Link>
          <Link href="/docs" className="btn">دليل التشغيل</Link>
        </div>
      </section>

      <section className="card">
        <h2>آخر المقالات</h2>
        <div className="grid">
          {articles.map((article) => (
            <article key={article.slug} className="card">
              <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
              <p>{article.excerpt}</p>
              <small>{article.category} • {article.published_at?.slice(0, 10)}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="card">
          <h3>مناطق ربح جاهزة</h3>
          <p>AdSense slot #1</p>
          <div style={{ minHeight: 90, border: '1px dashed #4b67a3', borderRadius: 12 }} />
          <p>Affiliate block</p>
          <div style={{ minHeight: 120, border: '1px dashed #4b67a3', borderRadius: 12 }} />
        </div>
        <NewsletterForm />
      </section>
    </main>
  );
}
