import ProfileHeader from './components/header/profile-header';
import ProfileNavigator from './components/navigator/profile-navigator';

const Profile = () => {
	return (
		<div className='flex flex-col justify-center items-center mt-10'>
			<ProfileHeader />
			<ProfileNavigator />
		</div>
	);
};

export default Profile;
