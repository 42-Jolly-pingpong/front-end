import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

export const channelList: ChatRoom[] = [
	{
		id: 1,
		roomName: '42seoul_global_random',
		currentPeople: 3,
		roomType: ChatRoomType.PUBLIC,
		updateTime: new Date(),
		status: true,
	},
	{
		id: 2,
		roomName: '42seoul_staff_building',
		currentPeople: 6,
		roomType: ChatRoomType.PUBLIC,
		updateTime: new Date(),
		status: true,
	},
	{
		id: 3,
		roomName: '_workspace_admins',
		currentPeople: 6,
		roomType: ChatRoomType.PROTECTED,
		updateTime: new Date(),
		status: true,
	},
];
