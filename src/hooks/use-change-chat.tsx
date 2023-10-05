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
	const sendApi = useFetch();

	const setChat = (chat: ChatRoom | Dm | null) => {
		(async () => {
			if (chat) {
				await sendApi('get', `/chat-rooms/${chat?.id}/chats`)
					.then((res) => res.json())
					.then((chats) =>
						setChatState({
							chatRoom: chat,
							chats,
						})
					);
			}
		})();
		setChatHeaderState(true);
		setSidebarState({
			status: ChatSidebarStatus.CLOSE,
			chat: null,
			profile: null,
		});
	};

	return setChat;
};

export default useChangeChat;
