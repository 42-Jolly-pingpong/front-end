import ChatroomList from "./chatroom-list";
import OpenChatroomList from "./open-chatroom-list";

const Chat = (): JSX.Element => {

	return (
		<div>
			<ChatroomList />
			<OpenChatroomList />
		</div>
	);
}

export default Chat