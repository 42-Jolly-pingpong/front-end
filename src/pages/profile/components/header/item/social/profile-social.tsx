import ProfileSocialMine from 'pages/profile/components/header/item/social/profile-social-mine';
import ProfileSocialNormal from 'pages/profile/components/header/item/social/profile-social-normal';
import ProfileSocialUnknown from 'pages/profile/components/header/item/social/profile-social-unknown';
import { useRecoilValue } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileSocial = () => {
	const profile = useRecoilValue(profileState);

	if (profile.type === ProfileStatus.MINE) {
		return <ProfileSocialMine />;
	} else if (profile.type === ProfileStatus.UNKNOWN) {
		return <ProfileSocialUnknown />;
	} else {
		return <ProfileSocialNormal />;
	}
};

export default ProfileSocial;