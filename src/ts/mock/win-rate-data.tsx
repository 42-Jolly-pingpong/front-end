import { GameMode } from 'ts/enums/game-mode.enum';
import { GameHistory } from 'ts/interfaces/game-history.model';

const winRateData: GameHistory[] = [
	{
		idx: 1,
		winPlayerIdx: 0,
		losePlayerIdx: 1,
		winScore: 2,
		loseScore: 1,
		playTime: 15,
		playDate: new Date(),
		mode: GameMode.EASY,
	},
	{
		idx: 2,
		winPlayerIdx: 1,
		losePlayerIdx: 2,
		winScore: 3,
		loseScore: 2,
		playTime: 30,
		playDate: new Date(),
		mode: GameMode.HARD,
	},
];

export default winRateData;
