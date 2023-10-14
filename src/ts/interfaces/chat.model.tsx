import { ChatParticipant } from 'ts/interfaces/chat-participant.model';

export interface Chat {
	id: number;
	user: ChatParticipant;
	content: string;
	sentTime: Date;
}
