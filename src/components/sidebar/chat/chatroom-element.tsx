import { ChatStatus } from 'ts/enums/chat-status.enum';
import { Chatroom } from 'ts/interfaces/chatroom.model';
import { chatState, chatroomState } from 'ts/states/chat-state';
import { useRecoilState } from 'recoil';
import ChatroomInfo from 'components/sidebar/chat/chatroom-info';

const ChatroomElement = (chatroom: Chatroom) => {
	//const owner = chatroom.owner; // 임시
	const [currChatroom, setCurrChatroom] = useRecoilState(chatroomState);
	const [currChat, setCurrChat] = useRecoilState(chatState);

	const onClickChatroom = () => {
		setCurrChatroom(chatroom);
		setCurrChat(ChatStatus.INCHAT);
	};

	return (
		<div className='flex items-center m-1 justify-between'>
			<div className='flex items-center justify-start'>
				<div
					className='flex items-center justify-start'
					onClick={onClickChatroom}
				>
					<img
						//src={owner.avatarPath}
						className='rounded-full layout-icon w-12 h-12 mr-3'
					/>
					<div className='mr-2'>{chatroom.title}</div>
				</div>
				<ChatroomInfo {...chatroom} />
			</div>
		</div>
	);
};

export default ChatroomElement;
