import { atom, selector } from 'recoil';

export const chatHeaderState = atom({
	key: 'chatHeaderState',
	default: true,
}); //search | title

export const chatHeaderSelector = selector({
	key: 'chatHeaderSelector',
	get: ({ get }) => {
		const state = get(chatHeaderState);

		return state;
	},
});
