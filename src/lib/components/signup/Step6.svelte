<script lang="ts">
	let {
        ethnicity = $bindable(),
        otherEthnicity = $bindable(),
		step = $bindable(),
	} = $props();
</script>

<div
	class="flex h-full w-full items-center justify-center"
>
    <div class='w-96 flex flex-col gap-5'>
        <section>
            <h1 class='text-3xl'>Which best describes your ethnicity?</h1>
        </section>
        <div>
            <select
                id="ethnicitySelect"
                class="peer mt-0.5 w-full border-black border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400"
                bind:value={ethnicity}
                >
                    <option value="" disabled selected>Select ethnicity</option>
                    <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                    <option value="Asian">Asian</option>
                    <option value="Black or African American">Black or African American</option>
                    <option value="Hispanic or Latino">Hispanic or Latino</option>
                    <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                    <option value="White">White</option>
                    <option value="Two or More Races">Two or More Races</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
            </select>

            {#if ethnicity === "Other"}
                <input
                    type="text"
                    class="mt-2 w-full border-black border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400"
                    placeholder="Please specify your ethnicity"
                    bind:value={otherEthnicity}
                />
            {/if}
        </div>
        <div class='w-full flex justify-end gap-2'>
            <button
                    class="inline-block rounded-sm border border-blue-300 bg-blue-300 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                    onclick={() => step--}
                >
                    Go Back
            </button>
            <button
                    class="inline-block rounded-sm border border-blue-300 bg-blue-300 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                    onclick={() => step++}
                >
                    Continue
            </button>
        </div>
    </div>

	<!-- <div
		class="relative z-10 flex h-auto w-[60%] flex-col items-center gap-10 rounded-lg bg-white px-12 py-8 shadow-lg"
	>
		<section class="flex w-fit flex-col items-center">
			<h1 class="text-center text-2xl px-5">Now Some Information About You</h1>
		</section>
		<div class="space-y-4 w-full">
			<div>
				<label for="email" class="relative">
					<input
						type="email"
						id="email"
						class="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
						placeholder=""
						bind:value={email}
					/>
					<span
						class="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
					>
						Email
					</span>
				</label>
			</div>

			<div>
				<label for="password" class="relative">
					<input
						type="password"
						id="password"
						class="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
						placeholder=""
						bind:value={password}
					/>
					<span
						class="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
					>
						Password
					</span>
				</label>
			</div>

			<div>
				<label for="confirmPassword" class="relative">
					<input
						type="password"
						id="confirmPassword"
						class="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
						placeholder=""
						bind:value={confirmPassword}
					/>
					<span
						class="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
					>
						Confirm Password
					</span>
				</label>
			</div>

            <button
                class="inline-block rounded-sm border border-blue-300 bg-blue-300 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden cursor-pointer"
                onclick={() => step++}
            >
                Get Started
            </button>
        </div>
	</div> -->
</div>
