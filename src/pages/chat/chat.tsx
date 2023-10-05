import ChatContent from 'pages/chat/components/chat-content';
import ChatList from 'pages/chat/components/list/chat-list';
import ChatSidebar from 'pages/chat/components/sidebar/chat-sidebar';
import ChannelModal from 'pages/chat/components/modal/channel-modal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { useEffect } from 'react';
import useFetch from 'hooks/use-fetch';
import { chatListState } from 'ts/states/chat-list.state';

const Chat = () => {
	const hasChatSidebar =
		useRecoilValue(chatSidebarState).status !== ChatSidebarStatus.CLOSE;
	const setChatList = useSetRecoilState(chatListState);
	const sendApi = useFetch();

	useEffect(() => {
		(async () => {
			await sendApi('get', '/chat-rooms')
				.then((res) => res.json())
				.then(async (data) => {
					setChatList((pre) => ({ ...pre, channelList: data }));
				});

			await sendApi('get', '/chat-rooms/dm')
				.then((res) => res.json())
				.then((data) => {
					setChatList((pre) => ({ ...pre, dmList: data }));
				});
		})();
	}, []);

	return (
		<div className='flex max-h-screen max-w-screen'>
			<ChatList />
			<ChatContent hasChatSidebar={hasChatSidebar} />
			{hasChatSidebar && <ChatSidebar />}
			<ChannelModal />
		</div>
	);
};

export default Chat;
