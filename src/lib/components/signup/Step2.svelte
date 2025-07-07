<script lang="ts">
    import { toast } from "svelte-sonner";

	let {
        email = $bindable(),
		step = $bindable(),
	} = $props();

    let invalidEmail: null | string = $state(null);

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            invalidEmail = email;
            toast.error("Invalid Email, please enter a valid email");
            return;
        }

        step++;
    }
</script>


<div class='w-96 flex flex-col gap-5'>
    <section>
        <h1 class='text-3xl'>What's your email address?</h1>
    </section>
    <div>
        <input
            type="text"
            id="phone"
            class={`peer mt-0.5 w-full ${invalidEmail == email? "border-red-400" : "border-black"} border-0 border-b sm:text-sm focus:outline-none focus:ring-0 bg-transparent lg:text-base focus:border-blue-400`}
            placeholder="johndoe@example.com"
            bind:value={email}
        />
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
