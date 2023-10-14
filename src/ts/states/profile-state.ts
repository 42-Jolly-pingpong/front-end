import { atom, selector } from 'recoil';
import User from 'ts/interfaces/user.model';

export const profileState = atom<User | null>({
	key: 'profileState',
	default: null,
});

export const profileSelector = selector({
	key: 'profileSelector',
	get: ({ get }) => {
		const user = get(profileState);
		return user;
	},
	set: ({ set }, value) => {
		set(profileState, value);
	},
});
