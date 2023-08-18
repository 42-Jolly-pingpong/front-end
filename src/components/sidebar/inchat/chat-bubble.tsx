import { Chat } from "../../../ts/interfaces/chat.model";
import { tempUser1 } from "../temp-chat-user";

const ChatContent = (chat: Chat) => {
	const user = chat.user;
	return (
		<div>	
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img src={user.avatar} />
				</div>
			</div>
			<div className="chat-header">
				{user.nickname}
				<time className="text-xs opacity-50">
					{chat.sentTime}
				</time>
			</div>
			<div className="chat-bubble">{chat.content}</div>
		</div>
	);
}

const ChatBubble = (chat: Chat) => {
	const me = tempUser1; //임시

	if (me.id === chat.user.id){
		return (
			<div className="chat chat-end">
				<ChatContent {...chat} />	
			</div>
		);
	}
	return (
		<div className="chat chat-start">
			<ChatContent {...chat} />	
		</div>
	);
}

export default ChatBubble