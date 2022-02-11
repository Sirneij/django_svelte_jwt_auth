<script context="module" lang="ts">
	import { BASE_API_URI } from '$lib/constants';
	import { browserGet, getCurrentUser } from '$lib/requestUtils';
	import type { User } from '../../../interfaces/user.interface';
	import { fly } from 'svelte/transition';

	export async function load({ params, fetch }) {
		const [userRes, _] = await getCurrentUser(
			fetch,
			`${BASE_API_URI}/token/refresh/`,
			`${BASE_API_URI}/user/`
		);

		const currentUserResponse: User = userRes;

		if (!currentUserResponse.id) {
			return {
				status: 302,
				redirect: '/accounts/login'
			};
		}
		const res = await fetch(`${BASE_API_URI}/token/refresh/`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				refresh: `${browserGet('refreshToken')}`
			})
		});
		const accessRefresh = await res.json();
		const response = await fetch(`${BASE_API_URI}/researchteam/update-team-members/${params.id}/`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessRefresh.access}`
			}
		});
		const teamMemberDetail = await response.json();
		if (response.ok) {
			return {
				props: { teamMemberDetail }
			};
		}
		return {};
	}
</script>

<script>
	import { UpdateField, triggerUpdate } from '$lib/requestUtils';

	export let teamMemberDetail;

	let thumbnail,
		avatar,
		error = '';
	const url = `${BASE_API_URI}/researchteam/update-team-members/${teamMemberDetail.id}/`;
	const onFileSelected = async (e) => {
		const image = e.target.files[0];
		await UpdateField('thumbnail', image, url);
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	};
</script>
