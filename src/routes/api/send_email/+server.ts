import nodemailer from 'nodemailer';
import { PRIVATE_EMAIL_USER, PRIVATE_EMAIL_PASS, PRIVATE_SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';


export async function POST({ request }) {
  const { to, subject, text } = await request.json();
  // console.log('EMAIL_USER:', PRIVATE_EMAIL_USER);

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

  try {
    await transporter.sendMail({
      from: PRIVATE_EMAIL_USER,
      to: data.email,
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
