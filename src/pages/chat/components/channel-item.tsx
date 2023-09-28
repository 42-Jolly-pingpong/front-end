import { Sidebar } from 'flowbite-react';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiHash, BiLock, BiLockOpen } from 'react-icons/bi';

const ChannelItem = (props: { channel: ChatRoom }) => {
	const channelIcon = () => {
		switch (props.channel.roomType) {
			case ChatRoomType.PUBLIC:
				return <BiHash />;

			case ChatRoomType.PROTECTED:
				return <BiLockOpen />;

			case ChatRoomType.PRIVATE:
				return <BiLock />;
		}
	};
	return (
		<Sidebar.Item>
			<div className='flex items-center'>
				<div className='mr-1'>{channelIcon()}</div>
				{props.channel.roomName}
			</div>
		</Sidebar.Item>
	);
};

export default ChannelItem;
