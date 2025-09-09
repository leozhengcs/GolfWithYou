<script lang='ts'>
    import { goto } from "$app/navigation";
    let { step = $bindable() } = $props();
</script>

<div class="flex h-full w-full items-center justify-center">
    <div
		class="max-w-sm mx-auto p-6 rounded-xl bg-black/30 backdrop-blur-xs shadow-lg flex"
	>
		<section class="flex w-fit flex-col items-center">
			<h1 class="text-center text-4xl text-nowrap text-white font-fugaz">Tees Away</h1>
            <span class='text-lg text-center text-white/30'>A Network to Connect all Members of Private Golf Clubs!</span>
		</section>
		<!-- <div class="flex flex-row justify-between items-center w-full">
            <button 
                onclick={() => goto('/auth/login')}
                class="relative p-2 cursor-pointer text-lg text-background after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-full after:origin-center after:-translate-x-1/2 after:bg-background after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
                Login
            </button>

            <button 
                onclick={() => step++}
                class="relative p-2 cursor-pointer text-lg text-background after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-full after:origin-center after:-translate-x-1/2 after:bg-background after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
                Register
            </button>
        </div> -->
	</div>
</div>