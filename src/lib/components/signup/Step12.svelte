<script lang="ts">
	import { toast } from "svelte-sonner";

	let {
		step = $bindable()
	} = $props();

    let agreed = $state(false);
</script>

<div
	class="flex h-full w-full items-center justify-center"
>
    <div class='w-96 flex flex-col gap-5'>
        <section>
            <h1 class="text-3xl">Privacy Acknowledgement & User Agreement</h1>
        </section>
        
        <div class="text-sm text-gray-700 flex flex-col gap-2">
            <p>
                Before continuing, please review and acknowledge the following:
            </p>
            <ul class="list-disc list-inside">
                <li>
                    You have read and understood our 
                    <a href="/files/privacy-policy.pdf" class="text-blue-600 underline hover:text-blue-800" target="_blank">Privacy Policy</a>.
                </li>
                <li>
                    You have read and understood our 
                    <a href="/files/terms-of-use.pdf" class="text-blue-600 underline hover:text-blue-800" target="_blank">Terms of Use</a>.
                </li>
                <li>
                    You agree to be bound by both documents.
                </li>
            </ul>
        </div>

        <div class="flex items-start gap-2">
            <input type="checkbox" id="acknowledge" class='focus:outline-none' bind:checked={agreed} />
            <label for="acknowledge" class="text-sm text-gray-800">
                I acknowledge that I have read and agree to the Privacy Policy and Terms of Use
            </label>
        </div>

        <div class="w-full flex justify-end gap-2">
            <button
				class="inline-block rounded-sm border border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                onclick={() => step--}
            >
                Go Back
            </button>
            <button
				class="inline-block rounded-sm border border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                onclick={() => {agreed? step++ : toast.error("Please read and agree to continue.")}}
            >
                Continue
            </button>
        </div>
    </div>
</div>
