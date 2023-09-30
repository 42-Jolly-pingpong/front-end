import { useSetRecoilState } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';
import { chatHeaderState } from 'ts/states/chat-header-state';
import { chatState } from 'ts/states/chat-state';

const changeChat = () => {
	const setChatState = useSetRecoilState(chatState);
	const setChatHeaderState = useSetRecoilState(chatHeaderState);

	const setChat = (chat: ChatRoom | Dm | null) => {
		setChatHeaderState(true);
		setChatState(chat);
	};

	return setChat;
};

export default changeChat;
