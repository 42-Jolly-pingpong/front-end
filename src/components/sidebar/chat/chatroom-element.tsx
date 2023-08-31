import { ChatStatus } from 'ts/enums/chat-status.enum';
import { Chatroom } from 'ts/interfaces/chatroom.model';
import { chatState, chatroomState } from 'ts/states/chat-state';
import { useRecoilState } from 'recoil';
import ChatroomInfo from 'components/sidebar/chat/chatroom-info';
import { ChatroomType } from 'ts/enums/chatroom-type.enum';

type ChatroomElementProps = {
	chatroom: Chatroom;
	isOpened?: boolean;
	roomToEnter?: Chatroom;
	setRoomToEnter?: React.Dispatch<React.SetStateAction<Chatroom>>;
};

const ChatroomElement = (props: ChatroomElementProps) => {
	const [currChatroom, setCurrChatroom] = useRecoilState(chatroomState);
	const [currChat, setCurrChat] = useRecoilState(chatState);

	const { chatroom, isOpened, roomToEnter, setRoomToEnter } = props;
	const owner = chatroom.owner; // 임시

	const onClickChatroom = () => {
		if (isOpened && setRoomToEnter != undefined) {
			// 유저가 채팅방에 들어가있는 지 확인.
			setRoomToEnter(chatroom);
			if (roomToEnter?.type === ChatroomType.PROTECTED) {
				window.checkPasswordModal.showModal();
				return;
			}
			window.checkEnterModal.showModal();
			return;
		}
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
						src={owner.avatarPath}
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
