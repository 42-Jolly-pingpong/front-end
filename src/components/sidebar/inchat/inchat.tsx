import ChatHeader from './chat-header';
import { useRecoilValue } from 'recoil';
import ChatTextfield from './chat-textfield';
import { chatroomSelector } from '../../../ts/states/chat-state';
import { Chat } from '../../../ts/interfaces/chat.model';
import ChatBubble from './chat-bubble';
import { tempChats1 } from '../temp-chat-user';

const InChat = () => {
	const chatroom = useRecoilValue(chatroomSelector);
	if (!chatroom) {
		return null;
	}

	// 대화 내용 불러오기 chatroom정보 이용해서
	if (!tempChats1) {
		return (
			<div className='flex flex-col h-full p-3'>
				<ChatHeader {...chatroom} />
				<div className='flex-1 overflow-y-auto'></div>
				<ChatTextfield />
			</div>
		);
	}
	const chats: Chat[] = tempChats1;

	return (
		<div className='flex flex-col h-full p-3'>
			<ChatHeader {...chatroom} />
			<div className='flex flex-col overflow-y max-h-full p-1'>
				{chats.map((chat, id) => (
					<ChatBubble key={id} {...chat} />
				))}
			</div>
			<ChatTextfield />
		</div>
	);
};

export default InChat;
