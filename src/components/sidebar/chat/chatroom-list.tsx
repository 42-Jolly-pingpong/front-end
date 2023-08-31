import ChatMenu from 'components/sidebar/chat/chat-menu';
import JoinedChatroomList from 'components/sidebar/chat/joined-chatroom-list';
import OpenChatroomList from 'components/sidebar/chat/open-chatroom-list';

const ChatroomList = () => {
	return (
		<div className='flex flex-col h-full justify-between'>
			<div>
				<JoinedChatroomList />
				<OpenChatroomList />
			</div>
			<ChatMenu />
		</div>
	);
};

export default ChatroomList;
