import useFetch from 'hooks/use-fetch';
import { useSetRecoilState } from 'recoil';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Dm } from 'ts/interfaces/dm.model';
import { chatHeaderState } from 'ts/states/chat-header-state';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { chatState } from 'ts/states/chat-state';

const useChangeChat = () => {
	const setChatState = useSetRecoilState(chatState);
	const setChatHeaderState = useSetRecoilState(chatHeaderState);
	const setSidebarState = useSetRecoilState(chatSidebarState);
	const getData = useFetch();

	const setChat = (
		chat: ChatRoom | Dm | null,
		closeSidebar: boolean = true
	) => {
		if (chat) {
			(async () => {
				await getData('get', `/chat-rooms/${chat?.id}/chats`)
					.then((res) => {
						if (res.ok) {
							return res.json();
						}
						throw Error(res.statusText);
					})
					.then((chats) =>
						setChatState({
							chatRoom: chat,
							chats,
						})
					)
					.catch((err) => console.log('inside setChat', err));
			})();
		} else {
			setChatState({ chatRoom: null, chats: [] });
		}
		setChatHeaderState(true);
		if (closeSidebar) {
			setSidebarState({
				status: ChatSidebarStatus.CLOSE,
				profile: null,
			});
		}
	};

	return setChat;
};

export default useChangeChat;
