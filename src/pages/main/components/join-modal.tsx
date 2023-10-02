import ModalControl from 'types/interfaces/modal-control.model';
import { Button, Modal, Spinner } from 'flowbite-react';

const JoinModal: React.FC<ModalControl> = ({ isOpen, onClose }) => {
	return (
		<Modal show={isOpen} onClose={onClose} dismissible>
			<Modal.Body className='flex flex-col items-center my-2'>
				<div className='font-bold text-xl text-gray-500 dark:text-gray-400 pb-4'>
					게임 매칭중..
				</div>
				<Spinner
					aria-label='Warning spinner example'
					color='warning'
					size='xl'
				/>
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
