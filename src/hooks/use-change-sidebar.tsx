import { useSetRecoilState } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { User } from 'ts/interfaces/user.model';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const useChangeSidebar = (state: string) => {
	const setChatSidebarState = useSetRecoilState(chatSidebarState);

	const setSidebarProfile = (profile: User | ChatRoom) => {
		setChatSidebarState({
			status: ChatSidebarStatus.PROFILE,
			profile: profile as User,
			chat: null,
		});
	};

	const setSidebarChat = (chat: ChatRoom | User) => {
		setChatSidebarState({
			status: ChatSidebarStatus.CHAT,
			profile: null,
			chat: chat as ChatRoom,
		});
	};

	if (state === 'profile') {
		return setSidebarProfile;
	}
	return setSidebarChat;
};

export default useChangeSidebar;