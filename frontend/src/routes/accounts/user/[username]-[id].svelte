<script context="module" lang="ts">
	import { variables } from '$lib/utils/constants';
	import { getCurrentUser } from '$lib/utils/requestUtils';
	import type { Load } from '@sveltejs/kit';
	import type { User } from '$lib/interfaces/user.interface';

	export const load: Load = async ({ fetch }) => {
		const [userRes, errs] = await getCurrentUser(
			fetch,
			`${variables.BASE_API_URI}/token/refresh/`,
			`${variables.BASE_API_URI}/user/`
		);

		const userResponse: User = userRes;

		if (errs.length > 0 && !userResponse.id) {
			return {
				status: 302,
				redirect: '/accounts/login'
			};
		}

		return {
			props: { userResponse }
		};
	};
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { UpdateField } from '$lib/utils/requestUtils';

	import { nodeBefore } from '$lib/helpers/whitespacesHelper';
	export let userResponse: User;

	const url = `${variables.BASE_API_URI}/user/`;

	let triggerUpdate = async (e: Event) => {
		const sibling = nodeBefore(<HTMLElement>e.target);
		await UpdateField(sibling.name, sibling.value, url);
	};
	$: userResponse;
</script>

<div class="container" transition:scale|local={{ start: 0.7, delay: 500 }}>
	{#if userResponse.id}
		<h1>
			{userResponse.full_name ? userResponse.full_name : userResponse.username} profile
		</h1>
	{/if}

	<div class="user" transition:scale|local={{ start: 0.2 }}>
		<div class="text">
			<input
				aria-label="User's full name"
				type="text"
				placeholder="User's full name"
				name="full_name"
				value={userResponse.full_name}
			/>
			<button class="save" aria-label="Save user's full name" on:click={(e) => triggerUpdate(e)} />
		</div>
	</div>
	<div class="user" transition:scale|local={{ start: 0.3 }}>
		<div class="text">
			<input
				aria-label="User's username"
				type="text"
				placeholder="User's username"
				name="username"
				value={userResponse.username}
			/>
			<button class="save" aria-label="Save user's username" on:click={(e) => triggerUpdate(e)} />
		</div>
	</div>
	<div class="user" transition:scale|local={{ start: 0.4 }}>
		<div class="text">
			<input
				aria-label="User's email"
				placeholder="User's email"
				type="email"
				name="email"
				value={userResponse.email}
			/>
			<button class="save" aria-label="Save user's email" on:click={(e) => triggerUpdate(e)} />
		</div>
	</div>
	<div class="user" transition:scale|local={{ start: 0.5 }}>
		<div class="text">
			<input
				aria-label="User's bio"
				placeholder="User's bio"
				type="text"
				name="bio"
				value={userResponse.bio}
			/>
			<button class="save" aria-label="Save user's bio" on:click={(e) => triggerUpdate(e)} />
		</div>
	</div>
	<div class="user" transition:scale|local={{ start: 0.6 }}>
		<div class="text">
			<input
				aria-label="User's date of birth"
				type="date"
				name="birth_date"
				placeholder="User's date of birth"
				value={userResponse.birth_date}
			/>
			<button
				class="save"
				aria-label="Save user's date of birth"
				on:click={(e) => triggerUpdate(e)}
			/>
		</div>
	</div>
</div>
