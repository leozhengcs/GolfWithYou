import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from "$env/static/private"

// const EMAILUSER = EMAIL_USER
// const EMAILPASS = EMAIL_PASS


/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const { to, subject, text } = await request.json();
  console.log('EMAIL_USER:', EMAIL_USER);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      text
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
  }
}
