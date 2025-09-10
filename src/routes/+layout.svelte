<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import Navbar from '$lib/components/Navbar.svelte';

	let { data, children } = $props();
	let { session, supabase, profile } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Toaster position="bottom-right" duration={3000} richColors closeButton />
<Navbar {profile} />
<main
	class="h-screen w-screen overflow-x-clip bg-[url('/images/landing.png')] bg-cover bg-center shadow-[inset_0_0_400px_rgba(0,0,0,1)]"
>
	{@render children()}
</main>
