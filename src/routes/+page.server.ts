import { redirect } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { Actions } from './$types';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_URL } from '$env/static/private';
import { previewData } from '$lib/stores/previewData.svelte';

// TEMPORARY SOLUTION

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);

export const actions: Actions = {
	default: async ({ fetch, request, locals: { supabase } }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		// const confirmPassword = formData.get('confirmPassword') as string
		const gender = formData.get('gender') as string;
		const otherGender = formData.get('otherGender') as string;
		const phone = formData.get('phone') as string;
		const postalCode = formData.get('postalCode') as string;
		const clubName = formData.get('clubName') as string;
		const handicapIndex = Number(formData.get('handicapIndex') as string);
		const golfId = Number(formData.get('golfId') as string);
		const profileImage = formData.get('profileImage') as File;

		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error) {
			console.error(error);
			redirect(303, '/auth/error');
		}

		const insert = await supabaseAdmin.from('users').insert([
			{
				id: data?.user?.id,
				email,
				full_name: fullName,
				gender,
				other_gender: otherGender || null,
				phone,
				postal_code: postalCode,
				club_name: clubName,
				handicap_index: handicapIndex,
				golf_id: golfId,
				verified: false
			}
		]);

		if (profileImage) {
			const imageData = new FormData();
			imageData.append('type', 'avatar');
			imageData.append('image', profileImage);
	
			const res = await fetch('/api/uploadImage', {
				method: 'POST',
				body: imageData
			});
	
			const imageUploadData = await res.json();
	
			if (!res.ok) {
				previewData.set({
					error: `Error uploading profile picture, please try again in the profile page. ${imageUploadData}`
				});
			}
		}

		if (insert.error) {
			console.log('ERROR: ', insert.error);
		}

		throw redirect(303, '/discover');
	}
};
