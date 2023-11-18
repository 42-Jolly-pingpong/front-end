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
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { GameBanner } from 'ts/enums/game/game-banner.enum';

interface Props {
	show: boolean;
}

const InviteGameModal = ({ show }: Props) => {
	const setGameSelectModal = useSetRecoilState(gameModeSelectState);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const opponentInfo = useRecoilValue(opponentInfoState);
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState);

	useEffect(() => {
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });

		socket.on('refuseInvite', () => {
			setGameBanner({ ...gameBanner, type: GameBanner.REFUSE });
			setGameSelectModal(false);
		});

		return () => {
			socket.off('refuseInvite');
		};
	}, []);

	const onClose = () => {
		setGameSelectModal(false);
	};
	
	const zeroPoint = () => {
		//setGameWait({ ...gameWait, status: GameWaitStatus.NONE });
		onClose();
	}

	const onClick = () => {
		socket.emit(
			'inviteGame',
			JSON.stringify({ user: opponentInfo, mode: gameWait.mode })
		);
		setGameWait({ ...gameWait, status: GameWaitStatus.SEARCH });
	};

	const cancelInvite = () => {
		socket.emit(
			'inviteCencel',
			JSON.stringify({ user: opponentInfo, mode: gameWait.mode })
		);
		setGameSelectModal(false);
		setGameWait({ ...gameWait, status: GameWaitStatus.MODE });
	};

	return gameWait.status === GameWaitStatus.MODE ? (
		<Modal show={show} onClose={onClose} size='lg' dismissible>
			<Modal.Body className='flex flex-col my-2 m-6 '>
				<div className='font-bold text-xl text-gray-900'>게임 옵션 선택</div>
				<GameModeRadio />
				<YellowButton size='xl' onClick={onClick}>
					<div className='font-bold'>게임 초대 </div>
				</YellowButton>
			</Modal.Body>
		</Modal>
	) : (
		<GameSearchModal
			show={show}
			onClose={cancelInvite}
			zeroPoint={zeroPoint}
			message={'응답 기다리는중'}
			sec={10}
		/>
	);
};

export default InviteGameModal;
