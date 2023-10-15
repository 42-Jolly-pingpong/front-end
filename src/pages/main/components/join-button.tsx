import { Button } from 'flowbite-react';
import { useState } from 'react';
import { GameMode } from 'ts/enums/game-mode.enum';
import GameMatchModal from 'components/modal/game-match-modal';
import GameModeModal from 'components/modal/game-mode-modal';

const JoinButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [matchModalOpen, setMatchModalOpen] = useState(false);
	const [selectMode, setSelectMode] = useState(GameMode.CLASSIC);

	const handleMatch = (selectMode) => {
		setSelectMode(selectMode);
		setMatchModalOpen(true);
	};

	return (
		<>
			<Button
				className='text-white bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
				size='xl'
				onClick={() => setIsModalOpen(true)}
			>
				<img src='images/fire.png' alt='fire' />
				<div className='font-bold mx-3'> 게임하러 가기</div>
				<img src='images/arrow-right.png' alt='arrow' />
			</Button>
			<GameModeModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onMatch={handleMatch}
			/>
			{matchModalOpen && (
				<GameMatchModal
					isOpen={matchModalOpen}
					onClose={() => setMatchModalOpen(false)}
					onMatch={() => setMatchModalOpen(false)}
				/>
			)}
		</>
	);
};

export default JoinButton;
