import { Sidebar } from 'flowbite-react';
import { Dm } from 'ts/interfaces/dm.model';

const DmItem = (props: { dm: Dm }) => {
	const chatMate = props.dm.chatMate;

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

	return (
		<Sidebar.Item>
			<div className='flex items-center'>
				{avatar()}
				<div className='flex items-center'>{chatMate.nickname}</div>
			</div>
		</Sidebar.Item>
	);
};

export default DmItem;
