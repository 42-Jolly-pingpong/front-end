import ProfileHeader from './components/profile-header';
import ProfileNavigator from './components/profile-navigator';

const Profile = () => {
	return (
		<div className='flex flex-col justify-center items-center text-center'>
			<ProfileHeader />
			<ProfileNavigator />
		</div>
	);
};

export default Profile;
