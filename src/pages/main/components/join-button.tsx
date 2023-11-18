import { useState } from 'react';
import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
} from 'recoil';
import { socket } from 'socket/socket';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import YellowButton from 'components/button/yellow-button';
import { userState } from 'ts/states/user-state';
import { HiArrowRight, HiCursorClick } from 'react-icons/hi';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import GameWaitModal from 'components/modal/game-wait-modal';

const JoinButton = () => {
	const [modal, setModal] = useState(false);
	const userInfo = useRecoilValue(userState);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const resetGameWait = useResetRecoilState(gameWaitState);
	const resetGameBanner = useResetRecoilState(gameBannerState);

	const handleButton = () => {
		resetGameBanner();
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
		socket.emit('cancel', userInfo?.id);
		setModal(true);
	};

	const handleClose = () => {
		resetGameWait();
		socket.emit('cancel', userInfo?.id);
		setModal(false);
	};

	return (
		<>
			<YellowButton size='lg' onClick={handleButton}>
				<HiCursorClick className='mr-2 h-5 w-5' />
				게임하러 가기
				<HiArrowRight className='ml-2 h-5 w-5' />
			</YellowButton>
			<GameWaitModal show={modal} onClose={handleClose} />
		</>

	);
};

export default JoinButton;
