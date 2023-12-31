import ProfileBio from 'pages/profile/components/header/item/bio/profile-bio';
import ProfileSocial from 'pages/profile/components/header/item/social/profile-social';
import ProfileGameHistory from 'pages/profile/components/header/item/game-history/profile-game-history';

const ProfileInfo = () => {
	return (
		<div className='flex flex-col gap-y-5'>
			<ProfileSocial />
			<ProfileGameHistory />
			<ProfileBio />
		</div>
	);
};

export default ProfileInfo;
