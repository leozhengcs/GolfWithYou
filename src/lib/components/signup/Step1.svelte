<script lang="ts">
	import { goto } from "$app/navigation";

	let {
        privateGolfer = $bindable(),
		step = $bindable(),
	} = $props();

	const handleSubmit = () => {
		if (!privateGolfer) {
			goto('/ineligible');
			return;
		}
		step++;
	}
</script>

<div class='md:min-w-md max-w-lg mx-auto rounded-xl bg-black/30 backdrop-blur-xs shadow-lg flex flex-col gap-5 p-10 select-none'>
	<section>
		<h1 class='text-xl md:text-3xl text-white'>Before we get started</h1>
		<span class='text-sm md:text-base text-white/75'>Are you a private golf club member?</span>
	</section>
	<div>
		<select
            id="memberSelect"
            class="peer mt-0.5 w-full border-white text-white border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base"
            bind:value={privateGolfer}
            >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
        </select>
	</div>
	<div class='w-full flex justify-end gap-2'>
		<button
				class="inline-block rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
				onclick={handleSubmit}
			>
				Continue
		</button>
	</div>
</div>