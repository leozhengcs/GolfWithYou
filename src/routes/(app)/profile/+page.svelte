<script lang='ts'>

    let email = $state('');
    let username = $state('');
    let bio = $state('');
    let gender = $state('');
</script>

<div class='w-full grid grid-cols-[250px_auto] flex-1 gap-5 px-52'>
    <section class='flex flex-col w-full h-full border-1 border-gray-300 gap-5 rounded-lg overflow-x-hidden'>
        <h1 class='text-gray-600 m-5 mb-0'>Settings</h1>
        <div class='flex flex-col h-full'>
            <button class='rounded-lg w-full text-left p-2 px-5 cursor-pointer hover:bg-gray-300 duration-100 transition-all'>
                Profile
            </button>
            <button class='rounded-lg w-full text-left p-2 px-5 cursor-pointer hover:bg-gray-300 duration-100 transition-all'>
                Theme
            </button>
            <button class='rounded-lg w-full text-left p-2 px-5 cursor-pointer hover:bg-gray-300 duration-100 transition-all'>
                Data and Privacy
            </button>
            <button class='rounded-lg w-full text-left p-2 px-5 cursor-pointer hover:bg-gray-300 duration-100 transition-all'>
                Settings
            </button>
        </div>
    </section>
    <section class="flex flex-col w-full h-full border-1 border-gray-300 gap-5 rounded-lg p-10 py-5">
        <h1 class='text-3xl'>Profile</h1>
        <span class='text-sm bg-green-500 rounded-lg text-white w-fit p-1'>Verified</span>
        <div>
            <label for="username" class="block text-sm/6 font-medium text-gray-900">Username</label>
            <div class="mt-2">
                <input bind:value={username} type="email" name="username" id="username" autocomplete="username" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div class="mt-2">
                <input bind:value={email} type="text" name="email" id="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>
        <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Bio</label>
            <div class="mt-2">
                <textarea
                    bind:value={bio}
                    name="bio"
                    id="bio"
                    rows="3"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                ></textarea>
            </div>
        </div>
        <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Gender</label>
            <select
                bind:value={gender}
                name="gender"
                id="gender"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
                <option value="" disabled selected>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
        </div>
        <div class='w-full flex justify-end gap-2'>
            <button class="w-fit p-2 bg-blue-300 rounded-lg cursor-pointer">
                Save
            </button>
            <button class='w-fit p-2 bg-blue-300 rounded-lg cursor-pointer'>
                Cancel Changes
            </button>
        </div>
    </section>
</div>