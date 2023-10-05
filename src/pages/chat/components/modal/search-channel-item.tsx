import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiCheck, BiHash, BiLock } from 'react-icons/bi';
import { ListGroup } from 'flowbite-react';
import { useState } from 'react';
import userData from 'ts/mock/user-data';
import { ChatParticipantRole } from 'ts/enums/chat-participants-role.enum';
import { BsDot } from 'react-icons/bs';

export const SearchChannelItem = (props: { channel: ChatRoom }) => {
	const [isHovered, setIsHovered] = useState(false);
	const owner = props.channel.participants.find(
		(participant) => participant.role === ChatParticipantRole.OWNER
	);

	const user = userData[0]; //temp

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
				<div className='h-8 border border-gray-200 focus:outline-none text-gray-800 bg-white hover:bg-gray-300 focus:ring-4 focus:ring-cyan-300 text-xs font-medium rounded-lg px-3 py-2'>
					이동
				</div>
			);
		}
		return (
			<div className='h-8 focus:outline-none text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 text-xs font-medium rounded-lg px-3 py-2'>
				참여
			</div>
		);
	};

	const badge = () => {
		return (
			<div className='flex items-center text-green-500 text-sm font-bold mr-1'>
				<BiCheck />
				<div>참여함</div>
			</div>
		);
	};

	return (
		<ListGroup.Item onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<div className='flex flex-col items-start'>
				<div className='flex items-center text-sm font-bold text-gray-900'>
					<div className='mr-1'>{channelIcon()}</div>
					{props.channel.roomName}
				</div>
				<div className='flex items-center text-xm text-gray-500 font-light'>
					{isUserInChannel() && badge()}
					{props.channel.currentPeople}명의 멤버
					<BsDot />
					채널 소요주 : {owner?.user.intraId}
				</div>
			</div>
			{isHovered && buttonOnChannel()}
		</ListGroup.Item>
	);
};
