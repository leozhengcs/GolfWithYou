<script lang='ts'>
  import type { PublicUserProfile, UserProfile } from "$lib/types/Database";
  import { getAge } from "$lib/utils/date";
  import UserModal from "./UserModal.svelte";

  let { user, self }: { user: PublicUserProfile, self: UserProfile } = $props();
  let showUser = $state(false);

  const closeModal = () => {
    showUser = false;
  }

  // $effect(() => {
  //   if (showUser) {
  //     document.body.classList.add('overflow-hidden');
  //   } else {
  //     document.body.classList.remove('overflow-hidden');
  //   }
  // });
</script>

{#if showUser}
  <UserModal 
    id={user.id}
    age={getAge(user.dob)} 
    name={user.full_name} 
    handicap_index={user.handicap_index} 
    member={user.club_name} 
    src={user.avatar_url ?? "/icons/DefaultProfile.png"} 
    images={user.user_images_url}
    {closeModal} 
    bio={user.bio}
    golf_id={user.golf_id}
    gender={user.gender}
    other_gender={user.other_gender}
    verified={user.verified}
    {self}
  />
{/if}
<button onclick={() => {showUser = true;}} class="w-64 flex-shrink-0 block rounded-lg p-4 shadow-xs shadow-indigo-100 bg-gray-200 cursor-pointer">
  <img
    alt=""
    src={user.avatar_url ?? '/icons/DefaultProfile.png'}
    class="h-56 aspect-square rounded-md object-cover object-center"
  />

  <div class="mt-2">
    <div class='flex flex-col'>
      <div class='w-fit'>
        <dt class="sr-only">Name</dt>
        <dd class="font-medium">{user.full_name}</dd>
      </div>
      <div class='w-fit'>
        <dt class="sr-only">Age</dt>
        <dd class="text-sm text-gray-500">{getAge(user.dob)} Years Old</dd>
      </div>
    </div>

    <div class="mt-2 flex flex-col gap-5 text-xs">
      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <div class='w-8'>
          <img src="/icons/Membership.png" alt="">
        </div>

        <div class="mt-1.5 sm:mt-0 text-left">
          <p class="text-gray-500">Member of</p>
          <p class="font-medium">{user.club_name}</p>
        </div>
      </div>

      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <div class="w-8">
          <img src="/icons/Golf_Ball.png" alt="">
        </div>

        <div class="mt-1.5 sm:mt-0 text-left">
          <p class="text-gray-500">Handicap Index</p>

          <p class="font-medium">{user.handicap_index}</p>
        </div>
      </div>
    </div>
  </div>
</button>