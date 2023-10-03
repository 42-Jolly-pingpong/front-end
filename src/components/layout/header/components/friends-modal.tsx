import { Button, Modal } from 'flowbite-react';
import ModalControl from 'types/interfaces/modal-control.model';

const FriendsModal: React.FC<ModalControl> = ({ isOpen, onClose }) => {
	return (
		<Modal
			show={isOpen}
			onClose={onClose}
			dismissible
			className='flex justify-end'
		>
			<div className='fixed top-0 right-0 bottom-0 w-1/2 bg-white'>
				<Modal.Body className='flex flex-col items-start p-1'>
					<Button
						onClick={onClose}
						color='gray'
						className=' border-none font-bold text-yellow-300 border-none:hover enabled:hover:bg-white focus:ring-0 focus:ring-white'
					>
						접기
					</Button>
					<hr className='border-solid border-2 w-full mb-2' />
					<div>여기에 뭐 보여줄 친구들 렌더링 되겠지</div>
				</Modal.Body>
			</div>
		</Modal>
	);
};

export default FriendsModal;
