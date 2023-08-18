import { GameMode } from '../enums/game-mode.enum';

export interface GameHistory {
	idx: number; 
	winplayerIdx: number;
	losePlayerIdx: number;
	winScore: number;
	loseScore: number;
	playTime: number;
	playDate: Date;
	mode: GameMode;
}
