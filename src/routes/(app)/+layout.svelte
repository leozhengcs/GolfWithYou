<script lang='ts'>
    import Navbar from "$lib/components/Navbar.svelte";

    let { children } = $props();
</script>

<Navbar/>
<main class='flex p-10 pt-32 min-h-screen flex-col overflow-x-hidden'>
    {@render children()}
</main>