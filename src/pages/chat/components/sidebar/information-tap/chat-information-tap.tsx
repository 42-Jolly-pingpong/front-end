import ChannelAdminField from 'pages/chat/components/sidebar/information-tap/channel-admin-field';
import ChannelLeaveField from 'pages/chat/components/sidebar/information-tap/channel-leave-field';
import ChannelNameField from 'pages/chat/components/sidebar/information-tap/channel-name-field';
import ChannelOwnerInfoField from 'pages/chat/components/sidebar/information-tap/channel-owner-info-field';
import { useRecoilValue } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import User from 'ts/interfaces/user.model';
import { chatState } from 'ts/states/chat-state';
import { userState } from 'ts/states/user-state';

const ChatInformationTap = () => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;
	const user = useRecoilValue(userState) as User;
	const owner = chat.participants.find(
		(participant) => participant.role === ChatParticipantRole.OWNER
	);

	return (
		<div className='flex flex-col w-full chat-right-sidebar-tap bg-gray-100 p-4'>
			<ChannelNameField />
			<ChannelAdminField />
			<ChannelOwnerInfoField />
			{owner?.user.id !== user.id && <ChannelLeaveField />}
		</div>
	);
};

export default ChatInformationTap;
