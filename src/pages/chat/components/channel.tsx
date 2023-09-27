import { Sidebar } from 'flowbite-react';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiHash, BiLock } from 'react-icons/bi';

const Channel = (props: { channel: ChatRoom }) => {
	const channelIcon = () => {
		switch (props.channel.roomType) {
			case ChatRoomType.PUBLIC:
				return <BiHash />;

			case ChatRoomType.PROTECTED:
				return <BiLock />;
		}
	};
	return (
		<Sidebar.Item>
			<div className='flex items-center'>
				<div className='pr-1'>{channelIcon()}</div>
				{props.channel.roomName}
			</div>
		</Sidebar.Item>
	);
};

export default Channel;
