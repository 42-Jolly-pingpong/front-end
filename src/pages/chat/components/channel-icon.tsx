import { BiHash, BiLock, BiLockOpen } from 'react-icons/bi';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';

const ChannelIcon = (props: { roomType: ChatRoomType }) => {
	switch (props.roomType) {
		case ChatRoomType.PUBLIC:
			return <BiHash size='18' />;

		case ChatRoomType.PROTECTED:
			return <BiLockOpen size='18' />;

		case ChatRoomType.PRIVATE:
			return <BiLock size='18' />;
	}
};

export default ChannelIcon;
