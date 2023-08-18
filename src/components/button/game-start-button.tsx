import { useState } from 'react';
import GameWaitModal from '../modal/game-wait-modal';
import GameResultModal from '../../pages/game/game-result-modal';

const GameStartButton = () => {
	const handleModal = () => {
		window.gameWaitModal.showModal();
		//window.gameResultModal.showModal();
	};

	return (
		<div>
			<button
				className='flex btn btn-active btn-neutral text-xl font-bold'
				onClick={handleModal}
			>
				Game Start
			</button>
			<GameWaitModal />
			{/*<GameResultModal />*/}
		</div>
	);
};

export default GameStartButton;
