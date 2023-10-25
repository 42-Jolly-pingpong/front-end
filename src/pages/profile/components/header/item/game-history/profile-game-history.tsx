import ProfileGameStat from 'pages/profile/components/header/item/game-history/profile-game-stat';
import { useRecoilValue } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileGameHistory = () => {
	const profile = useRecoilValue(profileState);
	const user = profile.user;

	if (user === null || profile.type === ProfileStatus.UNKNOWN) {
		return <ProfileGameStat match={0} winMatch={0} loseMatch={0} />;
	} else {
		const totalMatch = user.winCount + user.loseCount;
		return (
			<ProfileGameStat
				match={totalMatch}
				winMatch={user.winCount}
				loseMatch={user.loseCount}
			/>
		);
	}
};
//const totlaGame = profile.user?.winCount + profile.user?.loseCount;
////const totalGame = profile!.winCount + profile!.loseCount;

//return (
//	<div className='flex justify-center'>
//		<div> {totalGame} 경기 </div>
//		<div>{profile?.winCount} 승리</div>
//		<div>{profile?.loseCount} 패배</div>
//	</div>
//);

export default ProfileGameHistory;
