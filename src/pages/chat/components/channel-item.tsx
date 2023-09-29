import { Sidebar } from 'flowbite-react';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import ChannelIcon from 'pages/chat/channel-icon';

const ChannelItem = (props: { channel: ChatRoom }) => {
	return (
		<Sidebar.Item>
			<div className='flex items-center'>
				<div className='mr-1'>
					<ChannelIcon roomType={props.channel.roomType} />
				</div>
				{props.channel.roomName}
			</div>
		</Sidebar.Item>
	);
};

export default ChannelItem;
