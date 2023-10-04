import { Sidebar } from 'flowbite-react';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import ChannelIcon from 'pages/chat/components/channel-icon';
import changeChat from 'hooks/change-chat';

const ChannelItem = (props: { channel: ChatRoom; isSelected: boolean }) => {
	const setChat = changeChat();

	const onClickItem = () => {
		setChat(props.channel);
	};

	return (
		<Sidebar.Item
			onClick={onClickItem}
			className={props.isSelected ? 'bg-primary-300 hover:bg-primary-500' : ''}
		>
			<div className='flex items-center'>
				<div className='mr-1'>
					<ChannelIcon roomType={props.channel.roomType} />
				</div>
				<div className='text-base font-medium ml-1 truncate'>
					{props.channel.roomName}
				</div>
			</div>
		</Sidebar.Item>
	);
};

export default ChannelItem;
