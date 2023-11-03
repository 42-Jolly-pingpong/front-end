import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import GrayButton from 'components/button/gray-button';
import YellowButton from 'components/button/yellow-button';
import ProfileUserInfo from 'pages/profile/components/tab/common/profile-user-info';

interface requestProps {
	user: User;
	onRequest: (res: boolean, id: number) => void;
}

const ProfileFriendRequestItem: React.FC<requestProps> = ({
	user,
	onRequest,
}) => {
	const handleAccept = async () => {
		onRequest(true, user.id);
	};

	const handleDeny = async () => {
		onRequest(false, user.id);
	};

	return (
		<>
			<div className='flex flex-row items-center py-4 border-b w-80'>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<ProfileUserInfo nickname={user.nickname} email={user.email} />
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
