export default function DocsPage() {
  return (
    <main className="container grid">
      <section className="card">
        <h1>دليل التشغيل الكامل — TrendAI Empire</h1>
        <h2>1) ربط مفتاح الذكاء الاصطناعي</h2>
        <p>ضع OPENAI_API_KEY في ملف .env.local.</p>

        <h2>2) ربط AdSense</h2>
        <p>1. أنشئ حساب AdSense واربط الدومين.</p>
        <p>2. أضف script الإعلان في app/layout.tsx.</p>
        <p>3. استبدل مناطق AdSense placeholders بمعرفات الوحدات الحقيقية.</p>

        <h2>3) ربط Google Search Console</h2>
        <p>1. أضف Property جديدة.</p>
        <p>2. انسخ DNS TXT من Search Console إلى مزود الدومين.</p>
        <p>3. أرسل sitemap: /sitemap.xml.</p>

        <h2>4) النشر على Vercel خطوة بخطوة</h2>
        <p>1. ارفع المشروع إلى GitHub.</p>
        <p>2. من Vercel اختر New Project.</p>
        <p>3. أضف Environment Variables.</p>
        <p>4. Deploy وتأكد من Cron Jobs من vercel.json.</p>

        <h2>5) قاعدة البيانات</h2>
        <p>نفّذ scripts/schema.sql في Supabase SQL Editor ثم scripts/seed.ts لإدراج 15 مقالة بداية.</p>
      </section>
    </main>
  );
}
