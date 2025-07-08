<script lang='ts'>
    import { goto } from "$app/navigation";
</script>

<nav class='w-full flex flex-row justify-between items-center p-5 absolute top-0 z-50 shadow-md bg-primary text-accent h-[75px]'>
    <button class='w-15 cursor-pointer' onclick={() => goto('/discover')}>
        <img src="/icons/Logo.png" alt="">
    </button>
    <div class='flex flex-row gap-10'>
        <a class='text-lg' href="/discover">Discover</a>
        <a class='text-lg' href="/friends">Friends</a>
        <a class='text-lg' href="/profile">Profile</a>
    </div>
</nav>