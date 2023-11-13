import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Modal } from 'flowbite-react';
import UseCountdown from 'hooks/use-countdown';
import WhiteButton from 'components/button/white-button';
import TimeSpinner from 'components/modal/item/time-spinner';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameModalState } from 'ts/states/game/game-wait-state';
import { GameModalStatus } from 'ts/enums/game/game-wait.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import {
	COUNTDOWN_MATCH_INTERVAL,
	COUNTDOWN_MATCH_VALUE,
} from 'constants/values';

interface Props {
	show: boolean;
	onClose: () => void;
}

const GameSearchModal: React.FC<Props> = ({ show, onClose }) => {
	const [seconds, setSeconds] = useState(COUNTDOWN_MATCH_VALUE);
	const [gameModal, setGameModal] = useRecoilState(gameModalState);
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState);

	/**
	 * 카운트다운 안에 매칭이 이루어지지 않을 경우
	 * rematch를 묻는 배너 띄우기 + waitState 초기화 시키기
	 */
	const handleNoMatch = () => {
		setGameBanner({ ...gameBanner, type: GameBanner.NOMATCH });
		setGameModal({ ...gameModal, status: GameModalStatus.NONE });
		onClose();
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
		<Modal size={'md'} show={show} onClose={onClose} dismissible>
			<Modal.Body className='flex flex-col items-center text-center gap-6'>
				<div className='text-xl font-extrabold'>
					{gameModal.invite ? '응답을 기다리는 중...' : '대전자 찾는 중...'}
				</div>
				<TimeSpinner seconds={seconds} />
				<WhiteButton size='sm' onClick={handleCancel}>
					취소하기
				</WhiteButton>
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
