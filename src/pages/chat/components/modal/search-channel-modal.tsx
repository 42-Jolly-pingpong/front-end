import { Flowbite, ListGroup, Modal, TextInput } from 'flowbite-react';
import { ListGroupTheme } from 'pages/chat/components/modal/list-group-theme';
import { SearchChannelItem } from 'pages/chat/components/modal/search-channel-item';
import { channelList } from 'pages/chat/mock';
import { useEffect, useState } from 'react';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { BiSearch } from 'react-icons/bi';

const SearchChannelModal = () => {
	const [input, setInput] = useState<string>('');
	const [channels, setChannels] = useState<ChatRoom[]>([]);
	const [searchedChannels, setSearchedChannels] = useState<ChatRoom[]>([]);

	useEffect(() => {
		setChannels(channelList);
	}, []);

	useEffect(() => {
		if (channels) {
			setSearchedChannels(channels);
		}
	}, [channels]);

	useEffect(() => {
		if (input.length === 0) {
			setSearchedChannels(channels);
		} else {
			setSearchedChannels(
				channels?.filter((channel) => channel.roomName.includes(input))
			);
		}
	}, [input]);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const title = () => {
		if (input.length === 0) {
			return '열려있는 모든 채널';
		}
		return `'${input}'으로 검색된 채널`;
	};

	const seachedChannelList = () => {
		if (searchedChannels?.length !== 0)
			return (
				<ListGroup>
					{searchedChannels?.map((channel, id) => (
						<SearchChannelItem key={id} channel={channel} />
					))}
				</ListGroup>
			);
		return (
			<div className='flex justify-center text-gray-500'>
				<div>검색 결과가 존재하지않습니다.</div>
			</div>
		);
	};

	return (
		<>
			<Modal.Header>채널 탐색</Modal.Header>
			<Modal.Body className='max-h-96 overflow-y-auto'>
				<TextInput
					icon={BiSearch}
					value={input}
					onChange={onChangeInput}
				></TextInput>
				<div className='text-sm mb-3 mt-3'>{title()}</div>
				<Flowbite theme={{ theme: ListGroupTheme }}>
					{seachedChannelList()}
				</Flowbite>
			</Modal.Body>
		</>
	);
};

export default SearchChannelModal;
