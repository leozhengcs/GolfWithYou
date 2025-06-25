<script lang="ts">
	let {
        clubName = $bindable(),
		step = $bindable(),
	} = $props();
</script>

<div
	class="flex h-full w-full items-center justify-center"
>
    <div class='w-96 flex flex-col gap-5'>
        <section>
            <h1 class='text-3xl'>Now some questions regarding your membership</h1>
            <span class='text-lg'>What's your golf club name?</span>
        </section>
        <div>
            <input
                type="text"
                id="clubName"
                class="peer mt-0.5 w-full border-black border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400"
                placeholder="Shaughnessy Golf & Country Club"
                bind:value={clubName}
            />
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
