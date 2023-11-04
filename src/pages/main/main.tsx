import { useEffect, useState } from 'react';
import { socket } from '../../socket/socket';
import JoinButton from 'pages/main/components/join-button';
import JoinIntro from 'pages/main/components/join-intro';
import { useRecoilValue } from 'recoil';
import { gameStartState } from 'ts/states/game/game-start-state';
import { useNavigate } from 'react-router-dom';
import { userState } from 'ts/states/user-state';
import PingPongAnimation from './components/ping-pong-animation';

const Main = () => {
	const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
	const isGameStart = useRecoilValue(gameStartState);
	const userInfo = useRecoilValue(userState);
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
		socket.emit('setId', userInfo?.id);
	}, []);

	useEffect(() => {
		if (isGameStart) {
			navigate('/game');
		}
	});

	return (
		<div className='flex flex-col justify-center items-center text-center mt-72'>
			<JoinIntro />
			<PingPongAnimation />
			<JoinButton />
		</div>
	);
};

export default Main;
