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
		show: false,
	},
});

export const gameModalSelector = selector<GameModalType>({
	key: 'GameModalSelector',
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

export const gameModalShowSelector = selector<boolean>({
	key: 'GameModalShowSelector',
	get: ({ get }) => {
		const gameModal = get(gameModalState);
		return gameModal.show;
	},
	set: ({ set }, newValue) => {
		console.log(newValue);
		if (newValue instanceof DefaultValue) {
			// If you want to reset to the default value, you can do that here
			set(gameModalState, (prevValue) => ({
				...prevValue,
				show: true, // Set it to the default value
			}));
		} else {
			// Toggle the 'show' property
			set(gameModalState, (prevValue) => ({
				...prevValue,
				show: !prevValue.show,
			}));
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
