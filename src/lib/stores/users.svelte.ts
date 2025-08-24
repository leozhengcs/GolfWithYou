import { writable } from "svelte/store";

export const onlineUsers = writable<string[]>([]);
