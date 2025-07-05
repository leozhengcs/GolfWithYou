import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            profile: null,
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
        return { profile: null, error: error };
    }

    return { profile: data, error: null };
}