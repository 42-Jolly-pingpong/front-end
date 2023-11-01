import ProfileGameStat from 'pages/profile/components/header/item/game-history/profile-game-stat';
import { useRecoilValue } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileGameHistory = () => {
	const profile = useRecoilValue(profileState);
	const user = profile.user;

	if (
		user === null ||
		profile.type === ProfileStatus.UNKNOWN ||
		profile.type === ProfileStatus.BLOCKEDBYOTHER
	) {
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

export default ProfileGameHistory;
