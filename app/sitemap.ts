import type { MetadataRoute } from 'next';
import { getPublishedArticles } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const articles = await getPublishedArticles(500);

  return [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/landing`, changeFrequency: 'weekly', priority: 0.7 },
    ...articles.map((article) => ({
      url: `${base}/blog/${article.slug}`,
      lastModified: article.published_at,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  ];
}
