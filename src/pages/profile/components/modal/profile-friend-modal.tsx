import CancelButton from 'components/button/cancel-button';
import {
	friendModalButtonMessages,
	friendModalMessage,
} from 'constants/messages';
import { Modal } from 'flowbite-react';
import ProfileFriendModalBody from 'pages/profile/components/modal/item/profile-friend-modal-body';
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
			<div className='mx-4 mt-4 flex justify-end'>
				<CancelButton size='6' onClick={onClose} />
			</div>
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
