
<div
	class="fixed inset-0 z-[60] flex h-screen w-screen flex-col overflow-y-auto bg-[#DFDFDF] shadow-2xl"
	in:fly={{ duration: 500, x: 500, easing: circOut }}
	out:fly={{ duration: 500, x: 500, easing: circOut }}
>
	{#if selectedTab === 'profile'}
		<div class="absolute top-5 left-2 z-50">
			<Back
				onclick={closeModal}
				onkeydown={(e: { key: string }) => (e.key === 'Esc' ? closeModal() : null)}
			/>
		</div>
		<!-- Profile Section -->
		<div class="relative flex h-full w-full flex-col p-5">
			<!-- Chat Button -->
			<button
				onclick={() => (selectedTab = 'chat')}
				aria-label="Chat"
				class="fixed right-5 bottom-5 h-fit w-fit rounded-full bg-[#84A98C] p-4 md:hidden text-ellipsis"
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
	{:else}
		<!-- Chat Section -->
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
	{/if}
</div>
