import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiCheck, BiHash, BiLock } from 'react-icons/bi';
import { ListGroup } from 'flowbite-react';
import { useState } from 'react';
import userData from 'ts/mock/user-data';

export const SearchChannelItem = (props: { channel: ChatRoom }) => {
	const [isHovered, setIsHovered] = useState(false);

	const user = userData[1]; //temp

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

	const isUserInChannel = () => {
		const result = props.channel.participants.filter(
			(participant) => participant.user.id == user.id
		);

		return result.length !== 0;
	};

	const buttonOnChannel = () => {
		if (isUserInChannel()) {
			return (
				<div className='h-8 border border-green-700 focus:outline-none text-green-700 bg-white hover:bg-slate-200 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5'>
					참여 중
				</div>
			);
		}
		return (
			<div className='h-8 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5'>
				입장
			</div>
		);
	};

	const badge = () => {
		return (
			<div className='flex items-center text-green-700 font-semibold mr-1'>
				<BiCheck />
				<div>참여함</div>
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
				<div className='flex text-xs text-slate-900 font-thin'>
					{isUserInChannel() && badge()}
					{props.channel.currentPeople}명의 멤버
				</div>
			</div>
			{isHovered && buttonOnChannel()}
		</ListGroup.Item>
	);
};
