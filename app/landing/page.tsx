import Link from 'next/link';
import { NewsletterForm } from '@/components/NewsletterForm';

export default function LandingPage() {
  return (
    <main className="container grid">
      <section className="hero">
        <h1>ضاعف زياراتك العضوية مع TrendAI Empire</h1>
        <p>محرك نشر تلقائي: اكتشاف ترندات + مقالات احترافية + نشر مستمر كل 8 ساعات.</p>
        <Link href="/" className="btn">ابدأ الآن</Link>
      </section>
      <NewsletterForm />
    </main>
  );
}
