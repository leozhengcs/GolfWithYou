import { writable } from "svelte/store";
import type { RealtimeChannel } from '@supabase/supabase-js';

export type ChatState = {
  channel: RealtimeChannel;
  status: 'pending'|'subscribed'|'closed'|'error';
  lastMessage: string | null;
  lastSenderId: string | null;
  unread: boolean;
  updatedAt: number;
};


export const globalState = writable({
    class: ""
});

export const unreadMap = writable<Record<string, boolean>>({});
export const chatMap = writable<Record<string, ChatState>>({});
export const openedModal = writable<string|null>(null);