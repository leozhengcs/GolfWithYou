<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { onMount } from 'svelte';
	import { getAge } from '$lib/utils/date.js';
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database.js';

	let scrollContainer: HTMLElement;
	let isDown = $state(false);
	let startX = $state(0);
	let scrollLeft = $state(0);

	let { data } = $props();
	let { user, users }: { user: UserProfile | null, users: PublicUserProfile[] } = $derived(data);

	let otherUsers: PublicUserProfile[] = $state([]);

	onMount(() => {
		otherUsers = users.filter((u) => u.id !== user?.id);
	})
</script>

<div class="flex flex-col gap-10">
	<section class="flex flex-row justify-between">
		<h1 class="text-3xl">Discover Other Users</h1>
		<!-- <div class="flex flex-row items-center justify-center">
			<div class="w-8">
				<img src="/icons/Tune.png" alt="" />
				</div>
				<span>Filter</span>
				</div> -->
			</section>
	<div class="flex w-full flex-row gap-10 overflow-x-auto">
		{#each otherUsers as otherUser}
			<UserCard user={otherUser} self={user!}/>
		{/each}		
	</div>
	<section>
		<h1 class="text-3xl">Trending in Golf</h1>
	</section>
</div>
