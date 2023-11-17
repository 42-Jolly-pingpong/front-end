import { GameMode } from 'ts/enums/game/game-mode.enum';
import User from 'ts/interfaces/user.model';

export interface ScoreLog {
	roomName: string;
	elapsedTime: number;
	user: User;
}

export interface GameHistory {
	roomName: string;
	winner: User;
	loser: User;
	winScore: number;
	loseScore: number;
	playTime: number;
	playDate: Date;
	mode: GameMode;
	scoreLogs: ScoreLog[];
}
