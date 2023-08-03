import { ChatroomType } from '../enum/chatroom-type.enum';
import { Chat } from './chat.model';
import { User } from './userr.model';

export interface Chatroom {
	id: number;
	user: User;
	type: ChatroomType;
	maxPeople: number;
	chats?: Chat[];
}//임시s