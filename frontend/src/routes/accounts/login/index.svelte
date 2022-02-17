<script lang="ts">
	import { notificationData } from '$lib/store/notificationStore';
	import { post, browserSet, browserGet } from '$lib/utils/requestUtils';
	import { goto } from '$app/navigation';
	import { variables } from '$lib/utils/constants';
	import { fly } from 'svelte/transition';

	import type { UserResponse } from '$lib/interfaces/user.interface';
	import type { CustomError } from '$lib/interfaces/error.interface';
	import { changeText } from '$lib/helpers/buttonText';

	let email = '',
		password = '',
		errors: Array<CustomError>;

	const handleLogin = async () => {
		if (browserGet('refreshToken')) {
			localStorage.removeItem('refreshToken');
		}
		const [jsonRes, err] = await post(fetch, `${variables.BASE_API_URI}/login/`, {
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
			notificationData.update(() => 'Login successful...');
			await goto('/');
		}
	};
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
			required
		/>
		<input
			bind:value={password}
			name="password"
			type="password"
			aria-label="password"
			placeholder="password"
			required
		/>
		<button class="btn" type="submit" on:click={(e) => changeText(e, 'Signing in...')}>Login</button
		>
		<p class="center">No account yet? <a href="/accounts/register">Get started</a>.</p>
	</form>
</section>
