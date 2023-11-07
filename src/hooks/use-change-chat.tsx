import useFetch from 'hooks/use-fetch';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';
import { ChatSidebarStatus } from 'ts/enums/chat-sidebar-status.enum';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { Dm } from 'ts/interfaces/dm.model';
import User from 'ts/interfaces/user.model';
import { chatHeaderState } from 'ts/states/chat-header-state';
import { chatListState } from 'ts/states/chat-list.state';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { chatState } from 'ts/states/chat-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const useChangeChat = () => {
	const setChatState = useSetRecoilState(chatState);
	const setChatHeaderState = useSetRecoilState(chatHeaderState);
	const setChatRoomList = useSetRecoilState(chatListState);
	const setSidebarState = useSetRecoilState(chatSidebarState);
	const getData = useFetch();
	const blockedUser = useRecoilValue(userFriendsState).blockedFriends as User[];

	const chatsWithoutBlocked = (chats: Chat[]): Chat[] => {
		return chats.filter((chat) => {
			return !blockedUser.find((user) => user.id === chat.user.user.id);
		});
	};

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
							chats: chatsWithoutBlocked(chats),
						})
					)
					.catch((err) => console.log('inside setChat', err));
			})();

			if (chat.roomType === ChatRoomType.DM) {
				setChatRoomList((pre) => ({
					...pre,
					dmList: pre.dmList.map((dm) => {
						if (dm.id === chat.id) {
							return { ...dm, leftToRead: false };
						}
						return dm;
					}),
				}));
			} else {
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
