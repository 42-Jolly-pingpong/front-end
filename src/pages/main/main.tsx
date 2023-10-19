import { useEffect, useState } from 'react';
import { socket } from '../../socket/socket';
import GamePlayModal from '../game/pingpong-play-modal';
import JoinButton from 'pages/main/components/join-button';
import JoinIntro from 'pages/main/components/join-intro';
import PlayerInfo from 'ts/interfaces/playerInfo.model';

const Main = () => {
	const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
	const [isGameStart, setIsGameStart] = useState<boolean>(false);
	const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);

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
		<div className='flex flex-col justify-center items-center text-center mt-72'>
			<JoinIntro />
			<JoinButton
				
			/>
			{isGameStart ? <GamePlayModal playerInfo={playerInfo} /> : null}
		</div>
	);
};

export default Main;
