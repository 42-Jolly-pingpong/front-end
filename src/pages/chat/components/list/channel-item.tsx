import { Sidebar } from 'flowbite-react';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import ChannelIcon from 'pages/chat/components/channel-icon';
import changeChat from 'hooks/change-chat';

const ChannelItem = (props: { channel: ChatRoom }) => {
	const setChat = changeChat();

	const onClickItem = () => {
		setChat(props.channel);
	};

	return (
		<Sidebar.Item onClick={onClickItem}>
			<div className='flex items-center'>
				<div className='mr-1'>
					<ChannelIcon roomType={props.channel.roomType} />
				</div>
				<div className='text-base font-medium ml-1'>
					{props.channel.roomName}
				</div>
			</div>
		</Sidebar.Item>
	);
};

export default ChannelItem;
