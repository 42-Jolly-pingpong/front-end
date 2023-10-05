import { Sidebar } from 'flowbite-react';
import ChannelItem from 'pages/chat/components/list/channel-item';
import CreateChannel from 'pages/chat/components/list/create-channel';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatListState } from 'ts/states/chat-list.state';
import { chatState } from 'ts/states/chat-state';

const Channels = () => {
	const [channels, setChannels] = useState<ChatRoom[]>();
	const channelList = useRecoilValue(chatListState).channelList;
	const chat = useRecoilValue(chatState).chatRoom;

	useEffect(() => {
		const list = [...channelList];
		setChannels(
			list.sort((a, b) => b.updatedTime.getTime() - a.updatedTime.getTime())
		);
	}, [channelList]);

	return (
		<Sidebar.Collapse label='채널' className='text-base font-medium'>
			{channels?.map((channel, id) => (
				<ChannelItem
					key={id}
					channel={channel}
					isSelected={chat?.id === channel.id}
				/>
			))}
			<CreateChannel />
		</Sidebar.Collapse>
	);
};

export default Channels;
