<script lang="ts">
    import { toast } from "svelte-sonner";

	let {
        handicapIndex = $bindable(),
		step = $bindable(),
	} = $props();

    let invalidScore: null | number = $state(null);

    const handleSubmit = () => {   
        if (!handicapIndex || handicapIndex < 0 || handicapIndex > 54) {
            toast.error("Please enter a valid handicap index score.");
            return;
        }

        step++;
    }

    const handleScoreInput = (e: Event) => {
        const input = e.target as HTMLInputElement;

		// Remove non-digit characters
		const digitsOnly = input.value.replace(/\D/g, '');
        handicapIndex = digitsOnly;
        if (handicapIndex > 54) {
            handicapIndex = 54;
        } else if (handicapIndex < 0) {
            handicapIndex = 0;
        }
    }
</script>

<div
	class="flex h-full w-full items-center justify-center"
>
    <div class='w-96 flex flex-col gap-5'>
        <section>
            <h1 class='text-3xl'>Almost done!</h1>
            <span class='text-lg'>What's your handicap index?</span>
        </section>
        <div>
            <input
                type="text"
                id="handicapIndex"
                class={`peer mt-0.5 w-full ${invalidScore == handicapIndex? "border-red-400" : "border-black"} border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400`}
                placeholder="10.2"
                min="0"
                max="54"
                oninput={handleScoreInput}
                bind:value={handicapIndex}
            />
        </div>
        <div class='w-full flex justify-end gap-2'>
            <button
				class="inline-block rounded-sm border border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                    onclick={() => step--}
                >
                    Go Back
            </button>
            <button
				class="inline-block rounded-sm border border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                    onclick={handleSubmit}
                >
                    Continue
            </button>
        </div>
    </div>
</div>
