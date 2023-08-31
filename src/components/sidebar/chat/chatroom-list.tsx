import ChatMenu from './chat-menu';
import JoinedChatroomList from './joined-chatroom-list';
import OpenChatroomList from './open-chatroom-list';

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
