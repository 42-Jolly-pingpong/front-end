import { useRecoilValue } from 'recoil';
import GameMatchModal from 'components/modal/game-search-modal';
import GameModeModal from 'components/modal/game-mode-modal';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameWaitState } from 'ts/states/game/game-wait-state';

interface ModalProps {
	show: boolean;
	onClose: () => void;
}

const GameWaitModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const gameWait = useRecoilValue(gameWaitState);

	console.log(gameWait);
	switch (gameWait.status) {
		case GameWaitStatus.MODE:
			return <GameModeModal show={show} onClose={onClose} />;
		case GameWaitStatus.SEARCH:
			return <GameMatchModal show={show} onClose={onClose} />;
		default:
			return;
	}
};

export default GameWaitModal;
