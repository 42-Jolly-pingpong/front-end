import { useState } from 'react';
import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import GrayButton from 'components/button/gray-button';
import ProfileUserInfo from 'pages/profile/components/tab/common/profile-user-info';
import ProfileFriendModal from 'pages/profile/components/modal/profile-friend-modal';

interface blockedProps {
	friend: User;
	onUnblock: (id: number) => void;
}

const ProfileBlockedItem: React.FC<blockedProps> = ({ friend, onUnblock }) => {
	const [modalState, setModalState] = useState(false);

	const handleClick = () => {
		setModalState(true);
	};

	const handleClose = () => {
		setModalState(false);
	};

	const handleUnblocked = () => {
		onUnblock(friend.id);
		setModalState(false);
	};

	return (
		<div className='flex flex-row items-center border-b py-4 '>
			<Avatar size='sm' img={friend.avatarPath || ''} />
			<ProfileUserInfo nickname={friend.nickname} email={friend.email} />
			<GrayButton size='xs' onClick={handleClick}>
				<div>차단 해제</div>
			</GrayButton>
			<ProfileFriendModal
				show={modalState}
				relation={ProfileStatus.BLOCKED_BY_ME}
				onRequest={handleUnblocked}
				onClose={handleClose}
			/>
		</div>
	);
};

export default ProfileBlockedItem;
