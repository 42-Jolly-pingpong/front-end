import { Sidebar } from 'flowbite-react';
import ChannelItem from 'pages/chat/components/list/channel-item';
import CreateChannel from 'pages/chat/components/list/create-channel';
import { channelList } from 'pages/chat/mock';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { chatState } from 'ts/states/chat-state';

const Channels = () => {
	const [channels, setChannels] = useState<ChatRoom[]>();
	const chat = useRecoilValue(chatState);

	useEffect(() => {
		//get Chat list
		const sortedList = channelList.sort(
			(a, b) => a.updatedTime.getTime() - b.updatedTime.getTime()
		);

		setChannels(sortedList);
	}, []);

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
