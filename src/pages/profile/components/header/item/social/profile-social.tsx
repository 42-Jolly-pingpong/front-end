import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import ProfileSocialMine from 'pages/profile/components/header/item/social/profile-social-mine';
import ProfileSocialNormal from 'pages/profile/components/header/item/social/profile-social-normal';

const ProfileSocial = () => {
	const profile = useRecoilValue(profileState);

	return (
		<div className='flex items-center w-72'>
			{profile.type === ProfileStatus.MINE ? (
				<ProfileSocialMine />
			) : !(
					profile.type === ProfileStatus.UNKNOWN ||
					profile.type === ProfileStatus.BLOCKEDBYOTHER
			  ) ? (
				<ProfileSocialNormal />
			) : null}
		</div>
	);
};

export default ProfileSocial;
