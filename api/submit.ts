import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

function clean(value: unknown, max: number): string {
  return String(value ?? '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, max);
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO_EMAIL;
  const contactFrom = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

  if (!apiKey || !contactTo) {
    res.status(500).json({ error: 'Server email configuration is incomplete.' });
    return;
  }

  const body = (req.body ?? {}) as ContactPayload;
  const name = clean(body.name, 120);
  const email = clean(body.email, 180);
  const message = clean(body.message, 5000);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    res.status(400).json({ error: 'Please provide a valid name, email and message.' });
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: contactFrom,
        to: [contactTo],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
            <h2>New portfolio message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="white-space:pre-wrap;padding:14px;background:#f5f5f5;border-radius:8px">${message}</div>
          </div>`,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Resend error:', response.status, errorBody);
      res.status(502).json({ error: 'Email provider rejected the message.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error: unknown) {
    console.error('Email request error:', error);
    res.status(500).json({ error: 'Unable to deliver the message.' });
  }
}
