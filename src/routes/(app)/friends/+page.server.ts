import type { PageServerLoad } from "./$types";
import type { UserProfile, FriendRequest } from "$lib/types/Database";

export const load: PageServerLoad = async ({ locals: { supabase }}) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .single();

    if (error) {
        console.error('Error fetching user profile: ', error);
        return { user: null }
    }

    let friends: UserProfile[] = [];

    if (data.friends) {
        for (const userId of data.friends) {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();
        
            if (error) continue;
    
            friends.push(data);
        }
    }

    // Get friend requests
    let requests: FriendRequest[] = [];
    const requestQuery = await supabase
        .from('friend_requests')
        .select('*');

    if (requestQuery.error) {
        console.error("Error fetching user friend requests: ", requestQuery.error);
    }

    if (requestQuery.data) {
        for (const request of requestQuery.data) {
            // Grab the sender avatar
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', request.sender_id)
                .single();

            requests.push({
                avatar_url: data.avatar_url as string,
                context: request.context as string,
                sender_id: request.sender_id as string,
                receiver_id: request.receiver_id as string,
                sender_name: data.full_name as string,
            });
        }
    }


    return { user: data, friends, requests };
}