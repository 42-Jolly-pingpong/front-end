import { Avatar, Button, FileInput, Modal } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

interface ModalProps {
	show: boolean;
	onEdit: () => void;
	onClose: () => void;
}

const ProfileEditModal: React.FC<ModalProps> = ({ show, onEdit, onClose }) => {
	const user = useRecoilValue(userState);

	return (
		<Modal size='lg' show={show} onClose={onClose}>
			<Modal.Header className='mt-2 text-lg'>프로필 편집</Modal.Header>
			<Modal.Body className='flex flex-col items-center'>
				<Avatar img={user?.avatarPath || ''} rounded size='lg' />
			</Modal.Body>
			<Button onClick={onEdit}></Button>
		</Modal>
	);
};

export default ProfileEditModal;
