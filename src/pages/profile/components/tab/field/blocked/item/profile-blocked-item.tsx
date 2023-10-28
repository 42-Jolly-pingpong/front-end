import GrayButton from 'components/button/gray-button';
import { Avatar, Button, Modal } from 'flowbite-react';
import User from 'ts/interfaces/user.model';
import ProfileUserInfo from 'pages/profile/components/tab/common/profile-user-info';
import ProfileFriendModal from 'pages/profile/components/modal/profile-friend-modal';
import { useRecoilState } from 'recoil';
import { profileModalState } from 'ts/states/profile/profile-modal-state';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import { useState } from 'react';

interface blockedProps {
	friend: User;
	onUnblock: (id: number) => void;
}

const ProfileBlockedItem: React.FC<blockedProps> = ({ friend, onUnblock }) => {
	const [modalState, setModalState] = useState(false);
	// profileModalState

	const handleClick = () => {
		console.log('모달을 띄울때는 : ', friend.nickname);
		setModalState(true);
	};

	const handleClose = () => {
		setModalState(false);
	};

	const handleUnblocked = () => {
		console.log('진짜 차단할때는 : ', friend.nickname);
		onUnblock(friend.id);
		setModalState(false);
	};

	const handleMouse = () => {
		console.log('출력 ', friend.nickname);
	};

	return (
		<>
			<div className='flex flex-row items-center border-b py-4 '>
				<Avatar size='sm' img={friend.avatarPath || ''} />
				<ProfileUserInfo nickname={friend.nickname} email={friend.email} />
				<GrayButton size='xs' onClick={handleClick}>
					<div>차단 해제</div>
				</GrayButton>
				<Modal size='lg' show={modalState} onClose={handleClose}>
					<Modal.Header />
					<Button color='failure' onClick={handleUnblocked}>
						눌러보세여
					</Button>
				</Modal>
			</div>

			{/*<ProfileFriendModal
					show={modalState}
					relation={ProfileStatus.BLOCKEDBYME}
					onRequest={handleUnblocked}
					onClose={handleClose}
				/>
			</div>*/}
		</>
	);
};

export default ProfileBlockedItem;
