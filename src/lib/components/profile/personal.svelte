<script lang="ts">
	import { toast } from 'svelte-sonner';

	let {
		profile = $bindable(),
		disabled = $bindable(),
		handleEdit = $bindable(),
		handleSubmit = $bindable(),

		phone = $bindable(),
		postal_code = $bindable()
	} = $props();

	const handleCancel = async () => {
		const res = await fetch('/api/fetch_user');
		const data = await res.json();
		if (!res.ok) {
			toast.error('Error fetching user, please try again later.');
			return;
		}

		phone = data.user.phone;
		postal_code = data.user.postal_code;
		handleEdit();
	};

	const handlePhoneInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const digits = input.value.replace(/\D/g, ''); // remove non-digits

		// Limit to 10 digits
		const trimmed = digits.slice(0, 10);

		// Format as XXX-XXX-XXXX
		const formatted = trimmed.replace(/^(\d{3})(\d{1,3})?(\d{1,4})?$/, (_, a, b, c) =>
			[a, b, c].filter(Boolean).join('-')
		);

		phone = formatted;
	};

	const handlePostalInput = (e: Event) => {
		const input = e.target as HTMLInputElement;

		//trim whitespace
		postal_code = input.value.replace(/\s+/g, '');

		//check length
		if (input.value.length > 5) {
			postal_code = postal_code.slice(0, 5);
		}
	};
</script>

<section class="flex h-full w-full flex-col gap-5 rounded-lg border-1 border-gray-300 p-10 py-5">
	<h1 class="text-3xl">Personal Info</h1>
	<span
		class={`text-sm ${profile?.verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
		>{profile?.verified ? 'Verified' : 'Not Verified'}
	</span>
	<div>
		<label for="full_name" class="block text-sm/6 font-medium text-gray-900">Phone Number</label>
		<div class="mt-2">
			<input
				bind:value={phone}
				type="text"
				name="phone"
				id="phone"
				required
				oninput={handlePhoneInput}
				class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				{disabled}
			/>
		</div>
	</div>
	<div>
		<label for="email" class="block text-sm/6 font-medium text-gray-900">Postal Code</label>
		<div class="mt-2">
			<input
				bind:value={postal_code}
				type="text"
				name="postalCode"
				id="postalCode"
				required
				oninput={handlePostalInput}
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
				onclick={handleCancel}>Cancel</button
			>
			<button
				class="border-action bg-action hover:text-action w-fit cursor-pointer rounded-lg border-1 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent focus:ring-1 focus:outline-hidden"
				onclick={handleSubmit}>Save</button
			>
		{/if}
	</div>
</section>
