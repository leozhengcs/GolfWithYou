<script lang="ts">
	import UserCard from '$lib/components/UserCard.svelte';
	import type { User } from '@supabase/supabase-js';
	import { onMount } from 'svelte';

	let scrollContainer: HTMLElement;
	let isDown = $state(false);
	let startX = $state(0);
	let scrollLeft = $state(0);

	let { data } = $props();
	let { user, users }: { user: User | null, users: User[] } = $derived(data);

	let otherUsers: User[] = $state([]);

	onMount(() => {
		otherUsers = users.filter((u) => u.id !== user?.id);
	})

	// const onMouseDown = (e: MouseEvent) => {
	//     isDown = true;
	//     scrollContainer.classList.add('cursor-grabbing');
	//     startX = e.pageX - scrollContainer.offsetLeft;
	//     scrollLeft = scrollContainer.scrollLeft;
	// }

	// const onMouseLeave = () => {
	//     isDown = false;
	//     scrollContainer.classList.remove('cursor-grabbing');
	// }

	// const onMouseUp = () => {
	//     isDown = false;
	//     scrollContainer.classList.remove('cursor-grabbing');
	// }

	// const onMouseMove = (e: MouseEvent) => {
	//     if (!isDown) return;
	//     e.preventDefault();
	//     const x = e.pageX - scrollContainer.offsetLeft;
	//     const walk = (x - startX) * 1.5 // Scroll Speed
	//     scrollContainer.scrollLeft = scrollLeft - walk;
	// }
</script>

<div class="flex flex-col gap-10">
	<section class="flex flex-row justify-between">
		<h1 class="text-3xl">Users near you</h1>
		<!-- <div class="flex flex-row items-center justify-center">
			<div class="w-8">
				<img src="/icons/Tune.png" alt="" />
			</div>
			<span>Filter</span>
		</div> -->
	</section>
	<div class="flex w-full flex-row gap-10 overflow-x-auto">

	</div>
	<section>
		<h1 class="text-3xl">Trending in Golf</h1>
	</section>
</div>
