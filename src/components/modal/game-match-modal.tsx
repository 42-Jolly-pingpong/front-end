import { Button, Modal, Spinner } from 'flowbite-react';
import GameOptionControl from 'ts/interfaces/game/game-modal-control';

const GameMatchModal: React.FC<GameOptionControl> = ({
	isOpen,
	onClose,
	onMatch,
}) => {
	return (
		<Modal show={isOpen} onClose={onClose} dismissible>
			<Modal.Body>
				<div className='flex flex-col justify-center relative'>
					<div>대전자 찾는중...</div>
					<Spinner></Spinner>
					<div className='absolute top-5 left-0 right-0 bottom-0'>60</div>
					<Button>취소하기</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default GameMatchModal;
