import ChatField from 'pages/chat/components/chat-field';
import ChatHeader from 'pages/chat/components/chat-header';

const ChatContent = () => {
	return (
		<div className='flex flex-col justify-between max-h-screen'>
			<ChatHeader />
			<ChatField />
			<div>footer</div>
			{/* <ChatInput /> */}
		</div>
	);
};

export default ChatContent;
