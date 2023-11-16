import ChannelDeleteField from 'pages/chat/components/sidebar/setting-tap/channel-delete-field';
import ChannelOwnerField from 'pages/chat/components/sidebar/setting-tap/channel-owner-field';
import ChannelRoomTypeField from 'pages/chat/components/sidebar/setting-tap/channel-room-type-field';
import { useRecoilValue } from 'recoil';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatState } from 'ts/states/chat-state';

const ChatSettingTap = () => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;

	const owner = chat.participants.find(
		(participant) => participant.role === ChatParticipantRole.OWNER
	);

	return (
		<div className='flex flex-col w-full chat-right-sidebar-tap bg-gray-100 p-4'>
			<ChannelOwnerField owner={owner} />
			<ChannelRoomTypeField />
			<ChannelDeleteField />
		</div>
	);
};

export default ChatSettingTap;
