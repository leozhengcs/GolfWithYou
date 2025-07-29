import { writable } from "svelte/store";

// This file is used to pass data between pages without using query parameters.
export const previewData = writable<{} | null>(null);