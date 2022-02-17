import { browser } from '$app/env';
import { goto } from '$app/navigation';
import type { Token, UserResponse } from '$lib/interfaces/user.interface';
import type { CustomError } from '$lib/interfaces/error.interface';
import { notificationData } from '$lib/store/notificationStore';
import { userData } from '$lib/store/userStore';

import { variables } from '$lib/utils/constants';
import { formatText } from '$lib/formats/formatString';

export const browserGet = (key: string): string | undefined => {
	if (browser) {
		const item = localStorage.getItem(key);
		if (item) {
			return item;
		}
	}
	return null;
};

export const browserSet = (key: string, value: string): void => {
	if (browser) {
		localStorage.setItem(key, value);
	}
};

export const post = async (
	fetch,
	url: string,
	body: unknown
): Promise<[object, Array<CustomError>]> => {
	try {
		const headers = {};
		if (!(body instanceof FormData)) {
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(body);
			const token = browserGet('refreshToken');
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}
			const res = await fetch(url, {
				method: 'POST',
				body,
				headers
			});
			const response = await res.json();
			if (response.errors) {
				const errors: Array<CustomError> = [];
				for (const p in response.errors) {
					errors.push({ error: response.errors[p] });
				}
				return [{}, errors];
			}
			return [response, []];
		}
	} catch (error) {
		console.error(`Error outside: ${error}`);
		const errors: Array<CustomError> = [{ error: 'An unknown error occurred.' }, { error: error }];
		return [{}, errors];
	}
};

export const getCurrentUser = async (
	fetch,
	refreshUrl: string,
	userUrl: string
): Promise<[object, Array<CustomError>]> => {
	const jsonRes = await fetch(refreshUrl, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refresh: `${browserGet('refreshToken')}`
		})
	});
	const accessRefresh: Token = await jsonRes.json();
	if (accessRefresh.access) {
		const res = await fetch(userUrl, {
			headers: {
				Authorization: `Bearer ${accessRefresh.access}`
			}
		});
		if (res.status === 400) {
			const data = await res.json();
			const error = data.user.error[0];
			return [{}, error];
		}
		const response = await res.json();
		return [response.user, []];
	} else {
		return [{}, [{ error: 'Refresh token is invalid...' }]];
	}
};

export const logOutUser = async (): Promise<void> => {
	const res = await fetch(`${variables.BASE_API_URI}/token/refresh/`, {
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
	const jres = await fetch(`${variables.BASE_API_URI}/logout/`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			Authorization: `Bearer ${accessRefresh.access}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refresh: `${browserGet('refreshToken')}`
		})
	});
	if (jres.status !== 204) {
		const data = await jres.json();
		const error = data.user.error[0];
		throw { id: error.id, message: error };
	}
	localStorage.removeItem('refreshToken');
	userData.set({});
	notificationData.update(() => 'You have successfully logged out...');
	await goto('/accounts/login');
};

export const handlePostRequestsWithPermissions = async (
	fetch,
	targetUrl: string,
	body: unknown,
	method = 'POST'
): Promise<[object, Array<CustomError>]> => {
	const res = await fetch(`${variables.BASE_API_URI}/token/refresh/`, {
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
	const jres = await fetch(targetUrl, {
		method: method,
		mode: 'cors',
		headers: {
			Authorization: `Bearer ${accessRefresh.access}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	if (method === 'PATCH') {
		if (jres.status !== 200) {
			const data = await jres.json();
			console.error(`Data: ${data}`);
			const errs = data.errors;
			console.error(errs);
			return [{}, errs];
		}
		return [jres.json(), []];
	} else if (method === 'POST') {
		if (jres.status !== 201) {
			const data = await jres.json();
			console.error(`Data: ${data}`);
			const errs = data.errors;
			console.error(errs);
			return [{}, errs];
		}
		return [jres.json(), []];
	}
};

export const UpdateField = async (
	fieldName: string,
	fieldValue: string,
	url: string
): Promise<[object, Array<CustomError>]> => {
	const userObject: UserResponse = { user: {} };
	let formData: UserResponse | any;
	if (url.includes('/user/')) {
		formData = userObject;
		formData['user'][`${fieldName}`] = fieldValue;
	} else {
		formData[`${fieldName}`] = fieldValue;
	}

	const [response, err] = await handlePostRequestsWithPermissions(fetch, url, formData, 'PATCH');
	if (err.length > 0) {
		console.log(err);
		return [{}, err];
	}
	console.log(response);
	notificationData.update(() => `${formatText(fieldName)} has been updated successfully.`);
	return [response, []];
};
