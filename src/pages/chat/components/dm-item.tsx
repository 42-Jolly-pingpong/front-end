import { Sidebar } from 'flowbite-react';
import changeChat from 'hooks/change-chat';
import { Dm } from 'ts/interfaces/dm.model';

const DmItem = (props: { dm: Dm }) => {
	const chatMate = props.dm.chatMate;

	const setChat = changeChat();

	const avatar = () => {
		return (
			<div className='w-6 h-6 overflow-hidden mr-2'>
				<img
					src={chatMate.avatarPath}
					className='object-cover w-full h-full rounded-md'
				/>
			</div>
		);
	};

	const onClickItem = () => {
		setChat(props.dm);
	};

	return (
		<Sidebar.Item onClick={onClickItem}>
			<div className='flex items-center'>
				{avatar()}
				<div className='flex items-center font-medium text-base'>
					{chatMate.nickname}
				</div>
			</div>
		</Sidebar.Item>
	);
};

export default DmItem;
