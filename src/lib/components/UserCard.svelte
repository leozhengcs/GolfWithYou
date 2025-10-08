<script lang="ts">
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import UserModal from './UserModal.svelte';
	import { onlineUsers } from '$lib/stores/users.svelte';
	import { notifications } from '$lib/stores/globalStates.svelte';

	let {
		user,
		self,
		supabase,
		unread
	}: {
		user: PublicUserProfile;
		self: UserProfile;
		supabase: SupabaseClient;
		unread: boolean;
	} = $props();

	let showUser = $state(false);
	let selectedTab = $state('profile');

	const closeModal = () => {
		showUser = false;
	};

	$effect(() => {
		if (showUser) {
			unread = false;
			notifications.update((list) => list.filter((n) => n.from_user_id !== user.id));
		}
		if (unread) {
			selectedTab = 'chat';
		}
	});
</script>

{#if showUser}
	<div class="absolute top-0 left-0 z-[70] h-full w-full items-center justify-center overflow-clip">
		<UserModal
			id={user.id}
			name={user.full_name}
			handicap_index={user.handicap_index}
			member={user.club_name}
			src={user.avatar_url ?? '/icons/DefaultProfile.png'}
			images={user.user_images_url}
			{closeModal}
			bio={user.bio}
			golf_id={user.golf_id}
			gender={user.gender}
			other_gender={user.other_gender}
			verified={user.verified}
			postal_code={user.postal_code}
			{self}
			{supabase}
			{onlineUsers}
			{selectedTab}
		/>
	</div>
{/if}

<button
	onclick={() => {
		showUser = true;
	}}
	class={`flex h-24 w-80 flex-shrink-0 transform cursor-pointer auto-rows-auto items-center justify-center rounded-2xl bg-[#B9C8B7] p-4 transition duration-200 hover:scale-105 md:grid md:h-76 md:w-60 ${
		$onlineUsers.includes(user.id) ? 'outline-6 outline-green-500' : ''
	}`}
>
	<div class="relative flex h-full w-full flex-row gap-5 md:block">
		{#if unread}
			<span
				class="absolute -top-4 -right-4 h-4 w-4 rounded-full border border-white bg-red-500 md:top-0 md:right-0 md:h-6 md:w-6"
			></span>
		{/if}
		<img
			alt=""
			src={user.avatar_url ?? '/icons/DefaultProfile.png'}
			class="aspect-square h-full rounded-md object-cover object-center md:h-48 md:w-full"
		/>

		<div class="w-full md:mt-2">
			<div class="flex w-full flex-row items-center justify-between">
				<div class="flex w-fit flex-row gap-2">
					<dt class="sr-only">Name</dt>
					<dd class="truncate font-medium">{user.full_name}</dd>
					{#if user.verified}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
							/>
						</svg>
					{/if}
				</div>

				<div class="float-right flex flex-shrink-0 items-center gap-1">
					<div class="w-3">
						<img src="/icons/Golf_Ball.png" alt="" />
					</div>
					<div class="text-left">
						<p class="text-sm font-medium text-gray-500">{user.handicap_index}</p>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-1 text-xs md:mt-2">
				<div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
					<div class="mt-1.5 text-left sm:mt-0">
						<!-- <p class="text-gray-500">Member of</p> -->
						<p class="font-medium text-gray-500">{user.club_name}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</button>
