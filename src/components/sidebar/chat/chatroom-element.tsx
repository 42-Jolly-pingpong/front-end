import { Chatroom } from "../../../ts/interfaces/chatroom.model copy";
import ChatroomInfo from "./chatroom-info";

const ChatroomElement = (chatroom: Chatroom) => {
	const owner = chatroom.user[0]; // 임시
	// const onClickChatroom = () => {
		
	// }

	return (
		<div className="flex items-center m-1 justify-between" >
			<div className="flex items-center justify-start">
				<img src={owner.avatar} className="rounded-full layout-icon w-12 h-12 mr-3"/>
				<div className="mr-2">
					{chatroom.title}
				</div>
				<ChatroomInfo {... chatroom}/>
			</div>
		</div>
	);
}

export default ChatroomElement