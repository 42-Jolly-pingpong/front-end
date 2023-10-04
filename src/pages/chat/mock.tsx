import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { Dm } from 'ts/interfaces/dm.model';
import chatParticipantData from 'ts/mock/chat-participant-data';
import userData from 'ts/mock/user-data';

export const channelList: ChatRoom[] = [
	{
		id: 1,
		roomName: '42seoul_global_random',
		currentPeople: 3345,
		roomType: ChatRoomType.PUBLIC,
		createdAt: new Date(),
		updatedTime: new Date(),
		status: true,
		participants: [
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[0],
			chatParticipantData[1],
			chatParticipantData[1],
			chatParticipantData[2],
		],
	},
	{
		id: 2,
		roomName: '42seoul_staff_building',
		currentPeople: 6,
		roomType: ChatRoomType.PUBLIC,
		createdAt: new Date(),
		updatedTime: new Date(),
		status: true,
		participants: [chatParticipantData[0]],
	},
	{
		id: 3,
		roomName: '_workspace_admins',
		currentPeople: 6,
		roomType: ChatRoomType.PROTECTED,
		createdAt: new Date(),
		updatedTime: new Date(),
		status: true,
		participants: [chatParticipantData[0]],
	},
];

export const dmList: Dm[] = [
	{
		id: 1,
		roomType: ChatRoomType.DM,
		chatMate: userData[0],
		updatedTime: new Date(),
		status: true,
	},
	{
		id: 2,
		roomType: ChatRoomType.DM,
		chatMate: userData[1],
		updatedTime: new Date(),
		status: true,
	},
];

export const chatList: Chat[] = [
	{
		id: 1,
		user: chatParticipantData[0],
		content: 'hihi!!',
		sentTime: new Date(),
	},
	{
		id: 1,
		user: chatParticipantData[1],
		content: 'hi~~~~',
		sentTime: new Date(),
	},
	{
		id: 1,
		user: chatParticipantData[2],
		content:
			"안녕하세요 여러분! I'm from 42 São Paulo, Brazil, and we've organized an unofficial event called 42CSSTober, which will be taking place throughout the entire month of October.a fantastic opportunity to learn HTML and CSS while having fun. So, 42CSSTober, an unofficial 42 event, is happening throughout October. The event's concept involves creating a mini-illustration every day based on a designated theme (you can check out our list on GitHub) and your interpretation, using only HTML and CSS.This is a great chance to enhance your coding skills and unleash your creativity. Are you curious and want to know more? Visit: (https://github.com/mewmewdevart/42CSSTober).",
		sentTime: new Date(),
	},
	{
		id: 1,
		user: chatParticipantData[1],
		content: 'wow',
		sentTime: new Date(),
	},
];
