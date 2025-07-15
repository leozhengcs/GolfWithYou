import type { RequestHandler } from "@sveltejs/kit"
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    const { receiver_id, text } = await request.json();
    const { data: { user }, error: userError } =  await supabase.auth.getUser();

    if (!receiver_id) {
        return json({ error: "Missing receiver id "}, { status: 400 });
    }

    if (userError) {
        return json({ error: "Error fetching user " }, { status: 401 });
    }

    const { data, error } = await supabase.from('friend_requests').insert([{
        sender_id: user?.id,
        receiver_id,
        status: 'pending',
        context: text
    }]);

    // console.log(error);

    if (error) {
        return json({ error: "Error making friend request, please try again later." }, { status: 500 });
    }

    // console.log("Server Data: ", data);
    return json({ data: "Sent Friend Request", error: null }, { status: 200 });
}