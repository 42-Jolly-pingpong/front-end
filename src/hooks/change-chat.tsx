import { useSetRecoilState } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';
import { chatHeaderState } from 'ts/states/chat-header-state';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { chatState } from 'ts/states/chat-state';

const changeChat = () => {
	const setChatState = useSetRecoilState(chatState);
	const setChatHeaderState = useSetRecoilState(chatHeaderState);
	const setSidebarState = useSetRecoilState(chatSidebarState);

	const setChat = (chat: ChatRoom | Dm | null) => {
		setChatHeaderState(true);
		setChatState(chat);
		setSidebarState({
			status: ChatSidebarStatus.CLOSE,
			chat: null,
			profile: null,
		});
	};

	return setChat;
};

export default changeChat;
