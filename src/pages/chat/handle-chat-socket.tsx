import { getJwtValue } from 'components/utils/cookie-utils';
import useChangeChat from 'hooks/use-change-chat';
import { chatSocket } from 'socket/chat-socket';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { Dm } from 'ts/interfaces/dm.model';
import User from 'ts/interfaces/user.model';
import { chatListState } from 'ts/states/chat-list.state';
import { chatState } from 'ts/states/chat-state';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';
import { socket } from 'socket/socket';
import useFetch from 'hooks/use-fetch';
import { ChatRoomType } from 'ts/enums/chat-room-type.enum';

const HandleChatSocket = () => {
	const chat = useRecoilValue(chatState);
	const setChatRoom = useChangeChat();
	const [chatRoomList, setChatRoomList] = useRecoilState(chatListState);
	const token = getJwtValue();
	const user = useRecoilValue(userState) as User;
	const blockedUser = useRecoilValue(userFriendsState).blockedFriends as User[];
	const setChat = useSetRecoilState(chatState);
	const getData = useFetch();

	const reloadChat = () => {
		if (chat.chatRoom === null) {
			return;
		}
		if (chat.chatRoom.roomType === ChatRoomType.DM) {
			getData('POST', '/chat-rooms/dm', {
				chatMate: (chat.chatRoom as Dm).chatMate,
			})
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
					throw Error(res.statusText);
				})
				.then(async (data) => {
					setChatRoom(data, false);
				})
				.catch((err) => console.log('reload chat', err));
			return;
		}
		getData('GET', `/chat-rooms/${chat.chatRoom.id}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw Error(res.statusText);
			})
			.then(async (data) => {
				setChatRoom(data, false);
			})
			.catch((err) => console.log('reload chat', err));
		return;
	};

	const reloadDmList = async () => {
		await getData('get', '/chat-rooms/dm')
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw Error(res.statusText);
			})
			.then((data) => {
				setChatRoomList((pre) => ({ ...pre, dmList: data }));
			})
			.catch((err) => console.log('chat', err));
	};

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
			dmList: pre.dmList.map((dm) => {
				if (dm.id === roomId) {
					return { ...dm, leftToRead: true };
				}
				return dm;
			}),
		}));
	};

	const addNewChat = (newChat: Chat) => {
		setChat((pre) => ({ ...pre, chats: [...pre.chats, newChat] }));
	};

	const getNewChat = (roomId: number, newChat: Chat) => {
		if (blockedUser.find((user) => user.id === newChat.user.user.id)) {
			return;
		}
		if (chat.chatRoom !== null && roomId === chat.chatRoom?.id) {
			addNewChat(newChat);
			chatSocket.emit('readChat', { roomId });
			return;
		}
		markChannelAsUnread(roomId);
	};

	const getNewChatOnDm = (roomId: number, newChat: Chat) => {
		if (chat.chatRoom !== null && roomId === chat.chatRoom?.id) {
			addNewChat(newChat);
			chatSocket.emit('readChat', { roomId });
			return;
		}
		markDmAsUnread(roomId);
	};

	const deleteChatRoom = (roomId: number) => {
		if (chat.chatRoom !== null && roomId === chat.chatRoom.id) {
			setChatRoom(null);
		}
		setChatRoomList((pre) => ({
			...pre,
			channelList: pre.channelList.filter((channel) => channel.id !== roomId),
		}));
	};

	/* mamage connection */

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

	/* listener */

	useEffect(() => {
		if (chat.chatRoom) {
			chatSocket.off('updateChatRoom');
			chatSocket.on('updateChatRoom', (chatRoom: ChatRoom) => {
				if (chatRoom.id === chat.chatRoom?.id) {
					setChatRoom(chatRoom, false);
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
		}

		chatSocket.off('getNewChat');
		chatSocket.on('getNewChat', (data: { roomId: number; newChat: Chat }) => {
			const { roomId, newChat } = data;
			getNewChat(roomId, newChat);
		});

		chatSocket.off('getNewChatOnDm');
		chatSocket.on(
			'getNewChatOnDm',
			(data: { roomId: number; newChat: Chat }) => {
				const { roomId, newChat } = data;
				getNewChatOnDm(roomId, newChat);
			}
		);

		chatSocket.off('chatRoomDeleted');
		chatSocket.on('chatRoomDeleted', (roomId: number) => {
			deleteChatRoom(roomId);
		});

		chatSocket.off('leaveTheChannel');
		chatSocket.on(
			'leaveTheChannel',
			(data: { roomId: number; userId: number }) => {
				if (data.userId !== user.id) return;
				deleteChatRoom(data.roomId);
				chatSocket.emit('requestLeave', { roomId: data.roomId });
			}
		);

		socket.on('reload', () => {
			reloadChat();
			reloadDmList();
		});

		return () => {
			chatSocket.off('getNewChat');
			chatSocket.off('getNewChatOnDm');
			chatSocket.off('updateChatRoom');
			chatSocket.off('updateChatRoomOnList');
			chatSocket.off('chatRoomDeleted');
			chatSocket.off('leaveTheChannel');
			socket.off('reload');
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
				if (
					chatRoomList.channelList.some((channel) => channel.id === chatRoom.id)
				) {
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
			if (chatRoomList.dmList.some((dm) => dm.id === dm.id)) {
				return;
			}
			setChatRoomList((pre) => ({
				...pre,
				dmList: [...pre.dmList, dm],
			}));
			chatSocket.emit('requestJoin', { roomId: dm.id });
		});

		return () => {
			chatSocket.off('addNewChatRoom');
			chatSocket.off('addNewDm');
		};
	}, [chatRoomList]);

	useEffect(() => {
		chatSocket.off('createChatRoom');
		chatSocket.on('createChatRoom', (data: { chatRoom: ChatRoom }) => {
			const { chatRoom } = data;

			setChatRoom(chatRoom);
		});

		return () => {
			chatSocket.off('createChatRoom');
		};
	}, []);

	return null;
};

export default HandleChatSocket;
