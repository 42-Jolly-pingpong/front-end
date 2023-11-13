import { atom, selector } from 'recoil';

export const profileModalState = atom({
	key: 'profileModalState',
	default: false,
});

export const profileModalSelector = selector({
	key: 'profileModalSelector',
	get: ({ get }) => {
		const state = get(profileModalState);

		return state;
	},
	set: ({ set }, value) => {
		set(profileModalState, value);
	},
});

export const profileAuthModalState = atom({
	key: 'profileAuthModalState',
	default: {
		show: false,
		secret: '',
		qr_code: '',
	},
});
