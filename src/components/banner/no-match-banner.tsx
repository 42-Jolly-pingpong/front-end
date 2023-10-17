import { useRecoilState } from 'recoil';
import BannerIcon from 'components/banner/item/banner-icon';
import CancelButtonXs from 'components/button/cancel-button-xs';
import YellowButtonXs from 'components/button/yellow-button-xs';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { NO_MATCH_MSG, RE_WAIT_MSG } from 'constants/messages';
import BannerMessage from 'components/banner/item/banner-message';

const NoMatchBanner = () => {
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState);

	const handleReMatch = () => {
		setGameBanner({ ...gameBanner, banner: GameBanner.NONE });
		// 모달 띄우기
	};

	const handleCancel = () => {
		setGameBanner({ ...gameBanner, banner: GameBanner.NONE });
	};

	return (
		<>
			<div className='fixed z-50 flex justify-center w-full h-full mt-6'>
				<div className='fixed w-11/12 border rounded bg-white '>
					<div className='flex justify-between p-4 items-center'>
						<div className='flex'>
							<BannerIcon />
							<BannerMessage message={NO_MATCH_MSG} />
						</div>
						<div className='flex items-center'>
							<YellowButtonXs onClick={handleReMatch}>
								{RE_WAIT_MSG}
							</YellowButtonXs>
							<CancelButtonXs onClick={handleCancel} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NoMatchBanner;
