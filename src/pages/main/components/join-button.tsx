import { useEffect, useState } from 'react';
import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from 'recoil';
import GameWaitModal from 'components/modal/game-wait-modal';
import { socket } from 'socket/socket';
import { gameStartState } from 'ts/states/game/game-start-state';
import { gameInfoState, GameInfoType } from 'ts/states/game/game-info.state';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import YellowButton from 'components/button/yellow-button';
import { userState } from 'ts/states/user-state';
import { Button } from 'flowbite-react';
import { HiArrowRight, HiCursorClick } from 'react-icons/hi';

const JoinButton = () => {
	const [modal, setModal] = useState(false);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const resetGameWait = useResetRecoilState(gameWaitState);
	const resetGameBanner = useResetRecoilState(gameBannerState);
	const userInfo = useRecoilValue(userState);
	const setIsGameStart = useSetRecoilState(gameStartState);
	const setGameInfo = useSetRecoilState(gameInfoState);

	useEffect(() => {
		// if (socket.connected) {
		// 	socket.on('getPlayerInfo', (message) => {
		// 		const newGameInfo: GameInfoType = message;
		// 		setGameInfo(newGameInfo);
		// 	});
		// }
		// return () => {
		// 	socket.off('getPlayerInfo');
		// 	socket.off('gameStart');
		// };
	});

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
			<Button
				size='lg'
				onClick={handleButton}
				// className='bg-yellow-300 enabled:hover:bg-yellow-400'
			>
				<HiCursorClick className='mr-2 h-5 w-5' />
				게임하러 가기
				<HiArrowRight className='ml-2 h-5 w-5' />
			</Button>
			<GameWaitModal show={modal} onClose={handleClose} />
			{/* <YellowButton size='xl' onClick={handleButton}>
				<img src='images/fire.png' alt='fire' />
				<div className='font-bold mx-3'> 게임하러 가기</div>
				<img src='images/arrow-right.png' alt='arrow' />
			</YellowButton>
			<GameWaitModal show={modal} onClose={handleClose} /> */}
		</>
	);
};

export default JoinButton;
