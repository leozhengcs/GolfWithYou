import type { RequestHandler } from "@sveltejs/kit"
import type { UserProfile } from "$lib/types/Database";
import { json } from "@sveltejs/kit";
import { createClient } from "@supabase/supabase-js";
import { PRIVATE_SUPABASE_URL } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

const adminClient = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);

export const POST: RequestHandler = async ({ request, locals: { supabase, user } }) => {
    const { request_id, receiver_id, sender } = await request.json();

    if (!request_id) {
        return json({ error: "Missing request id "}, { status: 400 });
    }

    if (!receiver_id) {
        return json({ error: "Missing receiver id" }, { status: 400 });
    }

    const { error } = await supabase
        .from('friend_requests')
        .delete()
        .eq('id', request_id);

        
    if (error) {
        return json({ error: "Error accepting friend request, please try again later." }, { status: 500 });
    }

    const currentFriends = Array.isArray(user?.friends) ? user.friends : [];

    const updatedFriends = currentFriends.includes(receiver_id)
    ? currentFriends
    : [...currentFriends, receiver_id];
    

    const { error: updateError } = await adminClient
        .from('users')
        .update({ friends: updatedFriends })
        .eq('id', user?.id);

    // Updating the sender's friends list
    const currentSenderFriends = Array.isArray(sender.friends) ? sender.friends : [];

    const updatedSenderFriends = currentSenderFriends.includes(user?.id)
    ? currentSenderFriends : [...currentSenderFriends, user?.id];

    const { error: updateErrorAnother } = await adminClient
        .from('users')
        .update({ friends: updatedSenderFriends })
        .eq('id', receiver_id);

    if (updateError || updateErrorAnother) {
        return json({ error: "Error accepting friend request, please try again later." }, { status: 500 });
    }

    return json({ data: "Friend Request Accepted", error: null }, { status: 200 });
}