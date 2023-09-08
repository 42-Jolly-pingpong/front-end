import { Chatroom } from 'ts/interfaces/chatroom.model';
import chatRoomData from 'ts/mock/chatroom-data';

const GetRoomInfo = (roomIdx: number): Chatroom | null => {
	// return null
	return chatRoomData[roomIdx];
};

export default GetRoomInfo;
