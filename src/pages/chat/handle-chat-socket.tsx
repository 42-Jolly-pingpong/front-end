import { getJwtValue } from 'components/utils/cookieUtils';
import useAddChat from 'hooks/use-add-chat';
import useChangeChat from 'hooks/use-change-chat';
import { chatSocket } from 'pages/chat/chat-socket';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { Dm } from 'ts/interfaces/dm.model';
import User from 'ts/interfaces/user.model';
import { chatListState } from 'ts/states/chat-list.state';
import { chatState } from 'ts/states/chat-state';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const HandleChatSocket = () => {
	const chat = useRecoilValue(chatState);
	const setChatRoom = useChangeChat();
	const setChatRoomList = useSetRecoilState(chatListState);
	const token = getJwtValue();
	const user = useRecoilValue(userState) as User;
	const blockedUser = useRecoilValue(userFriendsState).blockedFriends as User[];
	const addNewChat = useAddChat();

	const markChannelAsUnread = (roomId: number) => {
		setChatRoomList((pre) => ({
			...pre,
			channelList: pre.channelList.map((channel) => {
				if (channel.id === roomId) {
					return { ...channel, leftToRead: true };
				}
				return channel;
			}),
		}));
	};

	const markDmAsUnread = (roomId: number) => {
		setChatRoomList((pre) => ({
			...pre,
			channelList: pre.channelList.map((channel) => {
				if (channel.id === roomId) {
					return { ...channel, leftToRead: true };
				}
				return channel;
			}),
		}));
	};

	useEffect(() => {
		if (token !== undefined && chatSocket.disconnected) {
			chatSocket.io.opts.extraHeaders = {
				Authorization: `Bearer ${token}`,
			};
			chatSocket.connect();
		}
		return () => {
			chatSocket.disconnect();
		};
	}, [token]);

	useEffect(() => {
		if (chat.chatRoom) {
			chatSocket.off('getNewChat');
			chatSocket.on('getNewChat', (data: { roomId: number; newChat: Chat }) => {
				const { roomId, newChat } = data;
				if (blockedUser.find((user) => user.id === newChat.user.user.id)) {
					return;
				}
				if (roomId === chat.chatRoom?.id) {
					addNewChat(newChat);
					chatSocket.emit('readChat', { roomId });
				} else {
					markChannelAsUnread(roomId);
				}
			});

			chatSocket.off('getNewChatOnDm');
			chatSocket.on(
				'getNewChatOnDm',
				(data: { roomId: number; newChat: Chat }) => {
					const { roomId, newChat } = data;
					if (roomId === chat.chatRoom?.id) {
						addNewChat(newChat);
						chatSocket.emit('readChat', { roomId });
					} else {
						markDmAsUnread(roomId);
					}
				}
			);

			chatSocket.off('updateChatRoom');
			chatSocket.on('updateChatRoom', (chatRoom: ChatRoom) => {
				if (chatRoom.id === chat.chatRoom?.id) {
					setChatRoom(chatRoom, false);
				}
			});

			chatSocket.off('chatRoomDeleted');
			chatSocket.on('chatRoomDeleted', (roomId: number) => {
				if (roomId === chat.chatRoom?.id) {
					setChatRoom(null);
					setChatRoomList((pre) => ({
						...pre,
						channelList: pre.channelList.filter(
							(channel) => channel.id !== roomId
						),
					}));
				}
			});

			chatSocket.off('updateChatRoomOnList');
			chatSocket.on('updateChatRoomOnList', (chatRoom: ChatRoom) => {
				setChatRoomList((pre) => ({
					...pre,
					channelList: pre.channelList.map((channel) => {
						if (channel.id === chatRoom.id) {
							return chatRoom;
						}
						return channel;
					}),
				}));
			});
		} else {
			chatSocket.off('getNewChat');
			chatSocket.on('getNewChat', (data: { roomId: number; newChat: Chat }) => {
				const { roomId } = data;
				markChannelAsUnread(roomId);
			});

			chatSocket.off('getNewChatOnDm');
			chatSocket.on(
				'getNewChatOnDm',
				(data: { roomId: number; newChat: Chat }) => {
					const { roomId } = data;
					markDmAsUnread(roomId);
				}
			);
		}

		return () => {
			chatSocket.off('getNewChat');
			chatSocket.off('getNewChatOnDm');
			chatSocket.off('updateChatRoom');
			chatSocket.off('chatRoomDeleted');
			chatSocket.off('updateChatRoomOnList');
		};
	}, [chat.chatRoom]);

	useEffect(() => {
		chatSocket.off('addNewChatRoom');
		chatSocket.on(
			'addNewChatRoom',
			(data: { chatRoom: ChatRoom; userId: number[] }) => {
				const { chatRoom, userId } = data;
				if (userId.find((one) => one === user.id) === undefined) {
					return;
				}
				setChatRoomList((pre) => ({
					...pre,
					channelList: [...pre.channelList, chatRoom],
				}));
				chatSocket.emit('requestJoin', { roomId: chatRoom.id });
			}
		);

		chatSocket.off('addNewDm');
		chatSocket.on('addNewDm', (data: { dm: Dm; userId: number }) => {
			const { dm, userId } = data;
			if (userId !== user.id) {
				return;
			}
			setChatRoomList((pre) => ({
				...pre,
				dmList: [...pre.dmList, dm],
			}));
			chatSocket.emit('requestJoin', { roomId: dm.id });
		});

		chatSocket.off('createChatRoom');
		chatSocket.on('createChatRoom', (data: { chatRoom: ChatRoom }) => {
			const { chatRoom } = data;

			setChatRoom(chatRoom);
		});

		return () => {
			chatSocket.off('addNewChatRoom');
			chatSocket.off('addNewDm');
			chatSocket.off('createChatRoom');
		};
	}, []);

	return null;
};

export default HandleChatSocket;
