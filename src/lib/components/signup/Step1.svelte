<script lang="ts">
	import { goto } from "$app/navigation";

	let {
        privateGolfer = $bindable(),
		step = $bindable(),
	} = $props();

	const handleSubmit = () => {
		if (!privateGolfer) {
			goto('/ineligible');
		}
		step++;
	}
</script>

<div class='px-10 md:px-0 w-96 flex flex-col gap-5'>
	<section>
		<h1 class='text-2xl md:text-3xl'>Before we get started,</h1>
		<span class='text-sm md:text-lg'>Are you a private golf club member?</span>
	</section>
	<div>
		<select
            id="memberSelect"
            class="peer mt-0.5 w-full border-black border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base"
            bind:value={privateGolfer}
            >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
        </select>
	</div>
	<div class='w-full flex justify-end gap-2'>
		<button
				class="inline-block rounded-sm border border-green-700 bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-green-700 focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
				onclick={() => step--}
			>
				Go Back
		</button>
		<button
				class="inline-block rounded-sm border border-green-700 bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-green-700 focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
				onclick={handleSubmit}
			>
				Continue
		</button>
	</div>
</div>