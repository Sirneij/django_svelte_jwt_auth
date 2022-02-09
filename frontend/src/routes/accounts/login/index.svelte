<script>
	import { notificationData } from '../../../store/notificationStore';
	import { post, browserSet, browserGet } from '$lib/requestUtils';
	import { goto } from '$app/navigation';
	import { BASE_API_URI } from '$lib/constants';
	import { fly } from 'svelte/transition';

	import { onMount } from 'svelte';

	let email = '',
		password = '',
		error;

	const handleLogin = async () => {
		if (browserGet('refreshToken')) {
			localStorage.removeItem('refreshToken');
		}
		const [jsonRes, err] = await post(fetch, `${BASE_API_URI}/login/`, {
			user: {
				email: email,
				password: password
			}
		});
		if (err) {
			error = err;
		} else if (jsonRes.user.tokens) {
			browserSet('refreshToken', jsonRes.user.tokens.refresh);
			notificationData.set('Login successful.');
			await goto('/');
		}
	};
	onMount(() => {
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
	<title>Login</title>
</svelte:head>

<section
	class="container"
	in:fly={{ x: -100, duration: 500, delay: 500 }}
	out:fly={{ duration: 500 }}
>
	<h1>Login</h1>
	{#if error}
		<p class="center error">{error}</p>
	{/if}
	<form class="form" on:submit|preventDefault={handleLogin}>
		<input
			bind:value={email}
			name="email"
			type="email"
			aria-label="Email address"
			placeholder="Email address"
		/>
		<input
			bind:value={password}
			name="password"
			type="password"
			aria-label="password"
			placeholder="password"
		/>
		<button class="btn" type="submit">Login</button>
		<p class="center">No account yet? <a href="/accounts/register">Get started</a>.</p>
	</form>
</section>
