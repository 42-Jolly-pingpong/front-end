import { atom, selector } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';

export const chatState = atom<ChatRoom | Dm | null>({
	key: 'chatState',
	default: null,
});

export const chatSelector = selector({
	key: 'chatSelector',
	get: ({ get }) => {
		const state = get(chatState);

		return state;
	},
});
