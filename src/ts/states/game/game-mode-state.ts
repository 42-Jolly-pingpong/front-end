import { atom } from "recoil";

export enum GameMode  {
	classic,
	speed,
};

export const gameModeState = atom<GameMode>({
	key: 'gameModeState',
	default: GameMode.classic,
});
