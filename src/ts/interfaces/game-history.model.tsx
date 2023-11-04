import { GameMode } from 'ts/enums/game/game-mode.enum';
import User from './user.model';

export interface GameHistory {
	roomName: string;
	winner: User;
	loser: User;
	winScore: number;
	loseScore: number;
	playTime: number;
	playDate: Date;
	mode: GameMode;
}
