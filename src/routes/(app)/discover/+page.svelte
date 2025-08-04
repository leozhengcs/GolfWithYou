<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import { onMount } from 'svelte';
	import { toast } from "svelte-sonner";
  	import { page } from "$app/state";
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database.js';
	import { previewData } from '$lib/stores/previewData.svelte.js';

	let scrollContainer: HTMLElement;
	let isDown = $state(false);
	let startX = $state(0);
	let scrollLeft = $state(0);

	let { data } = $props();
	let { user, users }: { user: UserProfile | null, users: PublicUserProfile[] } = $derived(data);

	let otherUsers: PublicUserProfile[] = $state([]);

	onMount(() => {
		// Check for messages
		// if (previewData && Object.keys(previewData).length) {
		// 	const keys = Object.keys(previewData);
		// 	keys.forEach((key) => {
		// 	});
		// }

		otherUsers = users.filter((u) => u.id !== user?.id);

		// Remind users w/o avatar to upload one
		if (page.url.searchParams.get('avatar') == 'false') {
			toast.info("No User Avatar Image", {
				description: "Please set an avatar photo in your profile."
			});
		}
	});
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
	<div class="flex w-full flex-row justify-center md:justify-normal items-center gap-10 flex-wrap">
		{#each otherUsers as otherUser}
			<UserCard user={otherUser} self={user!}/>
		{/each}
	</div>
	<!-- <section>
		<h1 class="text-3xl">Trending in Golf</h1>
	</section> -->
</div>
