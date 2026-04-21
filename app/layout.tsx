import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'TrendAI Empire',
  description: 'منصة ذكاء اصطناعي لاكتشاف الترندات وصناعة محتوى SEO تلقائيًا.',
  openGraph: {
    title: 'TrendAI Empire',
    description: 'Smart autonomous SEO publishing engine.',
    images: ['/og-default.png'],
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
