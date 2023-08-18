import { ChatroomType } from "../../../ts/enums/chatroom-type.enum"
import { Chatroom } from "../../../ts/interfaces/chatroom.model"

const ChatroomInfo = (chatroom: Chatroom) => {
	return (
		<div className="flex text-gray-600/80">
			<div className="mr-1">
				({chatroom.currentPeople}/{chatroom.maxPeople})
			</div>
			{chatroom.type === ChatroomType.PROTECTED ? null : "🔒"}
		</div>
	)
}

export default ChatroomInfo