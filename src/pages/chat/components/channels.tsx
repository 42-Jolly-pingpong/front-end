import { Sidebar } from 'flowbite-react';
import Channel from 'pages/chat/components/channel';
import CreateChannel from 'pages/chat/components/create-channel';
import { channelList } from 'pages/chat/mock';
import { useEffect, useState } from 'react';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

const Channels = () => {
	const [channels, setChannels] = useState<ChatRoom[]>();

	useEffect(() => {
		//get Chat list
		setChannels(channelList);
	}, []);

	return (
		<Sidebar.Collapse label='채널'>
			{channels?.map((channel, id) => <Channel key={id} channel={channel} />)}
			<CreateChannel />
		</Sidebar.Collapse>
	);
};

export default Channels;
