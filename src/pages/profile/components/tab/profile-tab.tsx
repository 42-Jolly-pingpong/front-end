import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import ProfileTabMine from 'pages/profile/components/tab/profile-tab-mine';
import ProfileTabNormal from 'pages/profile/components/tab/profile-tab-normal';

const ProfileTab = () => {
	const profile = useRecoilValue(profileState);

	if (profile.type === ProfileStatus.MINE) {
		return <ProfileTabMine />;
	}
	return <ProfileTabNormal />;
};

export default ProfileTab;
