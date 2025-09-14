<script lang="ts">
	let { openChat, src, name, verified, self, handleVouch, bio, golf_id, member, handicap_index, gender } = $props();
</script>

<!-- Profile Section -->
<div class="relative flex h-full w-full flex-col p-5">
	<!-- Chat Button -->
	<button
		onclick={openChat}
		aria-label="Chat"
		class="fixed right-5 bottom-5 h-fit w-fit rounded-full bg-[#84A98C] p-4 text-ellipsis md:hidden"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
			/>
		</svg>
	</button>
	<div class="flex h-52 w-full flex-col items-center justify-center gap-2">
		<img
			{src}
			alt=""
			class="h-24 w-24 rounded-full object-cover object-center md:h-40 md:w-40 md:rounded-none"
		/>
		<section class="flex flex-col">
			<h1 class="text-lg md:text-xl">
				{name}
			</h1>
			<p
				class={`text-center text-xs ${verified ? 'bg-green-500' : 'bg-red-500'} mx-auto rounded-lg p-1 text-white`}
			>
				{verified ? 'Verified' : 'Awaiting Verification'}
			</p>
			{#if !verified && self.verified}
				<button
					onclick={handleVouch}
					class="bg-action z-50 mt-2 w-fit rounded-lg p-1 text-xs text-white"
				>
					Vouch for them
				</button>
			{/if}
		</section>
	</div>
	<section class="flex-col md:flex">
		<p class="text-sm">{bio && bio.length !== 0 ? bio : 'No bio yet'}</p>
	</section>
	<div class="flex flex-col gap-2 py-5">
		<div>
			<div class="w-full px-2">
				<span class="text-sm">Golf ID</span>
			</div>
			<div class="w-full rounded-lg bg-[#EEEEEE] p-2">
				<p class="text-sm">{golf_id}</p>
			</div>
		</div>
		<div>
			<div class="w-full px-2">
				<span class="text-sm">Member Of</span>
			</div>
			<div class="w-full rounded-lg bg-[#EEEEEE] p-2">
				<p class="text-sm">{member}</p>
			</div>
		</div>
		<div>
			<div class="w-full px-2">
				<span class="text-sm">Handicap Index</span>
			</div>
			<div class="w-full rounded-lg bg-[#EEEEEE] p-2">
				<p class="text-sm">{handicap_index}</p>
			</div>
		</div>
		<div>
			<div class="w-full px-2">
				<span class="text-sm">Gender</span>
			</div>
			<div class="w-full rounded-lg bg-[#EEEEEE] p-2">
				<p class="text-sm">{gender}</p>
			</div>
		</div>
	</div>

	<section class="flex-col md:flex">
		<h1 class="text-sm">Featured Photos</h1>
	</section>
</div>
