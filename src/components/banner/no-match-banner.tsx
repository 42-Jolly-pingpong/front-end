import { useRecoilState } from 'recoil';
import BannerIcon from 'components/banner/item/banner-icon';
import BannerMessage from 'components/banner/item/banner-message';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { gameWaitState } from 'ts/states/game/game-wait-state';
import { GameWaitStatus } from 'ts/enums/game/game-wait.enum';
import { NO_MATCH_MSG } from 'constants/messages';
import YellowButton from 'components/button/yellow-button';
import CancelButton from 'components/button/cancel-button';

const NoMatchBanner = () => {
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState);
	const [gameWait, setGameWait] = useRecoilState(gameWaitState);

	const handleReMatch = () => {
		setGameBanner({ ...gameBanner, type: GameBanner.NONE });
		setGameWait({ ...gameWait, status: GameWaitStatus.SEARCH });
	};

	const handleCancel = () => {
		setGameBanner({ ...gameBanner, type: GameBanner.NONE });
	};

	return (
		<>
			<div className='fixed z-50 flex justify-center w-full mt-6'>
				<div className='fixed w-11/12 border rounded bg-white '>
					<div className='flex justify-between p-4 items-center'>
						<div className='flex'>
							<BannerIcon />
							<BannerMessage message={NO_MATCH_MSG} />
						</div>
						<div className='flex items-center'>
							<YellowButton size='xs' onClick={handleReMatch}>
								다시 기다리기
							</YellowButton>
							<CancelButton size='xs' onClick={handleCancel} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NoMatchBanner;
