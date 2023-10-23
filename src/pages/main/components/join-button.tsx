import { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import GameWaitModal from 'components/modal/game-wait-modal';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import YellowButton from 'components/button/yellow-button';

const JoinButton = () => {
	const [modal, setModal] = useState(false);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const resetGameWait = useResetRecoilState(gameWaitState);
	const resetGameBanner = useResetRecoilState(gameBannerState);

	const handleButton = () => {
		resetGameBanner();
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
		setModal(true);
	};

	const handleClose = () => {
		resetGameWait();
		setModal(false);
	};

	return (
		<>
			<YellowButton size='xl' onClick={handleButton}>
				<img src='images/fire.png' alt='fire' />
				<div className='font-bold mx-3'> 게임하러 가기</div>
				<img src='images/arrow-right.png' alt='arrow' />
			</YellowButton>
			<GameWaitModal show={modal} onClose={handleClose} />
		</>
	);
};

export default JoinButton;
