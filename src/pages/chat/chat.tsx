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
import HandleChatSocket from 'pages/chat/handle-chat-socket';
import ChatAlertModel from 'pages/chat/chat-alert-modal';
import useRedirectHome from 'hooks/use-redirect-home';
import { getJwtValue } from 'components/utils/cookieUtils';

const Chat = () => {
	const hasChatSidebar =
		useRecoilValue(chatSidebarState).status !== ChatSidebarStatus.CLOSE;
	const setChatList = useSetRecoilState(chatListState);
	const getData = useFetch();
	const token = getJwtValue();

	useRedirectHome();

	useEffect(() => {
		if (!token) {
			return;
		}
		(async () => {
			await getData('get', '/chat-rooms')
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
					throw Error(res.statusText);
				})
				.then(async (data) => {
					setChatList((pre) => ({ ...pre, channelList: data }));
				})
				.catch((err) => console.log('chat', err));

			await getData('get', '/chat-rooms/dm')
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
					throw Error(res.statusText);
				})
				.then((data) => {
					setChatList((pre) => ({ ...pre, dmList: data }));
				})
				.catch((err) => console.log('chat', err));
		})();
	}, [token]);

	return (
		<div className='flex h-screen w-screen'>
			<HandleChatSocket />
			<ChatList />
			<ChatContent hasChatSidebar={hasChatSidebar} />
			{hasChatSidebar && <ChatSidebar />}
			<ChannelModal />
			<ChatAlertModel />
		</div>
	);
};

export default Chat;
