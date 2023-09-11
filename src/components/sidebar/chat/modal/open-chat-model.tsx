import { ChatroomType } from 'ts/enums/chatroom-type.enum';
import { Chatroom } from 'ts/interfaces/chatroom.model';
import CheckEnterForm from './check-enter-form';
import CheckPasswordForm from './check-password-form';

const OpenChatroomModal = (props: { roomToEnter: Chatroom }) => {
	return (
		<dialog id='checkEnterModal' className='modal'>
			{props.roomToEnter.type == ChatroomType.PUBLIC ? (
				<CheckEnterForm roomToEnter={props.roomToEnter} />
			) : (
				<CheckPasswordForm roomToEnter={props.roomToEnter} />
			)}
		</dialog>
	);
};

export default OpenChatroomModal;
