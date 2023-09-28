import { atom, selector } from 'recoil';

export const userState = atom({
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
