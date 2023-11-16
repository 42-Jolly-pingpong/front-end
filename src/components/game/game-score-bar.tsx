interface Props {
	position: 'left' | 'right';
	score: number;
	width: number;
}

const GameScoreBar: React.FC<Props> = ({ position, score, width }) => {
	const isLeft = position === 'left';

	return (
		// 두번째 score부터 안먹혀서 style로 대체
		<div
			className={`absolute flex justify-center items-center gap-1  ${
				isLeft ? 'flex-col' : 'flex-col-reverse'
			} `}
			style={{ left: width }}
		>
			<div className='text-xs font-bold'>{score}</div>
			<div
				className={`bg-yellow-200 w-[2px] h-4 ${
					isLeft ? 'rounded-t-2xl' : 'rounded-b-2xl'
				}`}
			/>
		</div>
	);
};

export default GameScoreBar;
