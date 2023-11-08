import { atom, selector } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import User from 'ts/interfaces/user.model';

export type ChatSidebarType = {
	status: ChatSidebarStatus;
	profile: User | null;
};

export const chatSidebarState = atom<ChatSidebarType>({
	key: 'chatSidebarState',
	default: { status: ChatSidebarStatus.CLOSE, profile: null },
});

export const chatModalSelector = selector({
	key: 'chatSidebarSelector',
	get: ({ get }) => {
		const state = get(chatSidebarState);

		return state;
	},
});
