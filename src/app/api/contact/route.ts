import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
  }

  const smtpHost = process.env.EMAIL_HOST;
  const smtpPort = Number(process.env.EMAIL_PORT || '587');
  const smtpUser = process.env.EMAIL_USER;
  const smtpPass = process.env.EMAIL_PASS;
  const mailFrom = process.env.EMAIL_FROM || smtpUser;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    return NextResponse.json(
      {
        error:
          'Email transport is not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS in your environment.',
      },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailTo = 'adriel.dev.123@gmail.com';

  try {
    await transporter.sendMail({
      from: `FoldGo Contact <${mailFrom}>`,
      to: mailTo,
      replyTo: email,
      subject: `FoldGo inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: system-ui, sans-serif; color: #0f172a;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap;">${message}</div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return NextResponse.json({ error: 'Unable to send email at this time.' }, { status: 500 });
  }
}
