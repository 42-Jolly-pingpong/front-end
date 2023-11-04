import { Avatar } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileBadge = () => {
	const profile = useRecoilValue(profileState);
	//console.log(profile.type);

	return (
		<Avatar
			img={profile.user?.avatarPath || ''}
			size='xl'
			rounded
			bordered
			className='px-8'
		/>
	);
};

export default ProfileBadge;
