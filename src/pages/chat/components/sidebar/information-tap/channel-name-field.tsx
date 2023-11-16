import ChannelIcon from 'pages/chat/components/channel-icon';
import ChannelPropertyContent from 'pages/chat/components/sidebar/channel-property-content';
import ChannelPropertyTitle from 'pages/chat/components/sidebar/channel-property-title';
import { useRecoilValue } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatState } from 'ts/states/chat-state';

const ChannelNameField = () => {
	const chat = useRecoilValue(chatState).chatRoom as ChatRoom;

	return (
		<div className='px-5 py-4 bg-white rounded-xl'>
			<ChannelPropertyTitle label='채널 이름' />
			<div className='mt-1 flex items-start gray-900 break-all'>
				<div className=''>
					<ChannelIcon roomType={chat.roomType} size={18} />
				</div>
				<ChannelPropertyContent label={chat.roomName} />
			</div>
		</div>
	);
};

export default ChannelNameField;
