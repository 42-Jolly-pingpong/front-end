import { useEffect, useState } from 'react';
import JoinButton from './components/join-button';
import JoinIntro from './components/join-intro';
import { socket } from '../../socket/socket';

const Main = () => {
	const [isConnected, setIsConnected] = useState<boolean>(socket.connected)

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

	return (
		<div className='flex flex-col justify-center items-center text-center mt-72'>
			<JoinIntro />
			<JoinButton />
		</div>
	);
};

export default Main;
