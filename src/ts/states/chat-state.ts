import { atom, selector } from 'recoil';
import { Chatroom } from 'ts/interfaces/chat-room.model';
import { ChatStatus } from 'ts/enums/chat-status.enum';

export const chatState = atom({
	key: 'chatState',
	default: ChatStatus.CHATLIST,
});

export const chatStatusSelector = selector({
	key: 'chatStatusSelector',
	get: ({ get }) => {
		const state = get(chatState);

		return state;
	},
});

export const chatroomState = atom({
	key: 'chatroomState',
	default: null as Chatroom | null,
});

export const chatroomSelector = selector({
	key: 'chatroomSelector',
	get: ({ get }) => {
		const state = get(chatroomState);

		return state;
	},
});
