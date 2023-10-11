import { useEffect, useState } from 'react';
import JoinButton from './components/join-button';
import JoinIntro from './components/join-intro';
import { socket } from '../../socket/socket';

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
			{isGameStart ? <h1>게임 모달 띄우기</h1> : null} 
		</div>
	);
};

export default Main;
