import ChatField from 'pages/chat/components/field/chat-field';
import ChatHeader from 'pages/chat/components/header/chat-header';
import { ChatInput } from 'pages/chat/components/chat-input';

const ChatContent = (props: { hasChatSidebar: boolean }) => {
	const width = () => {
		return props.hasChatSidebar ? 'chat-content-sidebar' : 'chat-content';
	};

	return (
		<div className={`flex flex-col justify-between max-h-screen ${width()}`}>
			<ChatHeader />
			<ChatField />
			<ChatInput />
		</div>
	);
};

export default ChatContent;
