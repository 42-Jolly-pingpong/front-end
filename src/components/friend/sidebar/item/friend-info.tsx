import { Avatar } from 'flowbite-react';
import { UserStatus } from 'ts/enums/user/user-status.enum';
import User from 'ts/interfaces/user.model';

interface FriendInfoProps {
	user: User;
}

const FriendInfo: React.FC<FriendInfoProps> = ({ user }) => {
	let statusColor = 'bg-white';

	switch (user.status) {
		case UserStatus.ONLINE:
			statusColor = 'bg-emerald-600';
			break;
		case UserStatus.INGAME:
			statusColor = 'bg-primary-500';
			break;
	}

	console.log(user);
	return (
		<div className='flex flex-row items-center p-2'>
			<Avatar img='/images/jollypong3.jpeg' />
			<div className='text-sm font-bold pl-2'>{user.nickname}</div>
			<div className={`ml-2 w-2 h-2 rounded-full ${statusColor}`} />
		</div>
	);
};

export default FriendInfo;
