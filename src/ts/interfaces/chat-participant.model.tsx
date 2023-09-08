import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { ChatParticipantAuth } from '../enums/chat-participants-auth.enum';

export interface ChatParticipant {
	chatUserIdx: number;
	roomIdx: number;
	userIdx: number;
	auth: ChatParticipantAuth;
	status: ChatParticipantStatus;
	muteExpirationTime: Date | null;
}
