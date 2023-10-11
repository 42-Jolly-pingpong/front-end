import { ChatRoomType } from 'ts/enums/chat-room-type.enum';

export interface CreateChatRoom {
	roomName: string;
	roomType: ChatRoomType;
	password: number | null;
	participants: number[];
}