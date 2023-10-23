import { useRecoilState } from 'recoil';
import { Modal } from 'flowbite-react';
import YellowButton from 'components/button/yellow-button';
import GameModeRadio from 'components/modal/item/game-mode-radio';
import ModalProps from 'ts/interfaces/game/modal-props';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameWaitState } from 'ts/states/game/game-wait-state';

const GameModeModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);

	const handleGameStart = () => {
		setGameWait({ ...gameWait, status: GameWaitStatus.SEARCH });
	};

	return (
		<Modal size='lg' show={show} onClose={onClose} dismissible>
			<Modal.Body className='flex flex-col my-2 m-6 '>
				<div className='font-bold text-xl text-gray-900'>게임 옵션 선택</div>
				<GameModeRadio />
				<YellowButton size='xl' onClick={handleGameStart}>
					<div className='font-bold'>게임 시작 </div>
				</YellowButton>
			</Modal.Body>
		</Modal>
	);
};

export default GameModeModal;
