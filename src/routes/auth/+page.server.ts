import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const gender = formData.get('gender') as string
    const otherGender = formData.get('otherGender') as string
    const dob = formData.get('dob') as string
    const phone = formData.get('phone') as string
    const postalCode = formData.get('postalCode') as string
    const ethnicity = formData.get('ethnicity') as string
    const otherEthnicity = formData.get('otherEthnicity') as string
    const clubName = formData.get('clubName') as string
    const handicapIndex = formData.get('handicapIndex') as string
    const golfId = formData.get('golfId') as string

    console.log("IN SIGNUP")

    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    }

    const insert = await supabase.from('users').insert([{ 
        id: data?.user?.id, 
        fullName,
        gender, 
        otherGender, 
        dob, 
        phone, 
        postalCode,
        ethnicity,
        otherEthnicity,
        clubName,
        handicapIndex,
        golfId,
        verified: false
    }]);

    if (insert.error) {
        console.log("ERROR: ", insert.error);
    }

    redirect(303, '/');
  },
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    } else {
      redirect(303, '/private')
    }
  },
}