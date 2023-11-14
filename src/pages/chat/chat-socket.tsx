import { io } from 'socket.io-client';

export const chatSocket = io(`http://localhost:3000/chat`, {
	autoConnect: false,
});
