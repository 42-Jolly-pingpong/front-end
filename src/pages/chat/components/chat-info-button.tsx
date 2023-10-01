import { Avatar, Button, Flowbite } from 'flowbite-react';
import { ChatHeaderButtonTheme } from 'pages/chat/themes/chat-header-button-theme';
import { useRecoilValue } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatState } from 'ts/states/chat-state';

const ChatInfoButton = () => {
	const chatRoom = useRecoilValue(chatState);

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

export default ChatInfoButton;
