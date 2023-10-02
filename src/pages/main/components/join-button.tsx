import { Button } from 'flowbite-react';
import { useState } from 'react';
import JoinModal from './join-modal';

const JoinButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Button
				className='text-white bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
				size='xl'
				onClick={() => setIsModalOpen(true)}
			>
				<img src='images/fire.png' alt='fire' />
				<div className='font-bold mx-3'> Join Game</div>
				<img src='images/arrow-right.png' alt='arrow' />
			</Button>
			<JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
};

export default JoinButton;
