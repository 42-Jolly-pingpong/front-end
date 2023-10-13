import { atom, selector } from 'recoil';
import { ChatModalStatus } from 'ts/enums/chat-modal-status.enum';

export const chatModalState = atom({
	key: 'chatModalState',
	default: ChatModalStatus.CLOSE,
});

export const chatModalSelector = selector({
	key: 'chatModalSelector',
	get: ({ get }) => {
		const state = get(chatModalState);

		return state;
	},
});
