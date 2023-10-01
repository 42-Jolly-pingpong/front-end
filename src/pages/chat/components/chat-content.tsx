import ChatField from 'pages/chat/components/chat-field';
import ChatHeader from 'pages/chat/components/chat-header';
import { ChatInput } from 'pages/chat/components/chat-input';

const ChatContent = () => {
	return (
		<div className='flex flex-col justify-between max-h-screen chat-content'>
			<ChatHeader />
			<ChatField />
			<ChatInput />
		</div>
	);
};

export default ChatContent;
