import { Modal } from 'flowbite-react';
import GameCanvas from './components/gameCanvas';
import PlayerInfo from 'ts/interfaces/playerInfo.model';

function GamePlayModal({playerInfo}) {
	return (
		<Modal show={true} dismissible>
			<Modal.Body className='flex flex-col items-center justify-center h-screen'>
				<GameCanvas playerInfo={playerInfo} />
			</Modal.Body>
		</Modal>
	);
}

export default GamePlayModal;
