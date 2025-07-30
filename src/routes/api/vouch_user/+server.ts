import type { RequestHandler } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import { PRIVATE_SUPABASE_URL } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {

    const { data: { user } } = await supabase.auth.getUser();

    const body = await request.json()

    if (!user) {
        return new Response(JSON.stringify({ error: "Error vouching user, please try again later." }), { status: 500 });
    }

    const { data, error } = await supabaseAdmin.from('users')
			.update({ 
				verified: true,
				verified_by: body.self.id
			})
			.eq('id', body.id)

    if (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Error vouching user, please try again later." }), { status: 500 });
    }

    return new Response(null, {
        status: 300,
        headers: {
            location: '/'
        }
    });
}