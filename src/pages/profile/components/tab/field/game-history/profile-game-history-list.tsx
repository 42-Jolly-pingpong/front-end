import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { GameHistory } from 'ts/interfaces/game-history.model';
import { profileState } from 'ts/states/profile/profile-state';
import ProfileNoGameHistory from 'pages/profile/components/tab/field/game-history/item/profile-no-game-history';
import ProfileGameHistoryItem from 'pages/profile/components/tab/field/game-history/item/profile-game-history-item';
import sendAPI from 'api/sendAPI';

const ProfileGameHistoryList = () => {
	// 1. GameHistory model 변경 (erd 설계대로)
	// 2. 백엔드 GameHistoryDto와 model 비교
	// 3. src/api/user-api.ts에 백엔드에 이미 있는 '@Post('/:id/history')' 써서 받아오게 함수 만들기
	const user = useRecoilValue(profileState);
	const profileType = user.type;

	const [historyList, setHistoryList] = useState<GameHistory[]>([]);
	const fetchHistoryList = async () => {
		const json = await sendAPI({
			method: 'GET',
			url: `/user/${user.user?.id}/history`,
		});
		setHistoryList(json);
	};

	useEffect(() => {
		if (
			profileType !== ProfileStatus.BLOCKED_BY_OTHER &&
			profileType !== ProfileStatus.UNKNOWN
		) {
			fetchHistoryList();
		}
	}, []);

	if (historyList.length === 0) {
		return <ProfileNoGameHistory />;
	}
	return (
		<div className='flex flex-col items-center h-96 overflow-y-auto'>
			{historyList.map((history: GameHistory) => (
				<ProfileGameHistoryItem history={history} key={history.roomName} />
			))}
		</div>
	);
};

export default ProfileGameHistoryList;
