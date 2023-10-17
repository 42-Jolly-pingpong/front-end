import { useState } from 'react';
import YellowButtonXl from 'components/button/yellow-button-xl';
import GameWaitModal from 'components/modal/game-wait-modal';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';

const JoinButton = () => {
	const [modal, setModal] = useState(false);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const resetGameWait = useResetRecoilState(gameWaitState);

	const handleButton = () => {
		setModal(true);
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
	};

	const handleClose = () => {
		resetGameWait();
		setModal(false);
	};

	return (
		<>
			<YellowButtonXl onClick={handleButton}>
				<img src='images/fire.png' alt='fire' />
				<div className='font-bold mx-3'> 게임하러 가기</div>
				<img src='images/arrow-right.png' alt='arrow' />
			</YellowButtonXl>
			<GameWaitModal show={modal} onClose={handleClose} />
		</>
	);
};

export default JoinButton;
