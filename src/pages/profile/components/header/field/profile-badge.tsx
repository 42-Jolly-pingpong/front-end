import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import { Avatar } from 'flowbite-react';

const ProfileBadge = () => {
	const profile = useRecoilValue(profileState);

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
