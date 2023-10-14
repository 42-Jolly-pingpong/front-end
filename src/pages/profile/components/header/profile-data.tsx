import ProfileSocial from './profile-social';
import ProfileGameHistory from './profile-game-history';
import ProfileBio from './profile-bio';

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
