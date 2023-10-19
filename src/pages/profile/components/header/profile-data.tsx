import ProfileBio from 'pages/profile/components/header/profile-bio';
import ProfileSocial from './profile-social';
import ProfileGameHistory from 'pages/profile/components/header/profile-game-history';

const ProfileData = () => {
	return (
		<div className='flex flex-col'>
			<ProfileSocial />
			<ProfileGameHistory />
			<ProfileBio />
		</div>
	);
};

export default ProfileData;
