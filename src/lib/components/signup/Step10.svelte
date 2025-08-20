<script lang="ts">
    import { toast } from "svelte-sonner";

	let {
        golfId = $bindable(),
		step = $bindable(),
	} = $props();

    let invalidId: null | number = $state(null);

    const handleSubmit = () => {
        if (!golfId) {
            invalidId = golfId;
            toast.error("Please enter a valid golf ID.");
            return;
        }

        step++;
    }

    const handleIdInput = (e: Event) => {
        const input = e.target as HTMLInputElement;
        const digitsOnly = input.value.replace(/\D/g, '');
        golfId = digitsOnly;
    }
</script>

<div
	class="flex h-full w-full items-center justify-center"
>
    <div class='w-96 flex flex-col gap-5'>
        <section>
            <h1 class='text-3xl'>What's your Golf Canada user ID?</h1>
        </section>
        <div>
            <input
                type="text"
                id="golfId"
                class={`peer mt-0.5 w-full ${invalidId == golfId ? "border-red-400" : "border-black"} border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400`}
                placeholder="0000000000"
                oninput={handleIdInput}
                bind:value={golfId}
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
                    Complete Signup
            </button>
        </div>
    </div>
</div>
