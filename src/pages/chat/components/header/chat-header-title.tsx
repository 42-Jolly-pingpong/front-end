import { Avatar } from 'flowbite-react';
import ChannelIcon from 'pages/chat/components/channel-icon';
import ChatInfoButton from 'pages/chat/components/header/chat-info-button';
import { useRecoilValue } from 'recoil';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';
import { chatState } from 'ts/states/chat-state';

const ChatHeaderTitle = () => {
	const chatRoom = useRecoilValue(chatState).chatRoom;

	const headerForDm = () => {
		if (chatRoom === null) {
			return;
		}
		const chatMate = (chatRoom as Dm).chatMate;

		return (
			<div className='flex items-center h-12'>
				<Avatar
					className='m-3'
					img={chatMate.avatarPath}
					status='online' //temp
					statusPosition='bottom-right'
					size='sm'
				/>
				<div className='font-bold'>{chatMate.nickname}</div>
			</div>
		);
	};

	const headerForChannel = () => {
		if (chatRoom === null) {
			return;
		}
		return (
			<div className='w-full flex justify-between items-center'>
				<div className='flex items-center font-bold'>
					<div className='ml-2 mr-2'>
						<ChannelIcon roomType={chatRoom.roomType} />
					</div>
					{(chatRoom as ChatRoom).roomName}
				</div>
				<ChatInfoButton />
			</div>
		);
	};

	const header = () => {
		if (chatRoom === null) {
			return <div></div>;
		}
		switch (chatRoom.roomType) {
			case ChatRoomType.DM:
				return headerForDm();
			default:
				return headerForChannel();
		}
	};

	return (
		<div className='w-full flex items-center border-b h-12'>{header()}</div>
	);
};

export default ChatHeaderTitle;
