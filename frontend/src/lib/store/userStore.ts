import { writable } from 'svelte/store';

import type { User } from '$lib/interfaces/user.interface';

export const userData = writable<User>({});
