import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
	locals: { safeGetSession, supabase },
	cookies,
	depends
}) => {
	depends('supabase:auth');
	const { session } = await safeGetSession();

	return {
		session,
		cookies: cookies.getAll()
	};
};
