import ChatContent from 'pages/chat/chat-content';
import ChatList from 'pages/chat/components/chat-list';

const Chat = () => {
	return (
		<div className='flex'>
			<div className='flex max-h-screen max-w-screen'>
				<ChatList />
				<ChatContent />
				<ChannelModal />
			</div>
		</div>
	);
};

export default Chat;
