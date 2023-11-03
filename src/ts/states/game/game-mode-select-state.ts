import { atom } from "recoil";

export const gameModeSelectState = atom<boolean>({
	key: 'gameModeSelectState',
	default: false,
});
