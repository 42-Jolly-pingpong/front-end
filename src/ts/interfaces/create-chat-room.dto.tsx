import { ChatRoomType } from 'ts/enums/chat-room-type.enum';

export interface CreateChatRoomDto {
	roomName: string;
	roomType: ChatRoomType;
	password: string | null;
}
