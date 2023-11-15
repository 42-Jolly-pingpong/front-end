import { Avatar } from 'flowbite-react';
import GameScoreBar from './game-score-bar';

interface Score {
	position: 'left' | 'right';
	score: number;
	width: number;
}

interface Props {
	playTime: number;
	leftPlayer?: {
		avatarPath?: string;
		scores: { elapsedTime: number }[];
	};
	rightPlayer?: {
		avatarPath?: string;
		scores: { elapsedTime: number }[];
	};
}

const lefts = {
	avatarPath: undefined,
	scores: [
		{ elapsedTime: 1000 },
		{ elapsedTime: 2000 },
		{ elapsedTime: 3000 },
		{ elapsedTime: 4000 },
		{ elapsedTime: 5000 },
		{ elapsedTime: 6000 },
		{ elapsedTime: 7000 },
		{ elapsedTime: 8000 },
		{ elapsedTime: 9000 },
		{ elapsedTime: 10000 },
	],
};

const rights = {
	avatarPath: undefined,
	scores: [
		{ elapsedTime: 1780 },
		{ elapsedTime: 2780 },
		{ elapsedTime: 3780 },
		{ elapsedTime: 4780 },
		{ elapsedTime: 5780 },
		{ elapsedTime: 6780 },
		{ elapsedTime: 7780 },
		{ elapsedTime: 8780 },
		{ elapsedTime: 9780 },
		{ elapsedTime: 10000 },
	],
};

const GamePlayRecord: React.FC<Props> = ({
	playTime,
	leftPlayer = lefts,
	rightPlayer = rights,
}) => {
	const recordWidth = 624;
	const getWidth = (elapsedTime: number) => {
		return Math.round((elapsedTime / playTime) * recordWidth);
	};

	const leftScores: Score[] = leftPlayer.scores.map((score, index) => ({
		position: 'left',
		score: index + 1,
		width: getWidth(score.elapsedTime),
	}));

	const rightScores: Score[] = rightPlayer.scores.map((score, index) => ({
		position: 'right',
		score: index + 1,
		width: getWidth(score.elapsedTime),
	}));

	return (
		<div className='flex gap-2 items-start'>
			<div className='flex flex-col gap-6'>
				<Avatar
					rounded
					size='xs'
					img={`${leftPlayer.avatarPath ? leftPlayer.avatarPath : ''}`}
				/>
				<Avatar
					rounded
					size='xs'
					img={`${rightPlayer.avatarPath ? rightPlayer.avatarPath : ''}`}
				/>
			</div>
			<div className='flex flex-col relative w-[624px]'>
				<div className='flex'>
					{leftScores.map((left) => (
						<GameScoreBar
							key={left.score}
							position={left.position}
							score={left.score}
							width={left.width}
						/>
					))}
				</div>
				<div
					className={`absolute top-9 w-[${recordWidth}px] h-[2px] bg-yellow-200`}
				/>
				<div className='absolute flex top-[38px]'>
					{rightScores.map((right) => (
						<GameScoreBar
							key={right.score}
							position={right.position}
							score={right.score}
							width={right.width}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default GamePlayRecord;
