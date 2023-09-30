import { Sidebar } from 'flowbite-react';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import ChannelIcon from 'pages/chat/components/channel-icon';
import { useSetRecoilState } from 'recoil';
import { chatState } from 'ts/states/chat-state';

const ChannelItem = (props: { channel: ChatRoom }) => {
	const setChat = useSetRecoilState(chatState);

	const onClickItem = () => {
		setChat(props.channel);
	};

	return (
		<Sidebar.Item onClick={onClickItem}>
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
