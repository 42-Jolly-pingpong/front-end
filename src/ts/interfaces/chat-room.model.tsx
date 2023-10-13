import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatParticipant } from 'ts/interfaces/chat-participant.model';

export interface ChatRoom {
	id: number;
	roomName: string;
	roomType: ChatRoomType;
	createdAt: Date;
	updatedTime: Date;
	status: boolean;
	currentPeople: number;
	participants: ChatParticipant[];
}
