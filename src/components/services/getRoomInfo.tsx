import { Chatroom } from 'ts/interfaces/chat-room.model';
import chatRoomData from 'ts/mock/chatroom-data';

const GetRoomInfo = (roomIdx: number): Chatroom | null => {
	// return null
	return chatRoomData[roomIdx];
};

export default GetRoomInfo;
