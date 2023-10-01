import { Sidebar } from 'flowbite-react';
import ChannelItem from 'pages/chat/components/channel-item';
import CreateChannel from 'pages/chat/components/create-channel';
import { channelList } from 'pages/chat/mock';
import { useEffect, useState } from 'react';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

const Channels = () => {
	const [channels, setChannels] = useState<ChatRoom[]>();

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
				<ChannelItem key={id} channel={channel} />
			))}
			<CreateChannel />
		</Sidebar.Collapse>
	);
};

export default Channels;
