<script lang="ts">
	import { toast } from 'svelte-sonner';

	let { email = $bindable(), step = $bindable() } = $props();

	let invalidEmail: null | string = $state(null);

	const handleSubmit = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email || !emailRegex.test(email)) {
			invalidEmail = email;
			toast.error('Invalid Email, please enter a valid email');
			return;
		}

		step++;
	};
</script>

<div
	class="min-w-md mx-auto flex max-w-lg flex-col gap-5 rounded-xl bg-black/30 p-6 shadow-lg backdrop-blur-xs p-10"
>
	<section>
		<h1 class="text-2xl text-white md:text-3xl">What's your email address?</h1>
		<i class="text-sm text-white/30">This information will be private to you only*</i>
	</section>
	<div>
		<input
			type="text"
			id="phone"
			class={`peer mt-0.5 w-full ${invalidEmail == email ? 'border-red-400' : 'border-white/30'} border-0 border-b bg-transparent text-white focus:border-white focus:ring-0 focus:outline-none sm:text-sm lg:text-base`}
			placeholder="johndoe@example.com"
			bind:value={email}
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
