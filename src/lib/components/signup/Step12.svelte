<script lang="ts">
	import { toast } from 'svelte-sonner';

	let { step = $bindable(), fileImage = $bindable() } = $props();

	let dragging = $state(false);
	let image: string | null = $state(null);
	let fileInput: HTMLInputElement;

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragging = false;

		const files = event.dataTransfer?.files;
		if (files && files.length && files[0].type.startsWith('image/')) {
			image = URL.createObjectURL(files[0]);
			fileImage = files[0];
			console.log(fileImage.size);
		}
	}

	function handleClick(): void {
		fileInput.click();
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			handleClick();
		}
	}

	function handleDragOver(event: DragEvent): void {
		event.preventDefault();
		dragging = true;
	}

	function handleDragLeave(): void {
		dragging = false;
	}

	function handleFileChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (file && file.type.startsWith('image/')) {
			image = URL.createObjectURL(file);
			fileImage = file;

			target.value = '';
		}
	}
</script>

<div class="flex flex-col gap-5">
	<h1 class="text-xl">Please Upload a Profile for Other to see you!</h1>
	<div
		class={`cursor-pointer rounded-md border-2 border-dashed px-6 py-10 text-center text-gray-500 transition-colors duration-300 outline-none focus:ring-2 focus:ring-offset-2 ${
			dragging ? 'border-gray-400 bg-gray-100' : 'border-gray-300'
		}`}
		ondrop={handleDrop}
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		onclick={handleClick}
		onkeydown={handleKeydown}
		tabindex="0"
		role="button"
		aria-label="Upload image"
	>
		<p class="text-sm">Click or drag & drop an image here</p>
	</div>
	<input
		type="file"
		accept="image/*"
		onchange={handleFileChange}
		style="display: none;"
		bind:this={fileInput}
	/>
	<div class="flex w-full justify-end gap-2">
		<button
			class="border-action bg-action hover:text-action inline-block w-fit cursor-pointer rounded-sm border px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent focus:ring-1 focus:outline-hidden"
			onclick={() => step--}
		>
			Go Back
		</button>
		<button
			class="border-action bg-action hover:text-action inline-block w-fit cursor-pointer rounded-sm border px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-transparent focus:ring-1 focus:outline-hidden"
			onclick={() => {
				if (!image) {
					toast.error('Please Upload a Profile Image');
					return;
				}
				step++;
			}}
		>
			Continue
		</button>
	</div>

	{#if image}
		<p>Preview:</p>
		<img
			src={image}
			alt=""
			class="aspect-square h-56 w-56 rounded-md border-1 border-black object-cover object-center"
		/>
	{/if}
</div>
