import EmailTemplate from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Team Ariztegui <onboarding@resend.dev>',
      to: ['team.ariztegui@gmail.com'],
      subject: 'Hello i like you web site',
      react: EmailTemplate({ firstName: 'Jorge' }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
