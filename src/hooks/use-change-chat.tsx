import useChatAlert from 'hooks/use-chat-alert';
import { chatSocket } from 'socket/chat-socket';
import { useSetRecoilState } from 'recoil';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { Dm } from 'ts/interfaces/dm.model';
import { chatHeaderState } from 'ts/states/chat-header-state';
import { chatListState } from 'ts/states/chat-list.state';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { chatState } from 'ts/states/chat-state';

const useChangeChat = () => {
	const setChatState = useSetRecoilState(chatState);
	const setChatHeaderState = useSetRecoilState(chatHeaderState);
	const setChatRoomList = useSetRecoilState(chatListState);
	const setSidebarState = useSetRecoilState(chatSidebarState);
	const setAlertModal = useChatAlert();

	const markChannelAsRead = (chat: ChatRoom | Dm) => {
		switch (chat.roomType) {
			case ChatRoomType.DM:
				setChatRoomList((pre) => ({
					...pre,
					dmList: pre.dmList.map((dm) => {
						if (dm.id === chat.id) {
							return { ...dm, leftToRead: false };
						}
						return dm;
					}),
				}));
				break;
			default:
				setChatRoomList((pre) => ({
					...pre,
					channelList: pre.channelList.map((channel) => {
						if (channel.id === chat.id) {
							return { ...channel, leftToRead: false };
						}
						return channel;
					}),
				}));
		}
	};

	const setChat = (
		chat: ChatRoom | Dm | null,
		closeSidebar: boolean = true
	) => {
		if (chat) {
			chatSocket.emit(
				'getChats',
				{ roomId: chat.id },
				(response: { status: number; chats: Chat[] }) => {
					if (response.status === 200) {
						setChatState({
							chatRoom: chat,
							chats: response.chats.sort(
								(a, b) =>
									new Date(a.sentTime).getTime() -
									new Date(b.sentTime).getTime()
							),
						});
					} else {
						setAlertModal();
					}
				}
			);

			markChannelAsRead(chat);
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
