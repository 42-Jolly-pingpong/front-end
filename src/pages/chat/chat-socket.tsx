import { io } from 'socket.io-client';

export const chatSocket = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
	auth: { userId: 0 }, //temp 토큰으로 수정해야 함
	autoConnect: false,
});
