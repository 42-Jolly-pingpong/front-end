import { useRecoilValue } from 'recoil';
import GameMatchModal from 'components/modal/game-search-modal';
import GameModeModal from 'components/modal/game-mode-modal';
import ModalProps from 'ts/interfaces/game/modal-props';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameWaitState } from 'ts/states/game/game-wait-state';

// 게임 관련 모달들
const GameWaitModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const gameWait = useRecoilValue(gameWaitState);
	
	//console.log(gameWait);
	switch (gameWait.status) {
		case GameWaitStatus.MODE: // 게임 모드를 고르는 모달
			return <GameModeModal show={show} onClose={onClose} />;
		case GameWaitStatus.SEARCH: // 게임 대전자를 찾는 모달
			return <GameMatchModal show={show} onClose={onClose} />;
		default:
			return;
	}
};

export default GameWaitModal;
