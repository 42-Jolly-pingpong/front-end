import ProfileBio from 'pages/profile/components/header/item/bio/profile-bio';
import ProfileGameHistory from 'pages/profile/components/header/item/game-history/profile-game-history';
import ProfileSocial from 'pages/profile/components/header/item/social/profile-social';

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
