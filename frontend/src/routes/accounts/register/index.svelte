<script lang="ts">
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { variables } from '$lib/utils/constants';
	import { notificationData } from '$lib/store/notificationStore';
	import { post } from '$lib/utils/requestUtils';
	import type { CustomError } from '$lib/interfaces/error.interface';
	import type { UserResponse } from '$lib/interfaces/user.interface';

	let email: string,
		fullName: string,
		bio: string,
		username: string,
		password: string,
		confirmPassword: string,
		errors: Array<CustomError>;
	const submitForm = async () => {
		const [jsonRes, err] = await post(fetch, `${variables.BASE_API_URI}/register/`, {
			user: {
				email: email,
				username: username,
				password: password,
				bio: bio,
				full_name: fullName
			}
		});
		const response: UserResponse = jsonRes;

		if (err.length > 0) {
			errors = err;
		} else if (response.user) {
			notificationData.set('Registration successful. Login now.');
			goto('/accounts/login');
		}
	};
	console.log(errors);
	const passwordConfirm = () => (password !== confirmPassword ? false : true);
</script>

<svelte:head>
	<title>Register | FullStack Django & SvelteKit</title>
</svelte:head>

<section
	class="container"
	in:fly={{ y: 100, duration: 500, delay: 500 }}
	out:fly={{ duration: 500 }}
>
	<h1>Register</h1>
	{#if errors}
		{#each errors as error}
			<p class="center error">{error.error}</p>
		{/each}
	{/if}
	<form class="form" on:submit|preventDefault={submitForm}>
		<input
			bind:value={email}
			type="email"
			aria-label="Email address"
			placeholder="Email address"
			required
		/>
		<input
			bind:value={username}
			type="text"
			aria-label="Username"
			placeholder="Username"
			required
		/>
		<input
			bind:value={fullName}
			type="text"
			aria-label="Full name"
			placeholder="Full name"
			required
		/>
		<input
			bind:value={bio}
			type="text"
			aria-label="Brief bio"
			placeholder="Tell us about yourself..."
			required
		/>
		<input
			bind:value={password}
			type="password"
			name="password"
			aria-label="password"
			placeholder="password"
			required
		/>
		<input
			bind:value={confirmPassword}
			type="password"
			name="confirmPassword"
			aria-label="Confirm password"
			placeholder="Confirm password"
			required
		/>
		{#if confirmPassword}
			<button class="btn" type="submit">Register</button>
		{:else}
			<button class="btn" type="submit" disabled>Register</button>
		{/if}
	</form>
</section>
