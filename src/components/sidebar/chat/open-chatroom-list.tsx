import { tempChatroom1, tempChatroom2 } from '../temp-chat-user'; // 임시
import { useState } from 'react';
import { Chatroom } from 'ts/interfaces/chatroom.model';
import ChatroomElement from 'components/sidebar/chat/chatroom-element';
import CheckPasswordModal from 'components/sidebar/chat/modal/check-password-modal';
import CheckEnterModal from 'components/sidebar/chat/modal/check-enter-modal';

const OpenChatroomList = () => {
	// openchat list 얻어오기
	const openChatList: Chatroom[] = [tempChatroom1, tempChatroom2]; //temp

	const [roomToEnter, setRoomToEnter] = useState<Chatroom>(openChatList[0]);

	return (
		<div className='collapse collapse-arrow'>
			<input type='checkbox' />
			<div className='collapse-title text-xl'>open chat</div>
			<div className='collapse-content overflow-y-auto'>
				{openChatList.map((chatroom, id) => (
					<ChatroomElement
						chatroom={chatroom}
						isOpened={true}
						key={id}
						roomToEnter={roomToEnter}
						setRoomToEnter={setRoomToEnter}
					/>
				))}
			</div>
			<CheckPasswordModal roomToEnter={roomToEnter} />
			<CheckEnterModal roomToEnter={roomToEnter} />
		</div>
	);
};

export default OpenChatroomList;
