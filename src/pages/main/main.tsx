import { useEffect, useState } from 'react';
import { socket } from '../../socket/socket';
import JoinButton from 'pages/main/components/join-button';
import JoinIntro from 'pages/main/components/join-intro';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameStartState } from 'ts/states/game/game-start-state';
import { useNavigate } from 'react-router-dom';
import PingPongAnimation from './components/ping-pong-animation';

const Main = () => {
	const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
	const setIsGame = useSetRecoilState(gameStartState);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isConnected) socket.connect();
		function onConnect() {
			setIsConnected(true);
		}
		function onDisconnect() {
			setIsConnected(false);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
	}, []);

	useEffect(() => {
		// if (isGameStart) {
		// 	navigate('/game');
		// }
	});

	return (
		<div className='flex flex-col justify-center items-center text-center h-screen gap-y-6'>
			<JoinIntro />
			<PingPongAnimation />
			<JoinButton />
		</div>
	);
};

export default Main;
