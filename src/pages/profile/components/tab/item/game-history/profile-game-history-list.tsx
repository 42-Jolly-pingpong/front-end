import ProfileGameHistoryItem from 'pages/profile/components/tab/item/game-history/profile-game-history-item';

interface HistoryProps {
	historyList: string[];
}

const ProfileGameHistoryList: React.FC<HistoryProps> = ({ historyList }) => {
	// map으로
	return (
		<div className='flex flex-col items-center'>
			{historyList.map((history: string) => (
				<ProfileGameHistoryItem history={history} key={history} />
			))}
		</div>
	);
};

export default ProfileGameHistoryList;
