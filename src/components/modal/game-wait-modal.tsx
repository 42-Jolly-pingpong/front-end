import { useRecoilState } from 'recoil';
import GameMatchModal from 'components/modal/game-search-modal';
import GameModeModal from 'components/modal/game-mode-modal';
import ModalProps from 'ts/interfaces/game/modal-props';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { GameBanner } from 'ts/enums/game/game-banner.enum';

const GameWaitModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState)
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);

	const zeroPoint = () => {
		setGameBanner({ ...gameBanner, type: GameBanner.NOMATCH });
		setGameWait({ ...gameWait, status: GameWaitStatus.NONE });
		onClose();
	};

	switch (gameWait.status) {
		case GameWaitStatus.MODE: // 게임 모드를 고르는 모달
			return <GameModeModal show={show} onClose={onClose} />;
		case GameWaitStatus.SEARCH: // 게임 대전자를 찾는 모달
			return (
				<GameMatchModal
					show={show}
					onClose={onClose}
					zeroPoint={zeroPoint}
					message='대전자 찾는중...'
				/>
			);
		default:
			return;
	}
};

export default GameWaitModal;
