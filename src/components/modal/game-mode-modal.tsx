import { useRecoilState, useRecoilValue } from 'recoil';
import { Modal } from 'flowbite-react';
import YellowButton from 'components/button/yellow-button';
import GameModeRadio from 'components/modal/item/game-mode-radio';
import ModalProps from 'ts/interfaces/game/modal-props';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { socket } from 'socket/socket';
import { userState } from 'ts/states/user-state';
import { GameMode } from 'ts/enums/game/game-mode.enum';

const GameModeModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const user = useRecoilValue(userState);

	const handleGameStart = () => {
		setGameWait({ ...gameWait, status: GameWaitStatus.SEARCH });
		if (gameWait.mode == GameMode.NORMAL) {
			console.log('노말');
			socket.emit('normalMatching', user?.id);
		} else {
			console.log('스피드');
			socket.emit('speedMatching', user?.id);
		}
	};

	return (
		<Modal size={'md'} show={show} onClose={onClose} dismissible>
			<Modal.Header>게임 옵션 선택</Modal.Header>
			<Modal.Body className='flex flex-col gap-7'>
				<GameModeRadio />
				<YellowButton onClick={handleGameStart}>게임 시작</YellowButton>
			</Modal.Body>
		</Modal>
	);
};

export default GameModeModal;
