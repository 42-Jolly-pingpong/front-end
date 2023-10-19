import { useRecoilValue } from 'recoil';
import NoMatchBanner from 'components/banner/no-match-banner';
import GameRequestBanner from 'components/banner/game-request-banner';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { gameBannerState } from 'ts/states/game/game-banner-state';

/**
 * 소켓 통신 중 헤더 위에 띄워질 Banner 입니다.
 *
 * 관련 파일
 * 	enum : src/ts/enums/game/game-banner.enum.ts
 * 	state: src/ts/states/game/game-banner-state.ts
 *
 */
const Banner = () => {
	const banner = useRecoilValue(gameBannerState);

	switch (banner.banner) {
		case GameBanner.GAMEREQUEST: // 게임 request가 왔을 때
			return <GameRequestBanner />;
		case GameBanner.NOMATCH: // 게임 matching에 실패했을 때
			return <NoMatchBanner />;
		default:
			return null;
	}
};

export default Banner;
