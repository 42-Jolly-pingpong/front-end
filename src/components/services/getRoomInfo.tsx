import { Chatroom } from '../../ts/interfaces/chatroom.model';
import chatRoomData from '../../ts/mock/chat-room-data';

const GetRoomInfo = (): Chatroom | null => {
	// return null
	return chatRoomData[0];
};

export default GetRoomInfo;
