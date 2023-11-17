import YellowButton from 'components/button/yellow-button';
import BannerIcon from './item/banner-icon';
import BannerMessage from './item/banner-message';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { gameBannerState } from 'ts/states/game/game-banner-state';
import { GameBanner } from 'ts/enums/game/game-banner.enum';

const InviteCancelBanner = () => {
	const [gameBanner, setGameBanner] = useRecoilState(gameBannerState);

	const onclick = () => {
		setGameBanner({ ...gameBanner, type: GameBanner.NONE });
	};

	return (
		<div className='fixed z-50 flex justify-center w-full mt-6'>
			<div className='fixed w-11/12 border rounded bg-white '>
				<div className='flex justify-between p-4 items-center'>
					<div className='flex'>
						<BannerIcon />
						<BannerMessage message='만료된 요청입니다.' />
					</div>
					<div className='flex items-center'>
						<YellowButton size='xs' onClick={onclick}>
							확인
						</YellowButton>
						<div className='mr-4' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default InviteCancelBanner;
