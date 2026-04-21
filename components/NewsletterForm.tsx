'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function subscribe() {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    setMessage(response.ok ? 'تم الاشتراك بنجاح ✅' : 'حدث خطأ، تحقق من البريد.');
  }

  return (
    <div className="card">
      <h3>Newsletter Growth Engine</h3>
      <p>استقبل أهم الترندات وخطط المحتوى يوميًا.</p>
      <input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="btn" style={{ marginTop: 8 }} onClick={subscribe}>اشترك الآن</button>
      {message && <p>{message}</p>}
    </div>
  );
}
