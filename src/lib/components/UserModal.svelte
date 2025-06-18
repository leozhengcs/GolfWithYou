<script lang='ts'>
    import { fade } from "svelte/transition";

    let { name, age, handicap_index, member, src, closeModal } = $props();

</script>

<div 
    role="button"
	tabindex="0" 
    aria-label='Close Modal' 
    onclick={closeModal} 
    onkeydown={(e) => e.key === 'Esc' || e.key === ' ' ? closeModal() : null}
    transition:fade={{ duration:300 }} 
    class='absolute w-full h-full top-0 left-0 bg-gray-500/50 flex justify-center items-center z-50'
>
    <div class='bg-white rounded-lg p-5 w-96 relative flex flex-col text-left'>
        <div class='w-full aspect-square object-cover rounded-lg overflow-hidden mb-2'>
            <img {src} alt="" class='w-full h-full object-cover object-center'>
        </div>
        <h1 class='text-xl'>{name}</h1>
        <span class='text-gray-400'>{age} Years Old</span>
        <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div class="mt-1.5 sm:mt-0 text-left">
            <p class="text-gray-500">Bio</p>
            <p class="text-sm">Passionate amateur golfer always looking to connect with others who enjoy the game. I love exploring private courses and sharing relaxed, competitive rounds with like-minded players. Whether you're up for a casual nine or a full 18, I’m always down to tee it up with new friends. Let’s make some great shots — and even better memories.</p>
            </div>
        </div>
        <button class='text-left bg-blue-300 p-1 rounded-lg w-fit my-1 cursor-pointer'>
            Add Friend
        </button>
    </div>
</div>