import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { GameHistory } from 'ts/interfaces/game-history.model';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import ProfileNoGameHistory from 'pages/profile/components/tab/field/game-history/item/profile-no-game-history';
import ProfileGameHistoryItem from 'pages/profile/components/tab/field/game-history/item/profile-game-history-item';
import { getUserGameHistory } from 'api/user-api';

const ProfileGameHistoryList = () => {
	const profile = useRecoilValue(profileState);
	const profileType = profile.type;

	const [historyList, setHistoryList] = useState<GameHistory[]>([]);
	const fetchHistoryList = async () => {
		const history: GameHistory[] = await getUserGameHistory(profile.user!.id);
		setHistoryList(history);
	};

	useEffect(() => {
		if (
			profileType !== ProfileStatus.BLOCKEDBYOTHER &&
			profileType !== ProfileStatus.UNKNOWN
		) {
			fetchHistoryList();
		}
	}, [profile]);

	if (historyList.length === 0) {
		return <ProfileNoGameHistory />;
	}
	return (
		<div className='w-[692px] h-[900px] grid grid-cols-1 auto-rows-auto gap-4 overflow-y-auto overflow-x-hidden'>
			{historyList.map((history: GameHistory) => (
				<ProfileGameHistoryItem history={history} key={history.roomName} />
			))}
		</div>
	);
};

export default ProfileGameHistoryList;
