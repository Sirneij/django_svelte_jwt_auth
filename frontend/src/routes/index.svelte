<script lang="ts">
	import { userData } from '$lib/store/userStore';
	import { notificationData } from '$lib/store/notificationStore';

	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { getCurrentUser, browserGet } from '$lib/utils/requestUtils';
	import { variables } from '$lib/utils/constants';

	onMount(async () => {
		if (browserGet('refreshToken')) {
			const [response, errs] = await getCurrentUser(
				fetch,
				`${variables.BASE_API_URI}/token/refresh/`,
				`${variables.BASE_API_URI}/user/`
			);
			if (errs.length <= 0) {
				userData.set(response);
			}
		}
		const notifyEl = document.getElementById('notification') as HTMLElement;
		// const notifyEl = document.getElementsByClassName('notification');
		if (notifyEl && $notificationData !== '') {
			setTimeout(() => {
				notifyEl.classList.add('disappear');
				notificationData.set('');
			}, 3000);
		}
	});
</script>

<svelte:head>
	<title>Home | FullStack Django & SvelteKit</title>
</svelte:head>

<section in:fly={{ y: -100, duration: 500, delay: 500 }} out:fly={{ duration: 500 }}>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>
		{#if $userData.username}
			<span style="text-transform: capitalize;">{$userData.username},</span>
		{/if}

		to our new<br />SvelteKit app
	</h1>
</section>
