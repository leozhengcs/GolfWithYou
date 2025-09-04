import { writable } from "svelte/store";

// Keeps track of a list of user uids
export const onlineUsers = writable<string[]>([]);
