<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/state';
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database.js';
	import type { SupabaseClient } from '@supabase/supabase-js';

	let scrollContainer: HTMLElement;
	let isDown = $state(false);
	let startX = $state(0);
	let scrollLeft = $state(0);

	let { data } = $props();
	let {
		user,
		users,
		supabase
	}: { user: UserProfile | null; users: PublicUserProfile[]; supabase: SupabaseClient } =
		$derived(data);

	let otherUsers: PublicUserProfile[] = $state([]);

	onMount(() => {
		otherUsers = users.filter((u) => u.id !== user?.id);

		// Remind users w/o avatar to upload one
		if (page.url.searchParams.get('avatar') == 'false') {
			toast.info('No User Avatar Image', {
				description: 'Please set an avatar photo in your profile.'
			});
		}
	});
</script>

<div class="flex flex-col gap-10">
	<section class="flex flex-row justify-between">
		<h1 class="text-3xl font-fugaz text-yellow-400">Discover Other Users</h1>
	</section>
	<div class="flex w-full flex-row flex-wrap items-center justify-center gap-14 md:justify-between">
		{#each otherUsers as otherUser}
			<UserCard user={otherUser} self={user!} {supabase} />
		{/each}
		<div class="grow hidden md:block"></div>
	</div>
</div>
