<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	let { supabase, id } = $props();

	// Temporarily limit number of files allowed to upload.
	const MAXFILES = 4;

	interface UploadedImage {
		src: string;
		name: string;
	}

	let files: File[] = $state([]);
	let previewUrls: string[] = $state([]);
	let fileInput: HTMLInputElement;
	let loading = $state(true);
	let uploadedPhotos: UploadedImage[] = $state([]);

	$inspect(uploadedPhotos);
	$inspect(files);

	const handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.files && Array.from(target.files ?? []).some((f) => f.size > 0)) {
			const selectedFiles = Array.from(target.files).filter((file) => file.size > 0);
			const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
			files = [...files, ...selectedFiles];
			previewUrls = [...previewUrls, ...newPreviews];
		}
	};

	const handleDelete = (index: number) => {
		files = files.filter((_, i) => i !== index);
		previewUrls = previewUrls.filter((_, i) => i !== index);
		URL.revokeObjectURL(previewUrls[index]);
	};

	const handleUploadFile = async () => {
		const formData = new FormData();
		formData.append('type', 'featuredImage');
		files.forEach((file) => formData.append('files', file));

		const res = await fetch('/api/uploadImage', {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
		if (res.ok) {
			toast.success("Successfully uploaded image.");
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else {
			toast.error(data.message);
		}
	};

	const handleDeleteFile = async (path: string) => {
		const res = await fetch('/api/deleteImage', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ fileName: path })
		});

		const data = await res.json();
		if (res.ok) {
			toast.success(data.message);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else {
			toast.error(data.message);
		}
	};

	// Used to clear the internal value of the input field
	function preparePicker() {
		if (fileInput) fileInput.value = '';
	}

	onMount(async () => {
		// Load the existing photos
		const { data, error } = await supabase.storage.from('user-images').list(id, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' }
		});

		if (error) {
			toast.error('Error loading the uploaded images, please try again later');
			loading = false;
			return;
		}
		uploadedPhotos = data.map((file: { name: string }) => {
			if (file.name !== '.emptyFolderPlaceholder') {
				return {
					src: supabase.storage.from('user-images').getPublicUrl(`${id}/${file.name}`).data
						.publicUrl,
					name: file.name
				};
			}
		});
		loading = false;
	});
</script>

<section
	class="flex h-full w-full flex-col gap-5 rounded-lg backdrop-blur-xs bg-black/30 px-5 py-5 md:p-10"
>
	<h1 class="text-3xl text-white">Featured Photos</h1>
	<h1 class="mt-10 text-3xl font-bold text-white">Posted Images</h1>
	{#if loading}
		<div
			class="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
		></div>
	{:else}
		<div class="flex w-full gap-5">
			{#each uploadedPhotos as photo}
				{#if photo}
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<div class="group relative aspect-square w-32 overflow-hidden rounded-xl" tabindex="0">
						<img src={photo.src} alt="" class="h-full w-full object-cover" />

						<section
							class="bg-opacity-50 absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-focus:opacity-100"
						></section>
						<div class="absolute w-full h-full inset-0 justify-center items-center hidden group-focus-within:flex">
                            <button onclick={() => handleDeleteFile(`${id}/${photo.name}`)} class='bg-red-500 text-white font-bold p-2 rounded-lg'>Delete</button>
                        </div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
	<div
		tabindex="0"
		role="button"
		aria-label="Drag and drop file upload"
		class="relative w-full cursor-pointer rounded-lg border-2 border-dashed bg-white p-6 transition-all duration-200 ease-in-out"
	>
		<input
			type="file"
			accept='image/*'
			name="upload"
			id="upload"
			multiple
			class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
			onchange={handleFileChange}
			bind:this={fileInput}
			onclick={preparePicker}
			ondrop={preparePicker}
		/>

		<div class="flex h-full flex-col items-center justify-center text-gray-700">
			{#if files.length > 0}
				{#each files as file, i}
					<p class="font-semibol z-20 text-center text-green-700">
						{file.name}<button
							type="button"
							class="cursor-pointer p-5 text-red-500"
							onclick={() => handleDelete(i)}>X</button
						>
					</p>
				{/each}
			{:else}
				<p class="text-center">
					Drag & Drop a file here <br />
					<span class="text-sm text-gray-500">or click to browse</span>
				</p>
			{/if}
		</div>
	</div>
	<button
		class="mt-5 w-fit rounded-lg bg-white px-5 py-2 font-bold duration-300 hover:bg-slate-300"
		onclick={handleUploadFile}>Save</button
	>
	<h1 class="mt-10 text-3xl font-bold text-white">Preview</h1>
	{#each previewUrls as preview}
		<div class="aspect-square w-32 overflow-hidden rounded-xl">
			<img src={preview} alt="" class="h-full w-full object-cover" />
		</div>
	{/each}
</section>
