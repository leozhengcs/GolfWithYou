<script lang="ts">
	import type { UserProfile } from '$lib/types/Database';
	import { goto } from '$app/navigation';
	import { toTitleCase } from "$lib/utils/string";

	import ProfileTab from "$lib/components/profile/profile.svelte";
	import PersonalTab from "$lib/components/profile/personal.svelte";
	import AccountTab from "$lib/components/profile/account.svelte";
	import DataTab from "$lib/components/profile/data.svelte";
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	let { profile }: { profile: UserProfile | null } = $derived(data);


	//profile tab
	let { full_name, bio, gender, dob, club_name, handicap_index, golf_id, other_gender } = $derived(profile!);

	//personal tab
	let { phone, postal_code } = $derived(profile!);

	//account tab
	let { email, verified } = $derived(profile!);

	//data and privacy tab

	//navigation
	let disabled = $state(true);
	let tab = $state('profile');

	const handleLogout = async () => {
		await fetch('/api/logout', {
			method: 'POST'
		});

		goto('/');
	};

	function handleEdit() {
		disabled = !disabled;
	};

	function handleSubmit() {
		if (other_gender) {
			other_gender = toTitleCase(other_gender);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            toast.error("Invalid Email, please enter a valid email");
            return;
        }

		formElement.submit();
	}

	let imageFile: File | null = $state(null);
	$inspect(imageFile);

	let avatarUrl = $derived(profile?.avatar_url);
	let tempUrl: string | null = $state(null);
	let imageUploaded: boolean = $state(false);
	let formElement: HTMLFormElement;

	async function handleFileChange(event: Event) {
		event.preventDefault();
		const target = event.target as HTMLInputElement;

		if (target?.files && target.files[0]) {
			imageFile = target.files[0];
			console.log('if:  ', imageFile);
			tempUrl = URL.createObjectURL(imageFile);
		}
	}

	async function handleFileUpload(event: Event) {
		event.preventDefault();

		if (imageFile) {
			const formData = new FormData();
			formData.append('image', imageFile);
			formData.append('type', 'avatar');

			const res = await fetch('/api/uploadImage', {
				method: 'POST',
				body: formData
			});

			const data = await res.json();

			if (!res.ok) {
				console.error('Send error:', data.error);
			}
		}

		//show its uploaded
		tempUrl = null;
		imageUploaded = true;

	}


</script>

<div class="grid w-full flex-1 grid-cols-[250px_auto] gap-5 px-52">
	<section
		class="flex h-full w-full flex-col gap-5 overflow-x-hidden rounded-lg border-1 border-gray-300"
	>
		<h1 class="m-5 mb-0 text-gray-600">Settings</h1>
		<div class="flex h-full flex-col">
			<button
				onclick={() => {
					tab = 'profile';
					disabled = true;
				}}
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
			>
				Profile
			</button>
			<!-- <button
                class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
            >
                Theme
            </button> -->
			<button
				onclick={() => {
					tab = 'personal';
					disabled = true;
				}}
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
			>
				Personal Info
			</button>
			<!-- <button
                class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
            >
                Settings
            </button> -->
			<button
				onclick={() => {
					tab = 'account';
					disabled = true;
				}}
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
			>
				Account Details
			</button>
			<!-- <button
                class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
            >
				Settings
            </button> -->
			<button
				onclick={() => {
					tab = 'data';
					disabled = true;
				}}
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
			>
				Data and Privacy
			</button>
			<!-- <button
                class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
            >
                Settings
            </button> -->
			<button
				onclick={handleLogout}
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left text-red-400 transition-all duration-100 hover:bg-red-200"
			>
				Logout
			</button>
		</div>
	</section>

	{#if tab=="profile"}
	<section class="flex h-full w-full flex-col gap-5 rounded-lg border-1 border-gray-300 p-10 py-5">
		<h1 class="text-3xl">Profile</h1>
		<span
			class={`text-sm ${profile?.verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
			>{profile?.verified ? 'Verified' : 'Not Verified'}
		</span>
		<div>
			<label for="image" class="block text-sm/6 font-medium text-gray-900">Upload Icon</label>
			<div class="mt-2">
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					style="display: none"
					disabled = {disabled}
				/>

				<!-- Styled label as a button -->
				<label for="file-upload" class="upload-button">Upload Image</label>
			</div>
		</div>
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
					disabled = {disabled}
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
					disabled = {disabled}
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
					disabled = {disabled}
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
				disabled = {disabled}
			>
				<option value="" disabled selected>Select your gender</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="nonbinary">Non-binary</option>
				<option value="prefer_not_to_say">Prefer not to say</option>
			</select>
		</div>
		<div class="flex w-full justify-end gap-5">
            {#if disabled==true }
            <button class="rounded-lg border-1 border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit" onclick={handleEdit}>Edit</button>
            {:else }
            <button class="rounded-lg border-1 border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit" onclick={handleSubmit}>Save</button>
            {/if}
        </div>
	</section>
	{:else if tab=="personal"}
	<section class="flex h-full w-full flex-col gap-5 rounded-lg border-1 border-gray-300 p-10 py-5">
		<h1 class="text-3xl">Personal Info</h1>
		<span
			class={`text-sm ${profile?.verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
			>{profile?.verified ? 'Verified' : 'Not Verified'}
		</span>
		<div>
			<label for="image" class="block text-sm/6 font-medium text-gray-900">Upload Icon</label>
			<div class="mt-2">
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					style="display: none"
				/>

				<!-- Styled label as a button -->
				<label for="file-upload" class="upload-button">Upload Image</label>
			</div>
		</div>
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
					disabled = {disabled}
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
		<div class="flex w-full justify-end gap-5">
            {#if disabled==true }
            <button class="rounded-lg border-1 border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit" onclick={handleEdit}>Edit</button>
            {:else }
            <button class="rounded-lg border-1 border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit" onclick={handleSubmit}>Save</button>
            {/if}
        </div>
	</section>
	{:else if tab=="account"}
	<section class="flex h-full w-full flex-col gap-5 rounded-lg border-1 border-gray-300 p-10 py-5">
		<h1 class="text-3xl">Account Details</h1>
		<span
			class={`text-sm ${profile?.verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
			>{profile?.verified ? 'Verified' : 'Not Verified'}
		</span>
		<div>
			<label for="image" class="block text-sm/6 font-medium text-gray-900">Upload Icon</label>
			<div class="mt-2">
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					style="display: none"
				/>

				<!-- Styled label as a button -->
				<label for="file-upload" class="upload-button">Upload Image</label>
			</div>
		</div>
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
		<div class="flex w-full justify-end gap-5">
            {#if disabled==true }
            <button class="rounded-lg border-1 border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit" onclick={handleEdit}>Edit</button>
            {:else }
            <button class="rounded-lg border-1 border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit" onclick={handleSubmit}>Save</button>
            {/if}
        </div>
	</section>
	{:else}
	<DataTab/>
	{/if}
</div>

<form method="POST" bind:this={formElement}>
  <input type="hidden" name='fullName' bind:value={full_name}/> 
  <input type="hidden" name='dob' bind:value={dob}/>
  <input type="hidden" name='clubName' bind:value={club_name}/>
  <input type="hidden" name='handicapIndex' bind:value={handicap_index}/>  
  <input type="hidden" name='gender' bind:value={gender}/> 
  <input type="hidden" name='otherGender' bind:value={other_gender}/> 
  <input type="hidden" name='golfID' bind:value={golf_id}/> 
  <input type="hidden" name='email' bind:value={email}/> 
  <input type="hidden" name='bio' bind:value={bio}>
</form>
