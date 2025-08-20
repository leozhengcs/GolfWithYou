<script lang="ts">
    import { goto } from "$app/navigation";
</script>

<div class="flex h-screen w-full items-center justify-center bg-green-50">
	<div class="w-96 flex flex-col gap-5 text-center">
		<section>
			<h1 class="text-3xl font-semibold text-red-600">You're Not Eligible to Sign Up</h1>
		</section>

		<p class="text-gray-700 text-sm">
			Unfortunately, based on the information provided, you are not eligible to create an account at this time.
			<br /><br />
			If you believe this is an error, please contact our support team for further assistance.
		</p>

		<div class="w-full flex justify-center gap-2 pt-2">
			<button
				class="inline-block rounded-sm border border-green-700 bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-green-700 focus:ring-1 focus:outline-hidden cursor-pointer duration-300 transition-all w-fit"
				onclick={() => goto('/')}
			>
				Go Home
			</button>
		</div>
	</div>
</div>
