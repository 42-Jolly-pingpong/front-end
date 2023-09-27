import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { Chatroom } from 'ts/interfaces/chat-room.model';

const chatRoomData: Chatroom[] = [
	{
		idx: 50,
		title: '은비테스트용',
		password: null,
		currentPeople: 3,
		maxPeople: 10,
		type: ChatRoomType.PUBLIC,
		updateTime: new Date(),
		status: true,
	},
];

export default chatRoomData;
