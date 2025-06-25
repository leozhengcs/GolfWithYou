<script lang="ts">
	let {
        phone = $bindable(),
		step = $bindable(),
	} = $props();
</script>


<div class='w-96 flex flex-col gap-5'>
    <section>
        <h1 class='text-3xl'>What's your phone number?</h1>
    </section>
    <div>
        <input
            type="text"
            id="phone"
            class="peer mt-0.5 w-full border-black border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400"
            placeholder="123-456-7890"
            bind:value={phone}
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
                onclick={() => step++}
            >
                Continue
        </button>
    </div>
</div>
