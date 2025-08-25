<script lang='ts'>
    import { goto } from "$app/navigation";
	import { chatMap, unreadMap } from "$lib/stores/globalStates.svelte";
	import { onlineUsers } from "$lib/stores/users.svelte";
    import Tooltip from "./Tooltip.svelte";

    let { profile } = $props();
    // onclick={()=>{console.log($onlineUsers);
    //   console.log('UnreadMap:\n', $unreadMap);
	// 	 console.log('chatMap:\n', $chatMap);}}
</script>

<nav class='w-full flex flex-row justify-between items-center p-5 absolute top-0 z-50 shadow-md bg-sky h-[90px]'
    onclick={()=>{console.log($onlineUsers);
        console.log('UnreadMap:\n', $unreadMap);
	 	console.log('chatMap:\n', $chatMap);}}
	>
    <button class='w-15 cursor-pointer' onclick={() => goto('/discover')}>
        <img src="/icons/Logo.png" alt="">
    </button>
    <a href='/discover' class='text-4xl text-center font-fugaz text-primary'>Teesaway</a>
    <div class='flex flex-row gap-10'>
        <Tooltip text='View Profile'>
            <button onclick={() => goto('/profile')} class='aspect-square w-12 bg-white rounded-full overflow-clip cursor-pointer flex items-end justify-center'>
                <img src={profile && profile.avatar_url || "/icons/DefaultProfile.png"} alt="" class={`${profile && profile.avatar_url ? 'w-full h-full' : 'w-10 h-10'} object-cover object-center`}>
            </button>
        </Tooltip>
    </div>
</nav>