import ChatSidebarChat from 'pages/chat/components/sidebar/chat-sidebar-chat';
import ChatSidebarProfile from 'pages/chat/components/sidebar/profile/chat-sidebar-profile';
import { useRecoilValue } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const ChatSidebar = () => {
	const chatSidebarStatus = useRecoilValue(chatSidebarState).status;

	return (
		<aside
			className={`fixed top-0 right-0 z-40 w-[346px] h-full transition-transform sm:translate-x-0 shadow-2xl bg-white ${
				chatSidebarStatus != ChatSidebarStatus.CLOSE ? 'visible' : 'invisible'
			}`}
		>
			{chatSidebarStatus == ChatSidebarStatus.CHAT && <ChatSidebarChat />}
			{chatSidebarStatus == ChatSidebarStatus.PROFILE && <ChatSidebarProfile />}
		</aside>
	);
};

export default ChatSidebar;
