import { supabase } from './supabase';
import type { ArticleRecord, TrendKeyword } from './types';

export async function saveTrends(trends: TrendKeyword[]) {
  if (!trends.length) return;
  await supabase.from('trends').upsert(trends, { onConflict: 'keyword' });
}

export async function fetchUnusedTrends(limit = 3) {
  const { data, error } = await supabase
    .from('trends')
    .select('*')
    .eq('status', 'new')
    .order('score', { ascending: false })
    .limit(limit * 2);

  if (error) throw error;
  return (data ?? []) as TrendKeyword[];
}

export async function existingSlugs() {
  const { data, error } = await supabase.from('articles').select('slug,title');
  if (error) throw error;
  return data ?? [];
}

export async function saveArticle(article: ArticleRecord) {
  const { error } = await supabase.from('articles').insert(article);
  if (error) throw error;
}

export async function markTrendUsed(keyword: string) {
  const { error } = await supabase.from('trends').update({ status: 'used' }).eq('keyword', keyword);
  if (error) throw error;
}

export async function getPublishedArticles(limit = 50) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as ArticleRecord[];
}

export async function saveSubscriber(email: string) {
  const { error } = await supabase.from('subscribers').upsert({ email }, { onConflict: 'email' });
  if (error) throw error;
}
