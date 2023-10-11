import ProfileBadge from './profile-badge';
import ProfileData from './profile-data';

const ProfileHeader = () => {
	return (
		<div className='flex justify-center items-center text-center'>
			<ProfileBadge />
			<ProfileData />
		</div>
	);
};

export default ProfileHeader;
