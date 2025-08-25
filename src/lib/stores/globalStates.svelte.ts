import type { RealtimeChannel } from "@supabase/supabase-js";
import { writable } from "svelte/store";

export const globalState = writable({
    class: ""
});

export const unreadMap = writable<Record<string, boolean>>({});
export const chatMap = writable<Record<string, RealtimeChannel>>({});
