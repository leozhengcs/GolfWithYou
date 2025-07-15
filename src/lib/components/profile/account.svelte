<script lang="ts">
	let {
		profile = $bindable(),
		disabled = $bindable(),
		handleEdit = $bindable(),
		handleSubmit = $bindable(),

		email = $bindable(),
	} = $props();
</script>

<section class="flex h-full w-full flex-col gap-5 rounded-lg border-1 border-gray-300 p-10 py-5">
	<h1 class="text-3xl">Account Details</h1>
	<span
		class={`text-sm ${profile?.verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
		>{profile?.verified ? 'Verified' : 'Not Verified'}
	</span>
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
    <div class="flex w-full justify-end gap-5">
		{#if disabled == true}
			<button
				class="border-action bg-action hover:text-action w-fit cursor-pointer rounded-lg border-1 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent focus:ring-1 focus:outline-hidden"
				onclick={handleEdit}>Edit</button
			>
		{:else}
			<button
				class="border-action bg-action hover:text-action w-fit cursor-pointer rounded-lg border-1 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent focus:ring-1 focus:outline-hidden"
				onclick={handleSubmit}>Save</button
			>
		{/if}
	</div>
</section>
