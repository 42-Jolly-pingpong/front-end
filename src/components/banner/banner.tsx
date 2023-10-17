import { useRecoilValue } from 'recoil';
import NoMatchBanner from 'components/banner/no-match-banner';
import GameRequestBanner from 'components/banner/game-request-banner';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';

const Banner = () => {
	const banner = useRecoilValue(gameBannerState);

	switch (banner.banner) {
		case GameBanner.GAMEREQUEST:
			return <GameRequestBanner />;
		case GameBanner.NOMATCH:
			return <NoMatchBanner />;
		default:
			return null;
	}
};

export default Banner;
