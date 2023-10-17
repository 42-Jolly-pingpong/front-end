import useChangeChat from 'hooks/use-change-chat';
import { chatSocket } from 'pages/chat/chat-socket';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { Dm } from 'ts/interfaces/dm.model';
import userData from 'ts/mock/user-data';
import { chatListState } from 'ts/states/chat-list.state';
import { chatState } from 'ts/states/chat-state';

const HandleChatSocket = () => {
	const [chat, setChat] = useRecoilState(chatState);
	const setChatRoom = useChangeChat();
	const setChatRoomList = useSetRecoilState(chatListState);

	useEffect(() => {}, []);

	chatSocket.on('connect', () => {
		console.log('connected with server');
	}); //위치 옮겨야 함

	const user = userData[0]; //temp

	useEffect(() => {
		chatSocket.connect();

		return () => {
			chatSocket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (chat.chatRoom) {
			chatSocket.off('getNewChat');
			chatSocket.on('getNewChat', (data: { roomId: number; newChat: Chat }) => {
				const { roomId, newChat } = data;
				if (roomId === chat.chatRoom?.id) {
					setChat((pre) => ({ ...pre, chats: [...pre.chats, newChat] }));
				} else {
					setChatRoomList((pre) => ({
						...pre,
						channelList: pre.channelList.map((channel) => {
							if (channel.id === roomId) {
								return { ...channel, leftToRead: true };
							}
							return channel;
						}),
					}));
				}
			});

			chatSocket.off('getNewChatOnDm');
			chatSocket.on(
				'getNewChatOnDm',
				(data: { roomId: number; newChat: Chat }) => {
					const { roomId, newChat } = data;
					if (roomId === chat.chatRoom?.id) {
						setChat((pre) => ({ ...pre, chats: [...pre.chats, newChat] }));
					} else {
						setChatRoomList((pre) => ({
							...pre,
							dmList: pre.dmList.map((dm) => {
								if (dm.id === roomId) {
									return { ...dm, leftToRead: true };
								}
								return dm;
							}),
						}));
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

		return () => {
			chatSocket.off('addNewChatRoom');
			chatSocket.off('addNewDm');
		};
	}, []);

	return null;
};

export default HandleChatSocket;
