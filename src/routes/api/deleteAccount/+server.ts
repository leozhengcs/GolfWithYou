import type { RequestHandler } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import { PRIVATE_SUPABASE_URL } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);

// Access auth admin api
const adminAuthClient = supabaseAdmin.auth.admin

export const POST: RequestHandler = async ({ locals: { supabase }}) => {
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        return new Response(JSON.stringify({ error: "Error deleting user, please try again later." }), { status: 500 });
    }

    const { data, error } = await adminAuthClient.deleteUser(user.id)
    
    if (error) {
        return new Response(JSON.stringify({ error: "Error deleting user, please try again later." }), { status: 500 });
    }
    
    return new Response(null, {
        status: 300,
        headers: {
            location: '/'
        }
    });
}