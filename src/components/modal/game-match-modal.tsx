import { Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import GameOptionControl from 'ts/interfaces/game/game-modal-control';

const GameMatchModal: React.FC<GameOptionControl> = ({
	isOpen,
	onClose,
	onMatch,
}) => {
	const [seconds, setSeconds] = useState(10);

	useEffect(() => {
		if (isOpen && seconds > 0) {
			const timer = setInterval(() => {
				setSeconds((prev) => prev - 1);
			}, 1000);
		}

		const timer = setTimeout(() => {
			onClose();
		}, seconds * 1000);
		return () => {
			clearTimeout(timer);
			clearInterval(seconds);
		};
	}, []);

	return (
		<Modal size='md' show={isOpen} onClose={onClose} dismissible>
			<Modal.Body className='flex flex-col items-center text-center relative'>
				<div className='text-xl font-extrabold mb-6'>대전자 찾는중...</div>
				<Spinner className='w-20 h-20 fill-yellow-300'></Spinner>
				<div className='absolute my-8 top-16 left-0 right-0 bottom-0 text-2xl font-bold'>
					{seconds}
				</div>
				<Button
					className='mt-6 font-bold text-yellow-300 bg-white enabled:hover:bg-white focus:ring-0  dark:focus:ring-yellow-300 border-yellow-300 border-2 w-32'
					onClick={() => onClose()}
				>
					취소하기
				</Button>
			</Modal.Body>
		</Modal>
	);
};

export default GameMatchModal;
