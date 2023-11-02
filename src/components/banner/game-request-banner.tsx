import { useState } from 'react';
import { useRecoilState } from 'recoil';
import UseCountdown from 'hooks/use-countdown';
import CancelButton from 'components/button/cancel-button';
import YellowButton from 'components/button/yellow-button';
import BannerIcon from 'components/banner/item/banner-icon';
import BannerMessage from 'components/banner/item/banner-message';
import BannerProgress from 'components/banner/item/banner-progress';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { GAME_REQ_MSG } from 'constants/messages';
import {
	COUNTDOWN_REQUEST_INTERVAL,
	COUNTDOWN_REQUEST_VALUE,
	PROGRESS_DEFAULT_VALUE,
} from 'constants/values';

const GameRequestBanner = () => {
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState);
	const [progressValue, setProgressValue] = useState(PROGRESS_DEFAULT_VALUE);

	const handleMatch = () => {
		setGameBanner({ ...gameBanner, type: GameBanner.NONE });
		// 게임을 수락했을 경우 소켓 로직 추가
	};

	const handleCancel = () => {
		setGameBanner({ ...gameBanner, type: GameBanner.NONE });
	};

	const handleProgress = (value: number) => {
		setProgressValue(value);
	};

	return (
		<>
			<UseCountdown
				value={COUNTDOWN_REQUEST_VALUE}
				interval={COUNTDOWN_REQUEST_INTERVAL}
				end={handleCancel}
				onTick={handleProgress}
			/>
			<div className='fixed z-50 flex justify-center w-full mt-6'>
				<div className='fixed w-11/12 border rounded bg-white '>
					<div className='flex justify-between p-4 items-center'>
						<div className='flex'>
							<BannerIcon />
							<BannerMessage message={GAME_REQ_MSG} />
						</div>
						<div className='flex items-center'>
							<YellowButton size='xs' onClick={handleMatch}>
								승낙하기
							</YellowButton>
							<div className='mr-4' />
							<CancelButton size='xs' onClick={handleCancel} />
						</div>
					</div>
					<BannerProgress progress={progressValue} />
				</div>
			</div>
		</>
	);
};

export default GameRequestBanner;
