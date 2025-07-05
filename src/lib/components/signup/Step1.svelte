<script lang="ts">
    import { goto } from "$app/navigation";

	let {
		fullName = $bindable(),
		email = $bindable(),
        password = $bindable(),
        confirmPassword = $bindable(),
		step = $bindable(),
	} = $props();
</script>

<div
	class="flex h-full w-full items-center justify-center bg-cover bg-center"
	style="background-image:url('/images/signup/signup1.jpg')"
>
	<div class="absolute inset-0 bg-gray-800/50"></div>

    <!-- Login Button -->
    <button 
        onclick={() => goto('/auth/login')}
        class="absolute top-5 right-5 p-2 cursor-pointer text-lg text-white after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-full after:origin-center after:-translate-x-1/2 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
    >
        Login
    </button>
	<div
		class="relative z-10 flex h-auto w-96 flex-col items-center gap-10 rounded-lg bg-white px-12 py-8 shadow-lg"
	>
		<section class="flex w-fit flex-col items-center">
			<div class="w-10">
				<img src="/icons/Golf.png" alt="" />
			</div>
			<h1 class="text-center text-2xl text-nowrap">Golfing With You</h1>
		</section>
		<div class="space-y-4 w-full">
			<div>
                <input
                    type="text"
                    id="fullName"
                    class="peer mt-0.5 w-full border-gray-300 border-0 border-b sm:text-sm focus:outline-none focus:ring-0"
                    placeholder="Full Name"
                    bind:value={fullName}
                />
			</div>

			<!-- Email -->
			<div>
                <input
                    type="email"
                    id="email"
                    class="peer mt-0.5 w-full border-gray-300 border-0 border-b sm:text-sm focus:outline-none focus:ring-0"
                    placeholder="Email"
                    bind:value={email}
                />
			</div>

            <button
                class="inline-block rounded-sm border border-blue-300 bg-blue-300 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden cursor-pointer"
                onclick={() => step++}
            >
                Get Started
            </button>
        </div>
	</div>
</div>
