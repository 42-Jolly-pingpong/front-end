import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Modal } from 'flowbite-react';
import UseCountdown from 'hooks/use-countdown';
import WhiteButtonXl from 'components/button/white-button-xl';
import TimeSpinner from 'components/modal/item/time-spinner';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import ModalProps from 'ts/interfaces/game/modal-props';
import {
	COUNTDOWN_MATCH_INTERVAL,
	COUNTDOWN_MATCH_VALUE,
} from 'constants/values';

const GameSearchModal: React.FC<ModalProps> = ({ show, onClose }) => {
	const [seconds, setSeconds] = useState(COUNTDOWN_MATCH_VALUE);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState);
	

	/**
	 * 카운트다운 안에 매칭이 이루어지지 않을 경우
	 * rematch를 묻는 배너 띄우기 + waitState 초기화 시키기
	 */
	const handleNoMatch = () => {
		setGameBanner({ ...gameBanner, type: GameBanner.NOMATCH });
		setGameWait({ ...gameWait, status: GameWaitStatus.NONE });
	};

	// 모달을 닫았을 경우
	const handleCancel = () => {
		onClose();
	};

	// 매칭 성공했을 경우
	const handleMatch = () => {
		onClose();
	};

	// 카운트다운 관련 handle
	const handleTick = (value: number) => {
		setSeconds(value);
	};

	return (
		<Modal size='md' show={show} onClose={onClose} dismissible>
			<Modal.Body className='flex flex-col items-center text-center relative'>
				<div className='text-xl font-extrabold mb-6'>대전자 찾는중...</div>
				<TimeSpinner seconds={seconds} />
				<WhiteButtonXl onClick={handleCancel}>취소하기</WhiteButtonXl>
				<UseCountdown
					value={seconds}
					interval={COUNTDOWN_MATCH_INTERVAL}
					onTick={handleTick}
					end={handleNoMatch}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default GameSearchModal;
