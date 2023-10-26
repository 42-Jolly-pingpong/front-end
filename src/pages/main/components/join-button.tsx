import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import YellowButtonXl from 'components/button/yellow-button-xl';
import GameWaitModal from 'components/modal/game-wait-modal';
import { socket } from 'socket/socket';
import { gameStartState } from 'ts/states/game/game-start-state';
import { gameInfoState, GameInfoType } from 'ts/states/game/game-info.state';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { userState } from 'ts/states/user-state';

const JoinButton = () => {
	const [modal, setModal] = useState(false);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const resetGameWait = useResetRecoilState(gameWaitState);
	const resetGameBanner = useResetRecoilState(gameBannerState);
	const userInfo = useRecoilValue(userState)

	const setIsGameStart = useSetRecoilState(gameStartState);
	const setGameInfo = useSetRecoilState(gameInfoState);

	useEffect(() => {
		if (socket.connected) {
			socket.on('getPlayerInfo', (message) => {
				const newGameInfo: GameInfoType = message;
				setGameInfo(newGameInfo);
			});
			socket.on('gameStart', () => {
				setIsGameStart(true);
			});
		}

		return () => {
			socket.off('getPlayerInfo');
			socket.off('gameStart');
		}
	});


	const handleButton = () => {
		resetGameBanner();
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
		socket.emit('cancel', userInfo?.id)
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
