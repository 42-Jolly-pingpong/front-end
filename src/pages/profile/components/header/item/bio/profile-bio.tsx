import ProfileBioNoraml from 'pages/profile/components/header/item/bio/profile-bio-normal';
import ProfileBioUnknown from 'pages/profile/components/header/item/bio/profile-bio-unknown';
import { useRecoilValue } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileBio = () => {
	const profile = useRecoilValue(profileState);
	const user = profile.user;

	if (
		user === null ||
		profile.type === ProfileStatus.UNKNOWN ||
		profile.type === ProfileStatus.BLOCKED_BY_OTHER
	) {
		return <ProfileBioUnknown />;
	}
	return <ProfileBioNoraml />;
};

export default ProfileBio;
