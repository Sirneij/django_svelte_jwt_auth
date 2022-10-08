<script lang="ts">
	import { scale } from 'svelte/transition';
	import { UpdateField } from '$lib/utils/requestUtils';

	import { nodeBefore } from '$lib/helpers/whitespacesHelper';
	import { variables } from '$lib/utils/constants';
	import type { User, UserResponse } from '$lib/interfaces/user.interface';
	export let data: any;

	const url = `${variables.BASE_API_URI}/user/`;

	let updateResponse: UserResponse; // updated response from the update
	let triggerUpdate = async (e: Event) => {
		const sibling = nodeBefore(<HTMLElement>e.target);
		if (sibling) {
			const [res, err] = await UpdateField(sibling.name, sibling.value, url);
			if (err.length <= 0) {
				updateResponse = res; //assigns the response to the updated response if no errors
			}
		}
	};
	let currentUserData: User;
	$: data.userResponse,
		(() => {
			currentUserData = data.userResponse;
			if (updateResponse && updateResponse.user) {
				currentUserData = updateResponse.user; // if updated data is available, update the currentUserData too...
			}
		})();
</script>

<div class="container" transition:scale|local={{ start: 0.7, delay: 500 }}>
	{#if currentUserData.id}
		<h1>
			{currentUserData.full_name ? currentUserData.full_name : currentUserData.username} profile
		</h1>
	{/if}

	<div class="user" transition:scale|local={{ start: 0.2 }}>
		<div class="text">
			<input
				aria-label="User's full name"
				type="text"
				placeholder="User's full name"
				name="full_name"
				value={currentUserData.full_name}
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
				value={currentUserData.username}
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
				value={currentUserData.email}
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
				value={currentUserData.bio}
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
				value={currentUserData.birth_date}
			/>
			<button
				class="save"
				aria-label="Save user's date of birth"
				on:click={(e) => triggerUpdate(e)}
			/>
		</div>
	</div>
</div>
