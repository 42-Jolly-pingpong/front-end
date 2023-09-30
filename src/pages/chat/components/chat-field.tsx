import DmHeader from 'pages/chat/components/dm-header';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { Dm } from 'ts/interfaces/dm.model';
import { chatState } from 'ts/states/chat-state';

const ChatField = () => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const chat = useRecoilValue(chatState);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [scrollRef]);

	if (chat === null) {
		return <></>;
	}
	const isDm = chat.roomType === ChatRoomType.DM;

	return (
		<div ref={scrollRef} className='overflow-y-auto mx-5'>
			{isDm && <DmHeader mate={(chat as Dm).chatMate} />}
		</div>
	);
};

export default ChatField;
