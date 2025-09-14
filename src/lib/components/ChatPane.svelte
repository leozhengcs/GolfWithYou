<script lang="ts">
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";

    let { }
</script>

<div
	class="fixed inset-0 flex flex-col bg-[#DFDFDF] shadow-2xl"
	in:fly={{ duration: 500, x: 500, easing: circOut }}
	out:fly={{ duration: 500, x: 500, easing: circOut }}
>
	<!-- Header -->
	<div class="z-50 flex h-20 w-full flex-row items-center gap-5 px-5 py-4 shadow-lg">
		<Back onclick={() => (selectedTab = 'profile')} />
		<div class="aspect-square w-12 overflow-hidden rounded-full">
			<img {src} alt="" class="object-cover object-center" />
		</div>
		<h1 class="text-lg">
			{name}
		</h1>
	</div>
	<!-- Body -->
	<div class="relative flex min-h-0 flex-1 flex-col gap-5 overflow-y-hidden">
		<div class="flex flex-1 flex-col gap-8 overflow-y-auto px-5">
			{#each messages as message}
				{#if message.sender_id == id}
					<div class="flex flex-row items-end gap-5">
						<div class="aspect-square w-10 overflow-hidden rounded-full">
							<img
								src={src ?? '/icons/DefaultProfile.png'}
								alt=""
								class="h-full w-full object-cover"
							/>
						</div>
						<div class="w-fit rounded-lg bg-gray-200 p-2">
							<p class="m-0 w-fit max-w-[500px] p-0 text-wrap">{message.content}</p>
						</div>
					</div>
				{:else}
					<div class="flex flex-row items-end justify-end gap-5">
						<div class="w-fit rounded-lg bg-gray-200 p-2">
							<p class="m-0 w-fit max-w-[300px] p-0 text-wrap">{message.content}</p>
						</div>
						<div class="aspect-square w-10 overflow-hidden rounded-full">
							<img
								src={self.avatar_url ?? '/icons/DefaultProfile.png'}
								alt=""
								class="h-full w-full object-cover"
							/>
						</div>
					</div>
				{/if}
			{/each}
			<div bind:this={bottomRef}></div>
		</div>
	</div>
	<form
		class="sticky bottom-0 z-50 flex w-full items-center gap-4 px-5 pt-4"
		onsubmit={sendMessage}
	>
		{#if loading}
			<LoaderChat />
		{:else}
			<div
				class="group flex w-full items-center"
				onfocusin={() => (showIcon = true)}
				onfocusout={() => (showIcon = false)}
			>
				<input
					bind:value={newMessage}
					bind:this={inputRef}
					class="w-full flex-1 rounded-full bg-[#EEEEEE] px-4 py-2 pr-12 focus:border-transparent focus:outline-none"
					placeholder={`Message ${name}`}
				/>
				<button
					type="submit"
					class="pointer-events-none absolute top-1/2 right-5 flex h-8 w-12 -translate-1/4 items-center
					   justify-center rounded-full bg-[#52796F] text-white opacity-0 transition-opacity
					duration-200 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
				>
					{#if showIcon}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-6 w-6"
						>
							<path d="M22 2L11 13" transition:draw={{ delay: 300, duration: 500 }} />
							<path d="M22 2L15 22l-4-9-9-4z" transition:draw={{ duration: 500 }} />
						</svg>
					{/if}
					<!-- {`Message ${name.split(' ')[0]}`} -->
				</button>
				<div class="h-20"></div>
			</div>
		{/if}
	</form>
</div>
