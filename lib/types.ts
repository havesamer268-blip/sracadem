export type TrendKeyword = {
  id?: string;
  keyword: string;
  source: string;
  difficulty: number;
  score: number;
  status?: 'new' | 'used' | 'discarded';
  created_at?: string;
};

export type ArticleRecord = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  cover_image_url: string;
  category: string;
  keywords: string[];
  meta_description: string;
  faq_json: Array<{ question: string; answer: string }>;
  published_at?: string;
};
