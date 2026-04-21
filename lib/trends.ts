import Parser from 'rss-parser';
import type { TrendKeyword } from './types';

const parser = new Parser();

function keywordDifficulty(keyword: string) {
  const wordCount = keyword.split(' ').length;
  const hasBigBrand = /(google|apple|microsoft|amazon|tesla|bitcoin)/i.test(keyword);
  return Math.min(100, wordCount * 12 + (hasBigBrand ? 35 : 10));
}

function scoreKeyword(keyword: string, sourceBoost: number) {
  const lengthBoost = Math.max(10, 50 - keyword.length);
  const intentBoost = /(how|best|guide|tools|earn|ai)/i.test(keyword) ? 25 : 8;
  return sourceBoost + lengthBoost + intentBoost;
}

async function fromRss(feedUrl: string, source: string, sourceBoost: number) {
  const feed = await parser.parseURL(feedUrl);
  return (feed.items ?? [])
    .flatMap((item) => {
      const title = item.title?.trim();
      if (!title) return [];
      return title
        .split(/[-:|]/)
        .map((fragment) => fragment.trim())
        .filter((k) => k.length > 10)
        .map((keyword) => ({
          keyword,
          source,
          difficulty: keywordDifficulty(keyword),
          score: scoreKeyword(keyword, sourceBoost),
          status: 'new' as const
        }));
    })
    .slice(0, 20);
}

export async function discoverDailyTrends(): Promise<TrendKeyword[]> {
  const [tech, business] = await Promise.all([
    fromRss('https://techcrunch.com/feed/', 'tech-news', 55),
    fromRss('https://www.searchenginejournal.com/feed/', 'seo-marketing', 50)
  ]);

  const staticGoogleTrendsInspired = [
    'AI coding agents for startups',
    'best ways to make money online with AI',
    'Google core update recovery strategy'
  ].map((keyword) => ({
    keyword,
    source: 'google-trends-inspired',
    difficulty: keywordDifficulty(keyword),
    score: scoreKeyword(keyword, 70),
    status: 'new' as const
  }));

  return [...staticGoogleTrendsInspired, ...tech, ...business]
    .filter((item) => item.difficulty <= 72)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);
}
