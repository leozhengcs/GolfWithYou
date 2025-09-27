<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div
		class="mx-auto flex max-w-lg min-w-sm flex-col gap-5 rounded-xl bg-black/30 p-6 shadow-lg backdrop-blur-xs"
		out:fly={{ duration: 500, y: -100 }}
		in:fly={{ delay: 200, duration: 1000, y: -100 }}
	>
		<h1 class="font-roboto text-3xl text-white">About Teesaway</h1>
		<p class="text-white text-sm">
			Teesaway.com is a society where only the private golf club members (as known users) reside. In
			this society, our users can meet other users who are beyond your own clubs, and explore the
			opportunities to play away in the other private clubs.
		</p>
		<p class="text-white text-sm">
			Distinguishing from the other social medias on the market, Teesaway creates a platform for the
			users to chat one-to-one. Our users perfectly by-pass any annoying messages which we receive a
			ton every day. And the message receivers have the privilege to continue the conversations.
		</p>
		<p class="text-white text-sm">
			Our users’ privacy is always our priority. Teesaway never shares our user’s email and phone
			number. Our chatting platform is the only channel between our users.
		</p>
		<p class="text-white text-sm">
			You are welcome to reach out to us with your questions. Please email
			teesawaycustomercare@gmail.com.
		</p>
		<p class="text-white text-sm hidden md:block">
			We hope teesaway.com will create more chances for you to get to know the other users.
		</p>
	</div>
</div>
