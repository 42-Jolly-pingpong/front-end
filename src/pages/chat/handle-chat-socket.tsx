import useChangeChat from 'hooks/use-change-chat';
import { chatSocket } from 'pages/chat/chat-socket';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
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

	useEffect(() => {
		if (chat && chat.chatRoom) {
			chatSocket.off('getNewChat');
			chatSocket.on('getNewChat', (data: { roomId: number; newChat: Chat }) => {
				const { roomId, newChat } = data;
				console.log('het', newChat.content);
				if (roomId === chat.chatRoom?.id) {
					setChat((pre) => ({ ...pre, chats: [...pre.chats, newChat] }));
				}
			});

			chatSocket.off('updateChatRoom');
			chatSocket.on('updateChatRoom', (chatroom: ChatRoom) => {
				if (chatroom.id === chat.chatRoom?.id) {
					setChatRoom(chatroom, false);
				}
			});

			chatSocket.off('chatRoomDeleted');
			chatSocket.on('chatRoomDeleted', (roomId: number) => {
				if (roomId === chat.chatRoom?.id) {
					setChatRoom(null);
				}
			});

			chatSocket.off('updateChatRoomOnList');
			chatSocket.on('updateChatRoomOnList', (chatroom: ChatRoom) => {
				setChatRoomList((pre) => ({
					...pre,
					channelList: pre.channelList.map((channel) => {
						if (channel.id === chatroom.id) {
							return chatroom;
						}
						return channel;
					}),
				}));
			});
		}

		return () => {
			chatSocket.off('getNewChat');
			chatSocket.off('updateChatRoom');
			chatSocket.off('chatRoomDeleted');
		};
	}, [chat.chatRoom]);

	return null;
};

export default HandleChatSocket;
