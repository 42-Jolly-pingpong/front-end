import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';
import chatParticipantData from 'ts/mock/chat-participant-data';
import userData from 'ts/mock/user-data';

export const channelList: ChatRoom[] = [
	{
		id: 1,
		roomName: '42seoul_global_random',
		currentPeople: 3,
		roomType: ChatRoomType.PUBLIC,
		updatedTime: new Date(),
		status: true,
		participants: [chatParticipantData[0], chatParticipantData[1]],
	},
	{
		id: 2,
		roomName: '42seoul_staff_building',
		currentPeople: 6,
		roomType: ChatRoomType.PUBLIC,
		updatedTime: new Date(),
		status: true,
		participants: [chatParticipantData[0]],
	},
	{
		id: 3,
		roomName: '_workspace_admins',
		currentPeople: 6,
		roomType: ChatRoomType.PROTECTED,
		updatedTime: new Date(),
		status: true,
		participants: [chatParticipantData[0]],
	},
];

export const dmList: Dm[] = [
	{
		id: 1,
		chatMate: userData[0],
		updatedTime: new Date(),
		status: true,
	},
	{
		id: 2,
		chatMate: userData[1],
		updatedTime: new Date(),
		status: true,
	},
];
