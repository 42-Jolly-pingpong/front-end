import { Sidebar } from 'flowbite-react';
import useChangeChat from 'hooks/use-change-chat';
import { Dm } from 'ts/interfaces/dm.model';

const DmItem = (props: { dm: Dm; isSelected: boolean }) => {
	const chatMate = props.dm.chatMate;

	const setChat = useChangeChat();

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
		<Sidebar.Item
			onClick={onClickItem}
			className={props.isSelected ? 'bg-yellow-100 hover:bg-yellow-200' : ''}
		>
			<div className='flex items-center'>
				{avatar()}
				<div className='flex items-center font-medium text-base truncate'>
					{chatMate.nickname}
				</div>
			</div>
		</Sidebar.Item>
	);
};

export default DmItem;
