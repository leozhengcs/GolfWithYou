import type { Actions } from './$types';

export const actions: Actions = {
    send: async ({ request, locals }) => {
        const formData = await request.formData();
        const content = formData.get('content') as string;
        const recipient_id = formData.get('recipient_id') as string;

        const { error } = await supabase.from('messages').insert({
        sender_id: user?.id,
        recipient_id,
        content
        });

        if (error) {
        return { error: 'Failed to send message.' };
        }

        return { success: true };
    }
};
