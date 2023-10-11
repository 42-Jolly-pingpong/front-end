import { ChatParticipantStatus } from 'ts/enums/chat-participants-status.enum';
import { ChatParticipantRole } from '../enums/chat-participants-role.enum';
import { User } from 'ts/interfaces/user.model';

export interface ChatParticipant {
	user: User;
	status: ChatParticipantStatus;
	role: ChatParticipantRole;
	muteExpirationTime: Date | null;
}
