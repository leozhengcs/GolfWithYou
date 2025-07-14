import { redirect } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js';
import type { Actions } from './$types'
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_URL } from '$env/static/private';

// TEMPORARY SOLUTION

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);

export const actions: Actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    // const confirmPassword = formData.get('confirmPassword') as string
    const gender = formData.get('gender') as string
    const otherGender = formData.get('otherGender') as string
    const dob = formData.get('dob') as string
    const phone = formData.get('phone') as string
    const postalCode = formData.get('postalCode') as string
    const clubName = formData.get('clubName') as string
    const handicapIndex = Number(formData.get('handicapIndex') as string)
    const golfId = Number(formData.get('golfId') as string)

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
    });
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    }

    const insert = await supabaseAdmin.from('users').insert([{ 
        id: data?.user?.id, 
        email,
        full_name: fullName,
        gender, 
        other_gender: otherGender || null, 
        dob, 
        phone, 
        postal_code: postalCode,
        club_name: clubName,
        handicap_index: handicapIndex,
        golf_id: golfId,
        verified: false
    }]);

    if (insert.error) {
      console.log("ERROR: ", insert.error);
    }

    throw redirect(303, '/discover');
  }
}