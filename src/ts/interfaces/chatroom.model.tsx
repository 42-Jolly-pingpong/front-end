import { ChatroomType } from '../enums/chatroom-type.enum';
import { Chat } from './chat.model';
import { User } from './user.model';

export interface Chatroom {
	idx: number;
	title: String;
	maxPeople: number;
	type: ChatroomType;
	updateTime: TimeRanges;
	status: boolean;
	users: User[];
}