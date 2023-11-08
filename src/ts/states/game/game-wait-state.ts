import { DefaultValue, atom, selector } from 'recoil';
import { GameMode } from 'ts/enums/game/game-mode.enum';
import { GameModalStatus } from 'ts/enums/game/game-wait.enum';

export type GameModalType = {
	status: GameModalStatus;
	mode: GameMode;
	invite: boolean;
	show: boolean;
	// 추후 유저 관련해서도 여기 들어올듯.
};

export const gameModalState = atom<GameModalType>({
	key: 'GameModalState',
	default: {
		status: GameModalStatus.NONE,
		mode: GameMode.NORMAL,
		invite: false,
		show: true,
	},
});

export const gameModalShowSelector = selector<boolean>({
	key: 'GameModalShowSelector',
	get: ({ get }) => {
		const gameModal = get(gameModalState);
		return gameModal.show;
	},
	set: ({ set, get }, newValue) => {
		set(gameModalState, newValue instanceof DefaultValue ? newValue : newValue / 100),
		if (newValue instanceof DefaultValue) {
			set(gameModalState, newValue);
		} else {
			set(gameModalState);
		}
	},
});

export const modalSelector = selector<GameModalType>({
	key: 'ModalSelector',
	get: ({ get }) => {
		const gameModal = get(gameModalState);
		return gameModal;
	},
	set: ({ set }, newValue) => {
		if (newValue instanceof DefaultValue) {
			set(gameModalState, newValue);
		} else {
			set(gameModalState, newValue);
		}
	},
});
