import { atom, selector } from 'recoil';
import { GameBanner } from 'ts/enums/game/game-banner.enum';
import { GameMode } from 'ts/enums/game/game-mode.enum';

export type GameBannerType = {
	type: GameBanner;
	mode: GameMode;
};

export const gameBannerState = atom<GameBannerType>({
	key: 'gameBannerState',
	default: { type: GameBanner.NONE, mode: GameMode.CLASSIC },
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
