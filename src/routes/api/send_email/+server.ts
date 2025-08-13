import nodemailer from 'nodemailer';
import { PRIVATE_EMAIL_USER, PRIVATE_EMAIL_PASS } from '$env/static/private';

// import { PRIVATE_EMAIL}

// const EMAILUSER = EMAIL_USER
// const EMAILPASS = EMAIL_PASS


/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const { to, subject, text } = await request.json();
  console.log('EMAIL_USER:', PRIVATE_EMAIL_USER);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: PRIVATE_EMAIL_USER,
      pass: PRIVATE_EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: PRIVATE_EMAIL_USER,
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
