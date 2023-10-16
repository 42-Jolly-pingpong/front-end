import useChangeChat from 'hooks/use-change-chat';
import { chatSocket } from 'pages/chat/chat-socket';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ChatRoom } from 'ts/interfaces/chat-room.model';
import { Chat } from 'ts/interfaces/chat.model';
import { chatState } from 'ts/states/chat-state';

const HandleChatSocket = () => {
	const [chat, setChat] = useRecoilState(chatState);
	const setChatRoom = useChangeChat();

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
		}

		return () => {
			chatSocket.off('getNewChat');
			chatSocket.off('updateChatRoom');
		};
	}, [chat.chatRoom]);

	return null;
};

export default HandleChatSocket;
