import { useEffect, useState } from 'react';
import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState,
} from 'recoil';
import { socket } from 'socket/socket';
import { gameStartState } from 'ts/states/game/game-start-state';
import { gameInfoState } from 'ts/states/game/game-info.state';
import { gameModalState } from 'ts/states/game/game-wait-state';
import { GameModalStatus } from 'ts/enums/game/game-wait.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import YellowButton from 'components/button/yellow-button';
import { userState } from 'ts/states/user-state';
import { HiArrowRight, HiCursorClick } from 'react-icons/hi';

const JoinButton = () => {
	const [gameModal, setGameModal] = useRecoilState(gameModalState);
	const resetGameModal = useResetRecoilState(gameModalState);
	const resetGameBanner = useResetRecoilState(gameBannerState);
	const userInfo = useRecoilValue(userState);
	const setIsGameStart = useSetRecoilState(gameStartState);
	const setGameInfo = useSetRecoilState(gameInfoState);

	// useEffect(() => {
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
	// });

	const handleButton = () => {
		resetGameBanner();
		setGameModal({ ...gameModal, status: GameModalStatus.MODE, show: true });
		socket.emit('cancel', userInfo?.id);
	};

	const handleClose = () => {
		resetGameModal();
		socket.emit('cancel', userInfo?.id);
	};

	return (
		<YellowButton size='lg' onClick={handleButton}>
			<HiCursorClick className='mr-2 h-5 w-5' />
			게임하러 가기
			<HiArrowRight className='ml-2 h-5 w-5' />
		</YellowButton>
	);
};

export default JoinButton;
