import { atom, selector } from 'recoil';

export const friendSidebarState = atom({
	key: 'friendListState',
	default: false,
});

export const friendSidebarSelector = selector({
	key: 'friendListSelector',
	get: ({ get }) => {
		const state = get(friendSidebarState);

		return state;
	},
});
