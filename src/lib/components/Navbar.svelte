<script lang='ts'>
    import { goto } from "$app/navigation";
    import Tooltip from "./Tooltip.svelte";

    let { profile } = $props();
</script>

<nav class='w-full flex flex-row justify-between items-center p-5 absolute top-0 z-50 shadow-md bg-primary text-accent h-[75px]'>
    <button class='w-15 cursor-pointer' onclick={() => goto('/discover')}>
        <img src="/icons/Logo.png" alt="">
    </button>
    <div class='flex flex-row gap-10'>
        <!-- <a class='text-lg' href="/discover">Discover</a> -->
        <!-- <a class='text-lg' href="/friends">Friends</a> -->
        <!-- <a class='text-lg' href="/profile">Profile</a> -->
        <Tooltip text='View Profile'>
            <button onclick={() => goto('/profile')} class='aspect-square w-12 bg-white rounded-full overflow-clip cursor-pointer flex items-end justify-center'>
                <img src={profile && profile.avatar_url || "/icons/DefaultProfile.png"} alt="" class={`${profile && profile.avatar_url ? 'w-full h-full' : 'w-10 h-10'} object-cover object-center`}>
            </button>
        </Tooltip>
    </div>
</nav>