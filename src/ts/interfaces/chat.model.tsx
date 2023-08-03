import { ChatroomType } from '../enum/chatroom-type.enum';
import { User } from './userr.model';

export interface Chat {
	id: number;
	user: User;
	content: string;
	sentTime: string;
}//임시s