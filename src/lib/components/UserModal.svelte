<script lang="ts">
	import { draw, fade, fly } from 'svelte/transition';
	import { onMount, onDestroy, tick } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { Message } from '$lib/types/Chat';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import { chatMap, openedModal, unreadMap } from '$lib/stores/globalStates.svelte';
	import LoaderChat from './loaders/LoaderChat.svelte';
	import Back from './Back.svelte';
	import { circOut } from 'svelte/easing';
	import ProfilePane from './ProfilePane.svelte';
	import ChatPane from './ChatPane.svelte';

	let {
		id, //id of opened user modal
		gender,
		other_gender,
		postal_code,
		verified,
		golf_id,
		name,
		handicap_index,
		member,
		src,
		closeModal,
		bio,
		images,
		self, //id of logged in user
		supabase,
		onlineUsers,
		selectedTab = $bindable()
	} = $props();

	let openChat = () => (selectedTab = 'chat');
	let openProfile = () => (selectedTab = 'profile');

	let isMdUp = $state(false);
	$inspect(isMdUp);
	onMount(() => {
		document.body.classList.add('overflow-y-hidden');
		const media = window.matchMedia('(min-width: 768px)');
		const update = () => (isMdUp = media.matches);
		update();
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	});

	onDestroy(() => {
		document.body.classList.remove('overflow-y-hidden');
	});
</script>

<div
	class="fixed top-0 left-0 h-full w-full bg-[#DFDFDF] md:grid md:grid-cols-[40%_60%] md:gap-0 lg:grid-cols-[30%_70%]"
>
	{#if isMdUp}
		<div class="min-h-0">
			<ProfilePane
				{id}
				{closeModal}
				{openChat}
				{bio}
				{gender}
				{name}
				{golf_id}
				{handicap_index}
				{member}
				{self}
				{src}
				{verified}
			/>
		</div>
		<div class="flex min-h-0 flex-col">
			<ChatPane {openProfile} {id} {onlineUsers} {self} {src} {supabase} {verified} {name} />
		</div>
	{:else if selectedTab === 'profile'}
		<ProfilePane
			{id}
			{closeModal}
			{openChat}
			{bio}
			{gender}
			{name}
			{golf_id}
			{handicap_index}
			{member}
			{self}
			{src}
			{verified}
		/>
	{:else if selectedTab === 'chat'}
		<ChatPane {openProfile} {id} {onlineUsers} {self} {src} {supabase} {verified} {name} />
	{/if}
</div>
