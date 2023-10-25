import ProfileBio from 'pages/profile/components/header/item/bio/profile-bio';
import ProfileSocial from '../item/social/profile-social';
import ProfileGameHistory from 'pages/profile/components/header/item/game-history/profile-game-history';

const ProfileInfo = () => {
	return (
		<div className='flex flex-col pl-8'>
			<ProfileSocial />
			<ProfileGameHistory />
			<ProfileBio />
		</div>
	);
};

export default ProfileInfo;
