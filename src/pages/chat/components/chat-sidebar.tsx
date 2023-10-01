import ChatSidebarChat from 'pages/chat/components/chat-sidebar-chat';
import ChatSidebarProfile from 'pages/chat/components/chat-sidebar-profile';
import { useRecoilValue } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const ChatSidebar = () => {
	const chatSidebarStatus = useRecoilValue(chatSidebarState).status;

	const sidebarContent = () => {
		switch (chatSidebarStatus) {
			case ChatSidebarStatus.CHAT:
				return <ChatSidebarChat />;
			case ChatSidebarStatus.PROFILE:
				return <ChatSidebarProfile />;
			default:
				return null;
		}
	};

	return (
		<div className='max-h-screen chat-right-sidebar shadow-xl'>
			{sidebarContent()}
		</div>
	);
};

export default ChatSidebar;
