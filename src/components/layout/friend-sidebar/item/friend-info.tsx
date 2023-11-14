import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import { UserStatus } from 'ts/enums/user/user-status.enum';

interface FriendInfoProps {
	user: User;
}

const FriendInfo: React.FC<FriendInfoProps> = ({ user }) => {
	let statusColor = 'border-2 border-gray-800';

	switch (user.status) {
		case UserStatus.ONLINE:
			statusColor = 'bg-green-500';
			break;
		case UserStatus.INGAME:
			statusColor = 'bg-primary-500';
			break;
	}

	return (
		<div className='flex flex-row items-center gap-2'>
			<Avatar img={user.avatarPath || ''} size={'sm'} />
			<div className='text-sm font-bold'>{user.nickname}</div>
			<div className={`w-2 h-2 rounded-full ${statusColor}`} />
		</div>
	);
};

export default FriendInfo;
