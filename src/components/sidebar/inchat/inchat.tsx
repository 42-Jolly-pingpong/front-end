import { Chatroom } from "../../../ts/interfaces/chatroom.model copy";
import ChatHeader from "./chat-header";
import ChatTextfield from "./chat-textfield";

const InChat = (chatroom: Chatroom) => {
	return (
		<div className="flex flex-col h-full">
			<ChatHeader {...chatroom}/>
			<div className="flex-1 overflow-y-auto"></div>
			<ChatTextfield/>
		</div>
	);
}

export default InChat