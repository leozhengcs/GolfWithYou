// Needed for hooks
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals: { supabase }}) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .single();

    if (error) {
        return { error: "Error fetching user" };
    }

    return { profile: data };
}