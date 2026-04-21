import dayjs from 'dayjs';
import { supabase } from '../lib/supabase';

function buildArticle(i: number) {
  const topic = [
    'أفضل أدوات AI لصناعة المحتوى',
    'استراتيجية SEO للمشاريع الناشئة',
    'الربح من الإنترنت عبر التسويق بالعمولة',
    'تحسين معدل النقر CTR في نتائج البحث',
    'خطة محتوى تقنية لمدة 30 يومًا'
  ][i % 5];

  return {
    slug: `trendai-starter-${i + 1}`,
    title: `${topic} — الدليل العملي ${i + 1}`,
    excerpt: 'مقال تأسيسي يشرح خطوات عملية قابلة للتنفيذ لزيادة الزيارات العضوية.',
    content_md: `## مقدمة\nهذا مقال تأسيسي رقم ${i + 1} في TrendAI Empire.\n## خطوات عملية\n- تحليل نية البحث\n- بناء هيكل H2/H3\n- تحسين العنوان والوصف\n### نصيحة تنفيذية\nركز على الفائدة أولاً ثم الكلمات المفتاحية.\n## FAQ\n### كيف أبدأ؟\nابدأ بكلمة مفتاحية منخفضة المنافسة.`,
    cover_image_url: `https://picsum.photos/seed/starter-${i + 1}/1200/630`,
    category: i % 2 === 0 ? 'AI Marketing' : 'Make Money Online',
    keywords: ['seo', 'ai', 'trendai'],
    meta_description: 'دليل تطبيقي لبناء مقالات SEO قوية ومتوافقة مع Google.',
    faq_json: [
      { question: 'ما الهدف من المقال؟', answer: 'تسريع نمو الزيارات العضوية بشكل منهجي.' },
      { question: 'هل يصلح للمبتدئين؟', answer: 'نعم، الخطوات مرتبة وقابلة للتطبيق الفوري.' }
    ],
    published_at: dayjs().subtract(i, 'day').toISOString()
  };
}

async function main() {
  const articles = Array.from({ length: 15 }).map((_, i) => buildArticle(i));
  const { error } = await supabase.from('articles').upsert(articles, { onConflict: 'slug' });
  if (error) throw error;
  console.log('Seeded 15 starter articles.');
}

main();
