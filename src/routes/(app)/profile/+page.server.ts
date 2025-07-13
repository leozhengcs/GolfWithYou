import type { PageServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_URL } from '$env/static/private';


const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);


export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            profile: null,
            error: "User not authenticated"
        };
    }

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error("Error fetching profile: ", error);
        return { profile: null, error: error };
    }

    return { profile: data, error: null };
}

export const actions: Actions = {

    default: async ({ request, locals: { supabase } }) => {


        const formData = await request.formData()
        const fullName = formData.get('fullName') as string
        const email = formData.get('email') as string
        const gender = formData.get('gender') as string
        const bio = formData.get('bio') as string
        
        console.log("here:   ")

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return {
                profile: null,
                error: "User not authenticated"
            };
        }

        console.log("fd: ", formData);
        console.log("hihu  ", user.id);


        const { data, error } = await supabaseAdmin
            .from('users')
            .update({ full_name: fullName, email: email, gender: gender, bio: bio })
            .eq('id', user.id);  // or another unique identifier

        if (error) {
            console.log("ERROR: ", error);
        }

        throw redirect(303, '/profile');
    }
}