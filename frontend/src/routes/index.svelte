<script>
	import { userData } from '../store/userStore';
	import { notificationData } from '../store/notificationStore';

	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { getCurrentUser, browserGet } from '$lib/requestUtils';
	import { BASE_API_URI } from '$lib/constants';

	onMount(async () => {
		if (browserGet('refreshToken')) {
			const [response, _] = await getCurrentUser(
				fetch,
				`${BASE_API_URI}/token/refresh/`,
				`${BASE_API_URI}/user/`
			);
			userData.set(response);
		}
		const notifyEl = document.getElementsByClassName('notification');
		if (notifyEl && $notificationData !== '') {
			setTimeout(() => {
				notifyEl.display = 'none';
				notificationData.set('');
			}, 5000);
		}
	});
</script>

<svelte:head>
	<title>Home</title>
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
