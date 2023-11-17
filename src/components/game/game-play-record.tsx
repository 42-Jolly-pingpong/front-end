import { Avatar } from 'flowbite-react';
import GameScoreBar from 'components/game/game-score-bar';

interface Score {
	position: 'left' | 'right';
	score: number;
	width: number;
}

interface Player {
	nickname?: string;
	avatarPath?: string;
	scores: { elapsedTime: number }[];
}

interface Props {
	playTime: number;
	leftPlayer: Player;
	rightPlayer: Player;
}

const GamePlayRecord: React.FC<Props> = ({
	playTime,
	leftPlayer,
	rightPlayer,
}) => {
	const recordWidth = 624;
	const getWidth = (elapsedTime: number) => {
		return Math.round((elapsedTime / playTime) * recordWidth) - 7;
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
