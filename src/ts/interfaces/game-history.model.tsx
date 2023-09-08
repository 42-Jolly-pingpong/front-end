import { GameMode } from 'ts/enums/game-mode.enum';

export interface GameHistory {
	historyIdx: number;
	winPlayerIdx: number;
	losePlayerIdx: number;
	winScore: number;
	loseScore: number;
	playTime: number;
	playDate: Date;
	mode: GameMode;
}
