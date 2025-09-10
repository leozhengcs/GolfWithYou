<script lang="ts">
	import { toast } from 'svelte-sonner';

	let { phone = $bindable(), step = $bindable() } = $props();

	let invalidNumber: null | string = $state(null);

	const handlePhoneInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const digits = input.value.replace(/\D/g, ''); // remove non-digits

		// Limit to 10 digits
		const trimmed = digits.slice(0, 10);

		// Format as XXX-XXX-XXXX
		const formatted = trimmed.replace(/^(\d{3})(\d{1,3})?(\d{1,4})?$/, (_, a, b, c) =>
			[a, b, c].filter(Boolean).join('-')
		);

		phone = formatted;
	};

	const handleSubmit = () => {
		invalidNumber = phone;
		const digits = phone.replace(/\D/g, '');

		if (digits.length !== 10) {
			toast.error('Please enter a valid 10-digit phone number.');
			return;
		}

		step++;
	};
</script>

<div
	class="mx-auto flex max-w-lg md:min-w-md flex-col gap-5 rounded-xl bg-black/30 p-10 shadow-lg backdrop-blur-xs"
>
	<section>
		<h1 class="text-xl text-white md:text-3xl">What's your phone number?</h1>
		<i class="text-sm text-white/30">This information will be private to you only*</i>
	</section>
	<div>
		<input
			type="text"
			id="phone"
			class={`peer mt-0.5 w-full ${invalidNumber == phone ? 'border-red-400' : 'border-white/30'} border-0 border-b bg-transparent text-white focus:border-white focus:ring-0 focus:outline-none sm:text-sm lg:text-base`}
			placeholder="123-456-7890"
			oninput={handlePhoneInput}
			bind:value={phone}
		/>
	</div>
	<div class="flex w-full justify-end gap-2">
		<button
			class="inline-block w-fit cursor-pointer rounded-sm border border-white/30 bg-transparent px-4 py-2 text-sm font-medium text-white/30 transition-all duration-300 hover:bg-white/30 hover:text-white focus:ring-1 focus:outline-hidden"
			onclick={() => step--}
		>
			Go Back
		</button>
		<button
			class="inline-block w-fit cursor-pointer rounded-sm border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black focus:ring-1 focus:outline-hidden"
			onclick={handleSubmit}
		>
			Continue
		</button>
	</div>
</div>
