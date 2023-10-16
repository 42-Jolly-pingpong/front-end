import useChangeChat from 'hooks/use-change-chat';
import { chatSocket } from 'pages/chat/chat-socket';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Chat } from 'ts/interfaces/chat.model';
import { chatState } from 'ts/states/chat-state';

const HandleChatSocket = () => {
	const [chat, setChat] = useRecoilState(chatState);

	useEffect(() => {}, []);

	chatSocket.on('connect', () => {
		console.log('connected with server');
	}); //위치 옮겨야 함

	useEffect(() => {
		if (chat && chat.chatRoom) {
			chatSocket.off('getNewChat');
			chatSocket.on('getNewChat', (data: { roomId: number; newChat: Chat }) => {
				const { roomId, newChat } = data;
				if (roomId === chat.chatRoom?.id) {
					setChat((pre) => ({ ...pre, chats: [...pre.chats, newChat] }));
				}
			});
		}

		return () => {
			chatSocket.off('getNewChat');
		};
	}, [chat.chatRoom]);

	return null;
};

export default HandleChatSocket;
