/*
const formData = new FormData();
formData.append('image', imageFile);
formData.append('type', "avatar") <----

const res = await fetch('/api/uploadImage', {
    method: 'POST',
    body: formData
});

each call has a type, only avatar images uploading is set up right now
use the else block for handling other user images

*/


// src/routes/api/messages/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
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

    const body = await request.formData();
    const image = body.get('image') as File;
    const type = body.get('type') as string;

    if (!type.trim()) {
        return json({ error: 'Missing image type.' }, { status: 400 });
    }

    if (type == "avatar") {
        const filePath = `avatar/${user.id}`;

        const { error: uploadError } = await supabase.storage
            .from('user-images')
            .upload(filePath, image, { upsert: true });

        if (uploadError) {
            return json({ error: uploadError.message }, { status: 500 });
        }

        const { data: urlData } = supabase.storage
            .from('user-images')
            .getPublicUrl(filePath);

        const { data, error } = await supabaseAdmin
            .from('users')
            .update({ avatar_url: urlData.publicUrl })
            .eq('id', user.id);

        if (error) {
            return json({ error: error.message }, { status: 500 });
        }

        return json(data, { status: 201 });

    } else {
        //add other handling here

    }
    const data = "not avatar"


    return json(data, { status: 201 });
};
