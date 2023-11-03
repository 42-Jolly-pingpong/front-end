interface GameStatProps {
	match: number;
	winMatch: number;
	loseMatch: number;
}

const ProfileGameStat: React.FC<GameStatProps> = ({
	match,
	winMatch,
	loseMatch,
}) => {
	return (
		<div className='flex justify-start py-5'>
			<div className='flex text-sm'>
				<div className='font-bold pr-1'>{match}</div>
				<div>경기</div>
			</div>
			<div className='flex text-sm px-10'>
				<div className='font-bold pr-1'>{winMatch}</div>
				<div>승리</div>
			</div>
			<div className='flex text-sm'>
				<div className='font-bold pr-1'>{loseMatch}</div>
				<div>패배</div>
			</div>
		</div>
	);
};

export default ProfileGameStat;
