import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_URL } from '$env/static/private';

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);

export const POST: RequestHandler = async ({ request, locals }) => {
	const supabase = locals.supabase;

	const {
		data: { user },
		error: authError
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { fileName } = await request.json();

	const { error } = await supabaseAdmin.storage.from(`user-images`).remove([fileName]);

	if (error) {
		console.log(error);
		return json({ message: 'Error deleting image, please try again later.' }, { status: 500 });
	}

	return json({ message: 'Successfully removed image' }, { status: 201 });
};
