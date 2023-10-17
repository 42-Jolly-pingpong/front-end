import { useState } from 'react';
import { useRecoilState } from 'recoil';
import UseCountdown from 'hooks/use-countdown';
import BannerIcon from 'components/banner/item/banner-icon';
import CancelButtonXs from 'components/button/cancel-button-xs';
import YellowButtonXs from 'components/button/yellow-button-xs';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import BannerMessage from 'components/banner/item/banner-message';
import BannerProgress from 'components/banner/item/banner-progress';
import { GAME_REQ_MSG } from 'constants/messages';
import {
	COUNTDOWN_REQUEST_INTERVAL,
	COUNTDOWN_REQUEST_VALUE,
} from 'constants/values';

const GameRequestBanner = () => {
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState);
	const [progressValue, setProgressValue] = useState(100);

	const handleMatch = () => {
		setGameBanner({ ...gameBanner, banner: GameBanner.NONE });
		// 게임을 수락했을 경우 소켓 로직 추가
	};

	const handleCancel = () => {
		setGameBanner({ ...gameBanner, banner: GameBanner.NONE });
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
			<div className='fixed z-50 flex justify-center w-full h-full mt-6'>
				<div className='fixed w-11/12 border rounded bg-white '>
					<div className='flex justify-between p-4 items-center'>
						<div className='flex'>
							<BannerIcon />
							<BannerMessage message={GAME_REQ_MSG} />
						</div>
						<div className='flex items-center'>
							<YellowButtonXs onClick={handleMatch}>승낙하기</YellowButtonXs>
							<CancelButtonXs onClick={handleCancel} />
						</div>
					</div>
					<BannerProgress progress={progressValue} />
				</div>
			</div>
		</>
	);
};

export default GameRequestBanner;
