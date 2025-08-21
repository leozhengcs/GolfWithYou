import { redirect, error } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const { error: supabaseError } = await supabase.auth.signInWithPassword({ email, password });

		if (supabaseError) {
			console.error(supabaseError);
			error(401, {
				message: 'Invalid username/password',
			});
		}

		// Check if user has profile picture
		let hasAvatar = false;
		const { data, error: userError } = await supabase.from('users').select('*').single();

		if (!userError) {
			hasAvatar = data.avatar_url == null;
		}

		throw redirect(303, `/discover?avatar=${hasAvatar}`);
	}
};
