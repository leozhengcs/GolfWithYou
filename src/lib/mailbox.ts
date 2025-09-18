// src/lib/mailbox.ts
import type { SupabaseClient } from '@supabase/supabase-js';

export function subscribeToMailbox(
	ownerId: string,
	supabase: SupabaseClient,
	onItem: (row: any) => void
) {
	console.log("Subscrbing to ownderID: ", ownerId)
	const channel = supabase
		.channel('mailbox:' + ownerId)
		.on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: 'mailbox',
			},
			(payload) => {
				onItem(payload.new);
			}
		)
		.subscribe((status) => {
			console.log("[status]: ", status);
		});

	return () => supabase.removeChannel(channel);
}

export async function sendMail(
	toUserId: string,
	kind: string,
	message: string,
	avatar: string,
	name: string,
	supabase: SupabaseClient
) {
	const {
		data: { user },
		error: authErr
	} = await supabase.auth.getUser();

	if (authErr || !user) throw new Error('Not authenticated');

	if (user.id === toUserId) {
		return { data: null, error: null };
	}

	console.log("from user id in chat: ", user.id)

	const { data, error } = await supabase.from('mailbox').insert({
		owner_id: toUserId,
		from_user_id: user.id,
		kind,
		from_name: name,
		body: message,
		from_avatar: avatar
	});

	if (error) console.error(error);

	return { data };
}
