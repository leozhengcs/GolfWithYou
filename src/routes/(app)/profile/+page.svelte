<script lang="ts">
	import type { UserProfile } from '$lib/types/Database';

	let { data } = $props();
	let { profile }: { profile: UserProfile | null } = $derived(data);

    $inspect(profile);

    let fullName = $derived(profile?.full_name);
	let email = $derived(profile?.email);
	let bio = $state('');
	let gender = $derived(profile?.gender.toLowerCase());
</script>

<div class="grid w-full flex-1 grid-cols-[250px_auto] gap-5 px-52">
	<section
		class="flex h-full w-full flex-col gap-5 overflow-x-hidden rounded-lg border-1 border-gray-300"
	>
		<h1 class="m-5 mb-0 text-gray-600">Settings</h1>
		<div class="flex h-full flex-col">
			<button
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
			>
				Profile
			</button>
			<button
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
			>
				Theme
			</button>
			<button
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
			>
				Data and Privacy
			</button>
			<button
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
			>
				Settings
			</button>
		</div>
	</section>
	<section class="flex h-full w-full flex-col gap-5 rounded-lg border-1 border-gray-300 p-10 py-5">
		<h1 class="text-3xl">Profile</h1>
		<span
			class={`text-sm ${profile?.verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
			>{profile?.verified ? 'Verified' : 'Not Verified'}</span
		>
		<div>
			<label for="full_name" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
			<div class="mt-2">
				<input
					bind:value={fullName}
					type="text"
					name="full_name"
					id="full_name"
					required
					class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				/>
			</div>
		</div>
		<div>
			<label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
			<div class="mt-2">
				<input
					bind:value={email}
					type="text"
					name="email"
					id="email"
					autocomplete="email"
					required
					class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				/>
			</div>
		</div>
		<div>
			<label for="email" class="block text-sm/6 font-medium text-gray-900">Bio</label>
			<div class="mt-2">
				<textarea
					bind:value={bio}
					name="bio"
					id="bio"
					rows="3"
					required
					class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				></textarea>
			</div>
		</div>
		<div>
			<label for="email" class="block text-sm/6 font-medium text-gray-900">Gender</label>
			<select
				bind:value={gender}
				name="gender"
				id="gender"
				required
				class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
			>
				<option value="" disabled selected>Select your gender</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="nonbinary">Non-binary</option>
				<option value="prefer_not_to_say">Prefer not to say</option>
			</select>
		</div>
		<div class="flex w-full justify-end gap-2">
			<button class="w-fit cursor-pointer rounded-lg bg-blue-300 p-2">Cancel Changes</button>
			<button class="w-fit cursor-pointer rounded-lg bg-blue-300 p-2">Save Changes</button>
		</div>
	</section>
</div>
