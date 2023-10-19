import { atom } from "recoil";

export type GameInfoType = {
	roomName: string;
	position: number;
};

export const GameInfo = atom<GameInfoType>({
	key: 'GameInfo',
	default: {roomName: '', position: 0},
});
