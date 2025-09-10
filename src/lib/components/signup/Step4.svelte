<script lang="ts">
	import { toast } from "svelte-sonner";

	let {
        dob = $bindable(),
		step = $bindable(),
	} = $props();

	let invalidDob: null | string = $state(null);

    function isValidDate(str: string): boolean {
		// Ensure the format is exactly YYYY-MM-DD
		if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;
		
		const [year, month, day] = str.split('-').map(Number);
		
		// Check valid ranges
		if (month < 1 || month > 12 || day < 1 || day > 31) return false;

		const date = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`);
		const now = new Date();

	  	if (date.getTime() > now.getTime()) return false;

		return (
			date.getFullYear() === year &&
			date.getMonth() + 1 === month &&
			date.getUTCDate() === day
		);
    }

	const handleSubmit = () => {
		if (!dob || !isValidDate(dob)) {
			invalidDob = dob;
			toast.error("Please enter a valid date in YYYY-MM-DD format.");
			return;
		}

		step++;
	}

    const handleDateInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		let raw = input.value;

		// Allow user to fully delete the input
		if (raw.trim() === '') {
			dob = '';
			return;
		}

		// Remove all non-digit characters
		let digits = raw.replace(/\D/g, '');

		// Format to YYYY-MM-DD
		let formatted = '';
		if (digits.length <= 4) {
			formatted = digits;
		} else if (digits.length <= 6) {
			formatted = `${digits.slice(0, 4)}-${digits.slice(4)}`;
		} else {
			formatted = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
		}

		// Limit to 10 characters
		formatted = formatted.slice(0, 10);

		input.value = formatted;
		dob = formatted;
    }
</script>

<div class='md:min-w-md max-w-lg mx-auto rounded-xl bg-black/30 backdrop-blur-xs shadow-lg flex flex-col gap-5 p-10'>
	<section>
		<h1 class='text-xl md:text-3xl'>When is your birthday?</h1>
	</section>
	<div>
		<input
			type="text"
			id="fullName"
			class={`peer mt-0.5 w-full ${invalidDob == dob ? "border-red-400" : "border-black"} border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400`}
			placeholder="YYYY-MM-DD"
            oninput={handleDateInput}
			bind:value={dob}
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