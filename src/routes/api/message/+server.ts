// src/routes/api/messages/+server.ts
/*
  GET Endpoint - Must pass in a `chatId` query parameter which then fetches the messages based on if the user is authenticated.
  POST Endpoint - Inserts a message into the messages table by providing the `chat_id` and message `content`.
*/  
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
  const supabase = locals.supabase;
  const chatId = url.searchParams.get('chatId');

  if (!chatId) {
    return json({ error: 'Missing chatId' }, { status: 400 });
  }

  const { data: user, error: authError } = await supabase.auth.getUser();
  if (authError || !user.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at');

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json(data);
};

export const POST: RequestHandler = async ({ request, locals }) => {
  const supabase = locals.supabase;

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { chat_id, content } = body;

  if (!chat_id || !content || !content.trim()) {
    return json({ error: 'Missing chat_id or content' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        chat_id,
        sender_id: user.id,
        content: content.trim()
      }
    ])
    .select()
    .single();

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }
  
  return json(data, { status: 201 });
};
