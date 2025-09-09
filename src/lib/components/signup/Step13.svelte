<script lang="ts">
	import { toast } from 'svelte-sonner';

	let { step = $bindable() } = $props();

	let agreed = $state(false);
</script>

<div
	class="mx-auto flex max-w-lg min-w-md flex-col gap-5 rounded-xl bg-black/30 p-10 shadow-lg backdrop-blur-xs"
>
	<section>
		<h1 class="text-2xl md:text-3xl text-white">Privacy Acknowledgement & User Agreement</h1>
	</section>

	<div class="flex flex-col gap-2 text-sm text-white">
		<p>Before continuing, please review and acknowledge the following:</p>
		<ul class="list-inside list-disc">
			<li>
				You have read and understood our
				<a
					href="/files/privacy-policy.pdf"
					class="text-white/50 underline hover:text-white/80"
					target="_blank">Privacy Policy</a
				>.
			</li>
			<li>
				You have read and understood our
				<a
					href="/files/terms-of-use.pdf"
					class="text-white/50 underline hover:text-white/80"
					target="_blank">Terms of Use</a
				>.
			</li>
			<li>You agree to be bound by both documents.</li>
		</ul>
	</div>

	<div class="flex items-start gap-2">
		<input type="checkbox" id="acknowledge" class="focus:outline-none" bind:checked={agreed} />
		<label for="acknowledge" class="text-sm text-white">
			I acknowledge that I have read and agree to the Privacy Policy and Terms of Use
		</label>
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
			onclick={() => {
				agreed ? step++ : toast.error('Please read and agree to continue.');
			}}
		>
			Continue
		</button>
	</div>
</div>
