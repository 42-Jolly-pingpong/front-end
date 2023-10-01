import { atom, selector } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { User } from 'ts/interfaces/user.model';

export type ChatSidebarType = {
	status: ChatSidebarStatus;
	chat: ChatRoom | null;
	profile: User | null;
};

export const chatSidebarState = atom<ChatSidebarType>({
	key: 'chatSidebarState',
	default: { status: ChatSidebarStatus.CLOSE, chat: null, profile: null },
});

export const chatModalSelector = selector({
	key: 'chatSidebarSelector',
	get: ({ get }) => {
		const state = get(chatSidebarState);

		return state;
	},
});
