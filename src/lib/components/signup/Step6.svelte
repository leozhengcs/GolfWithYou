<script lang="ts">
	import { toast } from "svelte-sonner";

	let {
        phone = $bindable(),
		step = $bindable(),
	} = $props();

    let invalidNumber: null | string = $state(null);

    const handlePhoneInput = (e: Event) => {
        const input = e.target as HTMLInputElement;
		const digits = input.value.replace(/\D/g, ''); // remove non-digits

		// Limit to 10 digits
		const trimmed = digits.slice(0, 10);

		// Format as XXX-XXX-XXXX
		const formatted = trimmed
			.replace(/^(\d{3})(\d{1,3})?(\d{1,4})?$/, (_, a, b, c) =>
				[a, b, c].filter(Boolean).join('-')
			);

		phone = formatted;
    }

    const handleSubmit = () => {
        invalidNumber = phone;
        const digits = phone.replace(/\D/g, '');

		if (digits.length !== 10) {
			toast.error('Please enter a valid 10-digit phone number.');
			return;
		}

		step++;
    }
</script>


<div class='w-96 flex flex-col gap-5'>
    <section>
        <h1 class='text-3xl'>What's your phone number?</h1>
        <i class='text-gray-500 text-sm'>This information will be private to you only</i>
    </section>
    <div>
        <input
            type="text"
            id="phone"
            class={`peer mt-0.5 w-full ${invalidNumber == phone ? "border-red-400" : "border-black"} border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400`}
            placeholder="123-456-7890"
            oninput={handlePhoneInput}
            bind:value={phone}
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
