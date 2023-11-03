import { atom } from "recoil";

export enum GameMode  {
	classic = 'NORMAL',
	speed = 'SPEED',
};

export const gameModeState = atom<GameMode>({
	key: 'gameModeState',
	default: GameMode.classic,
});
