import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import User from 'ts/interfaces/user.model';

export interface Dm {
	id: number;
	roomType: ChatRoomType;
	chatMate: User;
	updatedTime: Date;
	status: boolean;
	leftToRead: boolean;
}
