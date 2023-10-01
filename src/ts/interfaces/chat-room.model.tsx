import { ChatRoomType } from 'ts/enums/chat-room-type.enum';

export interface ChatRoom {
	id: number;
	roomName: string;
	roomType: ChatRoomType;
	updatedTime: Date;
	status: boolean;
	currentPeople: number;
}