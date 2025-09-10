import type { UserProfile } from "$lib/types/Database";

export const navbarState: { show: boolean, user: UserProfile | null } = $state({
    show: true,
    user: null
});