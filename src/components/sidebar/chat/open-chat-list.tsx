import ChatElement from "./chatroom-element";
import { tempChatroom1, tempChatroom2 } from "../temp-chat-user";

const OpenChatList = () => {
	return (
		<div className="collapse collapse-arrow">
			<input type="checkbox"/> 
			<div className="collapse-title text-xl">
				open chat
			</div> 
			<div className="collapse-content overflow-y-auto"> 
				<ChatElement chatroom={tempChatroom1}/>
				<ChatElement chatroom={tempChatroom1}/>
				<ChatElement chatroom={tempChatroom2}/>
			</div>
		</div>
	);
}

export default OpenChatList