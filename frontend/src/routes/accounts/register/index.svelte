<script>
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { BASE_API_URI } from '$lib/constants';
	import { notificationData } from '../../../store/notificationStore';

	let email = '',
		fullName = '',
		bio = '',
		username = '',
		password = '',
		confirmPassword = '',
		error = '';
	const submitForm = async () => {
		await fetch(`${BASE_API_URI}/register/`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: {
					email: email,
					username: username,
					password: password,
					bio: bio,
					full_name: fullName
				}
			})
		})
			.then((response) => {
				if (response.status === 201) {
					notificationData.set('Registration successful. Login now.');
					goto('/accounts/login');
					// console.log('User:', response.json());
				} else if (response.status === 400) {
					console.log(response.json());
				}
			})
			.catch((error) => {
				error = error;
				console.error('Error:', error);
			});
	};
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
	{#if error}
		<p class="center error">{error}</p>
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
