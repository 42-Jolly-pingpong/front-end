import { Flowbite } from 'flowbite-react';
import ChatSidebarHeader from 'pages/chat/components/sidebar/chat-sidebar-header';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import userData from 'ts/mock/user-data';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import ChatSidebarForAdmin from 'pages/chat/components/sidebar/chat-sidebar-for-admin';
import ChatSidebarForMember from 'pages/chat/components/sidebar/chat-sidebar-for-member';
import { tapsTheme } from 'pages/chat/themes/taps.theme';

const ChatSidebarChat = () => {
	const chat = useRecoilValue(chatSidebarState).chat;
	const [isOwner, setIsOwner] = useState<boolean>(false);
	const user = userData[0]; //temp

	useEffect(() => {
		const participantWithSameId = chat?.participants.find(
			(participant) => participant.user.id === user.id
		);

		if (participantWithSameId !== undefined) {
			setIsOwner(participantWithSameId.role === ChatParticipantRole.OWNER);
		}
	}, []);

	if (chat === null) {
		return null;
	}

	return (
		<div className='h-hull w-full'>
			<ChatSidebarHeader
				aria-label='Tabs with underline'
				title={chat.roomName}
			/>
			<div className=''>
				<Flowbite theme={{ theme: tapsTheme }}>
					{isOwner ? (
						<ChatSidebarForAdmin chat={chat} />
					) : (
						<ChatSidebarForMember chat={chat} />
					)}
				</Flowbite>
			</div>
		</div>
	);
};

export default ChatSidebarChat;
