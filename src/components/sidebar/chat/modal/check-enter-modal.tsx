import { Chatroom } from 'ts/interfaces/chatroom.model';
import { useRecoilState } from 'recoil';
import { chatState, chatroomState } from 'ts/states/chat-state';
import { ChatStatus } from 'ts/enums/chat-status.enum';

const CheckEnterModal = (props: { roomToEnter: Chatroom }) => {
	const [currChatroom, setCurrChatroom] = useRecoilState(chatroomState);
	const [currChat, setCurrChat] = useRecoilState(chatState);

	const title = '입장하시겠어요?';

	const onClickYes = () => {
		setCurrChatroom(props.roomToEnter);
		setCurrChat(ChatStatus.INCHAT);
	};

	// const onClickNo = () => {
	// }

	return (
		<dialog id='checkEnterModal' className='modal'>
			<form method='dialog' className='modal-box'>
				<h3>{title}</h3>
				<button onClick={onClickYes}>네</button>
				<button>아니요</button>
			</form>
			<form method='dialog' className='modal-backdrop'>
				<button></button>
			</form>
		</dialog>
	);
};

export default CheckEnterModal;
