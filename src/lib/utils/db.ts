import type { SupabaseClient } from '@supabase/supabase-js';

// Given a supabase client and the target user ID, the function will return all their public featured images.
export const fetchFeaturedImages = async (supabase: SupabaseClient, userId: string) => {
	const { data, error } = await supabase.storage.from('user-images').list(userId, {
		limit: 100,
		offset: 0,
		sortBy: {
			column: 'name',
			order: 'asc'
		}
	});

	if (error) {
		throw new Error('Error fetching images, please try again later.');
	}

	// Filter out the .emptyFolderPlaceholder name
	return {
		data: data
			.filter((f) => f.name !== '.emptyFolderPlaceholder')
			.map(
				(f) =>
					supabase.storage.from('user-images').getPublicUrl(`${userId}/${f.name}`).data.publicUrl
			),
		message: 'User images successfully loaded.',
		status: 200
	};
};
