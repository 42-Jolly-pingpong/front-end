import { Avatar } from 'flowbite-react';
import useChangeSidebar from 'hooks/use-change-sidebar';
import ChatTime from 'pages/chat/components/field/chat-time';
import { Chat } from 'ts/interfaces/chat.model';
import { User } from 'ts/interfaces/user.model';

const ChatItem = (props: { chat: Chat; hasTopBorder: boolean }) => {
	const { chat } = props;
	const setChatSidebar = useChangeSidebar('profile');
	const user = chat.user.user;

	const topBorder = () => {
		return <div className='border-t mb-3'></div>;
	};

	const onClickAvatar = () => {
		setChatSidebar(user as User);
	};

	return (
		<div>
			{props.hasTopBorder && topBorder()}
			<div className='flex items-start mb-2 mt-2'>
				<button onClick={onClickAvatar} className='pt-1'>
					<Avatar img={user.avatarPath} />
				</button>
				<div className='ml-3'>
					<div className='flex items-center'>
						<div className='mr-1 font-bold text-sm'>{user.nickname}</div>
						<div className='ml-1'>
							<ChatTime time={chat.sentTime} />
						</div>
					</div>
					<div className='text-sm font-normal'>{chat.content}</div>
				</div>
			</div>
		</div>
	);
};

export default ChatItem;
