import { ChatroomType } from 'ts/enums/chatroom-type.enum';
import { Chat } from 'ts/interfaces/chat.model';
import { Chatroom } from 'ts/interfaces/chatroom.model';
import { User } from 'ts/interfaces/user.model';

export const tempUser1: User = {
	idx: 1,
	intraId: 'Q',
	email: 'qw',
	status: true,
	winCount: 3,
	loseCount: 2,
	auth: true,
	nickname: 'temp',
	isLeave: false,
	avatarPath:
		'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000',
}; //temp

export const tempUser2: User = {
	idx: 2,
	intraId: 'Q',
	email: 'qw',
	status: true,
	winCount: 3,
	loseCount: 2,
	auth: true,
	nickname: 'temp',
	isLeave: false,
	avatarPath:
		'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000',
}; //temp

export const tempChat1: Chat = {
	idx: 1,
	user: tempUser1,
	content: 'hihi',
	sentTime: new Date(),
};

export const tempChat2: Chat = {
	idx: 2,
	user: tempUser2,
	content: 'hey!',
	sentTime: new Date(),
};

export const tempParticipants: User[] = [tempUser1, tempUser2];

export const tempChatroom1: Chatroom = {
	idx: 1,
	title: 'come on!',
	//owner: tempUser1,
	password: null,
	currentPeople: 2,
	maxPeople: 10,
	type: ChatroomType.PUBLIC,
	updateTime: new Date(),
	status: true,
}; //temp

export const tempChatroom2: Chatroom = {
	idx: 2,
	title: 'hi!',
	password: 1234,
	//owner: tempUser2,
	currentPeople: 2,
	maxPeople: 10,
	type: ChatroomType.PROTECTED,
	updateTime: new Date(),
	status: true,
}; //temp

export const numberOfFriend = 10;

export const tempChats1: Chat[] = [
	tempChat1,
	tempChat1,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
	tempChat2,
];
export const tempChats2: Chat[] = [tempChat1, tempChat1, tempChat2];
