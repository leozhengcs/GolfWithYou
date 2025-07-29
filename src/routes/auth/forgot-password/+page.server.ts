export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = (formData.get('email') as string).trim();

        if (!email) {
            return { error: "Please provide a valid email" };
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:5173/auth/reset-password"
        })
        
        if (error) {
            return { error: "Error sending password confirmation email, please try again later."};
        }
        
        return { data: "Reset email sent, please check your email"};
    }
}