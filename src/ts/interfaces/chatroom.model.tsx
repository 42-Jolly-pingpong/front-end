import { ChatroomType } from '../enums/chatroom-type.enum';

export interface Chatroom {
	idx: number;
	title: string;
	password: number | null;
	currentPeople: number;
	maxPeople: number;
	type: ChatroomType;
	updateTime: Date;
	status: boolean;
}
