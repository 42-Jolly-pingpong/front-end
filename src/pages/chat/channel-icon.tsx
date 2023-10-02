import { BiHash, BiLock, BiLockOpen } from 'react-icons/bi';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';

const ChannelIcon = (props: { roomType: ChatRoomType }) => {
	switch (props.roomType) {
		case ChatRoomType.PUBLIC:
			return <BiHash />;

		case ChatRoomType.PROTECTED:
			return <BiLockOpen />;

		case ChatRoomType.PRIVATE:
			return <BiLock />;
	}
};

export default ChannelIcon;
