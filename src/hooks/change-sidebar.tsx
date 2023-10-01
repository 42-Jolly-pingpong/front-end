import { useSetRecoilState } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { Chat } from 'ts/interfaces/chat.model';
import { User } from 'ts/interfaces/user.model';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const changeSidebar = (state: string) => {
	const setChatSidebarState = useSetRecoilState(chatSidebarState);

	const setSidebarProfile = (profile: User) => {
		setChatSidebarState({
			status: ChatSidebarStatus.PROFILE,
			profile,
			chat: null,
		});
	};

	const setSidebarChat = (chat: Chat) => {
		setChatSidebarState({
			status: ChatSidebarStatus.PROFILE,
			profile: null,
			chat,
		});
	};

	if (state === 'profile') {
		return setSidebarProfile;
	}
	return setSidebarChat;
};

export default changeSidebar;
