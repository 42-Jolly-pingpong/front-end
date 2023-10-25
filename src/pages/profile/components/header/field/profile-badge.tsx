import { BiUser } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { profileState } from 'ts/states/profile/profile-state';
import { Avatar } from 'flowbite-react';

const ProfileBadge = () => {
	const profile = useRecoilValue(profileState);
	const avatarPath = profile?.user?.avatarPath || BiUser;

	return (
		<Avatar img={avatarPath} size='xl' rounded bordered className='px-8' />
	);
};

export default ProfileBadge;
