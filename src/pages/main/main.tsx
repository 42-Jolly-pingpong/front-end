import { useEffect, useState } from 'react';
import { socket } from '../../socket/socket';
import GamePlayModal from '../game/pingpong-play-modal';
import JoinButton from 'pages/main/components/join-button';
import JoinIntro from 'pages/main/components/join-intro';

const Main = () => {
	const [isConnected, setIsConnected] = useState<boolean>(socket.connected)
	const [isGameStart, setIsGameStart] = useState<boolean>(false)

	useEffect(() => {
		if (!isConnected)
			socket.connect();
		function onConnect() {
			setIsConnected(true);
		}
		function onDisconnect() {
			setIsConnected(false)
		}
		socket.on('connect', onConnect)
		socket.on('disconnect', onDisconnect)
	}, [])

	const updateGameState = (newState: boolean) => {
		setIsGameStart(newState);
	};

	return (
		<div className='flex flex-col justify-center items-center text-center mt-72'>
			<JoinIntro />
			<JoinButton updateGameStatus={updateGameState}/>
			{isGameStart ? <GamePlayModal /> : null}
		</div>
	);
};

export default Main;
