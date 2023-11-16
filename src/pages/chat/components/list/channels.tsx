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
	const chatList = useRecoilValue(chatListState);
	const chat = useRecoilValue(chatState).chatRoom;

	useEffect(() => {
		setChannels(
			[...chatList.channelList].sort((a, b) =>
				a.roomName.localeCompare(b.roomName)
			)
		);
	}, [chatList]);

	return (
		<Sidebar.Collapse label='채널' open>
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
