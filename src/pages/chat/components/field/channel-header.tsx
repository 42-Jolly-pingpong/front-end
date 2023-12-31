import ChannelIcon from 'pages/chat/components/channel-icon';
import formattedDate from 'pages/chat/components/formatted-date';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

const ChannelHeader = (props: { channel: ChatRoom }) => {
	const { channel } = props;

	const channelTypeInKorean = () => {
		switch (channel.roomType) {
			case ChatRoomType.PRIVATE:
				return '비공개';
			case ChatRoomType.PUBLIC:
				return '공개';
			case ChatRoomType.PROTECTED:
				return '비밀번호 요구';
		}
	};

	return (
		<div className='my-5'>
			<div className='flex items-start text-3xl font-bold break-all'>
				<div className='mr-2 mt-1'>
					<ChannelIcon roomType={channel.roomType} size={28} />
				</div>
				{channel.roomName}
			</div>
			<div className='text-base font-light mt-2 mb-4 break-all'>
				{`날짜: ${formattedDate(
					channel.createdAt,
					false
				)}에 이 ${channelTypeInKorean()} 채널을 생성했습니다. ${
					channel.roomName
				}
				채널의 맨 첫 부분입니다.`}
			</div>
		</div>
	);
};

export default ChannelHeader;
