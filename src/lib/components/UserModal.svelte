<script lang='ts'>
    import { fade } from "svelte/transition";
    import { onMount, tick } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import { toast } from "svelte-sonner";
    import type { Message } from "$lib/types/Chat";
    
    let { id, gender, other_gender, verified, golf_id, name, handicap_index, member, src, closeModal, bio, images, self } = $props();

    let messages: Message[] = $state([]);
    let newMessage = $state('');
    let chatId = $state('');
    let channel;
    let isFriend = $state(false);
    let hasSentMessage = $state(false);
    let inputRef: HTMLInputElement; // For keeping the text box focused
    let bottomRef: HTMLElement; // For scrolling the message chat down after sending a message

    async function getOrCreateChat() {
        const response = await fetch('/api/chats', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ otherUserId: id })
        })

        const res = await response.json();

        if (response.ok) {
            chatId = res.chatId
        } else {
            console.error('Failed to create chat:', res.error);
        }
    }

    async function loadMessages() {
        const res = await fetch(`/api/message?chatId=${chatId}`);
        const data = await res.json();
        if (res.ok) {
            messages = data;
        } else {
            console.error('Load error:', data.error);
        }
        await tick(); // Waits for the bottom of the chat anchor element to load.
        bottomRef.scrollIntoView({ behavior: 'smooth' });
    }

    async function sendMessage(event: SubmitEvent) {
        event.preventDefault();

        const m = newMessage.trim();
        if (m === '') return;

        newMessage = '';
        const res = await fetch('/api/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, content: m })
        });

        const data = await res.json();

        if (!res.ok) {
            console.error('Send error:', data.error);
        }

        // if (!isFriend) {
        //     hasSentMessage = true;
        //     // Send friend request
        //     const res = await fetch('/api/add_friend', {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ receiver_id: id, text: m })
        //     })

        //     const data = await res.json();

        //     if (!res.ok) {
        //         toast.error(data.error);
        //         return;
        //     }

        //     toast.success(data.data);
        // }


        await loadMessages();
        await tick();
        inputRef.focus();
    }

    onMount(async () => {
        try {
            // isFriend = self.friends && self.friends.includes(id);

            await getOrCreateChat();
            await loadMessages();

            // Checks if you have aleady sent a message to a non-friend
            if (!isFriend) {
                hasSentMessage = messages.some(msg => msg.sender_id === self.id);
            }

            const channelName = 'private_chat_' + chatId;
            const alreadyExists = supabase.getChannels().some(
                (ch) => ch.topic === `realtime:${channelName}`
            );

            if (!alreadyExists) {
                channel = supabase.channel(channelName)
                    .on(
                        'postgres_changes',
                        {
                            event: 'INSERT',
                            schema: 'public',
                            table: 'messages',
                            filter: `chat_id=eq.${chatId}`
                        },
                        (payload) => {
                            messages = [...messages, payload.new as Message];
                        }
                    );

                channel.subscribe();
            }

        } catch (err: any) {
            console.error('onMount error:', err.message || err);
        }
    });

</script>

<div 
    role="button"
	tabindex="0" 
    aria-label='Close Modal' 
    onclick={closeModal} 
    onkeydown={(e) => e.key === 'Esc' ? closeModal() : null}
    transition:fade={{ duration:300 }} 
    class='absolute w-full h-full top-0 left-0 bg-gray-500/50 flex justify-center items-center z-40'
>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class='bg-white rounded-lg p-6 w-[80%] h-[80%] grid grid-cols-2' onclick={(e) => { e.stopPropagation() }} aria-label='User Modal' >
        <div class='flex flex-col gap-2'>
            <div class='w-40 aspect-square object-cover rounded-lg overflow-hidden mb-2'>
                <img {src} alt="" class='w-full h-full object-cover object-center'>
            </div>
            <section class='flex flex-col'>
                <h1 class='text-xl'>{name} 
                    <span class={`text-sm ${verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}>
                        {verified ? 'Verified' : 'Not Verified'}
                    </span>
                </h1>
            </section>
            <section class="flex flex-col">
                <h1 class="text-xl">User Info</h1>
                <span class='text-sm'>Club Name: <span class='text-gray-400'>{member}</span></span>
                <span class='text-sm'>Handicap Index: <span class='text-gray-400'>{handicap_index}</span></span>
                <span class='text-sm'>Gender: <span class='text-gray-400'>{gender}</span></span>
                <span class='text-sm'>Golf Id: <span class='text-gray-400'>{golf_id}</span></span>
            </section>
            <section class="flex flex-col">
                <h1 class="text-black text-xl">Bio</h1>
                <p class="text-sm">{bio ?? "No bio yet."}</p>
            </section>
            <section class='flex flex-col'>
                <h1 class='text-xl'>User Images</h1>
            </section>
        </div>
        <div class='flex flex-col relative overflow-y-hidden'>
            <h1 class='text-2xl h-8'>{name}</h1>
            <div class='overflow-y-auto flex flex-1 flex-col gap-5 pr-5'>
                {#each messages as message}
                    {#if message.sender_id == id}
                        <div class='flex flex-row items-end gap-5'>
    
                            <div class='w-10 rounded-full overflow-hidden aspect-square'>
                                <img src="{src ?? "/icons/DefaultProfile.png"}" alt="" class='object-cover w-full h-full'>
                            </div>
                            <div class='bg-gray-200 w-fit rounded-lg p-2'>
                                <p class='max-w-[500px] text-wrap w-fit p-0 m-0'>{message.content}</p>
                            </div>
                        </div>
                    {:else}
                        <div class="flex flex-row items-end gap-5 justify-end">
                            <div class="bg-gray-200 w-fit rounded-lg p-2">
                                <p class='max-w-[300px] text-wrap w-fit p-0 m-0'>{message.content}</p>
                            </div>
                            <div class="w-10 rounded-full overflow-hidden aspect-square">
                                <img src="{self.avatar_url ?? "/icons/DefaultProfile.png"}" alt="" class='object-cover w-full h-full'>
                            </div>
                        </div>
                    {/if}
                {/each}
                <div bind:this={bottomRef}></div>
            </div>
            <form class="gap-4 w-full items-center border-t pt-4 bottom-0 z-50 bg-white flex" onsubmit={sendMessage}>

                <input
                    bind:value={newMessage}
                    bind:this={inputRef}
                    class="flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring-0"
                    placeholder="Type your message..."
                />
                <button 
                    type='submit' 
                    class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 cursor-pointer"
                >
                    {`Message ${name.split(' ')[0]}`}
                </button>
            </form>
        </div>
    </div>
</div>