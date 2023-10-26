import { Avatar } from 'flowbite-react';
import GrayButton from 'components/button/gray-button';
import User from 'ts/interfaces/user.model';
import { deleteFriend } from 'api/friend-api';

interface FriendProps {
	user: User;
}

const ProfileFriendItemMine: React.FC<FriendProps> = ({ user }) => {
	const handleDelete = async () => {
		await deleteFriend(user.id);
	};

	return (
		<>
			<div className='flex flex-row items-center py-4 border-b w-80'>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<div className='flex flex-col w-48 pl-2'>
					<div className='text-base font-semibold'>{user.nickname}</div>
					<div className='text-xs text-gray-500'>{user.email}</div>
				</div>
				<div className='pl-3' />
				<GrayButton size='xs' onClick={handleDelete}>
					친구 끊기
				</GrayButton>
			</div>
		</>
	);
};

export default ProfileFriendItemMine;
