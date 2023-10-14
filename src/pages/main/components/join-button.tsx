import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { socket } from '../../../socket/socket';
import JoinModal from 'pages/main/components/modal/join-modal';
import PlayerInfo from 'ts/interfaces/playerInfo.model';

interface ChildProps {
	updateGameStatus: (newState: boolean) => void;
	updatePlayerInfo: (newplayerInfo: PlayerInfo) => void;
}

const JoinButton = ({ updateGameStatus, updatePlayerInfo }: ChildProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	useEffect(() => {
		if (!socket.connected) socket.connect();
		socket.on('gameStart', () => {
			updateGameStatus(true);
			cancel();
		});
		socket.on('getPlayerInfo', (playerData: PlayerInfo) => {
			updatePlayerInfo(playerData);
		});
	}, []);
	useEffect(() => {
		const timer = setTimeout(() => {
			cancel();
		}, 6000);

		return () => {
			clearTimeout(timer);
		};
	});
	function matching() {
		socket.emit('matching', '');
		setIsModalOpen(true);
	}
	function cancel() {
		socket.emit('cancel', '');
		setIsModalOpen(false);
	}
	return (
		<>
			<Button
				className='text-white bg-yellow-300 border border-transparent enabled:hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-300'
				size='xl'
				onClick={matching}
			>
				<img src='images/fire.png' alt='fire' />
				<div className='font-bold mx-3'> 게임하러 가기</div>
				<img src='images/arrow-right.png' alt='arrow' />
			</Button>
			<JoinModal isOpen={isModalOpen} onClose={cancel} />
		</>
	);
};

export default JoinButton;
