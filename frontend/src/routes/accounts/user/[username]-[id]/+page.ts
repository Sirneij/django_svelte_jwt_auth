import { redirect } from '@sveltejs/kit';
import { variables } from '$lib/utils/constants';
import { getCurrentUser } from '$lib/utils/requestUtils';
import type { PageLoad } from '.svelte-kit/types/src/routes/$types';
import type { User } from '$lib/interfaces/user.interface';

export const load: PageLoad = async ({ fetch }) => {
	const [userRes, errs] = await getCurrentUser(
		fetch,
		`${variables.BASE_API_URI}/token/refresh/`,
		`${variables.BASE_API_URI}/user/`
	);

	const userResponse: User = userRes;

	if (errs.length > 0 && !userResponse.id) {
		throw redirect(302, '/accounts/login');
	}

	return { userResponse };
};
