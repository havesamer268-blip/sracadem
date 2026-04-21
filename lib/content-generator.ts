import OpenAI from 'openai';
import { env } from './env';
import { toSlug } from './slug';
import type { ArticleRecord, TrendKeyword } from './types';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

type GeneratedShape = {
  title: string;
  excerpt: string;
  meta_description: string;
  category: string;
  keywords: string[];
  cover_image_prompt: string;
  faq: Array<{ question: string; answer: string }>;
  content_markdown: string;
};

export async function generateArticle(keyword: TrendKeyword): Promise<ArticleRecord> {
  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'system',
        content:
          'You are a senior SEO content strategist. Return strict JSON only. Write helpful, non-spammy content aligned with Google quality standards.'
      },
      {
        role: 'user',
        content: `Create one article in Arabic (Modern Standard Arabic) about: ${keyword.keyword}.\nRequirements:\n- 1000-1500 words\n- High CTR title\n- Natural keyword usage\n- Clean H2/H3 hierarchy\n- FAQ section optimized for featured snippets\n- Include actionable examples\n- No prohibited/sensitive/medical/legal risky claims\n- JSON shape: {title,excerpt,meta_description,category,keywords,cover_image_prompt,faq,content_markdown}`
      }
    ],
    text: { format: { type: 'json_object' } }
  });

  const parsed = JSON.parse(response.output_text) as GeneratedShape;
  const review = await aiQualityReview(parsed.content_markdown);
  if (!review.pass) {
    throw new Error(`AI review rejected article: ${review.reason}`);
  }

  return {
    slug: toSlug(parsed.title),
    title: parsed.title,
    excerpt: parsed.excerpt,
    content_md: parsed.content_markdown,
    cover_image_url: `https://picsum.photos/seed/${encodeURIComponent(parsed.cover_image_prompt)}/1200/630`,
    category: parsed.category,
    keywords: parsed.keywords,
    meta_description: parsed.meta_description,
    faq_json: parsed.faq
  };
}

async function aiQualityReview(content: string): Promise<{ pass: boolean; reason: string }> {
  const response = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: [
      {
        role: 'system',
        content: 'You are a strict quality checker for SEO blogs. Return JSON only.'
      },
      {
        role: 'user',
        content: `Evaluate this markdown article. Reject if duplicate-like, thin, policy-risky, keyword stuffed, or low quality. Return {pass:boolean, reason:string}.\n\n${content}`
      }
    ],
    text: { format: { type: 'json_object' } }
  });

  return JSON.parse(response.output_text) as { pass: boolean; reason: string };
}
