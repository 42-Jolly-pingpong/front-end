import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import ProfileNoMatchList from 'pages/profile/components/tab/field/game-history/item/profile-no-game-history';

const ProfileGameHistoryTab = () => {
	const profile = useRecoilValue(profileState);

	//[백엔드] game history[] 받는 함수 만들기
	//const gameList: []; //여기에 게임 관련

	//if (type === ProfileStatus.BLOCKEDBYME || type === ProfileStatus.UNKNOWN) {
	return <ProfileNoMatchList />;
	//} else if (gameList.length === 0) {
	//	return <ProfileNoMatchList />;
	//} else {
	//	return <ProfileMatchList />;
	//}
};

export default ProfileGameHistoryTab;
