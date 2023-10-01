import ChatSidebarHeader from 'pages/chat/components/chat-sidebar-header';
import { useRecoilValue } from 'recoil';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const ChatSidebarChat = () => {
	const chat = useRecoilValue(chatSidebarState).chat;

	return (
		<div className='h-hull w-full'>
			<ChatSidebarHeader title='채널 정보' />
			<div className='grow'></div>
		</div>
	);
};

export default ChatSidebarChat;
