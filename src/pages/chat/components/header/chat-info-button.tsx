import { Avatar, Button, Flowbite } from 'flowbite-react';
import useChangeSidebar from 'hooks/use-change-sidebar';
import { ChatHeaderButtonTheme } from 'pages/chat/themes/chat-header-button-theme';
import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

interface Props {
	chatRoom: ChatRoom;
}

const ChatInfoButton: React.FC<Props> = ({ chatRoom }) => {
	const setChatSidebar = useChangeSidebar('chat');

	const participantsImg: (string | undefined)[] = [];

	const participants = chatRoom.participants.filter(
		(participant) =>
			participant.status === ChatParticipantStatus.DEFAULT ||
			participant.status === ChatParticipantStatus.MUTED
	);

	if (participants) {
		for (
			let index = 0;
			index < (3 <= participants.length ? 3 : participants.length);
			index++
		) {
			participantsImg.push(participants[index].user.avatarPath);
		}
	}

	const onClickButton = () => {
		setChatSidebar(null);
	};

	return (
		<Flowbite theme={{ theme: ChatHeaderButtonTheme }}>
			<Button
				color='light'
				size='sm'
				className='h-8 border boder rounded-lg border-gray-300 focus:ring-0'
				onClick={onClickButton}
			>
				<div className='flex items-center gap-1'>
					<Avatar.Group>
						{participantsImg.map((img, id) => (
							<Avatar size='xs' img={img} key={id} rounded stacked />
						))}
					</Avatar.Group>
					<div className='text-gray-500'>{participants.length}</div>
				</div>
			</Button>
		</Flowbite>
	);
};

export default ChatInfoButton;
