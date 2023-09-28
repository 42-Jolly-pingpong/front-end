import { Flowbite, ListGroup, Modal } from 'flowbite-react';
import { ListGroupTheme } from 'pages/chat/components/modal/list-group-theme';
import { SearchChannelItem } from 'pages/chat/components/modal/search-channel-item';
import { channelList } from 'pages/chat/mock';
import { useEffect, useState } from 'react';
import { ChatRoom } from 'ts/interfaces/chat-room.model';

const SearchChannelModal = () => {
	const [channels, setChannels] = useState<ChatRoom[]>();

	useEffect(() => {
		setChannels(channelList);
	}, []);
	return (
		<>
			<Modal.Header>채널 탐색</Modal.Header>
			<Modal.Body className='max-h-96 overflow-y-auto'>
				<div className='text-sm mb-3'>열려있는 모든 채널</div>
				<Flowbite theme={{ theme: ListGroupTheme }}>
					<ListGroup>
						{channels?.map((channel, id) => (
							<SearchChannelItem key={id} channel={channel} />
						))}
					</ListGroup>
				</Flowbite>
			</Modal.Body>
		</>
	);
};

export default SearchChannelModal;
