<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import Navbar from '$lib/components/Navbar.svelte';
	import { navbarState } from '$lib/stores/navbarState.svelte';

	let { data, children } = $props();
	let { session, supabase, profile } = $derived(data);

	let scroller: HTMLElement;

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		scroller.addEventListener('scroll', () => {
			if (scroller.scrollTop > 100) {
				navbarState.show = false;
			} else {
				navbarState.show = true;
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Toaster position="bottom-right" duration={3000} richColors closeButton />
<Navbar {profile} />
<main
	bind:this={scroller}
	class="h-dvh w-screen overflow-y-auto overflow-x-clip shadow-[inset_0_0_400px_rgba(0,0,0,1)]"
>
	{@render children()}
</main>
