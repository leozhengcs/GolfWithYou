import nodemailer from 'nodemailer';
import { PRIVATE_EMAIL_USER, PRIVATE_EMAIL_PASS, PRIVATE_SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

/**
 * `subject` is in HTML.
 */
export async function POST({ request }) {
  const { to, subject, text } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: PRIVATE_EMAIL_USER,
      pass: PRIVATE_EMAIL_PASS
    }
  });

  const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL)
  const { data } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', to)
    .single()

  const WEBSITE_URL = 'https://teesaway.com';

  try {
    await transporter.sendMail({
      from: PRIVATE_EMAIL_USER,
      to: data.email,
      subject,
      text: `
      'You have a new message:'

      "${text}"

      To view your message, please visit: ${WEBSITE_URL}. 

      Thank you,
      Teesaway Team
      `,
      html: `
      <p>Hello,</p>

		  <p>You've received a new message:</p>

		  <blockquote style="border-left: 4px solid #ccc; padding-left: 10px;">
        ${text}
      </blockquote>

      <p style="margin-top: 20px;">
      <a href="https://teesaway.com" 
        style="background-color:#3a5a40;color:white;padding:10px 16px;text-decoration:none;border-radius:6px;">
        View Message
      </a>
      </p>

      <p>Thank you,<br>Teesaway Team</p>`
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
  }
}
