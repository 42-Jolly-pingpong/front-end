import { useState } from "react";
import ChatElement from "./chatroom-element";
import { tempChatroom1, tempChatroom2 } from "../temp-chat-user";
import { Chatroom } from "../../../ts/interfaces/chatroom.model";

const JoinedChatroomList = () => {
	//챗 리스트 가져오기
	const chatList: Chatroom[] = [tempChatroom1, tempChatroom2];
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => !prev);
	}

	return (
		<div className="collapse">
			<input type="checkbox" checked={isChecked} onChange={onClickCheckbox}/> 
			<div className="collapse-title text-xl">
				chat
			</div> 
			<div className="collapse-content overflow-y-auto">
				{
					chatList.map((chat, id) => (
						<ChatElement chatroom={chat} key={id}/>
					))
				}
			</div>
		</div>
	);
}

export default JoinedChatroomList