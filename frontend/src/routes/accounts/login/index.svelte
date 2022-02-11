<script lang="ts">
	import { notificationData } from '../../../store/notificationStore';
	import { post, browserSet, browserGet } from '$lib/requestUtils';
	import { goto } from '$app/navigation';
	import { BASE_API_URI } from '$lib/constants';
	import { fly } from 'svelte/transition';

	import { onMount } from 'svelte';
	import type { UserResponse } from '../../../interfaces/user.interface';
	import type { CustomError } from '../../../interfaces/error.interface';

	let email = '',
		password = '',
		errors: Array<CustomError>;

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
		const response: UserResponse = jsonRes;

		if (err.length > 0) {
			errors = err;
		} else if (response.user) {
			browserSet('refreshToken', response.user.tokens.refresh);
			notificationData.set('Login successful.');
			await goto('/');
		}
	};
	onMount(() => {
		const notifyEl = document.getElementById('notification') as HTMLElement;

		if (notifyEl && $notificationData !== '') {
			setTimeout(() => {
				notifyEl.style.visibility = 'hidden';
				notificationData.set('');
			}, 5000);
		}
	});
</script>

<svelte:head>
	<title>Login | FullStack Django & SvelteKit</title>
</svelte:head>

<section
	class="container"
	in:fly={{ x: -100, duration: 500, delay: 500 }}
	out:fly={{ duration: 500 }}
>
	<h1>Login</h1>
	{#if errors}
		{#each errors as error}
			<p class="center error">{error.error}</p>
		{/each}
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
