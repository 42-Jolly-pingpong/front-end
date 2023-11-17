import { io } from 'socket.io-client';

export const chatSocket = io(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
	autoConnect: false,
});
