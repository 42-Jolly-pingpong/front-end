import ChatField from 'pages/chat/components/field/chat-field';
import ChatHeader from 'pages/chat/components/header/chat-header';
import { ChatInput } from 'pages/chat/components/chat-input';

const ChatContent = () => {
	return (
		<div className={`w-full flex flex-col justify-between`}>
			<ChatHeader />
			<ChatField />
			<ChatInput />
		</div>
	);
};

export default ChatContent;
