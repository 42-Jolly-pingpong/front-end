import { atom } from 'recoil';
import { GameMode } from 'ts/enums/game/game-mode.enum';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';

export type GameWaitType = {
	status: GameWaitStatus;
	mode: GameMode;
	// 추후 유저 관련해서도 여기 들어올듯.
};

export const gameWaitState = atom<GameWaitType>({
	key: 'gameWaitState',
	default: { status: GameWaitStatus.NONE, mode: GameMode.CLASSIC },
});
