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
	let { full_name, bio, gender, club_name, handicap_index, golf_id, other_gender } = $derived(profile!);

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
			<!-- <button
				onclick={() => {
					tab = 'data';
					disabled = true;
				}}
				class="w-full cursor-pointer rounded-lg p-2 px-5 text-left transition-all duration-100 hover:bg-gray-300"
			>
				Data and Privacy
			</button> -->
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
	<ProfileTab
	bind:profile
	bind:disabled
	bind:full_name
	bind:bio
	bind:gender
	bind:club_name
	bind:handicap_index
	bind:golf_id
	bind:other_gender
	bind:imageUploaded
	bind:tempUrl
	{handleEdit}
	{handleSubmit}
	{handleFileChange}
	{handleFileUpload}
	/>
	{:else if tab=="personal"}
	<PersonalTab
	bind:profile
	bind:disabled
	bind:postal_code
	bind:phone
	{handleEdit}
	{handleSubmit}
	/>
	{:else if tab=="account"}
	<AccountTab
	bind:profile
	bind:disabled
	bind:email
	{handleEdit}
	{handleSubmit}
	/>
	{:else}
	<DataTab/>
	{/if}
</div>

<form method="POST" bind:this={formElement}>
  <input type="hidden" name='fullName' bind:value={full_name}/> 
  <input type="hidden" name='clubName' bind:value={club_name}/>
  <input type="hidden" name='handicapIndex' bind:value={handicap_index}/>  
  <input type="hidden" name='postalCode' bind:value={postal_code}/>  
  <input type="hidden" name='phone' bind:value={phone}/>  
  <input type="hidden" name='gender' bind:value={gender}/> 
  <input type="hidden" name='otherGender' bind:value={other_gender}/> 
  <input type="hidden" name='golfID' bind:value={golf_id}/> 
  <input type="hidden" name='email' bind:value={email}/> 
  <input type="hidden" name='bio' bind:value={bio}>
</form>
