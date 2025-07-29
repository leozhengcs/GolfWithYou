import type { RequestHandler } from "@sveltejs/kit";
import { createClient } from '@supabase/supabase-js';
import { PRIVATE_SUPABASE_URL } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);

// Access auth admin api
const adminAuthClient = supabaseAdmin.auth.admin

export const POST: RequestHandler = async ({ locals: { supabase } }) => {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "Error deleting user, please try again later." }), { status: 500 });
    }

    const { data, error } = await adminAuthClient.deleteUser(user.id)

    if (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Error deleting user, please try again later." }), { status: 500 });
    }

    await supabase
        .from('users')
        .delete()
        .eq('id', user.id);

    return new Response(null, {
        status: 300,
        headers: {
            location: '/'
        }
    });
}

// import type { RequestHandler } from "@sveltejs/kit";
// import { createClient } from '@supabase/supabase-js';
// import { PRIVATE_SUPABASE_URL } from "$env/static/private";
// import { PUBLIC_SUPABASE_URL } from "$env/static/public";

// const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_URL);

// // Access auth admin api
// const adminAuthClient = supabaseAdmin.auth.admin

// export const POST: RequestHandler = async ({ locals: { supabase } }) => {

//     let userID = ''

//     try {
//         const { data: { user }, error } = await supabase.auth.getUser();
//         if (error) {
//             throw new Error(error.message);
//         }

//         if (!user) {
//             return new Response(JSON.stringify({ error: "Error deleting user, please try again later." }), { status: 500 });
//         }

//         userID = user.id

//     } catch {
//         return new Response(JSON.stringify({ error: "Error deleting user, please try again later." }), { status: 500 });
//     }

//     try {
//         const { data, error } = await adminAuthClient.deleteUser(userID)
//         if (error) {
//             console.log(error);
//             throw new Error(error.message);
//         }
//     } catch {
//         return new Response(JSON.stringify({ error: "Error deleting user, please try again later." }), { status: 500 });
//     }

//     try {
//         const { error } = await supabase
//             .from('users')
//             .delete()
//             .eq('id', userID);
//         if (error) {
//             throw new Error(error.message);
//         }
//     } catch {
//         console.log('database error');
//         return new Response(JSON.stringify({ error: "Error deleting user, please try again later." }), { status: 500 });
//     }

//     return new Response(null, {
//         status: 300,
//         headers: {
//             location: '/'
//         }
//     });
// }