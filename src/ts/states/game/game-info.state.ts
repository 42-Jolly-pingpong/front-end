import { atom } from "recoil";

export type GameInfoType = {
	roomName: string;
	position: number;
	opponent: number;
};

export const gameInfoState = atom<GameInfoType>({
	key: 'GameInfo',
	default: {roomName: '', position: 0, opponent: 0},
});
