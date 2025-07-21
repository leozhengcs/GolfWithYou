import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
        console.log(formData);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			console.error(error);
			throw redirect(303, '/auth/error');
		}

		// Check if user has profile picture
		let hasAvatar = false;
		const { data, error: userError } = await supabase
			.from('users')
			.select('*')
			.single();

		if (!userError) {
			hasAvatar = data.avatar_url == null;
		}

		throw redirect(303, `/discover?avatar=${hasAvatar}`);
	}
};
