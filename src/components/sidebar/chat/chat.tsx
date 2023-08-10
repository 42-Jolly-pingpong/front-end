import ChatList from "./chat-list";
import OpenChatList from "./open-chat-list";

const Chat = (): JSX.Element => {

	return (
		<div>
			<ChatList />
			<OpenChatList />
		</div>
	);
}

export default Chat