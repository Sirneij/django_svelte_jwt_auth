import { writable } from 'svelte/store';

import type { User } from '../interfaces/user.interface'


export const userData = writable<User>({});
