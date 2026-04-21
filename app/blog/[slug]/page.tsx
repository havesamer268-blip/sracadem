import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

async function getArticle(slug: string) {
  const { data } = await supabase.from('articles').select('*').eq('slug', slug).single();
  return data;
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) return notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (article.faq_json ?? []).map((item: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  };

  return (
    <main className="container article">
      <article className="card">
        <h1>{article.title}</h1>
        <p>{article.meta_description}</p>
        <img src={article.cover_image_url} alt={article.title} width="100%" loading="lazy" style={{ borderRadius: 14 }} />
        {String(article.content_md)
          .split('\n')
          .filter(Boolean)
          .map((line, index) => {
            if (line.startsWith('## ')) return <h2 key={index}>{line.replace('## ', '')}</h2>;
            if (line.startsWith('### ')) return <h3 key={index}>{line.replace('### ', '')}</h3>;
            return <p key={index}>{line.replace(/^[-*]\s/, '• ')}</p>;
          })}
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
