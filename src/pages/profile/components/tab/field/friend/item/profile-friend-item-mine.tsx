import { Avatar } from 'flowbite-react';
import GrayButton from 'components/button/gray-button';
import User from 'ts/interfaces/user.model';
import { deleteFriend } from 'api/friend-api';
import ProfileUserInfo from 'pages/profile/components/tab/common/profile-user-info';

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
				<ProfileUserInfo nickname={user.nickname} email={user.email} />
				<div className='pr-3' />
				<GrayButton size='xs' onClick={handleDelete}>
					친구 끊기
				</GrayButton>
			</div>
		</>
	);
};

export default ProfileFriendItemMine;
