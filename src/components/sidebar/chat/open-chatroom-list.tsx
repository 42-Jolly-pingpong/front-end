import { tempChatroom1, tempChatroom2 } from "../temp-chat-user";
import { Chatroom } from "../../../ts/interfaces/chatroom.model";
import CheckPasswordModal from "./check-password/check-password-modal";
import { useState } from "react";
import ChatroomElement from "./chatroom-element";

const OpenChatroomList = () => {
	// openchat list 얻어오기
	const openChatList: Chatroom[] = [tempChatroom1, tempChatroom2]; //temp

	const [roomToEnter, setRoomToEnter] = useState<Chatroom>(openChatList[0]);

	return (
		<div className="collapse collapse-arrow">
			<input type="checkbox"/> 
			<div className="collapse-title text-xl">
				open chat
			</div> 
			<div className="collapse-content overflow-y-auto"> 
				{
					openChatList.map((chatroom, id) => (
						<ChatroomElement chatroom={chatroom} isOpened={true} key={id} setRoomToEnter={setRoomToEnter}/>
					))
				}
			</div>
			<CheckPasswordModal roomToEnter={roomToEnter}/>
		</div>
	);
}

export default OpenChatroomList