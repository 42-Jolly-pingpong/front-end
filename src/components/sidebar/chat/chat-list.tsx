import { useState } from "react";
import ChatElement from "./chatroom-element";
import { tempChatroom1, tempChatroom2 } from "../temp-chat-user";

const ChatList = () => {
	//챗 리스트 가져오기
	const [isChecked, setIsChecked] = useState(true);

	const onClickCheckbox = () => {
		setIsChecked((prev) => prev? false : true)
	}

	return (
		<div className="collapse">
			<input type="checkbox" checked={isChecked} onClick={onClickCheckbox}/> 
			<div className="collapse-title text-xl">
				chat
			</div> 
			<div className="collapse-content overflow-y-auto"> 
				<ChatElement chatroom={tempChatroom1}/>
				<ChatElement chatroom={tempChatroom1}/>
				<ChatElement chatroom={tempChatroom2}/>
			</div>
		</div>
	);
}

export default ChatList