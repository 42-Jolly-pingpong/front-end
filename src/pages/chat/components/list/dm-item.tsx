import { Sidebar } from 'flowbite-react';
import useChangeChat from 'hooks/use-change-chat';
import AvatarStatus from 'pages/chat/components/avatar-status';
import { Dm } from 'ts/interfaces/dm.model';

const DmItem = (props: { dm: Dm; isSelected: boolean }) => {
	const chatMate = props.dm.chatMate;

	const setChat = useChangeChat();

	const onClickItem = () => {
		setChat(props.dm);
	};

	return (
		<Sidebar.Item
			onClick={onClickItem}
			className={props.isSelected ? 'bg-yellow-100 hover:bg-yellow-50' : ''}
		>
			<div className='flex items-center'>
				<AvatarStatus user={chatMate} />
				<div
					className={`flex items-center text-base ${
						props.dm.leftToRead ? 'font-bold' : 'font-medium'
					} ml-2 truncate`}
				>
					{chatMate.nickname}
				</div>
			</div>
		</Sidebar.Item>
	);
};

export default DmItem;
