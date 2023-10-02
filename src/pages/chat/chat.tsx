import ChatContent from 'pages/chat/components/chat-content';
import ChatList from 'pages/chat/components/list/chat-list';
import ChatSidebar from 'pages/chat/components/sidebar/chat-sidebar';
import ChannelModal from 'pages/chat/components/modal/channel-modal';
import { useRecoilValue } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const Chat = () => {
	const hasChatSidebar =
		useRecoilValue(chatSidebarState).status !== ChatSidebarStatus.CLOSE;

	return (
		<div className='flex'>
			<div className='flex max-h-screen max-w-screen'>
				<ChatList />
				<ChatContent hasChatSidebar={hasChatSidebar} />
				{hasChatSidebar && <ChatSidebar />}
				<ChannelModal />
			</div>
		</div>
	);
};

export default Chat;
