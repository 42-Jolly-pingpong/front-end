import { Tabs } from 'flowbite-react';
import ChatInformationTap from 'pages/chat/components/sidebar/chat-information-tap';
import ChatMemberTap from 'pages/chat/components/sidebar/chat-member-tap';
import { FiInfo, FiUsers } from 'react-icons/fi';

const ChatSidebarForMember = () => {
	return (
		<Tabs.Group aria-label='Tabs with underline' style='underline'>
			<Tabs.Item active icon={FiUsers} title='정보'>
				<ChatInformationTap />
			</Tabs.Item>
			<Tabs.Item active icon={FiInfo} title='멤버'>
				<ChatMemberTap />
			</Tabs.Item>
		</Tabs.Group>
	);
};

export default ChatSidebarForMember;
