<script lang="ts">
	import { goto } from '$app/navigation';
	import { chatMap, unreadMap } from '$lib/stores/globalStates.svelte';
	import { onlineUsers } from '$lib/stores/users.svelte';
	import { fade } from 'svelte/transition';
	import Tooltip from './Tooltip.svelte';
	import { onMount } from 'svelte';

	let showNav: boolean = $state(false);

	onMount(() => {
		showNav = true;
	});

	let { profile } = $props();
	// onclick={()=>{console.log($onlineUsers);
	//   console.log('UnreadMap:\n', $unreadMap);
	// 	 console.log('chatMap:\n', $chatMap);}}
</script>

{#if showNav}
	<nav
		class="from-sky absolute top-0 z-50 flex h-[100px] w-full flex-row items-center justify-between bg-gradient-to-b to-transparent p-5"
		in:fade={{ duration: 1500 }}
	>
		<button class="cursor-pointer flex flex-row gap-2 items-center justify-center" onclick={() => goto('/discover')}>
			<div class='w-15'>
				<img src="/icons/Logo.png" alt="" />
			</div>
			<a href="/discover" class="font-fugaz text-center text-3xl text-white">Tees Away</a>
		</button>
		<div class="flex flex-row gap-10">
			<Tooltip text="View Profile">
				<button
					onclick={() => goto('/profile')}
					class="flex aspect-square w-12 cursor-pointer items-end justify-center overflow-clip rounded-full bg-white transition-shadow duration-300 hover:shadow-xl hover:brightness-110"
				>
					<img
						src={(profile && profile.avatar_url) || '/icons/DefaultProfile.png'}
						alt=""
						class={`${profile && profile.avatar_url ? 'h-full w-full' : 'h-10 w-10'} object-cover object-center`}
					/>
				</button>
			</Tooltip>
		</div>
	</nav>
{/if}
