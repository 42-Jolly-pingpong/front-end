import { Flowbite, Tabs } from 'flowbite-react';
import ChatSidebarHeader from 'pages/chat/components/sidebar/chat-sidebar-header';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { tapsTheme } from 'pages/chat/themes/taps.theme';
import { chatState } from 'ts/states/chat-state';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { userState } from 'ts/states/user-state';
import User from 'ts/interfaces/user.model';
import { FiInfo, FiSettings, FiUsers } from 'react-icons/fi';
import ChatInformationTap from 'pages/chat/components/sidebar/information-tap/chat-information-tap';
import ChatMemberTap from 'pages/chat/components/sidebar/chat-member-tap';
import ChatSettingTap from 'pages/chat/components/sidebar/setting-tap/chat-setting-tap';

const ChatSidebarChat = () => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const [isOwner, setIsOwner] = useState<boolean>(false);
	const user = useRecoilValue(userState) as User;

	useEffect(() => {
		const participantWithSameId = chat.participants.find(
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
		<>
			<ChatSidebarHeader title={chat.roomName} />
			<Flowbite theme={{ theme: tapsTheme }}>
				<Tabs.Group aria-label='Tabs with underline' style='underline'>
					<Tabs.Item active icon={FiUsers} title='정보'>
						<ChatInformationTap />
					</Tabs.Item>
					<Tabs.Item active icon={FiInfo} title='멤버'>
						<ChatMemberTap />
					</Tabs.Item>
					{isOwner && (
						<Tabs.Item active icon={FiSettings} title='설정'>
							<ChatSettingTap />
						</Tabs.Item>
					)}
				</Tabs.Group>
			</Flowbite>
		</>
	);
};

export default ChatSidebarChat;
