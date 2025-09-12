<!-- <div
    role="button"
    tabindex="0"
    aria-label="Close Modal"
    onclick={closeModal}
    onkeydown={(e) => (e.key === 'Esc' ? closeModal() : null)}
    transition:fade={{ duration: 300 }}
    class="fixed inset-0 z-[60] flex h-full w-full flex-col items-center justify-center bg-gray-500/50 md:z-40 md:flex-1 md:flex-row"
> -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- TODO: Clean up if statements to remove selectedTab dependency -->
    <!-- {#if selectedTab === 'overview'} -->
    <div
        class="grid h-[85%] w-[90%] grid-cols-1 rounded-lg bg-white p-5 md:h-[80%] md:w-[80%] md:grid-cols-[30%_70%] md:p-6"
        onclick={(e) => {
            e.stopPropagation();
        }}
        aria-label="User Modal"
    >
        <div class="flex flex-col gap-2 md:mr-5">
            <div class="flex w-full flex-row md:flex-col gap-5">
                <div
                    class="mb-2 flex aspect-square h-full items-center justify-center overflow-hidden"
                >
                    <img
                        {src}
                        alt=""
                        class="h-12 w-12 rounded-full object-cover object-center md:h-40 md:w-40 md:rounded-none"
                    />
                </div>
                <section class="flex flex-col">
                    <h1 class="text-lg md:text-xl">
                        {name}
                    </h1>
                    <span
                        class={`text-xs ${verified ? 'bg-green-500' : 'bg-red-500'} w-fit rounded-lg p-1 text-white`}
                    >
                        {verified ? 'Verified' : 'Awaiting Verification'}
                    </span>
                    {#if !verified && self.verified}
                        <button
                            onclick={handleVouch}
                            class="bg-action z-50 mt-2 w-fit rounded-lg p-1 text-xs text-white"
                        >
                            Vouch for them
                        </button>
                    {/if}
                </section>
            </div>
            <!-- <section class="flex flex-col">
                    <h1 class="text-xl">User Info</h1>
                    <span class="text-sm">Club Name: <span class="text-gray-400">{member}</span></span>
                    <span class="text-sm"
                        >Handicap Index: <span class="text-gray-400">{handicap_index}</span></span
                    >
                    <span class="text-sm">Gender: <span class="text-gray-400">{gender}</span></span>
                    <span class="text-sm">Golf Id: <span class="text-gray-400">{golf_id}</span></span>
                    <span class="text-sm">Postal Code: <span class="text-gray-400">{postal_code}</span></span>
                </section>
                <section class="hidden flex-col md:flex">
                    <h1 class="text-xl text-black">Bio</h1>
                    <p class="text-sm">{bio && bio.length === 0 ? 'No bio yet.' : bio}</p>
                </section>
                <section class="hidden flex-col md:flex">
                    <h1 class="text-xl">User Images</h1>
                </section> -->
        </div>
        
        {#if loading}
            <LoaderChat />
        {:else}
            <div class="relative flex-col gap-5 overflow-y-hidden flex">
                <h1 class="h-8 text-2xl hidden md:block">{name}</h1>
                <div class="flex flex-1 flex-col gap-8 overflow-y-auto pr-5">
                    {#each messages as message}
                        {#if message.sender_id == id}
                            <div class="flex flex-row items-end gap-5">
                                <div class="aspect-square w-10 overflow-hidden rounded-full">
                                    <img
                                        src={src ?? '/icons/DefaultProfile.png'}
                                        alt=""
                                        class="h-full w-full object-cover"
                                    />
                                </div>
                                <div class="w-fit rounded-lg bg-gray-200 p-2">
                                    <p class="m-0 w-fit max-w-[500px] p-0 text-wrap">{message.content}</p>
                                </div>
                            </div>
                        {:else}
                            <div class="flex flex-row items-end justify-end gap-5">
                                <div class="w-fit rounded-lg bg-gray-200 p-2">
                                    <p class="m-0 w-fit max-w-[300px] p-0 text-wrap">{message.content}</p>
                                </div>
                                <div class="aspect-square w-10 overflow-hidden rounded-full">
                                    <img
                                        src={self.avatar_url ?? '/icons/DefaultProfile.png'}
                                        alt=""
                                        class="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        {/if}
                    {/each}
                    <div bind:this={bottomRef}></div>
                </div>
                <form
                    class="bottom-0 z-50 flex w-full items-center gap-4 border-t bg-white pt-4"
                    onsubmit={sendMessage}
                >
                    <input
                        bind:value={newMessage}
                        bind:this={inputRef}
                        class="flex-1 rounded-full px-4 py-2 focus:ring-0 focus:outline-none"
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        class="cursor-pointer rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        {`Message ${name.split(' ')[0]}`}
                    </button>
                </form>
            </div>
        {/if}
        <!-- <div class="relative flex w-fit gap-2 rounded-b-lg">
            {#each userTabs as tab}
                <button
                    onclick={() => (selectedTab = tab)}
                    class="py-2 text-xs uppercase transition-all duration-350
                    {selectedTab === tab
                        ? 'z-10 bg-white text-blue-600'
                        : 'bg-gray-300 text-gray-600 hover:bg-gray-400'}
                "
                >
                    {tab}
                </button>
            {/each}
        </div> -->
    </div>
    <!-- {:else if selectedTab === 'chat'}
        <div
            class="relative flex h-[85%] w-[90%] flex-col rounded-lg bg-white p-5 md:hidden"
            onclick={(e) => e.stopPropagation()}
        >
            <h1 class="h-8 text-2xl">{name}</h1>
            {#if loading}
                <LoaderChat />
            {:else}
                <div class="flex flex-1 flex-col gap-5 overflow-y-auto pr-5">
                    {#each messages as message}
                        {#if message.sender_id == id}
                            <div class="flex flex-row items-end gap-5">
                                <div class="aspect-square w-10 overflow-hidden rounded-full">
                                    <img
                                        src={src ?? '/icons/DefaultProfile.png'}
                                        alt=""
                                        class="h-full w-full object-cover"
                                    />
                                </div>
                                <div class="w-fit rounded-lg bg-gray-200 p-2">
                                    <p class="m-0 w-fit max-w-[500px] p-0 text-xs text-wrap">{message.content}</p>
                                </div>
                            </div>
                        {:else}
                            <div class="flex flex-row items-end justify-end gap-5">
                                <div class="w-fit rounded-lg bg-gray-200 p-2">
                                    <p class="m-0 w-fit max-w-[300px] p-0 text-xs text-wrap">{message.content}</p>
                                </div>
                                <div class="aspect-square w-10 overflow-hidden rounded-full">
                                    <img
                                        src={self.avatar_url ?? '/icons/DefaultProfile.png'}
                                        alt=""
                                        class="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        {/if}
                    {/each}
                    <div bind:this={bottomRef}></div>
                </div>
                <form
                    class="bottom-0 z-50 flex w-full items-center gap-4 border-t bg-white pt-4"
                    onsubmit={sendMessage}
                >
                    <input
                        bind:value={newMessage}
                        bind:this={inputRef}
                        class="flex-1 rounded-full px-4 py-2 text-xs focus:ring-0 focus:outline-none"
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        class="cursor-pointer rounded-full bg-blue-500 px-4 py-2 text-xs text-white hover:bg-blue-600"
                    >
                        {`Message ${name.split(' ')[0]}`}
                    </button>
                </form>
            {/if}
        </div>
    {:else if selectedTab === 'description'}
        <div
            class="relative flex h-[85%] w-[90%] flex-col gap-5 rounded-lg bg-white p-5 md:hidden"
            onclick={(e) => e.stopPropagation()}
        >
            <section class="flex flex-col">
                <h1 class="text-base">Bio</h1>
                <p class="text-xs text-gray-400">{bio && bio.length !== 0 ? bio : 'No user bio yet.'}</p>
            </section>
            <section class="flex flex-col">
                <h1 class="text-base">User Images</h1>
            </section>
        </div>
    {/if} -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- <div
        class="md:hidden"
        onclick={(e) => {
            e.stopPropagation();
        }}
    >
        <div class="relative flex w-fit gap-1 rounded-b-lg px-1">
            {#each userTabs as tab}
                <button
                    onclick={() => (selectedTab = tab)}
                    class={`relative rounded-b-md px-4 py-2 text-xs uppercase transition-all duration-300
                ${
                    selectedTab === tab
                        ? '-mt-px border border-transparent border-t-white bg-white'
                        : 'border border-transparent bg-gray-300 text-gray-600 hover:bg-gray-400'
                }
            `}
                >
                    {tab}
                </button>
            {/each}
        </div>
    </div> -->
<!-- </div> -->
