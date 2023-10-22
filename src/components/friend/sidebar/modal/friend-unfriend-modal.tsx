import { Modal } from 'flowbite-react';
import User from 'ts/interfaces/user.model';

interface FriendModalProps {
	show: boolean;
	onClose: () => void;
	user: User;
}

const FriendUnfriendModal: React.FC<FriendModalProps> = ({
	show,
	onClose,
	user,
}) => {
	return (
		<Modal size='md' show={show} dismissible>
			<Modal.Body className='flex flex-col items-center text-center relative'>
				<div className='text-xl font-extrabold mb-6'>대전자 찾는중...</div>
			</Modal.Body>
		</Modal>
	);
};

export default FriendUnfriendModal;
