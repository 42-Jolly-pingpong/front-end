import { Modal } from 'flowbite-react';
import GameModeRadio from 'components/modal/item/game-mode-radio';
import YellowButton from 'components/button/yellow-button';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { gameModeSelectState } from 'ts/states/game/game-mode-select-state';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import GameSearchModal from '../game-search-modal';
import { opponentInfoState } from 'ts/states/game/opponent-info-state';
import { useEffect } from 'react';
import { socket } from 'socket/socket';

interface Props {
	show: boolean;
}

const InviteGameModal = ({ show }: Props) => {
	const setGameSelectModal = useSetRecoilState(gameModeSelectState);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const opponentInfo = useRecoilValue(opponentInfoState);

	useEffect(() => {
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
	}, []);

	const onClose = () => {
		setGameSelectModal(false);
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
		setGameSelectModal(false);
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
	};

	return gameWait.status === GameWaitStatus.MODE ? (
		<Modal size={'md'} show={show} onClose={onClose} dismissible>
			<Modal.Header>게임 옵션 선택</Modal.Header>
			<Modal.Body className='flex flex-col gap-7'>
				<GameModeRadio />
				<YellowButton onClick={onClick}>
					<div className='font-bold'>게임 초대</div>
				</YellowButton>
			</Modal.Body>
		</Modal>
	) : (
		<GameSearchModal
			show={show}
			onClose={cancelInvite}
			message={'응답 기다리는중'}
		/>
	);
};

export default InviteGameModal;
