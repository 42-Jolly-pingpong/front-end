import { atom, selector } from 'recoil';

export const snackbarState = atom({
	key: "snackbarState",
	default: {
		state: false,
		title: ""
	}
});

export const snackbarSelector = selector({
	key: "snackbarSelector",
	get: ({get}) => {
		const state = get(snackbarState);

		return state; 
	}
})