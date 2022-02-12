import type { Variables } from '$lib/interfaces/variables.interface';

const BASE_API_URI: string = import.meta.env.DEV
	? import.meta.env.VITE_BASE_API_URI_DEV
	: import.meta.env.VITE_BASE_API_URI_PROD;

export const variables: Variables = { BASE_API_URI: BASE_API_URI };

//'http://localhost:8000/api' //'https://django-sveltekit-jwt-auth.herokuapp.com/api'
