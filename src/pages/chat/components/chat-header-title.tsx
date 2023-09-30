import { Avatar, Button, Flowbite } from 'flowbite-react';
import ChannelIcon from 'pages/chat/components/channel-icon';
import { ChatHeaderButtonTheme } from 'pages/chat/themes/chat-header-button-theme';
import { useRecoilValue } from 'recoil';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';
import { chatState } from 'ts/states/chat-state';

const ChatHeaderTitle = () => {
	const chatRoom = useRecoilValue(chatState);

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
			<div className='chat-content flex justify-between items-center'>
				<div className='flex items-center font-bold'>
					<div className='ml-2 mr-2'>
						<ChannelIcon roomType={chatRoom.roomType} />
					</div>
					{(chatRoom as ChatRoom).roomName}
				</div>
				<div>{ParticipantInfoButton()}</div>
			</div>
		);
	};

	const ParticipantInfoButton = () => {
		const participants = (chatRoom as ChatRoom).participants;
		const participantsImg: string[] = [];

		for (
			let index = 0;
			index < (3 <= participants.length ? 3 : participants.length);
			index++
		) {
			participantsImg.push(participants[index].user.avatarPath);
		}

		const currentPeople = (chatRoom as ChatRoom).currentPeople;

		return (
			<Flowbite theme={{ theme: ChatHeaderButtonTheme }}>
				<Button
					color='light'
					size='sm'
					className='h-8 border border-slate-300 mr-2'
				>
					<div className='flex items-center'>
						<Avatar.Group>
							{participantsImg.map((img, id) => (
								<Avatar size='xs' img={img} key={id} rounded stacked />
							))}
						</Avatar.Group>
						<div className='ml-2 text-gray-500'>{currentPeople}</div>
					</div>
				</Button>
			</Flowbite>
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
		<div className='chat-content flex items-center border-b h-12'>
			{header()}
		</div>
	);
};

export default ChatHeaderTitle;
