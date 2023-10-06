import { useSetRecoilState } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { User } from 'ts/interfaces/user.model';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const useChangeSidebar = (state: string) => {
	const setChatSidebarState = useSetRecoilState(chatSidebarState);

	const setSidebarProfile = (profile: User | null) => {
		setChatSidebarState({
			status: ChatSidebarStatus.PROFILE,
			profile: profile as User,
		});
	};

	const setSidebarChat = (profile: User | null) => {
		setChatSidebarState({
			status: ChatSidebarStatus.CHAT,
			profile: profile,
		});
	};

	if (state === 'profile') {
		return setSidebarProfile;
	}
	return setSidebarChat;
};

export default useChangeSidebar;
