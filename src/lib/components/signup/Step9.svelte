<script lang="ts">
	import { goto } from "$app/navigation";

	let {
        golfId = $bindable(),
		step = $bindable(),
	} = $props();
</script>

<div
	class="flex h-full w-full items-center justify-center"
>
    <div class='w-96 flex flex-col gap-5'>
        <section>
            <h1 class='text-3xl'>Last Question!</h1>
            <span class='text-lg'>What's your Golf Canada user ID?</span>
        </section>
        <div>
            <input
                type="number"
                id="golfId"
                class="peer mt-0.5 w-full border-black border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400"
                placeholder="00000000"
                bind:value={golfId}
            />
        </div>
        <div class='w-full flex justify-end gap-2'>
            <button
                    class="inline-block rounded-sm border border-blue-300 bg-blue-300 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                    onclick={() => step--}
                >
                    Go Back
            </button>
            <button
                    class="inline-block rounded-sm border border-blue-300 bg-blue-300 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                    onclick={() => goto('/discover')}
                >
                    Complete Signup
            </button>
        </div>
    </div>
</div>
