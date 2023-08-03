import { ChatType } from '../enum/chat-type.enum';
import { User } from './userr.model';

export interface Chat {
	id: number;
	user: User;
	content: string;
	sentTime: string;
	type: ChatType;
}//임시s