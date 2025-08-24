import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async({ locals: { supabase }}) => {

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('public_user_profile')
        .select('*');

    // Policy States can only read own row
    const userQuery = await supabase
        .from('users')
        .select('*')
        .single();

    const userChats = await supabase
        .from('private_chats')
        .select('*')
        .or(`user1.eq.${user?.id},user2.eq.${user?.id}`);


    if (userQuery.error) {
        console.error("Error fetching user profile ", userQuery.error);
        return { user: null, users: [] }
    }

    if (error) {
        console.error("Error fetching users: ", error);
        return { user: userQuery.data, users: [] }
    }

    
    // hide admin user
    const filteredData = data
    // .filter(user => user.id != 'bfe468f3-5c2b-4522-9ade-a38f45d0f305')

    return {
        user: userQuery.data,
        users: filteredData,
        userChats: userChats.data
    };
}