import useChangeSidebar from 'hooks/use-change-sidebar';
import AvatarStatus from 'pages/chat/components/avatar-status';
import ChannelIcon from 'pages/chat/components/channel-icon';
import ChatInfoButton from 'pages/chat/components/header/chat-info-button';
import { useRecoilValue } from 'recoil';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';
import { chatState } from 'ts/states/chat-state';

const ChatHeaderTitle = () => {
	const chatRoom = useRecoilValue(chatState).chatRoom;
	const setChatSidebar = useChangeSidebar('profile');

	const headerForDm = () => {
		if (chatRoom === null) {
			return;
		}
		const chatMate = (chatRoom as Dm).chatMate;

		const onClickChatMate = () => {
			setChatSidebar(chatMate);
		};

		return (
			<button onClick={onClickChatMate}>
				<div className='relative flex items-center h-12 ml-6'>
					<AvatarStatus user={chatMate} />
					<div className='ml-2 font-bold'>{chatMate.nickname}</div>
				</div>
			</button>
		);
	};

	const headerForChannel = () => {
		if (chatRoom === null) {
			return;
		}
		return (
			<div className='w-full flex justify-between items-center ml-6'>
				<div className='flex items-center font-bold truncate'>
					<div className='mr-2'>
						<ChannelIcon roomType={chatRoom.roomType} size={18} />
					</div>
					{(chatRoom as ChatRoom).roomName}
				</div>
				<ChatInfoButton chatRoom={chatRoom as ChatRoom} />
			</div>
		);
	};

	const header = () => {
		if (chatRoom === null) {
			return <></>;
		}
		switch (chatRoom.roomType) {
			case ChatRoomType.DM:
				return headerForDm();
			default:
				return headerForChannel();
		}
	};

	return (
		<div className='w-full flex items-center border-b h-12'>{header()}</div>
	);
};

export default ChatHeaderTitle;
