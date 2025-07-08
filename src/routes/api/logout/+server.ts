import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals }) => {
    const { error } = await locals.supabase.auth.signOut();

    if (error) {
        return new Response(JSON.stringify({ error: "Error logging out, please try again later." }), { status: 500 });
    }

    return new Response(null, {
        status: 300,
        headers: {
            location: '/'
        }
    });
}