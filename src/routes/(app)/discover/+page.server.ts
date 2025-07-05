import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({ locals: { supabase }}) => {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        console.error("Error fetching users: ", error);
        return { users: [] }
    }

    return {
        users: data
    };
}