import { Modal } from 'flowbite-react';
import GameModeRadio from 'components/modal/item/game-mode-radio';
import YellowButton from 'components/button/yellow-button';
import { useRecoilState, useRecoilValue } from 'recoil';

import { gameModalState } from 'ts/states/game/game-wait-state';
import { GameModalStatus } from 'ts/enums/game/game-wait.enum';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';
import { useEffect } from 'react';
import { socket } from 'socket/socket';
import GameSearchModal from 'components/modal/game-search-modal';
import { GameMode } from 'ts/enums/game/game-mode.enum';
import { userState } from 'ts/states/user-state';

const GameModal = () => {
	const user = useRecoilValue(userState);
	const [gameModal, setGameModal] = useRecoilState(gameModalState);
	const opponentInfo = useRecoilValue(opponentInfoState);

	useEffect(() => {
		setGameModal({ ...gameModal, status: GameModalStatus.MODE });
	}, []);

	const onClose = () => {
		setGameModal({ ...gameModal, show: false });
	};

	const onClick = () => {
		socket.emit(
			'inviteGame',
			JSON.stringify({ user: opponentInfo, mode: gameModal.mode })
		);
		setGameModal({ ...gameModal, status: GameModalStatus.SEARCH });
	};

	const handleGameStart = () => {
		if (gameModal.mode == GameMode.NORMAL) {
			socket.emit('normalMatching', user?.id);
		} else {
			socket.emit('speedMatching', user?.id);
		}
		setGameModal({ ...gameModal, status: GameModalStatus.SEARCH });
	};

	const cancelInvite = () => {
		// 게임 초대 취소하는 로직
		setGameModal({ ...gameModal, status: GameModalStatus.MODE, show: false });
	};

	if (gameModal.status === GameModalStatus.SEARCH)
		return <GameSearchModal show={gameModal.show} onClose={cancelInvite} />;

	return (
		<Modal size={'md'} show={gameModal.show} onClose={onClose} dismissible>
			<Modal.Header>게임 옵션 선택</Modal.Header>
			<Modal.Body className='flex flex-col gap-7'>
				<GameModeRadio />
				<YellowButton onClick={onClick}>
					게임 {gameModal.invite ? '초대' : '시작'}
				</YellowButton>
			</Modal.Body>
		</Modal>
	);
};

export default GameModal;
