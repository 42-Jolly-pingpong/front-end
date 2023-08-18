import { GameMode } from '../enums/game-mode.enum';
import GameHistory from '../interfaces/game-history.model';

const winRateData: GameHistory[] = [
	{
		win_player_idx: 0,
		lose_player_idx: 1,
		win_score: 2,
		lose_score: 1,
		play_time: 15,
		play_date: new Date(),
		mode: GameMode.Easy,
	},
	{
		win_player_idx: 1,
		lose_player_idx: 2,
		win_score: 3,
		lose_score: 2,
		play_time: 30,
		play_date: new Date(),
		mode: GameMode.Hard,
	},
];

export default winRateData;
