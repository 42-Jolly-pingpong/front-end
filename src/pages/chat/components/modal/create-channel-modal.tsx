import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { CreateChatRoom } from 'ts/interfaces/create-chat-room.model';
import SetChatRoomName from 'pages/chat/components/modal/set-chat-room-name';
import SetChatRoomType from 'pages/chat/components/modal/set-chat-room-type';
import { BiHash } from 'react-icons/bi';

export const CreateChannelModal = () => {
	const [phase, setPhase] = useState<number>(1);
	const [chatRoomInfo, setChatRoomInfo] = useState<CreateChatRoom>({
		roomName: '',
		roomType: ChatRoomType.PUBLIC,
		password: null,
		participants: [],
	});

	const modalBody = () => {
		switch (phase) {
			case 1:
				return (
					<SetChatRoomName
						setPhase={setPhase}
						chatRoomInfo={chatRoomInfo}
						setChatRoomInfo={setChatRoomInfo}
					/>
				);
			case 2:
				return (
					<SetChatRoomType
						setPhase={setPhase}
						setChatRoomInfo={setChatRoomInfo}
					/>
				);
		}
	};

	return (
		<>
			<Modal.Header>
				채널 생성
				{phase === 2 ? (
					<div className='mt-0.5 flex items-center text-xs font-light text-gray-900'>
						<BiHash />
						{chatRoomInfo.roomName}
					</div>
				) : null}
			</Modal.Header>
			<Modal.Body>{modalBody()}</Modal.Body>
		</>
	);
};
