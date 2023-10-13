import { BiHash, BiLock, BiLockOpen } from 'react-icons/bi';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';

const ChannelIcon = (props: { roomType: ChatRoomType; size: number }) => {
	switch (props.roomType) {
		case ChatRoomType.PUBLIC:
			return <BiHash size={props.size} />;

		case ChatRoomType.PROTECTED:
			return <BiLockOpen size={props.size} />;

		case ChatRoomType.PRIVATE:
			return <BiLock size={props.size} />;
	}
};

export default ChannelIcon;
