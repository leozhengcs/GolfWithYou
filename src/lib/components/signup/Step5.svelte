<script lang="ts">
	import { toTitleCase } from '$lib/utils/string';
	import { toast } from 'svelte-sonner';

	let { gender = $bindable(), otherGender = $bindable(), step = $bindable() } = $props();

	const handleSubmit = () => {
		if (!gender) {
			toast.error('Please select a gender');
			return;
		}

		if (otherGender) {
			otherGender = toTitleCase(otherGender);
		}

		step++;
	};
</script>

<div
	class="mx-auto flex max-w-lg min-w-md flex-col gap-5 rounded-xl bg-black/30 p-10 shadow-lg backdrop-blur-xs"
>
	<h1 class="text-2xl text-white md:text-3xl">Which best describes your gender?</h1>
	<div>
		<select
			id="genderSelect"
			class="peer mt-0.5 w-full border-0 border-b border-white/30 bg-transparent text-white focus:border-white focus:ring-0 focus:outline-none sm:text-sm lg:text-base"
			bind:value={gender}
		>
			<option value="" disabled selected>Select gender</option>
			<option value="Male">Male</option>
			<option value="Female">Female</option>
			<option value="Non-binary">Non-binary</option>
			<option value="Prefer not to say">Prefer not to say</option>
			<option value="Other">Other</option>
		</select>

		{#if gender === 'Other'}
			<input
				type="text"
				class="mt-2 w-full border-0 border-b border-white/30 bg-transparent focus:border-white focus:ring-0 focus:outline-none sm:text-sm lg:text-base"
				placeholder="Please specify your gender"
				bind:value={otherGender}
			/>
		{/if}
	</div>
	<div class="flex w-full justify-end gap-2">
		<button
			class="inline-block w-fit cursor-pointer rounded-sm border border-white/30 bg-transparent px-4 py-2 text-sm font-medium text-white/30 transition-all duration-300 hover:bg-white/30 hover:text-white focus:ring-1 focus:outline-hidden"
			onclick={() => step--}
		>
			Go Back
		</button>
		<button
			class="inline-block w-fit cursor-pointer rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden"
			onclick={handleSubmit}
		>
			Continue
		</button>
	</div>
</div>
