<script lang='ts'>
  import UserModal from "./UserModal.svelte";

  let { name, age, handicap_index, member, src } = $props();
  let showUser = $state(false);
  const closeModal = () => {
    showUser = false;
  }
</script>

{#if showUser}
  <UserModal {age} {name} {handicap_index} {member} {src} closeModal={closeModal} />
{/if}
<button onclick={() => {showUser = true;}} class="w-64 flex-shrink-0 block rounded-lg p-4 shadow-xs shadow-indigo-100 bg-gray-200 cursor-pointer">
  <img
    alt=""
    {src}
    class="h-56 aspect-square rounded-md object-cover object-center"
  />

  <div class="mt-2">
    <div class='flex flex-col'>
      <div class='w-fit'>
        <dt class="sr-only">Name</dt>
        <dd class="font-medium">{name}</dd>
      </div>
      <div class='w-fit'>
        <dt class="sr-only">Age</dt>
        <dd class="text-sm text-gray-500">{age} Years Old</dd>
      </div>
    </div>

    <div class="mt-2 flex flex-col gap-5 text-xs">
      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <div class='w-8'>
          <img src="/icons/Membership.png" alt="">
        </div>

        <div class="mt-1.5 sm:mt-0 text-left">
          <p class="text-gray-500">Member of</p>
          <p class="font-medium">{member}</p>
        </div>
      </div>

      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <div class="w-8">
          <img src="/icons/Golf_Ball.png" alt="">
        </div>

        <div class="mt-1.5 sm:mt-0 text-left">
          <p class="text-gray-500">Handicap Index</p>

          <p class="font-medium">{handicap_index}</p>
        </div>
      </div>
    </div>
  </div>
</button>