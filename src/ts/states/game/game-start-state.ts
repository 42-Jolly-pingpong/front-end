import { atom } from "recoil";


export const gameStartState = atom<boolean>({
	key: 'gameStartState',
	default: false,
});
