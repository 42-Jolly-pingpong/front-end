import { GameMode } from '../enum/game-mode.enum';

export interface GameHistory {
	win_player_idx: number;
	lose_player_idx: number;
	win_score: number;
	lose_score: number;
	play_time: number;
	play_date: Date;
	mode: GameMode;
}

export default GameHistory;
