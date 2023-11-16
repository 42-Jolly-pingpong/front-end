import { Sidebar } from 'flowbite-react';
import { BiPlus } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { chatHeaderState } from 'ts/states/chat-header-state';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { chatState } from 'ts/states/chat-state';

const CreateDm = () => {
	const setChatState = useSetRecoilState(chatState);
	const setChatHeaderState = useSetRecoilState(chatHeaderState);
	const setSidebarState = useSetRecoilState(chatSidebarState);

	const onClickCreate = () => {
		setChatState({ chatRoom: null, chats: [] });
		setChatHeaderState(false);
		setSidebarState({
			status: ChatSidebarStatus.CLOSE,
			profile: null,
		});
	};

	return (
		<Sidebar.Item onClick={onClickCreate}>
			<div className='flex items-center'>
				<BiPlus className='mr-2' size='20' />
				<div className='text-base font-medium'>대화상대 추가</div>
			</div>
		</Sidebar.Item>
	);
};

export default CreateDm;
