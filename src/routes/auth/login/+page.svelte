<script lang="ts">
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
</script>

<div
	class="flex h-screen w-full items-center justify-center bg-cover bg-center"
	style="background-image:url('/images/signup/signup1.jpg')"
>
	<div class="absolute inset-0 bg-gray-800/50"></div>
	<!-- Login Button -->
	<button
		onclick={() => goto('/')}
		class="absolute top-5 right-5 cursor-pointer p-2 text-lg text-accent after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-full after:origin-center after:-translate-x-1/2 after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
	>
		Sign Up
	</button>
	<div
		class="relative z-10 flex h-auto w-96 flex-col items-center gap-10 rounded-lg bg-primary px-12 py-8 shadow-lg"
	>
		<form method="POST" class="flex flex-col gap-5">
			<h1 class="text-xl text-accent">Login</h1>
			<div>
				<input
					type="text"
					id="email"
                    name='email'
					class="peer mt-5 w-full border-0 border-b border-gray-300 focus:ring-0 focus:outline-none sm:text-sm rounded-lg"
					placeholder="Email"
					bind:value={email}
				/>
				<input
					type="password"
					id="password"
                    name='password'
					class="peer mt-5 w-full border-0 border-b border-gray-300 focus:ring-0 focus:outline-none sm:text-sm rounded-lg"
					placeholder="Password"
					bind:value={password}
				/>
			</div>
			<button
				class="inline-block w-fit cursor-pointer rounded-sm border border-accent bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-accent focus:ring-3 focus:outline-hidden"
			>
				Login
			</button>
		</form>
	</div>
</div>
