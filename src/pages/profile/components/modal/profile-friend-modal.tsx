// 친구 요청됨 -> 친구 요청 취소
// 친구 -> 친구 끊기
// 차단 -> 차단 풀기

import { Modal } from 'flowbite-react';
import ProfileFriendModalBody from 'pages/profile/components/modal/profile-friend-modal-body';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';

interface ModalProps {
	show: boolean;
	relation: ProfileStatus;
	onRequest: () => void;
	onClose: () => void;
}

const ProfileFriendModal: React.FC<ModalProps> = ({
	show,
	relation,
	onRequest,
	onClose,
}) => {
	let message = '';
	let buttonMessage = '';

	switch (relation) {
		case ProfileStatus.BLOCKEDBYME:
			message = '사용자를 차단 해제할까요?';
			buttonMessage = '해제하기';
			break;
		case ProfileStatus.FRIEND:
			message = '친구 관계를 끊을까요?';
			buttonMessage = '친구 취소';
			break;
		case ProfileStatus.REQUESTED:
			message = '친구 요청을 취소할까요?';
			buttonMessage = '요청 취소';
	}

	const handleRequest = () => {
		onRequest();
	};

	const handleCancel = () => {
		onClose();
	};

	return (
		<Modal size='lg' show={show} onClose={onClose} dismissible>
			<Modal.Header />
			<ProfileFriendModalBody
				message={message}
				buttonMessage={buttonMessage}
				onRequest={handleRequest}
				onCancel={handleCancel}
			/>
		</Modal>
	);
};

export default ProfileFriendModal;
