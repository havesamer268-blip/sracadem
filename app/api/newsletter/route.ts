import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveSubscriber } from '@/lib/db';

const schema = z.object({
  email: z.string().email()
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  await saveSubscriber(parsed.data.email);
  return NextResponse.json({ ok: true });
}
