import { ChatParticipantType } from '../enums/chat-participants-type.enum';

export interface ChatParticipant {
	chatUserIdx: number;
	roomIdx: number;
	userIdx: number;
	status: ChatParticipantType;
	muteExpirationTime: Date;
}
