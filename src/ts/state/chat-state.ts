import { atom, useRecoilTransaction_UNSTABLE, selector } from 'recoil';
import { Chatroom } from '../interfaces/chatroom.model';
import { ChatStatus } from '../enum/chat-status.enum';

export const chatState = atom({
	key: "chatState",
	default: ChatStatus.CHATLIST,
});

export const chatStatusSelector = selector({
	key: "chatStatusSelector",
	get: ({get}) => {
		const state = get(chatState);

		return state;
	}
})

export const chatroomState = atom({
	key: "chatroomState",
	default: null as Chatroom | null,
});

export const chatroomSelector = selector({
	key: "chatroomSelector",
	get: ({get}) => {
		const state = get(chatroomState);

		return state;
	}
})
