<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Tooltip from './Tooltip.svelte';
	import { onMount } from 'svelte';

	let showNav: boolean = $state(false);

	onMount(() => {
		showNav = true;
	});

	let { profile = null } = $props();
</script>

{#if showNav}
	<nav
		class="absolute top-0 left-0 z-50 flex h-[100px] w-full select-none flex-row items-center justify-between p-5 px-20 bg-transparent"
		in:fade={{ duration: 500 }}
	>
		<button
			class="flex cursor-pointer flex-row items-center justify-center gap-2"
			onclick={() => goto('/discover')}
		>
			<div class="w-16">
				<img src="/icons/Logo.png" alt="" />
			</div>
			<a href="/discover" class="font-fugaz text-center text-2xl text-white">Tees Away</a>
		</button>
		<div class="flex justify-between gap-10">
			{#if profile}
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
			{:else}
				<button class="text-xl font-bold text-white cursor-pointer hover:-translate-y-1 duration-300" onclick={() => goto('/auth/signup')}>Sign up</button>
				<button class='text-xl font-bold rounded-full cursor-pointer bg-white p-2 px-4 hover:-translate-y-1 duration-300'>Log In</button>
			{/if}
		</div>
	</nav>
{/if}
