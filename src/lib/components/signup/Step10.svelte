<script lang="ts">
    import { toast } from "svelte-sonner";

	let {
        password = $bindable(),
        passwordConfirm = $bindable(),
		step = $bindable(),
	} = $props();

    const handleSubmit = () => {
        if (!password || !passwordConfirm) {
            toast.error("Please fill out all the fields");
            return;
        } else if (password.length < 6) {
            toast.error("Please ensure your password is at least 6 characters.")
            return;
        } else if (password !== passwordConfirm) {
            toast.error("The entered passwords do not match.");
            return;
        }

        step++;
    }
</script>

<div
	class="flex h-full w-full items-center justify-center"
>
    <div class='w-96 flex flex-col gap-10'>
        <div class='flex flex-col gap-2'>
            <section>
                <h1 class='text-3xl'>Last Step!</h1>
                <span class='text-lg'>Please enter a password for your account</span>
            </section>
            <div>
                <input
                    type="password"
                    id="password"
                    placeholder='Password'
                    class="peer mt-0.5 w-full border-black border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400"
                    bind:value={password}
                />
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <section>
                <span class="text-lg">Please enter it again to confirm</span>
            </section>
            <div>
                <input
                    type="password"
                    id="passwordConfirm"
                    placeholder="Confirm Password"
                    class="peer mt-0.5 w-full border-black border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400"
                    bind:value={passwordConfirm}
                />
            </div>
        </div>
        <div class='w-full flex justify-end gap-2'>
            <button
				class="inline-block rounded-sm border border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                    onclick={() => step--}
                >
                    Go Back
            </button>
            <button
				class="inline-block rounded-sm border border-action bg-action px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-action focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
                    onclick={handleSubmit}
                >
                    Continue
            </button>
        </div>
    </div>
</div>
