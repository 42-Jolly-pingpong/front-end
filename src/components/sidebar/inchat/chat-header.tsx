import { ChatStatus } from "../../../ts/enums/chat-status.enum";
import { Chatroom } from "../../../ts/interfaces/chatroom.model";
import { chatState, chatroomState } from "../../../ts/states/chat-state";
import ChatroomInfo from "../chat/chatroom-info";
import { useRecoilState } from 'recoil';

const ChatHeader = (chatroom: Chatroom) => {
	const [currChatroom, setCurrChatroom] = useRecoilState(chatroomState);
	const [currChat, setCurrChat] = useRecoilState(chatState);

	const onClickReturnButton = () => {
		setCurrChatroom(null);
		setCurrChat(ChatStatus.CHATLIST);
	}

	return (
		<div className="flex mb-3">
			<button onClick={onClickReturnButton}>{"<"}</button>
			<div className="ml-3 mr-2">{chatroom.title}</div>
			<ChatroomInfo {...chatroom}/>
		</div>
	);
}

export default ChatHeader