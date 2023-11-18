import ChatSidebarHeader from 'pages/chat/components/sidebar/chat-sidebar-header';
import BigUserImg from 'pages/chat/components/big-user-img';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { useRecoilValue } from 'recoil';
import User from 'ts/interfaces/user.model';
import ProfileField from 'pages/chat/components/sidebar/profile/profile-field';
import ContactField from 'pages/chat/components/sidebar/profile/contact-field';
import HistoryField from 'pages/chat/components/sidebar/profile/history-profile';

const ChatSidebarProfile = () => {
	const otherUser = useRecoilValue(chatSidebarState).profile as User;

	if (otherUser === null) {
		return null;
	}

	return (
		<>
			<ChatSidebarHeader title='프로필' />
			<div className='flex justify-center my-3'>
				<BigUserImg src={otherUser.avatarPath} />
			</div>
			<ProfileField />
			<ContactField />
			<HistoryField />
		</>
	);
};

export default ChatSidebarProfile;
