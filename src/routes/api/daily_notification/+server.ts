import nodemailer from 'nodemailer';
import { PRIVATE_EMAIL_USER, PRIVATE_EMAIL_PASS } from '$env/static/private';

import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_URL, PRIVATE_NOTIFICATION_KEY } from '$env/static/private';

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);

export async function POST({ request }) {
    const authHeader = request.headers.get('Authorization');

    	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return new Response(
			JSON.stringify({ error: 'Missing or invalid Authorization header' }),
			{ status: 401 }
		);
	}

	// Extract the token
	const token = authHeader.substring('Bearer '.length);

	// Check if token is valid
	if (token !== PRIVATE_NOTIFICATION_KEY) {
		return new Response(
			JSON.stringify({ error: 'Invalid token' }),
			{ status: 403 }
		);
	}

    // initalizie nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: PRIVATE_EMAIL_USER,
            pass: PRIVATE_EMAIL_PASS
        }
    });

    // get all users
    const { data: users } = await supabaseAdmin
        .from("users")
        .select("id, email")

    // TODO: REMOVE IN PRODUCTION
    users?.filter((user) => user.email == 'web.insitesolutions@gmail.com');

    // for each user find private_chats where they exist and LastRead != lastMessage
    users?.forEach(async (user) => {

        // initialize array of unread users
        let unreads: string[] = []
        console.log('Current user: ', user);

        const { data: chats } = await supabaseAdmin
            .from("private_chats")
            .select("*")
            .or(`user1.eq.${user.id},user2.eq.${user.id}`);

        console.log(chats);

        // Add unread users
        chats?.forEach(async (chat) => {
            if (user.id == chat.user1 && chat.user1LastRead != chat.lastMessage) {
                unreads.push(chat.user2);
            } else if (user.id == chat.user2 && chat.user2LastRead != chat.lastMessage) {
                unreads.push(chat.user1);
            }
        });

        // Construct email body
        let emailBody = `You have ${unreads.length} unread messages from: \n`
        unreads.forEach((unreadUser)=>{
            emailBody += `${unreadUser}\n`
        });

        console.log(emailBody);

        try {
            await transporter.sendMail({
                from: PRIVATE_EMAIL_USER,
                to: user.email,
                subject: 'Unread Messages: Golfing with You',
                text: emailBody
            });

            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } catch (err) {
            if (err instanceof Error) {
                return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
            }
            return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500 });
        }
    })

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
