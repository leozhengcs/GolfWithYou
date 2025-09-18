import { writable } from 'svelte/store';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { Notification } from '$lib/types/Chat';

export type ChatState = {
	channel: RealtimeChannel;
	status: 'pending' | 'subscribed' | 'closed' | 'error';
	lastMessage: string | null;
	lastSenderId: string | null;
	unread: boolean;
	updatedAt: number;
};

export const globalState = writable({
	class: ''
});

// DEPRECATED OLD STORES
export const unreadMap = writable<Record<string, boolean>>({});
export const chatMap = writable<Record<string, ChatState>>({});
export const openedModal = writable<string | null>(null);

export const unread = writable(0);
export const notifications = writable<Notification[]>([]);