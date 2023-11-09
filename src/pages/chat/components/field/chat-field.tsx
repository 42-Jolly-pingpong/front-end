import ChannelHeader from 'pages/chat/components/field/channel-header';
import ChatItem from 'pages/chat/components/field/chat-item';
import DmHeader from 'pages/chat/components/field/dm-header';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { Dm } from 'ts/interfaces/dm.model';
import User from 'ts/interfaces/user.model';
import { chatState } from 'ts/states/chat-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const ChatField = () => {
	const chat = useRecoilValue(chatState);
	const scrollRef = useRef<HTMLDivElement>(null);
	const blockedUser = useRecoilValue(userFriendsState).blockedFriends as User[];
	const [showedChats, setShowedChats] = useState<Chat[]>([]);

	const chatRoom = chat.chatRoom;
	const chats = chat.chats;

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [scrollRef, chatRoom, showedChats]);

	useEffect(() => {
		setShowedChats(chatsWithoutBlocked(chats));
	}, [chats, blockedUser]);

	const chatsWithoutBlocked = (chats: Chat[]): Chat[] => {
		return chats.filter((chat) => {
			return !blockedUser.find((user) => user.id === chat.user.user.id);
		});
	};

	if (chatRoom === null) {
		return <></>;
	}
	const isDm = chatRoom.roomType === ChatRoomType.DM;

	const hasTopBorder = (date1: Date, date2: Date) => {
		const preData = new Date(date1);
		const currData = new Date(date2);

		const year1 = preData.getFullYear();
		const month1 = preData.getMonth();
		const day1 = preData.getDate();

		const year2 = currData.getFullYear();
		const month2 = currData.getMonth();
		const day2 = currData.getDate();

		return !(year1 === year2 && month1 === month2 && day1 === day2);
	};

	if (!chatRoom) {
		return null;
	}
	return (
		<div
			ref={scrollRef}
			className='flex flex-col px-5 chat-field overflow-y-auto'
		>
			{isDm ? (
				<DmHeader mate={(chatRoom as Dm).chatMate} />
			) : (
				<ChannelHeader channel={chatRoom as ChatRoom} />
			)}
			{showedChats.map((chat, id) => (
				<ChatItem
					chat={chat}
					hasTopBorder={
						id === 0
							? true
							: hasTopBorder(showedChats[id - 1].sentTime, chat.sentTime)
					}
					key={id}
				/>
			))}
		</div>
	);
};

export default ChatField;
