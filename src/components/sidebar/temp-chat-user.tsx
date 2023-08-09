import { ChatroomType } from "../../ts/enum/chatroom-type.enum"
import { Chat } from "../../ts/interfaces/chat.model"
import { Chatroom } from "../../ts/interfaces/chatroom.model copy"
import { User } from "../../ts/interfaces/userr.model"

export const tempUser1 : User = {
	id : 1,
	nickname : "temp",
	avatar: "https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"
} //temp

export const tempUser2 : User = {
	id : 1,
	nickname : "temp",
	avatar: "https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=2000"
} //temp

export const tempChat1 : Chat = {
	id : 1,
	user: tempUser1,
	content: "hihi",
	sentTime: "2023-05-31",
}

export const tempChat2 : Chat = {
	id : 2,
	user: tempUser2,
	content: "hey!",
	sentTime: "2023-05-31",
}

export const tempChatroom1 : Chatroom = {
	id : 1,
	user: [tempUser1],
	title: "come on!",
	type: ChatroomType.PUBLIC,
	maxPeople: 10,
	chats: [tempChat1, tempChat2]
} //temp

export const tempChatroom2 : Chatroom = {
	id : 2,
	user: [tempUser1, tempUser2],
	title: "hi!",
	type: ChatroomType.PROTECTED,
	maxPeople: 2,
} //temp

export const numberOfFriend = 10
