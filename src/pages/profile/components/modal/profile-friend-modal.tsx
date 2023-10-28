// 친구 요청됨 -> 친구 요청 취소
// 친구 -> 친구 끊기
// 차단 -> 차단 풀기

import {
	friendModalButtonMessages,
	friendModalMessage,
} from 'constants/messages';
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
	const message =
		friendModalMessage[relation as keyof typeof friendModalMessage];
	const buttonMessage =
		friendModalButtonMessages[
			relation as keyof typeof friendModalButtonMessages
		];

	const handleRequest = () => {
		onRequest();
	};

	const handleCancel = () => {
		onClose();
	};

	return (
		<Modal size='lg' show={show} onClose={onClose}>
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
