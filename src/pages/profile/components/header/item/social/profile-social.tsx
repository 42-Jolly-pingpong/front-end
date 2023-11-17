import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import ProfileSocialMine from 'pages/profile/components/header/item/social/profile-social-mine';
import ProfileSocialNormal from 'pages/profile/components/header/item/social/profile-social-normal';

const ProfileSocial = () => {
	const profile = useRecoilValue(profileState);

	//console.log(profile.type);

	switch (profile.type) {
		case ProfileStatus.MINE:
			return <ProfileSocialMine />;
		case ProfileStatus.UNKNOWN:
		case ProfileStatus.BLOCKEDBYOTHER:
			return;
		default:
			return <ProfileSocialNormal />;
	}
};

export default ProfileSocial;
