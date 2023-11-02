import { io } from 'socket.io-client';

export const chatSocket = io(`${process.env.REACT_APP_BASE_URL}/chat`, {
	autoConnect: false,
});
