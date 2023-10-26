import GrayButton from 'components/button/gray-button';
import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';

interface blockedProps {
	user: User;
}

const ProfileBlockedItem: React.FC<blockedProps> = ({ user }) => {
	const handleDelete = () => {
		console.log('차단 해제 api 붙이기');
	};

	return (
		<>
			<div className='flex flex-row items-center py-4 border-b'>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<div className='flex flex-col w-48 pl-2'>
					<div className='text-base font-semibold'>{user.nickname}</div>
					<div className='text-xs text-gray-500'>{user.email}</div>
				</div>
				<GrayButton size='xs' onClick={handleDelete}>
					차단 해제
				</GrayButton>
			</div>
		</>
	);
};

export default ProfileBlockedItem;
