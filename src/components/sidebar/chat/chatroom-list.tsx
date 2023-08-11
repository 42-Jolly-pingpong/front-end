import JoinedChatroomList from "./joined-chatroom-list";
import OpenChatroomList from "./open-chatroom-list";

const ChatroomList = () => {
	return (
		<div>
			<JoinedChatroomList />
			<OpenChatroomList />
		</div>
	);
}

export default ChatroomList