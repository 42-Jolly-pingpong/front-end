import { useState } from 'react';
import UseCountdown from 'hooks/use-countdown';
import BannerIcon from 'components/banner/banner-icon';
import BannerMessage from 'components/banner/banner-message';
import BannerProgress from 'components/banner/banner-progress';
import CancelButtonXs from 'components/button/cancel-button-xs';
import YellowButtonXs from 'components/button/yellow-button-xs';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { useSetRecoilState } from 'recoil';

const GameRequestBanner = () => {
	const setGameBanner = useSetRecoilState(gameBannerState);
	const [progressValue, setProgressValue] = useState(100);

	const handleMatch = () => {
		setGameBanner(GameBanner.NONE);
	};

	const handleCancel = () => {
		setGameBanner(GameBanner.NONE);
	};

	const handleProgress = (value: number) => {
		setProgressValue(value);
	};

	return (
		<>
			<UseCountdown interval={20} end={handleCancel} onTick={handleProgress} />
			<div className='fixed z-50 flex justify-center w-full h-full mt-6'>
				<div className='fixed w-11/12 border rounded bg-white '>
					<div className='flex justify-between p-4 items-center'>
						<div className='flex'>
							<BannerIcon />
							<BannerMessage message='yujelee 님이 게임 요청을 보냈어요!' />
						</div>
						<div className='flex items-center'>
							<YellowButtonXs message='승낙하기' onClick={handleMatch} />
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
