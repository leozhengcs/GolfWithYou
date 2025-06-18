
<script lang='ts'>
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabaseClient";

  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let dob = $state('');
  let golf_id = $state('');
  let handicap_index = $state('');

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

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
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
        <div class="flex items-center justify-between">
          <label for="handicap-index" class="block text-sm/6 font-medium text-gray-900">Handicap Index</label>
        </div>
        <div class="mt-2">
          <input bind:value={handicap_index} type="text" name="handicap-index" id="handicap-index" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="golf-id" class="block text-sm/6 font-medium text-gray-900">Golf ID</label>
        </div>
        <div class="mt-2">
          <input bind:value={golf_id} type="text" name="golf-id" id="golf-id" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
        </div>
      </div>

      <div>
        <button onclick={() => goto('/discover')} type="button" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Sign Up</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Already a member?
      <a href="/login" class="font-semibold text-indigo-600 hover:text-indigo-500">Login here</a>
    </p>
  </div>
</div>
