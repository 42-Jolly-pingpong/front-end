import { atom, selector } from 'recoil';
import User from 'types/interfaces/user.model';

export const userState = atom<User | null>({
	key: 'userState',
	default: null,
});

export const userSelector = selector({
	key: 'userSelector',
	get: ({ get }) => {
		const user = get(userState);
		return user;
	},
	set: ({ set }, value) => {
		set(userState, value);
	},
});
