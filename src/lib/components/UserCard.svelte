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
	class={`flex items-center justify-center md:grid h-20 w-80 md:h-76 md:w-60 flex-shrink-0 transform cursor-pointer auto-rows-auto rounded-2xl bg-[#B9C8B7] p-4 transition duration-200 hover:scale-105 ${
		$onlineUsers.includes(user.id) ? 'outline-6 outline-green-500' : ''
	}`}
>
	<div class="relative h-full w-full flex flex-row md:block gap-5">
		{#if unread}
			<span class="absolute -top-4 -right-4 md:top-0 md:right-0 h-4 w-4 md:h-6 md:w-6 rounded-full border border-white bg-red-500"
			></span>
		{/if}
		<img
			alt=""
			src={user.avatar_url ?? '/icons/DefaultProfile.png'}
			class="h-full aspect-square md:h-48 md:w-full rounded-md object-cover object-center"
		/>

		<div class="md:mt-2 w-full">
			<div class="flex w-full flex-row items-center justify-between">
				<div class="w-fit">
					<dt class="sr-only">Name</dt>
					<dd class="font-medium truncate">{user.full_name}</dd>
				</div>

				<div class="flex flex-shrink-0 items-center float-right gap-1">
					<div class="w-3">
						<img src="/icons/Golf_Ball.png" alt="" />
					</div>
					<div class="text-left">
						<p class="text-sm font-medium text-gray-500">{user.handicap_index}</p>
					</div>
				</div>
			</div>

			<div class="md:mt-2 flex flex-col gap-1 text-xs">
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
