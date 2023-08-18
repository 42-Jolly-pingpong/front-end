import ChatElement from "./chatroom-element";
import { tempChatroom1, tempChatroom2 } from "../temp-chat-user";
import { Chatroom } from "../../../ts/interfaces/chatroom.model";

const OpenChatroomList = () => {
	// openchat list 얻어오기
	const openChatList: Chatroom[] = [tempChatroom1, tempChatroom2]; //temp

	return (
		<div className="collapse collapse-arrow">
			<input type="checkbox"/> 
			<div className="collapse-title text-xl">
				open chat
			</div> 
			<div className="collapse-content overflow-y-auto"> 
				{
					openChatList.map((chat, id) => (
						<ChatElement {...chat} key={id}/>
					))
				}
			</div>
		</div>
	);
}

export default OpenChatroomList