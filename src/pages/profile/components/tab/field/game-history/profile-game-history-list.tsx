import { useEffect, useState } from 'react';
import { GameHistory } from 'ts/interfaces/game-history.model';
import ProfileNoGameHistory from 'pages/profile/components/tab/field/game-history/item/profile-no-game-history';
import ProfileGameHistoryItem from 'pages/profile/components/tab/field/game-history/item/profile-game-history-item';

const ProfileGameHistoryList = () => {
	// 1. GameHistory model 변경 (erd 설계대로)
	// 2. 백엔드 GameHistoryDto와 model 비교
	// 3. src/api/user-api.ts에 백엔드에 이미 있는 '@Post('/:id/history')' 써서 받아오게 함수 만들기

	const [historyList, setHistoryList] = useState<GameHistory[]>([]);
	const fetchHistoryList = async () => {
		//await 3번 함수
	};

	useEffect(() => {
		fetchHistoryList();
	}, []);

	if (historyList.length === 0) {
		return <ProfileNoGameHistory />;
	}
	return (
		<div className='flex flex-col items-center h-96 overflow-y-auto'>
			{historyList.map((history: GameHistory) => (
				<ProfileGameHistoryItem history={history} key={history.historyIdx} />
			))}
		</div>
	);
};

export default ProfileGameHistoryList;
