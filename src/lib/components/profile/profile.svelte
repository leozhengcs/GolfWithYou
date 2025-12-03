<script lang="ts">
	import { toast } from 'svelte-sonner';
	import Tooltip from '../Tooltip.svelte';
	import { clubs } from '$lib';
	import { onMount } from 'svelte';

	let {
		profile = $bindable(),
		disabled = $bindable(),
		handleEdit = $bindable(),
		handleSubmit = $bindable(),
		handleFileChange = $bindable(),
		handleFileUpload = $bindable(),

		full_name = $bindable(),
		bio = $bindable(),
		gender = $bindable() as string,
		club_name = $bindable() as string,
		handicap_index = $bindable(),
		golf_id = $bindable(),
		other_gender = $bindable(),
		imageUploaded = $bindable(),
		tempUrl = $bindable()

	} = $props();

	onMount(() => {
		club_name = club_name.toLowerCase();
		try {
			other_gender = other_gender.toLowerCase();
		} catch {}
		gender = gender.toLowerCase();
	})
	
	const handleScoreInput = (e: Event) => {
		const input = e.target as HTMLInputElement;

		// Remove non-digit characters
		let digitsOnly = input.value.replace(/[^0-9.]/g, '');

		const parts = digitsOnly.split('.');
		if (parts.length > 2) {
			digitsOnly = parts[0] + '.' + parts[1]; // Keep only the first decimal
		}

		handicap_index = digitsOnly;
		if (handicap_index > 54) {
			handicap_index = 54;
		} else if (handicap_index < 0) {
			handicap_index = 0;
		}
	};

	const handleIdInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const digitsOnly = input.value.replace(/\D/g, '');
		golf_id = digitsOnly;
	};

	const handleCancel = async () => {
		const res = await fetch('/api/fetch_user');
		const data = await res.json();
		if (!res.ok) {
			toast.error('Error fetching user, please try again later.');
			return;
		}

		full_name = data.user.full_name;
		bio = data.user.bio;
		gender = data.user.gender.toLowerCase();
		other_gender = data.user.other_gender.toLowerCase();
		club_name = data.user.club_name.toLowerCase();
		handicap_index = data.user.handicap_index;
		golf_id = data.user.golf_id;
		imageUploaded = null;
		handleEdit();
	};
</script>

<section
	class="flex h-full w-full flex-col gap-5 rounded-lg backdrop-blur-xs bg-black/30 px-5 py-5 md:p-10"
>
	<h1 class="text-3xl text-white">Profile</h1>
	{#if !profile?.verified}
		<Tooltip text="Please contact a verified user to verify your profile.">
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
		<label for="image" class="block text-sm/6 font-medium text-white/50">Upload Icon</label>
		<div class="mt-2">
			<input
				id="file-upload"
				type="file"
				accept="image/*"
				style="display: none"
				onchange={handleFileChange}
			/>
			<!-- onchange={handleFileChange} -->

			<!-- Styled label as a button -->
			<label
				for="file-upload"
				class="w-fit rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all"
				>Select Image</label
			>
			{#if tempUrl}
				<p>Preview:</p>
				<img
					src={tempUrl}
					alt=""
					class="aspect-square h-56 rounded-md object-cover object-center"
				/>

				<button
					class="border-action bg-action hover:text-action w-fit cursor-pointer rounded-lg border-1 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent focus:ring-1 focus:outline-hidden"
					onclick={handleFileUpload}>Upload Image</button
				>
			{/if}
			{#if imageUploaded && !tempUrl}
				<div>File Uploaded Successfully</div>
			{/if}
		</div>
	</div>
	<div>
		<label for="full_name" class="block text-sm/6 font-medium text-white/50">Full Name</label>
		<div class="mt-2">
			<input
				bind:value={full_name}
				type="text"
				name="full_name"
				id="full_name"
				required
				class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				{disabled}
			/>
		</div>
	</div>
	<div>
		<label for="full_name" class="block text-sm/6 font-medium text-white/50">Handicap Index</label>
		<div class="mt-2">
			<input
				bind:value={handicap_index}
				oninput={handleScoreInput}
				min="0"
				max="54"
				type="text"
				name="handicap_index"
				id="handicap_index"
				required
				class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				{disabled}
			/>
		</div>
	</div>
	<div>
		<label for="full_name" class="block text-sm/6 font-medium text-white/50">Club Name</label>
		<div class="mt-2">
			<select
				name="club_name"
				id="club_name"
				bind:value={club_name}
				class="block w-full truncate rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				{disabled}
			>
				{#each clubs as club}
					<option value={club}>{club}</option>
				{/each}
			</select>
			<!-- <input
				bind:value={club_name}
				type="text"
				name="club_name"
				id="club_name"
				required
				class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-white/50 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				{disabled}
			/> -->
		</div>
	</div>
	<div>
		<label for="full_name" class="block text-sm/6 font-medium text-white/50">Golf ID</label>
		<div class="mt-2">
			<input
				bind:value={golf_id}
				type="text"
				name="golfId"
				id="golfId"
				required
				oninput={handleIdInput}
				class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				{disabled}
			/>
		</div>
	</div>
	<div>
		<label for="email" class="block text-sm/6 font-medium text-white/50">Bio</label>
		<div class="mt-2">
			<textarea
				bind:value={bio}
				name="bio"
				id="bio"
				rows="3"
				required
				class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				{disabled}
			></textarea>
		</div>
	</div>
	<div>
		<label for="email" class="block text-sm/6 font-medium text-white/50">Gender</label>
		<select
			bind:value={gender}
			name="gender"
			id="gender"
			required
			class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
			{disabled}
		>
			<option value="" disabled selected>Select your gender</option>
			<option value="male">Male</option>
			<option value="female">Female</option>
			<option value="nonbinary">Non-binary</option>
			<option value="prefer_not_to_say">Prefer not to say</option>
			<option value="other">Other</option>
		</select>
		{#if gender === 'other'}
			<input
				type="text"
				class="mt-2 w-full border-0 border-b border-black bg-transparent focus:border-blue-400 focus:ring-0 focus:outline-none sm:text-sm lg:text-base"
				{disabled}
				bind:value={other_gender}
			/>
		{/if}
	</div>
	<div class="flex w-full justify-end gap-5">
		{#if disabled == true}
			<button
				class="w-fit rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all"
				onclick={handleEdit}>Edit</button
			>
		{:else}
			<button
				class="w-fit rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all"
				onclick={handleCancel}>Cancel</button
			>
			<button
				class="w-fit rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all"
				onclick={handleSubmit}>Save</button
			>
		{/if}
	</div>
</section>
