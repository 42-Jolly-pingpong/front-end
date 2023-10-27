import { atom } from "recoil";

export const gameResultState = atom<number>({
	key: 'gameResultState',
	default: 0,
});
