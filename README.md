# TrendAI Empire

منصة نشر محتوى ذكية مبنية على **Next.js 14**، تكتشف الترندات وتولد مقالات SEO وتقوم بالنشر التلقائي كل 8 ساعات.

## الميزات الأساسية
- تصميم Startup سريع ومتجاوب 100%.
- نظام اكتشاف ترندات يومي (تقنية + SEO + الربح من الإنترنت).
- توليد 3 مقالات تلقائيًا (1000-1500 كلمة) مع:
  - عنوان CTR عالي
  - Meta description
  - H2/H3
  - FAQ مناسب لـ Featured Snippets
- فلترة جودة داخلية قبل النشر.
- صفحات ديناميكية للمقالات.
- Schema FAQ + Open Graph.
- `sitemap.xml` و `robots.txt` تلقائيان.
- مناطق جاهزة لـ AdSense و Affiliate.
- Newsletter API.
- Vercel Cron للنشر التلقائي.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Supabase
- OpenAI API
- Vercel (Cron + Hosting)

## تشغيل المشروع محليًا
```bash
npm install
npm run dev
```

## متغيرات البيئة `.env.local`
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENAI_API_KEY=...
CRON_SECRET=super-secret-key
```

## إعداد قاعدة البيانات (Supabase)
1. افتح SQL Editor في Supabase.
2. نفّذ محتوى `scripts/schema.sql`.
3. لتعبئة 15 مقالة بداية:
```bash
npm run db:seed
```

## ربط AdSense
1. أنشئ حساب AdSense وفعّل الدومين.
2. أضف سكربت AdSense global في `app/layout.tsx`.
3. استبدل أماكن الإعلانات داخل `app/page.tsx` بوحدات AdSense الرسمية.

## ربط Google Search Console
1. أضف الموقع كـ Property في Search Console.
2. أضف TXT record للتحقق من ملكية الدومين.
3. أرسل `https://YOUR_DOMAIN/sitemap.xml`.
4. تابع Coverage وPerformance.

## النشر على Vercel (خطوة بخطوة)
1. ارفع المشروع على GitHub.
2. من Vercel اضغط New Project.
3. اختر المستودع.
4. أضف Environment Variables.
5. Deploy.
6. تحقق أن Cron مفعل من `vercel.json` وأن endpoint `/api/cron/publish` يتلقى الهيدر `x-cron-secret`.

## API النشر التلقائي
- المسار: `GET /api/cron/publish`
- الحماية: `x-cron-secret`
- ما الذي يحدث:
  1. اكتشاف الترندات
  2. تخزين الكلمات
  3. اختيار أفضل كلمات منخفضة المنافسة
  4. توليد المقالات + مراجعة جودة
  5. نشر حتى 3 مقالات

## ملاحظات مهمة للجودة
- استخدم دومين قوي وسرعة استضافة جيدة.
- تجنب spam وكرر تحسين prompts.
- راقب المقالات في Search Console أسبوعيًا.
