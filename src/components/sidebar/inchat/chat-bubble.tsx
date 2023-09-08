import { Chat } from 'ts/interfaces/chat.model';
import { tempUser1 } from '../temp-chat-user'; //임시
import Avatar from 'components/avatar/avatar';

const ChatContent = (chat: Chat) => {
	const user = chat.user;
	return (
		<>
			<div className='chat-header'>
				<time className='text-xs opacity-50 ml-1'>
					{chat.sentTime.getHours()} : {chat.sentTime.getMinutes()}
				</time>
			</div>
			<div className='chat-bubble'>{chat.content}</div>
		</>
	);
};

const ChatContentFromOther = (chat: Chat) => {
	const user = chat.user;
	return (
		<>
			<div className='chat-image avatar'>
				<Avatar user={user} size={10} />
			</div>
			<div className='chat-header'>
				{user.nickname}
				<time className='text-xs opacity-50 ml-1'>
					{chat.sentTime.getHours()} : {chat.sentTime.getMinutes()}
				</time>
			</div>
			<div className='chat-bubble'>{chat.content}</div>
		</>
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
			<ChatContentFromOther {...chat} />
		</div>
	);
};

export default ChatBubble;
