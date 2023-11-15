import { Tabs } from 'flowbite-react';
import ChatInformationTap from 'pages/chat/components/sidebar/information-tap/chat-information-tap';
import ChatMemberTap from 'pages/chat/components/sidebar/chat-member-tap';
import ChatSettingTap from 'pages/chat/components/sidebar/setting-tap/chat-setting-tap';
import { FiInfo, FiSettings, FiUsers } from 'react-icons/fi';

const ChatSidebarForAdmin = () => {
	return (
		<Tabs.Group aria-label='Tabs with underline' style='underline'>
			<Tabs.Item active icon={FiUsers} title='정보'>
				<ChatInformationTap />
			</Tabs.Item>
			<Tabs.Item active icon={FiInfo} title='멤버'>
				<ChatMemberTap />
			</Tabs.Item>
			<Tabs.Item active icon={FiSettings} title='설정'>
				<ChatSettingTap />
			</Tabs.Item>
		</Tabs.Group>
	);
};

export default ChatSidebarForAdmin;
