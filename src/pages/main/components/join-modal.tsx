import ModalControl from 'types/interfaces/modal-control.model';
import { Button, Modal } from 'flowbite-react';

const JoinModal: React.FC<ModalControl> = ({ isOpen, onClose }) => {
	return (
		<Modal show={isOpen} onClose={onClose} dismissible>
			<Modal.Body className='flex flex-col items-center my-2'>
				<div className=' text-gray-500 dark:text-gray-400'>게임 매칭중..</div>
				<div>여기 뭐 회전하는거 하나넣을려나</div>
			</Modal.Body>
			<Modal.Footer className='flex items-center justify-center'>
				<Button
					onClick={onClose}
					className='font-bold text-white bg-yellow-300 enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
				>
					그만 기다리기
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default JoinModal;
