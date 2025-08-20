<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import Tooltip from "../Tooltip.svelte";

	let {
		profile = $bindable(),
		disabled = $bindable(),
		handleEdit = $bindable(),
		handleSubmit = $bindable(),
		handleDeleteAccount = $bindable(),

		email = $bindable()
	} = $props();

	let deleteOverlay = $state(false);

	// const handleCancel = async () => {
	// 	const res = await fetch('/api/fetch_user');
	// 	const data = await res.json();
	// 	if (!res.ok) {
	// 		toast.error('Error fetching user, please try again later.');
	// 		return;
	// 	}
	// };
</script>

<section class="flex h-full w-full flex-col gap-5 rounded-lg border-1 border-gray-300 bg-gray-300/50 px-5 md:p-10 py-5">
	<h1 class="text-3xl">Account Details</h1>
	{#if !profile?.verified}
		<Tooltip
			text="Please contact a verified user to verify your profile."
		>
			<span
				class={`text-sm ${profile?.verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
				>{profile?.verified ? 'Verified' : 'Awaiting Verification'}
			</span>
		</Tooltip>
	{:else}
		<span
			class={`text-sm ${profile?.verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
			>{profile?.verified ? 'Verified' : 'Awaiting Verification'}
		</span>
	{/if}
	<div>
		<label for="full_name" class="block text-sm/6 font-medium text-gray-900">Email Address</label>
		<div class="mt-2">
			<input
				bind:value={email}
				type="text"
				name="email"
				id="email"
				required
				class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				{disabled}
			/>
		</div>
	</div>
	<div>
		<button
			class="w-fit cursor-pointer rounded-lg border-1 border-red-200 px-4 py-2 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-200 focus:ring-1 focus:outline-hidden"
			onclick={() => (deleteOverlay = true)}>Delete Account</button
		>
		<!-- <button
			class="w-fit cursor-pointer rounded-lg border-1 border-red-200 px-4 py-2 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-200 focus:ring-1 focus:outline-hidden"
			onclick={handleDeleteAccount}>Delete Account</button
		> -->
	</div>
	{#if deleteOverlay}
		<div class="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
			<div
				class="w-[90%] max-w-md space-y-6 rounded-2xl bg-background p-8 text-center shadow-xl"
			>
				<h2 class="text-xl font-semibold">Are you sure?</h2>
				<div class="flex justify-center gap-4">
					<button
						class="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:ring-2"
						onclick={handleDeleteAccount}
					>
						Yes
					</button>
					<button
						class="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-black hover:bg-gray-600 hover:text-white"
						onclick={()=>deleteOverlay=false}
					>
						No
					</button>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex w-full justify-end gap-5"></div>
</section>
