<script lang="ts">
    import { toast } from "svelte-sonner";

	let {
        postalCode = $bindable(),
		step = $bindable(),
	} = $props();

    let invalidPostal: null | string = $state(null);

    const handleSubmit = () => {
        //trim whitespace
        postalCode = postalCode.replace(/\s+/g, '');

        //check length
        if (!postalCode || postalCode.length < 5) {
            invalidPostal = postalCode;
            toast.error("Please enter a valid postal code.");
            return;
        }

        step++;
    }

</script>

<div class='w-96 flex flex-col gap-5'>
    <section class='flex flex-col'>
        <h1 class='text-3xl'>A few more questions!</h1>
        <span class='text-lg'>What's your postal code?</span>
        <i class='text-gray-500 text-sm'>This information will be private to you only</i>
    </section>
    <div>
        <input
            type="text"
            id="postalCode"
            class={`peer mt-0.5 w-full ${invalidPostal == postalCode? "border-red-400" : "border-black"} border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400`}
            placeholder="V6T2A3"
            bind:value={postalCode}
        />
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
