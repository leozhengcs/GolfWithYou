
<script lang='ts'>
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabaseClient";
  import Step1 from "$lib/components/signup/Step1.svelte";
  import Step2 from "$lib/components/signup/Step2.svelte";
  import Step3 from "$lib/components/signup/Step3.svelte";
  import Step4 from "$lib/components/signup/Step4.svelte";
	import Step5 from "$lib/components/signup/Step5.svelte";
  import Step6 from "$lib/components/signup/Step6.svelte";
  import Step7 from "$lib/components/signup/Step7.svelte";
  import Step8 from "$lib/components/signup/Step8.svelte";
  import Step9 from "$lib/components/signup/Step9.svelte";
  import { fly, slide } from "svelte/transition";

  let step = $state(1); // Keeps track of which question user is on.

  // Basic Information
  let fullName = $state('');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');

  // User Information

  let gender = $state('');
  let otherGender = $state('');

  let dob = $state(''); // DD/MM/YYYY
  let phone = $state(''); // 000-000-0000 Auto formats when typing (Optional)
  let postalCode = $state(''); // 6 Digits with no spaces

  let ethnicity = $state('');
  let otherEthnicity = $state('');
  
  // Information Regarding Golfing
  let clubName = $state('');
  let handicapIndex = $state('');
  let golfId = $state('');

  // Account Information

  let errorMessage = $state('');

  async function handleAuth() {
      goto('/home')
      errorMessage = '';
      try {
          const { error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
          goto('/dashboard'); // change this to your post-login route
      } catch (error) {
          if (error instanceof Error) {
              errorMessage = error.message;
          } else {
              errorMessage = 'An unknown error has occured. Please try again later.'
          }
      }
  }
</script>

<div
	class={`flex h-screen w-screen items-center justify-center ${step > 1 ? 'bg-gradient-to-br from-green-100 via-emerald-200 to-green-500' : ''}`}
>  
  {#if step == 1}
  <div class='flex w-full h-full justify-center'>
    <Step1 
        bind:fullName
        bind:email 
        bind:password
        bind:confirmPassword
        bind:step
      />
  </div>
  {:else if step == 2}
  <div in:fly={{ duration: 300, x: 300, opacity: 0 }}>
    <Step2
      bind:dob
      bind:step
    />
  </div>
  {:else if step == 3}
  <div in:fly={{ duration: 300, x: 300, opacity: 0 }}>
    <Step3
      bind:gender
      bind:step
      bind:otherGender
    />
  </div>
  {:else if step == 4}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step4
      bind:phone
      bind:step
    />
  </div>
  {:else if step == 5}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step5
      bind:postalCode
      bind:step
    />
  </div>
  {:else if step == 6}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step6
      bind:step
      bind:ethnicity
      bind:otherEthnicity
    />
  </div>
  {:else if step == 7}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step7
      bind:step
      bind:clubName
    />
  </div>
  {:else if step == 8}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step8
      bind:handicapIndex
      bind:step
    />
  </div>
  {:else if step == 9}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step9
      bind:step
      bind:golfId
    />
  </div>
  {/if}

</div>
  <!-- <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="/icons/Golf.png" alt="GolfWithYou Icon" />
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign up for an account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input bind:value={email} type="email" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input bind:value={password} type="password" name="password" id="password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="confirm-password" class="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
        </div>
        <div class="mt-2">
          <input bind:value={confirmPassword} type="password" name="confirm-password" id="confirm-password" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="dob" class="block text-sm/6 font-medium text-gray-900">Date of Birth</label>
        </div>
        <div class="mt-2">
          <input bind:value={dob} type="text" name="dob" id="dob" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <button onclick={() => goto('/discover')} type="button" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Sign Up</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Already a member?
      <a href="/" class="font-semibold text-indigo-600 hover:text-indigo-500">Login here</a>
    </p>
  </div> -->
