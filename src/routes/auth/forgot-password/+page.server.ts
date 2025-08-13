export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = (formData.get('email') as string).trim();

        if (!email) {
            return { error: "Please provide a valid email" };
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email)
        
        if (error) {
            console.log(error);
            return { error: "Error sending password confirmation email, please try again later."};
        }
        
        return { data: "We've sent you a password reset link! Please check your inbox (and spam folder) within 15 minutes."};
    }
}