import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { CreateChatRoom } from 'ts/interfaces/create-chat-room.model';
import { TextInput } from 'flowbite-react';
import SetChatRoomName from 'pages/chat/components/modal/set-chat-room-name';

export const CreateChannelModal = () => {
	const [phase, setPhase] = useState<number>(1);
	const [chatRoomInfo, setChatRoomInfo] = useState<CreateChatRoom>({
		roomName: '',
		roomType: ChatRoomType.PUBLIC,
		password: null,
		participants: [],
	});

	const getType = () => {
		return (
			<>
				<h3>채널 이름</h3>
				<TextInput className='mt-3 mb-3' required />
				<div className='flex justify-end'>
					<Button type='submit' onSubmit={() => setPhase(2)}>
						다음
					</Button>
				</div>
			</>
		);
	};

	const modalBody = () => {
		switch (phase) {
			case 1:
				return (
					<SetChatRoomName
						setPhase={setPhase}
						setChatRoomInfo={setChatRoomInfo}
					/>
				);
			case 2:
				return getType();
		}
	};

	return (
		<>
			<Modal.Header>채널 생성</Modal.Header>
			<Modal.Body>{modalBody()}</Modal.Body>
		</>
	);
};
