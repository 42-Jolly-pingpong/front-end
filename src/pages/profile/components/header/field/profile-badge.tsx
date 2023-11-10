import { Avatar } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';

const ProfileBadge = () => {
	const profile = useRecoilValue(profileState);

	return (
		<div className='px-8'>
			<Avatar img={profile.user?.avatarPath || ''} size='xl' rounded />
		</div>
	);
};

export default ProfileBadge;
