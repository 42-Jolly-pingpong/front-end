import { tempChatroom1, tempChatroom2 } from '../temp-chat-user'; // 임시
import { useState } from 'react';
import { Chatroom } from 'ts/interfaces/chatroom.model';
import ChatroomElement from 'components/sidebar/chat/chatroom-element';
import OpenedChatroomModal from './modal/open-chat-model';

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
						key={id}
						chatroom={chatroom}
						isOpened={true}
						roomToEnter={roomToEnter}
						setRoomToEnter={setRoomToEnter}
					/>
				))}
			</div>
			<OpenedChatroomModal roomToEnter={roomToEnter} />
		</div>
	);
};

export default OpenChatroomList;
