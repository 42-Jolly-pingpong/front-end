import { atom } from "recoil";


export const isGameEndState = atom<boolean>({
	key: 'isGameEnd',
	default: false,
});
