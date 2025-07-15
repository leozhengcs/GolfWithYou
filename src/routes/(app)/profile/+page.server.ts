import type { PageServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_URL } from '$env/static/private';


const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);


export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            profile: null,
            error: "User not authenticated"
        };
    }

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error("Error fetching profile: ", error);
        return { profile: null, error: error };
    }

    return { profile: data, error: null };
}

export const actions: Actions = {
/* 
  <input type="hidden" name='fullName' bind:value={full_name}/> 
  <input type="hidden" name='dob' bind:value={dob}/>
  <input type="hidden" name='clubName' bind:value={club_name}/>
  <input type="hidden" name='handicapIndex' bind:value={handicap_index}/>  
  <input type="hidden" name='postalCode' bind:value={postal_code}/>  
  <input type="hidden" name='phone' bind:value={phone}/>  
  <input type="hidden" name='gender' bind:value={gender}/> 
  <input type="hidden" name='otherGender' bind:value={other_gender}/> 
  <input type="hidden" name='golfID' bind:value={golf_id}/> 
  <input type="hidden" name='email' bind:value={email}/> 
  <input type="hidden" name='bio' bind:value={bio}>
*/
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const fullName = formData.get('fullName') as string
        const dob = formData.get('dob') as string
        const clubName = formData.get('clubName') as string
        const handicapIndex = formData.get('handicapIndex') as string
        const postalCode = formData.get('postalCode') as string
        const phone = formData.get('phone') as string
        const otherGender = formData.get('otherGender') as string
        const golfID = formData.get('golfID') as string
        const email = formData.get('email') as string
        const gender = formData.get('gender') as string
        const bio = formData.get('bio') as string


        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return {
                profile: null,
                error: "User not authenticated"
            };
        }

        console.log("fd: ", formData);
        // console.log("hihu  ", user.id);


        const { data, error } = await supabaseAdmin
            .from('users')
            .update({ 
                full_name: fullName, 
                email: email, 
                gender: gender, 
                bio: bio, 
                dob: dob, 
                club_name: clubName,
                handicap_index: handicapIndex,
                postal_code: postalCode,
                phone: phone,
                other_gender: otherGender,
                golf_id: golfID
            })
            .eq('id', user.id);  // or another unique identifier

        if (error) {
            console.log("ERROR: ", error);
        }

        throw redirect(303, '/profile');
    }
}