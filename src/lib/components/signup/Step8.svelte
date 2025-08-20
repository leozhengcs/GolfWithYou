<script lang="ts">
	import { toTitleCase } from "$lib/utils/string";
	import { toast } from "svelte-sonner";

	let {
        clubName = $bindable(),
		step = $bindable(),
	} = $props();

	let invalidClub: null | string = $state(null);

	const handleSubmit = () => {
		if (!clubName || clubName.length > 1000) {
			invalidClub = clubName;
			toast.error("Please enter a valid club name");
			return;
		}

		clubName = toTitleCase(clubName);
		step++;
	}

</script>

<div
	class="flex h-full w-full items-center justify-center"
>
    <div class='w-96 flex flex-col gap-5'>
        <section>
            <h1 class='text-3xl'>Now some questions regarding your membership</h1>
            <span class='text-lg'>What's your golf club name?</span>
        </section>
        <div>
            <input
                type="text"
                id="clubName"
                class={`peer mt-0.5 w-full ${invalidClub == clubName ? "border-red-400" : "border-black"} border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400`}
                placeholder="Shaughnessy Golf & Country Club"
                bind:value={clubName}
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

</div>
