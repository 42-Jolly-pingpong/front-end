import { ChatroomType } from '../enums/chatroom-type.enum';
import { User } from './user.model';

export interface Chatroom {
	idx: number;
	title: String;
	owner: User;
	currentPeople: number;
	maxPeople: number;
	type: ChatroomType;
	updateTime: Date,
	status: boolean;
}