import { atom, selector } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { Dm } from 'ts/interfaces/dm.model';

export type ChatFieldType = {
	chatRoom: ChatRoom | Dm | null;
	chats: Chat[];
};

export const chatState = atom<ChatFieldType>({
	key: 'chatState',
	default: { chatRoom: null, chats: [] },
});

export const chatSelector = selector({
	key: 'chatSelector',
	get: ({ get }) => {
		const state = get(chatState);

		return state;
	},
});
