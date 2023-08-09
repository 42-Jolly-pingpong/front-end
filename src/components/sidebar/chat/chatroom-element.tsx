import { ChatroomType } from "../../../ts/enum/chatroom-type.enum";
import { Chatroom } from "../../../ts/interfaces/chatroom.model copy";
import { User } from "../../../ts/interfaces/userr.model";

export type ChatroomElementProps = {
	src: string;
	title: string;
}
// props -> chat entity로 수정

const ChatroomElement = (props: {chatroom: Chatroom}) => {
	const chatroom: Chatroom = props.chatroom;
	const user: User = chatroom.user;

	// const onClickChatroom = () => {
		
	// }

	return (
		<div className="flex items-center m-1 justify-between" >
			<div className="flex items-center justify-start">
				<img src={user.avatar} className="rounded-full layout-icon w-12 h-12 mr-3"/>
				{chatroom.title}
				{chatroom.type === ChatroomType.PROTECTED ? null : "🔒"}
			</div>
		</div>
	);
}

export default ChatroomElement