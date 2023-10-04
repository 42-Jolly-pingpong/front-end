import ChannelHeader from 'pages/chat/components/field/channel-header';
import ChatItem from 'pages/chat/components/field/chat-item';
import DmHeader from 'pages/chat/components/field/dm-header';
import { chatList } from 'pages/chat/mock';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { Dm } from 'ts/interfaces/dm.model';
import { chatState } from 'ts/states/chat-state';

const ChatField = () => {
	const [chats, setChats] = useState<Chat[]>([]);
	const scrollRef = useRef<HTMLDivElement>(null);
	const chat = useRecoilValue(chatState);

	useEffect(() => {
		setChats(chatList); //temp
	}, []);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [scrollRef]);

	if (chat === null) {
		return <></>;
	}
	const isDm = chat.roomType === ChatRoomType.DM;

	const hasTopBorder = (date1: Date | null, date2: Date) => {
		if (date1 === null) {
			return true;
		}
		const year1 = date1.getFullYear();
		const month1 = date1.getMonth();
		const day1 = date1.getDate();

		const year2 = date2.getFullYear();
		const month2 = date2.getMonth();
		const day2 = date2.getDate();

		return !(year1 === year2 && month1 === month2 && day1 === day2);
	};

	return (
		<div ref={scrollRef} className='overflow-y-auto px-5 w-full'>
			{isDm ? (
				<DmHeader mate={(chat as Dm).chatMate} />
			) : (
				<ChannelHeader channel={chat as ChatRoom} />
			)}
			{chats.map((chat, id) => (
				<ChatItem
					chat={chat}
					hasTopBorder={hasTopBorder(
						id === 0 ? null : chats[id - 1].sentTime,
						chat.sentTime
					)}
					key={id}
				/>
			))}
		</div>
	);
};

export default ChatField;
