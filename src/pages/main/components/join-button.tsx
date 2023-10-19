import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { socket } from '../../../socket/socket';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { GameWaitStatus } from '../../../ts/enums/game/game-wait.enum';
import { gameWaitState } from '../../../ts/states/game/game-wait-state';
import YellowButtonXl from 'components/button/yellow-button-xl';
import GameWaitModal from 'components/modal/game-wait-modal';
import React from 'react';

const JoinButton = () => {
	const [modal, setModal] = useState(false);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const resetGameWait = useResetRecoilState(gameWaitState);

	const handleButton = () => {
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
		setModal(true);
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
