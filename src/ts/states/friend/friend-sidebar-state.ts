import { atom, selector } from 'recoil';

export const friendSidebarState = atom({
	key: 'friendSidebarState',
	default: false,
});

export const friendSidebarSelector = selector({
	key: 'friendSidebarSelector',
	get: ({ get }) => {
		const state = get(friendSidebarState);

		return state;
	},
	set: ({ set }, value) => {
		set(friendSidebarState, value);
	},
});
