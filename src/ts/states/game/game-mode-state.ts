import { atom } from 'recoil';
import { GameMode } from 'ts/enums/game/game-mode.enum';

export const gameModeState = atom<GameMode>({
	key: 'gameModeState',
	default: GameMode.NORMAL,
});
