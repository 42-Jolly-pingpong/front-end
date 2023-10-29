import ProfileInfo from 'pages/profile/components/header/field/profile-info';
import ProfileBadge from 'pages/profile/components/header/field/profile-badge';

const ProfileHeader = () => {
	return (
		<div className='flex justify-center items-center text-center pb-11'>
			<ProfileBadge />
			<ProfileInfo />
		</div>
	);
};

export default ProfileHeader;
