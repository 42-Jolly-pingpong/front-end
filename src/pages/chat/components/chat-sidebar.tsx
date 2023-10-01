import { BiX } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const ChatSidebar = () => {
	const [chatSidebar, setChatSidebar] = useRecoilState(chatSidebarState);
	const chat = chatSidebar.chat;

	const onClickClear = () => {
		setChatSidebar({
			status: ChatSidebarStatus.CLOSE,
			chat: null,
			profile: null,
		});
	};

	return (
		<div className='max-h-screen chat-right-sidebar shadow-xl'>
			<div className='flex justify-between items-center h-12 border-b'>
				<div className='ml-3 font-bold'>{chat?.roomName}</div>
				<button className='mr-3' onClick={onClickClear}>
					<BiX size='28' />
				</button>
			</div>
			<div className='grow'></div>
		</div>
	);
};

export default ChatSidebar;
