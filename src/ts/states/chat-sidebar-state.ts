import { atom, selector } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { Chat } from 'ts/interfaces/chat.model';
import { User } from 'ts/interfaces/user.model';

type ChatSidebarType = {
	status: ChatSidebarStatus;
	chat: Chat | null;
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
