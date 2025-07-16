
<script lang='ts'>
  import Step0 from "$lib/components/signup/Step0.svelte";
  import Step1 from "$lib/components/signup/Step1.svelte";
  import Step2 from "$lib/components/signup/Step2.svelte";
  import Step3 from "$lib/components/signup/Step3.svelte";
  import Step4 from "$lib/components/signup/Step4.svelte";
  import Step5 from "$lib/components/signup/Step5.svelte";
  import Step6 from "$lib/components/signup/Step6.svelte";
  import Step7 from "$lib/components/signup/Step7.svelte";
  import Step8 from "$lib/components/signup/Step8.svelte";
  import Step9 from "$lib/components/signup/Step9.svelte";
  import Step10 from "$lib/components/signup/Step10.svelte";
  import Step11 from "$lib/components/signup/Step11.svelte";
  import Step12 from "$lib/components/signup/Step12.svelte";
  import { fly, slide } from "svelte/transition";

  let step = $state(0); // Keeps track of which question user is on.
  let formElement: HTMLFormElement;

  let privateGolfer = $state(false);

  // Basic Information
  let fullName = $state('');
  let email = $state('');
  let password = $state('');
  let passwordConfirm = $state('');

  // User Information

  let gender = $state('');
  let otherGender = $state('');

  let dob = $state(''); // YYYY-MM-DD
  let phone = $state(''); // 000-000-0000 Auto formats when typing (Optional)
  let postalCode = $state(''); // 6 Digits with no spaces
  
  // Information Regarding Golfing
  let clubName = $state('');
  let handicapIndex = $state('');
  let golfId = $state('');

  $effect(() => {
    if (step == 13) {
      formElement.submit();
    }
  })

</script>

<div
	class={`flex h-screen w-screen items-center justify-center ${step > 0 ? 'bg-gradient-to-br from-green-100 via-emerald-200 to-green-500' : ''}`}
>  
  {#if step == 0}
    <Step0
      bind:step
    />
  {:else if step == 1}
  <div in:fly={{ duration: 300, x: 300, opacity: 0 }}>
      <Step1 
      bind:step
      bind:privateGolfer
    />
  </div>
  {:else if step == 2}
  <div in:fly={{ duration: 300, x: 300, opacity: 0 }}>
    <Step2
      bind:email
      bind:step
    />
  </div>
  {:else if step == 3}
  <div in:fly={{ duration: 300, x: 300, opacity: 0 }}>
    <Step3
      bind:fullName
      bind:step
    />
  </div>
  {:else if step == 4}
  <div in:fly={{ duration: 300, x: 300, opacity: 0 }}>
    <Step4
      bind:dob
      bind:step
    />
  </div>
  {:else if step == 5}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step5
      bind:gender
      bind:otherGender
      bind:step
    />
  </div>
  {:else if step == 6}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step6
      bind:phone
      bind:step
    />
  </div>
  {:else if step == 7}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step7
      bind:postalCode
      bind:step
    />
  </div>
  {:else if step == 8}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step8
      bind:clubName
      bind:step
    />
  </div>
  {:else if step == 9}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step9
      bind:step
      bind:handicapIndex
    />
  </div>
  {:else if step == 10}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step10
      bind:golfId
      bind:step
    />
  </div>
  {:else if step == 11}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step11
      bind:step
      bind:password
      bind:passwordConfirm
    />
  </div>
  {:else}
  <div in:fly={{ duration: 300, x: 300, opacity: 0}}>
    <Step12
      bind:step
    />
  </div>
  {/if}
</div>

<form method="POST" bind:this={formElement}>
  <input type="hidden" name='fullName' bind:value={fullName}/> 
  <input type="hidden" name='email' bind:value={email}/> 
  <input type="hidden" name='gender' bind:value={gender}>
  <input type="hidden" name='password' bind:value={password}>
  <input type="hidden" name='confirmPassword' bind:value={passwordConfirm}>
  <input type="hidden" name='otherGender' bind:value={otherGender}>
  <input type="hidden" name='dob' bind:value={dob}>
  <input type="hidden" name='phone' bind:value={phone}>
  <input type="hidden" name='postalCode' bind:value={postalCode}>
  <input type="hidden" name='clubName' bind:value={clubName}>
  <input type="hidden" name='handicapIndex' bind:value={handicapIndex}>
  <input type="hidden" name='golfId' bind:value={golfId}>
</form>