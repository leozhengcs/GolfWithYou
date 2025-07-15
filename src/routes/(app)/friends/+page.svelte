<script lang='ts'>
    let { data } = $props();
    let { user, friends, requests } = $derived(data);

    let chat = $state(false);
    let message = $state('');

    $inspect(requests);
    const sendMessage = () => {

    }
    const openChat = () => {
        chat = true;
    }
</script>

<div class='grid grid-cols-[250px_auto] flex-1 gap-16'>
    <section class="flex flex-col">
        <h1 class='text-2xl mb-2'>Friends</h1>
        <!-- <div class='w-full flex flex-row items-center rounded-lg px-2 gap-2 text-gray-700 bg-gray-300 mb-5'>
            <span>Search</span>
            <div class='w-5'>
                <img src="/icons/Search.png" alt="Search">
            </div>
        </div> -->
        <div class='flex flex-col'>
            {#each requests || [] as request} 
                <button onclick={openChat} class='grid grid-cols-[20%_80%] gap-5 p-2 overflow-hidden cursor-pointer hover:bg-gray-200 rounded-lg' aria-label='friend'>
                    <div class='aspect-square rounded-full overflow-hidden col-start-1'>
                        <img src={request.sender.avatar_url} alt="" class='w-full h-full object-cover'>
                    </div>
                    <div class='flex items-center col-start-2'>
                        <span>{request.sender.full_name}</span>
                    </div>
                </button>
            {/each}
            <!-- <button onclick={openChat} class='grid grid-cols-[20%_80%] gap-5 p-2 overflow-hidden cursor-pointer hover:bg-gray-200 rounded-lg' aria-label='friend'>
                <div class='aspect-square rounded-full overflow-hidden col-start-1'>
                    <img src="/images/example1.jpg" alt="" class='w-full h-full object-cover'>
                </div>
                <div class='flex items-center col-start-2'>
                    <span>Justin Han</span>
                </div>
            </button>
            <button onclick={openChat} class='grid grid-cols-[20%_80%] gap-5 p-2 overflow-hidden cursor-pointer hover:bg-gray-200 rounded-lg' aria-label='friend'>
                <div class='aspect-square rounded-full overflow-hidden col-start-1'>
                    <img src="/images/example2.jpg" alt="" class='w-full h-full object-cover'>
                </div>
                <div class='flex items-center col-start-2'>
                    <span>Alex Hughs</span>
                </div>
            </button> -->
        </div>
    </section>
    {#if chat}
        <section class='flex flex-col gap-5 relative'>
            <h1 class='text-2xl mb-12'>Justin Han</h1>
            <div class='flex flex-row items-end gap-5'>
                <div class='w-10 rounded-full overflow-hidden aspect-square'>
                    <img src="/images/example1.jpg" alt="" class='object-cover w-full h-full'>
                </div>
                <div class='bg-gray-200 w-fit rounded-lg p-2'>
                    <p class='max-w-[500px] text-wrap w-fit p-0 m-0'>Nice to meet you [user], I saw you were a member at [insert golf club] which was somewhere I've always wanted to go. Is it possible for you to host me in the upcoming weekend?</p>
                </div>
            </div>
            <div class="flex flex-row items-end gap-5 justify-end">
                <div class="bg-gray-200 w-fit rounded-lg p-2">
                    <p class='max-w-[300px] text-wrap w-fit p-0 m-0'>Nice to meet you [user], I saw you were a member at [insert golf club] which was somewhere I've always wanted to go. Is it possible for you to host me in the upcoming weekend?</p>
                </div>
                <div class="w-10 rounded-full overflow-hidden aspect-square">
                    <img src="/images/example3.jpg" alt="">
                </div>
            </div>
            <div class="mt-10 flex gap-4 w-full items-center border-t pt-4 absolute bottom-0 z-50">
                <input
                    bind:value={message}
                    onkeydown={(e) => e.key === 'Enter' && sendMessage()}
                    class="flex-1 border rounded-full px-4 py-2 outline-none"
                    placeholder="Type your message..."
                />
                <button onclick={sendMessage} class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                    Send
                </button>
            </div>
        </section>
    {/if}
</div>