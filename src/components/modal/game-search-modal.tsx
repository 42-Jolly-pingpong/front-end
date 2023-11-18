import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Modal } from 'flowbite-react';
import UseCountdown from 'hooks/use-countdown';
import WhiteButton from 'components/button/white-button';
import TimeSpinner from 'components/modal/item/time-spinner';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import {
	COUNTDOWN_MATCH_INTERVAL,
	COUNTDOWN_MATCH_VALUE,
} from 'constants/values';

interface Props {
	show: boolean;
	onClose: () => void;
	zeroPoint: () => void;
	message: string;
	sec?: number;
}

const GameSearchModal: React.FC<Props> = ({ show, onClose, zeroPoint,message, sec }) => {
	const [seconds, setSeconds] = useState(sec || COUNTDOWN_MATCH_VALUE);
	
	// 모달을 닫았을 경우
	const handleCancel = () => {
		onClose();
	};

	// 카운트다운 관련 handle
	const handleTick = (value: number) => {
		setSeconds(value);
	};

	return (
		<Modal size='md' show={show} onClose={onClose} dismissible>
			<Modal.Body className='flex flex-col items-center text-center relative'>
				<div className='text-xl font-extrabold mb-6'>{message}</div>
				<TimeSpinner seconds={seconds} />
				<div className='mt-6' />
				<WhiteButton size='xl' onClick={handleCancel}>
					<div className='font-bold'>취소하기</div>
				</WhiteButton>
				<UseCountdown
					value={seconds}
					interval={COUNTDOWN_MATCH_INTERVAL}
					onTick={handleTick}
					end={zeroPoint}
				/>
			</Modal.Body>
		</Modal>
	);
};

export default GameSearchModal;
