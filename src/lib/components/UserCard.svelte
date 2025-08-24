<script lang="ts">
	import type { PublicUserProfile, UserProfile } from '$lib/types/Database';
	import { getAge } from '$lib/utils/date';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import UserModal from './UserModal.svelte';
	import { onlineUsers } from '$lib/stores/users.svelte.js';

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

	const closeModal = () => {
		showUser = false;
	};

	// $effect(() => {
	//   if (showUser) {
	//     document.body.classList.add('overflow-hidden');
	//   } else {
	//     document.body.classList.remove('overflow-hidden');
	//   }
	// });

</script>

{#if showUser}
	<div class="absolute top-0 left-0 h-full w-full items-center justify-center overflow-clip">
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
		/>
	</div>
{/if}

<button
	onclick={() => {
		showUser = true;
	}}
	class="grid h-84 w-60 flex-shrink-0 cursor-pointer auto-rows-auto rounded-2xl bg-[#bbdfed] p-4 shadow-xs shadow-indigo-50"
>
	<div class="relative w-full">
		{#if $onlineUsers.includes(user.id)}
			<span class="absolute top-0 left-0 h-5 w-5 rounded-full border border-white bg-green-500"
			></span>
		{/if}
		{#if unread}
			<span class="absolute top-0 right-0 h-5 w-5 rounded-full border border-white bg-red-500"
			></span>
		{/if}
		<img
			alt=""
			src={user.avatar_url ?? '/icons/DefaultProfile.png'}
			class="aspect-square h-52 w-full rounded-md object-cover object-center"
		/>

		<div class="mt-2">
			<div class="flex flex-col">
				<div class="w-fit">
					<dt class="sr-only">Name</dt>
					<dd class="font-medium">{user.full_name}</dd>
				</div>
			</div>

			<div class="mt-2 flex flex-col gap-1 text-xs">
				<div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
					<div class="mt-1.5 text-left sm:mt-0">
						<!-- <p class="text-gray-500">Member of</p> -->
						<p class="font-medium text-gray-500">{user.club_name}</p>
					</div>
				</div>
				<div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
					<div class="w-4">
						<img src="/icons/Golf_Ball.png" alt="" />
					</div>
					<div class="text-left">
						<p class="font-medium text-gray-500">{user.handicap_index}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</button>
