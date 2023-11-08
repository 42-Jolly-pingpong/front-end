import { Modal } from 'flowbite-react';
import GameModeRadio from 'components/modal/item/game-mode-radio';
import YellowButton from 'components/button/yellow-button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameModeSelectState } from 'ts/states/game/game-mode-select-state';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';
import { useEffect } from 'react';
import { socket } from 'socket/socket';
import GameSearchModal from 'components/modal/game-search-modal';

const InviteGameModal = () => {
	const [showModal, setShowModal] = useRecoilState(gameModeSelectState);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const opponentInfo = useRecoilValue(opponentInfoState);

	useEffect(() => {
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
	}, []);

	const onClose = () => {
		setShowModal(false);
	};

	const onClick = () => {
		socket.emit(
			'inviteGame',
			JSON.stringify({ user: opponentInfo, mode: gameWait.mode })
		);
		setGameWait({ ...gameWait, status: GameWaitStatus.SEARCH });
	};

	const cancelInvite = () => {
		// 게임 초대 취소하는 로직
		setShowModal(false);
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
	};

	return gameWait.status === GameWaitStatus.MODE ? (
		<Modal size={'md'} show={showModal} onClose={onClose} dismissible>
			<Modal.Header>게임 옵션 선택</Modal.Header>
			<Modal.Body className='flex flex-col gap-7'>
				<GameModeRadio />
				<YellowButton onClick={onClick}>게임 초대</YellowButton>
			</Modal.Body>
		</Modal>
	) : (
		<GameSearchModal
			show={showModal}
			onClose={cancelInvite}
			message={'응답 기다리는중'}
		/>
	);
};

export default InviteGameModal;
