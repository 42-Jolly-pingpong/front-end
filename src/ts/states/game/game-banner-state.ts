import { atom, selector } from 'recoil';
import { GameBanner } from 'ts/enums/game/game-banner.enum';

export const gameBannerState = atom<GameBanner>({
	key: 'gameBannerState',
	default: GameBanner.GAMEREQUEST,
});

export const gameBannerSelector = selector({
	key: 'gameBannerSelector',
	get: ({ get }) => {
		const state = get(gameBannerState);
		return state;
	},
	set: ({ set }, value) => {
		set(gameBannerState, value);
	},
});
