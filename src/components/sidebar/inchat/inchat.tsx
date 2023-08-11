import ChatHeader from "./chat-header";
import { useRecoilValue } from 'recoil';
import ChatTextfield from "./chat-textfield";
import { chatroomSelector } from "../../../ts/state/chat-state";

const InChat = () => {
	const chatroom = useRecoilValue(chatroomSelector);
	if (!chatroom) {
		return null;
	}

	return (
		<div className="flex flex-col h-full">
			<ChatHeader {...chatroom}/>
			<div className="flex-1 overflow-y-auto"></div>
			<ChatTextfield/>
		</div>
	);
}

export default InChat