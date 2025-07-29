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
		class="text-accent after:bg-accent absolute top-5 right-5 cursor-pointer p-2 text-lg after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-full after:origin-center after:-translate-x-1/2 after:scale-x-0 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
	>
		Sign Up
	</button>
	<div
		class="bg-primary relative z-10 flex h-auto w-96 flex-col items-center gap-10 rounded-lg px-12 py-8 shadow-lg"
	>
		<form method="POST" class="flex flex-col gap-5">
			<h1 class="text-accent text-xl">Login</h1>
			<div>
				<input
					type="text"
					id="email"
					name="email"
					class="peer mt-5 w-full rounded-lg border-0 border-b border-gray-300 focus:ring-0 focus:outline-none sm:text-sm"
					placeholder="Email"
					bind:value={email}
				/>
				<input
					type="password"
					id="password"
					name="password"
					class="peer mt-5 w-full rounded-lg border-0 border-b border-gray-300 focus:ring-0 focus:outline-none sm:text-sm"
					placeholder="Password"
					bind:value={password}
				/>
			</div>
			<a href="/auth/forgot-password" class="cursor-pointer text-left text-sm text-gray-400 hover:underline">Forgotten Password?</a>
			<button
				class="border-accent bg-accent hover:text-accent inline-block w-fit cursor-pointer rounded-sm border px-4 py-2 text-sm font-medium text-white hover:bg-transparent focus:ring-3 focus:outline-hidden"
			>
				Login
			</button>
		</form>
	</div>
</div>
