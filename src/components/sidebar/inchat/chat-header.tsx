import { Chatroom } from "../../../ts/interfaces/chatroom.model copy";
import ChatroomInfo from "../chat/chatroom-info";

const ChatHeader = (chatroom: Chatroom) => {
	return (
	<div className="flex">
		<button>{"<"}</button>
		<div className="ml-3 mr-2">{chatroom.title}</div>
		<ChatroomInfo {...chatroom}/>
	</div>
	);
}

export default ChatHeader