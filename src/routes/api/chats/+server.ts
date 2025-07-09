import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  const supabase = locals.supabase;

  // Get authenticated user
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { otherUserId } = await request.json();

  if (!otherUserId) {
    return json({ error: 'Missing otherUserId' }, { status: 400 });
  }

  const currentUserId = user.id;

  // Check if chat already exists
  const { data: existing, error: existingError } = await supabase
    .from('private_chats')
    .select('id')
    .or(
      `and(user1.eq.${currentUserId},user2.eq.${otherUserId}),and(user1.eq.${otherUserId},user2.eq.${currentUserId})`
    )
    .maybeSingle();

  if (existingError) {
    return json({ error: existingError.message }, { status: 500 });
  }

  if (existing) {
    return json({ chatId: existing.id });
  }

  // Create new chat
  const { data: newChat, error: insertError } = await supabase
    .from('private_chats')
    .insert([{ user1: currentUserId, user2: otherUserId }])
    .select()
    .single();

  if (insertError) {
    return json({ error: insertError.message }, { status: 500 });
  }

  return json({ chatId: newChat.id }, { status: 201 });
};
