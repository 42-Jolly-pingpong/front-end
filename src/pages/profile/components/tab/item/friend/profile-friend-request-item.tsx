import { acceptFriendRequest, denyFriendRequest } from 'api/friend-api';
import GrayButton from 'components/button/gray-button';
import YellowButton from 'components/button/yellow-button';
import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';

interface requestProps {
	user: User;
}

const ProfileFriendRequestItem: React.FC<requestProps> = ({ user }) => {
	const handleAccept = async () => {
		await acceptFriendRequest(user.id);
	};

	const handleDeny = async () => {
		await denyFriendRequest(user.id);
	};

	return (
		<>
			<div className='flex flex-row items-center py-4 border-b w-80'>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<div className='flex flex-col w-48 pl-2'>
					<div className='text-base font-semibold'>{user.nickname}</div>
					<div className='text-xs text-gray-500'>{user.email}</div>
				</div>
				<YellowButton size='xs' onClick={handleAccept}>
					확인
				</YellowButton>
				<div className='px-1' />
				<GrayButton size='xs' onClick={handleDeny}>
					삭제
				</GrayButton>
			</div>
		</>
	);
};

export default ProfileFriendRequestItem;
