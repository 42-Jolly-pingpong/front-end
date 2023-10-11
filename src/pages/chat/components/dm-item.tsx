import { Sidebar } from 'flowbite-react';
import { useSetRecoilState } from 'recoil';
import { Dm } from 'ts/interfaces/dm.model';
import { chatState } from 'ts/states/chat-state';

const DmItem = (props: { dm: Dm }) => {
	const chatMate = props.dm.chatMate;

	const setChat = useSetRecoilState(chatState);

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
				<div className='flex items-center'>{chatMate.nickname}</div>
			</div>
		</Sidebar.Item>
	);
};

export default DmItem;
