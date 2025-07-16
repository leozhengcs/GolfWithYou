import type { PageServerLoad } from "./$types";
import type { PublicUserProfile, UserProfile, FriendRequest } from "$lib/types/Database";

export const load: PageServerLoad = async ({ locals: { supabase }}) => {
    // const { data: { user } } = await supabase.auth.getUser();

    // if (!user) {
    //     console.error("Error fetching user");
    //     return { user: null };
    // }

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .single();

    const userId = data.id;

    if (error) {
        console.error('Error fetching user profile: ', error);
        return { user: null }
    }

    let friends: PublicUserProfile[] = [];

    if (data.friends) {
        for (const userId of data.friends) {
            const { data, error } = await supabase
                .from('public_user_profiles')
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
            // Grab the sender information
            const { data, error } = await supabase
                .from('public_user_profiles')
                .select('*')
                .eq('id', request.sender_id)
                .single<PublicUserProfile>();

            if (error) {
                console.log("Error getting sender profile");
                continue;
            }

            if (request.receiver_id == userId) {
                requests.push({
                    sender: data,
                    request_id: request.id,
                    context: request.context as string,
                    receiver_id: request.receiver_id as string,
                });
            }
        }
    }

    return { user: data, friends, requests };
}