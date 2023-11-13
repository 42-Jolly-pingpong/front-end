import { useEffect, useState } from 'react';
import { socket } from '../../socket/socket';
import JoinButton from 'pages/main/components/join-button';
import JoinIntro from 'pages/main/components/join-intro';
import PingPongAnimation from 'pages/main/components/ping-pong-animation';

const Main = () => {
	const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
	// const setIsGame = useSetRecoilState(gameStartState);

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

	return (
		<div className='flex flex-col justify-center items-center text-center h-screen gap-y-12 2xl:gap-y-24'>
			<JoinIntro />
			<PingPongAnimation />
			<JoinButton />
		</div>
	);
};

export default Main;
