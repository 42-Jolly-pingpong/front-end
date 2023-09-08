import { Chat } from 'ts/interfaces/chat.model';
import { tempUser1 } from '../temp-chat-user'; //임시
import Avatar from 'components/avatar/avatar';

const ChatContent = (chat: Chat) => {
	const user = chat.user;
	return (
		<div>
			<Avatar user={user} />
			<div className='chat-header'>
				{user.nickname}
				<time className='text-xs opacity-50'>
					{chat.sentTime.getHours()} : {chat.sentTime.getMinutes()}
				</time>
			</div>
			<div className='chat-bubble'>{chat.content}</div>
		</div>
	);
};

const ChatBubble = (chat: Chat) => {
	const me = tempUser1; //임시

	if (me.idx === chat.user.idx) {
		return (
			<div className='chat chat-end'>
				<ChatContent {...chat} />
			</div>
		);
	}
	return (
		<div className='chat chat-start'>
			<ChatContent {...chat} />
		</div>
	);
};

export default ChatBubble;
