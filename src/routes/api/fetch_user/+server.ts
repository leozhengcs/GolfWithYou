import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .single();

    if (error) {
        return json({ error: "Error fetching user informaiton." }, { status: 500 });       
    }

    return json({ user: data }, { status: 200 });
}