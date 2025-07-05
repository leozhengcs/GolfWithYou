
<script lang='ts'>
  import Step0 from "$lib/components/signup/Step0.svelte";
  import Step1 from "$lib/components/signup/Step1.svelte";
  import Step2_1 from "$lib/components/signup/Step2-1.svelte";
  import Step2 from "$lib/components/signup/Step2.svelte";
  import Step3 from "$lib/components/signup/Step3.svelte";
  import Step4 from "$lib/components/signup/Step4.svelte";
	import Step5 from "$lib/components/signup/Step5.svelte";
  import Step6 from "$lib/components/signup/Step6.svelte";
  import Step7 from "$lib/components/signup/Step7.svelte";
  import Step8 from "$lib/components/signup/Step8.svelte";
  import Step9 from "$lib/components/signup/Step9.svelte";
  import { fly, slide } from "svelte/transition";

  let step = $state(0); // Keeps track of which question user is on.
  let formElement: HTMLFormElement;

  let privateGolfer = $state(false);

  // Basic Information
  let fullName = $state('');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');

  // User Information

  let gender = $state('');
  let otherGender = $state('');

  let dob = $state(''); // YYYY-MM-DD
  let phone = $state(''); // 000-000-0000 Auto formats when typing (Optional)
  let postalCode = $state(''); // 6 Digits with no spaces

  let ethnicity = $state('');
  let otherEthnicity = $state('');
  
  // Information Regarding Golfing
  let clubName = $state('');
  let handicapIndex = $state('');
  let golfId = $state('');

  let errorMessage = $state('');

  $effect(() => {
    if (step == 11) {
      formElement.submit();
    }
  })

</script>

<div
	class={`flex h-screen w-screen items-center justify-center ${step > 1 ? 'bg-gradient-to-br from-green-100 via-emerald-200 to-green-500' : ''}`}
>  
  {#if step == 0}
    <Step0
      bind:step
    />
  {:else if step == 1}
  <div class='flex w-full h-full justify-center' in:fly={{ duration: 300, x: 300, opacity: 0 }}>
    <Step1 
        bind:fullName
        bind:email 
        bind:step
      />
  </div>
  {:else if step == 2}
  <div in:fly={{ duration: 300, x: 300, opacity: 0 }}>
      <Step2_1
        bind:privateGolfer
        bind:step
      />
    </div>
  {:else if step == 3}
  <div in:fly={{ duration: 300, x: 300, opacity: 0 }}>
    <Step2
      bind:dob
      bind:step
    />
  </div>
  {:else if step == 4}
  <div in:fly={{ duration: 300, x: 300, opacity: 0 }}>
    <Step3
      bind:gender
      bind:step
      bind:otherGender
    />
  </div>
  {:else if step == 5}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step4
      bind:phone
      bind:step
    />
  </div>
  {:else if step == 6}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step5
      bind:postalCode
      bind:step
    />
  </div>
  {:else if step == 7}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step6
      bind:step
      bind:ethnicity
      bind:otherEthnicity
    />
  </div>
  {:else if step == 8}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step7
      bind:step
      bind:clubName
    />
  </div>
  {:else if step == 9}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step8
      bind:handicapIndex
      bind:step
    />
  </div>
  {:else if step == 10}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step9
      bind:step
      bind:golfId
    />
  </div>
  {/if}
</div>

<form method="POST" bind:this={formElement}>
  <input type="hidden" name='fullName' bind:value={fullName}/> 
  <input type="hidden" name='email' bind:value={email}/> 
  <input type="hidden" name='gender' bind:value={gender}>
  <input type="hidden" name='password' bind:value={password}>
  <input type="hidden" name='confirmPassword' bind:value={confirmPassword}>
  <input type="hidden" name='otherGender' bind:value={otherGender}>
  <input type="hidden" name='dob' bind:value={dob}>
  <input type="hidden" name='phone' bind:value={phone}>
  <input type="hidden" name='postalCode' bind:value={postalCode}>
  <input type="hidden" name='ethnicity' bind:value={ethnicity}>
  <input type="hidden" name='otherEthnicity' bind:value={otherEthnicity}>
  <input type="hidden" name='clubName' bind:value={clubName}>
  <input type="hidden" name='handicapIndex' bind:value={handicapIndex}>
  <input type="hidden" name='golfId' bind:value={golfId}>
</form>