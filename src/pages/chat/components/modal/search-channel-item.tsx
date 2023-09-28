import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiHash, BiLock } from 'react-icons/bi';
import { ListGroup } from 'flowbite-react';
import { useState } from 'react';

export const SearchChannelItem = (props: { channel: ChatRoom }) => {
	const [isHovered, setIsHovered] = useState(false);

	const onMouseEnter = () => {
		setIsHovered(true);
	};

	const onMouseLeave = () => {
		setIsHovered(false);
	};

	const channelIcon = () => {
		switch (props.channel.roomType) {
			case ChatRoomType.PUBLIC:
				return <BiHash />;

			case ChatRoomType.PROTECTED:
				return <BiLock />;
		}
	};

	const buttonOnChannel = () => {
		return (
			<div className='h-8 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5'>
				입장
			</div>
		);
	};

	return (
		<ListGroup.Item onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<div className='flex flex-col items-start'>
				<div className='flex items-center'>
					<div className='mr-1'>{channelIcon()}</div>
					{props.channel.roomName}
				</div>
				<div className='text-xs text-slate-900 font-thin'>
					{props.channel.currentPeople}명의 멤버
				</div>
			</div>
			{isHovered && buttonOnChannel()}
		</ListGroup.Item>
	);
};
