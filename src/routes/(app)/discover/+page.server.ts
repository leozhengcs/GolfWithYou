import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({ locals: { supabase }}) => {
    const { data, error } = await supabase
        .from('public_user_profile')
        .select('*');

    // Policy States can only read own row
    const userQuery = await supabase
        .from('users')
        .select('*')
        .single();

    if (userQuery.error) {
        console.error("Error fetching user profile ", userQuery.error);
        return { user: null, users: [] }
    }

    if (error) {
        console.error("Error fetching users: ", error);
        return { user: userQuery.data, users: [] }
    }

    return {
        user: userQuery.data,
        users: data
    };
}