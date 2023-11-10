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
	const stats = [
		{
			title: '경기',
			value: match,
		},
		{
			title: '승리',
			value: winMatch,
		},
		{
			title: '패배',
			value: loseMatch,
		},
	];

	return (
		<div className='flex justify-start items-center gap-5'>
			{stats.map((stat, index) => (
				<div key={index} className={`flex text-sm gap-1 flex-1`}>
					<div className='font-bold'>{stat.value}</div>
					{stat.title}
				</div>
			))}
		</div>
	);
};

export default ProfileGameStat;
