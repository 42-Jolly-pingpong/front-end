import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

const chatRoomData: ChatRoom[] = [
	{
		id: 50,
		roomName: '은비테스트용',
		currentPeople: 3,
		roomType: ChatRoomType.PUBLIC,
		updateTime: new Date(),
		status: true,
	},
];

export default chatRoomData;
