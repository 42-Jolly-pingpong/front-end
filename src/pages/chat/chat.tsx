import ChatList from 'pages/chat/components/chat-list';
import ChannelModal from 'pages/chat/components/modal/channel-modal';

const Chat = () => {
	return (
		<>
			<div className='flex max-h-screen max-w-screen'>
				<ChatList />
			</div>
			<ChannelModal />
		</>
	);
};

export default Chat;
