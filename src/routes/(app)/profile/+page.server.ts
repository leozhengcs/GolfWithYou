import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            data: null,
            error: "User not authenticated"
        };
    }

    const { data, error }= await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error("Error fetching profile: ", error);
        return { data: null, error: error };
    }

    return { user: data, error: null };
}