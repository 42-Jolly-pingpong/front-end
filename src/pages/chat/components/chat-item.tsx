import { Avatar } from 'flowbite-react';
import ChatTime from 'pages/chat/components/chat-time';
import { Chat } from 'ts/interfaces/chat.model';

const ChatItem = (props: { chat: Chat; hasTopBorder: boolean }) => {
	const { chat } = props;
	const user = chat.user.user;

	const onClickAvatar = () => {};

	const topBorder = () => {
		return <div className='border-t mb-3'></div>;
	};

	return (
		<div>
			{props.hasTopBorder && topBorder()}
			<div className='flex items-start mb-2 mt-2 w-full'>
				<button onClick={onClickAvatar} className='pt-1'>
					<Avatar img={user.avatarPath} />
				</button>
				<div className='ml-3'>
					<div className='flex items-center'>
						<div className='mr-1 font-bold'>{user.nickname}</div>
						<div className='ml-1'>
							<ChatTime time={chat.sentTime} />
						</div>
					</div>
					<div className=''>{chat.content}</div>
				</div>
			</div>
		</div>
	);
};

export default ChatItem;
