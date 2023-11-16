import { BiX } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';

const ChatSidebarHeader = (props: { title: string }) => {
	const setChatSidebar = useSetRecoilState(chatSidebarState);

	const onClickClear = () => {
		setChatSidebar({
			status: ChatSidebarStatus.CLOSE,
			profile: null,
		});
	};

	return (
		<div className='flex justify-between items-center h-12 border-b'>
			<div className='ml-3 font-bold text-lg truncate'>{props.title}</div>
			<button className='mr-3' onClick={onClickClear}>
				<BiX size='28' />
			</button>
		</div>
	);
};

export default ChatSidebarHeader;
