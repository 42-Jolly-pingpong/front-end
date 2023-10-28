import { Avatar } from 'flowbite-react';
import GrayButton from 'components/button/gray-button';
import User from 'ts/interfaces/user.model';
import ProfileUserInfo from 'pages/profile/components/tab/common/profile-user-info';
import ProfileFriendModal from 'pages/profile/components/modal/profile-friend-modal';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { useState } from 'react';

interface FriendProps {
	user: User;
	onUnfriend: (id: number) => void;
}

const ProfileFriendItemMine: React.FC<FriendProps> = ({ user, onUnfriend }) => {
	const [modalState, setModalState] = useState(false);

	const handleClick = () => {
		setModalState(true);
	};

	const handleClose = () => {
		setModalState(false);
	};

	const handleDelete = async () => {
		onUnfriend(user.id);
		setModalState(false);
	};

	return (
		<>
			<div className='flex flex-row items-center py-4 border-b w-80'>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<ProfileUserInfo nickname={user.nickname} email={user.email} />
				<div className='pr-3' />
				<GrayButton size='xs' onClick={handleClick}>
					친구 끊기
				</GrayButton>
				<ProfileFriendModal
					show={modalState}
					relation={ProfileStatus.FRIEND}
					onRequest={handleDelete}
					onClose={handleClose}
				/>
			</div>
		</>
	);
};

export default ProfileFriendItemMine;
