<script lang="ts">
	import { toTitleCase } from '$lib/utils/string';
	import { fade } from 'svelte/transition';
	import { portal } from '$lib/actions/portal';

	let { options, label, searchLabel, selectedClubs = $bindable() } = $props();

	let open = $state(false);

	let clubSearch = $state('');
	let filteredOptions: string[] = $state(options);

	const searchClubs = (event: Event) => {
		if (event) {
			event.preventDefault();
		}
		const normalized = clubSearch.trim().toLowerCase();
		if (!clubSearch) filteredOptions = options;

		filteredOptions = options.filter((option: string) => option.toLowerCase().includes(normalized));
	};

	const clearFilters = () => {
		selectedClubs = [];
		open = false;
	};
</script>

<button
	id="dropdownSearchButton"
	data-dropdown-toggle="dropdownSearch"
	data-dropdown-placement="bottom"
	class="inline-flex w-full cursor-pointer items-center rounded-lg bg-[#84A98C] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#52796F] focus:bg-[#52796F] focus:ring-1 focus:outline-none sm:w-fit"
	type="button"
	onclick={() => (open = true)}
	>{selectedClubs.length > 0
		? `${selectedClubs.length} ${selectedClubs.length > 1 ? 'Clubs' : 'Club'} Selected`
		: label}
	<svg
		class="ms-3 h-2.5 w-2.5"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 10 6"
	>
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="m1 1 4 4 4-4"
		/>
	</svg>
</button>

<!-- MOBILE - Dropdown menu -->
{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		use:portal
		onclick={() => (open = false)}
		class="fixed top-0 left-0 z-[70] flex h-full w-full items-center justify-center bg-black/30"
		transition:fade={{ duration: 300 }}
	>
		<div
			id="dropdownSearch"
			class={`${open ? 'md:block' : 'hidden'} w-60 rounded-lg bg-white shadow-sm md:w-96`}
			onclick={(e) => e.stopPropagation()}
		>
			<div class="p-3">
				<label for="input-group-search" class="sr-only">Search</label>
				<div class="relative">
					<div
						class="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
					>
						<svg
							class="h-4 w-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						bind:value={clubSearch}
						oninput={searchClubs}
						type="text"
						id="input-group-search"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-[#52796F] focus:ring-[#52796F]"
						placeholder={searchLabel}
					/>
				</div>
			</div>
			<ul
				class="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
				aria-labelledby="dropdownSearchButton"
			>
				<!-- <li>
					<div class="flex items-center rounded-sm ps-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<input
							id="checkbox-item-11"
							type="checkbox"
							value=""
							class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
						/>
						<label
							for="checkbox-item-11"
							class="ms-2 w-full rounded-sm py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>Bonnie Green</label
						>
					</div>
				</li> -->
				{#each filteredOptions as option, index}
					<li>
						<div class="flex items-center rounded-sm ps-2 hover:bg-[#52796F]">
							<input
								id={`checkbox-item-${index}`}
								type="checkbox"
								value={option}
								bind:group={selectedClubs}
								class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-black checked:bg-[#52796F] focus:ring-1 focus:ring-[#52796F]"
							/>
							<label
								for={`checkbox-item-${index}`}
								class="ms-2 w-full rounded-sm py-2 text-sm font-medium text-gray-900"
								>{toTitleCase(option)}</label
							>
						</div>
					</li>
				{/each}
			</ul>
			<button
				onclick={clearFilters}
				class="flex w-full items-center rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 text-sm font-medium text-red-600 hover:bg-gray-100 hover:underline"
			>
				<svg
					width="24px"
					height="24px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M5.12817 8.15391C5.12817 10.4103 5.12817 13.5898 5.12817 15.1283C5.23074 16.4616 5.3333 18.2052 5.43587 19.436C5.53843 20.8719 6.7692 22.0001 8.2051 22.0001H15.7948C17.2307 22.0001 18.4615 20.8719 18.5641 19.436C18.6666 18.2052 18.7692 16.4616 18.8718 15.1283C18.9743 13.5898 18.8718 10.4103 18.8718 8.15391H5.12817Z"
						fill="#030D45"
					/>
					<path
						d="M19.1795 5.07698H16.6154L15.7949 3.53852C15.2821 2.61545 14.359 2.00006 13.3333 2.00006H10.8718C9.84615 2.00006 8.82051 2.61545 8.41026 3.53852L7.38462 5.07698H4.82051C4.41026 5.07698 4 5.48724 4 5.8975C4 6.30775 4.41026 6.71801 4.82051 6.71801H19.1795C19.5897 6.71801 20 6.41032 20 5.8975C20 5.38468 19.5897 5.07698 19.1795 5.07698ZM9.12821 5.07698L9.64103 4.25647C9.84615 3.84621 10.2564 3.53852 10.7692 3.53852H13.2308C13.7436 3.53852 14.1538 3.74365 14.359 4.25647L14.8718 5.07698H9.12821Z"
						fill="#030D45"
					/>
				</svg>
				Clear Filters
			</button>
		</div>
	</div>
{/if}
