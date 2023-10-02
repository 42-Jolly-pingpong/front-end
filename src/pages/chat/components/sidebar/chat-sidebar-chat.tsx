import { Tabs } from 'flowbite-react';
import ChatInformationTap from 'pages/chat/components/sidebar/chat-information-tap';
import ChatMemberTap from 'pages/chat/components/sidebar/chat-member-tap';
import ChatSettingTap from 'pages/chat/components/sidebar/chat-setting-tap';
import { FiUsers, FiInfo, FiSettings } from 'react-icons/fi';
import ChatSidebarHeader from 'pages/chat/components/sidebar/chat-sidebar-header';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';
import userData from 'ts/mock/user-data';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import ChatSidebarForAdmin from 'pages/chat/components/sidebar/chat-sidebar-for-admin';
import ChatSidebarForMember from 'pages/chat/components/sidebar/chat-sidebar-for-member';

const ChatSidebarChat = () => {
	const chat = useRecoilValue(chatSidebarState).chat;
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const user = userData[1]; //temp

	useEffect(() => {
		const participantWithSameId = chat?.participants.find(
			(participant) => participant.user.id === user.id
		);

		if (participantWithSameId !== undefined) {
			setIsAdmin(
				participantWithSameId.role === ChatParticipantRole.ADMIN ||
					participantWithSameId.role === ChatParticipantRole.OWNER
			);
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
			<div className='grow'>
				{isAdmin ? (
					<ChatSidebarForAdmin chat={chat} />
				) : (
					<ChatSidebarForMember chat={chat} />
				)}
			</div>
		</div>
	);
};

export default ChatSidebarChat;
