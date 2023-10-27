import GrayButton from 'components/button/gray-button';
import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import ProfileUserInfo from 'pages/profile/components/tab/common/profile-user-info';
import { deleteBlockedFriend } from 'api/friend-api';

interface blockedProps {
	user: User;
}

const ProfileBlockedItem: React.FC<blockedProps> = ({ user }) => {
	const handleDelete = async () => {
		await deleteBlockedFriend(user.id);
	};

	return (
		<>
			<div className='flex flex-row items-center border-b py-4 '>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<ProfileUserInfo nickname={user.nickname} email={user.email} />
				<GrayButton size='xs' onClick={handleDelete}>
					차단 해제
				</GrayButton>
			</div>
		</>
	);
};

export default ProfileBlockedItem;
