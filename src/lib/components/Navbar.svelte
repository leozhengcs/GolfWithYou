<script lang='ts'>
    import { goto } from "$app/navigation";
</script>

<nav class='w-full flex flex-row justify-between items-center p-5 absolute top-0 z-50 shadow-md bg-primary text-accent h-[75px]'>
    <button class='w-10 cursor-pointer' onclick={() => goto('/discover')}>
        <img src="/icons/Golf.png" alt="">
    </button>
    <div class='flex flex-row gap-10'>
        <a href="/discover">Discover</a>
        <a href="/friends">Friends</a>
        <a href="/profile">Profile</a>
    </div>
</nav>