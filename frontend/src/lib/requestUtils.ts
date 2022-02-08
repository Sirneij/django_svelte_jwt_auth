import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { userData } from '../store/userStore';
import { BASE_API_URI } from './constants';

export const browserGet = (key: string):string | undefined => {
	if (browser) {
		const item = localStorage.getItem(key);
		if (item) {
			return item;
		}
	}
	return null;
};

export const browserSet = (key:string, value:string) : void => {
	if (browser) {
		localStorage.setItem(key, value);
	}
};

export const post = async (fetch, url:string, body:unknown) => {
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
			if (res.status === 400) {
				const data = await res.json();
				const error = data.user.error[0];
				return [{}, error];
				// throw { id: error.id, message: error };
			}
			const response = await res.json();
			return [response, ''];
		}
	} catch (error) {
		console.error(`Error outside: ${error}`);

		// throw { id: '', message: 'An unknown error occurred.' };
		return [{}, `An unknown error occurred. ${error}`];
	}
};

export const getCurrentUser = async (fetch, refreshUrl:string, userUrl:string) => {
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
	const accessRefresh = await jsonRes.json();
	const res = await fetch(userUrl, {
		headers: {
			Authorization: `Bearer ${accessRefresh.access}`
		}
	});
	if (res.status === 400) {
		const data = await res.json();
		const error = data.user.error[0];
		return ['', error];
	}
	const response = await res.json();
	return [response.user, ''];
};

export const logOutUser = async () => {
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
	const jres = await fetch(`${BASE_API_URI}/logout/`, {
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
	await goto('/accounts/login');
};