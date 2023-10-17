import { useSetRecoilState } from 'recoil';
import { gameBannerState } from 'ts/states/game/game-banner-state';

const NoMatchBanner = () => {
	const setGameBanner = useSetRecoilState(gameBannerState);

	return <div>뭐 노매치~</div>;
};

export default NoMatchBanner;
