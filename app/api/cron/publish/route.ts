import { NextRequest, NextResponse } from 'next/server';
import { discoverDailyTrends } from '@/lib/trends';
import { existingSlugs, fetchUnusedTrends, markTrendUsed, saveArticle, saveTrends } from '@/lib/db';
import { generateArticle } from '@/lib/content-generator';
import { env } from '@/lib/env';

function nearDuplicate(title: string, existingTitles: string[]) {
  return existingTitles.some((t) => {
    const a = new Set(title.toLowerCase().split(/\s+/));
    const b = new Set(t.toLowerCase().split(/\s+/));
    const intersection = [...a].filter((x) => b.has(x)).length;
    const union = new Set([...a, ...b]).size;
    return intersection / union > 0.72;
  });
}

export async function GET(request: NextRequest) {
  if (request.headers.get('x-cron-secret') !== env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dailyTrends = await discoverDailyTrends();
  await saveTrends(dailyTrends);

  const [unused, existing] = await Promise.all([fetchUnusedTrends(3), existingSlugs()]);
  const existingTitles = existing.map((item) => item.title as string);

  const published: string[] = [];
  for (const trend of unused) {
    if (published.length >= 3) break;

    const article = await generateArticle(trend);
    if (existing.some((item) => item.slug === article.slug)) continue;
    if (nearDuplicate(article.title, existingTitles)) continue;

    await saveArticle(article);
    await markTrendUsed(trend.keyword);
    published.push(article.slug);
  }

  return NextResponse.json({ ok: true, published_count: published.length, slugs: published });
}
