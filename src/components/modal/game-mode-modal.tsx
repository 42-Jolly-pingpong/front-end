import { Modal } from 'flowbite-react';
import { useRecoilState } from 'recoil';
import YellowButtonLg from 'components/button/yellow-button-lg';
import GameModeRadio from 'components/modal/item/game-mode-radio';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import ModalProps from 'ts/interfaces/game/modal-props';
import { socket } from 'socket/socket';

const GameModeModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);

	const handleGameStart = () => {
		setGameWait({ ...gameWait, status: GameWaitStatus.SEARCH });
		socket.emit('matching')
	};

	return (
		<Modal size='lg' show={show} onClose={onClose} dismissible>
			<Modal.Body className='flex flex-col my-2 m-6 '>
				<div className='font-bold text-xl text-gray-900'>게임 옵션 선택</div>
				<GameModeRadio />
				<YellowButtonLg onClick={handleGameStart}> 게임 시작 </YellowButtonLg>
			</Modal.Body>
		</Modal>
	);
};

export default GameModeModal;
