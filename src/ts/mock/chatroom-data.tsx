import { ChatroomType } from 'ts/enums/chatroom-type.enum';
import { Chatroom } from 'ts/interfaces/chatroom.model';

const chatRoomData: Chatroom[] = [
	{
		idx: 50,
		title: '은비테스트용',
		password: null,
		currentPeople: 3,
		maxPeople: 10,
		type: ChatroomType.PUBLIC,
		updateTime: new Date(),
		status: true,
	},
];

export default chatRoomData;
