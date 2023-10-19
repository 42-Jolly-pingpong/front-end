import { atom, selector } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';

export type ChatListType = { channelList: ChatRoom[]; dmList: Dm[] };

export const chatListState = atom<ChatListType>({
	key: 'chatListState',
	default: { channelList: [], dmList: [] },
});

export const chatListSelector = selector({
	key: 'chatListSelector',
	get: ({ get }) => {
		const state = get(chatListState);

		return state;
	},
});
