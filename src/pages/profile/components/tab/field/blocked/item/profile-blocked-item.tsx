import GrayButton from 'components/button/gray-button';
import { Avatar } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import ProfileUserInfo from 'pages/profile/components/tab/common/profile-user-info';
import ProfileFriendModal from 'pages/profile/components/modal/profile-friend-modal';
import { useRecoilState } from 'recoil';
import { profileModalState } from 'ts/states/profile/profile-modal-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';

interface blockedProps {
	user: User;
	onUnblock: (id: number) => void;
}

const ProfileBlockedItem: React.FC<blockedProps> = ({ user, onUnblock }) => {
	const [modalState, setModalState] = useRecoilState(profileModalState);

	const handleClick = () => {
		setModalState(true);
	};

	const handleClose = () => {
		setModalState(false);
	};

	const handleUnblocked = () => {
		onUnblock(user.id);
		setModalState(false);
	};

	return (
		<>
			<div className='flex flex-row items-center border-b py-4 '>
				<Avatar size='sm' img={user.avatarPath || ''} />
				<ProfileUserInfo nickname={user.nickname} email={user.email} />
				<GrayButton size='xs' onClick={handleClick}>
					차단 해제
				</GrayButton>
				<ProfileFriendModal
					show={modalState}
					relation={ProfileStatus.BLOCKEDBYME}
					onRequest={handleUnblocked}
					onClose={handleClose}
				/>
			</div>
		</>
	);
};

export default ProfileBlockedItem;
