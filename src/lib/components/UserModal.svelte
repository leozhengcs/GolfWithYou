<script lang="ts">
	import { draw, fade, fly } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
	import { onMount, onDestroy, tick } from 'svelte';
	import ProfilePane from './ProfilePane.svelte';
	import ChatPane from './ChatPane.svelte';
	import { fetchFeaturedImages } from '$lib/utils/db';

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
	let featuredImagesLoading = $state(true);
	let featuredImages: string[] = $state([]);

	onMount(() => {
		document.body.classList.add('overflow-y-hidden');
		const media = window.matchMedia('(min-width: 768px)');
		const update = () => (isMdUp = media.matches);
		update();
		media.addEventListener('change', update);
		fetchFeaturedImages(supabase, id)
			.then((res) => {
				if (res.data) featuredImages = res.data;
			})
			.finally(() => (featuredImagesLoading = false));
		return () => media.removeEventListener('change', update);
	});

	onDestroy(() => {
		document.body.classList.remove('overflow-y-hidden');
	});
</script>

<div
	class={`fixed inset-0 overflow-y-auto bg-[#DFDFDF]`}
	transition:fade={{ duration: 300, easing: circOut }}
>
	<div class="relative md:grid md:grid-cols-[40%_60%] md:gap-0 lg:grid-cols-[30%_70%]">
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
					{featuredImages}
					{featuredImagesLoading}
				/>
			</div>
			<div class="min-h-0 flex-col h-screen">
				<ChatPane {openProfile} {id} {onlineUsers} {self} {src} {supabase} {verified} {name} />
			</div>
		{:else}
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
				{featuredImages}
				{featuredImagesLoading}
			/>
			{#if selectedTab === 'chat'}
				<div class="absolute inset-0 top-0 left-0 z-50 h-screen overflow-clip">
					<ChatPane {openProfile} {id} {onlineUsers} {self} {src} {supabase} {verified} {name} />
				</div>
			{/if}
		{/if}
	</div>
</div>
