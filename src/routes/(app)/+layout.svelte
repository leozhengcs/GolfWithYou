<script lang='ts'>
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let { children } = $props();
</script>

<Navbar/>
<div class='flex p-10 pt-32 min-h-screen flex-col overflow-x-clip relative'>
    {@render children()}
</div>
<Footer/>